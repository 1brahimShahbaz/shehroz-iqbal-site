"use client";

import { ArrowRight } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import RotatingText from "@/components/shared/RotatingText";
import { trackEvent } from "@/lib/analytics";
import { SITE, CTA_LABELS } from "@/lib/constants";

type Props = {
  /** When set, replaces the default rotating headline. */
  title?: string;
  subtitle?: string;
  badge?: string;
  source?: string;
  /** Orb-Ed enrolment URL (defaults to student dashboard). */
  registerHref?: string;
  ctaLabel?: string;
};

export function RegistrationBanner({
  title,
  subtitle = "Live online classes, recorded backups, full notes pack, weekly doubt sessions, and unlimited past-paper marking.",
  badge = "Registrations Open",
  source = "home_banner",
  registerHref = SITE.orbedDashboard,
  ctaLabel = CTA_LABELS.orbEdRegister,
}: Props) {
  return (
    <AnimateSection
      index={6}
      className="relative isolate overflow-hidden bg-navy-900 text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-overlay"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div className="container-x relative py-14 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="pill-gold-outline-dark inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold-500 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-gold-500" />
              </span>
              {badge}
            </span>
            <h2 className="mt-4 max-w-2xl font-fraunces text-[28px] font-semibold leading-[1.15] text-white sm:text-[34px] lg:text-[42px]">
              {title ? (
                title
              ) : (
                <>
                  <span className="block sm:inline">Registrations are open for</span>{" "}
                  <RotatingText
                    texts={[
                      "Oct/Nov 2026",
                      "AS Level 9706",
                      "A2 Level 9706",
                      "O Level 7707",
                    ]}
                    splitBy="words"
                    rotationInterval={2400}
                    staggerFrom="last"
                    staggerDuration={0.03}
                    mainClassName="mt-3 inline-flex items-center whitespace-nowrap rounded-xl bg-gold-500 pb-2 pl-4 pr-5 pt-1.5 align-middle font-fraunces text-[26px] font-semibold italic leading-[1.15] text-white shadow-[0_12px_26px_-10px_rgba(220,38,38,0.6)] sm:mt-0 sm:text-[32px] lg:text-[40px]"
                    splitLevelClassName="overflow-hidden pb-1"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-120%", opacity: 0 }}
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  />
                </>
              )}
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/80">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <a
              href={registerHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("orbed_click", { location: source })
              }
              className="btn-primary text-base shadow-cta-glow"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
            <p className="text-xs text-white/60">
              Limited seats · Closes 31 Aug 2026
            </p>
          </div>
        </div>
      </div>
    </AnimateSection>
  );
}
