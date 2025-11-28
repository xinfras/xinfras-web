"use client";

import { useState } from "react";
import Link from "next/link";
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
  packageName?: string;
}

// Remove the first H1 from markdown content since we show it in the header
function removeFirstH1(content: string): string {
  return content.replace(/^#\s+.+\n+/, "");
}

// Transform relative doc links to proper routes
function transformDocLink(href: string, packageName?: string): string {
  // Skip external links, anchors, and absolute paths
  if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("/")) {
    return href;
  }
  
  // Handle relative markdown links like "docs/api.md" or "./docs/api.md"
  let cleanHref = href.replace(/^\.\//, ""); // Remove leading ./
  
  // Remove docs/ prefix if present (since docs is the root for the package)
  cleanHref = cleanHref.replace(/^docs\//, "");
  
  // Remove .md extension
  cleanHref = cleanHref.replace(/\.md$/, "");
  
  // Build the final path
  if (packageName) {
    return `/${packageName}/${cleanHref}`;
  }
  
  return cleanHref;
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
    <div className="group relative overflow-hidden rounded-lg border border-border bg-muted">
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
      <pre className="overflow-x-auto px-4 py-2 bg-muted/50">
        <code className="text-sm leading-relaxed text-foreground font-mono">
          {children}
        </code>
      </pre>
    </div>
  );
}

// Custom components for markdown (base components without link handling)
const baseComponents: Partial<Components> = {
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
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm" {...props}>{children}</table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted/40 text-left text-muted-foreground" {...props}>{children}</thead>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-2 font-medium whitespace-nowrap border-b border-border" {...props}>{children}</th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-2 border-t border-border/50" {...props}>{children}</td>
  ),
  tr: ({ children, ...props }) => (
    <tr className="hover:bg-muted/20 transition-colors" {...props}>{children}</tr>
  ),
};

// Create components with packageName for link transformation
function createComponents(packageName?: string): Components {
  return {
    ...baseComponents,
    a: ({ href, children, ...props }) => {
      const transformedHref = transformDocLink(href || "", packageName);
      const isExternal = transformedHref.startsWith("http");
      
      if (isExternal) {
        return (
          <a href={transformedHref} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      }
      
      return (
        <Link href={transformedHref} {...props}>
          {children}
        </Link>
      );
    },
  };
}

export function MarkdownContent({ content, className, packageName }: MarkdownContentProps) {
  const processedContent = removeFirstH1(content);
  const components = createComponents(packageName);
  
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
        "prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:not-italic",
        "prose-ul:my-4 prose-ol:my-4",
        "prose-li:my-1",
        "prose-pre:my-0 prose-pre:px-4 prose-pre:py-2 prose-pre:bg-transparent prose-pre:rounded-none",
        "prose-table:my-0",
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
