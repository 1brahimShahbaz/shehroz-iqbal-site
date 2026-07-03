"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { X } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import Masonry, { type MasonryItem } from "@/components/shared/Masonry";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

type Props = {
  items: MasonryItem[];
};

export function StudentLifeSection({ items }: Props) {
  const [lightbox, setLightbox] = useState<MasonryItem | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  if (items.length === 0) return null;

  return (
    <>
      <AnimateSection index={3} className="bg-grid-white py-20 lg:py-24">
        <div className="container-x">
          <div className="max-w-2xl">
            <SectionEyebrow>Student life</SectionEyebrow>
            <h2 className="mt-3 font-fraunces text-[32px] font-semibold leading-tight text-navy-900 sm:text-[40px]">
              Learning <span className="italic">together.</span>
            </h2>
            <p className="mt-3 max-w-xl font-inter text-[16px] leading-relaxed text-gray-500">
              Moments from class, sessions, and the community around Sir
              Shehroz&apos;s Accounting tuition.
            </p>
          </div>

          <div className="mt-14">
            <Masonry
              items={items}
              ease="power3.out"
              duration={0.6}
              stagger={0.06}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.97}
              blurToFocus
              colorShiftOnHover
              onItemClick={setLightbox}
            />
          </div>
        </div>
      </AnimateSection>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/90 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt ?? "Gallery photo"}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={closeLightbox}
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
          <div
            className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.img}
              alt={lightbox.alt ?? "Gallery photo"}
              width={1400}
              height={1000}
              className="h-auto max-h-[85vh] w-auto max-w-full object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
