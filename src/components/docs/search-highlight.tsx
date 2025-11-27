"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function SearchHighlight() {
  const searchParams = useSearchParams();
  const highlight = searchParams.get("highlight");

  useEffect(() => {
    if (!highlight) return;

    // Wait for content to render
    const timer = setTimeout(() => {
      const article = document.querySelector("article");
      if (!article) return;

      // Create a TreeWalker to find text nodes
      const walker = document.createTreeWalker(
        article,
        NodeFilter.SHOW_TEXT,
        null
      );

      let node: Text | null;
      let found = false;
      const lowerHighlight = highlight.toLowerCase();

      // Find the first text node containing the search term
      while ((node = walker.nextNode() as Text)) {
        const text = node.textContent || "";
        const lowerText = text.toLowerCase();
        const index = lowerText.indexOf(lowerHighlight);

        if (index !== -1) {
          // Found a match - wrap it in a highlight span
          const parent = node.parentNode;
          if (!parent) continue;

          // Skip if already inside a code block or we've already highlighted
          if (
            parent instanceof HTMLElement &&
            (parent.tagName === "CODE" ||
              parent.classList.contains("search-highlight"))
          ) {
            continue;
          }

          // Split the text node and wrap the match
          const before = text.slice(0, index);
          const match = text.slice(index, index + highlight.length);
          const after = text.slice(index + highlight.length);

          const fragment = document.createDocumentFragment();

          if (before) {
            fragment.appendChild(document.createTextNode(before));
          }

          const mark = document.createElement("mark");
          mark.className =
            "search-highlight bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded scroll-mt-32";
          mark.textContent = match;
          fragment.appendChild(mark);

          if (after) {
            fragment.appendChild(document.createTextNode(after));
          }

          parent.replaceChild(fragment, node);

          // Scroll to the first highlight
          if (!found) {
            found = true;
            // Small delay to ensure layout is complete
            setTimeout(() => {
              mark.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
          }

          // Continue to find more matches (limit to prevent performance issues)
          break; // Only highlight and scroll to first match
        }
      }

      // Clean up highlight after 5 seconds
      const cleanupTimer = setTimeout(() => {
        const highlights = document.querySelectorAll(".search-highlight");
        highlights.forEach((el) => {
          const parent = el.parentNode;
          if (parent) {
            parent.replaceChild(
              document.createTextNode(el.textContent || ""),
              el
            );
          }
        });
        // Also remove the highlight param from URL without navigation
        const url = new URL(window.location.href);
        url.searchParams.delete("highlight");
        window.history.replaceState({}, "", url.toString());
      }, 5000);

      return () => clearTimeout(cleanupTimer);
    }, 200);

    return () => clearTimeout(timer);
  }, [highlight]);

  return null;
}
