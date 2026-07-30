# Shehroz Iqbal Site — Page & Section Inventory

> **Purpose:** Har page par **sections kis order mein hain**, har section mein **kya content hai**, aur **font / colour / button type** kya use hota hai — section-by-section.  
> **Use case:** Kashan Iqbal (ya koi nayi site) banate waqt yahi structure copy karo; **colours subject ke mutabiq badlenge**, layout aur fonts same rahenge.

---

## Font & colour reference (site-wide)

### Fonts

| Token | Font family | Used for |
|-------|-------------|----------|
| `font-fraunces` | **Fraunces** (serif, variable) | H1, H2, H3, quotes, italic accents, display headings |
| `font-inter` | **Inter** (sans) | Body, nav links, buttons, forms, labels, paragraphs |
| `font-space` | **Space Grotesk** | Stat numbers (CountUp), tabular nums |

### Eyebrow style (`.eyebrow`)

| Property | Value |
|----------|-------|
| Font | Inter, **semibold**, **uppercase** |
| Size | `0.8125rem` (13px) |
| Letter-spacing | `0.12em` |
| Colour | `navy-700` (#12466E) — dark sections par `white/90` |

### Button types

| Class | Shape | Font | Colours (Shehroz) |
|-------|-------|------|-------------------|
| `.btn-primary` | Rounded-full pill | Inter semibold | BG `gold-500` (#DC2626 red), white text, red glow shadow |
| `.btn-outline-navy` | Rounded-full | Inter semibold | Border navy-900, hover fill navy |
| `.btn-outline-white` | Rounded-full | Inter semibold | Border white, hover fill white |
| `.btn-secondary` | Rounded-full | Inter semibold | BG navy-900, white text |
| `.btn-whatsapp` | Rounded-full | Inter semibold | BG `#25D366`, white text |

> **Note for new sites:** `gold-*` = brand accent (currently **red** on Shehroz). Maths/Stocks par yeh purple/green ho sakta hai — **structure same**, colour tokens badlo.

### Background bands (section alternation)

| Class | Look |
|-------|------|
| `bg-navy-900` | Dark navy sections |
| `bg-cream-50` | Light cool white (#EEF6FC) |
| `bg-grid-white` | White + subtle blue grid lines |
| `bg-gray-50` | Very light gray (#F8F9FB) |
| `bg-white` | Plain white |

---

## Global elements (har page par, `<main>` ke bahar)

---

### G0. Site preloader (first visit only)

| Item | Detail |
|------|--------|
| **Type** | Full-screen overlay until assets load |
| **BG** | Navy-900 |
| **Logo** | Animated fill |
| **Text** | Inter — “Shehroz Iqbal · Accounting” |
| **Progress** | Bar at bottom |
| **Min time** | ~900ms visible |

---

### G1. Header (fixed top)

| Item | Detail |
|------|--------|
| **Position** | Fixed, `z-40`, full width |
| **Height** | `h-20 lg:h-24` (shrinks to `4.5rem / h-20` on scroll) |
| **BG (scrolled)** | White 82% + `backdrop-blur` + shadow |
| **BG (home hero, not scrolled)** | Transparent + dark scrim gradient |
| **Top hairline (scrolled)** | 3px gradient navy → gold → navy |

#### G1a. Logo (left)

| Item | Detail |
|------|--------|
| **Component** | `Logo` variant `dark`, size `header` |
| **Link** | `/` |

#### G1b. Desktop nav (centre) — `font-inter`, 13–14px, medium

| # | Label | Link | Type |
|---|-------|------|------|
| 1 | Home | `/` | Text link + gold underline on hover/active |
| 2 | Courses | `/courses` | **Dropdown button** + chevron |
| 2a | ↳ AS Level | `/courses/as-level` | Dropdown item |
| 2b | ↳ A2 Level | `/courses/a2-level` | Dropdown item |
| 2c | ↳ O Level | `/courses/o-level` | Dropdown item |
| 3 | About | `/about` | Text link |
| 4 | Notes | `/notes` | Text link |
| 5 | Extra Credit | `/extra-credit` | Text link |
| 6 | Blog | `/blog` | Text link |
| 7 | Contact | `/contact` | Text link |

**Nav link colours:**
- Default (light page): `navy-900`, hover → `gold-500`
- Active: `gold-500` + gold underline bar
- Over home hero (not scrolled): `white/85`, active `white`

**Courses dropdown header:** Inter 11px uppercase, `gold-500` on `navy-900` bar

#### G1c. Header buttons (right)

| # | Label | Type | Style |
|---|-------|------|-------|
| 1 | **Study Online** | External link → Orb-Ed | Over hero: outline white glass pill. Scrolled: **filled navy-900** pill + arrow icon |
| 2 | **Enroll · Oct/Nov** (mobile) / **Enroll for Oct/Nov 2026** (desktop xl) | Link → `/register` | **`.btn-primary`** red pill + arrow |

#### G1d. Mobile nav

| Item | Detail |
|------|--------|
| **Component** | `MobileStaggeredNav` (GSAP full-screen menu) |
| **Toggle** | Hamburger, fixed top-right |
| **Items** | Same as desktop nav + social links |

---

### G2. Footer

| Item | Detail |
|------|--------|
| **BG** | `navy-900`, white text |
| **Top decoration** | Gold gradient hairline + blur orb |

#### G2a. Affiliations row (top of footer)

| Item | Detail |
|------|--------|
| **Component** | `FooterAffiliations` |
| **Content** | Orb-Ed, Alpha College, Kashan's Academy logos (linked) |

#### G2b. Four columns

| Column | Heading font | Content |
|--------|--------------|---------|
| **Brand** | Fraunces 2xl bold “Shehroz Iqbal” | Tagline Inter sm white/70 · **btn-primary** enroll · Social icon circles (navy-700 → hover gold) |
| **Quick Links** | Fraunces base semibold + gold bar | Home, Enroll, About, Notes, Extra Credit, Blog, Contact — `.footer-link` Inter sm white/80 |
| **Courses** | Same heading style | AS / A2 / O Level links |
| **Contact** | Same heading style | Orb-Ed message, email, address, “Enroll on Orb-Ed” gold link |

#### G2c. Copyright bar

| Item | Detail |
|------|--------|
| **Font** | Inter xs white/60 |
| **Text** | © year · Sir Shehroz Iqbal · “Academic excellence in Accounting.” |

---

### G3. Floating chat button

| Item | Detail |
|------|--------|
| **Position** | Fixed bottom-right |
| **Style** | Green circle `#25D366`, pulse ring |
| **Hidden on** | `/notes` page |
| **Link** | Orb-Ed (WhatsApp placeholder) |

---

### G4. Scroll to top

| Item | Detail |
|------|--------|
| **Trigger** | After 400px scroll |
| **Style** | Gold circular button, above chat bubble |

---

## HOME PAGE (`/`)

**Order top → bottom** (Header/Footer global hain)

---

### 1. Hero banner carousel (`HeroSlider`)

| Item | Detail |
|------|--------|
| **BG** | `navy-900` + `AmbientOrbs` dark |
| **Type** | Embla carousel, 3 slides, 6s autoplay, loop |
| **Controls** | Dot indicators (active = gold bar) · Prev/next glass circles (desktop) |

#### Slide 1

| Element | Font | Colour | Text |
|---------|------|--------|------|
| Eyebrow | Inter 10–12px uppercase tracking-wide | `gold-500` | **Cambridge (CAIE) Accounting** |
| Headline (desktop) | Fraunces 3.5–4.25rem semibold | white + **RotatingText** italic gold | **Master Accounting for** + rotates: “A* results.” / “9706 mastery.” / “exam success.” / “top grades.” |
| Headline (mobile) | Fraunces 1.5rem | white | **A* results.** |
| Mobile tagline | Inter 13px medium | white/75 | Master Accounting |
| Subhead | Inter 13–16px | white/85 | A Level & O Level Accounting tuition in Karachi and online across Pakistan… |
| **Button 1** | `.btn-primary` | Red pill | **Register on Orb-Ed** → Orb-Ed dashboard |
| **Button 2** | Outline white pill | Inter semibold | **Sample lecture** → `#sample-lectures` |
| Rating row | Inter 11–14px | gold stars + white/70 | ★★★★★ **10,000+ students** |
| **Image** | — | — | `banner1.png` |

#### Slide 2

| Element | Text |
|---------|------|
| Eyebrow | **Concept-first · Exam-focused** |
| Headline | **From foundations to** *A* mastery.* |
| Subhead | 13+ years teaching CAIE 9706 and O Level 7707… |
| **Image** | `banner2.jpg` |

#### Slide 3

| Element | Text |
|---------|------|
| Eyebrow | **Oct/Nov 2026 — Open** |
| Headline | **Live + recorded classes,** *personalised feedback.* |
| Subhead | Weekly past-paper marking, 24/7 WhatsApp doubt support… |
| **Image** | `banner3.jpg` |

---

### 2. Session announcement (`SessionAnnouncement`)

| Item | Detail |
|------|--------|
| **BG** | `navy-900` + grid overlay + gold/navy blur orbs |
| **Layout** | 2 columns: copy left · registration image right |

| Element | Font | Colour | Content |
|---------|------|--------|---------|
| Badge pill | Inter xs uppercase (`.pill-gold-outline-dark`) | gold border, ping dot | **Oct/Nov Session 2026 · Live Now** |
| H2 | Fraunces 1.9–3.5rem semibold | white + **RotatingText** italic gold | **Oct/Nov Session 2026 is** + rotates: live now / open for enrolment / accepting students / ready to enrol + “ on Orb-Ed” |
| Body | Inter 14–17px | white/85 | Enrolment open for O & A Level Accounting… |
| Highlight 1 | Inter 15px semibold + 13px desc | white / white/65 | **Recorded lectures** — Full HD recordings… |
| Highlight 2 | Same | Same | **Past papers** — Topical and yearly… |
| Highlight 3 | Same | Same | **Reading resources** — Curated notes… |
| **CTA** | `.btn-primary` | Red | **Register on Orb-Ed** |
| Helper link | Inter xs–sm | gold-500 | First time on Orb-Ed? → `/#orbed-guide` |
| **Image** | — | Rounded card frame | `registrationbanner.jpg` |

---

### 3. Orb-Ed registration guide (`OrbEdRegistrationGuide`) — `#orbed-guide`

| Item | Detail |
|------|--------|
| **BG** | `cream-50` |
| **Type** | Collapsible `<details>` accordion |

| Element | Font | Content |
|---------|------|---------|
| Summary title | Inter 14–15px medium navy-900 | **Need help in registering on Orb-Ed?** + Orb-Ed icon |
| Intro | Inter 14–15px gray-500 | Orb-Ed is Sir Shehroz's platform for Oct/Nov 2026… |
| Step 1–4 | Inter body, step titles semibold navy | Open Orb-Ed → Log in → Choose level → Select course |
| Course list | Inter sm | O / AS / A2 course names (Oct/Nov Batch 2026) |
| “Still stuck?” card | Fraunces heading on navy card | CTA to Orb-Ed |

---

### 4. Sample lectures (`SampleLectures`) — `#sample-lectures`

| Item | Detail |
|------|--------|
| **BG** | `cream-50` |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | `.eyebrow` | **Sample Lectures** |
| H2 | Fraunces 34–42px + **VariableProximity** italic | **Try a lecture** *before you register.* |
| **Level tabs** | Inter sm semibold pills | **AS Level** · **A2 Level** · **O Level** (active = navy-900 fill white text) |
| Syllabus grid | Inter | Topic accordions + free video rows (Play/Lock) |
| Footer link | Inter sm semibold navy | View the full [level] course → |

---

### 5. Sample notes (`SampleNotes`)

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | `.eyebrow` | **Sample Notes** |
| H2 | Fraunces 34–42px | **Notes that actually click.** |
| Subtitle | Inter 16px gray-500 | Concise, exam-ready summaries… |
| **Cards** | — | `SampleNoteCard` grid (1/2/3 cols) — note title, level, preview |
| Link 1 | Inter sm semibold | Browse all notes & past papers → `/notes` |
| Link 2 | Inter 15px pill cream-50 | Request full pack on WhatsApp |

---

### 6. Classroom reels (`ReelsCarousel`)

| Item | Detail |
|------|--------|
| **BG** | `navy-900` (dark section) |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | `.eyebrow` white/90 | **A Glimpse Inside the Classroom** |
| H2 | Fraunces 34–42px italic white | *Real classes. Real moments.* |
| Subtitle | Inter 16px white/70 | Short clips from live sessions… |
| **Videos** | 9:16 tiles, muted loop | glimpse1–5.mp4 · tap → lightbox with sound |
| Nav | Glass prev/next buttons | — |

---

### 7. Extra credit preview (`ExtraCreditPreview`)

| Item | Detail |
|------|--------|
| **BG** | `cream-50` |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **Extra credit** |
| H2 | Fraunces + italic navy | **Life outside the** *classroom.* |
| Subtitle | Inter gray-500 | Photos from student moments… |
| **Photo grid** | 2–4 cols, 4:5 aspect, `card-rest` | 8 preview photos |
| **CTA** | `.btn-primary` | See gallery → `/extra-credit` |

---

### 8. Blog preview (`BlogPreview`)

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **The blog** |
| H2 | Fraunces + italic | **Read some of my** *blogs.* |
| Subtitle | Inter gray-500 | Study guides, exam technique… |
| **Cards** | — | `BlogCard` ×4 (cover, category, title, excerpt) |
| **CTA** | `.btn-primary` | View more → `/blog` |

---

### 9. Registration banner (`RegistrationBanner`)

| Item | Detail |
|------|--------|
| **BG** | `navy-900` + grid + gold blur orb |
| **Layout** | 2 col: copy + CTA right |

| Element | Font | Content |
|---------|------|---------|
| Badge | `.pill-gold-outline-dark` + ping | **Registrations Open** |
| H2 | Fraunces 28–42px white + **RotatingText** red pill italic | **Registrations are open for** + rotates: Oct/Nov 2026 / AS 9706 / A2 9706 / O 7707 |
| Body | Inter 15px white/80 | Live online classes, recorded backups, full notes… |
| **CTA** | `.btn-primary` | Register on Orb-Ed |
| Urgency | Inter sm white/60 | Limited seats · Closes 31 Aug 2026 |

---

### 10. FAQ (`HomeFaq`) — `#faq`

| Item | Detail |
|------|--------|
| **BG** | `navy-900` + AmbientOrbs + grid overlay |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **FAQs** (dark variant) |
| H2 | Fraunces white + **VariableProximity** italic gold | **Your questions,** *answered.* |
| Subtitle | Inter white/70 | A Level & O Level Accounting tuition… |
| **Accordion items** | Fraunces 16–18px semibold question · Inter 14–15px answer | Wrapped in `SpotlightCard` · chevron gold · ~12 Q&As from `HOME_FAQS` |
| Bottom CTA | Inter links | Still have questions? → contact / Orb-Ed |

---

## ABOUT PAGE (`/about`)

---

### 1. About hero (`AboutHero`)

| Item | Detail |
|------|--------|
| **BG** | `navy-900` + AmbientOrbs + mesh glows |
| **Layout** | 2 col: copy left · portrait right |

| Element | Font | Content |
|---------|------|---------|
| Badge | Inter 11px uppercase gold | ✨ **About Sir Shehroz** |
| H1 | Fraunces 40–60px bold white | **Shehroz Iqbal** |
| Subline | Inter 15–16px white/65 | Accounting tutor · Karachi & online · CAIE & Edexcel |
| Bio paragraphs ×3 | Inter 15px white/80 | 15+ years teaching… philosophy… patience and structure… |
| **Button 1** | `.btn-primary` sm | See my courses → `/courses/as-level` |
| **Button 2** | Outline white pill sm | Message on Orb-Ed |
| Portrait | — | Teacher photo + gradient frame |
| Floating badge | Fraunces | **13+ yrs** experience |

---

### 2. Stats bar (`AboutStats`) — overlaps hero (`-mt-10`)

| Item | Detail |
|------|--------|
| **Type** | White rounded-3xl card, 2×2 grid, shadow |
| **Stat 1** | Space Grotesk 40–48px bold navy | **10,000+** · Inter label “Students taught” |
| **Stat 2** | Same | **13+** · “Years teaching” |
| Icons | Gold circle bg | GraduationCap, CalendarClock |

---

### 3. Background / story

| Item | Detail |
|------|--------|
| **BG** | `bg-white` |
| **Layout** | 2 col |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **Background** |
| H2 | Fraunces 28–34px navy | **Teaching Accounting is what I do — and what I love.** |
| Body ×3 | Inter 15px gray-600 | Long bio paragraphs (address, reputation, goals…) |
| **Info panel 1** | `SpotlightCard` | **Syllabi & topics** — qualification bullet list |
| **Info panel 2** | `SpotlightCard` | **What you get** — offerings bullet list |
| Footer note | Inter 14px gray-500 | Questions? Orb-Ed / contact links |

---

### 4. Philosophy quote (`SirShehrozTagline`)

| Item | Detail |
|------|--------|
| **BG** | `cream-50` |
| **Type** | Large pull-quote |

| Element | Font | Content |
|---------|------|---------|
| Quote mark | Fraunces oversized | “ |
| Quote | Fraunces italic large | Teacher philosophy / mantra |
| Accent line | Gold gradient bar | — |
| Cite | Inter sm | — Sir Shehroz Iqbal |

---

### 5. Orb-Ed ecosystem (`AboutEcosystem`)

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **Everything In One Place** |
| H2 | Fraunces + italic gold | **One platform.** *Every resource.* |
| Subtitle | Inter gray-500 | Recorded lectures, notes, live sessions… |
| **Diagram** | AnimatedBeam | Orb-Ed hub → 4 nodes (lectures, notes, live, papers) |

---

### 6. Testimonials (`AboutTestimonials` → video reel)

| Item | Detail |
|------|--------|
| **BG** | `navy-900` |
| **Type** | Same horizontal 9:16 video strip as home reels |
| **Content** | Student testimonial videos |

---

### 7. Closing CTA (`AboutCTA`)

| Item | Detail |
|------|--------|
| **Type** | Rounded navy card in container |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | Inter 11px uppercase gold | **Oct / Nov 2026 — Enrolment open** |
| H2 | Fraunces 30–42px white | **Ready to turn Accounting into your best subject?** |
| Body | Inter 15px white/70 | Join hundreds of students… |
| **Button 1** | `.btn-primary` | Enroll for Oct/Nov 2026 → `/register` |
| **Button 2** | Outline white | Ask on Orb-Ed |

---

## CONTACT PAGE (`/contact`)

---

### 1. Page hero

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **Get In Touch** |
| H1 | Fraunces 44–56px semibold **italic** navy | **Let's talk.** |
| Intro | Inter 16px gray-500 | Have a question about a course… personal reply. |

---

### 2. Contact cards (3) + office hours

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |
| **Card style** | `card-rest` rounded-2xl `cream-50` p-6 |

| Card | Icon circle | Label | Title font | Content |
|------|-------------|-------|------------|---------|
| 1 | gold/15 + Phone | CHAT & SUPPORT (11px uppercase gray) | Fraunces 20px navy | **Message on Orb-Ed** · Open Orb-Ed → |
| 2 | Mail | EMAIL | Fraunces 20px | **shehroz420si@gmail.com** |
| 3 | MapPin | VISIT | Fraunces 18px | **Alpha College, PECHS…** · Get directions |

**Hours card (`HoursCard`):** Mon–Thu, Fri–Sat times, Sunday closed — Inter sm

---

### 3. Feedback form section

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **Feedback** |
| H2 | Fraunces 32–40px italic navy | **We'd love to hear from you.** |
| Subtitle | Inter gray-500 | Share experience, suggestions… |
| **Form fields** | Inter, `.input-field` rounded-xl | Name · Email · Message |
| **Submit** | `.btn-primary` | Send message |

---

### 4. Map section (`ContactMapSection`)

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |
| **Type** | Rounded-3xl map frame, Google Maps iframe |
| **Overlay card** | Glass address card + directions link |

---

## REGISTER PAGE (`/register`)

---

### 1. Page hero

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **Enrolment** |
| H1 | Fraunces 44–56px italic navy | **Enroll for Oct/Nov 2026** |
| Intro | Inter gray-500 | Fill in details… link to `/#orbed-guide` |

---

### 2. Form + sidebar

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |
| **Layout** | `lg:grid-cols-[1.4fr_1fr]` |

#### Left — `RegistrationForm`

| Field | Type | Label style |
|-------|------|-------------|
| Name | text | `.label-mini` 11px uppercase gray |
| Email | email | same |
| Phone | tel | same |
| Grade | select | O Level (7707) / AS (9706) / A2 (9706) |
| Message | textarea | optional |
| Submit | `.btn-primary` | Submit registration |

#### Right — perk cards ×3

| Card | Title (Fraunces lg) | Body (Inter sm gray) |
|------|---------------------|----------------------|
| 1 | **Quick response** | Team reviews every registration… |
| 2 | **Private & secure** | Details never shared… |
| 3 | **Prefer WhatsApp?** | Reach out directly… |

| Button | Type |
|--------|------|
| Register on Orb-Ed | `.btn-outline-navy` full width |
| Step-by-step Orb-Ed guide | Text link → `/#orbed-guide` |
| Message us on Orb-Ed | `.btn-secondary` full width |

---

## NOTES PAGE (`/notes`)

---

### 1. Notes hero (`NotesLibrary`)

| Item | Detail |
|------|--------|
| **BG** | `navy-900` + grid overlay, centred |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **Notes Library** |
| H1 | Fraunces 40–56px italic white | **Preview notes for every level.** |
| Body | Inter white/80 | First N notes free preview… watermarked… |
| **CTA** | Gold pill button | **Request full pack** → Orb-Ed |
| **Level tabs** | Inter 13px pills | **O Level** · **AS Level** · **A2 Level** (active = gold fill) |

---

### 2. Study notes explorer

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |

| Element | Font | Content |
|---------|------|---------|
| H2 | Fraunces 32–40px navy | **Study notes** |
| Subtitle | Inter gray-500 | Browse by topic… |
| **Accordions** | Inter | Nested topic groups · preview/lock rows · PDF modal |

---

### 3. Yearly papers section

| Item | Detail |
|------|--------|
| **BG** | `cream-50`, top border |

| Element | Font | Content |
|---------|------|---------|
| H2 | Fraunces navy | **Yearly papers** |
| **Year accordions** | Inter | Plus/minus headers · paper rows · lock for paid |

---

### 4. Sticky bottom bar (`StickyWhatsAppBar`) — notes only

| Item | Detail |
|------|--------|
| **Trigger** | After 600px scroll |
| **Style** | Fixed bottom navy bar |
| **CTA** | Request full notes pack |

*(Replaces floating green button on this page)*

---

## EXTRA CREDIT PAGE (`/extra-credit`)

---

### 1. Page hero

| Item | Detail |
|------|--------|
| **BG** | `navy-900` + grid, centred |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **Extra credit** |
| H1 | Fraunces 44–68px white | **Snaps &** *shorts.* (italic gold) |
| Body | Inter 17px white/80 | Beyond past papers — glimpses, testimonials, photos… |

---

### 2. Classroom glimpses (video strip)

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **On the syllabus** |
| H2 | Fraunces 32–40px italic navy | **Classroom** *glimpses.* |
| Subtitle | Inter gray-500 | Short clips from live sessions… |
| **Videos** | 9:16 horizontal scroll | Classroom clips · lightbox on tap |

---

### 3. Student recommendations (video strip)

| Item | Detail |
|------|--------|
| **BG** | `navy-900` (dark) |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | white/90 **Outside the textbook** |
| H2 | Fraunces italic **white** | **Student** *recommendations.* |
| **Videos** | Same reel pattern | Testimonial videos |

---

### 4. Student life photos (`StudentLifeSection` + `Masonry`)

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **Learning together** |
| H2 | Fraunces navy | **Student life** *gallery.* |
| **Gallery** | GSAP Masonry grid | Photos 1,3,4,5 + banners · click → lightbox |

---

## BLOG INDEX (`/blog`)

---

### 1. Blog hero + filters

| Item | Detail |
|------|--------|
| **BG** | `cream-50` |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **The Blog** |
| H1 | Fraunces 40–56px italic navy + **VariableProximity** | **Accounting, exams, and** *everything in between.* |
| Subtitle | Inter gray-500 | Tips, walkthroughs, concept explainers… |
| **Search** | Inter sm, rounded-full input | Placeholder: Search articles… |
| **Category pills** | Inter 13px | All · [categories] — active = gold fill white text |

---

### 2. Featured post

| Item | Detail |
|------|--------|
| **BG** | `gray-50` |
| **Type** | Large horizontal `SpotlightCard` |

| Element | Font | Content |
|---------|------|---------|
| Badge | Inter 10px uppercase white on gold | **Featured · [category]** |
| Title | Fraunces 26–34px navy | Featured post title |
| Excerpt | Inter 15px gray-500 | — |
| Author row | Inter 13px | Avatar + **Sir Shehroz Iqbal** · reading time |
| Link | Inter sm semibold | Read article → |

---

### 3. Post grid

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |
| **Layout** | 1 / 2 / 3 col `BlogCard` grid |
| **Empty state** | Inter gray-500 centered | No posts match filters |

---

## BLOG POST (`/blog/[slug]`)

---

### 1. Article layout (3 columns on lg)

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |
| **Left (sticky)** | `TOC` — table of contents from H2s |
| **Centre (max 720px)** | Article |
| **Right (sticky)** | Author card + `ShareRail` |

| Element | Font | Content |
|---------|------|---------|
| Category pill | Inter 10px uppercase | `[category]` on gold/15 bg |
| H1 | Fraunces 36–48px **italic** navy | Post title |
| Author | Inter base semibold + sm gray | Avatar · Sir Shehroz Iqbal · date · reading time |
| Cover | 16:9 rounded-2xl | Hero image |
| Body paragraphs | Inter 17px ink-900 leading 1.8 | — |
| H2 in body | Fraunces 28px navy | Section headings |
| Blockquote | Fraunces 22px italic, gold left border | — |
| Callout | Inter 15px on cream-50, Lightbulb icon | Tip boxes |

---

### 2. Read next

| Item | Detail |
|------|--------|
| **Type** | Gold divider line + centred H3 |
| **Grid** | `BlogCard` ×3 related posts |

---

### 3. Registration banner

| Item | Detail |
|------|--------|
| **Component** | Same as home `RegistrationBanner` |
| **Custom** | Post-footer enroll CTA copy |

---

## COURSE PAGES (`/courses/as-level`, `/courses/a2-level`, `/courses/o-level`)

*Same template (`CoursePageTemplate`) — data alag per level*

---

### 1. Course hero

| Item | Detail |
|------|--------|
| **BG** | `navy-900` |
| **Layout** | 2 col, min-h 60vh — copy left · hero image right |

| Element | Font | Content |
|---------|------|---------|
| Breadcrumb | Inter 13px white/60 | Home › Courses › [Level] |
| Badge | Inter 11px bold uppercase white on gold pill | **[AS Level] · [9706]** (varies) |
| H1 | Fraunces 40–60px white + italic gold | [Headline] *Sir Shehroz Iqbal.* |
| Subhead | Inter 17px white/80 | Course description |
| **CTA** | `.btn-primary` | Register on Orb-Ed |
| **Hero image** | — | Level-specific course image |

---

### 2. Registration banner

| Item | Detail |
|------|--------|
| **Component** | `RegistrationBanner` with level-specific `ctaTitle` / `ctaSubhead` |

---

### 3. At a glance (`CourseAtAGlance`)

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |
| **Layout** | 4 cream-50 stat cards (2×2 → 4 col) |

| Card | Label (11px uppercase gray) | Value (Fraunces 22px navy) |
|------|----------------------------|----------------------------|
| 1 | Syllabus | e.g. CAIE 9706 |
| 2 | Duration | e.g. Full syllabus |
| 3 | Format | e.g. Live + recorded |
| 4 | Start | e.g. Oct/Nov 2026 |

---

### 4. Syllabus & sample lectures

| Item | Detail |
|------|--------|
| **BG** | `cream-50` |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **Syllabus & sample lectures** |
| H2 | Fraunces navy | Level syllabus overview |
| **SyllabusGrid** | Inter | Topic accordions · lesson rows with Play (free) or Lock (Orb-Ed) · VideoLightbox |

---

### 5. Sample notes (level-filtered)

| Item | Detail |
|------|--------|
| **BG** | `bg-grid-white` |

| Element | Font | Content |
|---------|------|---------|
| Eyebrow | **Sample notes** |
| H2 | Fraunces | Notes for this level |
| **NotesExplorer** | Inter | Same accordion/PDF preview as notes page |

---

## Section header pattern (reused everywhere)

Used via `SectionHeader` component:

| Part | Font | Size | Colour (light bg) | Colour (dark bg) |
|------|------|------|-------------------|------------------|
| Eyebrow | Inter uppercase | 13px | navy-700 | white/90 |
| Title (H2) | Fraunces semibold | 34–42px | navy-900 | white |
| Subtitle | Inter | 16px | gray-500 | white/70 |
| Underline | MotionUnderline | — | gold gradient line | gold gradient line |

---

## Quick page → section count

| Page | # Sections (in order) |
|------|------------------------|
| **Home** | Hero carousel → Session → Orb-Ed guide → Sample lectures → Sample notes → Reels → Extra credit preview → Blog preview → Registration banner → FAQ |
| **About** | Hero → Stats → Story → Quote → Ecosystem → Testimonials → CTA |
| **Contact** | Hero → Contact cards + hours → Feedback form → Map |
| **Register** | Hero → Form + sidebar |
| **Notes** | Hero + tabs → Study notes → Yearly papers (+ sticky bar) |
| **Extra Credit** | Hero → Classroom videos → Recommendations videos → Masonry gallery |
| **Blog** | Hero + filters → Featured → Grid |
| **Blog post** | Article (TOC + body + share) → Read next → Registration banner |
| **Course** | Hero → Registration banner → At a glance → Syllabus → Sample notes |

---

## For Kashan Iqbal site

- **Accounting & Maths:** Copy this document **section-for-section** — same order, same fonts, same button types. Change **colours** (red → purple for maths) and **all text/media**.
- **Stocks:** Same page list + section order; add **PSX market bar** as section 0 on home; modern number styling on stats/prices.

---

*Source: shehroz-iqbal-site codebase · July 2026*
