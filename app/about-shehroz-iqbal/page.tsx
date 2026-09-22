import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutEcosystem } from "@/components/about/AboutEcosystem";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { AboutInfoPanels } from "@/components/about/AboutInfoPanels";
import { AboutCTA } from "@/components/about/AboutCTA";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Sir Shehroz Iqbal | Accounting Tutor, Karachi",
  titleAbsolute: true,
  description:
    "Meet Sir Shehroz Iqbal, an Accounting tutor with 13+ years teaching O & A Level students in Karachi and online. Read his story and teaching approach.",
  path: "/about",
});

const qualifications = [
  "Cambridge International AS & A Level Accounting (9706)",
  "Cambridge O Level Accounting (7707)",
  "Financial accounting, cost & management accounting",
  "Structured questions, data response & MCQ technique",
];

const offerings = [
  "Live online classes with recorded backups",
  "Full syllabus notes and past-paper practice",
  "Sample lectures and recorded topic walkthroughs",
  "WhatsApp doubt support between sessions",
  "Registration for Oct/Nov 2026 via Orb-Ed LMS",
];

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* Stats — a white card overlapping the hero */}
      <section className="relative z-20 -mt-10 sm:-mt-14">
        <AboutStats />
      </section>

      {/* Background / story */}
      <AnimateSection index={1} className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionEyebrow>Background</SectionEyebrow>
              <h2 className="mt-3 font-fraunces text-[28px] font-semibold leading-tight text-navy-900 sm:text-[34px]">
                Teaching Accounting is what I do — and what I love.
              </h2>
              <p className="mt-6 font-fraunces text-[18px] font-medium italic leading-snug text-navy-900 sm:text-[20px]">
                Teaching Accounting isn&apos;t just my profession, it&apos;s
                something I genuinely enjoy.
              </p>
              <div className="mt-5 space-y-4 font-inter text-[15px] leading-[1.75] text-gray-600">
                <p>
                  I&apos;m based at {SITE.address}, where I teach Accounting to
                  students in the classroom and online. If you&apos;re looking
                  for an online O Levels Accounting tutor in Karachi, my live
                  classes make it easy to learn from anywhere. You&apos;ll
                  receive the same support as students attending in person.
                </p>
                <p>
                  Over the years, I&apos;ve helped students work through topics
                  that often seem difficult at first, from double entry and
                  depreciation to financial statements and ratio analysis. My
                  aim is always to explain these concepts in a way that&apos;s
                  easy to understand without losing sight of what the exam
                  requires.
                </p>
                <p>
                  I&apos;ve had the privilege of teaching thousands of students,
                  from those taking O Level Accounting for the first time to A2
                  students preparing for their final papers. Many continue
                  learning with me as they progress through the syllabus, while
                  others come through recommendations from friends, siblings,
                  and former students. I see that as a reflection of the trust
                  we&apos;ve built together.
                </p>
                <p>
                  Whether you&apos;re new to Accounting or working towards an A
                  or A*, my approach stays the same. I&apos;ll help you
                  understand the concepts, improve your exam technique, and
                  support you throughout your preparation so you can walk into
                  your exam with confidence.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <AboutInfoPanels
                qualifications={qualifications}
                offerings={offerings}
              />

              <p className="font-inter text-[14px] leading-relaxed text-gray-500">
                Questions before you enrol? Reach me on{" "}
                <a
                  href={SITE.orbedUrl}
                  className="font-semibold text-navy-900 underline decoration-gold-500/40 underline-offset-2 hover:text-navy-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Orb-Ed
                </a>{" "}
                or via the{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-navy-900 underline decoration-gold-500/40 underline-offset-2 hover:text-navy-700"
                >
                  contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </AnimateSection>

      {/* Co-Founder — Alpha Education Network */}
      <AboutLeadership />

      {/* Everything in one place — Orb-Ed ecosystem */}
      <AnimateSection index={3} className="bg-grid-white py-20 lg:py-24">
        <div className="container-x">
          <SectionHeader
            eyebrow="Everything You Need, All in One Place"
            title={
              <>
                One platform.
                <br />
                <span className="italic text-gold-500">Complete support.</span>
              </>
            }
          />
          <p className="mx-auto mt-4 max-w-xl text-center font-inter text-[15px] leading-relaxed text-gray-500">
            You can access your recorded lectures, live classes, study notes,
            and past papers in one organized space on Orb-Ed.
          </p>
          <AboutEcosystem />
        </div>
      </AnimateSection>

      <AboutCTA />
    </>
  );
}
