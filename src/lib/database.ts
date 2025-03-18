export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface DbPost {
  id: string;
  slug: string;
  category_id: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Join with categories
  categories?: Category;
}

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, "id" | "created_at">;
        Update: Partial<Omit<Category, "id" | "created_at">>;
      };
      posts: {
        Row: DbPost;
        Insert: Omit<DbPost, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<DbPost, "id" | "created_at" | "updated_at">>;
      };
    };
  };
};
