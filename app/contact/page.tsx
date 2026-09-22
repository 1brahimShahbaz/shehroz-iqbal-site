import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { AnimateStagger, AnimateStaggerItem } from "@/components/shared/AnimateStagger";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { HoursCard } from "@/components/contact/HoursCard";
import { FeedbackForm } from "@/components/contact/FeedbackForm";
import { ContactEmail } from "@/components/contact/ContactEmail";
import { ContactMapSection } from "@/components/contact/ContactMapSection";
import { SITE } from "@/lib/constants";
import { buildMetadata, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Shehroz Iqbal | Accounting Tutor Karachi",
  titleAbsolute: true,
  description:
    "Get in touch with Shehroz Iqbal — Accounting tutor in Karachi, Pakistan. Register for A Level or O Level Accounting courses, in-person or online.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />

      <AnimateSection index={0} instant className="bg-grid-white pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="container-x">
          <SectionEyebrow>Get In Touch</SectionEyebrow>
          <h1 className="mt-3 font-fraunces text-[44px] font-semibold italic leading-tight text-navy-900 sm:text-[56px]">
            Let&rsquo;s talk.
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-gray-500">
            Have a question about a course, class timings, or anything else?
            Message Sir Shehroz directly — every query gets a personal reply.
          </p>
        </div>
      </AnimateSection>

      <AnimateSection index={1} className="bg-grid-white pb-12">
        <div className="container-x">
          <AnimateStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimateStaggerItem>
            <div className="card-rest rounded-2xl bg-cream-50 p-6 transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-navy-900">
                <Phone className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">
                Chat & Support
              </p>
              <p className="mt-1.5 font-fraunces text-[20px] font-semibold text-navy-900">
                Message on Orb-Ed
              </p>
              <div className="mt-3 flex gap-3 text-sm font-medium">
                <a
                  href={SITE.orbedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-900 hover:text-navy-500"
                >
                  Open Orb-Ed →
                </a>
              </div>
            </div>
            </AnimateStaggerItem>

            <AnimateStaggerItem>
            <div className="card-rest rounded-2xl bg-cream-50 p-6 transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-navy-900">
                <Mail className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">
                Email
              </p>
              <ContactEmail />
            </div>
            </AnimateStaggerItem>

            <AnimateStaggerItem>
            <div className="card-rest rounded-2xl bg-cream-50 p-6 transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-navy-900">
                <MapPin className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">
                Visit
              </p>
              <p className="mt-1.5 font-fraunces text-[18px] font-semibold leading-snug text-navy-900">
                {SITE.address}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(SITE.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-navy-900 hover:text-navy-500"
              >
                Get directions →
              </a>
            </div>
            </AnimateStaggerItem>
          </AnimateStagger>

          <AnimateIn direction="up" delay={0.15} className="mt-5">
            <HoursCard />
          </AnimateIn>
        </div>
      </AnimateSection>

      <AnimateSection index={2} className="bg-grid-white pb-12 lg:pb-16">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Feedback</SectionEyebrow>
            <h2 className="mt-3 font-fraunces text-[32px] font-semibold italic leading-tight text-navy-900 sm:text-[40px]">
              We&rsquo;d love to hear from you.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
              Share your experience, suggestions, or questions. Every message is
              read by Sir Shehroz&rsquo;s team.
            </p>
          </div>
          <AnimateIn direction="up" delay={0.1} className="mx-auto mt-10 max-w-2xl">
            <FeedbackForm />
          </AnimateIn>
        </div>
      </AnimateSection>

      <AnimateSection index={3} className="bg-grid-white pb-20 lg:pb-24">
        <div className="container-x">
          <AnimateIn direction="up" delay={0.1}>
            <ContactMapSection />
          </AnimateIn>
        </div>
      </AnimateSection>
    </>
  );
}
