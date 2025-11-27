import { Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Content from "@/content/docs/svc-infra.mdx";

export default function SvcInfraPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <Server className="h-6 w-6 text-primary" />
        </div>
        <Badge variant="outline" className="text-primary">
          Backend Infrastructure
        </Badge>
      </div>
      
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-muted prose-pre:border prose-pre:border-border">
        <Content />
      </article>
    </div>
  );
}
