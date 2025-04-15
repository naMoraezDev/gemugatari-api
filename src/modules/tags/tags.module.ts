import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { RedisCacheModule } from 'src/integrations/redis/redis-cache.module';
import { WordpressService } from 'src/integrations/wordpress/wordpress.service';

@Module({
  exports: [TagsService],
  imports: [RedisCacheModule],
  controllers: [TagsController],
  providers: [TagsService, WordpressService],
})
export class TagsModule {}
