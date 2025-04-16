import { ApiProperty } from '@nestjs/swagger';

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

export class PlayerDto {
  @ApiProperty({
    example: true,
  })
  active: boolean;

  @ApiProperty({
    example: 25,
    nullable: true,
  })
  age: number | null;

  @ApiProperty({
    example: '2000-05-15',
    nullable: true,
  })
  birthday: string | null;

  @ApiProperty({
    example: 'John',
    nullable: true,
  })
  first_name: string | null;

  @ApiProperty({
    example: 56789,
  })
  id: number;

  @ApiProperty({
    example:
      'https://cdn.esports.co/images/player/image/56789/player_profile.png',
    nullable: true,
  })
  image_url: string | null;

  @ApiProperty({
    example: 'Smith',
    nullable: true,
  })
  last_name: string | null;

  @ApiProperty({
    example: '2025-03-10T14:35:22Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 'FlashWolf',
  })
  name: string;

  @ApiProperty({
    example: 'US',
    nullable: true,
  })
  nationality: string | null;

  @ApiProperty({
    example: 'mid',
    nullable: true,
  })
  role: string | null;

  @ApiProperty({
    example: 'flashwolf',
  })
  slug: string;
}

export class TeamDto {
  @ApiProperty({
    example: 'TSM',
  })
  acronym: string;

  @ApiProperty({
    type: VideogameDto,
  })
  current_videogame: VideogameDto;

  @ApiProperty({
    example: 12345,
  })
  id: number;

  @ApiProperty({
    example: 'https://cdn.esports.co/images/team/image/12345/team_logo.png',
  })
  image_url: string;

  @ApiProperty({
    example: 'US',
  })
  location: string;

  @ApiProperty({
    example: '2025-03-15T16:45:22Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 'Team SoloMid',
  })
  name: string;

  @ApiProperty({
    type: [PlayerDto],
  })
  players: PlayerDto[];

  @ApiProperty({
    example: 'team-solomid',
  })
  slug: string;
}

export class RostersResponseDto {
  @ApiProperty({
    type: [TeamDto],
  })
  rosters: TeamDto[];

  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  type: string;
}
