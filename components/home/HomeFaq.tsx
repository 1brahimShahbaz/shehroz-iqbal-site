"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AmbientOrbs } from "@/components/shared/AmbientOrbs";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import VariableProximity from "@/components/shared/VariableProximity";
import SpotlightCard from "@/components/shared/SpotlightCard";
import { HOME_FAQS, faqPageJsonLd } from "@/lib/seo";
import { SITE, whatsappLink } from "@/lib/constants";

/**
 * Visible FAQ for local-SEO rich results. Rendered as static HTML
 * (native <details>) so Google can read every question and answer;
 * the matching FAQPage JSON-LD is injected alongside it.
 */
export function HomeFaq() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <AnimateSection
      index={7}
      id="faq"
      className="relative isolate overflow-hidden border-t border-white/10 bg-navy-900 py-16 text-white lg:py-24"
    >
      <AmbientOrbs variant="dark" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd()),
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-grid-overlay opacity-50" />
      <div ref={containerRef} className="container-x relative">
        <SectionHeader
          variant="dark"
          eyebrow="FAQs"
          title={
            <>
              Your questions,{" "}
              <VariableProximity
                label="answered."
                containerRef={containerRef}
                radius={140}
                falloff="gaussian"
                fromFontVariationSettings="'wght' 500, 'opsz' 40"
                toFontVariationSettings="'wght' 800, 'opsz' 72"
                className="italic text-gold-500"
              />
            </>
          }
          subtitle="A Level & O Level Accounting tuition in Karachi and online across Pakistan — answers to the questions students and parents ask most."
        />
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {HOME_FAQS.map((faq) => (
            <SpotlightCard
              key={faq.question}
              spotlightColor="rgba(239, 68, 68, 0.18)"
              className="rounded-2xl border border-white/10 bg-white/5 transition-colors hover:border-gold-500/30 focus-within:border-gold-500/30"
            >
            <details
              className="group open:border-gold-500/40 open:bg-white/[0.07]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-7 sm:py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="font-fraunces text-[16px] font-semibold leading-snug text-white sm:text-[18px]">
                  {faq.question}
                </h3>
                <ChevronDown
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-gold-500 transition-transform duration-300 group-open:rotate-180"
                  strokeWidth={2}
                />
              </summary>
              <p className="px-5 pb-5 font-inter text-[14px] leading-[1.75] text-white/80 motion-safe:animate-[fade-up_280ms_ease-out_both] sm:px-7 sm:pb-6 sm:text-[15px]">
                {faq.answer}
              </p>
            </details>
            </SpotlightCard>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center font-inter text-[14px] leading-relaxed text-white/60">
          Still have a question? Reach {SITE.name} on{" "}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold-500 transition-colors hover:text-white"
          >
            WhatsApp
          </a>{" "}
          or via the{" "}
          <Link
            href="/contact"
            className="font-semibold text-gold-500 transition-colors hover:text-white"
          >
            contact page
          </Link>
          .
        </p>
      </div>
    </AnimateSection>
  );
}
