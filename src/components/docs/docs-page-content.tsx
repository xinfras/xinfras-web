"use client";

import { TableOfContents } from "./table-of-contents";
import { MarkdownContent } from "./markdown-content";
import { SearchHighlight } from "./search-highlight";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

interface DocsPageContentProps {
  content: string;
  header: React.ReactNode;
  githubUrl?: string;
}

export function DocsPageContent({ content, header, githubUrl }: DocsPageContentProps) {
  return (
    <div className="flex gap-10">
      {/* Search highlight handler */}
      <SearchHighlight />

      {/* Left Sidebar - Table of Contents */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-20">
          <TableOfContents content={content} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">{header}</div>
            {githubUrl && (
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 gap-2"
                asChild
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="hidden sm:inline">View source</span>
                </a>
              </Button>
            )}
          </div>
          <MarkdownContent content={content} />
        </div>
      </div>
    </div>
  );
}
