import { Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DocsPageContent } from "@/components/docs/docs-page-content";
import { fetchDocsContent, fallbackContent } from "@/lib/github";

export const revalidate = 300; // Revalidate every 5 minutes

async function getContent() {
  try {
    return await fetchDocsContent("svc-infra");
  } catch {
    return fallbackContent["svc-infra"];
  }
}

export default async function SvcInfraPage() {
  const content = await getContent();

  const header = (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-violet-500/10 p-2">
          <Server className="h-5 w-5 text-violet-600 dark:text-violet-400" />
        </div>
        <Badge variant="secondary">svc-infra</Badge>
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Service Infrastructure</h1>
      <p className="text-muted-foreground">Production-ready backend infrastructure with auth, database, caching, and jobs.</p>
    </div>
  );

  return <DocsPageContent content={content} header={header} />;
}
