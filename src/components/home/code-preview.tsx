"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

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
    <div className="rounded-lg bg-zinc-950 dark:bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          </div>
          <span className="text-xs font-medium text-zinc-500">app.py</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code */}
      <pre className="p-5 overflow-x-auto">
        <code className="text-sm leading-relaxed font-mono">
          <span className="text-purple-400">from</span> <span className="text-zinc-300">svc_infra</span> <span className="text-purple-400">import</span> <span className="text-emerald-400">App</span>{"\n"}
          <span className="text-purple-400">from</span> <span className="text-zinc-300">ai_infra</span> <span className="text-purple-400">import</span> <span className="text-emerald-400">AgentGraph</span>{"\n"}
          <span className="text-purple-400">from</span> <span className="text-zinc-300">fin_infra</span> <span className="text-purple-400">import</span> <span className="text-emerald-400">Billing</span>{"\n"}
          {"\n"}
          <span className="text-zinc-300">app</span> <span className="text-zinc-500">=</span> <span className="text-emerald-400">App</span><span className="text-zinc-400">()</span>{"\n"}
          {"\n"}
          <span className="text-zinc-600"># Add AI capabilities</span>{"\n"}
          <span className="text-zinc-300">graph</span> <span className="text-zinc-500">=</span> <span className="text-emerald-400">AgentGraph</span><span className="text-zinc-400">(</span><span className="text-amber-400">&quot;assistant&quot;</span><span className="text-zinc-400">)</span>{"\n"}
          <span className="text-zinc-300">graph</span><span className="text-zinc-400">.</span><span className="text-blue-400">add_tool</span><span className="text-zinc-400">(</span><span className="text-zinc-300">search_docs</span><span className="text-zinc-400">)</span>{"\n"}
          {"\n"}
          <span className="text-zinc-600"># Enable billing</span>{"\n"}
          <span className="text-zinc-300">billing</span> <span className="text-zinc-500">=</span> <span className="text-emerald-400">Billing</span><span className="text-zinc-400">(</span><span className="text-zinc-300">app</span><span className="text-zinc-400">)</span>{"\n"}
          <span className="text-zinc-300">billing</span><span className="text-zinc-400">.</span><span className="text-blue-400">create_subscription</span><span className="text-zinc-400">(</span><span className="text-zinc-300">user_id</span><span className="text-zinc-400">)</span>
        </code>
      </pre>
    </div>
  );
}
