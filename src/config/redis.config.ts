import { Logger } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

const logger = new Logger('RedisConfig');

let isConnected = false;
let isConnecting = false;
let redisClient: RedisClientType;
let connectionTimeout: NodeJS.Timeout | null = null;

let connectionAttempts = 0;

const CONFIG = {
  BACKOFF_FACTOR: 2,
  MAX_RETRY_DELAY: 30000,
  BASE_RETRY_DELAY: 1000,
  CONNECTION_TIMEOUT: 5000,
  MAX_CONNECTION_ATTEMPTS: 5,
  RESET_ATTEMPTS_AFTER: 60000 * 10,
};

let resetAttemptsTimer: NodeJS.Timeout | null = null;

function connected(): boolean {
  return isConnected;
}

function scheduleResetAttempts(): void {
  if (resetAttemptsTimer) {
    clearTimeout(resetAttemptsTimer);
  }

  resetAttemptsTimer = setTimeout(() => {
    logger.log('Resetting Redis connection attempts counter');
    connectionAttempts = 0;
    resetAttemptsTimer = null;
  }, CONFIG.RESET_ATTEMPTS_AFTER);
}

function calculateBackoff(attempts: number): number {
  const delay = Math.min(
    CONFIG.BASE_RETRY_DELAY * Math.pow(CONFIG.BACKOFF_FACTOR, attempts),
    CONFIG.MAX_RETRY_DELAY,
  );

  return delay + Math.random() * 1000;
}

async function connectRedis(): Promise<RedisClientType> {
  if (isConnected) {
    return redisClient;
  }

  if (isConnecting) {
    throw new Error('A connection attempt is already in progress.');
  }

  if (connectionAttempts >= CONFIG.MAX_CONNECTION_ATTEMPTS) {
    logger.error(
      `Maximum connection attempts limit (${CONFIG.MAX_CONNECTION_ATTEMPTS}) reached.`,
    );
    throw new Error(
      `Could not connect to Redis after ${CONFIG.MAX_CONNECTION_ATTEMPTS} attempts.`,
    );
  }

  connectionAttempts++;
  isConnecting = true;

  if (connectionAttempts === 1) {
    scheduleResetAttempts();
  }

  logger.log(
    `Redis connection attempt ${connectionAttempts}/${CONFIG.MAX_CONNECTION_ATTEMPTS}`,
  );

  try {
    const connectionUrl =
      process.env.REDIS_CONNECT_URL || 'redis://localhost:6379';
    const maxRetries = parseInt(
      process.env.REDIS_MAX_RETRY_ATTEMPTS || '10',
      10,
    );

    const redisOptions = {
      socket: {
        reconnectStrategy: (retries: number) => {
          if (retries > maxRetries) {
            logger.error('Maximum automatic reconnection attempts reached.');
            return new Error('Maximum reconnection attempts reached');
          }

          const delay = calculateBackoff(retries);
          logger.log(
            `Trying automatic reconnection in ${Math.round(delay)}ms (attempt ${retries}/${maxRetries})`,
          );
          return delay;
        },
        connectTimeout: CONFIG.CONNECTION_TIMEOUT,
        keepAlive: 5000,
      },
      commandsQueueMaxLength: 5000,
    };

    redisClient = createClient({
      url: connectionUrl,
      ...redisOptions,
    });

    redisClient.on('error', (err) => {
      logger.error(`Redis client error: ${err.message}`);
      isConnected = false;
    });

    redisClient.on('reconnecting', () => {
      logger.log('Redis trying to reconnect automatically...');
    });

    redisClient.on('ready', () => {
      logger.log('Redis client ready');
      isConnected = true;
      connectionAttempts = 0;
    });

    const connectionPromise = new Promise<RedisClientType>(
      (resolve, reject) => {
        if (connectionTimeout) {
          clearTimeout(connectionTimeout);
        }

        connectionTimeout = setTimeout(() => {
          connectionTimeout = null;
          reject(
            new Error(
              `Redis connection timeout exceeded (${CONFIG.CONNECTION_TIMEOUT}ms)`,
            ),
          );
        }, CONFIG.CONNECTION_TIMEOUT);

        redisClient
          .connect()
          .then(() => {
            if (connectionTimeout) {
              clearTimeout(connectionTimeout);
              connectionTimeout = null;
            }

            isConnected = true;
            connectionAttempts = 0;

            logger.log(
              `Redis Client successfully connected to: ${connectionUrl}`,
            );
            resolve(redisClient);
          })
          .catch((error) => {
            if (connectionTimeout) {
              clearTimeout(connectionTimeout);
              connectionTimeout = null;
            }

            isConnected = false;
            reject(error);
          });
      },
    );

    return await connectionPromise;
  } catch (error) {
    logger.error(
      `Failed to connect to Redis (attempt ${connectionAttempts}/${CONFIG.MAX_CONNECTION_ATTEMPTS}): ${error.message}`,
    );
    isConnected = false;
    throw error;
  } finally {
    isConnecting = false;
  }
}

function getRedisClient(): RedisClientType {
  if (!isConnected) {
    logger.warn('Attempt to use Redis client that is not connected');
    throw new Error(
      'Redis client is not connected. Call connectRedis() first.',
    );
  }
  return redisClient;
}

async function disconnectRedis(): Promise<void> {
  if (isConnected && redisClient) {
    try {
      await redisClient.quit();
      isConnected = false;
      logger.log('Redis connection closed');
    } catch (error) {
      logger.error(`Error disconnecting Redis: ${error.message}`);
      throw error;
    }
  }
}

function resetConnectionAttempts(): void {
  connectionAttempts = 0;
  logger.log('Redis connection attempts counter manually reset');
}

function getCurrentAttempts(): number {
  return connectionAttempts;
}

export {
  connected,
  connectRedis,
  getRedisClient,
  disconnectRedis,
  getCurrentAttempts,
  resetConnectionAttempts,
};
