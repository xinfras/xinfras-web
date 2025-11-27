import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, Server, Wallet, ArrowRight, Terminal, Code, Zap } from "lucide-react";
import Link from "next/link";

const frameworks = [
  {
    name: "AI Infra",
    description: "Build AI-powered applications with LLM orchestration, agent frameworks, and MCP servers.",
    icon: Cpu,
    href: "/docs/ai-infra",
  },
  {
    name: "Svc Infra",
    description: "Production-ready backend infrastructure with APIs, auth, caching, and job queues.",
    icon: Server,
    href: "/docs/svc-infra",
  },
  {
    name: "Fin Infra",
    description: "Financial infrastructure for payments, subscriptions, invoicing, and metering.",
    icon: Wallet,
    href: "/docs/fin-infra",
  },
];

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Welcome to xinfras documentation. Learn how to use our infrastructure frameworks to build 
          powerful applications faster.
        </p>
      </div>

      {/* Quick Install */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Install
          </CardTitle>
          <CardDescription>Get started with any framework in seconds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Terminal className="h-3.5 w-3.5" />
                Terminal
              </div>
              <pre className="text-sm text-foreground/90 overflow-x-auto">
                <code>
                  <span className="text-muted-foreground"># Install AI Infra</span>{"\n"}
                  pip install ai-infra{"\n\n"}
                  <span className="text-muted-foreground"># Install Svc Infra</span>{"\n"}
                  pip install svc-infra{"\n\n"}
                  <span className="text-muted-foreground"># Install Fin Infra</span>{"\n"}
                  pip install fin-infra
                </code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Framework Cards */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Choose a Framework</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {frameworks.map((framework) => (
            <Link key={framework.name} href={framework.href}>
              <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <framework.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">{framework.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{framework.description}</p>
                  <div className="mt-4 flex items-center text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    Explore docs
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Key Concepts */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Key Concepts</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="h-5 w-5" />
                Unified APIs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All frameworks follow consistent patterns and conventions, making it easy to learn 
                one and quickly understand the others. Share knowledge across your team.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Server className="h-5 w-5" />
                Production Ready
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built for real-world use cases with proper error handling, logging, observability, 
                and testing support. Deploy with confidence.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Python Versions */}
      <div className="rounded-lg border border-border/60 p-6">
        <h3 className="font-semibold mb-2">Supported Python Versions</h3>
        <p className="text-sm text-muted-foreground mb-4">
          All frameworks support Python 3.11 through 3.13.
        </p>
        <div className="flex gap-2">
          <Badge variant="secondary">Python 3.11</Badge>
          <Badge variant="secondary">Python 3.12</Badge>
          <Badge variant="secondary">Python 3.13</Badge>
        </div>
      </div>
    </div>
  );
}
