import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  images: {
    featured: string;
    content: Array<{
      src: string;
      alt: string;
    }>;
  };
}

export interface Post extends PostFrontmatter {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const postDir = fs.readdirSync(BLOG_DIR).find((dir) => {
      const postPath = path.join(BLOG_DIR, dir, "index.mdx");
      if (!fs.existsSync(postPath)) return false;
      const { data } = matter(fs.readFileSync(postPath, "utf8"));
      return data.slug === slug;
    });

    if (!postDir) return null;

    const fullPath = path.join(BLOG_DIR, postDir, "index.mdx");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...(data as PostFrontmatter),
      content,
    };
  } catch (error) {
    console.error("Error in getPostBySlug:", error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = fs
      .readdirSync(BLOG_DIR)
      .map((dir) => {
        const fullPath = path.join(BLOG_DIR, dir, "index.mdx");
        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          ...(data as PostFrontmatter),
          content,
        };
      })
      .filter((post): post is Post => post !== null)
      .sort((a, b) => a.title.localeCompare(b.title));

    return posts;
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    return [];
  }
}
