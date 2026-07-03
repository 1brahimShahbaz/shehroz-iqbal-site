"use client";

import { useEffect, useMemo, useState } from "react";
import { Lock, Minus, Play, Plus } from "lucide-react";
import { VideoLightbox } from "@/components/shared/VideoLightbox";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { SyllabusSection, SyllabusTopic } from "@/data/syllabi";

type Props = {
  sections: SyllabusSection[];
  /** Topic id that should be expanded on first render. Defaults to first topic. */
  defaultOpenId?: string;
};

function TopicAccordion({
  topic,
  isOpen,
  onToggle,
  onPreview,
  onLocked,
}: {
  topic: SyllabusTopic;
  isOpen: boolean;
  onToggle: () => void;
  onPreview: (src: string, title: string) => void;
  onLocked: () => void;
}) {
  const previewCount = topic.lessons.filter((l) => l.videoSrc).length;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-all duration-200",
        isOpen
          ? "border-gold-500/50 bg-white shadow-card-rest"
          : "border-gray-200 bg-white hover:border-gold-500/30"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span className="flex items-center gap-3 sm:gap-4">
          <span
            aria-hidden
            className={cn(
              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
              isOpen ? "bg-gold-500 text-white" : "bg-navy-900 text-white"
            )}
          >
            {isOpen ? (
              <Minus className="h-4 w-4" strokeWidth={2.5} />
            ) : (
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            )}
          </span>
          <span className="font-fraunces text-base font-semibold leading-tight text-navy-900 sm:text-lg">
            {topic.title}
          </span>
        </span>
        <span className="hidden shrink-0 items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 sm:flex">
          <span>{topic.lessons.length} lessons</span>
          {previewCount > 0 && (
            <span className="rounded-full bg-gold-500/20 px-2 py-0.5 text-navy-900">
              {previewCount} free
            </span>
          )}
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-gray-100">
          {topic.lessons.map((lesson, i) => {
            const isPreview = !!lesson.videoSrc;
            return (
              <div
                key={i}
                className={cn(
                  "flex items-center justify-between gap-3 px-5 py-3.5 transition-colors sm:px-6",
                  isPreview ? "bg-cream-50" : "bg-white hover:bg-gray-50",
                  i !== topic.lessons.length - 1 && "border-b border-gray-100"
                )}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Play
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isPreview ? "text-navy-900" : "text-gray-400"
                    )}
                    strokeWidth={2}
                  />
                  <span className="truncate font-inter text-sm font-medium text-navy-900">
                    {lesson.title}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3 sm:gap-4">
                  <span
                    className={cn(
                      "font-inter text-xs font-medium tabular-nums",
                      isPreview ? "text-navy-900/70" : "text-gray-500"
                    )}
                  >
                    {lesson.duration}
                  </span>
                  {isPreview ? (
                    <button
                      type="button"
                      onClick={() =>
                        onPreview(lesson.videoSrc!, lesson.title)
                      }
                      className="inline-flex items-center gap-1.5 rounded-full border border-gold-500 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy-900 transition-all hover:bg-gold-500 hover:text-white"
                    >
                      Preview
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onLocked}
                      aria-label={`${lesson.title} — unlock on Orbed`}
                      title="Unlock on Orbed"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all hover:bg-gold-500 hover:text-white"
                    >
                      <Lock className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                  )}
                </span>
              </div>
            );
          })}

          <a
            href={SITE.orbedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 border-t border-gray-100 bg-navy-900 px-5 py-3.5 font-inter text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-navy-700 sm:px-6"
          >
            <span>Unlock the full topic on Orbed</span>
            <span aria-hidden className="text-gold-500">
              →
            </span>
          </a>
        </div>
      )}
    </div>
  );
}

export function SyllabusGrid({ sections, defaultOpenId }: Props) {
  const allTopics = useMemo(
    () => sections.flatMap((s) => s.topics),
    [sections]
  );

  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId ?? allTopics[0]?.id ?? null
  );
  const [activeVideo, setActiveVideo] = useState<{
    src: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    setOpenId(defaultOpenId ?? allTopics[0]?.id ?? null);
  }, [sections, defaultOpenId, allTopics]);

  const goToOrbed = () => {
    if (typeof window !== "undefined") {
      window.open(SITE.orbedUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <div className="space-y-10">
        {sections.map((section) => {
          const sectionLessons = section.topics.reduce(
            (n, t) => n + t.lessons.length,
            0
          );
          const sectionPreviews = section.topics.reduce(
            (n, t) => n + t.lessons.filter((l) => l.videoSrc).length,
            0
          );

          return (
            <div key={section.id}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-gold-500/25 pb-3">
                <h3 className="font-fraunces text-[22px] font-semibold text-navy-900 sm:text-[26px]">
                  {section.title}
                </h3>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                  {section.topics.length}{" "}
                  {section.topics.length === 1 ? "topic" : "topics"} ·{" "}
                  {sectionLessons} lessons
                  {sectionPreviews > 0 && (
                    <span className="ml-2 text-navy-900">
                      · {sectionPreviews} free preview
                      {sectionPreviews === 1 ? "" : "s"}
                    </span>
                  )}
                </p>
              </div>

              <div className="space-y-4">
                {section.topics.map((topic) => (
                  <TopicAccordion
                    key={topic.id}
                    topic={topic}
                    isOpen={openId === topic.id}
                    onToggle={() =>
                      setOpenId(openId === topic.id ? null : topic.id)
                    }
                    onPreview={(src, title) =>
                      setActiveVideo({ src, title })
                    }
                    onLocked={goToOrbed}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <VideoLightbox
        open={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.src ?? ""}
        title={activeVideo?.title ?? "Sample lecture preview"}
      />
    </>
  );
}
