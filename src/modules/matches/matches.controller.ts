import { Request } from 'express';
import { MatchDto } from './dtos/match.dto';
import { MatchesService } from './matches.service';
import {
  Get,
  Req,
  Query,
  Param,
  HttpCode,
  Controller,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { DetailedMatchDto } from './dtos/detailed-match.dto';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';
import { GetMatchesQueryDto } from 'src/integrations/pandascore/dtos/get-matches-query.dto';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  @Get()
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
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const matches = await this.matchesService.getMatches(query);

    await this.redisCacheService.set(cacheKey, matches);

    return matches;
  }

  @Get(':slug')
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
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

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
}
