import { getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import React from "react";
import { ReactElement } from "react";

interface Props {
  params: {
    slug: string;
  };
}

interface Post {
  title: string;
  excerpt?: string;
  content?: string;
  published_at?: string;
  categories?: {
    name: string;
  };
  images?: {
    featured?: string;
  };
}

// Custom component to render images outside of paragraphs
const ImageComponent = ({ src, alt }: { src?: string; alt?: string }) => (
  <figure className="my-8">
    <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
      <Image
        src={src || ""}
        alt={alt || ""}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 900px, 100vw"
      />
    </div>
    {alt && (
      <figcaption className="mt-2 text-sm text-center text-muted-foreground">
        {alt}
      </figcaption>
    )}
  </figure>
);

export default async function BlogPost({ params }: Props) {
  const post = (await getPostBySlug(params.slug)) as Post | null;

  if (!post) {
    notFound();
  }

  return (
    <article className="py-8 md:py-16">
      <div className="container">
        <header className="space-y-8">
          <div className="space-y-4">
            {post.categories && (
              <Badge variant="outline" className="text-sm">
                {post.categories.name}
              </Badge>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-xl text-muted-foreground">{post.excerpt}</p>
            )}
            {post.published_at && (
              <time
                dateTime={post.published_at}
                className="block text-sm text-muted-foreground"
              >
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            )}
          </div>
          {post.images?.featured && (
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <img
                src={post.images.featured}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <Separator />
        </header>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              // Handle images at the root level
              img: ImageComponent,
              // Remove images from paragraphs
              p: ({ children, ...props }) => {
                // Check if the children contain only an image
                const hasOnlyImage = React.Children.toArray(children).every(
                  (child) =>
                    typeof child === "object" &&
                    (child as ReactElement)?.type === ImageComponent
                );

                // If it's just an image, render only the image
                if (hasOnlyImage) {
                  return <>{children}</>;
                }

                // Otherwise render as a normal paragraph
                return (
                  <p className="leading-relaxed mb-6" {...props}>
                    {children}
                  </p>
                );
              },
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href?.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                >
                  {children}
                </a>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-serif mt-12 mb-6">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-serif mt-8 mb-4">{children}</h3>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-6 space-y-2">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-6 space-y-2">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-muted-foreground">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                  {children}
                </blockquote>
              ),
            }}
          >
            {post.content || ""}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Creative Journey",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Creative Journey`,
    description: post.excerpt || "Read this article on Creative Journey",
  };
}
