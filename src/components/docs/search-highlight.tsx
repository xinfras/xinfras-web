"use client";

import { useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";

export function SearchHighlight() {
  const searchParams = useSearchParams();
  const highlight = searchParams.get("highlight");

  const findAndHighlight = useCallback(() => {
    if (!highlight) return;

    const article = document.querySelector("article");
    if (!article) {
      // Article not rendered yet, retry
      setTimeout(findAndHighlight, 100);
      return;
    }

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
            parent.tagName === "PRE" ||
            parent.closest("pre") ||
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
          "search-highlight bg-yellow-300 dark:bg-yellow-700 px-0.5 rounded-sm";
        mark.style.scrollMarginTop = "120px";
        mark.textContent = match;
        fragment.appendChild(mark);

        if (after) {
          fragment.appendChild(document.createTextNode(after));
        }

        parent.replaceChild(fragment, node);

        // Scroll to the first highlight
        if (!found) {
          found = true;
          // Delay to ensure DOM update is complete
          requestAnimationFrame(() => {
            setTimeout(() => {
              mark.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 50);
          });
        }

        // Only highlight first match for performance
        break;
      }
    }

    if (!found) {
      // If no match found in regular text, the term might be in a code block
      // Just scroll to the first code block that contains the term
      const codeBlocks = article.querySelectorAll("code");
      for (const code of codeBlocks) {
        if (code.textContent?.toLowerCase().includes(lowerHighlight)) {
          code.scrollIntoView({ behavior: "smooth", block: "center" });
          // Add a temporary highlight border to the code block
          const pre = code.closest("pre");
          if (pre) {
            pre.style.outline = "3px solid #fbbf24";
            pre.style.outlineOffset = "2px";
            setTimeout(() => {
              pre.style.outline = "";
              pre.style.outlineOffset = "";
            }, 5000);
          }
          break;
        }
      }
    }

    // Clean up highlight after 5 seconds
    setTimeout(() => {
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
      // Remove the highlight param from URL without navigation
      const url = new URL(window.location.href);
      url.searchParams.delete("highlight");
      window.history.replaceState({}, "", url.toString());
    }, 5000);
  }, [highlight]);

  useEffect(() => {
    if (!highlight) return;

    // Wait for hydration and content to render
    const timer = setTimeout(findAndHighlight, 300);
    return () => clearTimeout(timer);
  }, [highlight, findAndHighlight]);

  return null;
}
