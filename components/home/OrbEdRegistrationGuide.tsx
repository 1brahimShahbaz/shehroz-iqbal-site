import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { OrbEdGuideDetails } from "@/components/home/OrbEdGuideDetails";
import {
  CTA_LABELS,
  ORBED_REGISTRATION_COURSES,
  SITE,
} from "@/lib/constants";

const GUIDE_TITLE = "Need help in registering on Orb-Ed?";

const STEPS = [
  {
    title: "Open Orb-Ed",
    body: (
      <>
        Click{" "}
        <strong className="font-semibold text-navy-900">Register on Orb-Ed</strong>{" "}
        anywhere on this site. You&apos;ll be taken to the{" "}
        <a
          href={SITE.orbedDashboard}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-navy-700 underline decoration-gold-500/60 underline-offset-2 hover:text-navy-500"
        >
          Orb-Ed student dashboard
        </a>
        .
      </>
    ),
  },
  {
    title: "Log in or sign up",
    body: "Already have an Orb-Ed account? Log in. New to Orb-Ed? Create a free account — it only takes a minute.",
  },
  {
    title: "Choose your level",
    body: "From the dashboard, open Subjects, then pick your level: O Level, AS Level, or A2 Level.",
  },
  {
    title: "Select your course",
    body: "Find and enrol in the course that matches your level (see the exact names below).",
  },
] as const;

export function OrbEdRegistrationGuide() {
  return (
    <AnimateSection
      id="orbed-guide"
      index={0}
      className="scroll-mt-24 bg-cream-50 py-8 lg:py-10"
    >
      <div className="container-x">
        <OrbEdGuideDetails>
          <summary className="relative flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 sm:px-5 sm:py-4 [&::-webkit-details-marker]:hidden">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-navy-900 via-gold-500 to-navy-900 opacity-0 transition-opacity duration-300 group-open:opacity-100"
            />

            <span className="flex min-w-0 items-center gap-3 sm:gap-3.5">
              <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900/5 ring-1 ring-navy-900/10 transition-colors duration-300 group-open:bg-gold-500/15 group-open:ring-gold-500/30 sm:h-10 sm:w-10">
                <Image
                  src="/images/orbed.webp"
                  alt="Orb-Ed learning platform"
                  width={22}
                  height={22}
                  className="h-[18px] w-[18px] object-contain opacity-90 sm:h-5 sm:w-5"
                />
              </span>
              <span className="font-inter text-[14px] font-medium leading-snug text-navy-900 whitespace-nowrap sm:text-[15px]">
                {GUIDE_TITLE}
              </span>
            </span>

            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-50 text-navy-900 ring-1 ring-gray-200/80 transition-colors duration-300 group-open:bg-gold-500/15 group-open:ring-gold-500/30">
              <ChevronDown
                className="h-4 w-4 transition-transform duration-300 group-open:rotate-180"
                strokeWidth={2.25}
                aria-hidden
              />
            </span>
          </summary>

          <div className="border-t border-gray-100 bg-gradient-to-b from-cream-50/80 to-white px-4 pb-6 pt-4 sm:px-5 sm:pb-8 sm:pt-5">
            <p className="max-w-2xl text-[14px] leading-relaxed text-gray-500 sm:text-[15px]">
              Orb-Ed is Sir Shehroz&apos;s online learning platform for the Oct/Nov
              2026 session — recorded lectures, past papers, and resources.
              Follow these steps to enrol in a few minutes.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
              <ol className="space-y-4">
                {STEPS.map((step, i) => (
                  <li
                    key={step.title}
                    className="flex gap-4 rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-inter text-xs font-bold text-gold-500 sm:h-10 sm:w-10 sm:text-sm"
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="font-fraunces text-base font-semibold text-navy-900 sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-gray-500 sm:text-[15px]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="space-y-4">
                <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">
                    Step 4 — pick the right course
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {ORBED_REGISTRATION_COURSES.map((course) => (
                      <li
                        key={course.level}
                        className="rounded-lg bg-cream-50 px-3.5 py-3 ring-1 ring-gray-200/70"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-wider2 text-navy-700">
                          {course.level}
                        </p>
                        <p className="mt-1 font-inter text-[14px] font-semibold text-navy-900 sm:text-[15px]">
                          {course.name}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                          {course.batch}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-navy-900 p-5 text-white sm:p-6">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-500/10 blur-2xl"
                  />
                  <div className="relative flex items-start gap-3">
                    <HelpCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-gold-500"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <div>
                      <p className="font-fraunces text-lg font-semibold">
                        Still stuck?
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                        Message us on WhatsApp and we&apos;ll walk you through
                        enrolment — or leave your details and we&apos;ll get back
                        to you.
                      </p>
                    </div>
                  </div>
                  <div className="relative mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    <a
                      href={SITE.orbedDashboard}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary justify-center px-5 py-2.5 text-[13px] sm:text-[14px]"
                    >
                      {CTA_LABELS.orbEdRegister}
                      <ExternalLink className="h-4 w-4" strokeWidth={2} />
                    </a>
                    <Link
                      href="/register"
                      className="btn-outline-white justify-center px-5 py-2.5 text-[13px] sm:text-[14px]"
                    >
                      {CTA_LABELS.enrollInterest}
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OrbEdGuideDetails>
      </div>
    </AnimateSection>
  );
}
