import {
  Get,
  Req,
  Query,
  Param,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Request } from 'express';
import { MatchDto } from './dtos/match.dto';
import { MatchesService } from './matches.service';
import { DetailedMatchDto } from './dtos/detailed-match.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { ApiKeyAuth } from 'src/common/decorators/api-key.decorator';
import { OpponentsResponseDto } from './dtos/opponents-response.dto';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';
import { GetMatchesQueryDto } from 'src/integrations/pandascore/dtos/get-matches-query.dto';

@ApiTags('matches')
@Controller('matches')
@UseGuards(ApiKeyGuard)
@ApiKeyAuth()
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve matches with filtering options',
    description:
      'Fetches a list of matches with optional filtering by videogame type and result limit. This endpoint requires API key authentication. Results are cached in Redis for improved performance and reduced latency on subsequent identical requests. Use this endpoint to get basic match information suitable for listings and overview displays.',
  })
  @ApiQuery({
    type: String,
    required: false,
    name: 'videogame',
  })
  @ApiQuery({
    type: String,
    name: 'limit',
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: MatchDto, isArray: true })
  @ApiResponse({
    description: 'Service Unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getMatches(
    @Req() request: Request,
    @Query() query: GetMatchesQueryDto,
  ) {
    const cacheKey = `matches:${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const matches = await this.matchesService.getMatches(query);

    await this.redisCacheService.set(cacheKey, matches);

    return matches;
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Retrieve detailed match information by slug',
    description:
      'Fetches comprehensive information for a single match identified by its unique slug. This endpoint requires API key authentication. Returns detailed match data including scores, status, and other match-specific information. Returns 404 if the match does not exist. Results are cached in Redis for improved performance on subsequent requests for the same match.',
  })
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: DetailedMatchDto })
  @ApiResponse({
    description: 'Not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Service unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getMatch(@Req() request: Request, @Param() param: DefaultParamDto) {
    const cacheKey = `match:${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const match = await this.matchesService.getMatch(param);

    if (!match) {
      throw new NotFoundException(`Match with slug '${param.slug}' not found`);
    }

    await this.redisCacheService.set(cacheKey, match);

    return match;
  }

  @Get(':slug/opponents')
  @ApiOperation({
    summary: 'Retrieve opponents information for a specific match',
    description:
      'Fetches detailed information about the teams or players competing in a match identified by its slug. This endpoint requires API key authentication. The response includes competitor profiles, statistics, and related data specific to the match context. Returns 404 if the match or opponent information does not exist. Results are cached in Redis for improved performance and reduced API load.',
  })
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: OpponentsResponseDto })
  @ApiResponse({
    description: 'Not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Service unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getMatchOpponents(
    @Req() request: Request,
    @Param() param: DefaultParamDto,
  ) {
    const cacheKey = `match:opponents:${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const matchOpponents = await this.matchesService.getMatchOpponents(param);

    if (!matchOpponents) {
      throw new NotFoundException(
        `Opponents for match with slug '${param.slug}' not found`,
      );
    }

    await this.redisCacheService.set(cacheKey, matchOpponents);

    return matchOpponents;
  }
}
