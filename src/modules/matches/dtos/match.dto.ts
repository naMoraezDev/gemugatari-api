import { ApiProperty } from '@nestjs/swagger';

export class WinnerDto {
  @ApiProperty({
    example: 131770,
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
    example: 170063,
  })
  id: number;

  @ApiProperty({
    example: 1,
  })
  position: number;

  @ApiProperty({
    example: 'running',
    enum: ['running', 'not_started', 'finished'],
  })
  status: string;

  @ApiProperty({
    example: 2700,
    nullable: true,
  })
  length: number | null;

  @ApiProperty({
    example: false,
  })
  finished: boolean;

  @ApiProperty({
    example: 1159570,
  })
  match_id: number;

  @ApiProperty({
    example: '2025-04-13T00:33:24Z',
    nullable: true,
  })
  begin_at: string | null;

  @ApiProperty({
    example: true,
  })
  detailed_stats: boolean;

  @ApiProperty({
    example: '2025-04-13T02:15:00Z',
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
    example: 2,
  })
  score: number;

  @ApiProperty({
    example: 131770,
  })
  team_id: number;
}

export class TeamDto {
  @ApiProperty({
    example: 131770,
  })
  id: number;

  @ApiProperty({
    example: 'Nouns',
  })
  name: string;

  @ApiProperty({
    example: 'US',
    nullable: true,
  })
  location: string | null;

  @ApiProperty({
    example: 'nouns-cs-go',
  })
  slug: string;

  @ApiProperty({
    example: '2025-04-12T06:47:59Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 'NOUN',
    nullable: true,
  })
  acronym: string | null;

  @ApiProperty({
    example:
      'https://cdn.pandascore.co/images/team/image/131770/985px_nouns_esports_csgo_allmode.png',
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
    example: 9238,
  })
  id: number;

  @ApiProperty({
    example: 'Eagle Masters',
  })
  name: string;

  @ApiProperty({
    example: 2025,
  })
  year: number;

  @ApiProperty({
    example: 'cs-go-dust2-us-eagle-masters-1-2025',
  })
  slug: string;

  @ApiProperty({
    example: '2025-04-07T23:00:00Z',
  })
  begin_at: string;

  @ApiProperty({
    example: '2025-04-30T22:00:00Z',
    nullable: true,
  })
  end_at: string | null;

  @ApiProperty({
    example: 131770,
    nullable: true,
  })
  winner_id: number | null;

  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  winner_type: string;

  @ApiProperty({
    example: '2025-04-06T08:40:20Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 4482,
  })
  league_id: number;

  @ApiProperty({
    example: '1',
  })
  season: string;

  @ApiProperty({
    example: 'Eagle Masters season 1 2025',
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
    example: 16451,
  })
  id: number;

  @ApiProperty({
    example: 'Swiss Stage',
  })
  name: string;

  @ApiProperty({
    example: 'online',
    enum: ['online', 'offline'],
  })
  type: string;

  @ApiProperty({
    example: 'US',
    nullable: true,
  })
  country: string | null;

  @ApiProperty({
    example: 'cs-go-dust2-us-eagle-masters-1-2025-swiss-stage',
  })
  slug: string;

  @ApiProperty({
    example: '2025-04-07T23:00:00Z',
  })
  begin_at: string;

  @ApiProperty({
    example: true,
  })
  detailed_stats: boolean;

  @ApiProperty({
    example: '2025-04-30T22:00:00Z',
    nullable: true,
  })
  end_at: string | null;

  @ApiProperty({
    example: 131770,
    nullable: true,
  })
  winner_id: number | null;

  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  winner_type: string;

  @ApiProperty({
    example: '2025-04-10T01:30:25Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 4482,
  })
  league_id: number;

  @ApiProperty({
    example: 9238,
  })
  serie_id: number;

  @ApiProperty({
    example: false,
  })
  has_bracket: boolean;

  @ApiProperty({
    example: '$10,000',
    nullable: true,
  })
  prizepool: string | null;

  @ApiProperty({
    example: 'NA',
    enum: ['NA', 'EU', 'LATAM', 'APAC'],
  })
  region: string;

  @ApiProperty({
    example: 'd',
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
    example: 4482,
  })
  id: number;

  @ApiProperty({
    example: 'Dust2.us',
  })
  name: string;

  @ApiProperty({
    example: 'https://dust2.us',
    nullable: true,
  })
  url: string | null;

  @ApiProperty({
    example: 'cs-go-dust2-us',
  })
  slug: string;

  @ApiProperty({
    example: '2021-04-01T15:10:37Z',
  })
  modified_at: string;

  @ApiProperty({
    example:
      'https://cdn.pandascore.co/images/league/image/4482/Dust2US_logo.png',
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

export class StreamDto {
  @ApiProperty({
    example: true,
  })
  main: boolean;

  @ApiProperty({
    example: 'en',
  })
  language: string;

  @ApiProperty({
    example: 'https://player.twitch.tv/?channel=moose13377',
  })
  embed_url: string;

  @ApiProperty({
    example: true,
  })
  official: boolean;

  @ApiProperty({
    example: 'https://www.twitch.tv/moose13377',
  })
  raw_url: string;
}

export class LiveDto {
  @ApiProperty({
    example: false,
  })
  supported: boolean;

  @ApiProperty({
    example: 'https://live.dust2.us/match/1159570',
    nullable: true,
  })
  url: string | null;

  @ApiProperty({
    example: '2025-04-13T00:15:00Z',
    nullable: true,
  })
  opens_at: string | null;
}

export class MatchDto {
  @ApiProperty({
    example: 9238,
  })
  serie_id: number;

  @ApiProperty({
    example: 1,
    nullable: true,
  })
  game_advantage: number | null;

  @ApiProperty({
    example: '2025-04-13T03:45:00Z',
    nullable: true,
  })
  end_at: string | null;

  @ApiProperty({
    example: 131770,
    nullable: true,
  })
  winner_id: number | null;

  @ApiProperty({
    example: true,
  })
  rescheduled: boolean;

  @ApiProperty({
    example: '1.38.2.0',
    nullable: true,
  })
  videogame_version: string | null;

  @ApiProperty({
    type: [GameDto],
  })
  games: GameDto[];

  @ApiProperty({
    example: '2025-04-13T00:51:24Z',
  })
  modified_at: string;

  @ApiProperty({
    example: '2025-04-13T00:33:24Z',
  })
  begin_at: string;

  @ApiProperty({
    type: [ResultDto],
  })
  results: ResultDto[];

  @ApiProperty({
    example: '2025-04-13T00:00:00Z',
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
    example: 4482,
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
    example: 'running',
    enum: ['running', 'not_started', 'finished'],
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
    example: 1159570,
  })
  id: number;

  @ApiProperty({
    example: 'Round 3: NOUN vs Getting Info',
  })
  name: string;

  @ApiProperty({
    example: true,
  })
  detailed_stats: boolean;

  @ApiProperty({
    type: [StreamDto],
  })
  streams_list: StreamDto[];

  @ApiProperty({
    example: 16451,
  })
  tournament_id: number;

  @ApiProperty({
    example: '2025-04-13-c4f1dd1a-bb50-45ea-b6e8-3f74b1eecc5c',
  })
  slug: string;

  @ApiProperty({
    example: 3,
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
    example: '2025-04-13T00:25:00Z',
  })
  scheduled_at: string;
}
