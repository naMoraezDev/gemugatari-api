import * as os from 'os';
import {
  HealthStatus,
  checkWithTimeout,
  formatMemoryUsage,
  checkEnvironmentVariables,
} from 'src/common/utils/health-helpers';
import { Injectable, Logger } from '@nestjs/common';
import { RedisHealthIndicator } from './indicators/redis-health.indicator';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private readonly redis: RedisHealthIndicator) {}

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
        uptime: `${Math.floor(process.uptime() / 60)} minutes`,
        checks: {},
      };

      const [redisResult] = await Promise.allSettled([
        checkWithTimeout(() => this.redis.isHealthy('redis')),
      ]);

      this.processRedisCheck(healthStatus, redisResult);

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
      'WP_ADMIN_USERNAME',
      'WP_ADMIN_PASSWORD',
      'PANDASCORE_API_BASE_URL',
      'PANDASCORE_API_KEY',
      'GOOGLE_API_KEY',
      'GOOGLE_API_BASE_URL',
      'TWITCH_CLIENT_ID',
      'TWITCH_CLIENT_SECRET',
      'TWITCH_AUTH_API_URL',
      'TWITCH_API_URL',
      'GEMINI_API_KEY',
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

  private createErrorResponse(): HealthStatus {
    return {
      status: 'error',
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(process.uptime() / 60)} minutes`,
      checks: {},
      service: {
        name: 'gg-api',
        env: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '0.0.1',
      },
    };
  }
}
