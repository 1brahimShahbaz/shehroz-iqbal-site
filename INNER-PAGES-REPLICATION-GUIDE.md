# Inner Pages Replication Guide — Shehroz Iqbal Site

> **Purpose:** Replicate **About**, **Notes**, **Extra Credit**, **Courses**, **Blog**, and **Contact** on a new teacher site (e.g. Kashan Iqbal).  
> For each page: **sections in order**, **what information goes in each section**, **where data lives**, and **what to change** for a new subject/teacher.  
> Colours/themes can differ; **section structure stays the same**.

**Reference components:** `app/*/page.tsx`, `components/about/`, `components/notes/`, etc.

---

## Table of contents

1. [About page](#1-about-page-about)
2. [Notes page](#2-notes-page-notes)
3. [Extra Credit page](#3-extra-credit-page-extra-credit)
4. [Course pages](#4-course-pages-coursesas-level-a2-level-o-level)
5. [Blog index](#5-blog-index-blog)
6. [Blog post page](#6-blog-post-page-blogslug)
7. [Contact page](#7-contact-page-contact)
8. [Data files quick map](#8-data-files-quick-map)
9. [Replication checklist](#9-replication-checklist)

---

## 1. About page (`/about`)

**Purpose:** Introduce the teacher, build trust, show qualifications, explain the LMS ecosystem, show student testimonials, drive enrollment.

**SEO title (example):** About Shehroz Iqbal | Accounting Tutor Karachi

---

### Section 1 — Hero (`AboutHero`)

| Field | Information to include |
|-------|------------------------|
| Badge | Short label, e.g. **About Sir Shehroz** |
| **H1** | Teacher full name: **Shehroz Iqbal** |
| Subline | Role + location + boards, e.g. *Accounting tutor · Karachi & online · Cambridge (CAIE) & Edexcel* |
| Bio paragraph 1 | Years teaching + subject + geography (15+ years, Karachi, Pakistan, CAIE/Edexcel) |
| Bio paragraph 2 | Teaching philosophy — logic first, fundamentals, then grades |
| Bio paragraph 3 | Teaching method — concept → worked example → practice → exam application |
| **CTA 1** | “See my courses” → `/courses/as-level` (or main course) |
| **CTA 2** | “Contact on Orb-Ed” → external LMS URL |
| **Portrait image** | Teacher photo, e.g. `/images/aboutpage2.png` |
| Floating badge | Stat highlight, e.g. **13+ yrs** Teaching |

**Replace for new site:** Name, subject, photo path, years, LMS link, course link prefix (`/accounting/courses/...` for Kashan).

---

### Section 2 — Stats bar (`AboutStats`)

Overlaps hero bottom (`-mt-10` white card).

| Stat | Value (example) | Label |
|------|-----------------|-------|
| 1 | **10,000+** | Students taught |
| 2 | **13+** | Years teaching |

**Replace:** Real numbers from teacher. Icons: GraduationCap, CalendarClock.

---

### Section 3 — Background / story

Two-column white section.

#### Left column — long bio

| Field | Information |
|-------|-------------|
| Eyebrow | **Background** |
| H2 | Personal headline, e.g. *Teaching Accounting is what I do — and what I love.* |
| Paragraph 1 | Physical location (`SITE.address`) + teaching style + topics explained plainly |
| Paragraph 2 | Student journey — O Level to A2, referrals, trust |
| Paragraph 3 | Goal for students — mental model, exam technique, support until exam day |

#### Right column — info panels (`AboutInfoPanels`)

**Panel A — Syllabi & topics** (GraduationCap icon)

Bullet list — qualifications / syllabus coverage, e.g.:
- Cambridge AS & A Level Accounting (9706)
- Cambridge O Level Accounting (7707)
- Financial accounting, cost & management accounting
- Structured questions, data response & MCQ technique

**Panel B — What you get as a student** (BookOpen icon)

Bullet list — deliverables, e.g.:
- Live online classes with recorded backups
- Full syllabus notes and past-paper practice
- Sample lectures and recorded topic walkthroughs
- WhatsApp doubt support between sessions
- Registration for [session] via Orb-Ed LMS

**Footer note:** Link to Orb-Ed + `/contact` for pre-enrollment questions.

**Data source:** Hardcoded arrays in `app/about/page.tsx` (`qualifications`, `offerings`).

---

### Section 4 — Philosophy quote (`SirShehrozTagline`)

| Field | Information |
|-------|-------------|
| Quote line 1 | Teacher mantra, e.g. *There is no such thing as luck.* |
| Quote line 2 (accent) | e.g. *Believe in hard work.* |
| Attribution | **Sir Shehroz Iqbal** |

**Replace:** Kashan's personal quote + name.

---

### Section 5 — LMS ecosystem (`AboutEcosystem`)

| Field | Information |
|-------|-------------|
| Eyebrow | **Everything In One Place** |
| H2 | **One platform.** *Every resource.* |
| Subtitle | One sentence — lectures, notes, live sessions, past papers via LMS |
| **Diagram centre** | LMS logo (Orb-Ed) |
| **Node 1** | Recorded lectures |
| **Node 2** | Live sessions |
| **Node 3** | Notes |
| **Node 4** | Past papers |

Animated beams connect nodes to centre hub.

**Replace:** LMS name/logo, node labels if different platform.

---

### Section 6 — Student testimonials (`AboutTestimonials`)

| Field | Information |
|-------|-------------|
| Eyebrow | **What Students Say** |
| H2 | *In their words.* |
| Subtitle | Short intro — student experience in class |
| **Videos** | Horizontal 9:16 testimonial clips from `data/recommendationVideos.ts` |
| Interaction | Muted autoplay loop · tap → fullscreen with sound |

**Replace:** Kashan's recommendation video file paths + captions.

---

### Section 7 — Closing CTA (`AboutCTA`)

| Field | Information |
|-------|-------------|
| Eyebrow | **Oct / Nov 2026 — Enrolment open** |
| H2 | Enrollment headline, e.g. *Ready to turn Accounting into your best subject?* |
| Body | Social proof + urgency (limited seats) |
| **CTA 1** | Enroll → `/register` |
| **CTA 2** | Ask a question → LMS URL |

---

## 2. Notes page (`/notes`)

**Purpose:** Let students preview PDF notes and past papers in-browser; drive full-pack requests via LMS.

**SEO title (example):** Notes Library — O Level, AS, A2 Accounting

---

### Section 1 — Notes hero (`NotesLibrary`)

| Field | Information |
|-------|-------------|
| Eyebrow | **Notes Library** |
| H1 | *Preview notes for every level.* |
| Explainer | First **4** notes per section free preview — watermarked, not downloadable. Rest via full pack on LMS. |
| **CTA** | **Request full pack** → LMS URL |
| **Level tabs** | **O Level** · **AS Level** · **A2 Level** (controls entire page) |

**Business rule:** `NOTES_FREE_PREVIEW_LIMIT = 4` per accordion section.

---

### Section 2 — Study notes explorer

| Field | Information |
|-------|-------------|
| H2 | **Study notes** |
| Subtitle | Dynamic count, e.g. “142 PDFs for AS Level” |
| **Content structure** | Nested accordion groups (`NoteGroup`) |
| Each group | Title (topic/chapter) → list of PDF files |
| Each file row | Title · Preview button OR Lock → LMS |
| **Preview modal** | In-browser PDF with watermark (`NotePreviewModal`) |

**Data structure per file:**
```ts
{ id, title, file: "/notes/..." }
```

**Nested groups:** Topics can contain sub-topics (folders within folders).

**Data source:** `lib/notesLibrary.ts` → built from `data/studyNotes.*.ts` + folder scan.

---

### Section 3 — Yearly papers (`YearlyPapersSection`)

| Field | Information |
|-------|-------------|
| Eyebrow | **Yearly Papers** |
| H2 | **Past papers by year** |
| Subtitle | Unsolved papers, mark schemes, examiner reports — in-browser preview only |
| **Level tabs** | Synced with hero tabs (same active level) |
| **Year accordions** | One per exam year (e.g. 2023, 2022…) |
| Each paper row | Paper name · Preview or Lock |
| Locked footer | CTA bar per year to get full pack on LMS |

**Data structure:**
```ts
{ id, year: "2023", papers: [{ id, title, file }] }
```

---

### Section 4 — Sticky bottom bar (`StickyWhatsAppBar`) — notes only

| Field | Information |
|-------|-------------|
| Shows after | 600px scroll |
| Message | “Want the full pack? Message me on WhatsApp” |
| **CTA** | **Chat now** → LMS/WhatsApp link |
| Note | Replaces floating green bubble on this page |

---

## 3. Extra Credit page (`/extra-credit`)

**Purpose:** Humanise the brand — class clips, student testimonials, photo gallery.

**SEO title (example):** Extra Credit — Photos & Class Clips

---

### Section 1 — Page hero

| Field | Information |
|-------|-------------|
| Eyebrow | **Extra credit** |
| H1 | **Snaps &** *shorts.* |
| Body | Beyond past papers — class glimpses, testimonial videos, session photos |

---

### Section 2 — Classroom glimpses (video strip)

| Field | Information |
|-------|-------------|
| Eyebrow | **On the syllabus** |
| H2 | **Classroom** *glimpses.* |
| Subtitle | Short clips from live sessions |
| **Videos** | 9:16 MP4s from `data/gallery.ts` → `galleryClassroomClips` |
| Each clip | `id`, `src`, optional `caption` |
| Interaction | Horizontal scroll · muted loop · tap → lightbox with sound · prev/next arrows |

**BG:** Light grid white.

---

### Section 3 — Student recommendations (video strip)

| Field | Information |
|-------|-------------|
| Eyebrow | **Outside the textbook** |
| H2 | **Student** *recommendations.* |
| Subtitle | Student voices — classroom experience |
| **Videos** | From `galleryRecommendationClips` or `data/recommendationVideos.ts` |
| **BG:** Dark navy (white text)

---

### Section 4 — Student life gallery (`StudentLifeSection` + `Masonry`)

| Field | Information |
|-------|-------------|
| Eyebrow | **Student life** |
| H2 | **Learning** *together.* |
| Subtitle | Moments from class and community |
| **Photos** | Masonry grid from `lib/galleryMasonry.ts` |
| Each item | `img`, `alt`, optional height |
| Interaction | GSAP layout · hover scale/colour · click → fullscreen lightbox |

**Typical images:** Class photos, banners, event snaps (`public/images/1.jpg`, etc.).

---

## 4. Course pages (`/courses/as-level`, `/courses/a2-level`, `/courses/o-level`)

**Purpose:** Sell one level — syllabus overview, free samples, notes preview, enroll CTA.

**Template:** `CoursePageTemplate` — same 5 sections for all three levels; **content from `data/courses.ts`**.

---

### Section 1 — Course hero

| Field | AS example | Data key |
|-------|------------|----------|
| Breadcrumb | Home › Courses › AS Level | — |
| Badge | **AS LEVEL** · **CAIE 9706** | `badgeLabel`, `badgeSubLabel` |
| H1 | **AS Level Accounting with** *Sir Shehroz Iqbal.* | `headline` + fixed suffix |
| Subhead | One-line value prop | `subhead` |
| Long description | (used in notes section fallback) | `description` |
| **CTA** | Register on Orb-Ed | LMS dashboard URL |
| **Hero image** | Right column full-bleed | `heroImage` |

**Per-level syllabus codes:**

| Page | Code | Duration | Start |
|------|------|----------|-------|
| AS | CAIE 9706 | 9 Months | Oct 2026 |
| A2 | CAIE 9706 | 9 Months | Oct 2026 |
| O | CAIE 7707 | 12 Months | Oct 2026 |

All: **Format** = Online + Recorded

---

### Section 2 — Registration banner

| Field | Information |
|-------|-------------|
| Badge | Registrations Open |
| Title | Level-specific, e.g. **Ready to start AS Accounting?** (`ctaTitle`) |
| Subtitle | Session + deliverables + urgency (`ctaSubhead`) |
| CTA | Register on Orb-Ed |

---

### Section 3 — At a glance (`CourseAtAGlance`)

Four stat cards:

| Card | Label | Example value |
|------|-------|---------------|
| 1 | Syllabus | CAIE 9706 |
| 2 | Duration | 9 Months |
| 3 | Format | Online + Recorded |
| 4 | Start | Oct 2026 |

---

### Section 4 — Course syllabus & sample lectures

| Field | Information |
|-------|-------------|
| Eyebrow | **Course Syllabus** |
| H2 | **Try a lecture before you register.** |
| Subtitle | Sample lectures from [level] ([code]) syllabus are free; full course on LMS |
| **SyllabusGrid** | Topic accordions from `data/syllabi.ts` per level |

**Per topic accordion:**
- Topic title
- Lesson rows inside:
  - **Free:** Play icon → opens `VideoLightbox` with `videoSrc`
  - **Locked:** Lock icon → opens LMS

**Data per lesson:**
```ts
{ title, videoSrc?: string, locked?: boolean }
```

---

### Section 5 — Sample notes (level-filtered)

| Field | Information |
|-------|-------------|
| Eyebrow | **Sample Notes** |
| H2 | **Notes built for [LEVEL] students.** |
| Subtitle | PDF count + “in-browser only, not downloadable” OR course `description` if no notes |
| **NotesExplorer** | Same component as Notes page, filtered to one level's `studyNoteGroups` |

---

## 5. Blog index (`/blog`)

**Purpose:** SEO content hub — search, filter, featured post, grid of articles.

**SEO title (example):** Blog | Shehroz Iqbal Accounting

---

### Section 1 — Blog hero + filters

| Field | Information |
|-------|-------------|
| Eyebrow | **The Blog** |
| H1 | **Accounting, exams, and** *everything in between.* |
| Subtitle | Tips, walkthroughs, concept explainers — updated weekly |
| **Search input** | Filters by title, excerpt, keywords |
| **Category pills** | All + unique categories from posts |

**Categories used (examples):**
Study Guide · Exam Technique · Concept Explainer · O Level · Tuition & Learning · Exam Boards · Exam Preparation · Exam Tips · Concepts · Past Papers · News

---

### Section 2 — Featured post

| Field | Information |
|-------|-------------|
| Selection | Post with `featured: true` in data (fallback: first post) |
| Layout | Large horizontal card — cover left, copy right |
| Badge | **Featured · [category]** |
| Title | Post title |
| Excerpt | Short summary |
| Author row | Avatar + **Sir Shehroz Iqbal** + reading time |
| Link | Read article → `/blog/[slug]` |

---

### Section 3 — Post grid

| Field | Information |
|-------|-------------|
| Layout | 1 / 2 / 3 column grid |
| Cards | All non-featured posts matching search + category filter |
| Empty state | “No posts match your filters yet.” |

**Each `BlogCard` shows:**
- Cover image (16:9)
- Category pill
- Title (max 3 lines)
- Excerpt (2 lines)
- Date · reading time

**Data source:** `content/blog-posts.md` → `scripts/generate-blog-posts.ts` → `data/postsContent.ts`

---

## 6. Blog post page (`/blog/[slug]`)

**Purpose:** Full article + related posts + enrollment CTA.

**Generated at build:** `generateStaticParams()` from all post slugs.

---

### Section 1 — Article (3-column on desktop)

#### Left — Table of contents (sticky)

- Auto-built from all `h2` blocks in post body
- Anchor links to heading IDs

#### Centre — Article body

| Field | Information |
|-------|-------------|
| Category pill | e.g. **Study Guide** |
| H1 | Post title (italic Fraunces) |
| Author | Avatar + name + **date** + **reading time** |
| Cover | 16:9 hero image |
| **Body blocks** | See block types below |

**Body block types:**

| Type | Renders as |
|------|------------|
| `p` | Paragraph |
| `h2` | Section heading (TOC anchor) |
| `quote` | Blockquote with gold left border |
| `callout` | Tip box — cream bg + lightbulb icon |

**Post metadata (per post):**
```ts
{
  slug, title, category, excerpt, cover,
  date,           // e.g. "March 12, 2026"
  readingTime,    // e.g. "8 min read"
  featured?, keywords?, body: BlogBodyBlock[]
}
```

#### Right — Author sidebar + share

| Field | Information |
|-------|-------------|
| Avatar | Teacher photo |
| Name | Sir Shehroz Iqbal |
| Tagline | Accounting tutor · CAIE & Edexcel |
| Stats | 13+ years · 1,250+ students |
| CTA | View courses → course page |
| **ShareRail** | Copy link / social share buttons |

---

### Section 2 — Read next

| Field | Information |
|-------|-------------|
| Divider | Gold horizontal line |
| H3 | **Read next.** |
| Grid | 3 related `BlogCard`s — same category preferred |

---

### Section 3 — Registration banner

| Field | Information |
|-------|-------------|
| Title | **Liked this? Learn directly with me.** |
| Subtitle | Register for Oct/Nov 2026 — classes, recordings, notes |
| CTA | Orb-Ed dashboard |

---

## 7. Contact page (`/contact`)

**Purpose:** Multiple contact channels, office hours, feedback form, map.

**SEO title (example):** Contact Shehroz Iqbal | Accounting Tutor Karachi

**JSON-LD:** LocalBusiness schema injected in page head.

---

### Section 1 — Page hero

| Field | Information |
|-------|-------------|
| Eyebrow | **Get In Touch** |
| H1 | *Let's talk.* |
| Intro | Questions about course, timings — personal reply promise |

---

### Section 2 — Contact cards (3) + office hours

**Card 1 — Chat & support**

| Field | Value |
|-------|-------|
| Icon | Phone |
| Label | CHAT & SUPPORT |
| Title | **Message on Orb-Ed** |
| Link | Open Orb-Ed → `SITE.orbedUrl` |

**Card 2 — Email**

| Field | Value |
|-------|-------|
| Icon | Mail |
| Label | EMAIL |
| Title | **shehroz420si@gmail.com** |
| Link | mailto: |

**Card 3 — Visit**

| Field | Value |
|-------|-------|
| Icon | MapPin |
| Label | VISIT |
| Title | **Alpha College, 38-C P.E.C.H.S Block 6, Karachi, Pakistan** |
| Link | Google Maps directions |

**Hours card (`HoursCard`):**

| Day | Hours |
|-----|-------|
| Monday – Thursday | 7:30 AM – 3:30 PM |
| Friday – Saturday | 9:00 AM – 1:00 PM |
| Sunday | Closed |

**Data source:** `SITE.openHours` in `lib/constants.ts`

---

### Section 3 — Feedback form

| Field | Information |
|-------|-------------|
| Eyebrow | **Feedback** |
| H2 | *We'd love to hear from you.* |
| Subtitle | Experience, suggestions, questions — read by teacher's team |

**Form fields (`FeedbackForm`):**

| Field | Validation | Placeholder |
|-------|------------|-------------|
| Your name | Required | e.g. Ahmed Khan |
| Email | Required, valid email | you@example.com |
| Your feedback | Required, 10–2000 chars | Share experience… |
| Honeypot | Hidden bot field | — |

**Submit:** Sends JSON to `NEXT_PUBLIC_FEEDBACK_ENDPOINT` (Google Apps Script → Google Sheet).

**Success state:** Thank you message + “Send another message” button.

**Error state:** Config missing or network error message.

---

### Section 4 — Map (`ContactMapSection`)

| Field | Information |
|-------|-------------|
| Eyebrow | **Find Us** |
| H2 | *Visit Alpha College.* |
| **Map** | Google Maps iframe — `SITE.mapEmbed` |
| **Overlay card** | College name + full address |
| **CTA** | Get directions → Google Maps URL |

---

## 8. Data files quick map

| Page | Primary data / config |
|------|------------------------|
| **About** | `app/about/page.tsx` (qualifications, offerings arrays) · `AboutHero` paragraphs · `SirShehrozTagline` quote · `data/recommendationVideos.ts` |
| **Notes** | `lib/notesLibrary.ts` · `data/studyNotes.*.ts` · PDF files in `public/notes/` |
| **Extra Credit** | `data/gallery.ts` · `lib/galleryMasonry.ts` · videos in `public/videos/` |
| **Courses** | `data/courses.ts` · `data/syllabi.ts` · `data/studyNotes.*.ts` (per level) |
| **Blog index** | `data/postsContent.ts` (generated) · `content/blog-posts.md` |
| **Blog post** | Same posts array · cover images in `public/images/blog/` |
| **Contact** | `lib/constants.ts` → `SITE.email`, `SITE.address`, `SITE.mapEmbed`, `SITE.openHours`, `FEEDBACK_ENDPOINT` |

---

## 9. Replication checklist

Use this when building Kashan (or any clone). For **each page**, copy section order exactly; swap content only.

### About
- [ ] Teacher name, photo, years, student count
- [ ] 3 hero bio paragraphs
- [ ] Qualifications bullet list (syllabus codes for subject)
- [ ] Offerings bullet list (what students get)
- [ ] Personal quote
- [ ] LMS logo + ecosystem node labels
- [ ] Testimonial video files
- [ ] CTA session dates

### Notes
- [ ] PDF folder structure per level (O / AS / A2)
- [ ] Yearly papers grouped by year
- [ ] Free preview limit (default: 4 per section)
- [ ] LMS link for locked content
- [ ] Sticky bar message

### Extra Credit
- [ ] 5+ classroom clip MP4s
- [ ] 3+ recommendation MP4s
- [ ] 8+ gallery photos with alt text

### Courses (×3 levels)
- [ ] `CourseContent` object per level in config
- [ ] Syllabus topics + which lessons are free sample videos
- [ ] Hero image per level
- [ ] Level-specific CTA copy
- [ ] Notes groups for that level only

### Blog
- [ ] 15+ posts in markdown with slug, category, excerpt, cover
- [ ] One post marked `featured: true`
- [ ] Author avatar + bio sidebar text
- [ ] Related posts logic (same category)

### Contact
- [ ] Email, phone/WhatsApp, LMS URL
- [ ] Physical address + map embed URL
- [ ] Office hours object
- [ ] Google Apps Script feedback endpoint in `.env.local`

### Paths (Kashan multi-subject)
Prefix all routes, e.g. `/accounting/about`, `/maths/notes`, `/stocks/blog` — **same sections inside each**.

---

*Shehroz Iqbal site · Inner pages replication guide · July 2026*
