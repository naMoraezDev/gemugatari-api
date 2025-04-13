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
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';
import { GetMatchParamsDto } from 'src/integrations/pandascore/dtos/get-match-params.dto';
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
    required: false,
    name: 'limit',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: MatchDto, isArray: true })
  @ApiResponse({
    description: 'Serviço indisponível',
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

  @Get(':id_or_slug')
  @ApiParam({
    type: String,
    required: true,
    name: 'id_or_slug',
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
  async getMatch(@Req() request: Request, @Param() param: GetMatchParamsDto) {
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const match = await this.matchesService.getMatch(param);

    if (!match) {
      throw new NotFoundException(
        `Match with id or slug '${param.id_or_slug}' not found`,
      );
    }

    await this.redisCacheService.set(cacheKey, match);

    return match;
  }
}
