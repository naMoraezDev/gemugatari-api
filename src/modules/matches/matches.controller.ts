import { Request } from 'express';
import { MatchDto } from './dtos/match.dto';
import { MatchesService } from './matches.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Get,
  Req,
  Query,
  HttpCode,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
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

    await this.redisCacheService.set(cacheKey, matches, 300);

    return matches;
  }
}
