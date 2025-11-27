const GITHUB_RAW_BASE = "https://raw.githubusercontent.com";
const GITHUB_API_BASE = "https://api.github.com";

// In-memory cache for API responses (works in both dev and production)
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  return null;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// Map of content sources - can point to different repos/branches
export const contentSources = {
  "ai-infra": {
    owner: "aliikhatami94",
    repo: "ai-infra", 
    branch: "main",
    path: "README.md",
    docsPath: "docs",
  },
  "svc-infra": {
    owner: "aliikhatami94",
    repo: "svc-infra",
    branch: "main", 
    path: "README.md",
    docsPath: "docs",
  },
  "fin-infra": {
    owner: "aliikhatami94",
    repo: "fin-infra",
    branch: "main",
    path: "README.md",
    docsPath: "docs",
  },
} as const;

export type ContentSource = keyof typeof contentSources;

interface FetchOptions {
  owner: string;
  repo: string;
  branch: string;
  path: string;
}

export interface DocItem {
  name: string;
  path: string;
  type: "file" | "dir";
  slug: string;
  title: string;
  children?: DocItem[];
}

export interface DocsStructure {
  package: ContentSource;
  items: DocItem[];
}

// Convert filename to readable title
function fileToTitle(filename: string): string {
  return filename
    .replace(/\.md$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Convert path to URL slug
function pathToSlug(path: string, docsPath: string): string {
  return path
    .replace(docsPath + "/", "")
    .replace(/\.md$/, "")
    .toLowerCase();
}

// Fetch directory contents from GitHub API
async function fetchDirectoryContents(
  owner: string,
  repo: string,
  path: string,
  branch: string
): Promise<{ name: string; path: string; type: string }[]> {
  const cacheKey = `dir:${owner}/${repo}/${path}@${branch}`;
  
  // Check in-memory cache first
  const cached = getCached<{ name: string; path: string; type: string }[]>(cacheKey);
  if (cached) {
    return cached;
  }
  
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        // Add token if available for higher rate limits
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      // Cache for 1 hour in production to avoid rate limits
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      // Return empty for 404 (not found) or 403 (rate limited)
      if (response.status === 404 || response.status === 403) {
        return [];
      }
      console.error(`Failed to fetch directory ${path}: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching directory ${path}:`, error);
    return [];
  }
}

// Recursively fetch docs structure
async function fetchDocsRecursive(
  owner: string,
  repo: string,
  path: string,
  branch: string,
  docsPath: string
): Promise<DocItem[]> {
  const contents = await fetchDirectoryContents(owner, repo, path, branch);
  const items: DocItem[] = [];
  
  for (const item of contents) {
    // Only process markdown files and directories
    if (item.type === "file" && !item.name.endsWith(".md")) {
      continue;
    }
    
    const docItem: DocItem = {
      name: item.name,
      path: item.path,
      type: item.type as "file" | "dir",
      slug: pathToSlug(item.path, docsPath),
      title: fileToTitle(item.name),
    };
    
    if (item.type === "dir") {
      docItem.children = await fetchDocsRecursive(
        owner,
        repo,
        item.path,
        branch,
        docsPath
      );
      // Only include directories that have markdown files
      if (docItem.children.length > 0) {
        items.push(docItem);
      }
    } else {
      items.push(docItem);
    }
  }
  
  // Sort: directories first, then files, alphabetically
  return items.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "dir" ? -1 : 1;
    }
    return a.title.localeCompare(b.title);
  });
}

// Fetch docs structure for a package
export async function fetchDocsStructure(
  source: ContentSource
): Promise<DocsStructure> {
  const config = contentSources[source];
  const items = await fetchDocsRecursive(
    config.owner,
    config.repo,
    config.docsPath,
    config.branch,
    config.docsPath
  );
  
  return {
    package: source,
    items,
  };
}

// Fetch all packages' docs structure
export async function fetchAllDocsStructure(): Promise<DocsStructure[]> {
  const packages = Object.keys(contentSources) as ContentSource[];
  const structures = await Promise.all(
    packages.map((pkg) => fetchDocsStructure(pkg))
  );
  return structures;
}

// Fetch a specific doc file content
export async function fetchDocContent(
  source: ContentSource,
  docSlug: string
): Promise<string> {
  const config = contentSources[source];
  const path = `${config.docsPath}/${docSlug}.md`;
  
  return fetchGitHubMarkdown({
    owner: config.owner,
    repo: config.repo,
    branch: config.branch,
    path,
  });
}

export async function fetchGitHubMarkdown(options: FetchOptions): Promise<string> {
  const { owner, repo, branch, path } = options;
  const cacheKey = `md:${owner}/${repo}/${path}@${branch}`;
  
  // Check in-memory cache first
  const cached = getCached<string>(cacheKey);
  if (cached) {
    return cached;
  }
  
  const url = `${GITHUB_RAW_BASE}/${owner}/${repo}/${branch}/${path}`;
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const content = await response.text();
    setCache(cacheKey, content);
    return content;
  } catch (error) {
    console.error(`Error fetching markdown from ${url}:`, error);
    throw error;
  }
}

export async function fetchDocsContent(source: ContentSource): Promise<string> {
  const config = contentSources[source];
  return fetchGitHubMarkdown(config);
}

// Fallback content when GitHub fetch fails
export const fallbackContent: Record<ContentSource, string> = {
  "ai-infra": `# ai-infra

Build intelligent AI-powered applications with LLM orchestration, agent frameworks, MCP servers, and powerful tool execution capabilities.

## Installation

\`\`\`bash
pip install ai-infra
\`\`\`

*Documentation is being loaded from GitHub. Please check back shortly.*
`,
  "svc-infra": `# svc-infra

Production-ready backend infrastructure with authentication, database integration, caching, job queues, and comprehensive observability.

## Installation

\`\`\`bash
pip install svc-infra
\`\`\`

*Documentation is being loaded from GitHub. Please check back shortly.*
`,
  "fin-infra": `# fin-infra

Complete financial and billing infrastructure for payments, subscriptions, invoicing, and usage-based billing.

## Installation

\`\`\`bash
pip install fin-infra
\`\`\`

*Documentation is being loaded from GitHub. Please check back shortly.*
`,
};
