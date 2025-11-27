import { NextRequest, NextResponse } from "next/server";
import { contentSources, fetchDocsContent, fallbackContent, type ContentSource } from "@/lib/github";

interface SearchMatch {
  text: string;
  section: string | null;
  anchor: string | null;
}

interface SearchResult {
  title: string;
  source: ContentSource;
  href: string;
  matches: SearchMatch[];
}

// Convert heading text to URL-friendly anchor
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Simple text search with context extraction
function searchInContent(
  content: string,
  query: string,
  source: ContentSource
): SearchResult | null {
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  if (!lowerContent.includes(lowerQuery)) {
    return null;
  }

  // Extract title from first H1
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : source;

  // Parse sections from headings
  const lines = content.split("\n");
  const sections: { title: string; anchor: string; startLine: number }[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const headingMatch = lines[i].match(/^#{2,3}\s+(.+)$/);
    if (headingMatch) {
      sections.push({
        title: headingMatch[1],
        anchor: slugify(headingMatch[1]),
        startLine: i,
      });
    }
  }

  // Find all matches with context and section info
  const matches: SearchMatch[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(lowerQuery)) {
      // Find which section this line belongs to
      let currentSection: { title: string; anchor: string } | null = null;
      for (const section of sections) {
        if (section.startLine <= i) {
          currentSection = { title: section.title, anchor: section.anchor };
        }
      }

      // Get context: current line and surrounding lines
      const start = Math.max(0, i - 1);
      const end = Math.min(lines.length - 1, i + 1);
      const context = lines.slice(start, end + 1).join(" ").trim();
      
      // Clean up markdown syntax for display
      const cleanContext = context
        .replace(/```[\s\S]*?```/g, "[code]")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/#{1,6}\s*/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .slice(0, 150);
      
      // Avoid duplicate sections
      const existingSection = matches.find(m => m.anchor === currentSection?.anchor);
      if (cleanContext && !existingSection) {
        matches.push({
          text: cleanContext,
          section: currentSection?.title || null,
          anchor: currentSection?.anchor || null,
        });
      }
      
      if (matches.length >= 5) break;
    }
  }

  return {
    title,
    source,
    href: `/docs/${source}`,
    matches,
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results: SearchResult[] = [];

  // Search in all three docs
  const sources = Object.keys(contentSources) as ContentSource[];
  
  await Promise.all(
    sources.map(async (source) => {
      try {
        const content = await fetchDocsContent(source);
        const result = searchInContent(content, query, source);
        if (result) {
          results.push(result);
        }
      } catch {
        // Try fallback content
        const content = fallbackContent[source];
        const result = searchInContent(content, query, source);
        if (result) {
          results.push(result);
        }
      }
    })
  );

  return NextResponse.json({ results });
}
