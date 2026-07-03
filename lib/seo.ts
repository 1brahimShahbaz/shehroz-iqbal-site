import type { Metadata } from "next";
import { SITE } from "./constants";

type PageSEO = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  /** Extra keywords merged with site defaults (blog posts, course pages). */
  keywords?: string[];
  /** When true, page title is used as-is (for homepage brand title). */
  titleAbsolute?: boolean;
};

export const DEFAULT_OG_IMAGE = "/images/teacher-about.jpeg";

/** Primary brand + discovery phrases for name searches. */
export const SEO_KEYWORDS = [
  "Shehroz Iqbal",
  "Sir Shehroz Iqbal",
  "Shehroz Iqbal Accounting",
  "Shehroz Iqbal tutor",
  "Shehroz Iqbal Accounting teacher",
  "Shehroz Iqbal CAIE",
  "Shehroz Iqbal Karachi",
  "shehroziqbal.com",
  "best A Level Accounting tutor Karachi",
  "best A Level teacher Karachi",
  "A Level Accounting teacher Karachi",
  "Accounting tutor Karachi",
  "Accounting tuition Karachi",
  "O Level Accounting tutor Karachi",
  "AS Level Accounting Karachi",
  "A2 Level Accounting Karachi",
  "CAIE Accounting 9706 Karachi",
  "best Accounting teacher Pakistan",
  "A Level Accounting tuition",
  "CAIE 9706 Accounting tutor",
  "Edexcel Accounting tutor Pakistan",
  "Edexcel Accounting teacher",
  "O Level Accounting notes",
  "online Accounting tutor Pakistan",
  "Pakistan accounting tuition online",
  "AS Level Accounting",
  "A2 Level Accounting",
] as const;

const DEFAULT_TITLE = `${SITE.personName} — Accounting Tutor in Karachi (CAIE & Edexcel)`;

const META_TITLE_SUFFIX = ` | ${SITE.personName}`;
const META_TITLE_MAX = 60;

/** Shorter `<title>` text for blog posts (display titles unchanged). */
export const BLOG_SEO_TITLES: Record<string, string> = {
  "how-to-study-accounting-a-level-complete-guide":
    "Study A Level Accounting",
  "accounting-9706-paper-2-structured-questions-guide":
    "9706 Paper 2 Guide",
  "o-level-accounting-7707-complete-revision-guide":
    "O Level Accounting Revision",
  "double-entry-bookkeeping-accounting-fundamentals-guide":
    "Double Entry Bookkeeping",
  "as-level-vs-a2-level-accounting-differences":
    "AS vs A2 Accounting Guide",
  "top-10-accounting-mistakes-a-level-students-make":
    "Top 10 Accounting Mistakes",
  "financial-statements-ratio-analysis-accounting-guide":
    "Financial Ratio Analysis",
  "depreciation-methods-caie-accounting-explained":
    "Depreciation Methods CAIE",
  "bank-reconciliation-accounting-exam-tips-guide":
    "Bank Reconciliation Tips",
  "cash-flow-statement-accounting-a-level-guide":
    "Cash Flow Statement Guide",
  "online-accounting-tuition-pakistan-guide":
    "Accounting Tuition Pakistan",
  "how-to-prepare-for-caie-accounting-october-november-2026":
    "CAIE Accounting Oct/Nov 2026",
  "caie-vs-edexcel-accounting-a-level-which-is-harder":
    "CAIE vs Edexcel Accounting",
  "pakistan-chartered-accountancy-career-reality-guide":
    "Chartered Accountancy Pakistan",
  "accounting-in-karachi-students-guide":
    "Accounting in Karachi Guide",
};

/** Returns a page title segment that keeps full metadata title ≤ 60 characters. */
export function seoPageTitle(pageTitle: string): string {
  const full = `${pageTitle}${META_TITLE_SUFFIX}`;
  if (full.length <= META_TITLE_MAX) return pageTitle;
  const maxBase = META_TITLE_MAX - META_TITLE_SUFFIX.length;
  if (pageTitle.length <= maxBase) return pageTitle;
  const cut = pageTitle.slice(0, maxBase - 1).replace(/\s+\S*$/, "");
  return `${cut}…`;
}

export function blogSeoTitle(slug: string, displayTitle: string): string {
  const short = BLOG_SEO_TITLES[slug];
  if (short) return seoPageTitle(short);
  return seoPageTitle(displayTitle);
}

/**
 * Resolved icons and relative OG/Twitter URLs are joined with metadataBase.
 * In development, SITE.url points at production — the browser would fetch
 * `/icon.png` from the wrong host unless we use localhost here.
 */
function getMetadataBase(): URL {
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT ?? "3000";
    return new URL(`http://localhost:${port}`);
  }
  return new URL(SITE.url);
}

function absoluteImageUrl(image: string): string {
  if (image.startsWith("http")) return image;
  return `${SITE.url}${image.startsWith("/") ? image : `/${image}`}`;
}

export function buildMetadata(seo: PageSEO = {}): Metadata {
  const title = seo.titleAbsolute
    ? seo.title ?? DEFAULT_TITLE
    : seo.title
      ? `${seo.title} | ${SITE.personName}`
      : DEFAULT_TITLE;
  const description = seo.description || SITE.description;
  const url = `${SITE.url}${seo.path || ""}`;
  const image = absoluteImageUrl(seo.image || DEFAULT_OG_IMAGE);

  const googleVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    process.env.GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    applicationName: SITE.personName,
    alternates: { canonical: url },
    keywords: [
      ...SEO_KEYWORDS,
      ...(seo.keywords?.filter(Boolean) ?? []),
    ],
    authors: [
      { name: SITE.personName, url: SITE.url },
      { name: SITE.name, url: SITE.url },
    ],
    creator: SITE.personName,
    publisher: SITE.personName,
    category: "education",
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: `${SITE.personName} — ${SITE.tagline}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE.personName} — Accounting tutor in Karachi`,
        },
      ],
      locale: "en_PK",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: googleVerification
      ? { google: googleVerification }
      : undefined,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", type: "image/png", sizes: "48x48" },
        { url: "/icon.png", type: "image/png", sizes: "192x192" },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          type: "image/png",
          sizes: "180x180",
        },
      ],
      shortcut: ["/favicon.ico"],
    },
  };
}

const personId = `${SITE.url}/#person`;
const orgId = `${SITE.url}/#organization`;
const websiteId = `${SITE.url}/#website`;

export const personJsonLd = {
  "@type": "Person",
  "@id": personId,
  name: SITE.personName,
  alternateName: [SITE.name, "Sir Shehroz", "Shehroz Iqbal Accounting"],
  givenName: "Shehroz",
  familyName: "Iqbal",
  honorificPrefix: "Sir",
  jobTitle: "Accounting Tutor",
  description:
    "A Level Accounting tutor in Karachi, Pakistan. Teaching CAIE 9706, Edexcel Accounting, AS Level, A2 Level and O Level Accounting since 2011. Helping students across Pakistan and internationally achieve top grades.",
  url: SITE.url,
  image: absoluteImageUrl(DEFAULT_OG_IMAGE),
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  sameAs: [
    SITE.socials.facebook,
    SITE.socials.instagram,
    SITE.socials.youtube,
    SITE.socials.whatsapp,
  ],
  knowsAbout: [
    "A Level Accounting",
    "O Level Accounting",
    "AS Level Accounting",
    "A2 Level Accounting",
    "Cambridge International Examinations",
    "CAIE Accounting 9706",
    "CAIE 7707 Accounting O Level",
    "Edexcel A Level Accounting",
    "Financial Accounting",
    "Cost & Management Accounting",
    "Accounting Tuition Karachi",
  ],
  worksFor: { "@id": orgId },
};

export const localBusinessJsonLd = {
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": orgId,
  name: `${SITE.personName} — Accounting Tuition`,
  alternateName: [SITE.name, "Shehroz Iqbal Accounting", SITE.domain],
  description:
    "A Level and O Level Accounting tuition in Karachi, Pakistan by Shehroz Iqbal. CAIE 9706 and Edexcel Accounting specialist. In-person classes in Karachi and online tuition across Pakistan and internationally.",
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  priceRange: "$$",
  image: absoluteImageUrl(DEFAULT_OG_IMAGE),
  founder: { "@id": personId },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address,
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  areaServed: [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Pakistan",
    "United Arab Emirates",
    "United Kingdom",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Accounting Tuition Courses",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "AS Level Accounting (CAIE 9706)",
          description:
            "Comprehensive AS Level Accounting tuition in Karachi and online, covering the full CAIE 9706 syllabus.",
          url: `${SITE.url}/courses/as-level`,
          provider: { "@id": personId },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "A2 Level Accounting (CAIE 9706)",
          description:
            "Advanced A2 Level Accounting tuition for CAIE 9706 — evaluation, essays and past-paper mastery.",
          url: `${SITE.url}/courses/a2-level`,
          provider: { "@id": personId },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "O Level Accounting (CAIE 7707)",
          description:
            "O Level Accounting tuition for CAIE 7707 — strong foundations in micro and macro fundamentals.",
          url: `${SITE.url}/courses/o-level`,
          provider: { "@id": personId },
        },
      },
    ],
  },
  sameAs: [
    SITE.socials.facebook,
    SITE.socials.instagram,
    SITE.socials.youtube,
  ],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": websiteId,
  url: SITE.url,
  name: DEFAULT_TITLE,
  alternateName: [SITE.personName, SITE.name, SITE.domain],
  description: SITE.description,
  inLanguage: "en",
  publisher: { "@id": personId },
};

/** Combined graph for every page — helps Google associate the site with Shehroz Iqbal. */
export function getSiteJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteJsonLd, personJsonLd, localBusinessJsonLd],
  };
}

export function courseJsonLd(level: "AS" | "A2" | "O") {
  const mapping = {
    AS: {
      name: "AS Level Accounting",
      code: "9706",
      desc: "Cambridge International AS Level Accounting (CAIE 9706) with Shehroz Iqbal — tuition in Karachi and online, full syllabus coverage, sample lectures and notes.",
      path: "/courses/as-level",
    },
    A2: {
      name: "A2 Level Accounting",
      code: "9706",
      desc: "Cambridge International A2 Level Accounting with Shehroz Iqbal — tuition in Karachi and online, advanced theory, evaluation, and past-paper mastery.",
      path: "/courses/a2-level",
    },
    O: {
      name: "O Level Accounting",
      code: "7707",
      desc: "Cambridge O Level Accounting (7707) with Shehroz Iqbal — tuition in Karachi and online, strong foundations in micro and macro fundamentals.",
      path: "/courses/o-level",
    },
  };
  const m = mapping[level];
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: m.name,
    description: m.desc,
    courseCode: m.code,
    provider: {
      "@type": "Person",
      name: SITE.personName,
      url: SITE.url,
    },
    instructor: { "@id": personId },
    url: `${SITE.url}${m.path}`,
  };
}

/** Visible homepage FAQ + FAQPage rich-result schema share this single source. */
export const HOME_FAQS = [
  {
    question: "Who is the best A Level Accounting tutor in Karachi?",
    answer:
      "Shehroz Iqbal is widely regarded as one of the best A Level Accounting tutors in Karachi, Pakistan. With over 13 years of teaching CAIE Accounting 9706 and Edexcel Accounting, he has helped hundreds of students achieve A and A* grades. Classes are available in-person in Karachi and online across Pakistan.",
  },
  {
    question: "Where can I find an A Level Accounting tutor in Karachi?",
    answer:
      "Shehroz Iqbal offers A Level Accounting tuition in Karachi — in-person at Alpha College, P.E.C.H.S Block 6 — as well as live online classes. Visit shehroziqbal.com to register for AS Level, A2 Level, or O Level Accounting courses for CAIE and Edexcel.",
  },
  {
    question: "Does Shehroz Iqbal teach online Accounting?",
    answer:
      "Yes. Shehroz Iqbal offers live online Accounting tuition for students across Pakistan — Karachi, Lahore, Islamabad — and internationally. All courses cover the full CAIE 9706 or Edexcel Accounting syllabus, with recorded backups and WhatsApp doubt support.",
  },
  {
    question: "What Accounting courses does Shehroz Iqbal teach?",
    answer:
      "Shehroz Iqbal teaches O Level Accounting (CAIE 7707), AS Level Accounting (CAIE 9706), A2 Level Accounting (CAIE 9706), and Edexcel A Level Accounting. Courses are available for the May/June and October/November examination series.",
  },
  {
    question: "How do I register for Accounting tuition with Shehroz Iqbal?",
    answer:
      "You can register for Accounting tuition via the Courses pages at shehroziqbal.com or reach out directly on WhatsApp. Spots for each examination series are limited.",
  },
] as const;

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}
