import { Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DocsPageContent } from "@/components/docs/docs-page-content";
import { fetchDocsContent, fallbackContent } from "@/lib/github";

export const revalidate = 300; // Revalidate every 5 minutes

async function getContent() {
  try {
    return await fetchDocsContent("fin-infra");
  } catch {
    return fallbackContent["fin-infra"];
  }
}

export default async function FinInfraPage() {
  const content = await getContent();

  const header = (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-primary/10 p-2">
        <Wallet className="h-6 w-6 text-primary" />
      </div>
      <Badge variant="outline" className="text-primary">
        Financial Infrastructure
      </Badge>
    </div>
  );

  return <DocsPageContent content={content} header={header} />;
}
