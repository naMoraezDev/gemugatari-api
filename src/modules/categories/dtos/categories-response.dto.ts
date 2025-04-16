import { ApiProperty } from '@nestjs/swagger';

export class CategoryLinksDto {
  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/456789123/categories/slug:league-of-legends',
  })
  self: string;

  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/456789123/categories/slug:league-of-legends/help',
  })
  help: string;

  @ApiProperty({
    example: 'https://public-api.wordpress.com/rest/v1.1/sites/456789123',
  })
  site: string;
}

export class CategoryMetaDto {
  @ApiProperty({
    type: CategoryLinksDto,
  })
  links: CategoryLinksDto;
}

export class CategoryDto {
  @ApiProperty({
    example: 87654321,
  })
  ID: number;

  @ApiProperty({
    example: 'Rocket League',
  })
  name: string;

  @ApiProperty({
    example: 'rocket-league',
  })
  slug: string;

  @ApiProperty({
    example: 'Competitive car soccer game with rocket-powered vehicles',
  })
  description: string;

  @ApiProperty({
    example: 12,
  })
  post_count: number;

  @ApiProperty({
    example:
      'https://gamingblog.wordpress.com/category/esports/rocket-league/feed/',
  })
  feed_url: string;

  @ApiProperty({
    example: 9876,
  })
  parent: number;

  @ApiProperty({
    type: CategoryMetaDto,
  })
  meta: CategoryMetaDto;
}

export class CategoriesResponseDto {
  @ApiProperty({
    example: 8,
  })
  found: number;

  @ApiProperty({
    type: [CategoryDto],
  })
  categories: CategoryDto[];
}
