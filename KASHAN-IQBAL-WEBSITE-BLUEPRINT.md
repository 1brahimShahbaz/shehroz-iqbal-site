# Kashan Iqbal — Teacher Website Blueprint

> **Yeh document kya hai?**  
> Kashan Iqbal ke liye **ek teacher website** jisme teen subjects hain: **Accounting**, **Maths**, aur **Stocks**.  
> Website open hone par pehli screen par **3 options** dikhengi — user apna subject choose karega aur usi section par redirect ho jayega (`/accounting`, `/maths`, ya `/stocks`).  
> **Accounting** aur **Maths** ka structure **bilkul Shehroz Iqbal site jaisa** hoga — same pages, same sections — sirf **theme** aur **content** (videos, notes, PDFs) alag hoga.  
> **Stocks** section modern look mein hoga — numbers, Pakistan Stock Exchange (PSX) updates, trading/investment theme.

**Reference site (Accounting & Maths):** [shehroz-iqbal-site](https://github.com/1brahimShahbaz/shehroz-iqbal-site) — detail ke liye `WEBSITE-DESIGN-GUIDE.md`  
**Suggested domain:** `kashaniqbal.com`

---

## Table of contents

1. [Website overview](#1-website-overview)
2. [Start screen — 3 subject options](#2-start-screen--3-subject-options)
3. [How the user moves through the site](#3-how-the-user-moves-through-the-site)
4. [URLs & folder structure](#4-urls--folder-structure)
5. [Accounting section (Shehroz site clone)](#5-accounting-section-shehroz-site-clone)
6. [Maths section (Shehroz site clone, different theme)](#6-maths-section-shehroz-site-clone-different-theme)
7. [Stocks section (modern + PSX updates)](#7-stocks-section-modern--psx-updates)
8. [Three themes — same logo](#8-three-themes--same-logo)
9. [Shared code vs subject-specific content](#9-shared-code-vs-subject-specific-content)
10. [Stocks: PSX market display](#10-stocks-psx-market-display)
11. [SEO & branding](#11-seo--branding)
12. [Build phases](#12-build-phases)
13. [Content checklist (Kashan se collect karein)](#13-content-checklist-kashan-se-collect-karein)
14. [Decisions worksheet](#14-decisions-worksheet)

---

## 1. Website overview

### 1.1 Kashan Iqbal — teacher website

Yeh ek **tutor / teacher website** hai — teen alag subjects ek hi domain par:

| Subject | Button label | Where it goes |
|---------|--------------|---------------|
| **Accounting** | Accounting with Kashan Iqbal | `/accounting` |
| **Maths** | Maths with Kashan Iqbal | `/maths` |
| **Stocks** | Learn Stocks with Kashan Iqbal | `/stocks` |

Har subject ka apna home page, about, courses, notes, blog, contact — lekin **Accounting aur Maths** ka layout **100% Shehroz Iqbal site se match** karega.

### 1.2 Core rules

| Rule | Detail |
|------|--------|
| **Start screen** | Site open → **ek full screen** — logo + Kashan ka naam + **3 buttons** |
| **Accounting & Maths** | **Exact same pages & sections** as Shehroz site (`WEBSITE-DESIGN-GUIDE.md`); sirf **theme colour** + **videos / notes / PDFs / copy** alag |
| **Logo** | **Same logo** teeno sections mein |
| **Stocks** | Same page names (home, about, courses, notes, blog, contact…) lekin **modern UI**, **live numbers**, **PSX update**; trading/investment theme |
| **Tech** | Next.js static export — Shehroz repo jaisa — cPanel deploy |

### 1.3 Site map (simple)

```
kashaniqbal.com/
│
├── /                          ← START SCREEN (3 buttons only)
│
├── /accounting/               ← Shehroz site structure + accounting theme
│   ├── about, contact, register, notes, extra-credit, blog, courses/...
│
├── /maths/                    ← Shehroz site structure + maths theme
│   └── (same pages as accounting)
│
└── /stocks/                   ← Same page list + PSX market + modern theme
    └── (courses = Beginner / Intermediate / Advanced instead of O/AS/A2)
```

---

## 2. Start screen — 3 subject options

### 2.1 Purpose

Yeh website ka **pehla page** hai (`/`). Yahan koi courses, blog, ya notes nahi — sirf Kashan Iqbal introduce hota hai aur user **apna subject choose** karta hai.

### 2.2 Layout

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                    [ Kashan Iqbal Logo ]                   │
│                                                            │
│                      Kashan Iqbal                        │
│         Teacher · Accounting · Maths · Stock Market        │
│                                                            │
│   ┌─────────────────┐ ┌─────────────────┐ ┌────────────┐ │
│   │                 │ │                 │ │            │ │
│   │  Accounting     │ │  Maths          │ │  Learn     │ │
│   │  with Kashan    │ │  with Kashan    │ │  Stocks    │ │
│   │  Iqbal          │ │  Iqbal          │ │  with      │ │
│   │                 │ │                 │ │  Kashan    │ │
│   │  CAIE & Edexcel │ │  CAIE & Edexcel │ │  Iqbal     │ │
│   │                 │ │                 │ │            │ │
│   │    [ Enter → ]  │ │    [ Enter → ]  │ │  PSX &     │ │
│   │                 │ │                 │ │  Trading   │ │
│   └─────────────────┘ └─────────────────┘ │ [ Enter → ]│ │
│                                            └────────────┘ │
│                                                            │
│   Same logo on all three · tap/click → redirect            │
└────────────────────────────────────────────────────────────┘
```

### 2.3 Behaviour

| Action | Result |
|--------|--------|
| Click **Accounting** | Go to `/accounting` |
| Click **Maths** | Go to `/maths` |
| Click **Learn Stocks** | Go to `/stocks` |

- Poori card clickable ho (sirf chota button nahi)
- Mobile par teen cards **stack** (ek ke neeche ek)
- Optional: header mein “Back to subjects” link har section ke andar → wapas `/` par 3 options

### 2.4 Start screen design

| Element | Style |
|---------|-------|
| Background | Clean, neutral — teacher website feel; soft dark ya light gradient |
| Cards | 3 equal cards; glass/shadow; hover pe us subject ki theme colour glow |
| Card accents | Accounting = red · Maths = purple · Stocks = green |
| Fonts | Fraunces + Inter (Shehroz site jaisa) |
| Logo | Same file teen jagah |

### 2.5 Copy (draft)

**Headline:** Kashan Iqbal  
**Subline:** Accounting · Mathematics · Stock Market Education

| Button | Title | Subtitle | Link |
|--------|-------|----------|------|
| 1 | Accounting with Kashan Iqbal | O Level, AS & A2 · CAIE & Edexcel | `/accounting` |
| 2 | Maths with Kashan Iqbal | O Level, AS & A2 · CAIE & Edexcel | `/maths` |
| 3 | Learn Stocks with Kashan Iqbal | PSX · Trading · Investing | `/stocks` |

---

## 3. How the user moves through the site

### 3.1 First visit

1. User opens `kashaniqbal.com` → **start screen** (3 options)
2. Clicks e.g. **Maths with Kashan Iqbal**
3. Lands on **`/maths`** — full teacher website (header, footer, home sections — Shehroz jaisa)

### 3.2 Inside Accounting or Maths

Header navigation **Shehroz site jaisa:**

- Home · Courses (AS / A2 / O dropdown) · About · Notes · Extra Credit · Blog · Contact  
- CTA buttons: Enroll / Study Online  
- Optional: **“All subjects”** ya **“Change subject”** → wapas start screen (`/`)

### 3.3 Inside Stocks

Same nav pattern, lekin labels stocks ke mutabiq:

- Courses → Beginner / Intermediate / Advanced  
- Home par **PSX market strip** (date, time, KSE-100, etc.)  
- Modern dark theme, numbers prominent (Space Grotesk font for prices)

---

## 4. URLs & folder structure

### 4.1 Page list — Shehroz reference vs Kashan

Shehroz site ke **har page** Accounting aur Maths mein **same** hoga:

| Shehroz page | Accounting URL | Maths URL | Stocks URL |
|--------------|----------------|-----------|------------|
| Home | `/accounting` | `/maths` | `/stocks` |
| About | `/accounting/about` | `/maths/about` | `/stocks/about` |
| Contact | `/accounting/contact` | `/maths/contact` | `/stocks/contact` |
| Register | `/accounting/register` | `/maths/register` | `/stocks/register` |
| Notes | `/accounting/notes` | `/maths/notes` | `/stocks/notes` |
| Extra Credit | `/accounting/extra-credit` | `/maths/extra-credit` | `/stocks/extra-credit` |
| Blog | `/accounting/blog` | `/maths/blog` | `/stocks/blog` |
| Blog post | `/accounting/blog/[slug]` | `/maths/blog/[slug]` | `/stocks/blog/[slug]` |
| AS Level course | `/accounting/courses/as-level` | `/maths/courses/as-level` | `/stocks/courses/beginner` |
| A2 Level course | `/accounting/courses/a2-level` | `/maths/courses/a2-level` | `/stocks/courses/intermediate` |
| O Level course | `/accounting/courses/o-level` | `/maths/courses/o-level` | `/stocks/courses/advanced` |

### 4.2 Next.js folders (suggested)

```
app/
  page.tsx                    → Start screen (3 subject buttons)
  layout.tsx                  → Root layout (fonts)

  accounting/
    layout.tsx                → Accounting theme
    page.tsx                  → Home (same as shehroz app/page.tsx)
    about/page.tsx
    contact/page.tsx
    register/page.tsx
    notes/page.tsx
    extra-credit/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    courses/as-level/page.tsx
    courses/a2-level/page.tsx
    courses/o-level/page.tsx

  maths/
    layout.tsx                → Maths theme
    ... (mirror accounting exactly)

  stocks/
    layout.tsx                → Stocks theme
    page.tsx                  → Home + PSX market section
    ... (same page list, stocks content)

lib/
  subjects/
    accounting.config.ts
    maths.config.ts
    stocks.config.ts

data/
  accounting/                 → courses, notes, blog
  maths/
  stocks/

public/images/
  logo.png                    → Same logo everywhere
  accounting/ ...
  maths/ ...
  stocks/ ...
```

### 4.3 Code reuse (Shehroz repo se)

Shehroz site ke components ko **config se chalao** — do baar copy mat karo:

```ts
// lib/subjects/accounting.config.ts
export const accountingConfig = {
  id: "accounting",
  basePath: "/accounting",
  theme: { primary: "#0A2740", accent: "#DC2626", surface: "#EEF6FC" },
  site: { personName: "Kashan Iqbal", tagline: "Accounting · CAIE & Edexcel", ... },
  // nav, LMS links, register grades — accounting specific
};
```

Har page thin wrapper:

```tsx
// app/accounting/page.tsx
import { HomePage } from "@/components/templates/HomePage";
import { accountingConfig } from "@/lib/subjects/accounting.config";

export default function Page() {
  return <HomePage config={accountingConfig} />;
}
```

**Accounting aur Maths** → same `HomePage`, `AboutPage`, `CoursePageTemplate`, etc. — sirf `config` prop alag.

---

## 5. Accounting section (Shehroz site clone)

> **Source of truth:** `WEBSITE-DESIGN-GUIDE.md` — har section ka naam, order, component wahan likha hai. Neeche sirf Kashan-specific changes.

### 5.1 Theme

Shehroz site jaisa — **navy + red accent**:

| Colour | Hex | Use |
|--------|-----|-----|
| Navy dark | `#0A2740` | Hero, footer, dark sections |
| Accent red | `#DC2626` | Buttons, highlights, active nav |
| Light bg | `#EEF6FC` | Cream sections |

### 5.2 Home page — sections (Shehroz order, change mat karo)

1. **HeroSlider** — banner carousel, enroll CTA  
2. **SessionAnnouncement** — session promo (Oct/Nov batch)  
3. **OrbEdRegistrationGuide** — LMS enrollment steps (`#orbed-guide`)  
4. **SampleLectures** — free sample videos by level (`#sample-lectures`)  
5. **SampleNotes** — note previews  
6. **ReelsCarousel** — classroom video reels  
7. **ExtraCreditPreview** — photo gallery teaser  
8. **BlogPreview** — latest blog posts  
9. **RegistrationBanner** — bottom enroll CTA  
10. **HomeFaq** — FAQ accordion (`#faq`)

### 5.3 All other pages (Shehroz se copy)

| Page | Shehroz reference | Kashan content |
|------|-------------------|----------------|
| About | Hero, stats, story, quote, ecosystem, testimonials, CTA | Kashan bio, photo, years teaching |
| Contact | Cards, hours, feedback form, map | Kashan email, phone, address |
| Register | Interest form + sidebar perks | Accounting grades (7707, 9706) |
| Notes | Level tabs, PDF explorer, yearly papers | Accounting PDFs |
| Extra Credit | Video strips + Masonry photos | Accounting class gallery |
| Blog | Search, featured post, grid | Accounting articles |
| Courses ×3 | Hero, banner, at-a-glance, syllabus, sample notes | Accounting syllabus & videos |

### 5.4 Content folders

```
data/accounting/
  courses.as.ts, courses.a2.ts, courses.o.ts
  studyNotes.*.ts
  posts.ts

public/videos/accounting/...
public/notes/accounting/...
public/images/accounting/banners/...
```

---

## 6. Maths section (Shehroz site clone, different theme)

### 6.1 Rule

**Structure = Accounting = Shehroz site.**  
**Farq sirf:**

- Theme colours  
- Copy (Maths, 9709, etc.)  
- Videos, notes, PDFs  
- LMS course links  

Koi extra page nahi. Koi section hatao ya add mat karo (Accounting jaisa hi rakho).

### 6.2 Maths theme (suggested)

Accounting se visually alag — structure same:

| Colour | Hex | Use |
|--------|-----|-----|
| Deep indigo | `#1a1040` | Dark sections (maths feel) |
| Purple accent | `#7C3AED` | Buttons, highlights |
| Light bg | `#F5F3FF` | Lavender-tinted sections |
| Grid lines | purple tint | `bg-grid-white` variant |

**Logo:** same file — hover pe purple glow (optional).

### 6.3 Syllabus codes (confirm with Kashan)

| Level | CAIE Maths |
|-------|------------|
| O Level | 4024 / 4037 |
| AS Level | 9709 |
| A2 Level | 9709 |

### 6.4 Content folders

```
data/maths/          → mirror data/accounting/ structure
public/videos/maths/
public/notes/maths/
public/images/maths/
```

### 6.5 Side-by-side: Accounting vs Maths

| Item | Accounting | Maths |
|------|------------|-------|
| Pages | Same list | Same list |
| Home sections | Same 10 | Same 10 |
| Components | Same | Same |
| Theme | Navy + red | Indigo + purple |
| Videos | Accounting lectures | Maths lectures |
| Notes | Accounting PDFs | Maths PDFs |
| Blog | Accounting posts | Maths posts |
| Course URLs | `/accounting/courses/...` | `/maths/courses/...` |

---

## 7. Stocks section (modern + PSX updates)

### 7.1 Same page list, different feel

Stocks mein **wahi pages** hain jo Shehroz site mein — home, about, contact, register, notes, extra credit, blog, courses — lekin:

- **Modern, data-forward design** — dark backgrounds, big numbers, clean grids  
- **PSX market update** on home (and optionally header)  
- **Course levels:** Beginner / Intermediate / Advanced (O/AS/A2 labels ki jagah)  
- **Content:** stock videos, trading guides, market blogs — not exam syllabi  

### 7.2 Stocks theme

| Colour | Hex | Use |
|--------|-----|-----|
| Near black | `#0B0F14` | Main dark bg — terminal/modern feel |
| Emerald green | `#10B981` | Positive numbers, primary CTA |
| Amber | `#F59E0B` | Highlights, warnings |
| Red | `#EF4444` | Negative change (sparingly) |
| Light section | `#F8FAF9` | Alternating light bands |

**Typography:** Prices & indices → **Space Grotesk** (monospace-like numbers). Headlines → Fraunces.

**Visual style:** Thin grid lines, subtle chart backgrounds, ticker-style strips — professional trading education, not gimmicky.

### 7.3 Home page sections

| # | Section | Same as Shehroz? | Stocks notes |
|---|---------|------------------|--------------|
| **0** | **PSX Market Update** | **NEW** | Date, time (PKT), KSE-100, market open/closed — Section 10 |
| 1 | HeroSlider | ✅ | “Learn to invest in PSX” messaging |
| 2 | SessionAnnouncement | ✅ | New batch / webinar announcement |
| 3 | RegistrationGuide | ✅ | How to join stocks course |
| 4 | SampleLectures | ✅ | Stock analysis, chart reading videos |
| 5 | SampleNotes | ✅ | Watchlists, cheat sheets (PDF) |
| 6 | ReelsCarousel | ✅ | Short market clips |
| 7 | ExtraCreditPreview | ✅ | Seminars, trading sessions photos |
| 8 | BlogPreview | ✅ | Market education articles |
| 9 | RegistrationBanner | ✅ | Enroll CTA |
| 10 | HomeFaq | ✅ | Risk, capital, PSX hours, “not financial advice” |

### 7.4 Courses (Stocks)

| URL | Name | Content |
|-----|------|---------|
| `/stocks/courses/beginner` | Beginner | PSX intro, brokers, basic candlesticks |
| `/stocks/courses/intermediate` | Intermediate | Fundamental analysis, sectors |
| `/stocks/courses/advanced` | Advanced | Technical analysis, risk management |

Page template: **same `CoursePageTemplate`** as Shehroz — syllabus accordion + sample videos + notes.

### 7.5 Legal disclaimer (required on Stocks)

Footer, blog, and market section:

> *Educational content only. Not financial advice. Past performance does not guarantee future results.*

---

## 8. Three themes — same logo

### 8.1 One logo, three colour schemes

```
public/images/logo.png   → used on start screen + all three sections
```

Optional hover glow per section: red / purple / green.

### 8.2 CSS variables per section

```css
[data-subject="accounting"] {
  --color-primary: #0A2740;
  --color-accent: #DC2626;
  --color-surface: #EEF6FC;
}

[data-subject="maths"] {
  --color-primary: #1a1040;
  --color-accent: #7C3AED;
  --color-surface: #F5F3FF;
}

[data-subject="stocks"] {
  --color-primary: #0B0F14;
  --color-accent: #10B981;
  --color-surface: #F8FAF9;
}
```

Each section’s `layout.tsx` sets `data-subject="accounting"` (or maths / stocks).

### 8.3 What changes with theme

| Element | Themed? |
|---------|---------|
| Primary buttons | ✅ accent colour |
| Dark section backgrounds | ✅ primary colour |
| SpotlightCard glow | ✅ accent |
| Header/footer | ✅ subject colours |
| Page structure | ❌ never changes (Accounting = Maths = Shehroz) |

---

## 9. Shared code vs subject-specific content

### 9.1 Write once (from Shehroz repo)

| Layer | Examples |
|-------|----------|
| Templates | `HomePage`, `AboutPage`, `CoursePageTemplate`, `BlogIndex` |
| UI | `HeroSlider`, `SpotlightCard`, `RotatingText`, `Masonry`, `NotesExplorer` |
| Layout | `Header`, `Footer`, `FloatingWhatsApp`, `SitePreloader` |
| Forms | `RegistrationForm`, `FeedbackForm` |

All accept a **`SubjectConfig`** prop (`basePath`, `theme`, `site`, `navItems`, …).

### 9.2 Per subject — config + data only

| Item | Path |
|------|------|
| Config | `lib/subjects/{accounting\|maths\|stocks}.config.ts` |
| Courses | `data/{subject}/courses.*.ts` |
| Notes | `data/{subject}/studyNotes.*.ts` |
| Blog | `content/{subject}/blog-posts.md` |
| Media | `public/videos/{subject}/`, `public/images/{subject}/` |

### 9.3 Stocks-only components

| Component | Purpose |
|-----------|---------|
| `PsxMarketBar` | KSE-100, date/time, open/closed badge |
| `MarketTicker` | Optional scrolling price strip in header |
| `DisclaimerBar` | Legal notice |

---

## 10. Stocks: PSX market display

### 10.1 What the user sees

Home page ke **top par** (hero se pehle ya immediately after):

```
┌──────────────────────────────────────────────────────────────┐
│  Fri, 3 Jul 2026 · 8:59 PM PKT          PSX ● CLOSED         │
├──────────────────────────────────────────────────────────────┤
│  KSE-100     75,432.10    +1.24% ▲                           │
│  KSE-30      24,101.55    +0.98% ▲                           │
├──────────────────────────────────────────────────────────────┤
│  Top:  ENGRO +2.1%  ·  HBL -0.8%  ·  OGDC +1.5%              │
│  Data delayed · Educational only                             │
└──────────────────────────────────────────────────────────────┘
```

- **Date & time** — always `Asia/Karachi` timezone  
- **Market status** — Open / Closed (PSX: Mon–Fri ~9:30–15:30 PKT)  
- **Numbers** — large, readable, green ▲ / red ▼  

### 10.2 How to get PSX data (static cPanel site)

| Method | Notes |
|--------|-------|
| **TradingView embed** | Free widget — charts + ticker; easiest for static site |
| **Client-side API** | Fetch on page load; refresh every 60s; show “delayed 15 min” |
| **Build-time snapshot** | Update on each `npm run build` — not live but simple |

**Recommendation:** TradingView mini chart + ticker tape embed + JS logic for open/closed badge.

### 10.3 Optional: header ticker (Stocks only)

Thin bar under nav — scrolling symbols (PSX + USD/PKR). Modern “Bloomberg-lite” feel without cluttering Accounting/Maths.

---

## 11. SEO & branding

### 11.1 Page titles

| Page | Title example |
|------|---------------|
| Start screen | Kashan Iqbal \| Accounting, Maths & Stocks Teacher |
| Accounting home | A Level Accounting Tutor \| Kashan Iqbal |
| Maths home | A Level Maths Tutor \| Kashan Iqbal |
| Stocks home | Learn Stock Trading Pakistan \| Kashan Iqbal |

### 11.2 Sitemap

```
/                    (start screen)
/accounting/**
/maths/**
/stocks/**
```

### 11.3 Analytics

One GA4 property — track which subject button user clicks on start screen.

---

## 12. Build phases

### Phase 1 — Start screen + Accounting (Shehroz clone)

- [ ] Start screen at `/` with 3 buttons  
- [ ] Refactor Shehroz components to use `SubjectConfig`  
- [ ] `/accounting/*` — all pages, accounting theme, placeholder content  
- [ ] Static build test  

### Phase 2 — Maths (theme swap only)

- [ ] `/maths/*` — same code, maths config + purple theme  
- [ ] Swap videos, notes, PDFs, copy  
- [ ] Verify: page count & section order **identical** to accounting  

### Phase 3 — Stocks (modern + PSX)

- [ ] `/stocks/*` — stocks theme, modern number styling  
- [ ] `PsxMarketBar` component + TradingView embed  
- [ ] Remap courses to Beginner / Intermediate / Advanced  
- [ ] Disclaimer text  

### Phase 4 — Content & launch

- [ ] Kashan’s real media, LMS links, forms  
- [ ] Domain + cPanel deploy  
- [ ] Sitemap submit  

---

## 13. Content checklist (Kashan se collect karein)

### Shared (ek baar)

- [ ] Logo (same for all three)  
- [ ] Teacher photos  
- [ ] Bio, years experience, student count  
- [ ] Email, phone, WhatsApp, address  
- [ ] Social links  

### Accounting (Shehroz list follow karo)

- [ ] Hero banners ×3  
- [ ] Session dates  
- [ ] LMS / Orb-Ed URLs (O, AS, A2)  
- [ ] Syllabus topics + sample videos per level  
- [ ] PDF notes  
- [ ] Blog posts  
- [ ] FAQ  
- [ ] Class photos / reels  

### Maths (same checklist as Accounting)

- [ ] Maths-specific videos, PDFs, blog, LMS links  
- [ ] Syllabus codes (9709, etc.)  

### Stocks

- [ ] Course outlines (3 levels)  
- [ ] Stock education videos  
- [ ] PDF guides / watchlists  
- [ ] Market blog posts  
- [ ] Seminar photos  
- [ ] Approved disclaimer text  

---

## 14. Decisions worksheet

```
DOMAIN: _________________________

START SCREEN:
  [ ] Always show 3 buttons when user visits /
  [ ] Remember last subject (optional)

KASHAN CONTACT:
  Email: ___________  Phone: ___________  WhatsApp: ___________

LMS LINKS:
  Accounting O / AS / A2: _______________________________
  Maths O / AS / A2: _______________________________
  Stocks course: _______________________________

THEMES APPROVED:
  Accounting (navy + red):     [ ]
  Maths (indigo + purple):     [ ]
  Stocks (dark + green):       [ ]

PSX DATA:
  [ ] TradingView embed
  [ ] Live API (provider: _______)
  [ ] Static snapshot at build

LAUNCH DATE: ___________
```

---

## Appendix — Shehroz site reference files

| What | File in shehroz-iqbal-site repo |
|------|----------------------------------|
| Every section explained | `WEBSITE-DESIGN-GUIDE.md` |
| Colours & fonts | `tailwind.config.ts`, `app/globals.css` |
| Home section order | `app/page.tsx` |
| Nav & CTAs | `lib/constants.ts` |
| Deploy steps | `DEPLOY-CHECKLIST.md` |

---

*Kashan Iqbal Teacher Website Blueprint · v2 · July 2026*
