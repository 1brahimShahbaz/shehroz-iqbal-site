import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { AffiliationsStack } from "@/components/layout/AffiliationsStack";
import { affiliations } from "@/data/affiliations";

export function FooterAffiliations() {
  return (
    <section aria-labelledby="footer-affiliations-heading" className="pb-4">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-700/30 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(220,38,38,0.12),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-navy-500/25 blur-3xl"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-xl text-center lg:text-left">
            <SectionEyebrow>Affiliations &amp; Partnerships</SectionEyebrow>
            <h2
              id="footer-affiliations-heading"
              className="mt-3 font-fraunces text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-white sm:text-[34px]"
            >
              Partnering with institutions{" "}
              <span className="italic text-gold-500">that inspire excellence.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-inter text-sm leading-relaxed text-white/60 lg:mx-0">
              Working alongside respected schools and learning platforms to
              deliver quality Accounting education across Pakistan.
            </p>

            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-wider2 lg:justify-start">
              {affiliations.map((a, i) => (
                <span key={a.name} className="inline-flex items-center gap-3">
                  {i > 0 ? (
                    <span aria-hidden className="text-gold-500/50">
                      ·
                    </span>
                  ) : null}
                  {a.href ? (
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/45 transition-colors hover:text-gold-500"
                    >
                      {a.name}
                    </a>
                  ) : (
                    <span className="text-white/45">{a.name}</span>
                  )}
                </span>
              ))}
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <AffiliationsStack />
          </div>
        </div>
      </div>
    </section>
  );
}
