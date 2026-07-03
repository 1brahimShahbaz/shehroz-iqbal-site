"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Lightbulb, MessageCircle, Target } from "lucide-react";
import SpotlightCard from "@/components/shared/SpotlightCard";
import { EASE_OUT } from "@/lib/motion";

const SPOTLIGHT_LIGHT = "rgba(220, 38, 38, 0.12)";

const approachItems = [
  {
    icon: Lightbulb,
    title: "Core Principles First",
    body: "We don't just memorise entries — we understand the accounting principles behind them, so knowledge is deep, connected and lasting.",
  },
  {
    icon: Target,
    title: "Exam Technique",
    body: "Understanding is only half the battle. I drill students on structuring answers to capture every mark against the exact examiner rubric.",
  },
  {
    icon: MessageCircle,
    title: "Open Dialogue",
    body: "Questions are encouraged. I keep a patient, supportive space where students feel comfortable admitting what they don't yet understand.",
  },
] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export function AboutApproachCards() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={reduce ? undefined : container}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
    >
      {approachItems.map(({ icon: Icon, title, body }, i) => (
        <motion.div
          key={title}
          variants={reduce ? undefined : item}
          whileHover={reduce ? undefined : { y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <SpotlightCard
            spotlightColor={SPOTLIGHT_LIGHT}
            className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-card-rest"
          >
            <span
              aria-hidden
              className="absolute right-5 top-4 font-fraunces text-[64px] font-bold leading-none text-navy-900/[0.04]"
            >
              0{i + 1}
            </span>
            <div className="relative mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500 ring-1 ring-gold-500/15">
              <Icon className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h3 className="relative mt-6 font-fraunces text-[20px] font-semibold text-navy-900">
              {title}
            </h3>
            <p className="relative mx-auto mt-3 max-w-[270px] text-[15px] leading-relaxed text-gray-500">
              {body}
            </p>
          </SpotlightCard>
        </motion.div>
      ))}
    </motion.div>
  );
}
