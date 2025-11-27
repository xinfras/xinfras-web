"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
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
    <ScrollArea className="h-full py-6 pl-4 pr-6 lg:py-8">
      <div className="space-y-2">
        <h4 className="mb-4 text-sm font-semibold tracking-tight">
          On This Page
        </h4>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={cn(
                "block text-sm transition-colors hover:text-foreground",
                heading.level === 1 && "font-medium",
                heading.level === 2 && "pl-2",
                heading.level === 3 && "pl-4 text-xs",
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {heading.title}
            </a>
          ))}
        </nav>
      </div>
    </ScrollArea>
  );
}
