export interface WordPressPostResponse {
  ID: number;
  site_ID: number;
  author: {
    ID: number;
    login: string;
    name: string;
    URL: string;
  };
  date: string;
  modified: string;
  title: string;
  URL: string;
  short_URL: string;
  content: string;
  excerpt: string;
  slug: string;
  status: string;
  sticky: boolean;
  categories: Record<string, string>;
  tags: Record<string, string>;
  featured_image: string;
  format: string;
  edit_link: string;
  [key: string]: any;
}
