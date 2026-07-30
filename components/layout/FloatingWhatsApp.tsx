"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function FloatingWhatsApp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sir Shehroz on WhatsApp"
      onClick={() => trackEvent("whatsapp_click", { context: "floating" })}
      className={cn(
        "fixed z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_32px_rgba(37,211,102,0.45)] transition-all duration-300 ease-smooth hover:-translate-y-1 hover:scale-105 hover:shadow-[0_16px_40px_rgba(37,211,102,0.5)] active:scale-95 sm:h-16 sm:w-16",
        mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
        right: "max(1.25rem, env(safe-area-inset-right, 0px))",
        transitionDelay: mounted ? "400ms" : "0ms",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-whatsapp opacity-50 animate-pulse-ring"
      />
      <MessageCircle className="relative h-7 w-7" strokeWidth={2} fill="white" />
    </a>
  );
}
