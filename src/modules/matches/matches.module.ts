import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PandascoreModule } from 'src/integrations/pandascore/pandascore.module';

@Module({
  imports: [PandascoreModule],
  exports: [MatchesService],
  providers: [MatchesService],
  controllers: [MatchesController],
})
export class MatchesModule {}
