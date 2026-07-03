"use client";

import { useRef } from "react";
import VariableProximity from "@/components/shared/VariableProximity";

export function AboutHeroName() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative">
      <h1 className="mt-3 font-fraunces text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[40px] lg:text-[44px]">
        <VariableProximity
          label="Shehroz Iqbal"
          containerRef={containerRef}
          radius={180}
          falloff="gaussian"
          fromFontVariationSettings="'wght' 500, 'opsz' 40"
          toFontVariationSettings="'wght' 800, 'opsz' 80"
          className="text-white"
        />
        <span className="mt-1 block text-[0.55em] font-medium not-italic leading-snug text-white/70">
          Sir Shehroz — Accounting tutor, Karachi · Cambridge (CAIE)
        </span>
      </h1>
    </div>
  );
}
