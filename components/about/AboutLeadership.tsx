"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

export function AboutLeadership() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-cream-50 py-16 lg:py-24">
      <div className="container-x">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 32 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="relative isolate overflow-hidden rounded-[32px] bg-navy-900 shadow-[0_40px_100px_-40px_rgba(10,39,64,0.65)]"
        >
          {/* grid + brand glows */}
          <div aria-hidden className="absolute inset-0 bg-grid-overlay opacity-50" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-navy-500/40 blur-3xl"
          />

          <div className="relative grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-[1fr_0.92fr] lg:gap-16 lg:p-16">
            {/* Copy */}
            <div>
              <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-500">
                <span aria-hidden className="h-px w-8 bg-gold-500/60" />
                Beyond the classroom
              </span>

              <h2 className="mt-5 font-fraunces text-[30px] font-semibold leading-[1.1] tracking-[-0.01em] text-white sm:text-[40px] lg:text-[46px]">
                Co-Founder at{" "}
                <span className="italic text-gold-500">
                  Alpha Education Network.
                </span>
              </h2>

              <p className="mt-5 max-w-xl font-inter text-[15px] leading-[1.8] text-white/75 sm:text-[16px]">
                Teaching is only part of the story. Sir Shehroz Iqbal co-founded
                Alpha Education Network to bring the same concept-first,
                exam-focused learning he&apos;s known for to students right
                across Pakistan.
              </p>
            </div>

            {/* Logo card */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* static glow halo */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-tr from-gold-500/25 via-transparent to-navy-500/35 blur-2xl"
                />

                {/* gradient border */}
                <div className="rounded-[28px] bg-gradient-to-br from-gold-500/70 via-white/25 to-navy-500/60 p-[1.5px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
                  <div className="relative overflow-hidden rounded-[26px] bg-white p-10 sm:p-12">
                    <Image
                      src="/images/aen-logo-black.webp"
                      alt="Alpha Education Network — co-founded by Sir Shehroz Iqbal"
                      width={1640}
                      height={541}
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      className="relative z-10 h-auto w-full"
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
