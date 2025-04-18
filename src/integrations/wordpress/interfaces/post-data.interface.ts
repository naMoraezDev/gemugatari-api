export interface PostData {
  title: string;
  tags?: string;
  content: string;
  status?: string;
  excerpt?: string;
  [key: string]: any;
  categories?: string;
}
