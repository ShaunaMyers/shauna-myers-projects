import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/api";

export default async function Home() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="flex flex-col gap-16 py-8 md:py-16">
      {/* Hero Section */}
      <section className="container">
        <div className="flex flex-col items-center text-center gap-8">
          <h1 className="text-4xl md:text-6xl font-serif">Creative Journey</h1>
          <p className="text-lg text-muted-foreground max-w-[600px]">
            Exploring the intersection of art, sustainability, and technology.
            From painting to tile-making, from eco-building to coding –
            documenting my adventures in crafting a mindful, creative life in
            the Colorado mountains.
          </p>
          <div className="w-full max-w-[800px] rounded-lg overflow-hidden">
            <Image
              src="./images/mudbuilding.jpeg"
              alt="Hands working with rich soil, showcasing natural building materials"
              width={800}
              height={450}
              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
              priority
            />
          </div>
          <Button asChild>
            <Link href="/blog">Explore My Projects</Link>
          </Button>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="container">
          <h2 className="text-2xl font-serif mb-8">Recent Adventures</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <article key={post.slug} className="group">
                {post.images?.featured && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block aspect-[4/3] overflow-hidden rounded-lg mb-4"
                  >
                    <Image
                      src={post.images.featured}
                      alt={post.title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </Link>
                )}
                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="text-xl font-serif group-hover:text-primary">
                    {post.title}
                  </h3>
                </Link>
                {post.excerpt && (
                  <p className="mt-2 text-muted-foreground line-clamp-2 bg-black/10 backdrop-blur-sm rounded-lg p-2">
                    {post.excerpt}
                  </p>
                )}
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link href="/blog">View All Projects</Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
