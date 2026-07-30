# Website Design Guide — Shehroz Iqbal Accounting Site

> **Yeh file kis liye hai?**  
> Is document ko aap kisi designer, developer, ya client ko de sakte hain taake website ka design **section-by-section** samjha saken. Har section ke neeche **“Alter karna ho to…”** notes hain — wahan se aap nayi website ya redesign ke liye changes likhwa sakte hain.

**Live site:** [shehroziqbal.com](https://shehroziqbal.com)  
**Tech stack:** Next.js 16 (static export) · Tailwind CSS · Framer Motion · GSAP  
**Repo:** `components/`, `app/`, `lib/constants.ts`, `tailwind.config.ts`

---

## Table of contents

1. [Brand & design system](#1-brand--design-system)
2. [Global layout (har page par)](#2-global-layout-har-page-par)
3. [Home page](#3-home-page)
4. [About page](#4-about-page)
5. [Contact page](#5-contact-page)
6. [Register page](#6-register-page)
7. [Notes page](#7-notes-page)
8. [Extra Credit page](#8-extra-credit-page)
9. [Blog (index + article)](#9-blog-index--article)
10. [Course pages (AS / A2 / O Level)](#10-course-pages-as--a2--o-level)
11. [Shared components library](#11-shared-components-library)
12. [Content & CTA map](#12-content--cta-map)
13. [Alteration worksheet](#13-alteration-worksheet)

---

## 1. Brand & design system

### 1.1 Brand identity

| Item | Current value | Alter karna ho to… |
|------|---------------|-------------------|
| Business name | Sir Shehroz Iqbal | `lib/constants.ts` → `SITE.name` |
| Search name | Shehroz Iqbal | `SITE.personName` |
| Tagline | Accounting · CAIE & Edexcel | `SITE.tagline` |
| Subject | Accounting (CAIE 9706, O Level 7707, Edexcel) | Copy across pages |
| Tone | Professional, warm, exam-focused, Karachi + online Pakistan | Hero copy, About story |
| Primary CTA | Enroll for Oct/Nov 2026 → Orb-Ed LMS | `CTA_LABELS` in constants |

### 1.2 Color palette

| Token | Hex | Use |
|-------|-----|-----|
| `navy-900` | `#0A2740` | Dark sections, footer, hero overlays, headings on light |
| `navy-700` | `#12466E` | Hover states, secondary navy |
| `navy-500` | `#1C6BAA` | Links, grid accents, course chip (O Level) |
| `gold-500` | `#DC2626` | **Brand accent (red)** — CTAs, highlights, active nav |
| `gold-300` | `#EF4444` | CTA hover |
| `cream-50` | `#EEF6FC` | Light airy section backgrounds |
| `ink-900` | `#0F172A` | Body text |
| `gray-50` | `#F8F9FB` | Page base, blog featured band |
| `whatsapp` | `#25D366` | WhatsApp button / floating bubble |

> **Note:** Tailwind class name `gold-*` = red accent (historical naming). New site banate waqt rename kar sakte hain.

**Alter karna ho to…** → `tailwind.config.ts` → `theme.extend.colors`

### 1.3 Typography

| Role | Font | CSS variable | Usage |
|------|------|--------------|-------|
| Display / headings | **Fraunces** (serif, variable) | `--font-fraunces` | H1, H2, quotes, italic accents |
| Body | **Inter** | `--font-inter` | Paragraphs, nav, forms, buttons |
| Stats / numbers | **Space Grotesk** | `--font-space-grotesk` | Count-up stats |

**Patterns:**
- **Eyebrow:** uppercase, `0.8125rem`, letter-spacing `0.12em`, navy-700 — class `.eyebrow`
- **Display heading:** `.h-display` — Fraunces, tight line-height, slight negative tracking
- **Italic gold accent** inside headlines: e.g. *Accounting*, *shorts.*

**Alter karna ho to…** → `app/layout.tsx` (font imports) + `globals.css` (`.h-display`, `.eyebrow`)

### 1.4 Spacing & layout

| Rule | Value |
|------|-------|
| Max content width | `1280px` — class `.container-x` |
| Horizontal padding | `24px` mobile → `32px` md → `48px` lg |
| Section vertical padding | Typically `py-16` to `py-24` |
| Header offset (main) | `pt-20` mobile, `pt-24` desktop |
| Scroll anchor offset | `scroll-margin-top: 6.5rem` on `[id]` elements |
| Border radius | Cards `rounded-2xl` / `rounded-3xl`; buttons `rounded-full` |

### 1.5 Background patterns

| Class | Look | Where used |
|-------|------|------------|
| `bg-cream-50` | Cool off-white solid | Sample lectures, Orb-Ed guide, philosophy quote |
| `bg-grid-white` | White + subtle blue grid lines (56px) | Notes explorer, contact, blog grid, course stats |
| `bg-navy-900` | Deep navy + optional `bg-grid-overlay` | Heroes, FAQ, reels, footer |
| `mesh-gradient` | Soft red/blue/navy radial blobs | Decorative (some cards) |

**Section rhythm:** Light sections alternate **cream-50 ↔ grid-white**; dark **navy-900** bands break monotony.

### 1.6 Buttons & CTAs

| Class | Style | When to use |
|-------|-------|-------------|
| `.btn-primary` | Red pill, white text, glow shadow | Main action: Enroll, Orb-Ed |
| `.btn-outline-navy` | Navy border → fill on hover | Secondary on light bg |
| `.btn-outline-white` | White border on dark sections | Secondary on navy heroes |
| `.btn-secondary` | Solid navy pill | Subordinate to primary |
| `.btn-whatsapp` | Green pill | WhatsApp-specific |

### 1.7 Cards & surfaces

| Class | Effect |
|-------|--------|
| `.card-rest` | Soft shadow; hover: lift `-translate-y-1` + stronger shadow |
| `.glass-card` | Frosted white, blur, gradient fill |
| `.glass-card-dark` | Frosted on navy backgrounds |
| `.bento-tile` | Glass card + mouse radial red glow on hover |
| `.pill-gold` / `.pill-gold-outline-dark` | Status badges (session open, level tags) |

### 1.8 Motion & animation

| Pattern | Library | Behaviour |
|---------|---------|-----------|
| Page/header entrance | Framer Motion | Slide/fade on load |
| Section scroll reveal | `AnimateSection` | Fade-up, alternating left/right |
| Staggered children | `AnimateStagger` | Cards appear one-by-one |
| Rotating headline words | `RotatingText` | Cycle through session/level names |
| Cursor-reactive headings | `VariableProximity` | Fraunces weight changes near cursor |
| Mobile menu | `StaggeredMenu` (GSAP) | Full-screen staggered nav |
| Photo gallery | `Masonry` (GSAP) | Layout + blur-to-focus on load |
| Card spotlight | `SpotlightCard` | Red radial glow follows mouse |
| Reduced motion | `prefers-reduced-motion` | Animations disabled/simplified |

**Alter karna ho to…** → Speed, direction, or remove motion per section in component props.

---

## 2. Global layout (har page par)

Har page `app/layout.tsx` ke andar same shell use karti hai.

### 2.1 Site preloader

| | |
|---|---|
| **File** | `components/layout/SitePreloader.tsx` |
| **Purpose** | Pehli visit par images/fonts load hone tak branded loader |
| **Visual** | Full-screen navy; logo fill animation; progress bar; “Shehroz Iqbal · Accounting” |
| **Timing** | Minimum ~900ms visible; body scroll locked until done |

**Alter karna ho to…** → Logo, colors, min duration, skip on repeat visits

### 2.2 Header (fixed top)

| | |
|---|---|
| **File** | `components/layout/Header.tsx` |
| **Purpose** | Navigation + enrollment CTAs |
| **Desktop nav** | Home · Courses (dropdown: AS/A2/O) · About · Notes · Extra Credit · Blog · Contact |
| **CTAs** | “Study Online” (outline) + “Enroll · Oct/Nov” (primary red) |
| **Home hero behaviour** | Transparent over hero image until scroll → then frosted white bar |
| **Active link** | Gold text + gold underline animation |
| **Mobile** | `MobileStaggeredNav` — full-screen GSAP staggered menu (hamburger) |

**Alter karna ho to…** → `lib/constants.ts` → `NAV_ITEMS`; header CTA labels → `CTA_LABELS`

### 2.3 Main content area

- `id="main"` skip target
- Top padding clears fixed header
- Each page renders its sections inside `<main>`

### 2.4 Footer

| | |
|---|---|
| **File** | `components/layout/Footer.tsx` |
| **Background** | `navy-900` + gold gradient hairline + blur orbs |
| **Columns** | Brand + social · Quick links · Courses · Contact |
| **Affiliations** | `FooterAffiliations` — Orb-Ed, Alpha College, Kashan's Academy logos (linked) |
| **CTA** | Red enroll button |
| **Copyright** | Bottom bar |

**Alter karna ho to…** → `data/affiliations.ts`; social URLs in `SITE.socials`

### 2.5 Floating WhatsApp

| | |
|---|---|
| **File** | `components/layout/FloatingWhatsApp.tsx` |
| **Position** | Fixed bottom-right, green circle, pulse ring |
| **Link** | Currently Orb-Ed LMS (`SITE.orbedUrl`) |
| **Hidden on** | `/notes` (replaced by sticky bar) |

### 2.6 Scroll to top

| | |
|---|---|
| **File** | `components/layout/ScrollToTop.tsx` |
| **Trigger** | After 400px scroll |
| **Style** | Gold circular button, above WhatsApp bubble |

---

## 3. Home page

**Route:** `/` · **File:** `app/page.tsx`

Sections top-to-bottom:

### 3.1 Hero slider

| | |
|---|---|
| **Component** | `HeroSlider` |
| **Purpose** | First impression; value proposition; enroll CTA |
| **Layout** | Full-bleed navy; photo carousel (3 banners); text left, image full-bleed |
| **Content** | Headline + `RotatingText` accent; star rating; Orb-Ed CTA + “Sample lecture” anchor |
| **Interaction** | Embla carousel, 6s autoplay; dots + prev/next glass buttons |
| **Mobile** | Image strip below text; desktop: image as background with gradient overlay |

**Alter karna ho to…** → Slide copy in `HeroSlider.tsx`; images in `lib/heroBanners.ts` (`banner1.png`, `banner2.jpg`, `banner3.jpg`)

### 3.2 Session announcement

| | |
|---|---|
| **Component** | `SessionAnnouncement` |
| **Purpose** | Oct/Nov 2026 session promo |
| **Background** | Navy + grid overlay + gold/navy blur orbs |
| **Layout** | 2-column: copy left · registration banner image right |
| **Content** | `RotatingText` (“live now”, “open for enrolment”…); bullet highlights; pill badge with ping dot |
| **Image** | `registrationbanner.jpg` in rounded card frame |

**Alter karna ho to…** → Session dates, bullet list, banner image (`lib/marketingImages.ts`)

### 3.3 Orb-Ed registration guide

| | |
|---|---|
| **Component** | `OrbEdRegistrationGuide` · anchor `#orbed-guide` |
| **Purpose** | Step-by-step LMS enrollment help |
| **Background** | `cream-50` |
| **Layout** | Collapsible `<details>` accordion; 4 numbered step cards; course list; “Still stuck?” navy CTA card |
| **Data** | `ORBED_REGISTRATION_COURSES` in constants |

**Alter karna ho to…** → Steps, screenshots, course names per batch

### 3.4 Sample lectures

| | |
|---|---|
| **Component** | `SampleLectures` · anchor `#sample-lectures` |
| **Background** | `cream-50` |
| **Layout** | Section header + level tabs (AS / A2 / O) + syllabus grid with free video rows |
| **Special** | `VariableProximity` on section title |
| **CTA** | Link to full course page per level |

### 3.5 Sample notes preview

| | |
|---|---|
| **Component** | `SampleNotes` (inside `HomeBelowFold`) |
| **Background** | `bg-grid-white` |
| **Layout** | Section header + grid of `SampleNoteCard` |
| **CTA** | View all notes · WhatsApp for full pack |

### 3.6 Classroom reels carousel

| | |
|---|---|
| **Component** | `ReelsCarousel` |
| **Background** | `navy-900` (dark section) |
| **Layout** | Horizontal scroll of 9:16 video tiles |
| **Interaction** | Muted autoplay loop; tap → `VideoLightbox` with sound |

### 3.7 Extra Credit preview

| | |
|---|---|
| **Component** | `ExtraCreditPreview` |
| **Background** | `cream-50` |
| **Layout** | 2–4 column photo grid, 4:5 aspect, `card-rest` hover |
| **CTA** | “See gallery” → `/extra-credit` |

### 3.8 Blog preview

| | |
|---|---|
| **Component** | `BlogPreview` |
| **Background** | `bg-grid-white` |
| **Layout** | 4-column `BlogCard` grid (latest posts) |

### 3.9 Registration banner (bottom CTA)

| | |
|---|---|
| **Component** | `RegistrationBanner` |
| **Background** | Navy + grid + gold orb |
| **Content** | `RotatingText` with session/level names; urgency line (“Limited seats · Closes 31 Aug 2026”) |
| **CTA** | Orb-Ed enroll |

**Alter karna ho to…** → Deadline date, rotating words, CTA destination

### 3.10 FAQ

| | |
|---|---|
| **Component** | `HomeFaq` · anchor `#faq` |
| **Background** | `navy-900` + `AmbientOrbs` + grid overlay |
| **Layout** | Dark `SectionHeader` + `VariableProximity`; accordion list |
| **Cards** | Each FAQ wrapped in `SpotlightCard` (red glow on hover) |
| **SEO** | FAQPage JSON-LD schema |

**Alter karna ho to…** → Q&A pairs in component or `data/` file

---

## 4. About page

**Route:** `/about`

| # | Section | Background | Key elements |
|---|---------|------------|--------------|
| 1 | **Hero** | Navy + orbs | Portrait with gradient frame; bio paragraphs; floating “13+ yrs” badge; `AboutHeroName` uses `VariableProximity` |
| 2 | **Stats bar** | White card overlapping hero (`-mt-10`) | `CountUp`: 10,000+ students, 13+ years; 2×2 grid |
| 3 | **Story + info panels** | White | Long bio; `AboutInfoPanels` — 2× `SpotlightCard` (Syllabi, What you get) |
| 4 | **Philosophy quote** | `cream-50` | Large Fraunces italic quote; gold accent line |
| 5 | **Orb-Ed ecosystem** | `bg-grid-white` | `AnimatedBeam` diagram — hub connects to 4 resource nodes |
| 6 | **Testimonials** | Navy | Horizontal video reel (same pattern as home) |
| 7 | **Closing CTA** | Navy card in container | Register + Ask on Orb-Ed |

**Alter karna ho to…** → Portrait image, stats numbers, quote text, ecosystem nodes

---

## 5. Contact page

**Route:** `/contact`

| # | Section | Layout |
|---|---------|--------|
| 1 | **Hero** | Grid-white; eyebrow “Get In Touch”; h1 “Let's talk.” (italic Fraunces) |
| 2 | **Contact cards** | 3 cards: Orb-Ed, email, address — gold icon circles on cream-50 |
| 3 | **Office hours** | `HoursCard` — Mon–Thu, Fri–Sat, Sunday closed |
| 4 | **Feedback form** | Centered max-w-2xl; name, email, message; submits to Google Sheet |
| 5 | **Map** | Rounded map frame; floating glass address card; Google Maps embed |

**Alter karna ho to…** → `SITE.address`, `SITE.openHours`, map embed URL, form fields

---

## 6. Register page

**Route:** `/register`

| # | Section | Layout |
|---|---------|--------|
| 1 | **Hero** | Grid-white; enrollment title; link to `/#orbed-guide` |
| 2 | **Form + sidebar** | `lg:grid-cols-[1.4fr_1fr]` — interest form left; trust perks right |

**Form fields:** Name, email, phone, grade (O/AS/A2), message  
**Sidebar perks:** Quick response · Private & secure · WhatsApp; Orb-Ed shortcut; step guide link

**Alter karna ho to…** → `RegistrationForm.tsx`, `REGISTER_GRADES`, Google Sheet endpoint

---

## 7. Notes page

**Route:** `/notes`

| # | Section | Layout |
|---|---------|--------|
| 1 | **Hero** | Navy + grid; level tabs (O / AS / A2); “Request full pack” CTA |
| 2 | **Study notes** | Grid-white; `NotesExplorer` — nested accordions, PDF preview modal |
| 3 | **Yearly papers** | Cream-50; year accordions; lock icon on paid papers |
| 4 | **Sticky WhatsApp bar** | Fixed bottom navy bar after 600px scroll (replaces floating bubble) |

**Business logic:** First N notes free preview; rest locked → Orb-Ed  
**Alter karna ho to…** → Free preview count, folder structure in `data/studyNotes.*`

---

## 8. Extra Credit page

**Route:** `/extra-credit`

| # | Section | Layout |
|---|---------|--------|
| 1 | **Hero** | Navy; “Snaps & *shorts.*” headline |
| 2 | **Classroom glimpses** | Grid-white; horizontal 9:16 video reel |
| 3 | **Student recommendations** | Navy (dark); testimonial videos |
| 4 | **Student life photos** | Grid-white; `Masonry` gallery (GSAP); click → lightbox |

**Alter karna ho to…** → Video/photo paths in `lib/galleryMasonry.ts`, `lib/studentGallery.ts`

---

## 9. Blog (index + article)

### 9.1 Blog index — `/blog`

| # | Section | Layout |
|---|---------|--------|
| 1 | **Hero + filters** | Cream-50; `VariableProximity` h1; search + category pills |
| 2 | **Featured post** | Gray-50 band; large horizontal card in `SpotlightCard` |
| 3 | **Post grid** | Grid-white; 1/2/3 col `BlogCard` grid |

### 9.2 Blog article — `/blog/[slug]`

| # | Section | Layout |
|---|---------|--------|
| 1 | **Article** | 3-col on lg: sticky TOC · article (max 720px) · author + share rail |
| 2 | **Read next** | 3 related `BlogCard`s |
| 3 | **Registration banner** | Post-footer enroll CTA |

**Content source:** `content/blog-posts.md` → generated `data/posts.ts`  
**Alter karna ho to…** → Add posts in markdown; covers in `public/images/blog/`

---

## 10. Course pages (AS / A2 / O Level)

**Routes:** `/courses/as-level` · `/courses/a2-level` · `/courses/o-level`  
**Template:** `CoursePageTemplate` + level data in `data/courses.*`

| # | Section | Notes |
|---|---------|-------|
| 1 | **Hero** | Navy; breadcrumb; level badge (color per level); hero image right; Orb-Ed CTA |
| 2 | **Registration banner** | Level-specific `ctaTitle` / `ctaSubhead` |
| 3 | **At a glance** | 4 stat cards: syllabus code, duration, format, start date |
| 4 | **Syllabus + sample lectures** | Cream-50; topic accordions; Play/Lock per lesson; `VideoLightbox` |
| 5 | **Sample notes** | Grid-white; `NotesExplorer` for that level |

**Level chip colors (nav dropdown):**
- AS Level: `#1E8FCE`
- A2 Level: `#12466E`
- O Level: `#1C6BAA`

**Alter karna ho to…** → `data/courses.as.ts`, `courses.a2.ts`, `courses.o.ts`

---

## 11. Shared components library

Use this table when redesigning — swap or restyle these building blocks.

| Component | File | Role |
|-----------|------|------|
| `SectionHeader` | `components/shared/SectionHeader.tsx` | Eyebrow + Fraunces h2 + subtitle; light/dark variants |
| `SectionEyebrow` | `components/shared/SectionEyebrow.tsx` | Small uppercase label |
| `SpotlightCard` | `components/shared/SpotlightCard.tsx` | Mouse-following red glow wrapper |
| `VariableProximity` | `components/shared/VariableProximity.tsx` | Interactive Fraunces weight |
| `RotatingText` | `components/shared/RotatingText.tsx` | Cycling headline words |
| `StaggeredMenu` | `components/shared/StaggeredMenu.tsx` | Mobile full-screen nav (GSAP) |
| `Masonry` | `components/shared/Masonry.tsx` | Photo grid layout (GSAP) |
| `AnimateSection` | `components/shared/AnimateSection.tsx` | Scroll-triggered section reveal |
| `AnimateStagger` | `components/shared/AnimateStagger.tsx` | Staggered child entrance |
| `AmbientOrbs` | `components/shared/AmbientOrbs.tsx` | Floating blur decorations |
| `VideoLightbox` | `components/shared/VideoLightbox.tsx` | Fullscreen video modal |
| `BlogCard` | `components/blog/BlogCard.tsx` | Post preview card |
| `SyllabusGrid` | `components/courses/SyllabusGrid.tsx` | Topic accordion + lesson rows |
| `NotesExplorer` | `components/notes/NotesExplorer.tsx` | PDF library explorer |
| `Logo` | `components/shared/Logo.tsx` | Brand mark (dark/light variants) |
| `AffiliationsStack` | `components/layout/AffiliationsStack.tsx` | Stacked affiliation logo cards |

---

## 12. Content & CTA map

### 12.1 Navigation (`NAV_ITEMS`)

| Label | Path |
|-------|------|
| Home | `/` |
| Courses → AS / A2 / O | `/courses/as-level` etc. |
| About | `/about` |
| Notes | `/notes` |
| Extra Credit | `/extra-credit` |
| Blog | `/blog` |
| Contact | `/contact` |

### 12.2 Primary conversion paths

| User intent | Destination |
|-------------|-------------|
| Enroll Oct/Nov 2026 | Orb-Ed LMS (`SITE.lmsRegistration2026` per level) |
| Express interest | `/register` form → Google Sheet |
| Free samples | Home `#sample-lectures` or course syllabus |
| Full notes pack | Orb-Ed or WhatsApp (notes page sticky bar) |
| Questions | `/contact` form or Orb-Ed |

### 12.3 Key files for copy changes

| What | Where |
|------|-------|
| Site-wide text, URLs, hours | `lib/constants.ts` |
| Course content | `data/courses.*.ts` |
| Study notes structure | `data/studyNotes.*.ts` |
| Blog posts | `content/blog-posts.md` |
| Affiliations | `data/affiliations.ts` |
| SEO titles/descriptions | `lib/seo.ts` + per-page `metadata` |

---

## 13. Alteration worksheet

Nayi website ya redesign ke liye yeh template copy karke fill karein. Designer ko yahi section bhej dein.

```
PROJECT: _________________________
TARGET AUDIENCE: _________________
SUBJECT / NICHE: _________________
DEADLINE: _______________________

── BRAND ──
[ ] Logo change: yes / no → new file: ___________
[ ] Color palette: keep navy+red / new: ___________
[ ] Fonts: keep Fraunces+Inter / new: ___________
[ ] Tone: formal / friendly / minimal / bold

── GLOBAL ──
[ ] Header style: transparent hero / always solid / other: _____
[ ] Nav items to add/remove: _______________________
[ ] Footer columns: keep 4 / simplify to: __________
[ ] Remove preloader: yes / no
[ ] WhatsApp vs other chat: ________________________

── HOME PAGE ──
[ ] Hero: slider / single image / video / text-only
[ ] Hero headline: _________________________________
[ ] Remove section: ______________________________
[ ] Add section: __________________________________
[ ] FAQ: keep / move to separate page / remove

── INNER PAGES ──
[ ] Keep About structure: yes / no
[ ] Notes page: keep paywall preview / open all / remove
[ ] Blog: keep / remove / merge with resources
[ ] Course pages: 3 levels / different structure: _____
[ ] Extra Credit gallery: keep masonry / simple grid

── CONTENT ──
[ ] New CTAs: ____________________________________
[ ] New affiliations: ____________________________
[ ] Forms: registration / contact / both / none
[ ] LMS integration: Orb-Ed / other: _____________

── TECH (developer) ──
[ ] Static cPanel deploy: yes / no
[ ] New domain: __________________________________
[ ] Analytics: GA4 ID: ___________________________
```

---

## Quick reference — file map

```
app/
  layout.tsx          → fonts, Header, Footer, global shell
  page.tsx            → home section order
  about/page.tsx
  contact/page.tsx
  register/page.tsx
  notes/page.tsx
  extra-credit/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  courses/*/page.tsx
  globals.css           → design tokens, utility classes

components/
  layout/               → Header, Footer, preloader, WhatsApp
  home/                 → home sections
  shared/               → reusable UI primitives
  blog/, courses/, notes/

tailwind.config.ts      → colors, shadows, fonts
lib/constants.ts        → site copy, nav, CTAs, URLs
data/                   → courses, notes, posts, affiliations
public/images/          → logos, banners, blog covers, gallery
```

---

*Last updated: July 2026 · Shehroz Iqbal Accounting site*
