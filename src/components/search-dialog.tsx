"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Loader2, Cpu, Server, Wallet, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface SearchMatch {
  text: string;
  section: string | null;
  anchor: string | null;
}

interface SearchResult {
  title: string;
  source: "ai-infra" | "svc-infra" | "fin-infra";
  href: string;
  matches: SearchMatch[];
}

const sourceIcons = {
  "ai-infra": Cpu,
  "svc-infra": Server,
  "fin-infra": Wallet,
};

const sourceColors = {
  "ai-infra": "text-blue-500",
  "svc-infra": "text-violet-500",
  "fin-infra": "text-emerald-500",
};

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Flatten results into selectable items (doc + individual sections)
  const selectableItems = results.flatMap((result) => {
    const items = [{ result, match: null as SearchMatch | null }];
    result.matches.forEach((match) => {
      if (match.anchor) {
        items.push({ result, match });
      }
    });
    return items;
  });

  // Debounced search
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results);
        setSelectedIndex(0);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Reset when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i < selectableItems.length - 1 ? i + 1 : i));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i > 0 ? i - 1 : i));
      } else if (e.key === "Enter" && selectableItems.length > 0) {
        e.preventDefault();
        const selected = selectableItems[selectedIndex];
        if (selected) {
          const href = selected.match?.anchor 
            ? `${selected.result.href}#${selected.match.anchor}`
            : selected.result.href;
          router.push(href);
          onOpenChange(false);
        }
      }
    },
    [selectableItems, selectedIndex, router, onOpenChange]
  );

  const handleSelect = (href: string) => {
    router.push(href);
    onOpenChange(false);
  };

  let itemIndex = -1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 p-0 overflow-hidden" showCloseButton={false}>
        <VisuallyHidden.Root>
          <DialogTitle>Search documentation</DialogTitle>
        </VisuallyHidden.Root>
        
        <div className="flex items-center border-b px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-12 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {query.length < 2 ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              Type at least 2 characters to search...
            </div>
          ) : results.length === 0 && !isLoading ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {results.map((result) => {
                const Icon = sourceIcons[result.source];
                itemIndex++;
                const docItemIndex = itemIndex;
                
                return (
                  <div key={result.source} className="space-y-1">
                    {/* Main doc result */}
                    <button
                      onClick={() => handleSelect(result.href)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                        docItemIndex === selectedIndex ? "bg-accent" : "hover:bg-accent/50"
                      )}
                    >
                      <div className={cn(sourceColors[result.source])}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{result.title}</span>
                          <span className="text-xs text-muted-foreground px-1.5 py-0.5 rounded bg-muted">
                            {result.source}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Section matches */}
                    {result.matches.filter(m => m.anchor).map((match, i) => {
                      itemIndex++;
                      const matchItemIndex = itemIndex;
                      
                      return (
                        <button
                          key={`${result.source}-${i}`}
                          onClick={() => handleSelect(`${result.href}#${match.anchor}`)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ml-4",
                            matchItemIndex === selectedIndex ? "bg-accent" : "hover:bg-accent/50"
                          )}
                        >
                          <Hash className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{match.section}</div>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {match.text}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <kbd className="rounded border bg-muted px-1.5 py-0.5">↑↓</kbd>
            <span>Navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="rounded border bg-muted px-1.5 py-0.5">Enter</kbd>
            <span>Select</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="rounded border bg-muted px-1.5 py-0.5">Esc</kbd>
            <span>Close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
