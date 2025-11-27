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
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-emerald-500/10 p-2">
          <Wallet className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <Badge variant="secondary">fin-infra</Badge>
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Financial Infrastructure</h1>
      <p className="text-muted-foreground">Complete billing infrastructure for payments, subscriptions, and invoicing.</p>
    </div>
  );

  return <DocsPageContent content={content} header={header} />;
}
