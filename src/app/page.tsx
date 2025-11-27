import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveBackground } from "@/components/ui/interactive-background";
import { ArrowRight, Cpu, Server, Wallet, Sparkles, Zap, Shield, Code2, Terminal, BookOpen, Github, Check, KeyRound, Database, HardDrive, ListTodo, Bot, CreditCard } from "lucide-react";
import Link from "next/link";

const frameworks = [
  {
    name: "ai-infra",
    description: "Build intelligent AI-powered applications with LLM orchestration, MCP servers, and agent frameworks.",
    icon: Cpu,
    href: "/docs/ai-infra",
    features: ["LLM Orchestration", "MCP Servers", "Agent Graphs", "Tool Execution"],
  },
  {
    name: "svc-infra",
    description: "Generic, reusable backend infrastructure for any service-based application.",
    icon: Server,
    href: "/docs/svc-infra",
    features: ["API Framework", "Auth & RBAC", "Database & Caching", "Job Queues"],
  },
  {
    name: "fin-infra",
    description: "Financial and billing infrastructure for payments, subscriptions, and invoicing.",
    icon: Wallet,
    href: "/docs/fin-infra",
    features: ["Payment Processing", "Subscriptions", "Invoicing", "Usage Metering"],
  },
];

const highlights = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for performance with async-first design and intelligent caching.",
  },
  {
    icon: Shield,
    title: "Production Ready",
    description: "Battle-tested infrastructure used in real-world applications.",
  },
  {
    icon: Code2,
    title: "Developer First",
    description: "Clean APIs, comprehensive docs, and excellent TypeScript/Python support.",
  },
];

const stats = [
  { value: "10K+", label: "Downloads" },
  { value: "99.9%", label: "Uptime" },
  { value: "3", label: "Frameworks" },
  { value: "24/7", label: "Support" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <InteractiveBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden">
            {/* Gradient orbs - subtle primary color */}
            <div className="absolute left-1/4 top-20 -z-10 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute right-1/4 top-40 -z-10 h-[300px] w-[300px] rounded-full bg-primary/8 blur-[100px]" />
            <div className="absolute left-1/2 top-60 -z-10 h-[250px] w-[250px] rounded-full bg-primary/5 blur-[100px]" />
          
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36 lg:py-44">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
              <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium">
                <Sparkles className="mr-2 h-3.5 w-3.5 text-primary" />
                Unified Infrastructure Frameworks
              </Badge>
              
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Build apps faster with
                <span className="block text-primary">
                  modern infrastructure
                </span>
              </h1>
              
              <p className="max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed">
                A suite of production-ready infrastructure frameworks for AI, backend services, and financial operations. 
                Stop reinventing the wheel and start building what matters.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 w-full sm:w-auto">
                <Button size="default" className="w-full sm:w-auto h-10 px-6 text-sm font-medium" asChild>
                  <Link href="/docs">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="default" variant="outline" className="w-full sm:w-auto h-10 px-6 text-sm font-medium" asChild>
                  <a href="https://github.com" target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Star on GitHub
                  </a>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pt-12 sm:pt-16 w-full max-w-2xl">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Frameworks Section */}
        <section className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
          <div className="mx-auto mb-12 sm:mb-16 max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Three frameworks. Infinite possibilities.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Each framework is designed to work independently or together, giving you the flexibility to build exactly what you need.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {frameworks.map((framework) => (
              <Link key={framework.name} href={framework.href} className="block">
                <Card className="group relative h-full overflow-hidden transition-colors duration-200 border-border hover:border-primary/50 bg-card">
                  <CardHeader className="relative pb-2">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-muted p-3 text-primary">
                        <framework.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{framework.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative pt-2">
                    <CardDescription className="text-sm sm:text-base leading-relaxed">
                      {framework.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {framework.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                      Explore documentation
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Code Preview Section */}
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
            <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 lg:order-1">
                <Badge variant="outline" className="mb-4 rounded-full px-3 py-1">
                  <Code2 className="mr-2 h-3 w-3" />
                  Developer Experience
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  Simple, intuitive APIs
                </h2>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Each framework provides clean, well-documented APIs that feel natural. 
                  Get started in minutes, not days.
                </p>
                <div className="mt-8 space-y-5">
                  {highlights.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <div className="relative overflow-hidden rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border/50 bg-muted/50 px-4 py-3">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                      <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                      <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Terminal className="h-3.5 w-3.5" />
                      example.py
                    </div>
                  </div>
                  <pre className="overflow-x-auto p-4 sm:p-6 text-xs sm:text-sm leading-relaxed">
                    <code className="text-foreground/90">
                      <span className="text-primary">from</span> svc_infra <span className="text-primary">import</span> App, Router{"\n"}
                      <span className="text-primary">from</span> ai_infra <span className="text-primary">import</span> AgentGraph{"\n"}
                      <span className="text-primary">from</span> fin_infra <span className="text-primary">import</span> Billing{"\n\n"}
                      <span className="text-muted-foreground"># Create your app</span>{"\n"}
                      app = App(){"\n\n"}
                      <span className="text-muted-foreground"># Add AI capabilities</span>{"\n"}
                      graph = AgentGraph(<span className="text-primary/80">&quot;assistant&quot;</span>){"\n"}
                      graph.add_tool(search_docs){"\n\n"}
                      <span className="text-muted-foreground"># Enable billing</span>{"\n"}
                      billing = Billing(app){"\n"}
                      billing.create_subscription(user_id){"\n"}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
          <div className="mx-auto mb-12 sm:mb-16 max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Everything you need to build
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              From authentication to AI, we&apos;ve got you covered with battle-tested solutions.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Authentication", desc: "JWT, OAuth, API keys with RBAC", icon: KeyRound },
              { title: "Database", desc: "Async SQLAlchemy with migrations", icon: Database },
              { title: "Caching", desc: "Redis integration out of the box", icon: HardDrive },
              { title: "Job Queues", desc: "Background processing with retries", icon: ListTodo },
              { title: "AI/LLM", desc: "OpenAI, Anthropic, and more", icon: Bot },
              { title: "Billing", desc: "Stripe integration for payments", icon: CreditCard },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-5 sm:p-6 transition-colors duration-200 hover:border-primary/50"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-base">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28">
          <div className="rounded-2xl border border-border bg-muted/50 px-6 sm:px-12 md:px-20 py-12 sm:py-16 md:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to build something amazing?
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-muted-foreground">
              Get started with our frameworks today. Join thousands of developers building the future.
            </p>
            
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button size="default" className="w-full sm:w-auto h-10 px-6 text-sm font-medium" asChild>
                  <Link href="/docs">
                    Start Building
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="default" variant="outline" className="w-full sm:w-auto h-10 px-6 text-sm font-medium" asChild>
                  <Link href="/docs/api">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read the Docs
                  </Link>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Open Source</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>MIT License</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Active Community</span>
                </div>
              </div>
          </div>
        </section>
      </main>
      <Footer />
      </div>
    </div>
  );
}
