const GITHUB_RAW_BASE = "https://raw.githubusercontent.com";

// Map of content sources - can point to different repos/branches
export const contentSources = {
  "ai-infra": {
    owner: "aliikhatami94",
    repo: "ai-infra", 
    branch: "main",
    path: "README.md",
  },
  "svc-infra": {
    owner: "aliikhatami94",
    repo: "svc-infra",
    branch: "main", 
    path: "README.md",
  },
  "fin-infra": {
    owner: "aliikhatami94",
    repo: "fin-infra",
    branch: "main",
    path: "README.md",
  },
} as const;

export type ContentSource = keyof typeof contentSources;

interface FetchOptions {
  owner: string;
  repo: string;
  branch: string;
  path: string;
}

export async function fetchGitHubMarkdown(options: FetchOptions): Promise<string> {
  const { owner, repo, branch, path } = options;
  const url = `${GITHUB_RAW_BASE}/${owner}/${repo}/${branch}/${path}`;
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    return await response.text();
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
