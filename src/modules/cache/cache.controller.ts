import {
  Get,
  Post,
  Param,
  Query,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CacheService } from './cache.service';

@ApiTags('cache')
@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Get('status')
  @ApiOperation({
    summary: 'Get cache service status',
    description:
      'Retrieves the current status of the cache service, including connectivity information, enabled state, and performance metrics. This endpoint is useful for monitoring the health and configuration of the caching system.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Current cache status information',
  })
  async getCacheStatus() {
    return this.cacheService.getCacheStatus();
  }

  @Post('reactivate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Try to reactivate cache if it was permanently disabled',
    description:
      'Attempts to reactivate the cache service if it was previously disabled due to errors or manual deactivation. Returns information about whether the reactivation was successful and the current state of the cache system. No request body is required.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Result of the reactivation attempt',
  })
  async reactivateCache() {
    return this.cacheService.reactivateCache();
  }

  @Get('keys')
  @ApiOperation({
    summary: 'List all cache keys or matching a pattern',
    description:
      'Returns a list of all keys in the cache or only those matching a specified pattern. The pattern uses Redis-like syntax (e.g., "user:*" to match all keys starting with "user:"). Useful for debugging and cache exploration without retrieving the actual values.',
  })
  @ApiQuery({
    name: 'pattern',
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of cache keys',
  })
  async getKeys(@Query('pattern') pattern: string = '*') {
    return {
      keys: await this.cacheService.getKeys(pattern),
    };
  }

  @Get('keys/:key')
  @ApiOperation({
    summary: 'Get value of a specific cache key',
    description:
      'Retrieves the stored value for a specific cache key. Returns both the key and its corresponding value if found. If the key does not exist or the cache is unavailable, a NOT_FOUND status is returned.',
  })
  @ApiParam({ name: 'key', description: 'Cache key to retrieve' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Value of the specified key',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cache key not found or cache unavailable',
  })
  async getKeyValue(@Param('key') key: string) {
    const result = await this.cacheService.getKeyValues([key]);
    return {
      key,
      value: result[key],
    };
  }

  @Get('values')
  @ApiOperation({
    summary: 'Get multiple cache values based on pattern',
    description:
      'Retrieves both keys and their values for all entries matching the specified pattern. This is a more efficient alternative to making multiple individual key requests when you need to retrieve a set of related cache entries. Returns a map of keys to their corresponding values.',
  })
  @ApiQuery({
    name: 'pattern',
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Map of keys and their values',
  })
  async getKeyValues(@Query('pattern') pattern: string = '*') {
    const keys = await this.cacheService.getKeys(pattern);
    const values = await this.cacheService.getKeyValues(keys);
    return { values };
  }

  @Delete('keys/:key')
  @ApiOperation({
    summary: 'Clear a specific cache key',
    description:
      'Removes a specific entry from the cache by its key. Returns confirmation of the deletion operation, including whether the key existed and was successfully removed. If the key does not exist or the cache is unavailable, a NOT_FOUND status is returned.',
  })
  @ApiParam({ name: 'key', description: 'Cache key to clear' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Confirmation of key deletion',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cache key not found or cache unavailable',
  })
  async clearKey(@Param('key') key: string) {
    return this.cacheService.clearKey(key);
  }

  @Delete('keys')
  @ApiOperation({
    summary: 'Clear cache keys matching a pattern',
    description:
      'Performs a batch deletion of all cache entries that match the specified pattern. This endpoint is useful for clearing related groups of cache entries (e.g., all entries for a specific user or feature). Returns statistics about how many keys were found and deleted.',
  })
  @ApiQuery({
    name: 'pattern',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Result of the batch deletion operation',
  })
  async clearKeys(@Query('pattern') pattern: string) {
    return this.cacheService.clearKeys(pattern);
  }

  @Delete()
  @ApiOperation({
    summary: 'Clear all cache',
    description:
      'Completely empties the cache, removing all stored keys and values. This operation should be used with caution as it affects all cached data across the application. Returns confirmation of the operation and statistics about how many entries were cleared.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Confirmation that all cache was cleared',
  })
  async clearAll() {
    return this.cacheService.clearAll();
  }
}
