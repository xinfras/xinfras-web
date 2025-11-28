import { Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DocsPageContent } from "@/components/docs/docs-page-content";
import { fetchDocsContent, fallbackContent, getGithubUrl } from "@/lib/github";

export const revalidate = 300; // Revalidate every 5 minutes

async function getContent() {
  try {
    return await fetchDocsContent("ai-infra");
  } catch {
    return fallbackContent["ai-infra"];
  }
}

export default async function AIInfraPage() {
  const content = await getContent();
  const githubUrl = getGithubUrl("ai-infra");

  const header = (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-blue-500/10 p-2">
          <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <Badge variant="secondary">ai-infra</Badge>
      </div>
      <h1 className="text-3xl font-bold tracking-tight">AI Infrastructure</h1>
      <p className="text-muted-foreground">LLM orchestration, MCP servers, and agent frameworks for intelligent applications.</p>
    </div>
  );

  return <DocsPageContent content={content} header={header} githubUrl={githubUrl} />;
}
