import { ApiProperty } from '@nestjs/swagger';

class AvatarDto {
  @ApiProperty({
    example: 'https://example.com/avatars/profile-picture.jpg',
  })
  url: string;
}

class AuthorDto {
  @ApiProperty({
    example: 'sportsReporter',
  })
  name: string;

  @ApiProperty({
    example: null,
  })
  email: string | null;

  @ApiProperty({
    type: AvatarDto,
    example: {
      url: 'https://example.com/avatars/profile-picture.jpg',
    },
  })
  avatar: AvatarDto;
}

class FeaturedImageDto {
  @ApiProperty({
    example: 'Esports tournament stage',
  })
  altText: string;

  @ApiProperty({
    example: 'https://example.com/images/esports-tournament.jpg',
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
    example: 'cat123XYZ',
  })
  id: string;

  @ApiProperty({
    example: 'esports-tournaments',
  })
  slug: string;

  @ApiProperty({
    example: 'Esports Tournaments',
  })
  name: string;

  @ApiProperty({
    example: '/esports/esports-tournaments',
  })
  uri: string;

  @ApiProperty({
    example: 'parentCat456ABC',
  })
  parentId: string;
}

class IconDto {
  @ApiProperty({
    example: 'Game logo',
  })
  altText: string;

  @ApiProperty({
    example: 'https://example.com/icons/game-logo.png',
  })
  sourceUrl: string;
}

class TagExtraFieldsDto {
  @ApiProperty({
    type: IconDto,
    example: {
      altText: 'Game logo',
      sourceUrl: 'https://example.com/icons/game-logo.png',
    },
  })
  icon: IconDto;
}

class TagDto {
  @ApiProperty({
    example: 'tag789ABC',
  })
  id: string;

  @ApiProperty({
    example: 'fps-games',
  })
  slug: string;

  @ApiProperty({
    example: 'FPS Games',
  })
  name: string;

  @ApiProperty({
    type: TagExtraFieldsDto,
    example: {
      icon: {
        altText: 'Game logo',
        sourceUrl: 'https://example.com/icons/game-logo.png',
      },
    },
  })
  tagExtraFields: TagExtraFieldsDto;
}

class RelatedPostFeaturedImageDto {
  @ApiProperty({
    example: 'Player celebration',
  })
  altText: string;

  @ApiProperty({
    example: 'https://example.com/images/player-celebration.jpg',
  })
  sourceUrl: string;
}

class RelatedPostCategoryDto {
  @ApiProperty({
    example: 'cat123XYZ',
  })
  id: string;

  @ApiProperty({
    example: 'esports-tournaments',
  })
  slug: string;

  @ApiProperty({
    example: 'Esports Tournaments',
  })
  name: string;

  @ApiProperty({
    example: '/esports/esports-tournaments',
  })
  uri: string;

  @ApiProperty({
    example: 'parentCat456ABC',
  })
  parentId: string;
}

class RelatedPostTagDto {
  @ApiProperty({
    example: 'tag789ABC',
  })
  id: string;

  @ApiProperty({
    example: 'fps-games',
  })
  slug: string;

  @ApiProperty({
    example: 'FPS Games',
  })
  name: string;

  @ApiProperty({
    type: TagExtraFieldsDto,
    example: {
      icon: {
        altText: 'Game logo',
        sourceUrl: 'https://example.com/icons/game-logo.png',
      },
    },
  })
  tagExtraFields: TagExtraFieldsDto;
}

class RelatedPostDto {
  @ApiProperty({
    example: 'post456DEF',
  })
  id: string;

  @ApiProperty({
    example: 'tournament-finals-results',
  })
  slug: string;

  @ApiProperty({
    example: '/esports/fps-games/tournament-finals-results',
  })
  uri: string;

  @ApiProperty({
    type: RelatedPostFeaturedImageDto,
    example: {
      altText: 'Player celebration',
      sourceUrl: 'https://example.com/images/player-celebration.jpg',
    },
  })
  featuredImage: RelatedPostFeaturedImageDto;

  @ApiProperty({
    example: 'Tournament Finals Results: Surprising Victory',
  })
  title: string;

  @ApiProperty({
    example:
      '<p>The finals of the international tournament concluded with an unexpected victory that shocked fans worldwide.</p>',
  })
  excerpt: string;

  @ApiProperty({
    type: [RelatedPostCategoryDto],
    example: [
      {
        id: 'cat123XYZ',
        slug: 'esports-tournaments',
        name: 'Esports Tournaments',
        uri: '/esports/esports-tournaments',
        parentId: 'parentCat456ABC',
      },
    ],
  })
  categories: RelatedPostCategoryDto[];

  @ApiProperty({
    type: [RelatedPostTagDto],
    example: [],
  })
  tags: RelatedPostTagDto[];
}

class PostExtraFieldsDto {
  @ApiProperty({
    type: [RelatedPostDto],
    example: [
      {
        id: 'post456DEF',
        slug: 'tournament-finals-results',
        uri: '/esports/fps-games/tournament-finals-results',
        featuredImage: {
          altText: 'Player celebration',
          sourceUrl: 'https://example.com/images/player-celebration.jpg',
        },
        title: 'Tournament Finals Results: Surprising Victory',
        excerpt:
          '<p>The finals of the international tournament concluded with an unexpected victory that shocked fans worldwide.</p>',
        categories: [
          {
            id: 'cat123XYZ',
            slug: 'esports-tournaments',
            name: 'Esports Tournaments',
            uri: '/esports/esports-tournaments',
            parentId: 'parentCat456ABC',
          },
        ],
        tags: [],
      },
    ],
  })
  relatedPosts: RelatedPostDto[];
}

export class PostResponseDto {
  @ApiProperty({
    example: 'post123ABC',
  })
  id: string;

  @ApiProperty({
    example: 'upcoming-tournament-preview',
  })
  slug: string;

  @ApiProperty({
    example: '/esports/fps-games/upcoming-tournament-preview',
  })
  uri: string;

  @ApiProperty({
    type: FeaturedImageDto,
    example: {
      altText: 'Esports tournament stage',
      sourceUrl: 'https://example.com/images/esports-tournament.jpg',
      sizes: '(max-width: 300px) 100vw, 300px',
      caption: null,
    },
  })
  featuredImage: FeaturedImageDto;

  @ApiProperty({
    example: 'Upcoming Tournament Preview: Everything You Need to Know',
  })
  title: string;

  @ApiProperty({
    example:
      '<p>The biggest tournament of the year is just around the corner with 32 teams competing for the championship title and a prize pool of $2 million.</p>',
  })
  excerpt: string;

  @ApiProperty({
    example: '2025-01-15T10:30:00',
  })
  date: string;

  @ApiProperty({
    example: '2025-01-16T14:45:22',
  })
  modified: string;

  @ApiProperty({
    example:
      '<p>The biggest tournament of the year is just around the corner with 32 teams competing for the championship title and a prize pool of $2 million.</p><h2>Format and Teams</h2><p>The tournament will feature a single-elimination bracket with best-of-three matches throughout.</p><h2>Prize Distribution</h2><p>The total prize pool will be distributed based on final placement and performance bonuses.</p>',
  })
  content: string;

  @ApiProperty({
    type: AuthorDto,
    example: {
      name: 'sportsReporter',
      email: null,
      avatar: {
        url: 'https://example.com/avatars/profile-picture.jpg',
      },
    },
  })
  author: AuthorDto;

  @ApiProperty({
    type: [CategoryDto],
    example: [
      {
        id: 'cat123XYZ',
        slug: 'esports-tournaments',
        name: 'Esports Tournaments',
        uri: '/esports/esports-tournaments',
        parentId: 'parentCat456ABC',
      },
    ],
  })
  categories: CategoryDto[];

  @ApiProperty({
    type: [TagDto],
    example: [
      {
        id: 'tag789ABC',
        slug: 'fps-games',
        name: 'FPS Games',
        tagExtraFields: {
          icon: {
            altText: 'Game logo',
            sourceUrl: 'https://example.com/icons/game-logo.png',
          },
        },
      },
    ],
  })
  tags: TagDto[];

  @ApiProperty({
    type: PostExtraFieldsDto,
    example: {
      relatedPosts: [
        {
          id: 'post456DEF',
          slug: 'tournament-finals-results',
          uri: '/esports/fps-games/tournament-finals-results',
          featuredImage: {
            altText: 'Player celebration',
            sourceUrl: 'https://example.com/images/player-celebration.jpg',
          },
          title: 'Tournament Finals Results: Surprising Victory',
          excerpt:
            '<p>The finals of the international tournament concluded with an unexpected victory that shocked fans worldwide.</p>',
          categories: [
            {
              id: 'cat123XYZ',
              slug: 'esports-tournaments',
              name: 'Esports Tournaments',
              uri: '/esports/esports-tournaments',
              parentId: 'parentCat456ABC',
            },
          ],
          tags: [],
        },
      ],
    },
  })
  postExtraFields: PostExtraFieldsDto;
}
