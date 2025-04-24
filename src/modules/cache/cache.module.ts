import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { RedisCacheModule } from 'src/integrations/redis/redis-cache.module';

@Module({
  exports: [CacheService],
  providers: [CacheService],
  imports: [RedisCacheModule],
  controllers: [CacheController],
})
export class CacheModule {}
