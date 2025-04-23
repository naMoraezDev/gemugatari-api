export interface Guid {
  rendered: string;
  raw: string;
}

export interface Title {
  raw: string;
  rendered: string;
}

export interface Content {
  raw: string;
  rendered: string;
  protected: boolean;
  block_version: number;
}

export interface Excerpt {
  raw: string;
  rendered: string;
  protected: boolean;
}

export interface WordPressPostResponse {
  id: number;
  date: string;
  date_gmt: string;
  guid: Guid;
  modified: string;
  modified_gmt: string;
  password: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: Title;
  content: Content;
  excerpt: Excerpt;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, any>;
}
