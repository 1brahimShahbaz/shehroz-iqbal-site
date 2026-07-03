"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

export function SirShehrozTagline() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="mx-auto max-w-3xl"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-gold-500/20 bg-white px-8 py-12 shadow-card-rest sm:px-14 sm:py-16">
        {/* Oversized decorative quote mark */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-2 -top-6 select-none font-fraunces text-[160px] leading-none text-gold-500/10 sm:text-[220px]"
        >
          &ldquo;
        </span>
        {/* Soft corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/5 blur-2xl"
        />

        <div className="relative text-center">
          <blockquote>
            <p className="font-fraunces text-[26px] font-medium italic leading-[1.25] tracking-[-0.02em] text-navy-900 sm:text-[36px] lg:text-[42px]">
              There is no such thing as luck.
            </p>
            <p className="mt-2 font-fraunces text-[26px] font-semibold italic leading-[1.25] tracking-[-0.02em] text-gold-500 sm:text-[36px] lg:text-[42px]">
              Believe in hard work.
            </p>
          </blockquote>

          <div className="mx-auto mt-10 flex max-w-xs items-center gap-4">
            <span
              aria-hidden
              className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/50"
            />
            <cite className="font-space text-[12px] font-semibold uppercase tracking-[0.28em] text-navy-900/60 not-italic">
              Sir Shehroz Iqbal
            </cite>
            <span
              aria-hidden
              className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/50"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
