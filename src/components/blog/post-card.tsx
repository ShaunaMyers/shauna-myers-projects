import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="group overflow-hidden">
      {post.images?.featured && (
        <Link
          href={`/blog/${post.slug}`}
          className="block aspect-[4/3] overflow-hidden"
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
      <CardHeader className="pt-6">
        {post.categories && (
          <Badge variant="outline" className="w-fit">
            {post.categories.name}
          </Badge>
        )}
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="text-xl font-serif mt-2 group-hover:text-primary">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent>
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        {post.published_at && (
          <time dateTime={post.published_at}>
            {new Date(post.published_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        )}
      </CardFooter>
    </Card>
  );
}
