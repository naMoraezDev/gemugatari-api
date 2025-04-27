import { ApiProperty } from '@nestjs/swagger';

class AvatarDto {
  @ApiProperty({
    example: 'https://example.com/avatars/user-profile.jpg',
  })
  url: string;
}

class AuthorDto {
  @ApiProperty({
    example: 'gamingReporter',
  })
  name: string;

  @ApiProperty({
    example: null,
  })
  email: string | null;

  @ApiProperty({
    type: AvatarDto,
    example: {
      url: 'https://example.com/avatars/user-profile.jpg',
    },
  })
  avatar: AvatarDto;
}

class FeaturedImageDto {
  @ApiProperty({
    example: 'Gaming tournament crowd',
  })
  altText: string;

  @ApiProperty({
    example: 'https://example.com/images/featured-esports-event.jpg',
  })
  sourceUrl: string;

  @ApiProperty({
    example: '(max-width: 300px) 100vw, 300px',
  })
  sizes: string;

  @ApiProperty({
    example: null,
  })
  caption: string | null;
}

class CategoryDto {
  @ApiProperty({
    example: 'cat123ABC',
  })
  id: string;

  @ApiProperty({
    example: 'esports-news',
  })
  slug: string;

  @ApiProperty({
    example: 'Esports News',
  })
  name: string;

  @ApiProperty({
    example: '/news/esports-news',
  })
  uri: string;

  @ApiProperty({
    example: 'parentCat456DEF',
  })
  parentId: string;
}

class IconDto {
  @ApiProperty({
    example: 'Game icon',
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
      altText: 'Game icon',
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
    example: 'competitive-gaming',
  })
  slug: string;

  @ApiProperty({
    example: 'Competitive Gaming',
  })
  name: string;

  @ApiProperty({
    type: TagExtraFieldsDto,
    example: {
      icon: {
        altText: 'Game icon',
        sourceUrl: 'https://example.com/icons/game-icon.png',
      },
    },
  })
  tagExtraFields: TagExtraFieldsDto;
}

export class PostResponseDto {
  @ApiProperty({
    example: 'post123XYZ',
  })
  id: string;

  @ApiProperty({
    example: 'new-game-update-features-announced',
  })
  slug: string;

  @ApiProperty({
    example: '/games/action/new-game-update-features-announced',
  })
  uri: string;

  @ApiProperty({
    type: FeaturedImageDto,
    example: {
      altText: 'Gaming tournament crowd',
      sourceUrl: 'https://example.com/images/featured-esports-event.jpg',
      sizes: '(max-width: 300px) 100vw, 300px',
      caption: null,
    },
  })
  featuredImage: FeaturedImageDto;

  @ApiProperty({
    example: 'New Game Update Features Announced',
  })
  title: string;

  @ApiProperty({
    example:
      '<p>The newest update brings exciting features and gameplay improvements that players have been requesting for months.</p>',
  })
  excerpt: string;

  @ApiProperty({
    example: '2025-02-15T10:30:00',
  })
  date: string;

  @ApiProperty({
    example: '2025-02-16T14:45:22',
  })
  modified: string;

  @ApiProperty({
    example:
      '<p>The newest update brings exciting features and gameplay improvements that players have been requesting for months.</p><h2>Key Features</h2><ul><li>New character customization options</li><li>Enhanced battle system</li><li>More challenging gameplay modes</li></ul>',
  })
  content: string;

  @ApiProperty({
    type: AuthorDto,
    example: {
      name: 'gamingReporter',
      email: null,
      avatar: {
        url: 'https://example.com/avatars/user-profile.jpg',
      },
    },
  })
  author: AuthorDto;

  @ApiProperty({
    type: [CategoryDto],
    example: [
      {
        id: 'cat123ABC',
        slug: 'esports-news',
        name: 'Esports News',
        uri: '/news/esports-news',
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
        slug: 'competitive-gaming',
        name: 'Competitive Gaming',
        tagExtraFields: {
          icon: {
            altText: 'Game icon',
            sourceUrl: 'https://example.com/icons/game-icon.png',
          },
        },
      },
    ],
  })
  tags: TagDto[];
}
