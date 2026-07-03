"use client";

import { useCallback, useRef, type MouseEvent, type ReactNode, type TouchEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import "./SpotlightCard.css";

type Props = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
};

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}: Props) {
  const reduceMotion = useReducedMotion();
  const divRef = useRef<HTMLDivElement>(null);

  const updateSpotlight = useCallback(
    (clientX: number, clientY: number) => {
      const el = divRef.current;
      if (!el || reduceMotion) return;

      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      el.style.setProperty("--mouse-x", `${x}px`);
      el.style.setProperty("--mouse-y", `${y}px`);
      el.style.setProperty("--spotlight-color", spotlightColor);
    },
    [reduceMotion, spotlightColor]
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    updateSpotlight(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) updateSpotlight(touch.clientX, touch.clientY);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={cn("card-spotlight", className)}
    >
      {children}
    </div>
  );
}
