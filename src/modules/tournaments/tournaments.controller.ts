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
import { BracketDto } from './dtos/bracket.dto';
import { StandingDto } from './dtos/standing.dto';
import { TournamentDto } from './dtos/tournament.dto';
import { TournamentsService } from './tournaments.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { RostersResponseDto } from './dtos/rosters-response.dto';
import { ApiResponseDto } from 'src/common/dtos/api-response.dto';
import { DefaultParamDto } from 'src/common/dtos/default-param.dto';
import { ApiKeyAuth } from 'src/common/decorators/api-key.decorator';
import { RedisCacheService } from 'src/integrations/redis/redis-cache.service';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';
import { GetTournamentsQueryDto } from 'src/integrations/pandascore/dtos/get-tournaments-query.dto';

@ApiTags('tournaments')
@Controller('tournaments')
@UseGuards(ApiKeyGuard)
@ApiKeyAuth()
export class TournamentsController {
  constructor(
    private readonly redisCacheService: RedisCacheService,
    private readonly tournamentsService: TournamentsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve tournaments with filtering options',
    description:
      'Fetches a list of tournaments with optional filtering by videogame and limit parameters. This endpoint requires API key authentication. Results are cached in Redis for improved performance and reduced latency on subsequent requests with the same parameters.',
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
  @ApiResponseDecorator({ type: TournamentDto, isArray: true })
  @ApiResponse({
    description: 'Service Unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getTournaments(
    @Req() request: Request,
    @Query() query: GetTournamentsQueryDto,
  ) {
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const tournaments = await this.tournamentsService.getTournaments(query);

    await this.redisCacheService.set(cacheKey, tournaments);

    return tournaments;
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Retrieve a specific tournament by slug',
    description:
      'Fetches detailed information for a single tournament identified by its slug. This endpoint requires API key authentication. Returns 404 if the tournament does not exist. Results are cached in Redis for improved performance on subsequent requests for the same tournament.',
  })
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: TournamentDto })
  @ApiResponse({
    description: 'Not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Service unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getTournament(
    @Req() request: Request,
    @Param() param: DefaultParamDto,
  ) {
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const tournament = await this.tournamentsService.getTournament(param);

    if (!tournament) {
      throw new NotFoundException(
        `Tournament with slug '${param.slug}' not found`,
      );
    }

    await this.redisCacheService.set(cacheKey, tournament);

    return tournament;
  }

  @Get(':slug/brackets')
  @ApiOperation({
    summary: 'Retrieve brackets for a specific tournament',
    description:
      'Fetches the tournament brackets structure for a tournament identified by its slug. This endpoint requires API key authentication. Brackets represent the elimination or group stages structure of the tournament. Returns 404 if the tournament or its brackets do not exist. Results are cached in Redis for improved performance.',
  })
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: BracketDto, isArray: true })
  @ApiResponse({
    description: 'Not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Service unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getTournamentBrackets(
    @Req() request: Request,
    @Param() param: DefaultParamDto,
  ) {
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const tournamentBrackets =
      await this.tournamentsService.getTournamentBrackets(param);

    if (!tournamentBrackets) {
      throw new NotFoundException(
        `Brackets for tournament with slug '${param.slug}' not found`,
      );
    }

    await this.redisCacheService.set(cacheKey, tournamentBrackets);

    return tournamentBrackets;
  }

  @Get(':slug/standings')
  @ApiOperation({
    summary: 'Retrieve standings for a specific tournament',
    description:
      'Fetches the current standings or rankings of teams/players in a tournament identified by its slug. This endpoint requires API key authentication. Standings show the current competitive position of each participant in the tournament. Returns 404 if the tournament or its standings do not exist. Results are cached in Redis for improved performance.',
  })
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: StandingDto, isArray: true })
  @ApiResponse({
    description: 'Not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Service unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getTournamentStandings(
    @Req() request: Request,
    @Param() param: DefaultParamDto,
  ) {
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const tournamentStandings =
      await this.tournamentsService.getTournamentStandings(param);

    if (!tournamentStandings) {
      throw new NotFoundException(
        `Standings for tournament with slug '${param.slug}' not found`,
      );
    }

    await this.redisCacheService.set(cacheKey, tournamentStandings);

    return tournamentStandings;
  }

  @Get(':slug/rosters')
  @ApiOperation({
    summary: 'Retrieve team rosters for a specific tournament',
    description:
      'Fetches the team rosters (lists of players) participating in a tournament identified by its slug. This endpoint requires API key authentication. Rosters provide information about which players are representing each team in the tournament. Returns 404 if the tournament or its rosters do not exist. Results are cached in Redis for improved performance.',
  })
  @ApiParam({
    type: String,
    name: 'slug',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponseDecorator({ type: RostersResponseDto })
  @ApiResponse({
    description: 'Not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Service unavailable',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  })
  async getTournamentRosters(
    @Req() request: Request,
    @Param() param: DefaultParamDto,
  ) {
    const cacheKey = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const cached = await this.redisCacheService.get(cacheKey);

    if (cached) {
      return ApiResponseDto.success(cached, { cached: true });
    }

    const tournamentRosters =
      await this.tournamentsService.getTournamentRosters(param);

    if (!tournamentRosters) {
      throw new NotFoundException(
        `Rosters for tournament with slug '${param.slug}' not found`,
      );
    }

    await this.redisCacheService.set(cacheKey, tournamentRosters);

    return tournamentRosters;
  }
}
