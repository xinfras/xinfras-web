"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Github, Moon, Sun, Command, Search, FileText, Folder, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { SearchDialog } from "@/components/search-dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { DocsStructure, DocItem } from "@/lib/github";

interface HeaderClientProps {
  docsStructure: DocsStructure[];
}

function DocLink({
  item,
  packageName,
}: {
  item: DocItem;
  packageName: string;
}) {
  const href = `/docs/${packageName}/${item.slug}`;

  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
    >
      <FileText className="h-4 w-4 text-muted-foreground" />
      <span>{item.title}</span>
    </Link>
  );
}

function DocFolder({
  item,
  packageName,
}: {
  item: DocItem;
  packageName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
      >
        <Folder className="h-4 w-4 text-muted-foreground" />
        <span className="flex-1 text-left">{item.title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && item.children && (
        <div className="ml-4 border-l border-border pl-2">
          {item.children.map((child) =>
            child.type === "dir" ? (
              <DocFolder key={child.path} item={child} packageName={packageName} />
            ) : (
              <DocLink key={child.path} item={child} packageName={packageName} />
            )
          )}
        </div>
      )}
    </div>
  );
}

function PackageDropdown({ structure }: { structure: DocsStructure }) {
  const packageName = structure.package;
  const hasSubDocs = structure.items.length > 0;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="h-9 bg-transparent">
        {packageName}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-80 p-4">
          {/* Overview link */}
          <Link
            href={`/docs/${packageName}`}
            className="mb-3 flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <FileText className="h-4 w-4" />
            <span>Overview (README)</span>
          </Link>

          {hasSubDocs ? (
            <>
              <div className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Documentation
              </div>
              <div className="max-h-80 space-y-1 overflow-y-auto">
                {structure.items.map((item) =>
                  item.type === "dir" ? (
                    <DocFolder
                      key={item.path}
                      item={item}
                      packageName={packageName}
                    />
                  ) : (
                    <DocLink
                      key={item.path}
                      item={item}
                      packageName={packageName}
                    />
                  )
                )}
              </div>
            </>
          ) : (
            <p className="px-3 text-sm text-muted-foreground">
              No additional documentation available.
            </p>
          )}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function HeaderClient({ docsStructure }: HeaderClientProps) {
  const [isDark, setIsDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
  }, []);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-screen-xl items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-4 hidden md:flex md:items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Command className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">xinfras</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Docs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {docsStructure.map((structure) => (
                <PackageDropdown key={structure.package} structure={structure} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 pr-0">
            <Link href="/" className="flex items-center space-x-2">
              <Command className="h-6 w-6" />
              <span className="font-bold">xinfras</span>
            </Link>
            <div className="my-6 space-y-6">
              <Link
                href="/docs"
                className="block text-sm font-medium transition-colors hover:text-foreground"
              >
                Docs
              </Link>
              {docsStructure.map((structure) => (
                <div key={structure.package} className="space-y-2">
                  <Link
                    href={`/docs/${structure.package}`}
                    className="block text-sm font-semibold"
                  >
                    {structure.package}
                  </Link>
                  {structure.items.length > 0 && (
                    <div className="ml-2 space-y-1 border-l border-border pl-3">
                      {structure.items.map((item) =>
                        item.type === "dir" ? (
                          <div key={item.path} className="space-y-1">
                            <span className="block text-xs font-medium text-muted-foreground">
                              {item.title}
                            </span>
                            {item.children?.map((child) => (
                              <Link
                                key={child.path}
                                href={`/docs/${structure.package}/${child.slug}`}
                                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <Link
                            key={item.path}
                            href={`/docs/${structure.package}/${item.slug}`}
                            className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {item.title}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button
              variant="outline"
              onClick={() => setSearchOpen(true)}
              className="relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
            >
              <Search className="mr-2 h-4 w-4" />
              <span className="hidden lg:inline-flex">Search documentation...</span>
              <span className="inline-flex lg:hidden">Search...</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
          <nav className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a
                href="https://github.com/xinfras"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleTheme}
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
