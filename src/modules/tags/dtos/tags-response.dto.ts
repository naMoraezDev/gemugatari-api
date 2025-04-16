import { ApiProperty } from '@nestjs/swagger';

export class TagLinksDto {
  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/987654321/tags/slug:gaming-news',
  })
  self: string;

  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/987654321/tags/slug:gaming-news/help',
  })
  help: string;

  @ApiProperty({
    example: 'https://public-api.wordpress.com/rest/v1.1/sites/987654321',
  })
  site: string;
}

export class TagMetaDto {
  @ApiProperty({
    type: TagLinksDto,
  })
  links: TagLinksDto;
}

export class TagDto {
  @ApiProperty({
    example: 56789012,
  })
  ID: number;

  @ApiProperty({
    example: 'Gaming News',
  })
  name: string;

  @ApiProperty({
    example: 'gaming-news',
  })
  slug: string;

  @ApiProperty({
    example: 'Latest updates from the gaming industry',
  })
  description: string;

  @ApiProperty({
    example: 12,
  })
  post_count: number;

  @ApiProperty({
    example: 'https://gamingblog.wordpress.com/tag/gaming-news/feed/',
  })
  feed_url: string;

  @ApiProperty({
    type: TagMetaDto,
  })
  meta: TagMetaDto;
}

export class TagsResponseDto {
  @ApiProperty({
    example: 8,
  })
  found: number;

  @ApiProperty({
    type: [TagDto],
  })
  tags: TagDto[];
}
