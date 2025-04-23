import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { RedisHealthIndicator } from './indicators/redis-health.indicator';
import { FirebaseService } from 'src/integrations/firebase/firebase.service';
import { FirebaseHealthIndicator } from './indicators/firebase-health.indicator';
import { WordpressHealthIndicator } from './indicators/wordpress-health.indicator';
import { PandascoreHealthIndicator } from './indicators/pandascore-health.indicator';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [
    HealthService,
    FirebaseService,
    RedisHealthIndicator,
    FirebaseHealthIndicator,
    WordpressHealthIndicator,
    PandascoreHealthIndicator,
  ],
})
export class HealthModule {}
