import { Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MarkdownContent } from "@/components/docs/markdown-content";
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <Cpu className="h-6 w-6 text-primary" />
        </div>
        <Badge variant="outline" className="text-primary">
          AI Infrastructure
        </Badge>
      </div>

      <MarkdownContent content={content} />
    </div>
  );
}
