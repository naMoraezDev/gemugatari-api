import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { RedisHealthIndicator } from './indicators/redis-health.indicator';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [HealthService, RedisHealthIndicator],
})
export class HealthModule {}
