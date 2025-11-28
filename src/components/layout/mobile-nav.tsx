"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  Command,
  Search,
  ChevronRight,
  FileText,
  Folder,
  Github,
  Moon,
  Sun,
  Home,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocsStructure, DocItem } from "@/lib/github";

interface MobileNavProps {
  docsStructure: DocsStructure[];
  onSearchClick: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

interface CollapsibleSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        <ChevronRight
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-90"
          )}
        />
      </button>
      {isOpen && (
        <div className="ml-4 space-y-0.5 border-l border-border pl-3 pt-1">
          {children}
        </div>
      )}
    </div>
  );
}

function NavLink({
  href,
  children,
  icon,
  onClose,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {icon}
      <span className="truncate">{children}</span>
    </Link>
  );
}

function DocItemLink({
  item,
  packageName,
  onClose,
}: {
  item: DocItem;
  packageName: string;
  onClose: () => void;
}) {
  if (item.type === "dir" && item.children && item.children.length > 0) {
    return (
      <CollapsibleSection
        title={item.title}
        icon={<Folder className="h-4 w-4 text-muted-foreground" />}
      >
        {item.children.map((child) => (
          <DocItemLink
            key={child.path}
            item={child}
            packageName={packageName}
            onClose={onClose}
          />
        ))}
      </CollapsibleSection>
    );
  }

  return (
    <NavLink
      href={`/${packageName}/${item.slug}`}
      icon={<FileText className="h-4 w-4" />}
      onClose={onClose}
    >
      {item.title}
    </NavLink>
  );
}

export function MobileNav({
  docsStructure,
  onSearchClick,
  isDark,
  toggleTheme,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleSearchClick = () => {
    setOpen(false);
    // Small delay to let the drawer close animation start
    setTimeout(() => onSearchClick(), 150);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 h-9 w-9 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-[300px] flex-col overflow-hidden p-0 sm:w-[350px]">
        {/* Header */}
        <SheetHeader className="shrink-0 border-b px-4 py-3">
          <SheetTitle asChild>
            <Link
              href="/"
              onClick={handleClose}
              className="flex items-center gap-2"
            >
              <Command className="h-5 w-5" />
              <span className="font-semibold">xinfras</span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        {/* Search Button */}
        <div className="shrink-0 px-4 py-3">
          <Button
            variant="outline"
            onClick={handleSearchClick}
            className="w-full justify-start gap-2 bg-muted/50 text-muted-foreground"
          >
            <Search className="h-4 w-4" />
            <span>Search docs...</span>
          </Button>
        </div>

        <Separator className="shrink-0" />

        {/* Navigation - scrollable area */}
        <div className="min-h-0 flex-1 overflow-y-auto px-2">
          <div className="space-y-1 py-3">
            {/* Quick Links */}
            <NavLink href="/" icon={<Home className="h-4 w-4" />} onClose={handleClose}>
              Home
            </NavLink>
            <NavLink href="/docs" icon={<BookOpen className="h-4 w-4" />} onClose={handleClose}>
              Documentation
            </NavLink>
          </div>

          <Separator className="my-2" />

          {/* Packages */}
          <div className="space-y-1 py-3">
            <p className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Packages
            </p>
            {docsStructure.map((structure) => (
              <CollapsibleSection
                key={structure.package}
                title={structure.package}
                icon={<Folder className="h-4 w-4 text-muted-foreground" />}
              >
                <NavLink
                  href={`/${structure.package}`}
                  icon={<FileText className="h-4 w-4" />}
                  onClose={handleClose}
                >
                  Overview
                </NavLink>
                {structure.items.map((item) => (
                  <DocItemLink
                    key={item.path}
                    item={item}
                    packageName={structure.package}
                    onClose={handleClose}
                  />
                ))}
              </CollapsibleSection>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                asChild
              >
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
                className="h-9 w-9"
                onClick={toggleTheme}
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">
              {isDark ? "Dark" : "Light"} mode
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
