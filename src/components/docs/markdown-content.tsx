"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

// Remove the first H1 from markdown content since we show it in the header
function removeFirstH1(content: string): string {
  // Match the first line that starts with "# " (H1 heading)
  return content.replace(/^#\s+.+\n+/, "");
}

// Code block with copy button
function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract language from className (e.g., "language-python" -> "python")
  const language = className?.replace("language-", "");

  return (
    <div className="group relative my-4">
      {language && (
        <div className="absolute right-12 top-2 text-xs text-muted-foreground font-mono">
          {language}
        </div>
      )}
      <pre className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
        <code className={cn("text-sm", className)}>
          {children}
        </code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}

// Custom components to handle code blocks properly
const components: Components = {
  pre: ({ children }) => {
    // Extract code content from children
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
          className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    // Block code is handled by pre
    return <code className={className} {...props}>{children}</code>;
  },
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
        {processedContent}
      </ReactMarkdown>
    </article>
  );
}
