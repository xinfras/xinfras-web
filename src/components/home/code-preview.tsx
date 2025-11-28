"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const codeExample = `from ai_infra import LLM, Agent, Graph
from ai_infra.mcp import MCPServer

# Create an LLM instance
llm = LLM(provider="openai", model="gpt-4")

# Build an agent with tools
agent = Agent(llm=llm, tools=[search, calculate])

# Or create a graph for complex workflows
graph = Graph()
graph.add_node("process", process_fn)
graph.add_node("validate", validate_fn)
graph.add_edge("process", "validate")`;

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
          <span className="text-xs font-medium text-zinc-500">example.py</span>
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
          <span className="text-purple-400">from</span> <span className="text-zinc-300">ai_infra</span> <span className="text-purple-400">import</span> <span className="text-emerald-400">LLM</span><span className="text-zinc-400">,</span> <span className="text-emerald-400">Agent</span><span className="text-zinc-400">,</span> <span className="text-emerald-400">Graph</span>{"\n"}
          <span className="text-purple-400">from</span> <span className="text-zinc-300">ai_infra.mcp</span> <span className="text-purple-400">import</span> <span className="text-emerald-400">MCPServer</span>{"\n"}
          {"\n"}
          <span className="text-zinc-600"># Create an LLM instance</span>{"\n"}
          <span className="text-zinc-300">llm</span> <span className="text-zinc-500">=</span> <span className="text-emerald-400">LLM</span><span className="text-zinc-400">(</span><span className="text-zinc-300">provider</span><span className="text-zinc-500">=</span><span className="text-amber-400">&quot;openai&quot;</span><span className="text-zinc-400">,</span> <span className="text-zinc-300">model</span><span className="text-zinc-500">=</span><span className="text-amber-400">&quot;gpt-4&quot;</span><span className="text-zinc-400">)</span>{"\n"}
          {"\n"}
          <span className="text-zinc-600"># Build an agent with tools</span>{"\n"}
          <span className="text-zinc-300">agent</span> <span className="text-zinc-500">=</span> <span className="text-emerald-400">Agent</span><span className="text-zinc-400">(</span><span className="text-zinc-300">llm</span><span className="text-zinc-500">=</span><span className="text-zinc-300">llm</span><span className="text-zinc-400">,</span> <span className="text-zinc-300">tools</span><span className="text-zinc-500">=</span><span className="text-zinc-400">[</span><span className="text-zinc-300">search</span><span className="text-zinc-400">,</span> <span className="text-zinc-300">calculate</span><span className="text-zinc-400">])</span>{"\n"}
          {"\n"}
          <span className="text-zinc-600"># Or create a graph for complex workflows</span>{"\n"}
          <span className="text-zinc-300">graph</span> <span className="text-zinc-500">=</span> <span className="text-emerald-400">Graph</span><span className="text-zinc-400">()</span>{"\n"}
          <span className="text-zinc-300">graph</span><span className="text-zinc-400">.</span><span className="text-blue-400">add_node</span><span className="text-zinc-400">(</span><span className="text-amber-400">&quot;process&quot;</span><span className="text-zinc-400">,</span> <span className="text-zinc-300">process_fn</span><span className="text-zinc-400">)</span>{"\n"}
          <span className="text-zinc-300">graph</span><span className="text-zinc-400">.</span><span className="text-blue-400">add_node</span><span className="text-zinc-400">(</span><span className="text-amber-400">&quot;validate&quot;</span><span className="text-zinc-400">,</span> <span className="text-zinc-300">validate_fn</span><span className="text-zinc-400">)</span>{"\n"}
          <span className="text-zinc-300">graph</span><span className="text-zinc-400">.</span><span className="text-blue-400">add_edge</span><span className="text-zinc-400">(</span><span className="text-amber-400">&quot;process&quot;</span><span className="text-zinc-400">,</span> <span className="text-amber-400">&quot;validate&quot;</span><span className="text-zinc-400">)</span>
        </code>
      </pre>
    </div>
  );
}
