import {
  Logger,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import {
  connected,
  connectRedis,
  getRedisClient,
  disconnectRedis,
  getCurrentAttempts,
  resetConnectionAttempts,
} from '../../config/redis.config';

@Injectable()
export class RedisCacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisCacheService.name);

  private defaultTTL = 3600;

  private cacheAvailable = false;

  private reconnectInterval = 30000;

  private reconnectTimer: NodeJS.Timeout | null = null;

  private maxReconnectAttempts = 3;

  private reconnectAttempts = 0;

  private cachePermanentlyDisabled = false;

  async onModuleInit() {
    this.connectToRedis();
  }

  async onModuleDestroy() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    if (this.cacheAvailable) {
      await disconnectRedis();
    }
  }

  private async connectToRedis() {
    if (this.cachePermanentlyDisabled) {
      this.logger.warn(
        'Cache has been permanently disabled after consecutive failures',
      );
      return;
    }

    try {
      await connectRedis();
      this.cacheAvailable = true;
      this.logger.log('Cache service successfully connected');

      this.reconnectAttempts = 0;

      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
    } catch (error) {
      this.cacheAvailable = false;

      const currentRedisAttempts = getCurrentAttempts();

      if (currentRedisAttempts >= 5) {
        this.logger.error(
          `Maximum number of Redis connection attempts reached (${currentRedisAttempts})`,
        );
        this.cachePermanentlyDisabled = true;
        this.logger.warn(
          'Cache has been permanently disabled. The application will continue to function without cache.',
        );

        return;
      }

      this.reconnectAttempts++;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        this.logger.warn(
          `Cache service gave up after ${this.reconnectAttempts} reconnection attempts`,
        );
        this.cachePermanentlyDisabled = true;

        resetConnectionAttempts();
        this.reconnectAttempts = 0;

        this.logger.warn(
          'Cache has been permanently disabled. The application will continue to function without cache.',
        );
        return;
      }

      this.logger.warn(`Failed to connect to Redis: ${error.message}`);
      this.logger.warn(
        `Attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} of the cache service`,
      );
      this.logger.warn(
        'The application will continue to function without cache',
      );

      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (!this.reconnectTimer && !this.cachePermanentlyDisabled) {
      const delay = Math.min(
        this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1),
        5 * 60 * 1000,
      );

      this.logger.log(
        `Scheduling Redis reconnection attempt in ${delay / 1000} seconds`,
      );
      this.reconnectTimer = setTimeout(() => {
        this.reconnectTimer = null;
        this.connectToRedis();
      }, delay);
    }
  }

  public async reactivateCache(): Promise<boolean> {
    if (this.cachePermanentlyDisabled) {
      this.logger.log(
        'Trying to reactivate the cache that was permanently disabled',
      );
      this.cachePermanentlyDisabled = false;
      this.reconnectAttempts = 0;
      resetConnectionAttempts();

      try {
        await this.connectToRedis();
        return this.cacheAvailable;
      } catch (error) {
        this.logger.error(`Failed to reactivate the cache: ${error.message}`);
        return false;
      }
    }

    return this.cacheAvailable;
  }

  private isAvailable(): boolean {
    if (this.cachePermanentlyDisabled) {
      return false;
    }

    const isConnected = connected();

    if (this.cacheAvailable !== isConnected) {
      this.cacheAvailable = isConnected;

      if (!this.cacheAvailable) {
        this.logger.warn('Redis connection lost');
        this.scheduleReconnect();
      } else {
        this.logger.log('Redis connection restored');
      }
    }

    return this.cacheAvailable;
  }

  async set(
    key: string,
    value: any,
    ttl: number = this.defaultTTL,
  ): Promise<boolean> {
    if (!this.isAvailable()) {
      this.logger.error('Error storing in cache: Redis unavailable');
      return false;
    }

    try {
      const redisClient = getRedisClient();
      const stringValue =
        typeof value === 'string' ? value : JSON.stringify(value);

      await redisClient.set(key, stringValue, { EX: ttl });
      return true;
    } catch (error) {
      this.logger.error(`Error storing in cache: ${error.message}`);

      this.cacheAvailable = false;
      this.scheduleReconnect();
      return false;
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const redisClient = getRedisClient();
      const value = await redisClient.get(key);

      if (!value) return null;

      try {
        return JSON.parse(value) as T;
      } catch (e) {
        return value as unknown as T;
      }
    } catch (error) {
      this.logger.error(`Error retrieving from cache: ${error.message}`);

      this.cacheAvailable = false;
      this.scheduleReconnect();

      return null;
    }
  }

  async delete(key: string): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      const redisClient = getRedisClient();
      await redisClient.del(key);
    } catch (error) {
      this.logger.error(`Error removing from cache: ${error.message}`);

      this.cacheAvailable = false;
      this.scheduleReconnect();
    }
  }

  async has(key: string): Promise<boolean> {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      const redisClient = getRedisClient();
      const exists = await redisClient.exists(key);
      return exists === 1;
    } catch (error) {
      this.logger.error(`Error checking existence in cache: ${error.message}`);

      this.cacheAvailable = false;
      this.scheduleReconnect();

      return false;
    }
  }

  async getOrSet<T = any>(
    key: string,
    factory: () => Promise<T>,
    ttl: number = this.defaultTTL,
  ): Promise<T> {
    if (this.isAvailable()) {
      const cachedValue = await this.get<T>(key);

      if (cachedValue !== null) {
        return cachedValue;
      }
    }

    const value = await factory();

    if (this.isAvailable()) {
      await this.set(key, value, ttl);
    }

    return value;
  }

  public isCacheAvailable(): boolean {
    return this.isAvailable();
  }

  public isCachePermanentlyDisabled(): boolean {
    return this.cachePermanentlyDisabled;
  }

  public getCacheStatus(): {
    available: boolean;
    permanentlyDisabled: boolean;
    reconnectAttempts: number;
    maxReconnectAttempts: number;
  } {
    return {
      available: this.cacheAvailable,
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts,
      permanentlyDisabled: this.cachePermanentlyDisabled,
    };
  }

  public async flushAll(): Promise<boolean> {
    if (!this.isAvailable()) {
      this.logger.warn('Cannot flush cache: Redis is not available.');
      return false;
    }

    try {
      const redisClient = getRedisClient();
      await redisClient.flushAll();
      this.logger.log('Redis cache flushed (FLUSHALL)');
      return true;
    } catch (error) {
      this.logger.error(`Error flushing Redis cache: ${error.message}`);
      this.cacheAvailable = false;
      this.scheduleReconnect();
      return false;
    }
  }
}
