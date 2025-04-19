import { ApiProperty } from '@nestjs/swagger';

export class TwitchUserDto {
  @ApiProperty({
    example: '987654321',
  })
  id: string;

  @ApiProperty({
    example: 'valorant_pro',
  })
  login: string;

  @ApiProperty({
    example: 'Valorant_Pro',
  })
  display_name: string;

  @ApiProperty({
    example: '',
  })
  type: string;

  @ApiProperty({
    example: 'partner',
  })
  broadcaster_type: string;

  @ApiProperty({
    example:
      'Professional Valorant player for Team Phoenix | Former CS champion | Streams daily gameplay and tournaments | Contact: valorantpro@email.com',
  })
  description: string;

  @ApiProperty({
    example:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/12345678-abcd-efgh-ijkl-mnopqrstuvwx-profile_image-300x300.png',
  })
  profile_image_url: string;

  @ApiProperty({
    example:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/12345678-abcd-efgh-ijkl-mnopqrstuvwx-offline_image-1920x1080.png',
  })
  offline_image_url: string;

  @ApiProperty({
    example: 542897,
  })
  view_count: number;

  @ApiProperty({
    example: '2019-08-12T15:43:21Z',
  })
  created_at: string;
}

export class TwitchUsersResponseDto {
  @ApiProperty({
    type: [TwitchUserDto],
  })
  data: TwitchUserDto[];
}
