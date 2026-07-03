"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Play, Star } from "lucide-react";
import { AmbientOrbs } from "@/components/shared/AmbientOrbs";
import { AnimateSection } from "@/components/shared/AnimateSection";
import RotatingText from "@/components/shared/RotatingText";
import { cn } from "@/lib/utils";
import { TEXT_REVEAL_CONTAINER, TEXT_REVEAL_ITEM } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";
import { SITE, CTA_LABELS } from "@/lib/constants";
import { HERO_BANNER_ASSETS } from "@/lib/heroBanners";

type Slide = {
  image: string;
  imageWidth: number;
  imageHeight: number;
  eyebrow: string;
  mobileTitle: string;
  mobileTagline?: string;
  headlineLead: string;
  headlineAccent: string;
  subhead: string;
  subheadShort: string;
  registerUrl: string;
  imageAlt: string;
  /** Optional rotating headline accent (desktop) */
  rotatingAccent?: string[];
};

const slides: Slide[] = [
  {
    image: HERO_BANNER_ASSETS[0].src,
    imageWidth: HERO_BANNER_ASSETS[0].width,
    imageHeight: HERO_BANNER_ASSETS[0].height,
    eyebrow: "Cambridge (CAIE) Accounting",
    mobileTitle: "A* results.",
    mobileTagline: "Master Accounting",
    headlineLead: "Master Accounting for",
    headlineAccent: "A* results.",
    rotatingAccent: ["A* results.", "9706 mastery.", "exam success.", "top grades."],
    subhead:
      "A Level & O Level Accounting tuition in Karachi and online across Pakistan. Achieve the results you deserve.",
    subheadShort: "A Level & O Level Accounting tuition in Karachi & online.",
    registerUrl: SITE.orbedDashboard,
    imageAlt:
      "Sir Shehroz Iqbal, CAIE Accounting tutor for AS, A2 and O Level",
  },
  {
    image: HERO_BANNER_ASSETS[1].src,
    imageWidth: HERO_BANNER_ASSETS[1].width,
    imageHeight: HERO_BANNER_ASSETS[1].height,
    eyebrow: "Concept-first · Exam-focused",
    mobileTitle: "A* mastery.",
    mobileTagline: "From foundations up",
    headlineLead: "From foundations to",
    headlineAccent: "A* mastery.",
    subhead:
      "13+ years teaching CAIE 9706 and O Level 7707. Helping students across Pakistan and beyond achieve top grades.",
    subheadShort: "13+ years · 9706 & 7707 · Karachi & online.",
    registerUrl: SITE.orbedDashboard,
    imageAlt:
      "A Level Accounting exam preparation with Sir Shehroz Iqbal, CAIE tutor",
  },
  {
    image: HERO_BANNER_ASSETS[2].src,
    imageWidth: HERO_BANNER_ASSETS[2].width,
    imageHeight: HERO_BANNER_ASSETS[2].height,
    eyebrow: "Oct/Nov 2026 — Open",
    mobileTitle: "Live classes",
    mobileTagline: "Recorded + feedback",
    headlineLead: "Live + recorded classes,",
    headlineAccent: "personalised feedback.",
    subhead:
      "Weekly past-paper marking, 24/7 WhatsApp doubt support. Built for serious students.",
    subheadShort: "Marking, recordings & WhatsApp support for serious students.",
    registerUrl: SITE.orbedDashboard,
    imageAlt:
      "Live CAIE Accounting online classes with Sir Shehroz Iqbal",
  },
];

const heroTitleClass =
  "mt-2 font-fraunces text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.02em] text-white sm:mt-5 sm:text-[3.5rem] sm:leading-[1.05] lg:text-[4.25rem]";

function SlideCopy({
  slide,
  index,
  isActive,
  TitleTag,
}: {
  slide: Slide;
  index: number;
  isActive: boolean;
  TitleTag: "h1" | "h2";
}) {
  const reduce = useReducedMotion();

  const eyebrow = (
    <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-gold-500 sm:text-[12px] sm:tracking-[0.18em]">
      {slide.eyebrow}
    </span>
  );

  const tagline = slide.mobileTagline ? (
    <p className="mt-2 font-inter text-[13px] font-medium leading-snug text-white/75 sm:hidden">
      {slide.mobileTagline}
    </p>
  ) : null;

  const accent = slide.rotatingAccent ? (
    <RotatingText
      texts={slide.rotatingAccent}
      splitBy="words"
      rotationInterval={2600}
      staggerFrom="last"
      staggerDuration={0.035}
      mainClassName="inline-flex italic text-gold-500"
      splitLevelClassName="overflow-hidden pb-0.5"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-120%", opacity: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 400 }}
    />
  ) : (
    <span className="italic">{slide.headlineAccent}</span>
  );

  const title = (
    <TitleTag className={heroTitleClass}>
      <span className="sm:hidden">{slide.mobileTitle}</span>
      <span className="hidden sm:inline">
        {slide.headlineLead} {accent}
      </span>
      {index === 0 ? (
        <span className="sr-only">
          {" "}
          — Best A Level Accounting Tutor in Karachi, Pakistan
        </span>
      ) : null}
    </TitleTag>
  );

  const subhead = (
    <p className="mt-2.5 text-[13px] leading-[1.45] text-white/85 sm:mt-6 sm:text-base sm:leading-[1.7]">
      <span className="sm:hidden">{slide.subheadShort}</span>
      <span className="hidden sm:inline">{slide.subhead}</span>
    </p>
  );

  if (reduce || !isActive) {
    return (
      <div>
        {eyebrow}
        {tagline}
        {title}
        {subhead}
      </div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={TEXT_REVEAL_CONTAINER}>
      <motion.div variants={TEXT_REVEAL_ITEM}>{eyebrow}</motion.div>
      {tagline ? <motion.div variants={TEXT_REVEAL_ITEM}>{tagline}</motion.div> : null}
      <motion.div variants={TEXT_REVEAL_ITEM}>{title}</motion.div>
      <motion.div variants={TEXT_REVEAL_ITEM}>{subhead}</motion.div>
    </motion.div>
  );
}

function SlidePanel({
  slide,
  index,
  isActive,
}: {
  slide: Slide;
  index: number;
  isActive: boolean;
}) {
  const TitleTag = isActive ? "h1" : "h2";

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col sm:relative sm:block sm:h-full sm:min-h-[inherit]">
      {/* Mobile image strip */}
      <div className="relative h-[min(42vw,220px)] w-full shrink-0 sm:hidden">
        <Image
          src={slide.image}
          alt={slide.imageAlt}
          width={slide.imageWidth}
          height={slide.imageHeight}
          priority={index === 0}
          loading="eager"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-navy-900/20 via-transparent to-navy-900"
        />
      </div>

      {/* Desktop background */}
      <div className="absolute inset-0 hidden sm:block">
        <Image
          src={slide.image}
          alt={slide.imageAlt}
          width={slide.imageWidth}
          height={slide.imageHeight}
          priority={index === 0}
          loading="eager"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="absolute inset-0 h-full w-full object-cover object-[100%_50%] lg:object-[88%_36%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/75 to-navy-900/25 lg:via-navy-900/60 lg:to-navy-900/10"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-transparent to-navy-900/50"
        />
      </div>

      {/* Copy */}
      <div className="relative z-10 w-full min-w-0 max-w-full bg-navy-900 sm:absolute sm:inset-0 sm:flex sm:items-center sm:bg-transparent sm:pt-20 lg:pt-24">
        <div className="mx-auto w-full min-w-0 max-w-[1280px] px-5 pb-6 pt-4 sm:px-8 sm:py-8 lg:px-12">
          <div className="min-w-0 max-w-full sm:max-w-[640px]">
            <SlideCopy
              slide={slide}
              index={index}
              isActive={isActive}
              TitleTag={TitleTag}
            />

            <div className="mt-4 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
              <a
                href={slide.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("orbed_click", {
                    location: `home_hero_slide_${index}`,
                  })
                }
                className="btn-primary w-full justify-center px-5 py-2.5 text-[13px] sm:w-auto sm:px-7 sm:py-3.5 sm:text-base"
              >
                {CTA_LABELS.orbEdRegister}
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
              </a>
              <Link
                href="#sample-lectures"
                className={cn(
                  "inline-flex w-auto max-w-full items-center justify-center gap-1.5 self-start rounded-full border border-white/35 px-4 py-2 font-inter text-[12px] font-semibold text-white transition-colors hover:bg-white/10",
                  "sm:gap-2 sm:border-[1.5px] sm:border-white/80 sm:bg-transparent sm:px-7 sm:py-3.5 sm:text-base sm:hover:bg-white sm:hover:text-navy-900"
                )}
              >
                <Play className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} fill="currentColor" />
                Sample lecture
              </Link>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[11px] text-white/70 sm:mt-8 sm:text-sm">
              <span className="flex shrink-0 gap-0.5 text-gold-500">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star
                    key={n}
                    className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                    strokeWidth={0}
                    fill="currentColor"
                  />
                ))}
              </span>
              <span>10,000+ students</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30, align: "start" },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () =>
      startTransition(() =>
        setSelectedIndex(emblaApi.selectedScrollSnap())
      );
    const onResize = () => emblaApi.reInit();
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("resize", onResize);
    window.addEventListener("resize", onResize);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("resize", onResize);
      window.removeEventListener("resize", onResize);
    };
  }, [emblaApi]);

  return (
    <AnimateSection
      direction="fade"
      instant
      className="relative -mt-20 w-full min-w-0 max-w-full overflow-x-clip bg-navy-900 pt-20 text-white sm:pt-0 lg:-mt-24"
    >
      <AmbientOrbs variant="dark" />
      <div className="hero-embla__viewport relative z-[1]" ref={emblaRef}>
        <div className="hero-embla__container">
          {slides.map((s, i) => (
            <div key={i} className="hero-embla__slide">
              <SlidePanel slide={s} index={i} isActive={selectedIndex === i} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 bg-navy-900 px-4 py-3 sm:absolute sm:bottom-8 sm:left-1/2 sm:z-20 sm:-translate-x-1/2 sm:bg-transparent sm:py-0">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() =>
              startTransition(() => emblaApi?.scrollTo(i))
            }
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              selectedIndex === i
                ? "w-8 bg-gold-500"
                : "w-5 bg-white/30 hover:bg-white/50"
            )}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-6 right-6 z-20 hidden gap-2 sm:pointer-events-auto sm:flex">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={scrollPrev}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/15"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={scrollNext}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/15"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </AnimateSection>
  );
}
