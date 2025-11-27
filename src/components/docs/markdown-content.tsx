import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

// Custom components to handle code blocks properly
const components: Components = {
  pre: ({ children, ...props }) => (
    <pre {...props} className="bg-muted border border-border rounded-lg overflow-x-auto p-4">
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 text-sm font-normal"
          {...props}
        >
          {children}
        </code>
      );
    }
    // For code blocks inside <pre>, strip leading/trailing whitespace
    const content = String(children).replace(/^\n+|\n+$/g, "");
    return (
      <code className={cn("text-sm", className)} {...props}>
        {content}
      </code>
    );
  },
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <article
      className={cn(
        "prose max-w-none",
        "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:scroll-mt-20",
        "prose-h1:text-3xl prose-h1:mt-0",
        "prose-h2:text-2xl prose-h2:mt-10 prose-h2:border-b prose-h2:border-border prose-h2:pb-2",
        "prose-h3:text-xl prose-h3:mt-8",
        "prose-p:leading-7",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-table:border prose-table:border-border",
        "prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-4 prose-th:py-2",
        "prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2",
        "prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:not-italic",
        "prose-ul:my-4 prose-ol:my-4",
        "prose-li:my-1",
        className
      )}
    >
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
