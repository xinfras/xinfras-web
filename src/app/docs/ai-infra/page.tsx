import { Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DocsPageContent } from "@/components/docs/docs-page-content";
import { fetchDocsContent, fallbackContent } from "@/lib/github";

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

  const header = (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-primary/10 p-2">
        <Cpu className="h-6 w-6 text-primary" />
      </div>
      <Badge variant="outline" className="text-primary">
        AI Infrastructure
      </Badge>
    </div>
  );

  return <DocsPageContent content={content} header={header} />;
}
