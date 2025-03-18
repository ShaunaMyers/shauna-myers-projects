import { getAllPosts } from "@/lib/api";
import { PostGrid } from "@/components/blog/post-grid";

export const metadata = {
  title: "Projects | Creative Journey",
  description:
    "A collection of creative projects spanning art, sustainable building, handmade tiles, and technology.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="py-8 md:py-16">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">
            Creative Projects
          </h1>
          <p className="text-lg text-muted-foreground">
            From painting to sustainable building, from handmade tiles to coding
            projects – here&apos;s where I document my creative experiments and
            ongoing adventures in crafting a mindful life in Colorado.
          </p>
        </div>
        <PostGrid posts={posts} />
      </div>
    </div>
  );
}
