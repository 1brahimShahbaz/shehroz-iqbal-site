"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  EASE_OUT,
  motionOffset,
  REVEAL_CLASS,
  VIEWPORT,
  type AnimateDirection,
} from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  direction?: AnimateDirection;
  delay?: number;
};

export function AnimateIn({
  children,
  className,
  direction = "up",
  delay = 0,
}: Props) {
  const reduce = useReducedMotion();
  const offset = motionOffset(direction);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(REVEAL_CLASS, className)}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
