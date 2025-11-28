"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Github, Moon, Sun, Command, Search, FileText, Folder, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { SearchDialog } from "@/components/search-dialog";
import { MobileNav } from "./mobile-nav";
import type { DocsStructure, DocItem } from "@/lib/github";

interface HeaderClientProps {
  docsStructure: DocsStructure[];
}

function renderDocItems(items: DocItem[], packageName: string): React.ReactNode {
  return items.map((item) => {
    if (item.type === "dir" && item.children && item.children.length > 0) {
      return (
        <DropdownMenuSub key={item.path}>
          <DropdownMenuSubTrigger>
            <Folder className="mr-2 h-4 w-4" />
            {item.title}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="max-h-80 overflow-y-auto">
            {renderDocItems(item.children, packageName)}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    }

    return (
      <DropdownMenuItem key={item.path} asChild>
        <Link href={`/${packageName}/${item.slug}`}>
          <FileText className="mr-2 h-4 w-4" />
          {item.title}
        </Link>
      </DropdownMenuItem>
    );
  });
}

function PackageDropdown({ structure }: { structure: DocsStructure }) {
  const packageName = structure.package;
  const hasSubDocs = structure.items.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 gap-1 px-3">
          {packageName}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 max-h-96 overflow-y-auto">
        <DropdownMenuItem asChild>
          <Link href={`/${packageName}`}>
            <FileText className="mr-2 h-4 w-4" />
            Overview (README)
          </Link>
        </DropdownMenuItem>

        {hasSubDocs && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Documentation</DropdownMenuLabel>
            {renderDocItems(structure.items, packageName)}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function HeaderClient({ docsStructure }: HeaderClientProps) {
  const [isDark, setIsDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem("theme");
    if (stored) {
      const dark = stored === "dark";
      setIsDark(dark);
      document.documentElement.classList.toggle("dark", dark);
    } else {
      const dark = document.documentElement.classList.contains("dark");
      setIsDark(dark);
    }
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
    const newDark = !isDark;
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    setIsDark(newDark);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-screen-xl items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-4 hidden md:flex md:items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Command className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">xinfras</span>
          </Link>
          <nav className="flex items-center">
            <Button variant="ghost" asChild className="h-9 px-3">
              <Link href="/docs">Docs</Link>
            </Button>
            {docsStructure.map((structure) => (
              <PackageDropdown key={structure.package} structure={structure} />
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <MobileNav
          docsStructure={docsStructure}
          onSearchClick={() => setSearchOpen(true)}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />

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
