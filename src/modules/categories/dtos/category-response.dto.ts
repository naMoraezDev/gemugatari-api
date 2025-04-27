import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
  @ApiProperty({
    example: 'Imagem de capa do jogo',
  })
  altText: string;

  @ApiProperty({
    example: 'https://exemplo.com/imagens/jogos/game-cover.jpg',
  })
  sourceUrl: string;
}

export class TagExtraFieldsDto {
  @ApiProperty({
    type: ImageDto,
    example: {
      altText: 'Ícone do jogo',
      sourceUrl: 'https://exemplo.com/imagens/icones/game-icon.png',
    },
  })
  icon: ImageDto;
}

export class TagDto {
  @ApiProperty({
    example: 'tag123',
  })
  id: string;

  @ApiProperty({
    example: 'battle-royale',
  })
  slug: string;

  @ApiProperty({
    example: 'Battle Royale',
  })
  name: string;

  @ApiProperty({
    type: TagExtraFieldsDto,
    example: {
      icon: {
        altText: 'Ícone de Battle Royale',
        sourceUrl: 'https://exemplo.com/imagens/icones/battle-royale.png',
      },
    },
  })
  tagExtraFields: TagExtraFieldsDto;
}

export class CategoryReferenceDto {
  @ApiProperty({
    example: 'cat123',
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
    example: '/games/fps-games',
  })
  uri: string;

  @ApiProperty({
    example: 'parent456',
    nullable: true,
  })
  parentId: string | null;
}

export class PostDto {
  @ApiProperty({
    example: 'post789',
  })
  id: string;

  @ApiProperty({
    example: 'novo-mapa-anunciado-para-shooter-arena',
  })
  slug: string;

  @ApiProperty({
    example: '/games/fps-games/novo-mapa-anunciado-para-shooter-arena',
  })
  uri: string;

  @ApiProperty({
    type: ImageDto,
    example: {
      altText: 'Preview do novo mapa',
      sourceUrl: 'https://exemplo.com/imagens/posts/novo-mapa-preview.jpg',
    },
  })
  featuredImage: ImageDto;

  @ApiProperty({
    example: 'Novo Mapa Anunciado para Shooter Arena',
  })
  title: string;

  @ApiProperty({
    example:
      '<p>O aguardado novo mapa para Shooter Arena foi finalmente anunciado com lançamento previsto para o próximo mês.</p>',
  })
  excerpt: string;

  @ApiProperty({
    type: [CategoryReferenceDto],
    example: [
      {
        id: 'cat123',
        slug: 'fps-games',
        name: 'FPS Games',
        uri: '/games/fps-games',
        parentId: 'parent456',
      },
    ],
  })
  categories: CategoryReferenceDto[];

  @ApiProperty({
    type: [TagDto],
    example: [
      {
        id: 'tag123',
        slug: 'shooter-arena',
        name: 'Shooter Arena',
        tagExtraFields: {
          icon: {
            altText: 'Ícone do Shooter Arena',
            sourceUrl: 'https://exemplo.com/imagens/icones/shooter-arena.png',
          },
        },
      },
    ],
  })
  tags: TagDto[];
}

export class HighlightDto extends PostDto {}

export class CategoryExtraFieldsDto {
  @ApiProperty({
    type: ImageDto,
    nullable: true,
    example: {
      altText: 'Banner da categoria',
      sourceUrl: 'https://exemplo.com/imagens/banners/fps-games-banner.jpg',
    },
  })
  banner: ImageDto | null;

  @ApiProperty({
    example: 'default',
  })
  template: string;

  @ApiProperty({
    type: ImageDto,
    nullable: true,
    example: null,
  })
  headerBackground: ImageDto | null;

  @ApiProperty({
    nullable: true,
    example: null,
  })
  headerText: string | null;

  @ApiProperty({
    type: [HighlightDto],
    example: [
      {
        id: 'post789',
        slug: 'novo-campeonato-mundial-anunciado',
        uri: '/games/fps-games/novo-campeonato-mundial-anunciado',
        featuredImage: {
          altText: 'Imagem do campeonato',
          sourceUrl: 'https://exemplo.com/imagens/posts/campeonato.jpg',
        },
        title: 'Novo Campeonato Mundial Anunciado',
        excerpt:
          '<p>O maior campeonato de todos os tempos foi anunciado com premiação recorde.</p>',
        categories: [
          {
            id: 'cat123',
            slug: 'fps-games',
            name: 'FPS Games',
            uri: '/games/fps-games',
            parentId: 'parent456',
          },
        ],
        tags: [
          {
            id: 'tag456',
            slug: 'campeonatos',
            name: 'Campeonatos',
            tagExtraFields: {
              icon: {
                altText: 'Ícone de troféu',
                sourceUrl: 'https://exemplo.com/imagens/icones/trofeu.png',
              },
            },
          },
        ],
      },
    ],
  })
  highlights: HighlightDto[];
}

export class ChildCategoryDto {
  @ApiProperty({
    example: 'cat789',
  })
  id: string;

  @ApiProperty({
    example: 'tactical-shooters',
  })
  slug: string;

  @ApiProperty({
    example: 'Tactical Shooters',
  })
  name: string;

  @ApiProperty({
    example: '/games/fps-games/tactical-shooters',
  })
  uri: string;

  @ApiProperty({
    example: 'cat123',
  })
  parentId: string;

  @ApiProperty({
    type: CategoryExtraFieldsDto,
    example: {
      banner: null,
    },
  })
  categoryExtraFields: {
    banner: ImageDto | null;
  };

  @ApiProperty({
    type: [PostDto],
    example: [
      {
        id: 'post123',
        slug: 'nova-arma-adicionada',
        uri: '/games/fps-games/tactical-shooters/nova-arma-adicionada',
        featuredImage: {
          altText: 'Imagem da nova arma',
          sourceUrl: 'https://exemplo.com/imagens/posts/nova-arma.jpg',
        },
        title: 'Nova Arma Adicionada ao Arsenal',
        excerpt:
          '<p>Uma nova arma tática foi adicionada ao jogo com o objetivo de balancear as partidas competitivas.</p>',
        categories: [
          {
            id: 'cat789',
            slug: 'tactical-shooters',
            name: 'Tactical Shooters',
            uri: '/games/fps-games/tactical-shooters',
            parentId: 'cat123',
          },
        ],
        tags: [
          {
            id: 'tag789',
            slug: 'atualizacoes',
            name: 'Atualizações',
            tagExtraFields: {
              icon: {
                altText: 'Ícone de atualização',
                sourceUrl: 'https://exemplo.com/imagens/icones/atualizacao.png',
              },
            },
          },
        ],
      },
    ],
  })
  posts: PostDto[];
}

export class CategoryDto {
  @ApiProperty({
    example: 'cat123',
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
    example: '/games/fps-games',
  })
  uri: string;

  @ApiProperty({
    example: 'parent456',
    nullable: true,
  })
  parentId: string | null;

  @ApiProperty({
    nullable: true,
    example: null,
  })
  description: string | null;

  @ApiProperty({
    type: CategoryExtraFieldsDto,
    example: {
      banner: null,
      template: 'default',
      headerBackground: null,
      headerText: null,
      highlights: [
        {
          id: 'post789',
          slug: 'novo-campeonato-mundial-anunciado',
          uri: '/games/fps-games/novo-campeonato-mundial-anunciado',
          featuredImage: {
            altText: 'Imagem do campeonato',
            sourceUrl: 'https://exemplo.com/imagens/posts/campeonato.jpg',
          },
          title: 'Novo Campeonato Mundial Anunciado',
          excerpt:
            '<p>O maior campeonato de todos os tempos foi anunciado com premiação recorde.</p>',
          categories: [
            {
              id: 'cat123',
              slug: 'fps-games',
              name: 'FPS Games',
              uri: '/games/fps-games',
              parentId: 'parent456',
            },
          ],
          tags: [
            {
              id: 'tag456',
              slug: 'campeonatos',
              name: 'Campeonatos',
              tagExtraFields: {
                icon: {
                  altText: 'Ícone de troféu',
                  sourceUrl: 'https://exemplo.com/imagens/icones/trofeu.png',
                },
              },
            },
          ],
        },
      ],
    },
  })
  categoryExtraFields: CategoryExtraFieldsDto;

  @ApiProperty({
    type: [ChildCategoryDto],
    example: [
      {
        id: 'cat789',
        slug: 'tactical-shooters',
        name: 'Tactical Shooters',
        uri: '/games/fps-games/tactical-shooters',
        parentId: 'cat123',
        categoryExtraFields: {
          banner: null,
        },
        posts: [
          {
            id: 'post123',
            slug: 'nova-arma-adicionada',
            uri: '/games/fps-games/tactical-shooters/nova-arma-adicionada',
            featuredImage: {
              altText: 'Imagem da nova arma',
              sourceUrl: 'https://exemplo.com/imagens/posts/nova-arma.jpg',
            },
            title: 'Nova Arma Adicionada ao Arsenal',
            excerpt:
              '<p>Uma nova arma tática foi adicionada ao jogo com o objetivo de balancear as partidas competitivas.</p>',
            categories: [
              {
                id: 'cat789',
                slug: 'tactical-shooters',
                name: 'Tactical Shooters',
                uri: '/games/fps-games/tactical-shooters',
                parentId: 'cat123',
              },
            ],
            tags: [
              {
                id: 'tag789',
                slug: 'atualizacoes',
                name: 'Atualizações',
                tagExtraFields: {
                  icon: {
                    altText: 'Ícone de atualização',
                    sourceUrl:
                      'https://exemplo.com/imagens/icones/atualizacao.png',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  })
  children: ChildCategoryDto[];
}

export class CategoryResponseDto {
  @ApiProperty({
    type: [CategoryDto],
    example: [
      {
        id: 'cat123',
        slug: 'fps-games',
        name: 'FPS Games',
        uri: '/games/fps-games',
        parentId: null,
        description: null,
        categoryExtraFields: {
          banner: null,
          template: 'default',
          headerBackground: null,
          headerText: null,
          highlights: [],
        },
        children: [],
      },
    ],
  })
  categories: CategoryDto[];
}
