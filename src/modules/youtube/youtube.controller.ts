import {
  Get,
  Req,
  Param,
  Query,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Request } from 'express';
import { YoutubeService } from './youtube.service';
import {
  VideosParamDto,
  VideosQueryDto,
} from 'src/integrations/youtube/dtos/videos-request.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { ApiKeyAuth } from 'src/common/decorators/api-key.decorator';
import { YouTubeChannelResponseDto } from './dtos/channel-response.dto';
import { YouTubeSearchListResponseDto } from './dtos/videos-response.dto';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';

@ApiTags('youtube')
@Controller('youtube')
@UseGuards(ApiKeyGuard)
@ApiKeyAuth()
export class VideosController {
  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @Get('videos/channel/:id/latest')
  @ApiOperation({
    summary: 'Retrieve latest videos from a YouTube channel',
    description:
      'Fetches the most recent videos from a specified YouTube channel ID. Supports optional limit parameter to control the number of videos returned. Results are cached to improve performance on subsequent requests. Requires API key authentication.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiQuery({
    type: String,
    name: 'limit',
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: YouTubeSearchListResponseDto })
  @ApiResponse({
    description: 'Service Unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getCategories(
    @Req() request: Request,
    @Param() param: VideosParamDto,
    @Query() query: VideosQueryDto,
  ) {
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const latestVideos = await this.youtubeService.getLatestVideos(
      param,
      query,
    );

    await this.redisCacheService.set(cacheKey, latestVideos);

    return latestVideos;
  }

  @Get('channel/:id/')
  @ApiOperation({
    summary: 'Retrieve YouTube channel information',
    description:
      'Fetches detailed information about a YouTube channel based on the provided channel ID. Returns channel statistics, metadata, and profile information. Results are cached for 100 seconds to improve performance on subsequent requests. Requires API key authentication.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: YouTubeChannelResponseDto })
  @ApiResponse({
    description: 'Service Unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getChannelData(
    @Req() request: Request,
    @Param() param: VideosParamDto,
  ) {
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const channelData = await this.youtubeService.getChannelData(param);

    await this.redisCacheService.set(cacheKey, channelData);

    return channelData;
  }
}
