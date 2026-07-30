"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles, Award } from "lucide-react";
import { AmbientOrbs } from "@/components/shared/AmbientOrbs";
import { Logo3D } from "@/components/shared/Logo3D";
import { SITE } from "@/lib/constants";
import { EASE_OUT } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

const paragraphs = [
  "For over 13 years, I've been teaching O Level and A Level Accounting to students in Karachi and across Pakistan. As one of the experienced O & A Level Accounting tutors, I've worked with students with different learning goals. My focus has always been to help them understand Accounting in a way that actually makes sense.",
  "I've always believed there's no point in memorizing answers if the students don't understand the idea behind them. That's why I focus on explaining concepts first. Once the basics are clear, students usually find it much easier to solve questions and tackle past papers with confidence.",
  "My classes are practical and easy to follow. We learn each topic step by step, solve questions together, and spend plenty of time practicing exam-style questions. The goal isn't just to prepare for the next paper, it's to make sure you understand what you're doing and why.",
];

export function AboutHero() {
  const reduce = useReducedMotion();

  const wrap = reduce
    ? {}
    : { variants: container, initial: "hidden" as const, animate: "visible" as const };
  const child = reduce ? {} : { variants: item };

  const float = (delay: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -12, 0] },
          transition: {
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <AmbientOrbs variant="dark" />
      {/* soft mesh glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full bg-navy-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="container-x relative grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        {/* Copy */}
        <motion.div {...wrap} className="relative max-w-xl">
          <motion.span
            {...child}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-500 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            About Sir Shehroz
          </motion.span>

          <motion.h1
            {...child}
            className="mt-5 font-fraunces text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]"
          >
            Shehroz Iqbal
            <span className="mt-4 block font-inter text-[15px] font-medium not-italic leading-snug tracking-wide text-white/65 sm:text-base">
              Accounting tutor · Karachi &amp; online · Cambridge (CAIE) &amp; Edexcel
            </span>
          </motion.h1>

          <div className="mt-6 space-y-3.5 text-[15px] leading-[1.75] text-white/80">
            {paragraphs.map((p, i) => (
              <motion.p key={i} {...child}>
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div {...child} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/courses/as-level" className="btn-primary text-sm">
              Explore my courses
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <a
              href={SITE.orbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/25 bg-white/5 px-6 py-3 font-inter text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/15"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              Contact on Orb-Ed
            </a>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.94, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative rounded-[28px] bg-gradient-to-br from-gold-500/40 via-white/10 to-navy-500/40 p-[1.5px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-navy-700">
              <Image
                src="/images/aboutpage2.webp"
                alt="Sir Shehroz Iqbal, CAIE and Edexcel Accounting tutor"
                width={2832}
                height={4240}
                priority
                loading="eager"
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent"
              />
            </div>
          </div>

          {/* Floating 3D brand logo */}
          <div className="absolute -left-4 -top-6 z-20 hidden sm:block lg:-left-8 lg:-top-8">
            <div className="rounded-[26px] border border-white/15 bg-white/10 p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-md">
              <Logo3D className="h-24 w-24 lg:h-32 lg:w-32" />
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            {...float(0.6)}
            className="absolute -right-3 bottom-10 hidden items-center gap-3 rounded-2xl border border-white/15 bg-white/95 px-4 py-3 shadow-card-hover backdrop-blur-md sm:flex"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
              <Award className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <p className="font-space text-lg font-bold leading-none text-navy-900">
                13+ yrs
              </p>
              <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider2 text-gray-500">
                Teaching
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
