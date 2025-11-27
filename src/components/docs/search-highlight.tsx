"use client";

import { useEffect } from "react";

export function SearchHighlight() {
  useEffect(() => {
    // Get highlight param directly from URL
    const urlParams = new URLSearchParams(window.location.search);
    const highlight = urlParams.get("highlight");
    
    if (!highlight) {
      return;
    }

    const findAndHighlight = () => {
      const article = document.querySelector("article");
      if (!article) {
        // Retry if article not rendered yet
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
          if (parent instanceof HTMLElement) {
            const isInCode = parent.tagName === "CODE" || 
                            parent.tagName === "PRE" || 
                            parent.closest("pre") !== null ||
                            parent.closest("code") !== null;
            
            if (isInCode || parent.classList.contains("search-highlight")) {
              continue;
            }
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
          mark.className = "search-highlight";
          mark.style.cssText = "background-color: #fef08a; padding: 2px 4px; border-radius: 3px; scroll-margin-top: 120px;";
          mark.textContent = match;
          fragment.appendChild(mark);

          if (after) {
            fragment.appendChild(document.createTextNode(after));
          }

          parent.replaceChild(fragment, node);

          // Scroll to the first highlight
          if (!found) {
            found = true;
            setTimeout(() => {
              mark.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
          }

          // Only highlight first match
          break;
        }
      }

      if (!found) {
        // Check code blocks if not found in regular text
        const codeBlocks = article.querySelectorAll("pre code, code");
        for (const code of codeBlocks) {
          if (code.textContent?.toLowerCase().includes(lowerHighlight)) {
            const pre = code.closest("pre") || code;
            pre.scrollIntoView({ behavior: "smooth", block: "center" });
            
            if (pre instanceof HTMLElement) {
              pre.style.outline = "3px solid #fbbf24";
              pre.style.outlineOffset = "2px";
              setTimeout(() => {
                pre.style.outline = "";
                pre.style.outlineOffset = "";
              }, 5000);
            }
            found = true;
            break;
          }
        }
      }

      // Clean up after 5 seconds
      setTimeout(() => {
        const highlights = document.querySelectorAll(".search-highlight");
        highlights.forEach((el) => {
          const parent = el.parentNode;
          if (parent) {
            parent.replaceChild(document.createTextNode(el.textContent || ""), el);
          }
        });
        // Clean URL
        const url = new URL(window.location.href);
        url.searchParams.delete("highlight");
        window.history.replaceState({}, "", url.toString());
      }, 5000);
    };

    // Start searching after a delay for content to render
    setTimeout(findAndHighlight, 300);
  }, []);

  return null;
}
