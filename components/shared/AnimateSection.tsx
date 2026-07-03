"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  directionAt,
  motionOffset,
  REVEAL_CLASS,
  SECTION_TRANSITION,
  VIEWPORT,
  type AnimateDirection,
} from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  direction?: AnimateDirection;
  index?: number;
  delay?: number;
  /** Play on mount (hero / above-the-fold) — avoids blank screen if in-view never fires. */
  instant?: boolean;
};

export function AnimateSection({
  children,
  className,
  id,
  direction,
  index = 0,
  delay = 0,
  instant = false,
}: Props) {
  const reduce = useReducedMotion();
  const dir = direction ?? directionAt(index);
  const offset = motionOffset(dir);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (reduce) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  const visible = { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <motion.section
      id={id}
      className={cn(REVEAL_CLASS, className)}
      initial={{ opacity: 0, ...offset }}
      animate={instant && mounted ? visible : undefined}
      whileInView={instant ? undefined : visible}
      viewport={instant ? undefined : VIEWPORT}
      transition={{ ...SECTION_TRANSITION, delay }}
    >
      {children}
    </motion.section>
  );
}
