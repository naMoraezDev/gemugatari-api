import { ApiProperty } from '@nestjs/swagger';

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
    example: 'https://player.twitch.tv/?channel=riotgames',
    nullable: true,
  })
  embed_url: string | null;

  @ApiProperty({
    example: true,
  })
  official: boolean;

  @ApiProperty({
    example: 'https://www.twitch.tv/riotgames',
  })
  raw_url: string;
}

export class MatchDto {
  @ApiProperty({
    example: 123456,
  })
  id: number;

  @ApiProperty({
    example: 'RED vs BLU',
  })
  name: string;

  @ApiProperty({
    example: 'not_started',
    enum: ['not_started', 'running', 'finished'],
  })
  status: string;

  @ApiProperty({
    type: LiveDto,
  })
  live: LiveDto;

  @ApiProperty({
    example: 'red-team-vs-blue-team-2025-05-20',
  })
  slug: string;

  @ApiProperty({
    example: '2025-05-20T18:00:00Z',
  })
  begin_at: string;

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
    example: false,
  })
  draw: boolean;

  @ApiProperty({
    example: 54321,
  })
  tournament_id: number;

  @ApiProperty({
    example: '2025-05-15T10:25:30Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 'best_of',
    enum: ['best_of', 'first_to'],
  })
  match_type: string;

  @ApiProperty({
    example: 3,
  })
  number_of_games: number;

  @ApiProperty({
    example: '2025-05-20T18:00:00Z',
  })
  scheduled_at: string;

  @ApiProperty({
    example: '2025-05-20T18:00:00Z',
  })
  original_scheduled_at: string;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  game_advantage: number | null;

  @ApiProperty({
    type: [StreamDto],
  })
  streams_list: StreamDto[];

  @ApiProperty({
    example: false,
  })
  rescheduled: boolean;
}

export class TeamDto {
  @ApiProperty({
    example: 12345,
  })
  id: number;

  @ApiProperty({
    example: 'Blue Team',
  })
  name: string;

  @ApiProperty({
    example: 'US',
    nullable: true,
  })
  location: string | null;

  @ApiProperty({
    example: 'blue-team',
  })
  slug: string;

  @ApiProperty({
    example: '2025-03-10T14:30:00Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 'BLU',
    nullable: true,
  })
  acronym: string | null;

  @ApiProperty({
    example:
      'https://cdn.esports.co/images/team/image/12345/blue_team_logo.png',
    nullable: true,
  })
  image_url: string | null;
}

export class PlayerDto {
  @ApiProperty({
    example: true,
  })
  active: boolean;

  @ApiProperty({
    example: 7890,
  })
  id: number;

  @ApiProperty({
    example: 'BlueStar',
  })
  name: string;

  @ApiProperty({
    example: 'mid',
    nullable: true,
  })
  role: string | null;

  @ApiProperty({
    example: 'bluestar',
  })
  slug: string;

  @ApiProperty({
    example: '2025-03-15T16:45:20Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 22,
    nullable: true,
  })
  age: number | null;

  @ApiProperty({
    example: '2003-05-12',
    nullable: true,
  })
  birthday: string | null;

  @ApiProperty({
    example: 'John',
    nullable: true,
  })
  first_name: string | null;

  @ApiProperty({
    example: 'Doe',
    nullable: true,
  })
  last_name: string | null;

  @ApiProperty({
    example: 'US',
    nullable: true,
  })
  nationality: string | null;

  @ApiProperty({
    example:
      'https://cdn.esports.co/images/player/image/7890/player_profile.png',
    nullable: true,
  })
  image_url: string | null;
}

export class RosterDto {
  @ApiProperty({
    type: [PlayerDto],
  })
  players: PlayerDto[];

  @ApiProperty({
    type: () => TeamDto, // Using lazy loading to avoid circular dependency
  })
  team: TeamDto;
}

export class VideogameDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'LoL',
  })
  name: string;

  @ApiProperty({
    example: 'league-of-legends',
  })
  slug: string;
}

export class VideogameTitleDto {
  @ApiProperty({
    example: 11,
    nullable: true,
  })
  id: number | null;

  @ApiProperty({
    example: 'League of Legends',
    nullable: true,
  })
  name: string | null;

  @ApiProperty({
    example: 'league-of-legends',
    nullable: true,
  })
  slug: string | null;
}

export class LeagueDto {
  @ApiProperty({
    example: 5432,
  })
  id: number;

  @ApiProperty({
    example: 'LCS',
  })
  name: string;

  @ApiProperty({
    example: 'https://lolesports.com',
    nullable: true,
  })
  url: string | null;

  @ApiProperty({
    example: 'league-of-legends-lcs',
  })
  slug: string;

  @ApiProperty({
    example: '2024-12-10T11:30:45Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 'https://cdn.esports.co/images/league/image/5432/lcs_logo.png',
    nullable: true,
  })
  image_url: string | null;
}

export class SerieDto {
  @ApiProperty({
    example: 9876,
  })
  id: number;

  @ApiProperty({
    example: 'Spring Split',
  })
  name: string;

  @ApiProperty({
    example: 2025,
  })
  year: number;

  @ApiProperty({
    example: 'lol-league-spring-2025',
  })
  slug: string;

  @ApiProperty({
    example: '2025-01-15T18:00:00Z',
  })
  begin_at: string;

  @ApiProperty({
    example: '2025-05-15T22:00:00Z',
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
    example: '2025-01-05T14:25:42Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 5432,
  })
  league_id: number;

  @ApiProperty({
    example: 'Spring',
  })
  season: string;

  @ApiProperty({
    example: 'Spring 2025',
  })
  full_name: string;
}

export class TournamentDto {
  @ApiProperty({
    example: 54321,
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
    type: [MatchDto],
  })
  matches: MatchDto[];

  @ApiProperty({
    example: null,
    nullable: true,
  })
  country: string | null;

  @ApiProperty({
    example: 'league-of-legends-lcs-spring-2025-regular-season',
  })
  slug: string;

  @ApiProperty({
    example: '2025-01-20T18:00:00Z',
  })
  begin_at: string;

  @ApiProperty({
    example: true,
  })
  detailed_stats: boolean;

  @ApiProperty({
    example: '2025-03-15T22:00:00Z',
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
    type: [TeamDto],
  })
  teams: TeamDto[];

  @ApiProperty({
    example: 9876,
  })
  serie_id: number;

  @ApiProperty({
    type: () => SerieDto, // Using lazy loading
  })
  serie: SerieDto;

  @ApiProperty({
    type: () => VideogameDto, // Using lazy loading
  })
  videogame: VideogameDto;

  @ApiProperty({
    example: '2025-01-05T15:40:30Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 5432,
  })
  league_id: number;

  @ApiProperty({
    type: () => LeagueDto, // Using lazy loading
  })
  league: LeagueDto;

  @ApiProperty({
    example: '$100,000',
    nullable: true,
  })
  prizepool: string | null;

  @ApiProperty({
    example: 'a',
    enum: ['a', 'b', 'c', 'd', 's'],
  })
  tier: string;

  @ApiProperty({
    type: () => VideogameTitleDto, // Using lazy loading
    nullable: true,
  })
  videogame_title: VideogameTitleDto | null;

  @ApiProperty({
    example: false,
  })
  has_bracket: boolean;

  @ApiProperty({
    example: 'NA',
    enum: ['NA', 'EU', 'LATAM', 'APAC', 'WEU'],
  })
  region: string;

  @ApiProperty({
    example: false,
  })
  live_supported: boolean;

  @ApiProperty({
    type: [RosterDto],
  })
  expected_roster: RosterDto[];
}
