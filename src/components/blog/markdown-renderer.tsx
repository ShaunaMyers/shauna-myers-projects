import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-4xl font-serif mb-4 text-gradient">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-serif mt-8 mb-4 hover-lift">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-serif mt-6 mb-3 hover-lift">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed hover:text-primary/90 transition-colors duration-300">
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary hover:underline relative inline-block px-1 py-0.5 rounded group"
            >
              <span className="relative z-10">{children}</span>
              <span className="absolute -inset-[1px] rounded-[inherit] bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 marker:text-primary">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 marker:text-primary">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="relative border-l-4 border-primary pl-4 italic my-4 bg-primary/5 py-2 rounded-r overflow-hidden group">
              <span className="relative z-10">{children}</span>
              <span className="absolute -inset-[1px] rounded-[inherit] bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="relative inline-block bg-muted px-1.5 py-0.5 rounded text-sm font-mono group">
              <span className="relative z-10">{children}</span>
              <span className="absolute -inset-[1px] rounded-[inherit] bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </code>
          ),
          pre: ({ children }) => (
            <pre className="relative bg-muted p-4 rounded-lg overflow-x-auto mb-4 group">
              <span className="relative z-10 block">{children}</span>
              <span className="absolute -inset-[1px] rounded-[inherit] bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
