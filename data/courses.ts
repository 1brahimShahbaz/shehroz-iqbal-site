export type CourseLevel = "AS" | "A2" | "O";

export type CourseContent = {
  level: CourseLevel;
  slug: string;
  syllabus: string;
  badgeLabel: string;
  badgeSubLabel: string;
  duration: string;
  format: string;
  start: string;
  headline: string;
  subhead: string;
  description: string;
  heroImage: string;
  ctaTitle: string;
  ctaSubhead: string;
  /** Optional overrides for the "Course Syllabus" section (template holds the defaults). */
  syllabusHeading?: string;
  syllabusIntro?: string;
};

export const courses: Record<CourseLevel, CourseContent> = {
  AS: {
    level: "AS",
    slug: "as-level",
    syllabus: "CAIE 9706",
    badgeLabel: "AS LEVEL",
    badgeSubLabel: "CAIE 9706",
    duration: "9 Months",
    format: "Online + Recorded",
    start: "Oct 2026",
    headline: "AS Level Accounting with",
    subhead:
      "Learn double entry, financial statements, and costing through clear explanations and practical exam-focused learning.",
    description:
      "A complete 9-month walkthrough of the CAIE 9706 AS Level Accounting syllabus — from double entry and the accounting system to depreciation, reconciliations, financial statements, ratio analysis and cost accounting. Every technique is built up step by step with worked questions.",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    ctaTitle: "Start Your AS Level Preparation",
    ctaSubhead:
      "Join the Oct/Nov 2026 batch and study with live classes, recorded lectures, organized notes, and ongoing support throughout your preparation.",
  },
  A2: {
    level: "A2",
    slug: "a2-level",
    syllabus: "CAIE 9706",
    badgeLabel: "A2 LEVEL",
    badgeSubLabel: "CAIE 9706",
    duration: "9 Months",
    format: "Online + Recorded",
    start: "Oct 2026",
    headline: "A2 Level Accounting with",
    subhead:
      "Study published accounts, cash flow statements, and standard costing with a clear, structured approach with A2 level course online that prepares you for the CAIE examination.",
    description:
      "The notes cover the complete CAIE 9706 A2 Level syllabus, from partnership changes and published accounts to statements of cash flows, business purchase, budgeting, standard costing, and investment appraisal. Every topic is explained clearly with worked examples and reinforced through past paper questions.",
    heroImage:
      "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=1400&q=80",
    ctaTitle: "Join the A2 Level Accounting Class",
    ctaSubhead:
      "Enroll for the Oct/Nov 2026 session and learn through focused lessons, regular past paper practice, and guidance throughout your exam preparation.",
    syllabusHeading: "Watch a sample lecture before you register.",
    syllabusIntro:
      "Free A2 Level (CAIE 9706) lessons are available below to help you explore the A2 level accounting course before enrolling. The complete course is available on Orb-Ed.",
  },
  O: {
    level: "O",
    slug: "o-level",
    syllabus: "CAIE 7707",
    badgeLabel: "O LEVEL",
    badgeSubLabel: "CAIE 7707",
    duration: "12 Months",
    format: "Online + Recorded",
    start: "Oct 2026",
    headline: "O Level Accounting with",
    subhead:
      "Learn the fundamentals of accounting course for O'level, strengthen your concepts, and prepare with confidence for your exams.",
    description:
      "These notes cover the complete CAIE 7707 syllabus, starting with the accounting equation and double entry before moving on to financial statements for sole traders, partnerships, limited companies, and clubs. Each topic includes worked examples and revision sheets to support your learning.",
    heroImage:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1400&q=80",
    ctaTitle: "Join the Oct/Nov 2026 O Level Batch",
    ctaSubhead:
      "Join the Oct/Nov 2026 batch and learn Accounting with a clear, structured approach that helps you build strong concepts from the start.",
    syllabusHeading: "Watch a lesson before joining.",
    syllabusIntro:
      "Free sample lectures from the O Level (CAIE 7707) are available below. If you enjoy the teaching style, you can continue with the complete O levels accounting course online on Orb-Ed.",
  },
};
