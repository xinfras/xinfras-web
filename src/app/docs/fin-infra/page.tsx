import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, CreditCard, Receipt, BarChart3, Code, Terminal, ArrowRight, DollarSign, RefreshCw, Shield } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: CreditCard,
    title: "Payment Processing",
    description: "Stripe integration with support for one-time payments, payment methods, and refunds.",
    href: "/docs/fin-infra/payments",
  },
  {
    icon: Receipt,
    title: "Subscriptions",
    description: "Manage subscription plans, billing cycles, upgrades, downgrades, and cancellations.",
    href: "/docs/fin-infra/subscriptions",
  },
  {
    icon: BarChart3,
    title: "Usage Metering",
    description: "Track and bill based on API calls, storage, compute, or any custom metric.",
    href: "/docs/fin-infra/metering",
  },
  {
    icon: DollarSign,
    title: "Invoicing",
    description: "Generate invoices, handle tax calculations, and manage billing history.",
    href: "/docs/fin-infra/invoicing",
  },
];

export default function FinInfraPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <Badge variant="outline" className="text-primary">
            Financial Infrastructure
          </Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">fin-infra</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Complete financial and billing infrastructure for payments, subscriptions, 
          invoicing, and usage-based billing. Built on Stripe with flexibility for any billing model.
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
                  <code>pip install fin-infra</code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="poetry">
              <div className="rounded-lg bg-muted p-3 mt-3">
                <pre className="text-sm text-foreground/90 overflow-x-auto">
                  <code>poetry add fin-infra</code>
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
            <DollarSign className="h-5 w-5" />
            Quick Example
          </CardTitle>
          <CardDescription>Set up billing for your application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Code className="h-3.5 w-3.5" />
              billing.py
            </div>
            <pre className="text-sm text-foreground/90 overflow-x-auto">
              <code>
{`from fin_infra import Billing, Plan
from fin_infra.metering import Meter

billing = Billing(stripe_key="sk_...")

# Define a plan with usage-based pricing
plan = Plan(
    name="Pro",
    base_price=29.00,
    features=["Unlimited projects", "Priority support"],
    metered_features=[
        Meter("api_calls", price_per_unit=0.001),
    ],
)

# Create a subscription
subscription = await billing.create_subscription(
    customer_id="cus_...",
    plan=plan,
)

# Record usage
await billing.record_usage(
    subscription_id=subscription.id,
    meter="api_calls",
    quantity=1000,
)`}
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

      {/* Billing Models */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Supported Billing Models
          </CardTitle>
          <CardDescription>Flexible pricing for any business model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border/60 p-4">
              <h4 className="font-medium text-sm mb-2">Flat Rate</h4>
              <p className="text-xs text-muted-foreground">
                Simple monthly or annual pricing with fixed features per tier.
              </p>
            </div>
            <div className="rounded-lg border border-border/60 p-4">
              <h4 className="font-medium text-sm mb-2">Usage-Based</h4>
              <p className="text-xs text-muted-foreground">
                Pay-as-you-go pricing based on API calls, storage, or custom metrics.
              </p>
            </div>
            <div className="rounded-lg border border-border/60 p-4">
              <h4 className="font-medium text-sm mb-2">Hybrid</h4>
              <p className="text-xs text-muted-foreground">
                Base subscription plus usage overages for the best of both worlds.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Events */}
      <div className="rounded-lg border border-border/60 p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Webhook Events
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          fin-infra handles Stripe webhooks automatically with built-in signature verification and event routing.
        </p>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-xs">subscription.created</Badge>
            <span className="text-sm text-muted-foreground">New subscription started</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-xs">invoice.paid</Badge>
            <span className="text-sm text-muted-foreground">Invoice successfully paid</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-xs">subscription.updated</Badge>
            <span className="text-sm text-muted-foreground">Plan changed or upgraded</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-xs">payment_method.attached</Badge>
            <span className="text-sm text-muted-foreground">New payment method added</span>
          </div>
        </div>
      </div>
    </div>
  );
}
