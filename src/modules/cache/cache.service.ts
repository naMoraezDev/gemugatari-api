import { getRedisClient } from '../../config/redis.config';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(private readonly redisCacheService: RedisCacheService) {}

  async getKeys(pattern: string = '*'): Promise<string[]> {
    if (!this.redisCacheService.isCacheAvailable()) {
      this.logger.warn('Cache service unavailable');
      return [];
    }

    try {
      const redisClient = getRedisClient();
      return await redisClient.keys(pattern);
    } catch (error) {
      this.logger.error(`Error getting cache keys: ${error.message}`);
      throw error;
    }
  }

  async getKeyValues(keys: string[]): Promise<Record<string, any>> {
    if (!this.redisCacheService.isCacheAvailable() || keys.length === 0) {
      return {};
    }

    try {
      const result: Record<string, any> = {};

      for (const key of keys) {
        const value = await this.redisCacheService.get(key);
        result[key] = value;
      }

      return result;
    } catch (error) {
      this.logger.error(`Error getting cache values: ${error.message}`);
      throw error;
    }
  }

  async clearKey(key: string): Promise<{ message: string }> {
    if (!this.redisCacheService.isCacheAvailable()) {
      throw new NotFoundException('Cache service unavailable');
    }

    try {
      const exists = await this.redisCacheService.has(key);

      if (!exists) {
        throw new NotFoundException(`Key "${key}" not found in cache`);
      }

      await this.redisCacheService.delete(key);
      return { message: `Cache key "${key}" successfully cleared` };
    } catch (error) {
      this.logger.error(`Error clearing cache key "${key}": ${error.message}`);
      throw error;
    }
  }

  async clearKeys(
    pattern: string,
  ): Promise<{ message: string; count: number }> {
    if (!this.redisCacheService.isCacheAvailable()) {
      throw new NotFoundException('Cache service unavailable');
    }

    try {
      const keys = await this.getKeys(pattern);

      if (keys.length === 0) {
        return {
          message: `No keys found matching pattern "${pattern}"`,
          count: 0,
        };
      }

      const redisClient = getRedisClient();

      if (keys.length > 100) {
        await redisClient.unlink(keys);
      } else {
        await redisClient.del(keys);
      }

      return {
        message: `Successfully cleared ${keys.length} cache keys matching pattern "${pattern}"`,
        count: keys.length,
      };
    } catch (error) {
      this.logger.error(
        `Error clearing cache keys with pattern "${pattern}": ${error.message}`,
      );
      throw error;
    }
  }

  async clearAll(): Promise<{ message: string }> {
    if (!this.redisCacheService.isCacheAvailable()) {
      throw new NotFoundException('Cache service unavailable');
    }

    try {
      const redisClient = getRedisClient();

      await redisClient.sendCommand(['FLUSHDB']);

      return { message: 'All cache successfully cleared' };
    } catch (error) {
      this.logger.error(`Error clearing all cache: ${error.message}`);
      throw error;
    }
  }

  getCacheStatus() {
    return this.redisCacheService.getCacheStatus();
  }

  async reactivateCache(): Promise<{ success: boolean; status: any }> {
    const success = await this.redisCacheService.reactivateCache();
    return {
      success,
      status: this.redisCacheService.getCacheStatus(),
    };
  }
}
