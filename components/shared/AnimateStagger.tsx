"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { REVEAL_CLASS, STAGGER_ITEM, VIEWPORT } from "@/lib/motion";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function AnimateStagger({
  children,
  className,
  stagger = 0.08,
}: StaggerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimateStaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(REVEAL_CLASS, className)}
      variants={{
        hidden: STAGGER_ITEM.hidden,
        visible: STAGGER_ITEM.visible,
      }}
    >
      {children}
    </motion.div>
  );
}
