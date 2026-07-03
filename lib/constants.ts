export const SITE = {
  /** Display name (formal). */
  name: "Sir Shehroz Iqbal",
  /** Primary name for search — use in titles and Person schema. */
  personName: "Shehroz Iqbal",
  tagline: "Accounting · CAIE & Edexcel",
  description:
    "Shehroz Iqbal (Sir Shehroz Iqbal) — Accounting tutor for CAIE 9706, O Level 7707 and Edexcel. 13+ years teaching, 1,250+ students. Online classes and notes.",
  url: "https://shehroziqbal.com",
  domain: "shehroziqbal.com",
  email: "hi.shehroziqbal@gmail.com",
  phone: "+92 326 8079622",
  whatsappNumber: "923268079622",
  whatsappDefaultMessage:
    "Hi Sir Shehroz, I'd like more information about your Accounting tuition.",
  address: "Alpha College, 38-C P.E.C.H.S Block 6, Karachi, Pakistan",
  mapEmbed:
    "https://maps.google.com/maps?q=Alpha+College+38-C+PECHS+Block+6+Karachi+Pakistan&t=&z=16&ie=UTF8&iwloc=&output=embed",
  /** Orb-Ed LMS — browse platform (header CTAs, syllabus unlocks). */
  orbedUrl: "https://lms.orb-ed.pk",
  /** Orb-Ed student dashboard — start here to enrol (see Orb-Ed registration guide). */
  orbedDashboard: "https://lms.orb-ed.pk/user/dashboard",
  /** Direct Oct/Nov 2026 enrolment — course content enrolment links. */
  lmsRegistration2026: {
    O: "https://lms.orb-ed.pk/product/content/o-level-accounts---shehroz-iqbal-23116",
    AS: "https://lms.orb-ed.pk/product/content/as-level-accounts---shehroz-iqbal-23176",
    A2: "https://lms.orb-ed.pk/product/content/a2-level-accounts---shehroz-iqbal-22926",
  },
  /** Office hours — used on the contact page and for the live open/closed badge. */
  openHours: {
    monThu: { startHour: 7, startMinute: 30, endHour: 15, endMinute: 30 },
    friSat: { startHour: 9, startMinute: 0, endHour: 13, endMinute: 0 },
  },
  socials: {
    facebook: "https://www.facebook.com/shehroz.iqbal.1",
    instagram: "https://www.instagram.com/shehroziqbal/",
    youtube: "https://www.youtube.com/@easyaccountingwithShehrozIqbal",
    // No direct WhatsApp number yet — contact routes to the Orb-Ed platform.
    whatsapp: "https://lms.orb-ed.pk",
  },
  metrics: {
    studentsTaught: 1250,
    yearsExperience: 13,
  },
} as const;

export const ANALYTICS_ENABLED =
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "false";

/**
 * Registration form endpoint — a Google Apps Script Web App URL (ends in
 * `/exec`). The script appends each submission to a Google Sheet owned by
 * your own Google account and emails you a notification. This keeps the form
 * working on a static export (no backend) with the data stored in your Sheet.
 * Set NEXT_PUBLIC_REGISTRATION_ENDPOINT in `.env.local` before building.
 */
export const REGISTRATION_ENDPOINT =
  process.env.NEXT_PUBLIC_REGISTRATION_ENDPOINT || "";

/**
 * Contact page feedback form — separate Google Sheet + Apps Script Web App.
 * Set NEXT_PUBLIC_FEEDBACK_ENDPOINT in `.env.local` before building.
 * Setup: see scripts/google-feedback-form.gs
 */
export const FEEDBACK_ENDPOINT =
  process.env.NEXT_PUBLIC_FEEDBACK_ENDPOINT || "";

/** Grade / level options for the registration form (CAIE codes). */
export const REGISTER_GRADES = [
  "O Level (7707)",
  "AS Level (9706)",
  "A2 Level (9706)",
] as const;

/** Button labels — form (/register) vs Orb-Ed LMS. */
export const CTA_LABELS = {
  /** Links to the website interest form at /register */
  enrollInterest: "Enroll for Oct/Nov 2026",
  /** Compact label for the fixed header (full text in title + on /register) */
  enrollInterestHeader: "Enroll · Oct/Nov",
  /** Links to Orb-Ed to complete enrolment */
  orbEdRegister: "Register on Orb-Ed",
} as const;

/** Course names to select inside Orb-Ed (Oct/Nov 2026 batch). */
export const ORBED_REGISTRATION_COURSES = [
  {
    level: "O Level",
    name: "O Level – Accounts – Shehroz Iqbal",
    batch: "Oct/Nov Batch 2026",
  },
  {
    level: "AS Level",
    name: "AS Level – Accounts – Shehroz Iqbal",
    batch: "Oct/Nov Batch 2026",
  },
  {
    level: "A2 Level",
    name: "A2 Level – Accounts – Shehroz Iqbal",
    batch: "Oct/Nov Batch 2026",
  },
] as const;

/** Google Analytics 4 — override via `NEXT_PUBLIC_GA_ID` in `.env.local`. */
export const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-HE8WG95CGZ";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; chipColor: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "AS Level", href: "/courses/as-level", chipColor: "#1E8FCE" },
      { label: "A2 Level", href: "/courses/a2-level", chipColor: "#12466E" },
      { label: "O Level", href: "/courses/o-level", chipColor: "#1C6BAA" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Notes", href: "/notes" },
  { label: "Extra Credit", href: "/extra-credit" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * Contact CTAs. Until a direct WhatsApp number is available, these route to
 * the Orb-Ed platform. When a number is added, restore the wa.me link below.
 */
export const whatsappLink = (message?: string) => {
  void message;
  return SITE.orbedUrl;
  // return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
  //   message || SITE.whatsappDefaultMessage
  // )}`;
};
