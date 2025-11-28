import { NextRequest, NextResponse } from "next/server";
import { contentSources, fetchDocsContent, fallbackContent, fetchAllDocsStructure, fetchDocContent, type ContentSource, type DocItem } from "@/lib/github";

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
  source: ContentSource,
  customHref?: string,
  customTitle?: string
): SearchResult | null {
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  if (!lowerContent.includes(lowerQuery)) {
    return null;
  }

  // Extract title from first H1 or use custom title
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = customTitle || (titleMatch ? titleMatch[1] : source);
  const href = customHref || `/${source}`;

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
        .trim()
        .slice(0, 150);
      
      // Skip if context is too short or just whitespace/code markers
      if (!cleanContext || cleanContext.length < 10 || cleanContext === "[code]") {
        continue;
      }

      // Verify the cleaned context still contains our query (it might have been in a code block)
      if (!cleanContext.toLowerCase().includes(lowerQuery)) {
        continue;
      }
      
      // Avoid duplicate matches (by section anchor or similar context text)
      const existingMatch = matches.find(m => 
        (m.anchor && m.anchor === currentSection?.anchor) || 
        (m.text.slice(0, 50) === cleanContext.slice(0, 50))
      );
      
      if (!existingMatch) {
        matches.push({
          text: cleanContext,
          section: currentSection?.title || null,
          anchor: currentSection?.anchor || null,
        });
      }
      
      if (matches.length >= 5) break;
    }
  }

  // Only return result if we have actual matches to show
  if (matches.length === 0) {
    return null;
  }

  return {
    title,
    source,
    href,
    matches,
  };
}

// Flatten doc items to get all file paths
function flattenDocItems(items: DocItem[]): { slug: string; title: string }[] {
  const result: { slug: string; title: string }[] = [];
  
  for (const item of items) {
    if (item.type === "file") {
      result.push({ slug: item.slug, title: item.title });
    }
    if (item.children) {
      result.push(...flattenDocItems(item.children));
    }
  }
  
  return result;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results: SearchResult[] = [];
  const sources = Object.keys(contentSources) as ContentSource[];
  
  // First, get the docs structure to know all available docs
  const docsStructure = await fetchAllDocsStructure();
  
  // Search in main README of each package
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

  // Search in individual doc files
  for (const structure of docsStructure) {
    const docs = flattenDocItems(structure.items);
    
    await Promise.all(
      docs.map(async (doc) => {
        try {
          const content = await fetchDocContent(structure.package, doc.slug);
          const href = `/${structure.package}/${doc.slug}`;
          const result = searchInContent(content, query, structure.package, href, doc.title);
          if (result) {
            results.push(result);
          }
        } catch {
          // Skip docs that fail to load
        }
      })
    );
  }

  // Sort results: prioritize more matches
  results.sort((a, b) => b.matches.length - a.matches.length);

  return NextResponse.json({ results });
}
