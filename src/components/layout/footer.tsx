import Link from "next/link";
import { Command } from "lucide-react";

const frameworks = [
  {
    name: "AI Infra",
    href: "/docs/ai-infra",
    description: "Build intelligent AI-powered applications",
  },
  {
    name: "Svc Infra",
    href: "/docs/svc-infra",
    description: "Backend infrastructure for any service",
  },
  {
    name: "Fin Infra",
    href: "/docs/fin-infra",
    description: "Financial and billing infrastructure",
  },
];

const resources = [
  { name: "Getting Started", href: "/docs" },
  { name: "API Reference", href: "/docs/api" },
  { name: "Examples", href: "/docs/examples" },
  { name: "Changelog", href: "/docs/changelog" },
];

const community = [
  { name: "GitHub", href: "https://github.com" },
  { name: "Discord", href: "#" },
  { name: "Twitter", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background relative z-10">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Command className="h-6 w-6" />
              <span className="font-bold">xinfras</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Unified infrastructure frameworks for building modern applications.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Frameworks</h3>
            <ul className="mt-4 space-y-3">
              {frameworks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-3">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Community</h3>
            <ul className="mt-4 space-y-3">
              {community.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} xinfras. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
