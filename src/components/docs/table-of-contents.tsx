"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractHeadings(markdown: string): TocItem[] {
  // Remove fenced code blocks before extracting headings
  const withoutCodeBlocks = markdown.replace(/```[\s\S]*?```/g, "");
  
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(withoutCodeBlocks)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = slugify(title);
    headings.push({ id, title, level });
  }

  return headings;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = extractHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="py-6 lg:py-8">
      <div className="space-y-1">
        <h4 className="mb-4 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          On This Page
        </h4>
        <nav className="relative max-h-[calc(100vh-12rem)] overflow-y-auto">
          {/* Active indicator line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
          
          <div className="space-y-0.5">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              const isSection = heading.level <= 2;
              
              return (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={cn(
                    "group relative flex items-center py-1.5 pl-4 pr-3 text-sm transition-all",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {/* Left border indicator */}
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full transition-all",
                      isActive
                        ? "bg-primary"
                        : "bg-transparent group-hover:bg-muted-foreground/30"
                    )}
                  />
                  
                  {/* Content */}
                  <span className="flex items-center gap-2">
                    {/* Visual hierarchy indicator for subsections */}
                    {heading.level === 3 && (
                      <span className="text-muted-foreground/50">—</span>
                    )}
                    <span
                      className={cn(
                        "transition-colors",
                        isSection ? "font-medium" : "font-normal",
                        isActive && "text-primary"
                      )}
                    >
                      {heading.title}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
