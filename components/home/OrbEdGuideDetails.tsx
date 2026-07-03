"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function OrbEdGuideDetails({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const openIfHash = () => {
      if (window.location.hash === "#orbed-guide") {
        ref.current?.setAttribute("open", "");
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    openIfHash();
    window.addEventListener("hashchange", openIfHash);
    return () => window.removeEventListener("hashchange", openIfHash);
  }, []);

  return (
    <details
      ref={ref}
      className={cn(
        "group overflow-hidden rounded-2xl border border-navy-900/10 bg-white",
        "shadow-[0_4px_24px_rgba(11,37,69,0.06)]",
        "transition-[box-shadow,border-color] duration-300",
        "open:border-gold-500/35 open:shadow-card-hover"
      )}
    >
      {children}
    </details>
  );
}
