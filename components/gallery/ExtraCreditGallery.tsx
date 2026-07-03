"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { VideoLightbox } from "@/components/shared/VideoLightbox";
import { StudentLifeSection } from "@/components/gallery/StudentLifeSection";
import type { GalleryVideoClip } from "@/data/gallery";
import type { MasonryItem } from "@/components/shared/Masonry";

type SectionProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  videos: GalleryVideoClip[];
  index: number;
};

function VideoStripSection({
  id,
  eyebrow,
  title,
  subtitle,
  videos,
  index,
  onOpenVideo,
}: SectionProps & {
  id: string;
  onOpenVideo: (src: string, title?: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }, []);

  return (
    <AnimateSection
      index={index}
      className={`${id === "classroom" ? "bg-grid-white" : "bg-navy-900"} py-20 lg:py-24`}
    >
      <div className="container-x">
        <div className="max-w-2xl">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2
            className={`mt-3 font-fraunces text-[32px] font-semibold italic leading-tight sm:text-[40px] ${
              id === "recommendations" ? "text-white" : "text-navy-900"
            }`}
          >
            {title}
          </h2>
          <p
            className={`mt-3 max-w-xl font-inter text-[16px] leading-relaxed ${
              id === "recommendations" ? "text-white/75" : "text-gray-500"
            }`}
          >
            {subtitle}
          </p>
        </div>

        <div
          ref={ref}
          className="reels-scroll mt-12 flex gap-5 overflow-x-auto scroll-smooth pb-4"
        >
          {videos.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => onOpenVideo(v.src, v.caption)}
              className={`group relative aspect-[9/16] min-w-[220px] flex-[0_0_220px] overflow-hidden rounded-2xl shadow-card-hover ring-1 transition-all duration-300 hover:-translate-y-1 hover:ring-gold-500/50 sm:min-w-[260px] sm:flex-[0_0_260px] ${
                id === "recommendations"
                  ? "shadow-card-hover ring-white/15"
                  : "ring-gray-900/10"
              }`}
              aria-label={v.caption || "Play video"}
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
                className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/75 via-transparent ${
                  id === "recommendations"
                    ? "to-navy-900/25"
                    : "to-transparent"
                }`}
              />
              <span
                className={`absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide backdrop-blur-sm transition-colors ${
                  id === "recommendations"
                    ? "bg-white/15 text-white group-hover:bg-gold-500 group-hover:text-white"
                    : "bg-navy-900/20 text-white group-hover:bg-gold-500 group-hover:text-white"
                }`}
              >
                <Volume2 className="h-3 w-3" strokeWidth={2.5} />
                Tap with sound
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <button
            aria-label="Scroll clips left"
            onClick={() => scrollBy(-1)}
            className={
              id === "recommendations"
                ? "inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-700 text-gold-500 transition-colors hover:bg-navy-500"
                : "inline-flex h-12 w-12 items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900 shadow-card-rest transition-colors hover:bg-navy-900 hover:text-gold-500"
            }
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            aria-label="Scroll clips right"
            onClick={() => scrollBy(1)}
            className={
              id === "recommendations"
                ? "inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-700 text-gold-500 transition-colors hover:bg-navy-500"
                : "inline-flex h-12 w-12 items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900 shadow-card-rest transition-colors hover:bg-navy-900 hover:text-gold-500"
            }
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </AnimateSection>
  );
}

export function ExtraCreditGallery(props: {
  classroom: GalleryVideoClip[];
  recommendations: GalleryVideoClip[];
  masonryItems: MasonryItem[];
}) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | undefined>();

  const onOpenVideo = useCallback((src: string, title?: string) => {
    setVideoUrl(src);
    setVideoTitle(title);
  }, []);

  const closeVideo = useCallback(() => {
    setVideoUrl(null);
    setVideoTitle(undefined);
  }, []);

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
              Beyond past papers — glimpses from class, student testimonials on
              video, and photos from sessions past and present.
            </p>
          </div>
        </div>
      </AnimateSection>

      <VideoStripSection
        index={1}
        id="classroom"
        eyebrow="On the syllabus"
        title={
          <>
            Classroom <span className="italic">glimpses.</span>
          </>
        }
        subtitle="Short clips from live sessions — the questions, pauses and lightbulb moments."
        videos={props.classroom}
        onOpenVideo={onOpenVideo}
      />

      <VideoStripSection
        index={2}
        id="recommendations"
        eyebrow="Outside the textbook"
        title={
          <>
            Student <span className="italic">recommendations.</span>
          </>
        }
        subtitle="Student voices — what it actually feels like in this classroom."
        videos={props.recommendations}
        onOpenVideo={onOpenVideo}
      />

      <StudentLifeSection items={props.masonryItems} />

      <VideoLightbox
        open={!!videoUrl}
        onClose={closeVideo}
        videoUrl={videoUrl ?? ""}
        title={videoTitle || "Gallery clip"}
      />
    </>
  );
}
