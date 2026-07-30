"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { MobileStaggeredNav } from "@/components/layout/MobileStaggeredNav";
import { NAV_ITEMS, SITE, CTA_LABELS } from "@/lib/constants";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  // At the top of every page the header is a solid navy bar with light-on-dark
  // styling; once the user scrolls it transitions to the frosted-white header.
  const overHero = !scrolled;

  const navLinkClass = (active: boolean) =>
    cn(
      "group relative inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 font-inter text-[13px] font-medium transition-colors duration-300 ease-smooth xl:text-[14px]",
      active
        ? overHero
          ? "text-white"
          : "text-gold-500"
        : overHero
          ? "text-white/85 hover:text-white"
          : "text-navy-900 hover:text-gold-500"
    );

  const underline = (active: boolean) => (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-center rounded-full bg-gold-500 transition-transform duration-300 ease-smooth",
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      )}
    />
  );

  return (
    <>
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.82)"
            : overHero
              ? "rgba(10,39,64,1)"
              : "rgba(255,255,255,0)",
          boxShadow: scrolled
            ? "0 6px 28px rgba(10,39,64,0.10)"
            : "0 0 0 rgba(10,39,64,0)",
          backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
        }}
        transition={{
          y: { duration: 0.55, ease: EASE_OUT },
          opacity: { duration: 0.55, ease: EASE_OUT },
          default: { duration: 0.45, ease: EASE_OUT },
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b",
          scrolled
            ? "border-gray-200/70"
            : overHero
              ? "border-white/10"
              : "border-transparent"
        )}
      >
        {/* Brand accent hairline — fades in with the solid background */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-navy-900 via-gold-500 to-navy-900 transition-opacity duration-500",
            scrolled || overHero ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Legibility scrim for light text sitting on the hero image */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-black/5 to-transparent transition-opacity duration-500",
            overHero ? "opacity-100" : "opacity-0"
          )}
        />

        <div
          className={cn(
            "container-x flex items-center justify-between gap-3 transition-[height] duration-500 ease-smooth",
            scrolled ? "h-[4.5rem] lg:h-20" : "h-20 lg:h-24"
          )}
        >
          <div className="flex min-w-0 shrink-0 items-center overflow-hidden">
            <Logo variant="dark" size="header" interactive />
          </div>

          {/* Desktop nav */}
          <nav
            className="hidden min-w-0 lg:flex lg:flex-1 lg:items-center lg:justify-center"
            aria-label="Main"
          >
            <ul className="flex flex-nowrap items-center gap-1 xl:gap-2">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <li key={item.label} className="group/nav relative">
                    <button
                      type="button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={navLinkClass(isActive(item.href))}
                    >
                      {item.label}
                      <ChevronDown
                        className="h-4 w-4 shrink-0 opacity-80 transition-transform duration-300 ease-smooth group-hover/nav:rotate-180"
                        strokeWidth={2}
                      />
                      {underline(isActive(item.href))}
                    </button>
                    <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-300 ease-smooth group-hover/nav:pointer-events-auto group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100">
                      <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white/95 shadow-card-hover ring-1 ring-navy-900/5 backdrop-blur-xl">
                        <div className="border-b border-gray-100 bg-navy-900 px-4 py-2.5">
                          <p className="font-inter text-[11px] font-semibold uppercase tracking-wider2 text-gold-500">
                            Courses
                          </p>
                        </div>
                        <ul className="p-2">
                          {item.children.map((c) => {
                            const active = isActive(c.href);
                            return (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  aria-current={active ? "page" : undefined}
                                  className={cn(
                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 font-inter text-sm font-medium transition-colors duration-300",
                                    active
                                      ? "bg-gold-500 text-white"
                                      : "text-navy-900 hover:bg-gray-50 hover:text-gold-500"
                                  )}
                                >
                                  <span
                                    aria-hidden
                                    className={cn(
                                      "h-2 w-2 shrink-0 rounded-full transition-colors duration-300",
                                      active
                                        ? "bg-white ring-2 ring-white/40"
                                        : "bg-gray-300"
                                    )}
                                  />
                                  {c.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={navLinkClass(isActive(item.href))}
                    >
                      {item.label}
                      {underline(isActive(item.href))}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={SITE.orbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("orbed_click", { location: "header_cta" })}
              className={cn(
                "group hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border font-inter font-semibold transition-all duration-300 ease-smooth lg:inline-flex",
                scrolled
                  ? "px-3.5 py-2 text-[13px] xl:px-5 xl:py-2.5 xl:text-[14px]"
                  : "px-3.5 py-2.5 text-[13px] xl:px-5 xl:py-3 xl:text-[14px]",
                overHero
                  ? "border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  : "border-transparent bg-navy-900 text-white shadow-[0_4px_16px_rgba(10,39,64,0.2)] hover:bg-navy-700 hover:shadow-card-hover"
              )}
            >
              Study Online
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 xl:h-4 xl:w-4"
                strokeWidth={2}
              />
            </a>

            <Link
              href="/register"
              title={CTA_LABELS.enrollInterest}
              onClick={() => trackEvent("register_click", { location: "header_cta" })}
              className={cn(
                "group hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold-500 font-inter font-semibold text-white shadow-cta-glow-sm transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-gold-300 hover:text-white hover:shadow-cta-glow lg:inline-flex",
                scrolled
                  ? "px-3.5 py-2 text-[13px] xl:px-5 xl:py-2.5 xl:text-[14px]"
                  : "px-3.5 py-2.5 text-[13px] xl:px-5 xl:py-3 xl:text-[14px]"
              )}
            >
              <span className="xl:hidden">{CTA_LABELS.enrollInterestHeader}</span>
              <span className="hidden xl:inline">{CTA_LABELS.enrollInterest}</span>
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 xl:h-4 xl:w-4"
                strokeWidth={2}
              />
            </Link>

            {/* Reserve space for the staggered menu toggle (fixed top-right) */}
            <div className="h-11 w-11 shrink-0 lg:hidden" aria-hidden />
          </div>
        </div>
      </motion.header>

      <MobileStaggeredNav />
    </>
  );
}
