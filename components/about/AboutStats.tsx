"use client";

import CountUp from "react-countup";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, CalendarClock } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

type Stat = {
  icon: typeof GraduationCap;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  separator?: string;
};

const stats: Stat[] = [
  { icon: GraduationCap, value: 10000, suffix: "+", label: "Students taught", separator: "," },
  { icon: CalendarClock, value: 13, suffix: "+", label: "Years teaching", separator: "" },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export function AboutStats() {
  const reduce = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <div ref={ref} className="container-x">
      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        whileInView={reduce ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-gray-200 bg-gray-200/70 shadow-card-rest"
      >
        {stats.map(({ icon: Icon, value, suffix, label, separator }) => (
          <motion.div
            key={label}
            variants={reduce ? undefined : item}
            className="group flex flex-col items-center gap-3 bg-white px-6 py-10 text-center transition-colors duration-300 hover:bg-cream-50"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500 transition-transform duration-300 ease-smooth group-hover:-translate-y-1">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <div className="flex items-baseline font-space text-[40px] font-bold leading-none text-navy-900 tabular-nums sm:text-[48px]">
              {reduce || !inView ? (
                value.toLocaleString("en-US")
              ) : (
                <CountUp end={value} duration={2} separator={separator} useEasing preserveValue />
              )}
              {suffix ? <span className="text-gold-500">{suffix}</span> : null}
            </div>
            <p className="text-[12px] font-semibold uppercase tracking-wider2 text-gray-500">
              {label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
