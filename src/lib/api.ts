import { supabase } from "./supabase";
import {
  getAllPosts as getContentPosts,
  getPostBySlug as getContentPost,
} from "./content";
import type { Post as ContentPost } from "./content";
import type { Category } from "./database";

export interface Post extends ContentPost {
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  categories?: {
    name: string;
  };
}

interface DbPost {
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  categories: {
    name: string;
  } | null;
  slug: string;
}

type MergedPost = {
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  categories?: {
    name: string;
  };
} & ContentPost;

export async function getAllPosts(): Promise<Post[]> {
  try {
    // Get posts metadata from database
    const { data: dbPosts, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        categories!fk_category(name)
      `
      )
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error.message);
      return [];
    }

    // Get content from filesystem
    const contentPosts = await getContentPosts();

    // Merge database and content data
    return (dbPosts as DbPost[])
      .map((dbPost) => {
        const contentPost = contentPosts.find((p) => p.slug === dbPost.slug);
        if (!contentPost) return null;

        const mergedPost: MergedPost = {
          ...contentPost,
          published: dbPost.published,
          published_at: dbPost.published_at,
          created_at: dbPost.created_at,
          updated_at: dbPost.updated_at,
          categories: dbPost.categories || undefined,
        };

        return mergedPost;
      })
      .filter((post): post is Post => post !== null);
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Get post metadata from database
    const { data: dbPost, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        categories!fk_category(name)
      `
      )
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) {
      console.error("Error fetching post:", error.message);
      return null;
    }

    // Get content from filesystem
    const contentPost = await getContentPost(slug);
    if (!contentPost) return null;

    const mergedPost: MergedPost = {
      ...contentPost,
      published: dbPost.published,
      published_at: dbPost.published_at,
      created_at: dbPost.created_at,
      updated_at: dbPost.updated_at,
      categories: (dbPost as DbPost).categories || undefined,
    };

    return mergedPost;
  } catch (error) {
    console.error("Error in getPostBySlug:", error);
    return null;
  }
}

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data || [];
}
