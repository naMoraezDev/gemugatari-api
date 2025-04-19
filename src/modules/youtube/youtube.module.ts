import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { VideosController } from './youtube.controller';
import { YoutubeClient } from 'src/integrations/youtube/youtube.client';
import { RedisCacheModule } from 'src/integrations/redis/redis-cache.module';

@Module({
  exports: [YoutubeService],
  imports: [RedisCacheModule],
  controllers: [VideosController],
  providers: [YoutubeService, YoutubeClient],
})
export class YoutubeModule {}
