"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Interactive, slowly auto-rotating 3D brand logo (compressed .glb rendered
 * via `@google/model-viewer`, lazy-loaded on the client). Shows the flat logo
 * as a fallback until the 3D model is ready.
 */
export function Logo3D({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    // Registers the <model-viewer> custom element on the client only.
    import("@google/model-viewer").catch(() => {});

    const el = ref.current;
    if (!el) return;
    const onLoad = () => {
      if (active) setLoaded(true);
    };
    el.addEventListener("load", onLoad);
    return () => {
      active = false;
      el.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Flat-logo fallback until the model is ready */}
      <Image
        src="/images/logo.webp"
        alt="Shehroz Iqbal logo"
        width={240}
        height={240}
        aria-hidden={loaded}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-500",
          loaded ? "opacity-0" : "opacity-100"
        )}
      />

      <model-viewer
        ref={ref}
        src="/models/logo-3d.glb"
        alt="Shehroz Iqbal — 3D logo"
        auto-rotate=""
        rotation-per-second="26deg"
        interaction-prompt="none"
        environment-image="neutral"
        exposure="1.15"
        shadow-intensity="0"
        disable-zoom=""
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          opacity: loaded ? 1 : 0,
          transition: "opacity 700ms ease",
        }}
      />
    </div>
  );
}
