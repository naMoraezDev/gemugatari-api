import { ApiProperty } from '@nestjs/swagger';

export class LiveDto {
  @ApiProperty({
    example: '2025-04-15T08:25:00.000000Z',
    nullable: true,
  })
  opens_at: string | null;

  @ApiProperty({
    example: true,
  })
  supported: boolean;

  @ApiProperty({
    example: 'wss://live.esports.co/matches/87654',
    nullable: true,
  })
  url: string | null;
}

export class LastMatchDto {
  @ApiProperty({
    example: '2025-04-15T08:30:00Z',
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
    example: '2025-04-15T13:45:00Z',
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
    example: '2025-04-15T08:30:00Z',
  })
  original_scheduled_at: string;

  @ApiProperty({
    example: false,
  })
  rescheduled: boolean;

  @ApiProperty({
    example: '2025-04-15T08:00:00Z',
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
    example: [],
    type: [Object],
  })
  streams_list: any[];

  @ApiProperty({
    example: 98765,
  })
  tournament_id: number;

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
}

export class TeamDto {
  @ApiProperty({
    example: 'T1',
  })
  acronym: string;

  @ApiProperty({
    example: 45678,
  })
  id: number;

  @ApiProperty({
    example: 'https://cdn.esports.co/images/team/image/45678/team_logo.png',
  })
  image_url: string;

  @ApiProperty({
    example: 'KR',
  })
  location: string;

  @ApiProperty({
    example: '2025-03-20T16:45:30Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 'T1',
  })
  name: string;

  @ApiProperty({
    example: 't1-esports',
  })
  slug: string;
}

export class StandingDto {
  @ApiProperty({
    type: LastMatchDto,
  })
  last_match: LastMatchDto;

  @ApiProperty({
    example: 1,
  })
  rank: number;

  @ApiProperty({
    type: TeamDto,
  })
  team: TeamDto;
}
