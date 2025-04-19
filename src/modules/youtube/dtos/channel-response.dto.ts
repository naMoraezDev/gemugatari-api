import { ApiProperty } from '@nestjs/swagger';

export class YouTubeThumbnailDto {
  @ApiProperty({
    example:
      'https://yt3.ggpht.com/ytc/AAUvwniZ1Z8Jq8IfL8-5mVMQgw9etxNTRTmG2vF6Z9zX=s88-c-k-c0x00ffffff-no-rj',
  })
  url: string;

  @ApiProperty({
    example: 88,
  })
  width: number;

  @ApiProperty({
    example: 88,
  })
  height: number;
}

export class YouTubeThumbnailsDto {
  @ApiProperty({
    type: YouTubeThumbnailDto,
  })
  default: YouTubeThumbnailDto;

  @ApiProperty({
    type: YouTubeThumbnailDto,
  })
  medium: YouTubeThumbnailDto;

  @ApiProperty({
    type: YouTubeThumbnailDto,
  })
  high: YouTubeThumbnailDto;
}

export class YouTubeLocalizedDto {
  @ApiProperty({
    example: 'Valorant Champions Tour',
  })
  title: string;

  @ApiProperty({
    example:
      'Official channel for Valorant Champions Tour esports competitions worldwide',
  })
  description: string;
}

export class YouTubeChannelSnippetDto {
  @ApiProperty({
    example: 'Valorant Champions Tour',
  })
  title: string;

  @ApiProperty({
    example:
      'Official channel for Valorant Champions Tour esports competitions worldwide',
  })
  description: string;

  @ApiProperty({
    example: '@vct',
  })
  customUrl: string;

  @ApiProperty({
    example: '2018-06-15T18:23:12Z',
  })
  publishedAt: string;

  @ApiProperty({
    type: YouTubeThumbnailsDto,
  })
  thumbnails: YouTubeThumbnailsDto;

  @ApiProperty({
    type: YouTubeLocalizedDto,
  })
  localized: YouTubeLocalizedDto;

  @ApiProperty({
    example: 'US',
  })
  country: string;
}

export class YouTubeChannelDto {
  @ApiProperty({
    example: 'youtube#channel',
  })
  kind: string;

  @ApiProperty({
    example: 'XyZ123AbC456DeF789GhI',
  })
  etag: string;

  @ApiProperty({
    example: 'UC7z8YWpmXf2w-n9CE_LkDiQ',
  })
  id: string;

  @ApiProperty({
    type: YouTubeChannelSnippetDto,
  })
  snippet: YouTubeChannelSnippetDto;
}

export class YouTubeChannelResponseDto {
  @ApiProperty({
    type: [YouTubeChannelDto],
  })
  items: YouTubeChannelDto[];
}
