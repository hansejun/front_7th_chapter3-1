type PostStatus = 'draft' | 'published' | 'archived';

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  status: PostStatus;
  views: number;
  createdAt: string;
  updatedAt?: string;
}
