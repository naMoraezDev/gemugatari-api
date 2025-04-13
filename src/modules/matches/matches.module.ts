import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { RedisCacheModule } from 'src/integrations/redis/redis-cache.module';
import { PandascoreModule } from 'src/integrations/pandascore/pandascore.module';

@Module({
  exports: [MatchesService],
  providers: [MatchesService],
  controllers: [MatchesController],
  imports: [PandascoreModule, RedisCacheModule],
})
export class MatchesModule {}
