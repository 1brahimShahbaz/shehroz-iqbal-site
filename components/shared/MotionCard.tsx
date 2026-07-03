"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CARD_HOVER, TAP_SPRING } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
};

export function MotionCard({ children, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Comp
      className={cn(className)}
      whileHover={CARD_HOVER}
      whileTap={{ scale: 0.985, transition: TAP_SPRING }}
    >
      {children}
    </Comp>
  );
}
