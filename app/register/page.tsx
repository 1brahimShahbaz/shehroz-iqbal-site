import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { RegistrationForm } from "@/components/register/RegistrationForm";
import { CTA_LABELS, SITE, whatsappLink } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Register | Accounting Tuition with Shehroz Iqbal",
  description:
    "Register for O Level, AS Level or A2 Level Accounting tuition with Shehroz Iqbal. Fill in your details and the team will get back to you with the next steps.",
  path: "/register",
});

const perks = [
  {
    icon: CalendarCheck,
    title: "Quick response",
    text: "Sir Shehroz's team reviews every registration and replies personally.",
  },
  {
    icon: ShieldCheck,
    title: "Private & secure",
    text: "Your details are sent straight to us and never shared with anyone.",
  },
  {
    icon: MessageCircle,
    title: "Prefer WhatsApp?",
    text: "You can also reach out directly for an instant conversation.",
  },
];

export default function RegisterPage() {
  return (
    <>
      <AnimateSection index={0} instant className="bg-grid-white pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="container-x">
          <SectionEyebrow>Enrolment</SectionEyebrow>
          <h1 className="mt-3 font-fraunces text-[44px] font-semibold italic leading-tight text-navy-900 sm:text-[56px]">
            {CTA_LABELS.enrollInterest}
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-gray-500">
            Fill in your details and Sir Shehroz&rsquo;s team will get back to you
            with the next steps. Already know Orb-Ed?{" "}
            <Link href="/#orbed-guide" className="font-medium text-navy-900 hover:text-navy-500">
              See how to register on Orb-Ed
            </Link>
            .
          </p>
        </div>
      </AnimateSection>

      <AnimateSection index={1} className="bg-grid-white pb-20 lg:pb-24">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <AnimateIn direction="up">
              <RegistrationForm />
            </AnimateIn>

            <AnimateIn direction="up" delay={0.1} className="space-y-5">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="card-rest rounded-2xl bg-cream-50 p-6"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-navy-900">
                    <perk.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 font-fraunces text-lg font-semibold text-navy-900">
                    {perk.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                    {perk.text}
                  </p>
                </div>
              ))}

              <a
                href={SITE.orbedDashboard}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-navy w-full justify-center"
              >
                {CTA_LABELS.orbEdRegister}
                <ExternalLink className="h-4 w-4" strokeWidth={2} />
              </a>

              <Link
                href="/#orbed-guide"
                className="inline-flex w-full items-center justify-center gap-1.5 text-sm font-medium text-navy-900 hover:text-navy-500"
              >
                Step-by-step Orb-Ed guide
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center"
              >
                Message us on Orb-Ed
              </a>
              <p className="text-center text-xs text-gray-500">
                Or reach us via the{" "}
                <Link href="/contact" className="font-semibold text-navy-900 hover:text-navy-500">
                  contact page
                </Link>
                .
              </p>
            </AnimateIn>
          </div>
        </div>
      </AnimateSection>
    </>
  );
}
