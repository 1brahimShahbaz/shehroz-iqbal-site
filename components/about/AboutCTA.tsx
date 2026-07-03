"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE, CTA_LABELS } from "@/lib/constants";
import { EASE_OUT } from "@/lib/motion";

export function AboutCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="container-x pb-20 pt-4 lg:pb-28">
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 32 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="relative isolate overflow-hidden rounded-[32px] bg-navy-900 px-8 py-14 text-center shadow-[0_30px_80px_-32px_rgba(10,39,64,0.6)] sm:px-16 sm:py-20"
      >
        {/* decorative glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-navy-500/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid-overlay opacity-[0.35]"
        />

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
          Oct / Nov 2026 — Enrolment open
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-fraunces text-[30px] font-semibold leading-tight text-white sm:text-[42px]">
          Ready to turn Accounting into your best subject?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
          Join hundreds of students who moved from confusion to confident A and
          A* grades. Seats for each series are limited.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/register" className="btn-primary w-full justify-center sm:w-auto">
            {CTA_LABELS.enrollInterest}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <a
            href={SITE.orbedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-white/30 bg-white/5 px-7 py-3.5 font-inter text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/15 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            Ask a question
          </a>
        </div>
      </motion.div>
    </section>
  );
}
