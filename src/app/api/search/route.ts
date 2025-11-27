import { NextRequest, NextResponse } from "next/server";
import { contentSources, fetchDocsContent, fallbackContent, type ContentSource } from "@/lib/github";

interface SearchResult {
  title: string;
  content: string;
  source: ContentSource;
  href: string;
  matches: string[];
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

  // Find all matches with context
  const matches: string[] = [];
  const lines = content.split("\n");
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(lowerQuery)) {
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
        .slice(0, 200);
      
      if (cleanContext && !matches.includes(cleanContext)) {
        matches.push(cleanContext);
      }
      
      if (matches.length >= 3) break;
    }
  }

  return {
    title,
    content: content.slice(0, 500),
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
