import { ApiProperty } from '@nestjs/swagger';

export class WinnerDto {
  @ApiProperty({
    example: 12345,
  })
  id: number;

  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  type: string;
}

export class GameDto {
  @ApiProperty({
    example: '2025-04-15T18:30:00Z',
  })
  begin_at: string;

  @ApiProperty({
    example: true,
  })
  complete: boolean;

  @ApiProperty({
    example: true,
  })
  detailed_stats: boolean;

  @ApiProperty({
    example: '2025-04-15T19:15:45Z',
  })
  end_at: string;

  @ApiProperty({
    example: true,
  })
  finished: boolean;

  @ApiProperty({
    example: false,
  })
  forfeit: boolean;

  @ApiProperty({
    example: 302547,
  })
  id: number;

  @ApiProperty({
    example: 2145,
  })
  length: number;

  @ApiProperty({
    example: 87654,
  })
  match_id: number;

  @ApiProperty({
    example: 1,
  })
  position: number;

  @ApiProperty({
    example: 'finished',
    enum: ['running', 'not_started', 'finished'],
  })
  status: string;

  @ApiProperty({
    type: WinnerDto,
  })
  winner: WinnerDto;

  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  winner_type: string;
}

export class LiveDto {
  @ApiProperty({
    example: null,
    nullable: true,
  })
  opens_at: string | null;

  @ApiProperty({
    example: false,
  })
  supported: boolean;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  url: string | null;
}

export class OpponentTeamDto {
  @ApiProperty({
    example: 'TSM',
  })
  acronym: string;

  @ApiProperty({
    example: 56789,
  })
  id: number;

  @ApiProperty({
    example: 'https://cdn.esports.co/images/team/image/56789/team_logo.png',
  })
  image_url: string;

  @ApiProperty({
    example: 'US',
  })
  location: string;

  @ApiProperty({
    example: '2025-03-10T14:35:22Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 'Team SoloMid',
  })
  name: string;

  @ApiProperty({
    example: 'team-solomid',
  })
  slug: string;
}

export class OpponentDto {
  @ApiProperty({
    type: OpponentTeamDto,
  })
  opponent: OpponentTeamDto;

  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  type: string;
}

export class PreviousMatchDto {
  @ApiProperty({
    example: 65432,
  })
  match_id: number;

  @ApiProperty({
    example: 'winner',
  })
  type: string;
}

export class ResultDto {
  @ApiProperty({
    example: 3,
  })
  score: number;

  @ApiProperty({
    example: 56789,
  })
  team_id: number;
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

export class BracketDto {
  @ApiProperty({
    example: '2025-04-15T18:00:00Z',
  })
  begin_at: string;

  @ApiProperty({
    example: true,
  })
  detailed_stats: boolean;

  @ApiProperty({
    example: false,
  })
  draw: boolean;

  @ApiProperty({
    example: '2025-04-15T22:30:15Z',
  })
  end_at: string;

  @ApiProperty({
    example: false,
  })
  forfeit: boolean;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  game_advantage: number | null;

  @ApiProperty({
    type: [GameDto],
  })
  games: GameDto[];

  @ApiProperty({
    example: 87654,
  })
  id: number;

  @ApiProperty({
    type: LiveDto,
  })
  live: LiveDto;

  @ApiProperty({
    example: 'best_of',
    enum: ['best_of', 'first_to'],
  })
  match_type: string;

  @ApiProperty({
    example: '2025-04-10T09:45:30Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 'TSM vs C9',
  })
  name: string;

  @ApiProperty({
    example: 5,
  })
  number_of_games: number;

  @ApiProperty({
    type: [OpponentDto],
  })
  opponents: OpponentDto[];

  @ApiProperty({
    example: null,
    nullable: true,
  })
  original_scheduled_at: string | null;

  @ApiProperty({
    type: [PreviousMatchDto],
  })
  previous_matches: PreviousMatchDto[];

  @ApiProperty({
    type: [ResultDto],
  })
  results: ResultDto[];

  @ApiProperty({
    example: '2025-04-15T18:00:00Z',
  })
  scheduled_at: string;

  @ApiProperty({
    example: 'team-solomid-vs-cloud9-2025-04-15',
  })
  slug: string;

  @ApiProperty({
    example: 'finished',
    enum: ['running', 'not_started', 'finished'],
  })
  status: string;

  @ApiProperty({
    type: [StreamDto],
  })
  streams_list: StreamDto[];

  @ApiProperty({
    example: 98765,
  })
  tournament_id: number;

  @ApiProperty({
    example: 56789,
  })
  winner_id: number;

  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  winner_type: string;
}
