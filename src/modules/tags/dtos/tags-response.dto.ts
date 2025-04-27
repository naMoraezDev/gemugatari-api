import { ApiProperty } from '@nestjs/swagger';

class IconDto {
  @ApiProperty({
    example: 'Game icon alt text',
  })
  altText: string;

  @ApiProperty({
    example: 'https://example.com/game-icons/fantasy-game.png',
  })
  sourceUrl: string;
}

class TagExtraFieldsDto {
  @ApiProperty({
    type: IconDto,
    example: {
      altText: 'Fantasy Game Icon',
      sourceUrl: 'https://example.com/game-icons/fantasy-game.png',
    },
  })
  icon: IconDto;
}

export class TagDto {
  @ApiProperty({
    example: 42,
  })
  count: number;

  @ApiProperty({
    example: 'abc123XYZ',
  })
  id: string;

  @ApiProperty({
    example: 'fantasy-game',
  })
  slug: string;

  @ApiProperty({
    example: 'Fantasy Game',
  })
  name: string;

  @ApiProperty({
    type: TagExtraFieldsDto,
    example: {
      icon: {
        altText: 'Fantasy Game Icon',
        sourceUrl: 'https://example.com/game-icons/fantasy-game.png',
      },
    },
  })
  tagExtraFields: TagExtraFieldsDto;
}

export class TagsResponseDto {
  @ApiProperty({
    type: [TagDto],
    example: [
      {
        count: 42,
        id: 'abc123XYZ',
        slug: 'fantasy-game',
        name: 'Fantasy Game',
        tagExtraFields: {
          icon: {
            altText: 'Fantasy Game Icon',
            sourceUrl: 'https://example.com/game-icons/fantasy-game.png',
          },
        },
      },
      {
        count: 87,
        id: 'def456UVW',
        slug: 'space-shooter',
        name: 'Space Shooter',
        tagExtraFields: {
          icon: {
            altText: 'Space Shooter Icon',
            sourceUrl: 'https://example.com/game-icons/space-shooter.png',
          },
        },
      },
    ],
  })
  data: TagDto[];
}
