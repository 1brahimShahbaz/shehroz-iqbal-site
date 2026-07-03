"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { VideoLightbox } from "@/components/shared/VideoLightbox";

const videos = [
  { id: "g1", src: "/videos/glimpse1.mp4" },
  { id: "g2", src: "/videos/glimpse2.mp4" },
  { id: "g3", src: "/videos/glimpse3.mp4" },
  { id: "g4", src: "/videos/glimpse4.mp4" },
  { id: "g5", src: "/videos/glimpse5.mp4" },
];

export function ReelsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  }, []);

  return (
    <AnimateSection index={3} className="bg-navy-900 py-20 lg:py-24">
      <div className="container-x">
        <SectionHeader
          align="left"
          variant="dark"
          eyebrow="A Glimpse Inside the Classroom"
          title={
            <span className="italic">
              Real classes. Real moments.
            </span>
          }
          subtitle="Short clips from live sessions — the questions, the jokes, the lightbulb moments."
        />

        <div
          ref={scrollerRef}
          className="reels-scroll mt-12 flex gap-5 overflow-x-auto scroll-smooth pb-4"
        >
          {videos.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveSrc(v.src)}
              className="group relative aspect-[9/16] min-w-[220px] flex-[0_0_220px] overflow-hidden rounded-2xl shadow-card-hover ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:ring-gold-500/50 sm:min-w-[260px] sm:flex-[0_0_260px]"
              aria-label="Play classroom glimpse"
            >
              <video
                src={v.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-navy-900/10"
              />
              <span className="absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm transition-colors group-hover:bg-gold-500 group-hover:text-white">
                <Volume2 className="h-3 w-3" strokeWidth={2.5} />
                Tap to play with sound
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <button
            aria-label="Previous reel"
            onClick={() => scrollBy(-1)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-700 text-gold-500 transition-colors hover:bg-navy-500"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            aria-label="Next reel"
            onClick={() => scrollBy(1)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-700 text-gold-500 transition-colors hover:bg-navy-500"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <VideoLightbox
        open={!!activeSrc}
        onClose={() => setActiveSrc(null)}
        videoUrl={activeSrc ?? ""}
        title="Classroom glimpse"
      />
    </AnimateSection>
  );
}
