export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  liked: string[];
  favorited: string[];
  createdAt?: string;
  updatedAt?: string;
}
