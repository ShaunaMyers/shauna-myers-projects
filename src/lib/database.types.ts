export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  featured_image: string | null;
  excerpt: string | null;
  category_id: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}
