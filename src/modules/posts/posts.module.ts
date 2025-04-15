import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { RedisCacheModule } from 'src/integrations/redis/redis-cache.module';
import { WordpressService } from 'src/integrations/wordpress/wordpress.service';

@Module({
  exports: [PostsService],
  imports: [RedisCacheModule],
  controllers: [PostsController],
  providers: [PostsService, WordpressService],
})
export class PostsModule {}
