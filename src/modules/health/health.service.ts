import * as os from 'os';
import {
  HealthStatus,
  checkWithTimeout,
  formatMemoryUsage,
  checkEnvironmentVariables,
} from 'src/common/utils/health-helpers';
import { Injectable, Logger } from '@nestjs/common';
import { RedisHealthIndicator } from './indicators/redis-health.indicator';
import { FirebaseHealthIndicator } from './indicators/firebase-health.indicator';
import { WordpressHealthIndicator } from './indicators/wordpress-health.indicator';
import { PandascoreHealthIndicator } from './indicators/pandascore-health.indicator';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    private readonly redis: RedisHealthIndicator,
    private readonly firebase: FirebaseHealthIndicator,
    private readonly wordpress: WordpressHealthIndicator,
    private readonly pandascore: PandascoreHealthIndicator,
  ) {}

  async checkLiveness(): Promise<Partial<HealthStatus>> {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  async checkReadiness(): Promise<HealthStatus> {
    const startTime = Date.now();

    try {
      const healthStatus: HealthStatus = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime() / 60)} min`,
        checks: {},
      };

      const [redisResult, firebaseResult, wordpressResult, pandascoreResult] =
        await Promise.allSettled([
          checkWithTimeout(() => this.redis.isHealthy('redis')),
          checkWithTimeout(() => this.firebase.isHealthy('firebase')),
          checkWithTimeout(() => this.wordpress.isHealthy('wordpress')),
          checkWithTimeout(() => this.pandascore.isHealthy('pandascore')),
        ]);

      this.processRedisCheck(healthStatus, redisResult);
      this.processFirebaseCheck(healthStatus, firebaseResult);
      this.processWordpressCheck(healthStatus, wordpressResult);
      this.processPandascoreApiCheck(healthStatus, pandascoreResult);

      this.checkEnvironmentVars(healthStatus);

      this.addSystemInfo(healthStatus);

      healthStatus.responseTime = `${Date.now() - startTime}ms`;

      return healthStatus;
    } catch (error) {
      this.logger.error(`Readiness check error: ${error.message}`, error.stack);
      return this.createErrorResponse();
    }
  }

  private checkEnvironmentVars(healthStatus: HealthStatus): void {
    const requiredEnvVars = [
      'WP_BASE_URL',
      'PANDASCORE_API_BASE_URL',
      'PANDASCORE_API_KEY',
      'GOOGLE_API_KEY',
      'GOOGLE_API_BASE_URL',
      'TWITCH_CLIENT_ID',
      'TWITCH_CLIENT_SECRET',
      'TWITCH_AUTH_API_URL',
      'TWITCH_API_URL',
      'REDIS_CONNECT_URL',
      'API_KEYS',
      'FIREBASE_PROJECT_ID',
      'FIREBASE_CLIENT_EMAIL',
      'FIREBASE_PRIVATE_KEY',
    ];

    const missingEnvVars = checkEnvironmentVariables(requiredEnvVars);

    healthStatus.checks.envVars = {
      status: missingEnvVars.length === 0 ? 'ok' : 'error',
      checked: requiredEnvVars.length,
      missing: missingEnvVars,
    };

    if (missingEnvVars.length > 0) {
      healthStatus.checks.envVars.error = `Missing environment variables: ${missingEnvVars.join(
        ', ',
      )}`;
      healthStatus.status = 'degraded';
      this.logger.warn(
        `Missing environment variables: ${missingEnvVars.join(', ')}`,
      );
    }
  }

  private addSystemInfo(healthStatus: HealthStatus): void {
    const memoryUsage = process.memoryUsage();

    healthStatus.system = {
      memory: {
        free: formatMemoryUsage(os.freemem()),
        total: formatMemoryUsage(os.totalmem()),
        usage: {
          rss: formatMemoryUsage(memoryUsage.rss),
          heapUsed: formatMemoryUsage(memoryUsage.heapUsed),
          heapTotal: formatMemoryUsage(memoryUsage.heapTotal),
        },
      },
      cpuLoad: os.loadavg(),
      platform: os.platform(),
      cpuCores: os.cpus().length,
    };
  }

  private processRedisCheck(
    healthStatus: HealthStatus,
    result: PromiseSettledResult<any>,
  ): void {
    if (result.status === 'fulfilled') {
      healthStatus.checks.redis = {
        status: result.value.redis.status === 'up' ? 'ok' : 'error',
        message:
          result.value.redis.status === 'up'
            ? 'Redis connection established'
            : undefined,
        error:
          result.value.redis.status !== 'up'
            ? result.value.redis.message || 'Communication failure with Redis'
            : undefined,
      };

      if (result.value.redis.status !== 'up') {
        healthStatus.status = 'degraded';
      }
    } else {
      healthStatus.checks.redis = {
        status: 'error',
        error: `Failed to verify Redis: ${result.reason?.message || 'Unknown error'}`,
      };
      healthStatus.status = 'degraded';
    }
  }

  private processFirebaseCheck(
    healthStatus: HealthStatus,
    result: PromiseSettledResult<any>,
  ): void {
    if (result.status === 'fulfilled') {
      healthStatus.checks.firebase = {
        status: result.value.firebase.status === 'up' ? 'ok' : 'error',
        initialized: result.value.firebase.status === 'up',
        projectId: process.env.FIREBASE_PROJECT_ID || '',
        message:
          result.value.firebase.status === 'up'
            ? 'Firebase connection established'
            : undefined,
        error:
          result.value.firebase.status !== 'up'
            ? result.value.firebase.message ||
              'Communication with Firebase failed'
            : undefined,
      };

      if (result.value.firebase.status !== 'up') {
        healthStatus.status = 'degraded';
      }
    } else {
      healthStatus.checks.firebase = {
        status: 'error',
        initialized: false,
        projectId: process.env.FIREBASE_PROJECT_ID || '',
        error: `Firebase verification failed: ${result.reason?.message || 'Unknown error'}`,
      };
      healthStatus.status = 'degraded';
    }
  }

  private processWordpressCheck(
    healthStatus: HealthStatus,
    result: PromiseSettledResult<any>,
  ): void {
    if (result.status === 'fulfilled') {
      healthStatus.checks.wordpress = {
        status: result.value.wordpress.status === 'up' ? 'ok' : 'error',
        message:
          result.value.wordpress.status === 'up'
            ? 'Wordpress connection established'
            : undefined,
        error:
          result.value.wordpress.status !== 'up'
            ? result.value.wordpress.message ||
              'Failure in communication with Wordpress'
            : undefined,
      };

      if (result.value.wordpress.status !== 'up') {
        healthStatus.status = 'degraded';
      }
    } else {
      healthStatus.checks.wordpress = {
        status: 'error',
        error: `Failed to verify Wordpress: ${result.reason?.message || 'Unknown error'}`,
      };
      healthStatus.status = 'degraded';
    }
  }

  private processPandascoreApiCheck(
    healthStatus: HealthStatus,
    result: PromiseSettledResult<any>,
  ): void {
    if (result.status === 'fulfilled') {
      healthStatus.checks.pandascore = {
        status: result.value.pandascore.status === 'up' ? 'ok' : 'error',
        message:
          result.value.pandascore.status === 'up'
            ? 'Pandascore API connection established'
            : undefined,
        error:
          result.value.pandascore.status !== 'up'
            ? result.value.pandascore.message ||
              'Failure in communication with Pandascore API'
            : undefined,
      };

      if (result.value.pandascore.status !== 'up') {
        healthStatus.status = 'degraded';
      }
    } else {
      healthStatus.checks.pandascore = {
        status: 'error',
        error: `Failed to verify Pandascore API: ${result.reason?.message || 'Unknown error'}`,
      };
      healthStatus.status = 'degraded';
    }
  }

  private createErrorResponse(): HealthStatus {
    return {
      status: 'error',
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(process.uptime() / 60)} min`,
      checks: {},
      service: {
        name: 'gg-api',
        env: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '0.0.1',
      },
    };
  }
}
