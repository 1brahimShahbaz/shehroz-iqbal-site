"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AmbientOrbs } from "@/components/shared/AmbientOrbs";
import { trackEvent } from "@/lib/analytics";
import { SITE, CTA_LABELS } from "@/lib/constants";

export function HeroSlider() {
  return (
    <AnimateSection
      direction="fade"
      instant
      className="relative isolate w-full overflow-hidden bg-navy-900 text-white"
    >
      <AmbientOrbs variant="dark" />
      {/* soft mesh glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full bg-navy-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="container-x relative grid grid-cols-1 items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        {/* Copy */}
        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-500 backdrop-blur-sm">
            Cambridge (CAIE) Accounting
          </span>

          <h1 className="mt-5 font-fraunces text-[38px] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]">
            Best O Level Accounts Teacher in Karachi.{" "}
            <span className="italic text-gold-500">Achieve A* Results.</span>
          </h1>

          <p className="mt-6 max-w-lg text-[16px] leading-[1.8] text-white/80 sm:text-[17px]">
            Prepare for success with one of the{" "}
            <span className="font-semibold text-white">
              best O Level Accounts teachers in Karachi
            </span>
            . Sir Shehroz Iqbal helps students build confidence, strengthen
            concepts, and achieve outstanding CAIE results.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={SITE.orbedDashboard}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("orbed_click", { location: "home_hero" })}
              className="btn-primary justify-center"
            >
              {CTA_LABELS.orbEdRegister}
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
            </a>
            <Link
              href="#sample-lectures"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-white/25 bg-white/5 px-7 py-3.5 font-inter text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/15"
            >
              <Play className="h-4 w-4 shrink-0" strokeWidth={2} fill="currentColor" />
              Sample lecture
            </Link>
          </div>

          {/* Trust row */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  aria-hidden
                  className="h-5 w-5 text-gold-500"
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>
            <p className="text-sm text-white/85">
              <span className="font-space font-bold text-white">10,000+</span>{" "}
              Students
            </p>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative rounded-[28px] bg-gradient-to-br from-gold-500/40 via-white/10 to-navy-500/40 p-[1.5px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-navy-700">
              <Image
                src="/images/aboutpage2.webp"
                alt="Sir Shehroz Iqbal — A Level & O Level Accounting tutor in Karachi"
                fill
                priority
                loading="eager"
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimateSection>
  );
}
