import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Key, Database, Workflow, Code, Terminal, ArrowRight, Layers, Shield, Zap } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Code,
    title: "API Framework",
    description: "Build robust REST APIs with FastAPI integration, automatic OpenAPI docs, and request validation.",
    href: "/docs/svc-infra/api",
  },
  {
    icon: Key,
    title: "Authentication",
    description: "Full auth system with JWT, API keys, OAuth, RBAC, and multi-tenancy support out of the box.",
    href: "/docs/svc-infra/auth",
  },
  {
    icon: Database,
    title: "Database & Caching",
    description: "SQLAlchemy async support, migrations, Redis caching, and connection pooling configured for you.",
    href: "/docs/svc-infra/database",
  },
  {
    icon: Workflow,
    title: "Job Queues",
    description: "Background job processing with priorities, retries, scheduling, and observability built in.",
    href: "/docs/svc-infra/jobs",
  },
];

export default function SvcInfraPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <Server className="h-6 w-6 text-primary" />
          </div>
          <Badge variant="outline" className="text-primary">
            Backend Infrastructure
          </Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">svc-infra</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Generic, reusable backend infrastructure for any service-based application. 
          Provides API framework, authentication, database, caching, job queues, and observability.
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
                  <code>pip install svc-infra</code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="poetry">
              <div className="rounded-lg bg-muted p-3 mt-3">
                <pre className="text-sm text-foreground/90 overflow-x-auto">
                  <code>poetry add svc-infra</code>
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
            <Zap className="h-5 w-5" />
            Quick Example
          </CardTitle>
          <CardDescription>Create a production-ready API in minutes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Code className="h-3.5 w-3.5" />
              app.py
            </div>
            <pre className="text-sm text-foreground/90 overflow-x-auto">
              <code>
{`from svc_infra import App, Router
from svc_infra.auth import require_auth
from svc_infra.db import Database

app = App()
router = Router()
db = Database(app)

@router.get("/users/{user_id}")
@require_auth
async def get_user(user_id: str):
    """Get user by ID."""
    user = await db.users.get(user_id)
    return {"user": user}

app.include_router(router)`}
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
              <Card className="group h-full transition-colors duration-200 hover:border-primary/50">
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

      {/* Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Architecture
          </CardTitle>
          <CardDescription>How svc-infra components work together</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border/60 p-4">
                <h4 className="font-medium text-sm mb-2">API Layer</h4>
                <p className="text-xs text-muted-foreground">
                  FastAPI-based routing with automatic validation, OpenAPI docs, and middleware support.
                </p>
              </div>
              <div className="rounded-lg border border-border/60 p-4">
                <h4 className="font-medium text-sm mb-2">Service Layer</h4>
                <p className="text-xs text-muted-foreground">
                  Business logic with dependency injection, transaction management, and error handling.
                </p>
              </div>
              <div className="rounded-lg border border-border/60 p-4">
                <h4 className="font-medium text-sm mb-2">Data Layer</h4>
                <p className="text-xs text-muted-foreground">
                  Async SQLAlchemy with repositories, migrations, and Redis caching integration.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <div className="rounded-lg border border-border/60 p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security First
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="font-medium text-sm">Authentication</h4>
            <p className="text-sm text-muted-foreground mt-1">
              JWT tokens, API keys, OAuth2/OIDC integration with automatic token refresh and revocation.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm">Authorization</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Role-based access control (RBAC) with fine-grained permissions and multi-tenancy support.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm">Rate Limiting</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Configurable rate limits per endpoint, user, or API key with Redis-backed distributed limiting.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm">Input Validation</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Pydantic models for request/response validation with automatic error messages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
