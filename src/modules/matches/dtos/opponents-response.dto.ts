import { ApiProperty } from '@nestjs/swagger';

export class VideoGameDto {
  @ApiProperty({
    example: 5,
  })
  id: number;

  @ApiProperty({
    example: 'Rocket League',
  })
  name: string;

  @ApiProperty({
    example: 'rocket-league',
  })
  slug: string;
}

export class PlayerDto {
  @ApiProperty({
    example: true,
  })
  active: boolean;

  @ApiProperty({
    example: 45678,
  })
  id: number;

  @ApiProperty({
    example: 'RocketMaster',
  })
  name: string;

  @ApiProperty({
    example: null,
  })
  role: string | null;

  @ApiProperty({
    example: 'rocketmaster',
  })
  slug: string;

  @ApiProperty({
    example: '2025-05-15T08:30:25Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 23,
  })
  age: number;

  @ApiProperty({
    example: '2002-03-12',
  })
  birthday: string;

  @ApiProperty({
    example: 'Marcus',
  })
  first_name: string;

  @ApiProperty({
    example: 'Johnson',
  })
  last_name: string;

  @ApiProperty({
    example: 'CA',
  })
  nationality: string;

  @ApiProperty({
    example:
      'https://cdn.gamingsite.co/images/player/image/45678/player_profile.png',
    nullable: true,
  })
  image_url: string | null;
}

export class TeamDto {
  @ApiProperty({
    example: 987654,
  })
  id: number;

  @ApiProperty({
    example: 'Rocket Pioneers',
  })
  name: string;

  @ApiProperty({
    example: 'US',
    nullable: true,
  })
  location: string | null;

  @ApiProperty({
    example: 'rocket-pioneers',
  })
  slug: string;

  @ApiProperty({
    type: [PlayerDto],
  })
  players: PlayerDto[];

  @ApiProperty({
    example: '2025-05-15T10:45:30Z',
  })
  modified_at: string;

  @ApiProperty({
    example: 'RPG',
    nullable: true,
  })
  acronym: string | null;

  @ApiProperty({
    example: 'https://cdn.gamingsite.co/images/team/image/987654/team_logo.png',
    nullable: true,
  })
  image_url: string | null;

  @ApiProperty({
    type: VideoGameDto,
  })
  current_videogame: VideoGameDto;
}

export class OpponentsResponseDto {
  @ApiProperty({
    type: [TeamDto],
  })
  opponents: TeamDto[];

  @ApiProperty({
    example: 'Team',
    enum: ['Team', 'Player'],
  })
  opponent_type: string;
}
