import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InteractiveBackground } from "@/components/ui/interactive-background";
import { CodePreview } from "@/components/home/code-preview";
import { CopyButton } from "@/components/home/copy-button";
import { 
  ArrowRight, 
  Cpu, 
  Server, 
  Wallet, 
  Zap, 
  Shield, 
  Code2, 
  Github, 
  Check,
  Layers,
  Puzzle,
  Rocket,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const frameworks = [
  {
    name: "ai-infra",
    description: "LLM orchestration, MCP servers, and agent frameworks.",
    icon: Cpu,
    href: "/docs/ai-infra",
  },
  {
    name: "svc-infra", 
    description: "Backend infrastructure with auth, database, and jobs.",
    icon: Server,
    href: "/docs/svc-infra",
  },
  {
    name: "fin-infra",
    description: "Billing infrastructure for payments and subscriptions.",
    icon: Wallet,
    href: "/docs/fin-infra",
  },
];

const features = [
  {
    icon: Zap,
    title: "Async-First",
    description: "Built on async/await patterns for non-blocking, high-concurrency operations.",
  },
  {
    icon: Shield,
    title: "Type Safe",
    description: "Full type hints and Pydantic models for excellent IDE support and fewer bugs.",
  },
  {
    icon: Puzzle,
    title: "Composable",
    description: "Use frameworks independently or combine them for full-stack solutions.",
  },
  {
    icon: Layers,
    title: "Well Documented",
    description: "Comprehensive docs and examples to get you started quickly.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
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
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild>
                    <Link href="/docs">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://github.com/xinfras" target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                </div>

                {/* Install command */}
                <div className="mt-10 inline-flex items-center gap-2 sm:gap-3 rounded-lg border border-border bg-muted/50 px-3 sm:px-4 py-3 font-mono text-xs sm:text-sm max-w-full overflow-x-auto">
                  <span className="text-muted-foreground">$</span>
                  <span className="whitespace-nowrap">pip install svc-infra ai-infra fin-infra</span>
                  <CopyButton text="pip install svc-infra ai-infra fin-infra" className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground" />
                </div>

              </div>
            </div>
          </section>

          {/* Frameworks Section */}
          <section className="py-20 sm:py-24">
            <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
              
              {/* Section header */}
              <div className="text-center mb-12">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Three frameworks. One ecosystem.
                </h2>
                <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                  Work independently or together—flexibility without complexity.
                </p>
              </div>

              {/* Framework cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                {frameworks.map((framework) => (
                  <Link 
                    key={framework.name} 
                    href={framework.href}
                    className="group flex items-start gap-4 rounded-lg border border-border p-5 transition-colors hover:bg-muted/50"
                  >
                    <div className="rounded-md bg-muted p-2">
                      <framework.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium">{framework.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {framework.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 mt-1" />
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
                <CodePreview />
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
                    Ready to build something?
                  </h2>
                  <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                    Get started with our Python infrastructure frameworks in minutes.
                  </p>
                  
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button asChild>
                      <Link href="/docs">
                        Start Building
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/docs">
                        Documentation
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
                      Python 3.11+
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
