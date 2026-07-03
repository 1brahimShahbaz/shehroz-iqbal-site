import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutEcosystem } from "@/components/about/AboutEcosystem";
import { AboutInfoPanels } from "@/components/about/AboutInfoPanels";
import { AboutTestimonials } from "@/components/about/AboutTestimonials";
import { SirShehrozTagline } from "@/components/about/SirShehrozTagline";
import { AboutCTA } from "@/components/about/AboutCTA";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Shehroz Iqbal | Accounting Tutor Karachi",
  titleAbsolute: true,
  description:
    "Meet Shehroz Iqbal — A Level and O Level Accounting tutor based in Karachi, Pakistan. 13+ years teaching CAIE 9706 and Edexcel Accounting. Helping students across Pakistan and internationally achieve top grades.",
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
              <div className="mt-6 space-y-4 font-inter text-[15px] leading-[1.75] text-gray-600">
                <p>
                  I am based at {SITE.address}, where I work with students
                  face-to-face and online. Over the years I have built a
                  reputation for explaining difficult ideas — double entry,
                  depreciation, financial statements and ratio analysis — in
                  plain language that still satisfies the mark scheme.
                </p>
                <p>
                  Thousands of students have passed through my classes, from
                  first-time O Level learners to A2 candidates sitting Paper 3
                  and Paper 4. Many return for the next stage of the syllabus;
                  others refer friends and siblings. That trust is the result of
                  consistent preparation, honest feedback, and lessons that
                  respect your time.
                </p>
                <p>
                  Whether you are starting Accounting for the first time or
                  pushing for an A or A* in your final sitting, my goal is the
                  same: give you a clear mental model of the subject, train your
                  exam technique, and support you until you walk into the hall
                  feeling ready.
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

      {/* Philosophy pull-quote */}
      <AnimateSection index={2} className="bg-cream-50 py-16 lg:py-24">
        <div className="container-x">
          <SirShehrozTagline />
        </div>
      </AnimateSection>

      {/* Everything in one place — Orb-Ed ecosystem */}
      <AnimateSection index={3} className="bg-grid-white py-20 lg:py-24">
        <div className="container-x">
          <SectionHeader
            eyebrow="Everything In One Place"
            title={
              <>
                One platform.
                <br />
                <span className="italic text-gold-500">Every resource.</span>
              </>
            }
          />
          <p className="mx-auto mt-4 max-w-xl text-center font-inter text-[15px] leading-relaxed text-gray-500">
            Recorded lectures, notes, live sessions and past papers — all
            connected through Orb-Ed, so nothing slips through the cracks.
          </p>
          <AboutEcosystem />
        </div>
      </AnimateSection>

      <AboutTestimonials />

      <AboutCTA />
    </>
  );
}
