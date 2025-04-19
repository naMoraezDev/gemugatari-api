import { Response } from 'express';
import { HealthService } from './health.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthStatus } from 'src/common/utils/health-helpers';
import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('liveness')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Check application liveness',
    description:
      'Checks whether the application is running and can process requests. This is a minimalist endpoint that does not perform checks on dependent components. It is especially useful for Kubernetes liveness probes, which determine whether the application should be restarted in case of failure.',
  })
  async liveness() {
    return await this.healthService.checkLiveness();
  }

  @Get('readiness')
  @ApiOperation({
    summary: 'Check application readiness',
    description:
      'Verifies that the application is ready to receive traffic by examining all external components and services that the application depends on. This comprehensive check ensures that the application is not only running, but can also operate normally with its dependencies. It is especially useful for Kubernetes readiness probes, which determine whether the application should receive traffic.',
  })
  async readiness(
    @Res({ passthrough: true }) res: Response,
  ): Promise<HealthStatus> {
    const healthStatus = await this.healthService.checkReadiness();

    const statusCode =
      healthStatus.status === 'ok'
        ? HttpStatus.OK
        : healthStatus.status === 'degraded'
          ? HttpStatus.SERVICE_UNAVAILABLE
          : HttpStatus.INTERNAL_SERVER_ERROR;

    res.status(statusCode);

    return healthStatus;
  }
}
