import Content from "@/content/docs/index.mdx";

export default function DocsPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-muted prose-pre:border prose-pre:border-border">
      <Content />
    </article>
  );
}
