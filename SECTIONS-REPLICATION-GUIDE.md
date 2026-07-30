# Sections Replication Guide

Copy these 6 sections into another Next.js (App Router) + Tailwind site with the **same design and linking**:

1. **Orb-Ed ecosystem tree** (animated beams hub)
2. **About section** (hero + stats + story + info panels + CTA)
3. **Co-Founder at Alpha card**
4. **Affiliations card** (draggable logo stack)
5. **Contact page** (full)
6. **Blog** (index + post detail)

Everything is verbatim from the source site. Work top-down: install deps → add design tokens → add shared building blocks → paste the sections.

---

## 0. Prerequisites

### Stack assumed
- Next.js App Router (`app/` dir), React 18/19, TypeScript
- Tailwind CSS
- Path alias `@/*` → project root (in `tsconfig.json`)

### Install dependencies
```bash
npm i framer-motion lucide-react clsx tailwind-merge \
  react-countup react-intersection-observer \
  react-hook-form @hookform/resolvers zod
# Optional — only for the floating 3D logo in the About hero:
npm i @google/model-viewer
```

### Assets to drop into `/public/images/` (rename/replace with your own)
| File | Used by |
|---|---|
| `orbed.png` | Ecosystem hub, affiliations |
| `aboutpage2.jpeg` | About hero portrait |
| `aen-logo-black.png` | Co-Founder card |
| `kashans-academy.png`, `alpha-college.png` | Affiliations stack |
| `avatar.png` | Blog author avatar |
| blog cover images | Blog cards (`post.cover`) |
| `logo.png` | Logo3D fallback (optional) |
| `/models/logo-3d.glb` | Logo3D 3D model (optional) |

---

## 1. Design tokens

### 1a. Fonts — `app/layout.tsx`
Three CSS variables drive everything: `--font-fraunces` (headings), `--font-inter` (body), `--font-space-grotesk` (numbers/stats).

```tsx
import { Fraunces, Inter, Space_Grotesk } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"], // opsz + wght variable axes power VariableProximity
  style: ["normal", "italic"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

// on <html>:
// className={`${fraunces.variable} ${inter.variable} ${spaceGrotesk.variable}`}
// on <body>: className="font-inter"
```

### 1b. Tailwind — `tailwind.config.ts`
Merge this `extend` block into your config. The brand palette is **navy + red** (the token is named `gold` for legacy reasons but the value is red `#DC2626`).

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "2rem", lg: "3rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        navy: { 900: "#0A2740", 700: "#12466E", 500: "#1C6BAA" },
        gold: { 500: "#DC2626", 300: "#EF4444" }, // "gold" = brand red
        cream: { 50: "#EEF6FC" },
        ink: { 900: "#0F172A" },
        success: "#16A34A",
        whatsapp: "#25D366",
        gray: { 50: "#F8F9FB", 200: "#E5E7EB", 500: "#6B7280" },
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        space: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        eyebrow: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.12em" }],
      },
      letterSpacing: { eyebrow: "0.12em", wider2: "0.08em" },
      boxShadow: {
        "card-rest": "0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.04)",
        "card-hover": "0 8px 30px rgba(10,39,64,0.12)",
        "header-scrolled": "0 4px 24px rgba(10,39,64,0.08)",
        "cta-glow": "0 12px 32px rgba(220,38,38,0.45)",
        "cta-glow-sm": "0 6px 18px rgba(220,38,38,0.38)",
      },
      transitionTimingFunction: { smooth: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};
export default config;
```

### 1c. Global CSS — `app/globals.css`
Add these `@layer components` classes and `@layer utilities` (only the ones the 6 sections use are listed — copy the whole block).

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-ink-900 font-inter antialiased;
    font-feature-settings: "ss01", "cv11";
  }
  a:not([class*="btn-"]) { @apply transition-colors duration-300 ease-smooth; }
  ::selection { background-color: #dc2626; color: #ffffff; }
  *:focus-visible {
    @apply outline-none ring-2 ring-gold-500 ring-offset-2 ring-offset-white rounded-sm;
  }
}

@layer components {
  .eyebrow {
    @apply text-eyebrow font-inter font-semibold uppercase tracking-eyebrow text-navy-700;
  }
  .container-x { @apply mx-auto w-full max-w-[1280px] px-6 md:px-8 lg:px-12; }

  .card-rest { @apply shadow-card-rest transition-all duration-300 ease-smooth; }
  .card-rest:hover { @apply -translate-y-1 shadow-card-hover; }

  .glass-card {
    @apply rounded-2xl border border-white/80 bg-white/80 shadow-card-rest backdrop-blur-md;
    background-image: linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(238,246,252,0.88) 100%);
  }

  .btn-primary {
    @apply inline-flex items-center whitespace-nowrap justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-inter font-semibold text-white shadow-cta-glow-sm transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-gold-300 hover:text-white hover:shadow-cta-glow active:translate-y-0 active:scale-[0.98] focus-visible:ring-gold-500;
  }
  .btn-outline-navy {
    @apply inline-flex items-center whitespace-nowrap justify-center gap-2 rounded-full border-[1.5px] border-navy-900 bg-transparent px-7 py-3.5 font-inter font-semibold text-navy-900 transition-all duration-300 ease-smooth hover:bg-navy-900 hover:text-white active:scale-[0.98];
  }

  .section-title-line {
    @apply h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-gold-500 to-transparent;
  }

  .input-field {
    @apply w-full rounded-xl border-[1.5px] border-gray-200 bg-white px-4 py-3.5 font-inter text-base text-ink-900 transition-all placeholder:text-gray-500 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20;
  }
  .label-mini {
    @apply mb-1.5 block text-[11px] font-semibold uppercase tracking-wider2 text-gray-500;
  }
}

@layer utilities {
  .text-balance { text-wrap: balance; }

  .bg-grid-white {
    background-color: #ffffff;
    background-image:
      linear-gradient(rgba(30,143,206,0.09) 1px, transparent 1px),
      linear-gradient(90deg, rgba(30,143,206,0.09) 1px, transparent 1px);
    background-size: 56px 56px;
  }
  .bg-grid-overlay {
    background-image:
      linear-gradient(rgba(30,143,206,0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(30,143,206,0.1) 1px, transparent 1px);
    background-size: 56px 56px;
  }
}

/* No-JS/entrance fallback used by AnimateSection's REVEAL_CLASS */
.motion-reveal { will-change: transform, opacity; }
```

---

## 2. Shared lib

### `lib/utils.ts`
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `lib/motion.ts`
```ts
export type AnimateDirection = "up" | "down" | "left" | "right" | "fade";

export const SECTION_DIRECTION_CYCLE: AnimateDirection[] = [
  "up", "right", "left", "up", "fade", "up",
];
export function directionAt(index: number): AnimateDirection {
  return SECTION_DIRECTION_CYCLE[index % SECTION_DIRECTION_CYCLE.length];
}

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const SECTION_TRANSITION = { duration: 0.5, ease: EASE_OUT } as const;
export const STAGGER_TRANSITION = { duration: 0.45, ease: EASE_OUT } as const;
export const SPRING = { type: "spring", stiffness: 230, damping: 26, mass: 0.9 } as const;
export const TAP_SPRING = { type: "spring", stiffness: 420, damping: 28 } as const;
export const CARD_HOVER = { y: -6, transition: { duration: 0.28, ease: EASE_OUT } } as const;

export const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { ...STAGGER_TRANSITION, type: "spring", stiffness: 260, damping: 24 },
  },
} as const;

export const VIEWPORT = { once: true, amount: 0.08, margin: "0px" } as const;

export function motionOffset(direction: AnimateDirection) {
  switch (direction) {
    case "up": return { y: 22 };
    case "down": return { y: -22 };
    case "left": return { x: 26 };
    case "right": return { x: -26 };
    case "fade": return { scale: 0.97 };
    default: return {};
  }
}
export const REVEAL_CLASS = "motion-reveal";
```

### `lib/analytics.ts`
Trims to a no-op if you don't use GA — but keep the export so imports resolve.
```ts
"use client";

type GtagEventParams = Record<string, string | number | boolean | undefined>;
declare global {
  interface Window {
    gtag?: (command: "event" | "config" | "js" | "set", action: string, params?: GtagEventParams) => void;
  }
}
export type GAEventName =
  | "register_click" | "whatsapp_click" | "orbed_click" | "lecture_play"
  | "contact_submit" | "register_submit" | "blog_share";

export function trackEvent(name: GAEventName, params: GtagEventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
```

### `lib/constants.ts` (trimmed to what these sections use)
Replace values with your own brand/links. **This is the single source of all linking.**
```ts
export const SITE = {
  name: "Sir Shehroz Iqbal",
  personName: "Shehroz Iqbal",
  tagline: "Accounting · CAIE & Edexcel",
  description: "…",
  url: "https://shehroziqbal.com",
  domain: "shehroziqbal.com",
  email: "shehroz420si@gmail.com",
  phone: "+92 326 8079622",
  whatsappNumber: "923268079622",
  address: "Alpha College, 38-C P.E.C.H.S Block 6, Karachi, Pakistan",
  mapEmbed:
    "https://maps.google.com/maps?q=Alpha+College+38-C+PECHS+Block+6+Karachi+Pakistan&t=&z=16&ie=UTF8&iwloc=&output=embed",
  orbedUrl: "https://lms.orb-ed.pk",           // <- the "Orb-Ed" link target
  orbedDashboard: "https://lms.orb-ed.pk/user/dashboard",
  openHours: {
    monThu: { startHour: 7, startMinute: 30, endHour: 15, endMinute: 30 },
    friSat: { startHour: 9, startMinute: 0, endHour: 13, endMinute: 0 },
  },
  socials: {
    facebook: "https://www.facebook.com/shehroz.iqbal.1",
    instagram: "https://www.instagram.com/shehroziqbal/",
    youtube: "https://www.youtube.com/@easyaccountingwithShehrozIqbal",
    whatsapp: "https://lms.orb-ed.pk",
  },
} as const;

export const CTA_LABELS = {
  enrollInterest: "Enroll for Oct/Nov 2026",
  enrollInterestHeader: "Enroll · Oct/Nov",
  orbEdRegister: "Register on Orb-Ed",
} as const;

// Contact feedback form endpoint (Google Apps Script /exec URL). Empty = form shows a graceful error.
export const FEEDBACK_ENDPOINT = process.env.NEXT_PUBLIC_FEEDBACK_ENDPOINT || "";
```

### `lib/seo.ts` — minimal `buildMetadata`
The pages call `buildMetadata(...)` and the contact page uses `localBusinessJsonLd`. Minimal version:
```ts
import type { Metadata } from "next";
import { SITE } from "./constants";

type PageSEO = {
  title?: string; description?: string; path?: string;
  image?: string; keywords?: string[]; titleAbsolute?: boolean;
};

export function buildMetadata(seo: PageSEO = {}): Metadata {
  const title = seo.titleAbsolute
    ? seo.title ?? SITE.name
    : seo.title ? `${seo.title} | ${SITE.personName}` : SITE.name;
  const url = `${SITE.url}${seo.path || ""}`;
  return {
    metadataBase: new URL(SITE.url),
    title,
    description: seo.description || SITE.description,
    alternates: { canonical: url },
    keywords: seo.keywords,
    openGraph: { type: "website", url, title, description: seo.description },
  };
}

// Optional: used by the contact page <script type="application/ld+json">
export const localBusinessJsonLd = {
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: `${SITE.personName}`,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  address: { "@type": "PostalAddress", streetAddress: SITE.address },
};
```
> The real `lib/seo.ts` also exports `blogSeoTitle` (used by the blog post page). Minimal stub:
> ```ts
> export function blogSeoTitle(_slug: string, displayTitle: string) { return displayTitle; }
> ```

---

## 3. Shared components

### `components/shared/AnimateSection.tsx`
```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  directionAt, motionOffset, REVEAL_CLASS, SECTION_TRANSITION, VIEWPORT,
  type AnimateDirection,
} from "@/lib/motion";

type Props = {
  children: ReactNode; className?: string; id?: string;
  direction?: AnimateDirection; index?: number; delay?: number; instant?: boolean;
};

export function AnimateSection({
  children, className, id, direction, index = 0, delay = 0, instant = false,
}: Props) {
  const reduce = useReducedMotion();
  const dir = direction ?? directionAt(index);
  const offset = motionOffset(dir);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (reduce) return <section id={id} className={className}>{children}</section>;

  const visible = { opacity: 1, x: 0, y: 0, scale: 1 };
  return (
    <motion.section
      id={id}
      className={cn(REVEAL_CLASS, className)}
      initial={{ opacity: 0, ...offset }}
      animate={instant && mounted ? visible : undefined}
      whileInView={instant ? undefined : visible}
      viewport={instant ? undefined : VIEWPORT}
      transition={{ ...SECTION_TRANSITION, delay }}
    >
      {children}
    </motion.section>
  );
}
```

### `components/shared/AnimateIn.tsx`
```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT, motionOffset, REVEAL_CLASS, VIEWPORT, type AnimateDirection } from "@/lib/motion";

type Props = { children: ReactNode; className?: string; direction?: AnimateDirection; delay?: number };

export function AnimateIn({ children, className, direction = "up", delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const offset = motionOffset(direction);
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={cn(REVEAL_CLASS, className)}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
```

### `components/shared/AnimateStagger.tsx`
```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { REVEAL_CLASS, STAGGER_ITEM, VIEWPORT } from "@/lib/motion";

export function AnimateStagger({ children, className, stagger = 0.08 }:
  { children: ReactNode; className?: string; stagger?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden" whileInView="visible" viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } } }}
    >
      {children}
    </motion.div>
  );
}

export function AnimateStaggerItem({ children, className }:
  { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={cn(REVEAL_CLASS, className)}
      variants={{ hidden: STAGGER_ITEM.hidden, visible: STAGGER_ITEM.visible }}
    >
      {children}
    </motion.div>
  );
}
```

### `components/shared/SectionEyebrow.tsx`
```tsx
import { cn } from "@/lib/utils";
export function SectionEyebrow({ children, className }:
  { children: React.ReactNode; className?: string }) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}
```

### `components/shared/MotionUnderline.tsx`
```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

export function MotionUnderline({ className, dark }: { className?: string; dark?: boolean }) {
  const reduce = useReducedMotion();
  if (reduce)
    return <div aria-hidden className={cn("section-title-line mt-5", dark && "via-white/50", className)} />;
  return (
    <motion.div
      aria-hidden
      className={cn("mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-gold-500 to-transparent", dark && "via-white/60", className)}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      style={{ originX: 0.5 }}
    />
  );
}
```

### `components/shared/SectionHeader.tsx`
```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MotionUnderline } from "./MotionUnderline";
import { SectionEyebrow } from "./SectionEyebrow";

type Props = {
  eyebrow?: string; title: ReactNode; subtitle?: string;
  align?: "left" | "center"; variant?: "light" | "dark";
  className?: string; titleClassName?: string;
};

export function SectionHeader({
  eyebrow, title, subtitle, align = "center", variant = "light", className, titleClassName,
}: Props) {
  const isDark = variant === "dark";
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center", align === "left" && "max-w-2xl", className)}>
      {eyebrow ? <SectionEyebrow className={isDark ? "text-white/90" : undefined}>{eyebrow}</SectionEyebrow> : null}
      <h2 className={cn("mt-3 text-balance font-fraunces text-[34px] font-semibold leading-tight sm:text-[42px]", isDark ? "text-white" : "text-navy-900", titleClassName)}>
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("mt-3 max-w-xl font-inter text-[16px] leading-relaxed", align === "center" && "mx-auto", isDark ? "text-white/70" : "text-gray-500")}>
          {subtitle}
        </p>
      ) : null}
      <MotionUnderline dark={isDark} className={cn(align === "center" && "mx-auto")} />
    </div>
  );
}
```

### `components/shared/MotionCard.tsx`
```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CARD_HOVER, TAP_SPRING } from "@/lib/motion";

export function MotionCard({ children, className, as = "div" }:
  { children: ReactNode; className?: string; as?: "div" | "article" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  if (reduce) { const Tag = as; return <Tag className={className}>{children}</Tag>; }
  return (
    <Comp className={cn(className)} whileHover={CARD_HOVER} whileTap={{ scale: 0.985, transition: TAP_SPRING }}>
      {children}
    </Comp>
  );
}
```

### `components/shared/SpotlightCard.tsx` + `SpotlightCard.css`
```tsx
"use client";
import { useCallback, useRef, type MouseEvent, type ReactNode, type TouchEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import "./SpotlightCard.css";

export default function SpotlightCard({
  children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)",
}: { children: ReactNode; className?: string; spotlightColor?: string }) {
  const reduceMotion = useReducedMotion();
  const divRef = useRef<HTMLDivElement>(null);

  const updateSpotlight = useCallback((clientX: number, clientY: number) => {
    const el = divRef.current;
    if (!el || reduceMotion) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${clientY - rect.top}px`);
    el.style.setProperty("--spotlight-color", spotlightColor);
  }, [reduceMotion, spotlightColor]);

  return (
    <div
      ref={divRef}
      onMouseMove={(e: MouseEvent<HTMLDivElement>) => updateSpotlight(e.clientX, e.clientY)}
      onTouchMove={(e: TouchEvent<HTMLDivElement>) => { const t = e.touches[0]; if (t) updateSpotlight(t.clientX, t.clientY); }}
      className={cn("card-spotlight", className)}
    >
      {children}
    </div>
  );
}
```
```css
/* SpotlightCard.css */
.card-spotlight {
  position: relative; overflow: hidden;
  --mouse-x: 50%; --mouse-y: 50%; --spotlight-color: rgba(255,255,255,0.25);
}
.card-spotlight::before {
  content: ""; position: absolute; inset: 0; z-index: 0;
  background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%);
  opacity: 0; transition: opacity 0.5s ease; pointer-events: none;
}
.card-spotlight:hover::before, .card-spotlight:focus-within::before { opacity: 0.6; }
.card-spotlight > * { position: relative; z-index: 1; }
@media (prefers-reduced-motion: reduce) { .card-spotlight::before { display: none; } }
```

### `components/shared/AmbientOrbs.tsx` (About hero background)
```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";

export function AmbientOrbs({ variant = "light" }: { variant?: "light" | "dark" }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const isDark = variant === "dark";
  const c = (...p: string[]) => p.join(" ");
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.span className={c("absolute -left-20 top-[12%] h-56 w-56 rounded-full blur-3xl", isDark ? "bg-gold-500/15" : "bg-gold-500/10")}
        animate={{ y: [0, -18, 0], x: [0, 12, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
      <motion.span className={c("absolute right-[6%] top-[8%] h-40 w-40 rounded-full blur-2xl", isDark ? "bg-navy-500/35" : "bg-navy-500/15")}
        animate={{ y: [0, 14, 0], x: [0, -10, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
      <motion.span className={c("absolute bottom-[10%] left-[18%] h-32 w-32 rounded-full blur-2xl", isDark ? "bg-gold-500/10" : "bg-gold-500/12")}
        animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}
```

### `components/shared/VariableProximity.tsx` + `VariableProximity.css`
Interactive variable-font effect (letters bolden near the cursor). Used by the blog hero and optional About hero name. Requires the variable-font `opsz`/`wght` axes (Fraunces provides them).
```tsx
"use client";
import {
  forwardRef, useCallback, useEffect, useMemo, useRef,
  type CSSProperties, type RefObject,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import "./VariableProximity.css";

function useAnimationFrame(callback: () => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  useEffect(() => {
    let frameId = 0;
    const loop = () => { callbackRef.current(); frameId = requestAnimationFrame(loop); };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);
}

function useMousePositionRef(containerRef: RefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const update = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else positionRef.current = { x, y };
    };
    const mm = (e: MouseEvent) => update(e.clientX, e.clientY);
    const tm = (e: TouchEvent) => { const t = e.touches[0]; if (t) update(t.clientX, t.clientY); };
    window.addEventListener("mousemove", mm, { passive: true });
    window.addEventListener("touchmove", tm, { passive: true });
    return () => { window.removeEventListener("mousemove", mm); window.removeEventListener("touchmove", tm); };
  }, [containerRef]);
  return positionRef;
}

type Falloff = "linear" | "exponential" | "gaussian";
type VariableProximityProps = {
  label: string; fromFontVariationSettings?: string; toFontVariationSettings?: string;
  containerRef: RefObject<HTMLElement | null>; radius?: number; falloff?: Falloff;
  className?: string; onClick?: () => void; style?: CSSProperties;
};

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  function VariableProximity(props, ref) {
    const {
      label,
      fromFontVariationSettings = "'wght' 400, 'opsz' 40",
      toFontVariationSettings = "'wght' 700, 'opsz' 72",
      containerRef, radius = 100, falloff = "linear", className = "", onClick, style,
    } = props;

    const reduceMotion = useReducedMotion();
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const interpolatedSettingsRef = useRef<string[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);
    const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

    const parsedSettings = useMemo(() => {
      const parse = (s: string) => new Map(
        s.split(",").map((x) => x.trim()).map((x) => {
          const [name, value] = x.split(" ");
          return [name.replace(/['"]/g, ""), parseFloat(value)] as [string, number];
        })
      );
      const from = parse(fromFontVariationSettings);
      const to = parse(toFontVariationSettings);
      return Array.from(from.entries()).map(([axis, fromValue]) => ({
        axis, fromValue, toValue: to.get(axis) ?? fromValue,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    const dist = useCallback((x1: number, y1: number, x2: number, y2: number) =>
      Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2), []);

    const calcFalloff = useCallback((d: number) => {
      const norm = Math.min(Math.max(1 - d / radius, 0), 1);
      switch (falloff) {
        case "exponential": return norm ** 2;
        case "gaussian": return Math.exp(-((d / (radius / 2)) ** 2) / 2);
        default: return norm;
      }
    }, [falloff, radius]);

    const animate = useCallback(() => {
      if (!containerRef?.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      const { x, y } = mousePositionRef.current;
      if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) return;
      lastPositionRef.current = { x, y };
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2 - cRect.left;
        const cy = r.top + r.height / 2 - cRect.top;
        const d = dist(x, y, cx, cy);
        if (d >= radius) { el.style.fontVariationSettings = fromFontVariationSettings; return; }
        const f = calcFalloff(d);
        const s = parsedSettings.map(({ axis, fromValue, toValue }) =>
          `'${axis}' ${fromValue + (toValue - fromValue) * f}`).join(", ");
        interpolatedSettingsRef.current[i] = s;
        el.style.fontVariationSettings = s;
      });
    }, [calcFalloff, dist, containerRef, fromFontVariationSettings, mousePositionRef, parsedSettings, radius]);

    useAnimationFrame(() => { if (!reduceMotion) animate(); });

    if (reduceMotion)
      return <span ref={ref} className={cn("variable-proximity", className)} style={style}>{label}</span>;

    const words = label.split(" ");
    let li = 0;
    return (
      <span ref={ref} className={cn("variable-proximity", className)} onClick={onClick} style={{ display: "inline", ...style }}>
        {words.map((word, wi) => (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((letter) => {
              const idx = li++;
              return (
                <motion.span key={idx} ref={(el) => { letterRefs.current[idx] = el; }}
                  style={{ display: "inline-block", fontVariationSettings: interpolatedSettingsRef.current[idx] ?? fromFontVariationSettings }}
                  aria-hidden="true">
                  {letter}
                </motion.span>
              );
            })}
            {wi < words.length - 1 ? <span style={{ display: "inline-block" }}>&nbsp;</span> : null}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  }
);
export default VariableProximity;
```
```css
/* VariableProximity.css */
.variable-proximity { font-family: var(--font-fraunces), Georgia, serif; }
```
> **Simpler alternative:** skip this component and replace `<VariableProximity label="…" />` with a plain `<span>…</span>`. The layout is unaffected.

### `components/shared/AnimatedBeam.tsx` (Orb-Ed ecosystem)
Adapted from magicui. Put at `components/magicui/animated-beam.tsx`.
```tsx
"use client";
import { useEffect, useId, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number; reverse?: boolean;
  pathColor?: string; pathWidth?: number; pathOpacity?: number;
  gradientStartColor?: string; gradientStopColor?: string;
  delay?: number; duration?: number;
  startXOffset?: number; startYOffset?: number; endXOffset?: number; endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className, containerRef, fromRef, toRef,
  curvature = 0, reverse = false, duration = 5, delay = 0,
  pathColor = "gray", pathWidth = 2, pathOpacity = 0.2,
  gradientStartColor = "#ffaa40", gradientStopColor = "#9c40ff",
  startXOffset = 0, startYOffset = 0, endXOffset = 0, endYOffset = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svg, setSvg] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"], y1: ["0%", "0%"], y2: ["0%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"], y1: ["0%", "0%"], y2: ["0%", "0%"] };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const c = containerRef.current.getBoundingClientRect();
        const a = fromRef.current.getBoundingClientRect();
        const b = toRef.current.getBoundingClientRect();
        setSvg({ width: c.width, height: c.height });
        const startX = a.left - c.left + a.width / 2 + startXOffset;
        const startY = a.top - c.top + a.height / 2 + startYOffset;
        const endX = b.left - c.left + b.width / 2 + endXOffset;
        const endY = b.top - c.top + b.height / 2 + endYOffset;
        const controlY = startY - curvature;
        setPathD(`M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`);
      }
    };
    const ro = new ResizeObserver(() => updatePath());
    if (containerRef.current) ro.observe(containerRef.current);
    updatePath();
    return () => ro.disconnect();
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  return (
    <svg fill="none" width={svg.width} height={svg.height} xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute left-0 top-0 transform-gpu stroke-2", className)}
      viewBox={`0 0 ${svg.width} ${svg.height}`}>
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      <path d={pathD} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeOpacity="1" strokeLinecap="round" />
      <defs>
        <motion.linearGradient className="transform-gpu" id={id} gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{ x1: gradientCoordinates.x1, x2: gradientCoordinates.x2, y1: gradientCoordinates.y1, y2: gradientCoordinates.y2 }}
          transition={{ delay, duration, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 0 }}>
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
```

### `components/shared/Stack.tsx` + `Stack.css` (Affiliations logo stack)
```tsx
"use client";
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { useState, useEffect, type ReactNode } from "react";
import "./Stack.css";

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }:
  { children: ReactNode; onSendToBack: () => void; sensitivity: number; disableDrag?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);
  function handleDragEnd(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) onSendToBack();
    else { x.set(0); y.set(0); }
  }
  if (disableDrag)
    return <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0 }}>{children}</motion.div>;
  return (
    <motion.div className="card-rotate" style={{ x, y, rotateX, rotateY }} drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }} dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }} onDragEnd={handleDragEnd}>
      {children}
    </motion.div>
  );
}

type StackProps = {
  randomRotation?: boolean; sensitivity?: number; cards?: ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean; autoplay?: boolean; autoplayDelay?: number;
  pauseOnHover?: boolean; mobileClickOnly?: boolean; mobileBreakpoint?: number;
};
type StackCard = { id: number; content: ReactNode };

export default function Stack({
  randomRotation = false, sensitivity = 200, cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false, autoplay = false, autoplayDelay = 3000,
  pauseOnHover = false, mobileClickOnly = false, mobileBreakpoint = 768,
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const [stack, setStack] = useState<StackCard[]>(() => cards.map((content, i) => ({ id: i + 1, content })));
  useEffect(() => { setStack(cards.map((content, i) => ({ id: i + 1, content }))); }, [cards]);

  const sendToBack = (id: number) => setStack((prev) => {
    const s = [...prev]; const i = s.findIndex((c) => c.id === id);
    if (i === -1) return prev; const [card] = s.splice(i, 1); s.unshift(card); return s;
  });

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => sendToBack(stack[stack.length - 1].id), autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused]);

  const [rotations, setRotations] = useState<Record<number, number>>({});
  useEffect(() => {
    if (!randomRotation) return;
    setRotations((prev) => {
      const next = { ...prev }; let changed = false;
      for (const c of stack) if (next[c.id] === undefined) { next[c.id] = Math.random() * 10 - 5; changed = true; }
      return changed ? next : prev;
    });
  }, [randomRotation, stack]);

  return (
    <div className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}>
      {stack.map((card, index) => {
        const randomRotate = randomRotation ? rotations[card.id] ?? 0 : 0;
        const scale = Math.round((1 + index * 0.06 - stack.length * 0.06) * 1000) / 1000;
        return (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity} disableDrag={shouldDisableDrag}>
            <motion.div className="card"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{ rotateZ: (stack.length - index - 1) * 4 + randomRotate, scale, transformOrigin: "90% 90%" }}
              initial={false}
              transition={{ type: "spring", stiffness: animationConfig.stiffness, damping: animationConfig.damping }}>
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
```
```css
/* Stack.css */
.stack-container { position: relative; width: 100%; height: 100%; perspective: 600px; }
.card-rotate { position: absolute; width: 100%; height: 100%; cursor: grab; }
.card-rotate-disabled { position: absolute; width: 100%; height: 100%; cursor: pointer; }
.card { border-radius: 1rem; overflow: hidden; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.card img { pointer-events: none; user-select: none; -webkit-user-drag: none; }
```

### `components/shared/Logo3D.tsx` (optional — About hero floating logo)
Needs `@google/model-viewer` + a `.glb` file. **Skip it** and delete its usage in the About hero if you don't want a 3D asset.
```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo3D({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let active = true;
    import("@google/model-viewer").catch(() => {});
    const el = ref.current; if (!el) return;
    const onLoad = () => { if (active) setLoaded(true); };
    el.addEventListener("load", onLoad);
    return () => { active = false; el.removeEventListener("load", onLoad); };
  }, []);
  return (
    <div className={cn("relative", className)}>
      <Image src="/images/logo.png" alt="logo" width={240} height={240} aria-hidden={loaded}
        className={cn("pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-500", loaded ? "opacity-0" : "opacity-100")} />
      {/* @ts-expect-error custom element */}
      <model-viewer ref={ref} src="/models/logo-3d.glb" alt="3D logo"
        auto-rotate="" rotation-per-second="26deg" interaction-prompt="none"
        environment-image="neutral" exposure="1.15" shadow-intensity="0" disable-zoom=""
        style={{ width: "100%", height: "100%", backgroundColor: "transparent", opacity: loaded ? 1 : 0, transition: "opacity 700ms ease" }} />
    </div>
  );
}
```

---

## SECTION 1 — Orb-Ed ecosystem tree

**`components/about/AboutEcosystem.tsx`** — center hub (`orbed.png`, links to `https://orb-ed.pk/`) with 4 labeled nodes and animated beams flowing in (left) and out (right).
```tsx
"use client";
import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MonitorPlay, Radio, NotebookText, FileCheck2 } from "lucide-react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { EASE_OUT } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => (
    <div ref={ref} className={cn("z-10 flex size-14 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-[0_10px_28px_-12px_rgba(10,39,64,0.55)] sm:size-16", className)}>
      {children}
    </div>
  )
);
Circle.displayName = "Circle";

type NodeProps = { nodeRef: React.RefObject<HTMLDivElement>; icon: typeof MonitorPlay; label: string };
function Node({ nodeRef, icon: Icon, label }: NodeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Circle ref={nodeRef} className="text-gold-500">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
      </Circle>
      <span className="max-w-[84px] text-center text-[11px] font-semibold leading-tight text-navy-900 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function AboutEcosystem() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const recordedRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const papersRef = useRef<HTMLDivElement>(null);

  const beam = {
    gradientStartColor: "#DC2626", gradientStopColor: "#F87171",
    pathColor: "#0A2740", pathOpacity: 0.12, duration: 4.5,
  };

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="relative mx-auto mt-14 flex h-[360px] w-full max-w-3xl items-center justify-center overflow-hidden sm:h-[420px]"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[280px] max-w-2xl items-stretch justify-between">
        <div className="flex flex-col items-center justify-between py-2">
          <Node nodeRef={recordedRef} icon={MonitorPlay} label="Recorded lectures" />
          <Node nodeRef={liveRef} icon={Radio} label="Live sessions" />
        </div>

        <a href="https://orb-ed.pk/" target="_blank" rel="noopener noreferrer"
          onClick={() => trackEvent("orbed_click", { location: "about_ecosystem" })}
          aria-label="Visit Orb-Ed learning platform"
          className="group flex flex-col items-center justify-center rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2">
          <div ref={centerRef}
            className="z-10 flex size-24 items-center justify-center rounded-3xl border border-gray-200 bg-white p-4 shadow-[0_20px_50px_-18px_rgba(220,38,38,0.5)] transition-all duration-300 ease-smooth group-hover:-translate-y-1 group-hover:border-gold-500/40 group-hover:shadow-[0_26px_60px_-16px_rgba(220,38,38,0.65)] sm:size-28">
            <div className="relative h-full w-full">
              <Image src="/images/orbed.png" alt="Orb-Ed learning platform" fill sizes="112px" className="object-contain" />
            </div>
          </div>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider2 text-gold-500 transition-colors group-hover:text-navy-900">
            Orb-Ed
          </span>
        </a>

        <div className="flex flex-col items-center justify-between py-2">
          <Node nodeRef={notesRef} icon={NotebookText} label="Notes" />
          <Node nodeRef={papersRef} icon={FileCheck2} label="Past papers" />
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={recordedRef} toRef={centerRef} curvature={-70} endYOffset={-12} delay={0} {...beam} />
      <AnimatedBeam containerRef={containerRef} fromRef={liveRef} toRef={centerRef} curvature={70} endYOffset={12} delay={0.6} {...beam} />
      <AnimatedBeam containerRef={containerRef} fromRef={notesRef} toRef={centerRef} curvature={-70} endYOffset={-12} reverse delay={0.9} {...beam} />
      <AnimatedBeam containerRef={containerRef} fromRef={papersRef} toRef={centerRef} curvature={70} endYOffset={12} reverse delay={1.3} {...beam} />
    </motion.div>
  );
}
```

**Section wrapper** (place inside a page):
```tsx
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AboutEcosystem } from "@/components/about/AboutEcosystem";

<AnimateSection index={3} className="bg-grid-white py-20 lg:py-24">
  <div className="container-x">
    <SectionHeader
      eyebrow="Everything You Need, All in One Place"
      title={<>One platform.<br /><span className="italic text-gold-500">Complete support.</span></>}
    />
    <p className="mx-auto mt-4 max-w-xl text-center font-inter text-[15px] leading-relaxed text-gray-500">
      You can access your recorded lectures, live classes, study notes, and past papers in one organized space on Orb-Ed.
    </p>
    <AboutEcosystem />
  </div>
</AnimateSection>
```

---

## SECTION 2 — About section

### `app/about/page.tsx`
```tsx
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
  title: "About Shehroz Iqbal | Accounting Tutor Karachi",
  titleAbsolute: true,
  description: "Meet Shehroz Iqbal — A Level and O Level Accounting tutor based in Karachi…",
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

      <section className="relative z-20 -mt-10 sm:-mt-14">
        <AboutStats />
      </section>

      <AnimateSection index={1} className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionEyebrow>Background</SectionEyebrow>
              <h2 className="mt-3 font-fraunces text-[28px] font-semibold leading-tight text-navy-900 sm:text-[34px]">
                Teaching Accounting is what I do — and what I love.
              </h2>
              <p className="mt-6 font-fraunces text-[18px] font-medium italic leading-snug text-navy-900 sm:text-[20px]">
                Teaching Accounting isn&apos;t just my profession, it&apos;s something I genuinely enjoy.
              </p>
              <div className="mt-5 space-y-4 font-inter text-[15px] leading-[1.75] text-gray-600">
                <p>I&apos;m based at {SITE.address}, where I teach Accounting…</p>
                {/* …remaining paragraphs… */}
              </div>
            </div>

            <div className="space-y-8">
              <AboutInfoPanels qualifications={qualifications} offerings={offerings} />
              <p className="font-inter text-[14px] leading-relaxed text-gray-500">
                Questions before you enrol? Reach me on{" "}
                <a href={SITE.orbedUrl} className="font-semibold text-navy-900 underline decoration-gold-500/40 underline-offset-2 hover:text-navy-700" target="_blank" rel="noopener noreferrer">Orb-Ed</a>{" "}
                or via the{" "}
                <Link href="/contact" className="font-semibold text-navy-900 underline decoration-gold-500/40 underline-offset-2 hover:text-navy-700">contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </AnimateSection>

      <AboutLeadership />

      <AnimateSection index={3} className="bg-grid-white py-20 lg:py-24">
        <div className="container-x">
          <SectionHeader
            eyebrow="Everything You Need, All in One Place"
            title={<>One platform.<br /><span className="italic text-gold-500">Complete support.</span></>}
          />
          <p className="mx-auto mt-4 max-w-xl text-center font-inter text-[15px] leading-relaxed text-gray-500">
            You can access your recorded lectures, live classes, study notes, and past papers in one organized space on Orb-Ed.
          </p>
          <AboutEcosystem />
        </div>
      </AnimateSection>

      <AboutCTA />
    </>
  );
}
```

### `components/about/AboutHero.tsx`
> Uses `AmbientOrbs` + `Logo3D`. Remove the `Logo3D` block if you skip the 3D asset. Portrait: `/images/aboutpage2.jpeg`.
```tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles, Award } from "lucide-react";
import { AmbientOrbs } from "@/components/shared/AmbientOrbs";
import { Logo3D } from "@/components/shared/Logo3D";
import { SITE } from "@/lib/constants";
import { EASE_OUT } from "@/lib/motion";

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };
const item: Variants = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } } };

const paragraphs = [
  "For over 13 years, I've been teaching O Level and A Level Accounting…",
  "I've always believed there's no point in memorizing answers…",
  "My classes are practical and easy to follow…",
];

export function AboutHero() {
  const reduce = useReducedMotion();
  const wrap = reduce ? {} : { variants: container, initial: "hidden" as const, animate: "visible" as const };
  const child = reduce ? {} : { variants: item };
  const float = (delay: number) => reduce ? {} : {
    animate: { y: [0, -12, 0] },
    transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" as const, delay },
  };

  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <AmbientOrbs variant="dark" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full bg-navy-500/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-3xl" />

      <div className="container-x relative grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <motion.div {...wrap} className="relative max-w-xl">
          <motion.span {...child} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-500 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            About Sir Shehroz
          </motion.span>

          <motion.h1 {...child} className="mt-5 font-fraunces text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]">
            Shehroz Iqbal
            <span className="mt-4 block font-inter text-[15px] font-medium not-italic leading-snug tracking-wide text-white/65 sm:text-base">
              Accounting tutor · Karachi &amp; online · Cambridge (CAIE) &amp; Edexcel
            </span>
          </motion.h1>

          <div className="mt-6 space-y-3.5 text-[15px] leading-[1.75] text-white/80">
            {paragraphs.map((p, i) => <motion.p key={i} {...child}>{p}</motion.p>)}
          </div>

          <motion.div {...child} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/courses/as-level" className="btn-primary text-sm">
              Explore my courses<ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <a href={SITE.orbedUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/25 bg-white/5 px-6 py-3 font-inter text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/15">
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              Contact on Orb-Ed
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.94, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative rounded-[28px] bg-gradient-to-br from-gold-500/40 via-white/10 to-navy-500/40 p-[1.5px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-navy-700">
              <Image src="/images/aboutpage2.jpeg" alt="Sir Shehroz Iqbal, CAIE and Edexcel Accounting tutor"
                width={2832} height={4240} priority loading="eager" sizes="(min-width: 1024px) 45vw, 90vw"
                className="absolute inset-0 h-full w-full object-cover object-center" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
            </div>
          </div>

          {/* Optional 3D logo — remove if not using Logo3D */}
          <div className="absolute -left-4 -top-6 z-20 hidden sm:block lg:-left-8 lg:-top-8">
            <div className="rounded-[26px] border border-white/15 bg-white/10 p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-md">
              <Logo3D className="h-24 w-24 lg:h-32 lg:w-32" />
            </div>
          </div>

          <motion.div {...float(0.6)} className="absolute -right-3 bottom-10 hidden items-center gap-3 rounded-2xl border border-white/15 bg-white/95 px-4 py-3 shadow-card-hover backdrop-blur-md sm:flex">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
              <Award className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <p className="font-space text-lg font-bold leading-none text-navy-900">13+ yrs</p>
              <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider2 text-gray-500">Teaching</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

### `components/about/AboutStats.tsx` (animated count-up cards)
```tsx
"use client";
import CountUp from "react-countup";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, CalendarClock } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

type Stat = { icon: typeof GraduationCap; value: number; suffix?: string; label: string; separator?: string };
const stats: Stat[] = [
  { icon: GraduationCap, value: 10000, suffix: "+", label: "Students taught", separator: "," },
  { icon: CalendarClock, value: 13, suffix: "+", label: "Years teaching", separator: "" },
];
const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
const item: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } } };

export function AboutStats() {
  const reduce = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0, rootMargin: "0px 0px -10% 0px" });
  return (
    <div ref={ref} className="container-x">
      <motion.div variants={reduce ? undefined : container} initial={reduce ? undefined : "hidden"} whileInView={reduce ? undefined : "visible"} viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-gray-200 bg-gray-200/70 shadow-card-rest">
        {stats.map(({ icon: Icon, value, suffix, label, separator }) => (
          <motion.div key={label} variants={reduce ? undefined : item}
            className="group flex flex-col items-center gap-3 bg-white px-6 py-10 text-center transition-colors duration-300 hover:bg-cream-50">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500 transition-transform duration-300 ease-smooth group-hover:-translate-y-1">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <div className="flex items-baseline font-space text-[40px] font-bold leading-none text-navy-900 tabular-nums sm:text-[48px]">
              {reduce || !inView ? value.toLocaleString("en-US") : <CountUp end={value} duration={2} separator={separator} useEasing preserveValue />}
              {suffix ? <span className="text-gold-500">{suffix}</span> : null}
            </div>
            <p className="text-[12px] font-semibold uppercase tracking-wider2 text-gray-500">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
```

### `components/about/AboutInfoPanels.tsx` (uses SpotlightCard)
```tsx
"use client";
import { BookOpen, GraduationCap } from "lucide-react";
import SpotlightCard from "@/components/shared/SpotlightCard";

const SPOTLIGHT_LIGHT = "rgba(220, 38, 38, 0.1)";

function InfoPanel({ icon: Icon, title, items }: { icon: typeof GraduationCap; title: string; items: string[] }) {
  return (
    <SpotlightCard spotlightColor={SPOTLIGHT_LIGHT} className="rounded-2xl border border-gray-200 bg-cream-50 p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-navy-900" strokeWidth={1.75} />
        <h3 className="font-fraunces text-[20px] font-semibold text-navy-900">{title}</h3>
      </div>
      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 font-inter text-[14px] leading-relaxed text-gray-600">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
            {item}
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
}

export function AboutInfoPanels({ qualifications, offerings }: { qualifications: string[]; offerings: string[] }) {
  return (
    <div className="space-y-8">
      <InfoPanel icon={GraduationCap} title="Syllabi & topics" items={qualifications} />
      <InfoPanel icon={BookOpen} title="What you get as a student" items={offerings} />
    </div>
  );
}
```

### `components/about/AboutCTA.tsx`
```tsx
"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE, CTA_LABELS } from "@/lib/constants";
import { EASE_OUT } from "@/lib/motion";

export function AboutCTA() {
  const reduce = useReducedMotion();
  return (
    <section className="container-x pb-20 pt-4 lg:pb-28">
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 32 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: EASE_OUT }}
        className="relative isolate overflow-hidden rounded-[32px] bg-navy-900 px-8 py-14 text-center shadow-[0_30px_80px_-32px_rgba(10,39,64,0.6)] sm:px-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-navy-500/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-overlay opacity-[0.35]" />

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">Oct / Nov 2026 — Enrolment open</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-fraunces text-[30px] font-semibold leading-tight text-white sm:text-[42px]">
          Start Your Preparation with Confidence!
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
          Join students across Pakistan learning through live classes, recorded lectures, and focused exam preparation.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/register" className="btn-primary w-full justify-center sm:w-auto">
            {CTA_LABELS.enrollInterest}<ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <a href={SITE.orbedUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-white/30 bg-white/5 px-7 py-3.5 font-inter text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/15 sm:w-auto">
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            Ask a question
          </a>
        </div>
      </motion.div>
    </section>
  );
}
```
> Also available but not wired into the page by default: `AboutApproachCards` (3 "how I teach" cards) and `MetricCounter`. Grab them from the source repo if you want them.

---

## SECTION 3 — Co-Founder at Alpha card

**`components/about/AboutLeadership.tsx`** — navy card with grid/glow background and a gradient-bordered logo card (`aen-logo-black.png`).
```tsx
"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

export function AboutLeadership() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-cream-50 py-16 lg:py-24">
      <div className="container-x">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 32 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: EASE_OUT }}
          className="relative isolate overflow-hidden rounded-[32px] bg-navy-900 shadow-[0_40px_100px_-40px_rgba(10,39,64,0.65)]">
          <div aria-hidden className="absolute inset-0 bg-grid-overlay opacity-50" />
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-navy-500/40 blur-3xl" />

          <div className="relative grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-[1fr_0.92fr] lg:gap-16 lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-500">
                <span aria-hidden className="h-px w-8 bg-gold-500/60" />
                Beyond the classroom
              </span>
              <h2 className="mt-5 font-fraunces text-[30px] font-semibold leading-[1.1] tracking-[-0.01em] text-white sm:text-[40px] lg:text-[46px]">
                Co-Founder at <span className="italic text-gold-500">Alpha Education Network.</span>
              </h2>
              <p className="mt-5 max-w-xl font-inter text-[15px] leading-[1.8] text-white/75 sm:text-[16px]">
                Teaching is only part of the story. Sir Shehroz Iqbal co-founded Alpha Education Network to bring the same concept-first, exam-focused learning he&apos;s known for to students right across Pakistan.
              </p>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-tr from-gold-500/25 via-transparent to-navy-500/35 blur-2xl" />
                <div className="rounded-[28px] bg-gradient-to-br from-gold-500/70 via-white/25 to-navy-500/60 p-[1.5px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
                  <div className="relative overflow-hidden rounded-[26px] bg-white p-10 sm:p-12">
                    <Image src="/images/aen-logo-black.png" alt="Alpha Education Network — co-founded by Sir Shehroz Iqbal"
                      width={1640} height={541} sizes="(min-width: 1024px) 40vw, 90vw" className="relative z-10 h-auto w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## SECTION 4 — Affiliations card

### `data/affiliations.ts`
```ts
export type Affiliation = {
  name: string; logoSrc: string; href?: string; role?: string; scale?: number;
};

export const affiliations: Affiliation[] = [
  { name: "Kashan's Academy", logoSrc: "/images/kashans-academy.png", href: "https://www.facebook.com/KashansAcademy/", scale: 1.15 },
  { name: "Alpha College", logoSrc: "/images/alpha-college.png", href: "https://college.alpha.edu.pk/", scale: 1.28 },
  { name: "Orb-Ed", logoSrc: "/images/orbed.png", href: "https://orb-ed.pk/", scale: 1.12 },
];
```

### `components/layout/AffiliationsStack.tsx` (uses the Stack component)
```tsx
"use client";
import Image from "next/image";
import Stack from "@/components/shared/Stack";
import { affiliations } from "@/data/affiliations";

export function AffiliationsStack() {
  const cards = affiliations.map((a) => (
    <div key={a.name} className="flex h-full w-full items-center justify-center bg-gradient-to-b from-white to-cream-50 px-5 py-6 ring-1 ring-navy-900/10 sm:px-6 sm:py-7">
      <div className="relative h-full w-full min-h-[132px] max-h-[188px]">
        <Image src={a.logoSrc} alt={a.name} fill sizes="340px" className="object-contain object-center" style={{ transform: `scale(${a.scale ?? 1})` }} />
      </div>
    </div>
  ));
  return (
    <div className="relative h-[210px] w-[300px] shrink-0 select-none sm:h-[240px] sm:w-[340px]">
      <Stack cards={cards} randomRotation sensitivity={150} sendToBackOnClick autoplay autoplayDelay={2800} pauseOnHover animationConfig={{ stiffness: 260, damping: 22 }} />
    </div>
  );
}
```

### `components/layout/FooterAffiliations.tsx`
> Designed to sit in a **navy footer** (white text on dark). Wrap it in a dark container.
```tsx
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { AffiliationsStack } from "@/components/layout/AffiliationsStack";
import { affiliations } from "@/data/affiliations";

export function FooterAffiliations() {
  return (
    <section aria-labelledby="footer-affiliations-heading" className="pb-4">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-700/30 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(220,38,38,0.12),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-navy-500/25 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-xl text-center lg:text-left">
            <SectionEyebrow>Affiliations &amp; Partnerships</SectionEyebrow>
            <h2 id="footer-affiliations-heading" className="mt-3 font-fraunces text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-white sm:text-[34px]">
              Partnering with institutions <span className="italic text-gold-500">that inspire excellence.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-inter text-sm leading-relaxed text-white/60 lg:mx-0">
              Working alongside respected schools and learning platforms to deliver quality Accounting education across Pakistan.
            </p>

            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-wider2 lg:justify-start">
              {affiliations.map((a, i) => (
                <span key={a.name} className="inline-flex items-center gap-3">
                  {i > 0 ? <span aria-hidden className="text-gold-500/50">·</span> : null}
                  {a.href
                    ? <a href={a.href} target="_blank" rel="noopener noreferrer" className="text-white/45 transition-colors hover:text-gold-500">{a.name}</a>
                    : <span className="text-white/45">{a.name}</span>}
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
```

---

## SECTION 5 — Contact page (full)

Depends on `HoursCard`, `ContactMapSection`, `FeedbackForm`, plus `AnimateSection`/`AnimateIn`/`AnimateStagger`.

### `app/contact/page.tsx`
```tsx
import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { AnimateStagger, AnimateStaggerItem } from "@/components/shared/AnimateStagger";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { HoursCard } from "@/components/contact/HoursCard";
import { FeedbackForm } from "@/components/contact/FeedbackForm";
import { ContactMapSection } from "@/components/contact/ContactMapSection";
import { SITE } from "@/lib/constants";
import { buildMetadata, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Shehroz Iqbal | Accounting Tutor Karachi",
  titleAbsolute: true,
  description: "Get in touch with Shehroz Iqbal — Accounting tutor in Karachi…",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

      <AnimateSection index={0} instant className="bg-grid-white pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="container-x">
          <SectionEyebrow>Get In Touch</SectionEyebrow>
          <h1 className="mt-3 font-fraunces text-[44px] font-semibold italic leading-tight text-navy-900 sm:text-[56px]">Let&rsquo;s talk.</h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-gray-500">
            Have a question about a course, class timings, or anything else? Message Sir Shehroz directly — every query gets a personal reply.
          </p>
        </div>
      </AnimateSection>

      <AnimateSection index={1} className="bg-grid-white pb-12">
        <div className="container-x">
          <AnimateStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimateStaggerItem>
              <div className="card-rest rounded-2xl bg-cream-50 p-6 transition-all">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-navy-900"><Phone className="h-5 w-5" strokeWidth={1.75} /></div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">Chat & Support</p>
                <p className="mt-1.5 font-fraunces text-[20px] font-semibold text-navy-900">Message on Orb-Ed</p>
                <div className="mt-3 flex gap-3 text-sm font-medium">
                  <a href={SITE.orbedUrl} target="_blank" rel="noopener noreferrer" className="text-navy-900 hover:text-navy-500">Open Orb-Ed →</a>
                </div>
              </div>
            </AnimateStaggerItem>

            <AnimateStaggerItem>
              <div className="card-rest rounded-2xl bg-cream-50 p-6 transition-all">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-navy-900"><Mail className="h-5 w-5" strokeWidth={1.75} /></div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">Email</p>
                <p className="mt-1.5 font-fraunces text-[20px] font-semibold text-navy-900">{SITE.email}</p>
                <a href={`mailto:${SITE.email}`} className="mt-3 inline-block text-sm font-medium text-navy-900 hover:text-navy-500">Send an email →</a>
              </div>
            </AnimateStaggerItem>

            <AnimateStaggerItem>
              <div className="card-rest rounded-2xl bg-cream-50 p-6 transition-all">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-navy-900"><MapPin className="h-5 w-5" strokeWidth={1.75} /></div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">Visit</p>
                <p className="mt-1.5 font-fraunces text-[18px] font-semibold leading-snug text-navy-900">{SITE.address}</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(SITE.address)}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-navy-900 hover:text-navy-500">Get directions →</a>
              </div>
            </AnimateStaggerItem>
          </AnimateStagger>

          <AnimateIn direction="up" delay={0.15} className="mt-5"><HoursCard /></AnimateIn>
        </div>
      </AnimateSection>

      <AnimateSection index={2} className="bg-grid-white pb-12 lg:pb-16">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Feedback</SectionEyebrow>
            <h2 className="mt-3 font-fraunces text-[32px] font-semibold italic leading-tight text-navy-900 sm:text-[40px]">We&rsquo;d love to hear from you.</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-500">Share your experience, suggestions, or questions. Every message is read by Sir Shehroz&rsquo;s team.</p>
          </div>
          <AnimateIn direction="up" delay={0.1} className="mx-auto mt-10 max-w-2xl"><FeedbackForm /></AnimateIn>
        </div>
      </AnimateSection>

      <AnimateSection index={3} className="bg-grid-white pb-20 lg:pb-24">
        <div className="container-x"><AnimateIn direction="up" delay={0.1}><ContactMapSection /></AnimateIn></div>
      </AnimateSection>
    </>
  );
}
```

### `components/contact/HoursCard.tsx`
```tsx
import { SITE } from "@/lib/constants";

function formatTime(hour: number, minute: number) {
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return minute === 0 ? `${hour12}:00 ${period}` : `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}

export function HoursCard() {
  const { monThu, friSat } = SITE.openHours;
  return (
    <div className="rounded-2xl bg-cream-50 p-6 lg:p-8">
      <h3 className="font-fraunces text-[22px] font-semibold text-navy-900">Class & Office Hours</h3>
      <dl className="mt-4 grid grid-cols-1 gap-x-12 gap-y-2 text-[14px] sm:grid-cols-2">
        <div><dt className="font-semibold text-navy-900">Monday – Thursday</dt><dd className="text-gray-500">{formatTime(monThu.startHour, monThu.startMinute)} – {formatTime(monThu.endHour, monThu.endMinute)}</dd></div>
        <div><dt className="font-semibold text-navy-900">Friday – Saturday</dt><dd className="text-gray-500">{formatTime(friSat.startHour, friSat.startMinute)} – {formatTime(friSat.endHour, friSat.endMinute)}</dd></div>
        <div><dt className="font-semibold text-navy-900">Sunday</dt><dd className="text-gray-500">Closed</dd></div>
      </dl>
    </div>
  );
}
```

### `components/contact/ContactMapSection.tsx`
```tsx
import { MapPin, Navigation } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { SITE } from "@/lib/constants";

const directionsUrl = `https://maps.google.com/?q=${encodeURIComponent(SITE.address)}`;

export function ContactMapSection() {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow>Find Us</SectionEyebrow>
        <h2 className="mt-3 font-fraunces text-[32px] font-semibold italic leading-tight text-navy-900 sm:text-[40px]">Visit Alpha College.</h2>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-3xl border border-gray-200/90 bg-navy-900 shadow-card-hover ring-1 ring-navy-900/5">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-navy-900 via-gold-500 to-navy-900" />
        <div className="relative aspect-[4/3] min-h-[300px] sm:aspect-[16/10] sm:min-h-[380px] lg:min-h-[440px]">
          <iframe src={SITE.mapEmbed} width="100%" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Alpha College, Karachi" className="absolute inset-0 h-full w-full border-0" allowFullScreen />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/50 via-navy-900/5 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[min(100%,22rem)] lg:bottom-8 lg:left-8">
            <div className="rounded-2xl border border-white/20 bg-white/95 p-5 shadow-[0_16px_48px_rgba(11,37,69,0.18)] backdrop-blur-md sm:p-6">
              <div className="flex items-start gap-3">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-navy-900"><MapPin className="h-5 w-5" strokeWidth={1.75} aria-hidden /></div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">Alpha College</p>
                  <p className="mt-1 font-fraunces text-[17px] font-semibold leading-snug text-navy-900">{SITE.address}</p>
                </div>
              </div>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full justify-center px-5 py-3 text-[14px] sm:w-auto">
                <Navigation className="h-4 w-4" strokeWidth={2} aria-hidden />Get directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### `components/contact/FeedbackForm.tsx`
> Posts to `FEEDBACK_ENDPOINT` (a Google Apps Script `/exec` URL) as `no-cors`. Swap for your own API route if you have a backend.
```tsx
"use client";
import { useState, cloneElement, isValidElement, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { FEEDBACK_ENDPOINT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(10, "Please write at least a few words").max(2000, "Message is too long (max 2000 characters)"),
  botcheck: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;
type Status = "idle" | "submitting" | "success" | "error";

export function FeedbackForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "", botcheck: "" },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.botcheck) return;
    setStatus("submitting"); setServerError(null);
    if (!FEEDBACK_ENDPOINT) {
      setStatus("error");
      setServerError("The feedback form isn't configured yet. Please use email in the meantime.");
      return;
    }
    try {
      await fetch(FEEDBACK_ENDPOINT, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ name: values.name, email: values.email, message: values.message }),
      });
      trackEvent("contact_submit", { form: "feedback" });
      setStatus("success"); reset();
    } catch {
      setStatus("error");
      setServerError("Couldn't reach the server. Check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold-500/30 bg-cream-50 p-8 text-center sm:p-10">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15 text-navy-900"><CheckCircle2 className="h-7 w-7" strokeWidth={1.75} /></div>
        <h3 className="mt-5 font-fraunces text-2xl font-semibold text-navy-900">Thank you for your feedback</h3>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-gray-500">Your message has been received. We appreciate you taking the time to share your thoughts.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-outline-navy mt-7">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card-rest sm:p-8">
      <input type="checkbox" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" {...register("botcheck")} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Your name" error={errors.name?.message}>
          <input type="text" autoComplete="name" placeholder="e.g. Ahmed Khan" className={cn("input-field", errors.name && fieldErrorClass)} {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" autoComplete="email" placeholder="you@example.com" className={cn("input-field", errors.email && fieldErrorClass)} {...register("email")} />
        </Field>
      </div>
      <Field label="Your feedback" error={errors.message?.message} className="mt-5">
        <textarea rows={5} placeholder="Share your experience, suggestions, or any questions…" className={cn("input-field min-h-[8rem] resize-y", errors.message && fieldErrorClass)} {...register("message")} />
      </Field>
      {status === "error" && serverError && (
        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
      )}
      <button type="submit" disabled={status === "submitting"} className="btn-primary mt-6 w-full justify-center sm:w-auto">
        {status === "submitting"
          ? <><Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />Sending…</>
          : <>Send feedback<ArrowRight className="h-4 w-4" strokeWidth={2} /></>}
      </button>
    </form>
  );
}

const fieldErrorClass = "border-red-300 focus:border-red-400 focus:ring-red-400/20";

function Field({ label, error, children, className }:
  { label: string; error?: string; children: React.ReactNode; className?: string }) {
  const errorId = `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-error`;
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })
    : children;
  return (
    <label className={cn("block", className)}>
      <span className="label-mini">{label}<span aria-hidden="true" className="text-red-500"> *</span></span>
      {control}
      {error && <span id={errorId} role="alert" className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
```

---

## SECTION 6 — Blog

Blog content is data-driven. Provide the types, a `posts` array, then the index + card + detail page.

### `lib/blogTypes.ts`
```ts
export type BlogBodyBlock = { type: "p" | "h2" | "quote" | "callout"; text: string };
export type BlogCategory =
  | "Study Guide" | "Exam Technique" | "Concept Explainer" | "O Level"
  | "Tuition & Learning" | "Exam Boards" | "Exam Preparation" | "Exam Tips"
  | "Concepts" | "Past Papers" | "News";
export type BlogPost = {
  slug: string; title: string; category: BlogCategory; excerpt: string;
  cover: string; date: string; readingTime: string;
  featured?: boolean; keywords?: string[]; body: BlogBodyBlock[];
};
```

### `data/posts.ts`
Provide your own `postsContent.ts` exporting a `posts: BlogPost[]` array. Example content file:
```ts
// data/postsContent.ts
import type { BlogPost } from "@/lib/blogTypes";
export const posts: BlogPost[] = [
  {
    slug: "how-to-study-accounting-a-level-complete-guide",
    title: "How to Study A Level Accounting: A Complete Guide",
    category: "Study Guide",
    excerpt: "A practical, exam-focused approach to mastering A Level Accounting.",
    cover: "/images/blog/study-guide.jpg",
    date: "2026-01-10",
    readingTime: "8 min read",
    featured: true,
    keywords: ["A Level Accounting", "study guide"],
    body: [
      { type: "p", text: "Opening paragraph…" },
      { type: "h2", text: "Start with the concepts" },
      { type: "p", text: "…" },
      { type: "quote", text: "Understanding beats memorising every time." },
      { type: "callout", text: "Tip: rework every past paper question you get wrong." },
    ],
  },
  // …more posts
];
```
```ts
// data/posts.ts
import { posts } from "./postsContent";
export type { BlogBodyBlock, BlogCategory, BlogPost } from "@/lib/blogTypes";
import type { BlogPost } from "@/lib/blogTypes";
export { posts };
export const featuredPost = posts.find((p) => p.featured) ?? posts[0];
export const otherPosts = posts.filter((p) => !p.featured);
export function getBlogPreviewPosts(limit = 4): BlogPost[] {
  const byDate = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const featured = byDate.find((p) => p.featured);
  if (!featured) return byDate.slice(0, limit);
  return [featured, ...byDate.filter((p) => p.slug !== featured.slug)].slice(0, limit);
}
```

### `app/blog/page.tsx`
```tsx
import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Accounting Blog — CAIE A Level",
  description: "Accounting study guides, exam technique, and concept explainers…",
  path: "/blog",
});

export default function BlogPage() { return <BlogIndex />; }
```

### `components/blog/BlogIndex.tsx`
```tsx
"use client";
import { useMemo, startTransition, useRef, useState } from "react";
import VariableProximity from "@/components/shared/VariableProximity";
import SpotlightCard from "@/components/shared/SpotlightCard";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { BlogCard } from "./BlogCard";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AnimateStagger, AnimateStaggerItem } from "@/components/shared/AnimateStagger";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { featuredPost, otherPosts, posts, type BlogPost } from "@/data/posts";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))] as const;

export function BlogIndex() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered: BlogPost[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return otherPosts.filter((p) => {
      const inCategory = activeCategory === "All" || (p.category as string) === activeCategory;
      const inQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || (p.keywords?.some((k) => k.toLowerCase().includes(q)) ?? false);
      return inCategory && inQuery;
    });
  }, [activeCategory, query]);

  return (
    <>
      <AnimateSection index={0} instant className="bg-cream-50 pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div ref={heroRef} className="container-x relative">
          <SectionEyebrow>The Blog</SectionEyebrow>
          <h1 className="mt-3 max-w-3xl font-fraunces text-[40px] font-semibold italic leading-[1.05] tracking-[-0.02em] text-navy-900 sm:text-[56px]">
            Accounting, exams, and{" "}
            <VariableProximity label="everything in between." containerRef={heroRef} radius={160} falloff="gaussian"
              fromFontVariationSettings="'wght' 500, 'opsz' 40" toFontVariationSettings="'wght' 800, 'opsz' 80" />
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-gray-500">
            Tips, walkthroughs, and concept explainers — updated weekly to give you the competitive edge in your academic journey.
          </p>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full max-w-sm">
              <span className="sr-only">Search articles</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" strokeWidth={2} />
              <input type="text" value={query} onChange={(e) => startTransition(() => setQuery(e.target.value))} placeholder="Search articles…"
                className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20" />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((c) => (
                <button key={c} onClick={() => startTransition(() => setActiveCategory(c))}
                  className={cn("rounded-full px-4 py-2 text-[13px] font-medium transition-all",
                    activeCategory === c ? "bg-gold-500 text-white" : "border border-gray-200 bg-white text-navy-900 hover:bg-cream-50")}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </AnimateSection>

      <AnimateSection index={1} className="bg-gray-50 py-12 lg:py-16">
        <div className="container-x">
          <SpotlightCard spotlightColor="rgba(220, 38, 38, 0.14)" className="card-rest overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <Link href={`/blog/${featuredPost.slug}`} className="group grid lg:grid-cols-[1.2fr_1fr]">
              <div className="relative aspect-[16/10] w-full lg:aspect-auto">
                <Image src={featuredPost.cover} alt={featuredPost.title} width={1200} height={750} loading="lazy" sizes="(min-width: 1024px) 60vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className="inline-flex w-fit items-center rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider2 text-white">Featured · {featuredPost.category}</span>
                <h2 className="mt-5 font-fraunces text-[26px] font-semibold leading-tight text-navy-900 sm:text-[34px]">{featuredPost.title}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-500">{featuredPost.excerpt}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-gold-500/30">
                    <Image src="/images/avatar.png" alt="Author" width={40} height={40} loading="lazy" sizes="40px" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <p className="text-[13px] text-gray-500"><span className="font-semibold text-navy-900">Sir Shehroz Iqbal</span> · {featuredPost.readingTime}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">Read article<ArrowRight className="h-4 w-4" strokeWidth={2} /></span>
              </div>
            </Link>
          </SpotlightCard>
        </div>
      </AnimateSection>

      <AnimateSection index={2} className="bg-grid-white py-16 lg:py-20">
        <div className="container-x">
          {filtered.length > 0 ? (
            <AnimateStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filtered.map((p) => <AnimateStaggerItem key={p.slug} className="h-full"><BlogCard post={p} /></AnimateStaggerItem>)}
            </AnimateStagger>
          ) : <p className="text-center text-gray-500">No posts match your filters yet.</p>}
        </div>
      </AnimateSection>
    </>
  );
}
```

### `components/blog/BlogCard.tsx`
```tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/posts";
import { MotionCard } from "@/components/shared/MotionCard";
import SpotlightCard from "@/components/shared/SpotlightCard";

const SPOTLIGHT_LIGHT = "rgba(220, 38, 38, 0.12)";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <MotionCard as="article" className="h-full">
      <SpotlightCard spotlightColor={SPOTLIGHT_LIGHT} className="h-full overflow-hidden rounded-2xl border border-gray-200/80 glass-card">
        <Link href={`/blog/${post.slug}`} className="group flex h-full min-h-0 flex-col">
          <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
            <Image src={post.cover} alt={post.title} width={1200} height={675} loading="lazy" sizes="(min-width: 1024px) 400px, 100vw"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <span className="inline-flex w-fit rounded-full bg-gold-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider2 text-navy-900">{post.category}</span>
            <h3 className="mt-3 line-clamp-3 min-h-[4.75rem] font-fraunces text-[19px] font-semibold leading-snug text-navy-900 transition-colors group-hover:text-gold-500">{post.title}</h3>
            <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-[14px] leading-relaxed text-gray-500">{post.excerpt}</p>
            <p className="mt-auto pt-4 text-[13px] text-gray-500">{post.date} · {post.readingTime}</p>
          </div>
        </Link>
      </SpotlightCard>
    </MotionCard>
  );
}
```

### `components/blog/TOC.tsx`
```tsx
"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string };

export function TOC({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
    }, { rootMargin: "-30% 0px -55% 0px", threshold: 0 });
    headings.forEach((h) => { const el = document.getElementById(h.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [headings]);
  if (headings.length === 0) return null;
  return (
    <aside className="hidden lg:block">
      <p className="text-[11px] font-semibold uppercase tracking-wider2 text-navy-900">In This Article</p>
      <ul className="mt-4 space-y-2 border-l border-gray-200">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className={cn("block border-l-2 -ml-px py-1 pl-4 text-[14px] transition-colors",
              active === h.id ? "border-gold-500 font-semibold text-navy-900" : "border-transparent text-gray-500 hover:text-navy-900")}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
```

### `components/blog/ShareRail.tsx`
```tsx
"use client";
import { Copy, MessageCircle } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { SITE } from "@/lib/constants";

const FacebookIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
);
const TwitterIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);

export function ShareRail({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true); setTimeout(() => setCopied(false), 1500);
      trackEvent("blog_share", { channel: "copy", slug });
    } catch {}
  };

  const links = [
    { label: "WhatsApp", icon: MessageCircle, href: `https://wa.me/${SITE.whatsappNumber}?text=${encodedTitle}%20${encodedUrl}`, bg: "bg-whatsapp", channel: "whatsapp" },
    { label: "Facebook", icon: FacebookIcon, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, bg: "bg-navy-900", channel: "facebook" },
    { label: "X / Twitter", icon: TwitterIcon, href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, bg: "bg-ink-900", channel: "twitter" },
  ];

  return (
    <div className="flex flex-col items-start gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">Share</p>
      <div className="flex flex-row items-center gap-2 lg:flex-col">
        {links.map(({ label, icon: Icon, href, bg, channel }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}
            onClick={() => trackEvent("blog_share", { channel, slug })}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-0.5 ${bg}`}>
            <Icon className="h-4 w-4" strokeWidth={2} />
          </a>
        ))}
        <button onClick={onCopy} aria-label="Copy link" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-navy-900 transition-transform hover:-translate-y-0.5">
          <Copy className="h-4 w-4" strokeWidth={2} />
          {copied && <span className="absolute left-12 whitespace-nowrap rounded-md bg-navy-900 px-2 py-1 text-[11px] font-semibold text-white">Copied!</span>}
        </button>
      </div>
    </div>
  );
}
```

### `app/blog/[slug]/page.tsx`
> The source uses a `RegistrationBanner` at the bottom — omitted here; replace with your own CTA or delete.
```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Lightbulb } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { ShareRail } from "@/components/blog/ShareRail";
import { TOC } from "@/components/blog/TOC";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AnimateStagger, AnimateStaggerItem } from "@/components/shared/AnimateStagger";
import { posts } from "@/data/posts";
import { blogSeoTitle, buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim().replace(/\s+/g, "-");
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type BlogPageParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: BlogPageParams }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return buildMetadata({ title: "Post not found" });
  return buildMetadata({
    title: blogSeoTitle(post.slug, post.title),
    description: post.excerpt, path: `/blog/${post.slug}`, image: post.cover,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: { params: BlogPageParams }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const headings = post.body.filter((b) => b.type === "h2").map((b) => ({ id: slugify(b.text), text: b.text }));
  const related = posts.filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 0) - (b.category === post.category ? -1 : 0))
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: post.title, description: post.excerpt, image: post.cover, datePublished: post.date,
    author: { "@type": "Person", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <AnimateSection index={0} instant className="bg-grid-white pt-12 lg:pt-20">
        <article>
          <div className="container-x">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_minmax(0,720px)_240px] lg:gap-12">
              <div className="hidden lg:block"><div className="sticky top-28"><TOC headings={headings} /></div></div>

              <main className="min-w-0">
                <span className="inline-flex items-center rounded-full bg-gold-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider2 text-navy-900">{post.category}</span>
                <h1 className="mt-5 font-fraunces text-[36px] font-semibold italic leading-[1.1] tracking-[-0.01em] text-navy-900 sm:text-[48px]">{post.title}</h1>
                <div className="mt-6 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gold-500/30">
                    <Image src="/images/avatar.png" alt="Author" width={48} height={48} loading="lazy" sizes="48px" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-inter text-base font-semibold text-navy-900">Sir Shehroz Iqbal</p>
                    <p className="text-[13px] text-gray-500">{post.date} · {post.readingTime}</p>
                  </div>
                </div>

                <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-card-rest">
                  <Image src={post.cover} alt={post.title} width={1200} height={675} priority loading="eager" sizes="(min-width: 1024px) 720px, 100vw" className="absolute inset-0 h-full w-full object-cover" />
                </div>

                <div className="mt-10 space-y-6 font-inter text-[17px] leading-[1.8] text-ink-900">
                  {post.body.map((block, i) => {
                    if (block.type === "p") return <p key={i}>{block.text}</p>;
                    if (block.type === "h2") return <h2 key={i} id={slugify(block.text)} className="!mt-12 font-fraunces text-[28px] font-semibold leading-tight text-navy-900">{block.text}</h2>;
                    if (block.type === "quote") return <blockquote key={i} className="border-l-[3px] border-gold-500 pl-6 font-fraunces text-[22px] italic text-navy-900">{block.text}</blockquote>;
                    if (block.type === "callout") return (
                      <div key={i} className="flex gap-4 rounded-xl border-l-[3px] border-gold-500 bg-cream-50 p-5">
                        <Lightbulb className="h-5 w-5 flex-none text-navy-900" strokeWidth={1.75} />
                        <p className="text-[15px] leading-relaxed text-navy-900">{block.text}</p>
                      </div>
                    );
                    return null;
                  })}
                </div>
              </main>

              <aside className="space-y-8 lg:max-w-[240px]">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card-rest">
                  <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full ring-2 ring-gold-500/30">
                    <Image src="/images/avatar.png" alt="Author" width={64} height={64} loading="lazy" sizes="64px" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <p className="mt-4 text-center font-fraunces text-[18px] font-semibold text-navy-900">Sir Shehroz Iqbal</p>
                  <p className="mt-1 text-center text-[12px] text-gray-500">Accounting tutor · CAIE & Edexcel</p>
                  <p className="mt-3 text-center text-[13px] leading-relaxed text-gray-500">13+ years of teaching. 1,250+ students.</p>
                  <Link href="/courses/as-level" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-gold-500 hover:text-white">
                    View courses<ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </Link>
                </div>
                <div className="lg:sticky lg:top-28"><ShareRail title={post.title} slug={post.slug} /></div>
              </aside>
            </div>
          </div>
        </article>
      </AnimateSection>

      <AnimateSection index={1} className="bg-grid-white pb-20 pt-12">
        <div className="container-x">
          <div className="mx-auto h-0.5 w-20 bg-gold-500" />
          <h3 className="mt-10 text-center font-fraunces text-[26px] font-semibold text-navy-900">Read next.</h3>
          <AnimateStagger className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((p) => <AnimateStaggerItem key={p.slug} className="h-full"><BlogCard post={p} /></AnimateStaggerItem>)}
          </AnimateStagger>
        </div>
      </AnimateSection>
    </>
  );
}
```

---

## Linking map (change these for your site)

| Where | Link | Source |
|---|---|---|
| Ecosystem hub center | `https://orb-ed.pk/` | hardcoded in `AboutEcosystem.tsx` |
| "Contact on Orb-Ed", "Ask a question", "Open Orb-Ed" | `SITE.orbedUrl` | `lib/constants.ts` |
| About hero "Explore my courses" | `/courses/as-level` | `AboutHero.tsx` |
| About CTA "Enroll" | `/register` | `AboutCTA.tsx` |
| Contact "About" story link | `/contact` | `about/page.tsx` |
| Contact email | `mailto:${SITE.email}` | `constants` |
| Contact directions / map | `SITE.address`, `SITE.mapEmbed` | `constants` |
| Affiliation logos | `affiliations[].href` | `data/affiliations.ts` |
| Blog cards / featured / related | `/blog/${slug}` | data-driven |
| Blog share buttons | WhatsApp / FB / X share URLs | `ShareRail.tsx` |
| Blog author "View courses" | `/courses/as-level` | `[slug]/page.tsx` |

## Adaptation checklist
1. Set `@/*` path alias in `tsconfig.json`.
2. Merge the Tailwind `extend` block + global CSS.
3. Wire the 3 font variables in `layout.tsx`.
4. Edit `lib/constants.ts` (`SITE`) — this controls all site-wide links, address, hours, socials.
5. Replace `/public/images/*` assets.
6. Recolor by editing the `navy`/`gold`/`cream` tokens only — every component references them, so the whole set re-themes at once. (`gold` = your accent color.)
7. Optional removals: `Logo3D` (About hero), `VariableProximity` (replace with plain text), `RegistrationBanner` (blog post CTA), analytics (`trackEvent` is a safe no-op if GA isn't set up).
