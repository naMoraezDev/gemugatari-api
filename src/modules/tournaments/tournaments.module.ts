import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { RedisCacheModule } from 'src/integrations/redis/redis-cache.module';
import { PandascoreModule } from 'src/integrations/pandascore/pandascore.module';

@Module({
  exports: [TournamentsService],
  providers: [TournamentsService],
  controllers: [TournamentsController],
  imports: [PandascoreModule, RedisCacheModule],
})
export class TournamentsModule {}
