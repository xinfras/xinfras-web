import { notFound } from "next/navigation";
import { Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DocsPageContent } from "@/components/docs/docs-page-content";
import { fetchDocContent, getGithubUrl } from "@/lib/github";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

async function getContent(slug: string[]) {
  try {
    const docPath = slug.join("/");
    return await fetchDocContent("svc-infra", docPath);
  } catch {
    return null;
  }
}

export default async function SvcInfraDocPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getContent(slug);

  if (!content) {
    notFound();
  }

  // Extract title from first heading or use slug
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug[slug.length - 1].replace(/-/g, " ");
  const githubUrl = getGithubUrl("svc-infra", slug.join("/"));

  const header = (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-primary/10 p-2">
        <Server className="h-6 w-6 text-primary" />
      </div>
      <div className="flex flex-col gap-1">
        <Badge variant="outline" className="w-fit text-primary">
          svc-infra
        </Badge>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    </div>
  );

  return <DocsPageContent content={content} header={header} githubUrl={githubUrl} packageName="svc-infra" />;
}

export async function generateStaticParams() {
  return [];
}
