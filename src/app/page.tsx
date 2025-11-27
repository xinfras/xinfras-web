import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InteractiveBackground } from "@/components/ui/interactive-background";
import { 
  ArrowRight, 
  Cpu, 
  Server, 
  Wallet, 
  Zap, 
  Shield, 
  Code2, 
  Terminal, 
  Github, 
  Check,
  Layers,
  Puzzle,
  Rocket,
  ChevronRight,
  Copy,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const frameworks = [
  {
    name: "ai-infra",
    description: "LLM orchestration, MCP servers, and agent frameworks for intelligent applications.",
    icon: Cpu,
    href: "/docs/ai-infra",
    color: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    features: ["LLM Orchestration", "MCP Servers", "Agent Graphs"],
  },
  {
    name: "svc-infra", 
    description: "Production-ready backend infrastructure with auth, database, caching, and jobs.",
    icon: Server,
    href: "/docs/svc-infra",
    color: "from-violet-500/20 to-purple-500/20",
    iconBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    features: ["API Framework", "Auth & RBAC", "Job Queues"],
  },
  {
    name: "fin-infra",
    description: "Complete billing infrastructure for payments, subscriptions, and invoicing.",
    icon: Wallet,
    href: "/docs/fin-infra",
    color: "from-emerald-500/20 to-green-500/20",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    features: ["Stripe Integration", "Subscriptions", "Usage Billing"],
  },
];

const features = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "Async-first architecture with intelligent caching for maximum performance.",
  },
  {
    icon: Shield,
    title: "Battle Tested",
    description: "Used in production by teams handling millions of requests daily.",
  },
  {
    icon: Puzzle,
    title: "Composable",
    description: "Use frameworks independently or combine them for full-stack solutions.",
  },
  {
    icon: Layers,
    title: "Type Safe",
    description: "Full TypeScript and Python type hints for excellent developer experience.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <InteractiveBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          
          {/* Hero Section */}
          <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
            <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                
                {/* Pill badge */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-muted-foreground">Now with MCP Server support</span>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                </div>

                {/* Main headline */}
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block">Infrastructure that</span>
                  <span className="block mt-1 bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                    just works
                  </span>
                </h1>
                
                {/* Subheadline */}
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                  Three production-ready Python frameworks for AI, backend services, and billing. 
                  Build faster. Ship sooner.
                </p>
                
                {/* CTA buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="h-12 px-8 text-base" asChild>
                    <Link href="/docs">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                    <a href="https://github.com/xinfras" target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                </div>

                {/* Install command */}
                <div className="mt-10 inline-flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-4 py-3 font-mono text-sm">
                  <span className="text-muted-foreground">$</span>
                  <span>pip install ai-infra svc-infra fin-infra</span>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>

              </div>
            </div>
          </section>

          {/* Frameworks Section */}
          <section className="py-24 sm:py-32">
            <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
              
              {/* Section header */}
              <div className="text-center mb-16">
                <Badge variant="secondary" className="mb-4">
                  <Sparkles className="mr-1.5 h-3 w-3" />
                  Frameworks
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Three frameworks. One ecosystem.
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Each framework is designed to work independently or together, 
                  giving you flexibility without complexity.
                </p>
              </div>

              {/* Framework cards */}
              <div className="grid gap-6 lg:grid-cols-3">
                {frameworks.map((framework) => (
                  <Link 
                    key={framework.name} 
                    href={framework.href}
                    className="group relative"
                  >
                    <div className="relative h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50">
                      
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${framework.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                      
                      <div className="relative">
                        {/* Icon */}
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${framework.iconBg}`}>
                          <framework.icon className="h-6 w-6" />
                        </div>
                        
                        {/* Title */}
                        <h3 className="mt-6 text-xl font-semibold">{framework.name}</h3>
                        
                        {/* Description */}
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                          {framework.description}
                        </p>
                        
                        {/* Features */}
                        <div className="mt-6 flex flex-wrap gap-2">
                          {framework.features.map((feature) => (
                            <span 
                              key={feature} 
                              className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        {/* Link */}
                        <div className="mt-8 flex items-center text-sm font-medium text-primary">
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Code Preview Section */}
          <section className="py-24 sm:py-32 bg-muted/30">
            <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                
                {/* Left: Content */}
                <div>
                  <Badge variant="secondary" className="mb-4">
                    <Code2 className="mr-1.5 h-3 w-3" />
                    Developer Experience
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Clean APIs that feel natural
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    We obsess over API design so you can focus on building. 
                    Get started in minutes with intuitive, well-documented interfaces.
                  </p>
                  
                  {/* Feature list */}
                  <div className="mt-10 space-y-6">
                    {features.map((feature) => (
                      <div key={feature.title} className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Code block */}
                <div className="relative">
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
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-24 sm:py-32 border-y border-border">
            <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                {[
                  { value: "10K+", label: "Weekly Downloads", sublabel: "and growing" },
                  { value: "99.9%", label: "Uptime", sublabel: "across all services" },
                  { value: "500+", label: "GitHub Stars", sublabel: "from the community" },
                  { value: "<50ms", label: "Response Time", sublabel: "p95 latency" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">
                      {stat.value}
                    </div>
                    <div className="mt-2 font-medium">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 sm:py-32">
            <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
              <div className="relative rounded-3xl border border-border bg-card overflow-hidden">
                
                <div className="relative px-6 py-16 sm:px-16 sm:py-24 lg:py-32 text-center">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Ready to build something amazing?
                  </h2>
                  <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                    Join developers who are shipping faster with our infrastructure frameworks.
                  </p>
                  
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="h-12 px-8 text-base" asChild>
                      <Link href="/docs">
                        Start Building
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="ghost" className="h-12 px-8 text-base" asChild>
                      <Link href="/docs">
                        Read Documentation
                      </Link>
                    </Button>
                  </div>

                  {/* Trust indicators */}
                  <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      Open Source
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      MIT Licensed
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      Active Community
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      Production Ready
                    </div>
                  </div>
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
