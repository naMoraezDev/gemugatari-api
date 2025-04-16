import { ApiProperty } from '@nestjs/swagger';

export class AuthorMetaLinksDto {
  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/users/12345678',
  })
  self: string;

  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/users/12345678/help',
  })
  help: string;

  @ApiProperty({
    example: 'https://public-api.wordpress.com/rest/v1.1/sites/876543210',
  })
  site: string;
}

export class AuthorMetaDto {
  @ApiProperty({
    type: AuthorMetaLinksDto,
  })
  links: AuthorMetaLinksDto;
}

export class AuthorDto {
  @ApiProperty({
    example: 98765432,
  })
  ID: number;

  @ApiProperty({
    example: 'gamewriter',
  })
  login: string;

  @ApiProperty({
    example: false,
  })
  email: boolean;

  @ApiProperty({
    example: 'GameBlog',
  })
  name: string;

  @ApiProperty({
    example: 'John',
  })
  first_name: string;

  @ApiProperty({
    example: 'Doe',
  })
  last_name: string;

  @ApiProperty({
    example: 'gamewriter',
  })
  nice_name: string;

  @ApiProperty({
    example: 'http://gamingblog.wordpress.com',
  })
  URL: string;

  @ApiProperty({
    example:
      'https://1.gravatar.com/avatar/abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx?s=96&d=identicon&r=G',
  })
  avatar_URL: string;

  @ApiProperty({
    example: 'https://gravatar.com/gamewriter',
  })
  profile_URL: string;

  @ApiProperty({
    example: 876543210,
  })
  site_ID: number;
}

export class DiscussionDto {
  @ApiProperty({
    example: true,
  })
  comments_open: boolean;

  @ApiProperty({
    example: 'open',
  })
  comment_status: string;

  @ApiProperty({
    example: true,
  })
  pings_open: boolean;

  @ApiProperty({
    example: 'open',
  })
  ping_status: string;

  @ApiProperty({
    example: 5,
  })
  comment_count: number;
}

export class PostThumbnailDto {
  @ApiProperty({
    example: 987,
  })
  ID: number;

  @ApiProperty({
    example:
      'https://gamingblog.wordpress.com/wp-content/uploads/2025/03/game-screenshot.webp',
  })
  URL: string;

  @ApiProperty({
    example:
      'http://gamingblog.files.wordpress.com/2025/03/game-screenshot.webp',
  })
  guid: string;

  @ApiProperty({
    example: 'image/webp',
  })
  mime_type: string;

  @ApiProperty({
    example: 1280,
  })
  width: number;

  @ApiProperty({
    example: 720,
  })
  height: number;
}

export class CategoryMetaLinksDto {
  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/categories/slug:valorant',
  })
  self: string;

  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/categories/slug:valorant/help',
  })
  help: string;

  @ApiProperty({
    example: 'https://public-api.wordpress.com/rest/v1.1/sites/876543210',
  })
  site: string;
}

export class CategoryMetaDto {
  @ApiProperty({
    type: CategoryMetaLinksDto,
  })
  links: CategoryMetaLinksDto;
}

export class CategoryDto {
  @ApiProperty({
    example: 12345678,
  })
  ID: number;

  @ApiProperty({
    example: 'Valorant',
  })
  name: string;

  @ApiProperty({
    example: 'valorant',
  })
  slug: string;

  @ApiProperty({
    example: 'News about the popular tactical shooter game',
  })
  description: string;

  @ApiProperty({
    example: 15,
  })
  post_count: number;

  @ApiProperty({
    example: 9876,
  })
  parent: number;

  @ApiProperty({
    type: CategoryMetaDto,
  })
  meta: CategoryMetaDto;
}

export class TagMetaLinksDto {
  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/tags/slug:patch-notes',
  })
  self: string;

  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/tags/slug:patch-notes/help',
  })
  help: string;

  @ApiProperty({
    example: 'https://public-api.wordpress.com/rest/v1.1/sites/876543210',
  })
  site: string;
}

export class TagMetaDto {
  @ApiProperty({
    type: TagMetaLinksDto,
  })
  links: TagMetaLinksDto;
}

export class TagDto {
  @ApiProperty({
    example: 87654321,
  })
  ID: number;

  @ApiProperty({
    example: 'patch notes',
  })
  name: string;

  @ApiProperty({
    example: 'patch-notes',
  })
  slug: string;

  @ApiProperty({
    example: 'Updates and changes to game mechanics',
  })
  description: string;

  @ApiProperty({
    example: 8,
  })
  post_count: number;

  @ApiProperty({
    type: TagMetaDto,
  })
  meta: TagMetaDto;
}

export class AttachmentThumbnailsDto {
  @ApiProperty({
    example:
      'https://gamingblog.wordpress.com/wp-content/uploads/2025/03/game-screenshot.webp?w=150',
  })
  thumbnail: string;

  @ApiProperty({
    example:
      'https://gamingblog.wordpress.com/wp-content/uploads/2025/03/game-screenshot.webp?w=300',
  })
  medium: string;

  @ApiProperty({
    example:
      'https://gamingblog.wordpress.com/wp-content/uploads/2025/03/game-screenshot.webp?w=1024',
  })
  large: string;
}

export class AttachmentExifDto {
  @ApiProperty({
    example: '0',
  })
  aperture: string;

  @ApiProperty({
    example: '',
  })
  credit: string;

  @ApiProperty({
    example: '',
  })
  camera: string;

  @ApiProperty({
    example: '',
  })
  caption: string;

  @ApiProperty({
    example: '0',
  })
  created_timestamp: string;

  @ApiProperty({
    example: '',
  })
  copyright: string;

  @ApiProperty({
    example: '0',
  })
  focal_length: string;

  @ApiProperty({
    example: '0',
  })
  iso: string;

  @ApiProperty({
    example: '0',
  })
  shutter_speed: string;

  @ApiProperty({
    example: '',
  })
  title: string;

  @ApiProperty({
    example: '0',
  })
  orientation: string;

  @ApiProperty({
    example: [],
    type: [String],
  })
  keywords: string[];
}

export class AttachmentMetaLinksDto {
  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/media/987',
  })
  self: string;

  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/media/987/help',
  })
  help: string;

  @ApiProperty({
    example: 'https://public-api.wordpress.com/rest/v1.1/sites/876543210',
  })
  site: string;

  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/posts/543',
  })
  parent: string;
}

export class AttachmentMetaDto {
  @ApiProperty({
    type: AttachmentMetaLinksDto,
  })
  links: AttachmentMetaLinksDto;
}

export class AttachmentDto {
  @ApiProperty({
    example: 987,
  })
  ID: number;

  @ApiProperty({
    example:
      'https://gamingblog.wordpress.com/wp-content/uploads/2025/03/game-screenshot.webp',
  })
  URL: string;

  @ApiProperty({
    example:
      'http://gamingblog.files.wordpress.com/2025/03/game-screenshot.webp',
  })
  guid: string;

  @ApiProperty({
    example: '2025-03-15T14:30:25-03:00',
  })
  date: string;

  @ApiProperty({
    example: 543,
  })
  post_ID: number;

  @ApiProperty({
    example: 98765432,
  })
  author_ID: number;

  @ApiProperty({
    example: 'game-screenshot.webp',
  })
  file: string;

  @ApiProperty({
    example: 'image/webp',
  })
  mime_type: string;

  @ApiProperty({
    example: 'webp',
  })
  extension: string;

  @ApiProperty({
    example: 'game-screenshot',
  })
  title: string;

  @ApiProperty({
    example: '',
  })
  caption: string;

  @ApiProperty({
    example: '',
  })
  description: string;

  @ApiProperty({
    example: '',
  })
  alt: string;

  @ApiProperty({
    type: AttachmentThumbnailsDto,
  })
  thumbnails: AttachmentThumbnailsDto;

  @ApiProperty({
    example: 720,
  })
  height: number;

  @ApiProperty({
    example: 1280,
  })
  width: number;

  @ApiProperty({
    type: AttachmentExifDto,
  })
  exif: AttachmentExifDto;

  @ApiProperty({
    type: AttachmentMetaDto,
  })
  meta: AttachmentMetaDto;
}

export class MetadataDto {
  @ApiProperty({
    example: '543',
  })
  id: string;

  @ApiProperty({
    example: '_thumbnail_id',
  })
  key: string;

  @ApiProperty({
    example: '987',
  })
  value: string;
}

export class PostMetaLinksDto {
  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/posts/543',
  })
  self: string;

  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/posts/543/help',
  })
  help: string;

  @ApiProperty({
    example: 'https://public-api.wordpress.com/rest/v1.1/sites/876543210',
  })
  site: string;

  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/posts/543/replies/',
  })
  replies: string;

  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/posts/543/likes/',
  })
  likes: string;
}

export class PostMetaDto {
  @ApiProperty({
    type: PostMetaLinksDto,
  })
  links: PostMetaLinksDto;
}

export class PostCapabilitiesDto {
  @ApiProperty({
    example: false,
  })
  publish_post: boolean;

  @ApiProperty({
    example: false,
  })
  delete_post: boolean;

  @ApiProperty({
    example: false,
  })
  edit_post: boolean;
}

export class PostDto {
  @ApiProperty({
    example: 543,
  })
  ID: number;

  @ApiProperty({
    example: 876543210,
  })
  site_ID: number;

  @ApiProperty({
    type: AuthorDto,
  })
  author: AuthorDto;

  @ApiProperty({
    example: '2025-03-15T14:35:42-03:00',
  })
  date: string;

  @ApiProperty({
    example: '2025-03-15T14:35:42-03:00',
  })
  modified: string;

  @ApiProperty({
    example: 'New Champion Revealed for Valorant Season 7',
  })
  title: string;

  @ApiProperty({
    example:
      'https://gamingblog.wordpress.com/2025/03/15/new-champion-revealed-for-valorant-season-7/',
  })
  URL: string;

  @ApiProperty({
    example: 'https://wp.me/p7H9gJ-3k',
  })
  short_URL: string;

  @ApiProperty({
    example:
      '<p>Riot Games has officially revealed the newest agent joining the Valorant roster in Season 7.</p>',
  })
  content: string;

  @ApiProperty({
    example:
      '<p>Riot Games has officially revealed the newest agent joining the Valorant roster in Season 7.</p>',
  })
  excerpt: string;

  @ApiProperty({
    example: 'new-champion-revealed-for-valorant-season-7',
  })
  slug: string;

  @ApiProperty({
    example: 'https://gamingblog.wordpress.com/?p=543',
  })
  guid: string;

  @ApiProperty({
    example: 'publish',
  })
  status: string;

  @ApiProperty({
    example: false,
  })
  sticky: boolean;

  @ApiProperty({
    example: '',
  })
  password: string;

  @ApiProperty({
    example: false,
  })
  parent: boolean;

  @ApiProperty({
    example: 'post',
  })
  type: string;

  @ApiProperty({
    type: DiscussionDto,
  })
  discussion: DiscussionDto;

  @ApiProperty({
    example: true,
  })
  likes_enabled: boolean;

  @ApiProperty({
    example: true,
  })
  sharing_enabled: boolean;

  @ApiProperty({
    example: 23,
  })
  like_count: number;

  @ApiProperty({
    example: false,
  })
  i_like: boolean;

  @ApiProperty({
    example: false,
  })
  is_reblogged: boolean;

  @ApiProperty({
    example: false,
  })
  is_following: boolean;

  @ApiProperty({
    example: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
  })
  global_ID: string;

  @ApiProperty({
    example:
      'https://gamingblog.wordpress.com/wp-content/uploads/2025/03/game-screenshot.webp',
  })
  featured_image: string;

  @ApiProperty({
    type: PostThumbnailDto,
  })
  post_thumbnail: PostThumbnailDto;

  @ApiProperty({
    example: 'standard',
  })
  format: string;

  @ApiProperty({
    example: false,
  })
  geo: boolean;

  @ApiProperty({
    example: 0,
  })
  menu_order: number;

  @ApiProperty({
    example: '',
  })
  page_template: string;

  @ApiProperty({
    example: [],
    type: [String],
  })
  publicize_URLs: string[];

  @ApiProperty({
    type: Object,
  })
  terms: object;

  @ApiProperty({
    type: Object,
  })
  tags: object;

  @ApiProperty({
    type: Object,
  })
  categories: object;

  @ApiProperty({
    type: Object,
  })
  attachments: object;

  @ApiProperty({
    example: 1,
  })
  attachment_count: number;

  @ApiProperty({
    type: [MetadataDto],
  })
  metadata: MetadataDto[];

  @ApiProperty({
    type: PostMetaDto,
  })
  meta: PostMetaDto;

  @ApiProperty({
    type: PostCapabilitiesDto,
  })
  capabilities: PostCapabilitiesDto;

  @ApiProperty({
    type: Object,
  })
  other_URLs: object;
}

export class PostsMetaLinksDto {
  @ApiProperty({
    example:
      'https://public-api.wordpress.com/rest/v1.1/sites/876543210/post-counts/post',
  })
  counts: string;
}

export class PostsMetaDto {
  @ApiProperty({
    type: PostsMetaLinksDto,
  })
  links: PostsMetaLinksDto;

  @ApiProperty({
    example: true,
  })
  wpcom: boolean;
}

export class PostsResponseDto {
  @ApiProperty({
    example: 5,
  })
  found: number;

  @ApiProperty({
    type: [PostDto],
  })
  posts: PostDto[];

  @ApiProperty({
    type: PostsMetaDto,
  })
  meta: PostsMetaDto;
}
