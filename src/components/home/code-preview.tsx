"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const codeExample = `from svc_infra import App
from ai_infra import AgentGraph
from fin_infra import Billing

app = App()

# Add AI capabilities
graph = AgentGraph("assistant")
graph.add_tool(search_docs)

# Enable billing
billing = Billing(app)
billing.create_subscription(user_id)`;

export function CodePreview() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Window header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-muted/50">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Terminal className="h-3.5 w-3.5" />
            app.py
          </div>
        </div>
        {/* Code */}
        <pre className="p-6 text-sm leading-relaxed overflow-x-auto">
          <code>
            <span className="text-blue-600 dark:text-blue-400">from</span> svc_infra <span className="text-blue-600 dark:text-blue-400">import</span> App{"\n"}
            <span className="text-blue-600 dark:text-blue-400">from</span> ai_infra <span className="text-blue-600 dark:text-blue-400">import</span> AgentGraph{"\n"}
            <span className="text-blue-600 dark:text-blue-400">from</span> fin_infra <span className="text-blue-600 dark:text-blue-400">import</span> Billing{"\n"}
            {"\n"}
            app = App(){"\n"}
            {"\n"}
            <span className="text-muted-foreground"># Add AI capabilities</span>{"\n"}
            graph = AgentGraph(<span className="text-emerald-600 dark:text-emerald-400">&quot;assistant&quot;</span>){"\n"}
            graph.add_tool(search_docs){"\n"}
            {"\n"}
            <span className="text-muted-foreground"># Enable billing</span>{"\n"}
            billing = Billing(app){"\n"}
            billing.create_subscription(user_id)
          </code>
        </pre>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-3 top-12 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100 bg-background/80 backdrop-blur-sm"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}
