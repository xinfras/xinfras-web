"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

// Remove the first H1 from markdown content since we show it in the header
function removeFirstH1(content: string): string {
  return content.replace(/^#\s+.+\n+/, "");
}

// Clean, minimal code block
function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-5 overflow-hidden rounded-lg border border-border bg-muted">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
        <span className="text-xs font-medium text-muted-foreground">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre className="overflow-x-auto p-4 bg-muted/50">
        <code className="text-sm leading-relaxed text-foreground font-mono">
          {children}
        </code>
      </pre>
    </div>
  );
}

// Custom components for markdown
const components: Components = {
  pre: ({ children }) => {
    const codeElement = children as React.ReactElement<{ children: string; className?: string }>;
    if (codeElement?.props) {
      const { children: codeChildren, className } = codeElement.props;
      const content = String(codeChildren).replace(/^\n+|\n+$/g, "");
      return <CodeBlock className={className}>{content}</CodeBlock>;
    }
    return <pre>{children}</pre>;
  },
  code: ({ className, children, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="rounded-md bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    }
    return <code className={className} {...props}>{children}</code>;
  },
  table: ({ children, ...props }) => (
    <div className="my-4 -mx-4 sm:mx-0 overflow-x-auto">
      <div className="inline-block min-w-full px-4 sm:px-0 align-middle">
        <table className="min-w-full" {...props}>{children}</table>
      </div>
    </div>
  ),
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const processedContent = removeFirstH1(content);
  
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
        // Table styles - cleaner, less rigid
        "prose-table:border-collapse prose-table:w-full prose-table:text-sm",
        "prose-thead:bg-muted/50 prose-thead:border-b prose-thead:border-border",
        "prose-th:px-3 prose-th:py-2.5 prose-th:text-left prose-th:font-medium prose-th:text-muted-foreground",
        "prose-tbody:divide-y prose-tbody:divide-border",
        "prose-td:px-3 prose-td:py-2.5",
        "prose-tr:transition-colors hover:prose-tr:bg-muted/30",
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
        {processedContent}
      </ReactMarkdown>
    </article>
  );
}
