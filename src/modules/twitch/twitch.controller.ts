import {
  Get,
  Req,
  Param,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { TwitchService } from './twitch.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { TwitchUsersResponseDto } from './dtos/user-response.dto';
import { ApiKeyAuth } from 'src/common/decorators/api-key.decorator';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';
import { ApiTags, ApiParam, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';
import { GetTwitchUserDataParamDto } from 'src/integrations/twitch/dtos/twitch-user-request.dto';

@ApiTags('twitch')
@Controller('twitch')
@UseGuards(ApiKeyGuard)
@ApiKeyAuth()
export class TwitchController {
  constructor(
    private readonly twitchService: TwitchService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @Get('channels/:username')
  @ApiOperation({
    summary: 'Retrieve Twitch channel information by username',
    description:
      'Fetches comprehensive information about a Twitch channel using the provided username. Results are cached for 100 seconds to optimize performance and reduce API calls to Twitch. This endpoint requires API key authentication to access.',
  })
  @ApiParam({
    type: String,
    required: true,
    name: 'username',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: TwitchUsersResponseDto })
  @ApiResponse({
    description: 'Not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Service Unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getTwitchUser(
    @Req() request: Request,
    @Param() param: GetTwitchUserDataParamDto,
  ) {
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const userData = await this.twitchService.getTwitchUser(param);

    if (!userData) {
      throw new NotFoundException(
        `Twitch user with username '${param.username}' not found`,
      );
    }

    await this.redisCacheService.set(cacheKey, userData);

    return userData;
  }
}
