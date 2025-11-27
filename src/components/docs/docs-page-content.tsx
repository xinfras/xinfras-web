"use client";

import { Suspense } from "react";
import { TableOfContents } from "./table-of-contents";
import { MarkdownContent } from "./markdown-content";
import { SearchHighlight } from "./search-highlight";

interface DocsPageContentProps {
  content: string;
  header: React.ReactNode;
}

export function DocsPageContent({ content, header }: DocsPageContentProps) {
  return (
    <div className="flex gap-10">
      {/* Search highlight handler - wrapped in Suspense for useSearchParams */}
      <Suspense fallback={null}>
        <SearchHighlight />
      </Suspense>

      {/* Left Sidebar - Table of Contents */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-20">
          <TableOfContents content={content} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        <div className="space-y-6">
          <div>{header}</div>
          <MarkdownContent content={content} />
        </div>
      </div>
    </div>
  );
}
