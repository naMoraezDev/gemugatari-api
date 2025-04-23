import {
  HealthIndicatorResult,
  HealthIndicatorService,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WordpressHealthIndicator extends HealthIndicatorService {
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const timeoutValue = 5000;
    const validateStatus = (status: number) => status < 402;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutValue);

      const startTime = Date.now();

      const url = `${process.env.WP_BASE_URL || ''}/wp-json/custom/v1/health`;
      const options = {
        method: 'GET',
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(url, options);
      const responseTime = Date.now() - startTime;

      clearTimeout(timeoutId);

      if (!validateStatus(response.status)) {
        throw new Error(`Wordpress returned status ${response.status}`);
      }

      return {
        [key]: {
          status: 'up',
          statusCode: response.status,
          responseTime: `${responseTime}ms`,
        },
      };
    } catch (error) {
      if (error.name === 'AbortError') {
        return {
          [key]: {
            status: 'down',
            message: `Wordpress request timed out after ${timeoutValue}ms`,
            ...(process.env.NODE_ENV !== 'production' && {
              stack: error.stack,
            }),
          },
        };
      }

      return {
        [key]: {
          status: 'down',
          message: error.message,
          ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
        },
      };
    }
  }
}
