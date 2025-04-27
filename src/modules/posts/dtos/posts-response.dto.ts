import { ApiProperty } from '@nestjs/swagger';

class OffsetPaginationDto {
  @ApiProperty({
    example: true,
  })
  hasMore: boolean;

  @ApiProperty({
    example: false,
  })
  hasPrevious: boolean;

  @ApiProperty({
    example: 42,
  })
  total: number;
}

class PageInfoDto {
  @ApiProperty({
    type: OffsetPaginationDto,
    example: {
      hasMore: true,
      hasPrevious: false,
      total: 42,
    },
  })
  offsetPagination: OffsetPaginationDto;
}

class FeaturedImageDto {
  @ApiProperty({
    example: 'Featured image alt text',
  })
  altText: string;

  @ApiProperty({
    example: 'https://example.com/images/gaming-news-cover.jpg',
  })
  sourceUrl: string;
}

class CategoryDto {
  @ApiProperty({
    example: 'cat123ABC',
  })
  id: string;

  @ApiProperty({
    example: 'action-games',
  })
  slug: string;

  @ApiProperty({
    example: 'Action Games',
  })
  name: string;

  @ApiProperty({
    example: '/games/action-games',
  })
  uri: string;

  @ApiProperty({
    example: 'parentCat456DEF',
  })
  parentId: string;
}

class IconDto {
  @ApiProperty({
    example: 'Game icon description',
  })
  altText: string;

  @ApiProperty({
    example: 'https://example.com/icons/game-icon.png',
  })
  sourceUrl: string;
}

class TagExtraFieldsDto {
  @ApiProperty({
    type: IconDto,
    example: {
      altText: 'Game icon description',
      sourceUrl: 'https://example.com/icons/game-icon.png',
    },
  })
  icon: IconDto;
}

class TagDto {
  @ApiProperty({
    example: 'tag789XYZ',
  })
  id: string;

  @ApiProperty({
    example: 'adventure-game',
  })
  slug: string;

  @ApiProperty({
    example: 'Adventure Game',
  })
  name: string;

  @ApiProperty({
    type: TagExtraFieldsDto,
    example: {
      icon: {
        altText: 'Game icon description',
        sourceUrl: 'https://example.com/icons/game-icon.png',
      },
    },
  })
  tagExtraFields: TagExtraFieldsDto;
}

class PostDto {
  @ApiProperty({
    example: 'post123XYZ',
  })
  id: string;

  @ApiProperty({
    example: 'exciting-game-launch-announced',
  })
  slug: string;

  @ApiProperty({
    example: '/games/adventure/exciting-game-launch-announced',
  })
  uri: string;

  @ApiProperty({
    type: FeaturedImageDto,
    example: {
      altText: 'Featured image alt text',
      sourceUrl: 'https://example.com/images/gaming-news-cover.jpg',
    },
  })
  featuredImage: FeaturedImageDto;

  @ApiProperty({
    example: 'Exciting Game Launch Announced for Next Year',
  })
  title: string;

  @ApiProperty({
    example:
      '<p>The highly anticipated sequel has finally been announced with groundbreaking new features and impressive graphics that push the boundaries of gaming.</p>',
  })
  excerpt: string;

  @ApiProperty({
    type: [CategoryDto],
    example: [
      {
        id: 'cat123ABC',
        slug: 'action-games',
        name: 'Action Games',
        uri: '/games/action-games',
        parentId: 'parentCat456DEF',
      },
    ],
  })
  categories: CategoryDto[];

  @ApiProperty({
    type: [TagDto],
    example: [
      {
        id: 'tag789XYZ',
        slug: 'adventure-game',
        name: 'Adventure Game',
        tagExtraFields: {
          icon: {
            altText: 'Game icon description',
            sourceUrl: 'https://example.com/icons/game-icon.png',
          },
        },
      },
    ],
  })
  tags: TagDto[];
}

export class PostsResponseDto {
  @ApiProperty({
    type: PageInfoDto,
    example: {
      offsetPagination: {
        hasMore: true,
        hasPrevious: false,
        total: 42,
      },
    },
  })
  pageInfo: PageInfoDto;

  @ApiProperty({
    type: [PostDto],
    example: [
      {
        id: 'post123XYZ',
        slug: 'exciting-game-launch-announced',
        uri: '/games/adventure/exciting-game-launch-announced',
        featuredImage: {
          altText: 'Featured image alt text',
          sourceUrl: 'https://example.com/images/gaming-news-cover.jpg',
        },
        title: 'Exciting Game Launch Announced for Next Year',
        excerpt:
          '<p>The highly anticipated sequel has finally been announced with groundbreaking new features and impressive graphics that push the boundaries of gaming.</p>',
        categories: [
          {
            id: 'cat123ABC',
            slug: 'action-games',
            name: 'Action Games',
            uri: '/games/action-games',
            parentId: 'parentCat456DEF',
          },
        ],
        tags: [
          {
            id: 'tag789XYZ',
            slug: 'adventure-game',
            name: 'Adventure Game',
            tagExtraFields: {
              icon: {
                altText: 'Game icon description',
                sourceUrl: 'https://example.com/icons/game-icon.png',
              },
            },
          },
        ],
      },
    ],
  })
  posts: PostDto[];
}
