import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="py-16 md:py-24">
      <div className="container max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Post Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, we could not find the blog post you are looking for.
        </p>
        <Button asChild>
          <Link href="/blog">Return to Blog</Link>
        </Button>
      </div>
    </div>
  );
}
