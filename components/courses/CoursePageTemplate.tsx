"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { CourseAtAGlance } from "./CourseAtAGlance";
import { SyllabusGrid } from "./SyllabusGrid";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { RegistrationBanner } from "@/components/home/RegistrationBanner";
import type { CourseContent } from "@/data/courses";
import { syllabusByLevel } from "@/data/syllabi";
import { SITE, CTA_LABELS } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

/** Renders `**phrase**` segments as bold text. */
function RichText({
  text,
  strongClassName = "font-semibold text-navy-900",
}: {
  text: string;
  strongClassName?: string;
}) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={strongClassName}>
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

export function CoursePageTemplate({
  course,
}: {
  course: CourseContent;
}) {
  const sections = syllabusByLevel[course.level];

  return (
    <>
      <AnimateSection
        index={0}
        direction="right"
        instant
        className="relative isolate overflow-hidden bg-navy-900 text-white"
      >
        <div className="grid min-h-[60vh] grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative flex items-center px-6 py-16 sm:px-10 lg:py-24 lg:pl-16">
            <div className="max-w-xl">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-1.5 text-[13px] text-white/60"
              >
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                <Link href="/courses/as-level-accounting-course" className="hover:text-white">
                  Courses
                </Link>
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                <span className="text-white">{course.badgeLabel}</span>
              </nav>
              <span className="mt-5 inline-flex items-center rounded-full bg-gold-500 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider2 text-white">
                {course.badgeLabel} · {course.badgeSubLabel}
              </span>
              <h1 className="mt-5 font-fraunces text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]">
                {course.headline}{" "}
                <span className="italic text-gold-500">Sir Shehroz Iqbal.</span>
              </h1>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/80">
                <RichText
                  text={course.subhead}
                  strongClassName="font-semibold text-white"
                />
              </p>
              <a
                href={SITE.orbedDashboard}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("orbed_click", {
                    location: `course_${course.slug}_hero`,
                  })
                }
                className="btn-primary mt-8 inline-flex items-center gap-2"
              >
                {CTA_LABELS.orbEdRegister}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
          <div className="relative min-h-[280px]">
            <Image
              src={course.heroImage}
              alt={`${course.badgeLabel} Accounting with Sir Shehroz Iqbal — CAIE tutor`}
              width={1400}
              height={933}
              priority
              loading="eager"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </AnimateSection>

      <RegistrationBanner
        title={course.ctaTitle}
        subtitle={course.ctaSubhead}
        badge="Registrations Open"
        source={`course_${course.slug}_banner`}
        registerHref={SITE.orbedDashboard}
      />

      <CourseAtAGlance
        syllabus={course.syllabus}
        duration={course.duration}
        format={course.format}
        start={course.start}
      />

      <AnimateSection index={2} className="bg-cream-50 py-20 lg:py-24">
        <div className="container-x">
          <div className="max-w-2xl">
            <SectionEyebrow>Course Syllabus</SectionEyebrow>
            <h2 className="mt-3 font-fraunces text-[32px] font-semibold leading-tight text-navy-900 sm:text-[40px]">
              {course.syllabusHeading ?? "Try a lecture before you register."}
            </h2>
            <p className="mt-3 text-[16px] text-gray-500">
              {course.syllabusIntro ? (
                <RichText text={course.syllabusIntro} />
              ) : (
                <>
                  Free {course.badgeLabel} ({course.syllabus}) lessons are
                  available below to help you explore the course before
                  enrolling. The complete course is available on Orb-Ed.
                </>
              )}
            </p>
          </div>
          <div className="mt-12">
            <SyllabusGrid sections={sections} />
          </div>
        </div>
      </AnimateSection>

      {course.infoSections.map((info, i) => (
        <AnimateSection
          key={info.heading}
          index={3 + i}
          className={`${i % 2 === 0 ? "bg-grid-white" : "bg-cream-50"} py-16 lg:py-20`}
        >
          <div className="container-x">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
              <div>
                {info.eyebrow && <SectionEyebrow>{info.eyebrow}</SectionEyebrow>}
                <h2
                  className={`${info.eyebrow ? "mt-3 " : ""}font-fraunces text-[28px] font-semibold leading-tight text-navy-900 sm:text-[36px]`}
                >
                  {info.heading}
                </h2>
              </div>
              <p className="text-[16px] leading-relaxed text-gray-500 lg:pt-8 lg:text-[17px]">
                <RichText text={info.body} />
              </p>
            </div>
          </div>
        </AnimateSection>
      ))}
    </>
  );
}
