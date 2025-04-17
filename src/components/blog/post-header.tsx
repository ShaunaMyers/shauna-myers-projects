import { Post } from "@/lib/database";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
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
      {post.featured_image && (
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <Separator />
    </header>
  );
}
