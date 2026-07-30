"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Jumps to the top of the page on real route changes.
 *
 * The App Router scrolls to top on navigation, but the global
 * `html { scroll-behavior: smooth }` (needed for in-page anchor links) can
 * interfere, leaving a new page opened at the previous scroll position.
 * We force an instant reset here, while skipping hash navigations so
 * anchor links (#faq, #sample-lectures, …) still scroll smoothly.
 */
export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;

    const el = document.documentElement;
    const previous = el.style.scrollBehavior;
    el.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      el.style.scrollBehavior = previous;
    });
  }, [pathname]);

  return null;
}
