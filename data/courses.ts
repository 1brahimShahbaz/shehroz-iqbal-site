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
      "Master double entry, financial statements and costing. Walk into your exam confident.",
    description:
      "A complete 9-month walkthrough of the CAIE 9706 AS Level Accounting syllabus — from double entry and the accounting system to depreciation, reconciliations, financial statements, ratio analysis and cost accounting. Every technique is built up step by step with worked questions.",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    ctaTitle: "Ready to start AS Accounting?",
    ctaSubhead:
      "Join the Oct/Nov 2026 session — limited seats. Live classes, recorded backups and a full notes pack.",
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
      "Sharpen your analysis. Drill published accounts, cash flows and standard costing. Convert understanding into A* marks.",
    description:
      "Advanced financial accounting — partnership changes, limited company published accounts, statements of cash flows and business purchase — plus A Level cost and management accounting including standard costing, budgeting and investment appraisal. Built around CAIE's published mark schemes with weekly past-paper marking.",
    heroImage:
      "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=1400&q=80",
    ctaTitle: "Ready to push from A to A*?",
    ctaSubhead:
      "Join the Oct/Nov 2026 A2 session — small batches, intensive past-paper drilling.",
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
      "Lay the right foundations early. Build the habits that produce A* students at A Level.",
    description:
      "A patient, structured introduction to accounting for students sitting CAIE 7707 — from the accounting equation and double entry to financial statements for sole traders, partnerships, limited companies and clubs. Every topic includes worked examples and printable revision sheets.",
    heroImage:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1400&q=80",
    ctaTitle: "Ready to start O Level Accounting?",
    ctaSubhead:
      "Join the Oct/Nov 2026 O Level batch — friendly pace, strong fundamentals.",
  },
};
