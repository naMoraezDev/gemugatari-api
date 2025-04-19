import { Module } from '@nestjs/common';
import { TwitchService } from './twitch.service';
import { TwitchController } from './twitch.controller';
import { TwitchClient } from 'src/integrations/twitch/twitch.client';
import { RedisCacheModule } from 'src/integrations/redis/redis-cache.module';

@Module({
  exports: [TwitchService],
  imports: [RedisCacheModule],
  controllers: [TwitchController],
  providers: [TwitchService, TwitchClient],
})
export class TwitchModule {}
