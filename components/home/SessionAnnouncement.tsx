"use client";

import Image from "next/image";
import { ArrowRight, BookOpen, FileText, PlayCircle } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import RotatingText from "@/components/shared/RotatingText";
import { trackEvent } from "@/lib/analytics";
import { CTA_LABELS, SITE } from "@/lib/constants";
import { REGISTRATION_BANNER } from "@/lib/marketingImages";

const SESSION_ROTATING_TEXTS = [
  "live now",
  "open for enrolment",
  "accepting students",
  "ready to enrol",
] as const;

const SESSION_HEADLINE_MEASURE = "open for enrolment on Orb-Ed";

const highlights = [
  {
    icon: PlayCircle,
    title: "Recorded lectures",
    desc: "Watch every lesson anytime with unlimited access to HD recordings.",
  },
  {
    icon: FileText,
    title: "Past papers",
    desc: "Topical and yearly past papers supported by detailed solutions.",
  },
  {
    icon: BookOpen,
    title: "Study resources",
    desc: "Well-organized notes and learning material designed to support every chapter.",
  },
];

export function SessionAnnouncement() {
  return (
    <AnimateSection
      direction="fade"
      className="relative isolate overflow-hidden bg-navy-900 text-white"
    >
      <div aria-hidden className="absolute inset-0 bg-grid-overlay" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-navy-500/30 blur-3xl"
      />

      <div className="container-x relative py-14 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Left — copy */}
          <div className="min-w-0">
            <span className="pill-gold-outline-dark inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold-500 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-gold-500" />
              </span>
              Oct/Nov Session 2026 · Live Now
            </span>

            <h2 className="mt-4 font-fraunces text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[3rem] sm:leading-[1.05] lg:text-[3.5rem]">
              <span className="block">Oct/Nov Session 2026 is</span>
              <span className="relative mt-0.5 inline-grid max-w-full align-top">
                <span
                  className="invisible col-start-1 row-start-1 italic text-gold-500"
                  aria-hidden
                >
                  <span className="sm:hidden">{SESSION_HEADLINE_MEASURE.replace(" on Orb-Ed", "")}</span>
                  <span className="hidden sm:inline">{SESSION_HEADLINE_MEASURE}</span>
                </span>
                <span className="col-start-1 row-start-1">
                  <RotatingText
                    texts={[...SESSION_ROTATING_TEXTS]}
                    splitBy="words"
                    rotationInterval={2500}
                    staggerFrom="last"
                    staggerDuration={0.03}
                    mainClassName="inline-flex italic text-gold-500"
                    splitLevelClassName="overflow-hidden pb-0.5"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-120%", opacity: 0 }}
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  />
                  <span className="hidden sm:inline"> on Orb-Ed</span>
                </span>
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-[14px] leading-[1.6] text-white/85 sm:mt-6 sm:text-[17px] sm:leading-[1.7]">
              Enroll in O Level &amp; A Level Accounting and learn with one of
              the best O Level Accounts teachers in Karachi, Sir Shehroz Iqbal.
              Benefit from a structured learning experience that combines expert
              guidance, flexible learning, and complete exam preparation to
              score an A*.
            </p>

            <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-1">
              {highlights.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-500">
                    <item.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-inter text-[15px] font-semibold text-white">
                      {item.title}
                    </span>
                    <span className="block text-[13px] leading-snug text-white/65">
                      {item.desc}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-2 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={SITE.orbedDashboard}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("orbed_click", {
                    location: "home_session_announcement",
                  })
                }
                className="btn-primary w-full shrink-0 justify-center whitespace-nowrap text-base sm:w-auto"
              >
                {CTA_LABELS.orbEdRegister}
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
              </a>
              <p className="text-xs text-white/55 sm:text-[13px]">
                O Level &amp; A Level Accounting · Recorded + live ·{" "}
                <a href="/#orbed-guide" className="text-gold-500 transition-colors hover:text-white">
                  First time on Orb-Ed?
                </a>
              </p>
            </div>
          </div>

          {/* Right — registration visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[300px] sm:max-w-[360px]">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-gold-500/25 via-transparent to-navy-500/30 blur-2xl"
              />
              <figure className="group relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-navy-800/50 p-1.5 shadow-2xl shadow-navy-950/50 ring-1 ring-white/10 sm:rounded-[2rem] sm:p-2">
                <div className="relative overflow-hidden rounded-[1.35rem] sm:rounded-[1.65rem]">
                  <Image
                    src={REGISTRATION_BANNER.src}
                    alt={REGISTRATION_BANNER.alt}
                    width={REGISTRATION_BANNER.width}
                    height={REGISTRATION_BANNER.height}
                    sizes="(max-width: 1024px) 85vw, 360px"
                    className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.02]"
                    priority
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/35 via-transparent to-transparent"
                  />
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </AnimateSection>
  );
}
