"use client";

import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { StudentLifeSection } from "@/components/gallery/StudentLifeSection";
import type { MasonryItem } from "@/components/shared/Masonry";

export function ExtraCreditGallery(props: { masonryItems: MasonryItem[] }) {
  return (
    <>
      <AnimateSection
        index={0}
        direction="fade"
        instant
        className="relative isolate overflow-hidden bg-navy-900 py-20 text-white lg:py-28"
      >
        <div aria-hidden className="absolute inset-0 bg-grid-overlay" />
        <div className="container-x relative">
          <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
            <SectionEyebrow>Extra credit</SectionEyebrow>
            <h1 className="mt-5 font-fraunces text-[44px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[56px] lg:text-[68px]">
              Snaps & <span className="italic text-gold-500">shorts.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-inter text-[17px] leading-[1.75] text-white/80">
              Beyond past papers — photos from sessions past and present.
            </p>
          </div>
        </div>
      </AnimateSection>

      <StudentLifeSection items={props.masonryItems} />
    </>
  );
}
