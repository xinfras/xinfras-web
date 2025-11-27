"use client";

import { TableOfContents } from "./table-of-contents";
import { MarkdownContent } from "./markdown-content";

interface DocsPageContentProps {
  content: string;
  header: React.ReactNode;
}

export function DocsPageContent({ content, header }: DocsPageContentProps) {
  return (
    <div className="flex gap-10">
      {/* Left Sidebar - Table of Contents */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-20">
          <TableOfContents content={content} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-w-0 flex-1 space-y-6">
        {header}
        <MarkdownContent content={content} />
      </div>
    </div>
  );
}
