import { ApiProperty } from '@nestjs/swagger';

export class WinnerDto {
  @ApiProperty({
    example: null,
    nullable: true,
  })
  id: number | null;

  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  type: string;
}

export class GameDto {
  @ApiProperty({
    example: false,
  })
  complete: boolean;

  @ApiProperty({
    example: 163575,
  })
  id: number;

  @ApiProperty({
    example: 1,
  })
  position: number;

  @ApiProperty({
    example: 'not_started',
    enum: ['running', 'not_started', 'finished'],
  })
  status: string;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  length: number | null;

  @ApiProperty({
    example: false,
  })
  finished: boolean;

  @ApiProperty({
    example: 1127245,
  })
  match_id: number;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  begin_at: string | null;

  @ApiProperty({
    example: true,
  })
  detailed_stats: boolean;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  end_at: string | null;

  @ApiProperty({
    example: false,
  })
  forfeit: boolean;

  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  winner_type: string;

  @ApiProperty({
    type: WinnerDto,
  })
  winner: WinnerDto;
}

export class ResultDto {
  @ApiProperty({
    example: 0,
  })
  score: number;

  @ApiProperty({
    example: 135580,
  })
  team_id: number;
}

export class TeamDto {
  @ApiProperty({
    example: 135580,
  })
  id: number;

  @ApiProperty({
    example: 'Game Hunters',
  })
  name: string;

  @ApiProperty({
    example: 'BR',
    nullable: true,
  })
  location: string | null;

  @ApiProperty({
    example: 'game-hunters',
  })
  slug: string;

  @ApiProperty({
    example: '2025-04-05T21:04:13Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 'GH',
    nullable: true,
  })
  acronym: string | null;

  @ApiProperty({
    example:
      'https://cdn.pandascore.co/images/team/image/135580/244px_game_hunters_allmode.png',
    nullable: true,
  })
  image_url: string | null;
}

export class OpponentDto {
  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  type: string;

  @ApiProperty({
    type: TeamDto,
  })
  opponent: TeamDto;
}

export class SerieDto {
  @ApiProperty({
    example: 8950,
  })
  id: number;

  @ApiProperty({
    example: 'South America',
  })
  name: string;

  @ApiProperty({
    example: 2025,
  })
  year: number;

  @ApiProperty({
    example: 'cs-go-esl-challenger-league-south-america-49-2025',
  })
  slug: string;

  @ApiProperty({
    example: '2025-01-21T23:00:00Z',
  })
  begin_at: string;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  end_at: string | null;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  winner_id: number | null;

  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  winner_type: string;

  @ApiProperty({
    example: '2025-01-19T19:06:12Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 4734,
  })
  league_id: number;

  @ApiProperty({
    example: '49',
  })
  season: string;

  @ApiProperty({
    example: 'South America season 49 2025',
  })
  full_name: string;
}

export class VideogameTitleDto {
  @ApiProperty({
    example: 13,
  })
  id: number;

  @ApiProperty({
    example: 'Counter-Strike 2',
  })
  name: string;

  @ApiProperty({
    example: 'cs-2',
  })
  slug: string;

  @ApiProperty({
    example: 3,
  })
  videogame_id: number;
}

export class TournamentDto {
  @ApiProperty({
    example: 15827,
  })
  id: number;

  @ApiProperty({
    example: 'Regular Season',
  })
  name: string;

  @ApiProperty({
    example: 'online',
    enum: ['online', 'offline'],
  })
  type: string;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  country: string | null;

  @ApiProperty({
    example: 'cs-go-esl-challenger-league-south-america-49-2025-regular-season',
  })
  slug: string;

  @ApiProperty({
    example: '2025-01-21T23:00:00Z',
  })
  begin_at: string;

  @ApiProperty({
    example: true,
  })
  detailed_stats: boolean;

  @ApiProperty({
    example: '2025-05-11T22:00:00Z',
    nullable: true,
  })
  end_at: string | null;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  winner_id: number | null;

  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  winner_type: string;

  @ApiProperty({
    example: '2025-04-09T20:16:21Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 4734,
  })
  league_id: number;

  @ApiProperty({
    example: 8950,
  })
  serie_id: number;

  @ApiProperty({
    example: false,
  })
  has_bracket: boolean;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  prizepool: string | null;

  @ApiProperty({
    example: 'SA',
    enum: ['NA', 'EU', 'LATAM', 'APAC', 'SA'],
  })
  region: string;

  @ApiProperty({
    example: 'c',
    enum: ['a', 'b', 'c', 'd', 's'],
  })
  tier: string;

  @ApiProperty({
    example: false,
  })
  live_supported: boolean;
}

export class LeagueDto {
  @ApiProperty({
    example: 4734,
  })
  id: number;

  @ApiProperty({
    example: 'ESL Challenger League',
  })
  name: string;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  url: string | null;

  @ApiProperty({
    example: 'cs-go-esl-challenger-league',
  })
  slug: string;

  @ApiProperty({
    example: '2022-01-19T21:26:41Z',
  })
  modified_at: string;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  image_url: string | null;
}

export class VideogameDto {
  @ApiProperty({
    example: 3,
  })
  id: number;

  @ApiProperty({
    example: 'Counter-Strike',
  })
  name: string;

  @ApiProperty({
    example: 'cs-go',
  })
  slug: string;
}

export class LiveDto {
  @ApiProperty({
    example: false,
  })
  supported: boolean;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  url: string | null;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  opens_at: string | null;
}

export class DetailedMatchDto {
  @ApiProperty({
    example: 8950,
  })
  serie_id: number;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  game_advantage: number | null;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  end_at: string | null;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  winner_id: number | null;

  @ApiProperty({
    example: false,
  })
  rescheduled: boolean;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  videogame_version: string | null;

  @ApiProperty({
    type: [GameDto],
  })
  games: GameDto[];

  @ApiProperty({
    example: '2025-02-25T23:08:33Z',
  })
  modified_at: string;

  @ApiProperty({
    example: '2025-02-26T00:00:00Z',
  })
  begin_at: string;

  @ApiProperty({
    type: [ResultDto],
  })
  results: ResultDto[];

  @ApiProperty({
    example: '2025-02-26T00:00:00Z',
  })
  original_scheduled_at: string;

  @ApiProperty({
    example: 'best_of',
    enum: ['best_of', 'first_to'],
  })
  match_type: string;

  @ApiProperty({
    example: false,
  })
  draw: boolean;

  @ApiProperty({
    type: [OpponentDto],
  })
  opponents: OpponentDto[];

  @ApiProperty({
    type: SerieDto,
  })
  serie: SerieDto;

  @ApiProperty({
    type: VideogameTitleDto,
  })
  videogame_title: VideogameTitleDto;

  @ApiProperty({
    example: false,
  })
  forfeit: boolean;

  @ApiProperty({
    example: 4734,
  })
  league_id: number;

  @ApiProperty({
    type: TournamentDto,
  })
  tournament: TournamentDto;

  @ApiProperty({
    type: WinnerDto,
    nullable: true,
  })
  winner: WinnerDto | null;

  @ApiProperty({
    example: 'postponed',
    enum: ['running', 'not_started', 'finished', 'postponed'],
  })
  status: string;

  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  winner_type: string;

  @ApiProperty({
    type: LeagueDto,
  })
  league: LeagueDto;

  @ApiProperty({
    example: 1127245,
  })
  id: number;

  @ApiProperty({
    example: 'GH vs RED',
  })
  name: string;

  @ApiProperty({
    example: true,
  })
  detailed_stats: boolean;

  @ApiProperty({
    type: [Object],
  })
  streams_list: any[];

  @ApiProperty({
    example: 15827,
  })
  tournament_id: number;

  @ApiProperty({
    example: 'game-hunters-vs-red-canids-2025-02-26',
  })
  slug: string;

  @ApiProperty({
    example: 1,
  })
  number_of_games: number;

  @ApiProperty({
    type: LiveDto,
  })
  live: LiveDto;

  @ApiProperty({
    type: VideogameDto,
  })
  videogame: VideogameDto;

  @ApiProperty({
    example: '2025-02-26T00:00:00Z',
  })
  scheduled_at: string;
}
