"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

type Props = {
  className?: string;
  dark?: boolean;
};

export function MotionUnderline({ className, dark }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div
        aria-hidden
        className={cn(
          "section-title-line mt-5",
          dark && "via-white/50",
          className
        )}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      className={cn(
        "mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-gold-500 to-transparent",
        dark && "via-white/60",
        className
      )}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      style={{ originX: 0.5 }}
    />
  );
}
