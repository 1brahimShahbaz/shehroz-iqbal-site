"use client";

import { useState } from "react";
import { MotionCard } from "@/components/shared/MotionCard";
import SpotlightCard from "@/components/shared/SpotlightCard";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { VideoLightbox } from "./VideoLightbox";
import type { Lecture } from "@/data/lectures";
import { trackEvent } from "@/lib/analytics";

export function SampleLectureCard({ lecture }: { lecture: Lecture }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MotionCard as="article" className="h-full">
        <SpotlightCard
          spotlightColor="rgba(220, 38, 38, 0.12)"
          className="group flex h-full flex-col overflow-hidden rounded-2xl glass-card"
        >
        <button
          onClick={() => {
            setOpen(true);
            trackEvent("lecture_play", {
              level: lecture.level,
              title: lecture.title,
            });
          }}
          className="relative aspect-video w-full overflow-hidden"
          aria-label={`Play sample: ${lecture.title}`}
        >
          <Image
            src={lecture.thumbnail}
            alt={lecture.title}
            width={1200}
            height={675}
            loading="lazy"
            sizes="(min-width: 1024px) 400px, 100vw"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-transparent to-navy-900/10" />
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider2 text-white">
            {lecture.level} Level
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-navy-900/75 px-2.5 py-1 text-[11px] font-medium text-white">
            {lecture.duration}
          </span>
          <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-navy-900 shadow-[0_0_0_8px_rgba(255,255,255,0.18)] transition-transform group-hover:scale-105">
            <Play
              className="h-6 w-6 translate-x-0.5"
              strokeWidth={0}
              fill="currentColor"
            />
          </span>
        </button>
        <div className="flex-1 p-6">
          <h3 className="font-fraunces text-[20px] font-semibold leading-snug text-navy-900">
            {lecture.title}
          </h3>
          <p className="mt-2 text-[13px] text-gray-500">{lecture.chapter}</p>
          <button
            onClick={() => setOpen(true)}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors hover:text-gold-500"
          >
            Watch sample
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        </SpotlightCard>
      </MotionCard>
      <VideoLightbox
        open={open}
        onClose={() => setOpen(false)}
        videoUrl={lecture.videoUrl}
        title={lecture.title}
      />
    </>
  );
}
