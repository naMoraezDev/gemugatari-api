import { ApiProperty } from '@nestjs/swagger';

export class YouTubeVideoIdDto {
  @ApiProperty({
    example: 'youtube#video',
  })
  kind: string;

  @ApiProperty({
    example: 'dQw4w9WgXcQ',
  })
  videoId: string;
}

export class YouTubeThumbnailDto {
  @ApiProperty({
    example: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg',
  })
  url: string;

  @ApiProperty({
    example: 120,
  })
  width: number;

  @ApiProperty({
    example: 90,
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

export class YouTubeSnippetDto {
  @ApiProperty({
    example: '2025-04-15T14:32:08Z',
  })
  publishedAt: string;

  @ApiProperty({
    example: 'UC2XyGpCDp2qZPzJWbcgZ7Kg',
  })
  channelId: string;

  @ApiProperty({
    example: 'Valorant Championship Series - Grand Finals Highlights',
  })
  title: string;

  @ApiProperty({
    example:
      'The most exciting moments from the VCS Grand Finals where Team Liquid faced off against Sentinels in an epic showdown...',
  })
  description: string;

  @ApiProperty({
    type: YouTubeThumbnailsDto,
  })
  thumbnails: YouTubeThumbnailsDto;

  @ApiProperty({
    example: 'ESports Central',
  })
  channelTitle: string;

  @ApiProperty({
    example: 'none',
  })
  liveBroadcastContent: string;

  @ApiProperty({
    example: '2025-04-15T14:32:08Z',
  })
  publishTime: string;
}

export class YouTubeSearchResultDto {
  @ApiProperty({
    example: 'youtube#searchResult',
  })
  kind: string;

  @ApiProperty({
    example: 'a1b2c3d4e5f6g7h8i9j0',
  })
  etag: string;

  @ApiProperty({
    type: YouTubeVideoIdDto,
  })
  id: YouTubeVideoIdDto;

  @ApiProperty({
    type: YouTubeSnippetDto,
  })
  snippet: YouTubeSnippetDto;
}

export class YouTubePageInfoDto {
  @ApiProperty({
    example: 589423,
  })
  totalResults: number;

  @ApiProperty({
    example: 5,
  })
  resultsPerPage: number;
}

export class YouTubeSearchListResponseDto {
  @ApiProperty({
    example: 'youtube#searchListResponse',
  })
  kind: string;

  @ApiProperty({
    example: 'p7q8r9s0t1u2v3w4x5y6',
  })
  etag: string;

  @ApiProperty({
    example: 'CAEQAA',
  })
  nextPageToken: string;

  @ApiProperty({
    example: 'US',
  })
  regionCode: string;

  @ApiProperty({
    type: YouTubePageInfoDto,
  })
  pageInfo: YouTubePageInfoDto;

  @ApiProperty({
    type: [YouTubeSearchResultDto],
  })
  items: YouTubeSearchResultDto[];
}
