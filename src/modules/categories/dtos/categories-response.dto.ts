import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    example: 'dGVybTo2',
  })
  id: string;

  @ApiProperty({
    example: 'cod-mw',
  })
  slug: string;

  @ApiProperty({
    example: 'COD MW',
  })
  name: string;

  @ApiProperty({
    example: '/esports/cod-mw',
  })
  uri: string;

  @ApiProperty({
    example: 'dGVybToy',
    nullable: true,
  })
  parentId: string | null;
}

export class CategoriesResponseDto {
  @ApiProperty({
    type: [CategoryDto],
    example: [
      {
        id: 'dGVybTo2',
        slug: 'category',
        name: 'Category',
        uri: '/category',
        parentId: 'dGVybToy',
      },
    ],
  })
  categories: CategoryDto[];
}
