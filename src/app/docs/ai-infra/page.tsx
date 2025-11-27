import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, Workflow, Server, Settings, Code, Terminal, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Cpu,
    title: "LLM Orchestration",
    description: "Seamlessly integrate with OpenAI, Anthropic, and other LLM providers with built-in retry logic and streaming.",
    href: "/docs/ai-infra/llm",
  },
  {
    icon: Workflow,
    title: "Agent Graphs",
    description: "Build complex agent workflows with directed graphs, conditional branching, and state management.",
    href: "/docs/ai-infra/graphs",
  },
  {
    icon: Server,
    title: "MCP Servers",
    description: "Create Model Context Protocol servers for tools, resources, and prompts with minimal boilerplate.",
    href: "/docs/ai-infra/mcp",
  },
  {
    icon: Settings,
    title: "Tool Execution",
    description: "Define and execute tools with automatic schema generation, validation, and error handling.",
    href: "/docs/ai-infra/tools",
  },
];

export default function AIInfraPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <Cpu className="h-6 w-6 text-primary" />
          </div>
          <Badge variant="outline" className="text-primary">
            AI Infrastructure
          </Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">ai-infra</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Build intelligent AI-powered applications with LLM orchestration, agent frameworks, 
          MCP servers, and powerful tool execution capabilities.
        </p>
      </div>

      {/* Installation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Installation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pip" className="w-full">
            <TabsList>
              <TabsTrigger value="pip">pip</TabsTrigger>
              <TabsTrigger value="poetry">Poetry</TabsTrigger>
            </TabsList>
            <TabsContent value="pip">
              <div className="rounded-lg bg-muted p-3 mt-3">
                <pre className="text-sm text-foreground/90 overflow-x-auto">
                  <code>pip install ai-infra</code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="poetry">
              <div className="rounded-lg bg-muted p-3 mt-3">
                <pre className="text-sm text-foreground/90 overflow-x-auto">
                  <code>poetry add ai-infra</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Example */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Quick Example
          </CardTitle>
          <CardDescription>Create an AI agent in just a few lines of code</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Code className="h-3.5 w-3.5" />
              agent.py
            </div>
            <pre className="text-sm text-foreground/90 overflow-x-auto">
              <code>
{`from ai_infra import AgentGraph, LLM
from ai_infra.tools import tool

# Define a tool
@tool
def search_docs(query: str) -> str:
    """Search documentation for relevant information."""
    return f"Results for: {query}"

# Create an agent graph
graph = AgentGraph("assistant")
graph.add_node("llm", LLM("gpt-4o"))
graph.add_tool(search_docs)

# Run the agent
response = await graph.run("What is ai-infra?")`}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <div className="mt-4 flex items-center text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Key Concepts */}
      <div className="rounded-lg border border-border/60 p-6">
        <h3 className="font-semibold mb-4">Key Concepts</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm">Agent Graphs</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Agents are built as directed graphs where nodes represent processing steps (LLMs, tools, conditions) 
              and edges define the flow of execution.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm">Tools</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Tools are Python functions decorated with <code className="text-xs bg-muted px-1 py-0.5 rounded">@tool</code> that 
              agents can invoke. Schemas are automatically generated from type hints.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm">Sessions</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Sessions maintain conversation history and context across multiple agent interactions, 
              enabling stateful conversations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
