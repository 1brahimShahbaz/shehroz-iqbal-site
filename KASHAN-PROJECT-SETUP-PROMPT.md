# Kashan Iqbal Website — Project Setup Prompt

Copy everything inside the **Prompt** block below and paste it into Cursor (or give it to a developer).  
You already have the website code from the Shehroz Iqbal reference repo — this prompt is **only for initializing the project, installing dependencies, and configuring the environment**.

---

## Prompt

```
You are setting up a NEW Next.js project for **Kashan Iqbal's teacher website**.

I already have the full website source code (cloned/adapted from the Shehroz Iqbal accounting tutor site). Your job is NOT to redesign the site — only to:

1. Create / verify the Next.js project scaffold
2. Install all required npm packages (same stack as reference)
3. Configure TypeScript, Tailwind, PostCSS, Next.js for static export
4. Set up environment variables
5. Verify `npm run dev` and `npm run build` work
6. Prepare the repo for GitHub (no large media in git)

---

## What this website is

- **One domain, three subjects:** Accounting, Maths, Stocks
- **Start screen (`/`):** 3 buttons → `/accounting`, `/maths`, `/stocks`
- **Accounting & Maths:** Same page structure as Shehroz Iqbal site (see SITE-PAGE-SECTIONS-GUIDE.md)
- **Stocks:** Same pages + PSX market section + modern trading theme
- **Deploy:** Static export → upload `out/` folder to cPanel (Apache)

Reference docs in the Shehroz repo:
- `SITE-PAGE-SECTIONS-GUIDE.md` — every section per page
- `KASHAN-IQBAL-WEBSITE-BLUEPRINT.md` — architecture & themes
- `WEBSITE-DESIGN-GUIDE.md` — design system

---

## Tech stack (must match reference)

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 16** (App Router) |
| React | **18.x** |
| Language | **TypeScript 5** |
| Styling | **Tailwind CSS 3.4** |
| Fonts | **next/font** — Fraunces, Inter, Space Grotesk |
| Animation | **Framer Motion 12**, **GSAP 3** |
| Carousel | **Embla Carousel 8** + autoplay plugin |
| Forms | **react-hook-form 7** + **zod 4** + **@hookform/resolvers** |
| Icons | **lucide-react** |
| PDF preview | **pdfjs-dist 5** |
| Stats counter | **react-countup** |
| Scroll reveal | **react-intersection-observer** |
| Utils | **clsx**, **tailwind-merge**, **class-variance-authority** |
| SEO | **next-seo**, **next-sitemap** (or app/sitemap.ts) |
| Images (build) | **sharp** |
| Export mode | **`output: 'export'`** in next.config |

---

## Step 1 — Prerequisites

Ensure installed on the machine:

- **Node.js 20 LTS** or newer (`node -v`)
- **npm 10+** (`npm -v`)
- **Git**

Optional: GitHub Desktop for pushing (media excluded from git — see Step 8).

---

## Step 2 — Create project (if starting empty folder)

If the code is not in the folder yet, create the app first:

```bash
npx create-next-app@latest kashan-iqbal-site --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd kashan-iqbal-site
```

Then copy the Shehroz/Kashan codebase into this folder (app/, components/, lib/, data/, public/, etc.).

If the code is **already** in the folder, skip create-next-app and go to Step 3.

---

## Step 3 — Install all dependencies

Run from project root:

```bash
npm install next@^16 react@^18 react-dom@^18

npm install framer-motion gsap embla-carousel-react embla-carousel-autoplay

npm install lucide-react clsx tailwind-merge class-variance-authority

npm install react-hook-form @hookform/resolvers zod

npm install react-countup react-intersection-observer

npm install pdfjs-dist sharp

npm install next-seo next-sitemap @next/third-parties

npm install -D typescript @types/node @types/react @types/react-dom

npm install -D tailwindcss postcss eslint eslint-config-next

npm install -D to-ico
```

Or copy `package.json` from the Shehroz reference repo and run:

```bash
npm install
```

---

## Step 4 — Required config files

Verify these exist and match the reference:

### `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  compress: true,
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
};

export default nextConfig;
```

Static export is required for cPanel — no Node server in production.

### `tsconfig.json`

- Path alias: `"@/*": ["./*"]`
- `"strict": true`
- Exclude bulky non-app folders from compile if present

### `tailwind.config.ts`

- Content paths: `./app/**`, `./components/**`
- Custom colours: navy, gold (accent), cream, ink, whatsapp
- Custom fonts: fraunces, inter, space
- Extend shadows, animations (fade-up, pulse-ring, float)

### `postcss.config.mjs`

```js
const config = {
  plugins: { tailwindcss: {} },
};
export default config;
```

### `app/globals.css`

- `@tailwind base/components/utilities`
- Component classes: `.btn-primary`, `.container-x`, `.eyebrow`, `.card-rest`, `.bg-grid-white`, etc.

---

## Step 5 — Environment variables

Create `.env.local` from template (do NOT commit this file):

```env
NEXT_PUBLIC_SITE_URL=https://kashaniqbal.com

NEXT_PUBLIC_GA_ID=

NEXT_PUBLIC_ANALYTICS_ENABLED=true

NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=

# Google Apps Script Web App URLs (/exec)
NEXT_PUBLIC_REGISTRATION_ENDPOINT=
NEXT_PUBLIC_FEEDBACK_ENDPOINT=
```

For local dev:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Create **separate Google Sheets + Apps Script endpoints** for Kashan (or one sheet with tabs for accounting / maths / stocks registration).

---

## Step 6 — Folder structure (Kashan multi-subject)

After copying code, ensure routes exist:

```
app/
  page.tsx                 → Start screen (3 subject buttons)
  layout.tsx               → Root layout (fonts, global shell)
  globals.css

  accounting/
    layout.tsx             → data-subject="accounting" theme
    page.tsx               → Home (Shehroz structure)
    about/, contact/, register/, notes/, extra-credit/, blog/, courses/

  maths/
    layout.tsx             → data-subject="maths" theme
    ... (mirror accounting)

  stocks/
    layout.tsx             → data-subject="stocks" theme
    page.tsx               → Home + PSX market section
    ... (same page list)

lib/
  subjects/
    accounting.config.ts
    maths.config.ts
    stocks.config.ts

data/
  accounting/
  maths/
  stocks/

public/
  images/
    logo.png               → Same logo all subjects
    accounting/
    maths/
    stocks/
  videos/                  → GITIGNORE (host on cPanel, not GitHub)
  notes/                   → GITIGNORE
```

---

## Step 7 — Scripts in package.json

Ensure these scripts exist:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint app components lib data --ext .ts,.tsx",
    "generate:blog": "npx tsx scripts/generate-blog-posts.ts",
    "generate:favicons": "node scripts/generate-favicons.mjs",
    "prebuild": "npm run generate:blog && npm run generate:favicons",
    "postbuild": "node scripts/prune-export.cjs"
  }
}
```

Install tsx for blog generation if used:

```bash
npm install -D tsx
```

---

## Step 8 — Git & large files

Add to `.gitignore`:

```
/node_modules
/.next
/out
.env*.local

# Large media — deploy via cPanel, not GitHub
/public/videos/
/public/notes/
```

GitHub rejects files over 100MB. Videos and PDF notes stay on disk locally and upload to hosting with `out/` after build.

---

## Step 9 — Verify setup

Run in order:

```bash
npm install
npm run dev
```

Open http://localhost:3000 — start screen with 3 buttons should load.

Then:

```bash
npm run build
```

Confirm `out/` folder is created with:
- `_next/`
- `accounting/`, `maths/`, `stocks/` (or equivalent routes)
- `sitemap.xml`, `robots.txt`, `.htaccess`
- `index.html` (start screen)

Fix any TypeScript or missing import errors before committing.

---

## Step 10 — Fonts in root layout

In `app/layout.tsx`, load via next/font/google:

```tsx
import { Fraunces, Inter, Space_Grotesk } from "next/font/google";
```

Apply CSS variables on `<html>`:
- `--font-fraunces`
- `--font-inter`
- `--font-space-grotesk`

Body: `className="font-inter"`

---

## Libraries → what they power (quick map)

| Package | Used for |
|---------|----------|
| framer-motion | Header animation, scroll reveals, page transitions |
| gsap | StaggeredMenu (mobile nav), Masonry gallery |
| embla-carousel-react | Hero banner carousel (3 slides) |
| embla-carousel-autoplay | 6s auto-advance on hero |
| lucide-react | All icons (nav, buttons, cards) |
| react-hook-form + zod | Register & contact forms |
| react-countup | About page stats (10,000+ students) |
| react-intersection-observer | Trigger count-up on scroll |
| pdfjs-dist | In-browser PDF note preview |
| sharp | Favicon generation script |
| clsx + tailwind-merge | `cn()` utility for class names |

---

## Do NOT install (not used in reference site)

- No database (Prisma, MongoDB) — static site + Google Sheets for forms
- No auth library — LMS is external (Orb-Ed or Kashan's LMS links)
- No CSS-in-JS (styled-components, emotion) — Tailwind only
- No Redux/Zustand — minimal client state in components

---

## Deliverables when setup is complete

1. `npm run dev` runs without errors
2. `npm run build` produces `out/` static export
3. `.env.local.example` committed (no secrets)
4. `.gitignore` excludes videos/notes
5. README with: dev command, build command, cPanel deploy note
6. GitHub repo pushed (code only, ~80MB max)

Do not change page structure or design during setup — only scaffold, deps, config, and env.
```

---

## Quick one-liner (short version)

If you only need a minimal prompt:

> Set up a Next.js 16 App Router + TypeScript + Tailwind 3 project for static export (`output: 'export'`). Install: framer-motion, gsap, embla-carousel-react, embla-carousel-autoplay, lucide-react, react-hook-form, zod, @hookform/resolvers, react-countup, react-intersection-observer, pdfjs-dist, sharp, clsx, tailwind-merge, next-seo. Fonts: Fraunces, Inter, Space Grotesk via next/font. Create `.env.local` from `.env.local.example`. Gitignore `/public/videos/` and `/public/notes/`. Verify `npm run dev` and `npm run build` → `out/` folder. Code is already copied from Shehroz tutor site — accounting/maths/stocks routes at `/accounting`, `/maths`, `/stocks` with start screen at `/`. No redesign, setup only.

---

*Reference repo: shehroz-iqbal-site · July 2026*
