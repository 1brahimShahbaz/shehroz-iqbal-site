"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  variant?: "light" | "dark";
};

export function AmbientOrbs({ variant = "light" }: Props) {
  const reduce = useReducedMotion();

  if (reduce) return null;

  const isDark = variant === "dark";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.span
        className={cnOrb(
          "absolute -left-20 top-[12%] h-56 w-56 rounded-full blur-3xl",
          isDark ? "bg-gold-500/15" : "bg-gold-500/10"
        )}
        animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className={cnOrb(
          "absolute right-[6%] top-[8%] h-40 w-40 rounded-full blur-2xl",
          isDark ? "bg-navy-500/35" : "bg-navy-500/15"
        )}
        animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className={cnOrb(
          "absolute bottom-[10%] left-[18%] h-32 w-32 rounded-full blur-2xl",
          isDark ? "bg-gold-500/10" : "bg-gold-500/12"
        )}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function cnOrb(...parts: string[]) {
  return parts.join(" ");
}
