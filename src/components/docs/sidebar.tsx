"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Cpu, Server, Wallet, BookOpen, Code, Layers, Zap, Settings, Key, Database, Workflow, CreditCard, Receipt, BarChart3 } from "lucide-react";

interface DocItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface DocSection {
  title: string;
  items: DocItem[];
}

const docsConfig: DocSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", icon: BookOpen },
      { title: "Installation", href: "/docs/installation", icon: Zap },
      { title: "Quick Start", href: "/docs/quickstart", icon: Layers },
    ],
  },
  {
    title: "AI Infra",
    items: [
      { title: "Overview", href: "/docs/ai-infra", icon: Cpu },
      { title: "LLM Integration", href: "/docs/ai-infra/llm", icon: Code },
      { title: "Agent Graphs", href: "/docs/ai-infra/graphs", icon: Workflow },
      { title: "MCP Servers", href: "/docs/ai-infra/mcp", icon: Server },
      { title: "Tool Execution", href: "/docs/ai-infra/tools", icon: Settings },
    ],
  },
  {
    title: "Svc Infra",
    items: [
      { title: "Overview", href: "/docs/svc-infra", icon: Server },
      { title: "API Framework", href: "/docs/svc-infra/api", icon: Code },
      { title: "Authentication", href: "/docs/svc-infra/auth", icon: Key },
      { title: "Database", href: "/docs/svc-infra/database", icon: Database },
      { title: "Job Queues", href: "/docs/svc-infra/jobs", icon: Workflow },
    ],
  },
  {
    title: "Fin Infra",
    items: [
      { title: "Overview", href: "/docs/fin-infra", icon: Wallet },
      { title: "Payments", href: "/docs/fin-infra/payments", icon: CreditCard },
      { title: "Subscriptions", href: "/docs/fin-infra/subscriptions", icon: Receipt },
      { title: "Usage Metering", href: "/docs/fin-infra/metering", icon: BarChart3 },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-full py-6 pl-4 pr-6 lg:py-8">
      <div className="space-y-6">
        {docsConfig.map((section) => (
          <div key={section.title}>
            <h4 className="mb-2 text-sm font-semibold tracking-tight">
              {section.title}
            </h4>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
