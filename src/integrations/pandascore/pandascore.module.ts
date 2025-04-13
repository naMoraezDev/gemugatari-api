import { Module } from '@nestjs/common';
import { PandascoreService } from './pandascore.service';
import { PandascoreApiClient } from './pandascore.client';

@Module({
  exports: [PandascoreService],
  providers: [PandascoreService, PandascoreApiClient],
})
export class PandascoreModule {}
