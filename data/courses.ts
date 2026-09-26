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
  /** Text sections rendered after the syllabus, in order. */
  infoSections: CourseInfoSection[];
};

/** Text fields (subhead, syllabusIntro, body) render `**phrase**` in bold. */
export type CourseInfoSection = {
  eyebrow?: string;
  heading: string;
  body: string;
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
      "Learn double entry, financial statements, and costing through clear explanations and practical, exam-focused learning.",
    description:
      "A complete 9-month walkthrough of the CAIE 9706 AS Level Accounting syllabus — from double entry and the accounting system to depreciation, reconciliations, financial statements, ratio analysis and cost accounting. Every technique is built up step by step with worked questions.",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    ctaTitle: "Start Your AS Level Preparation",
    ctaSubhead:
      "Join the Oct/Nov 2026 batch and study with live classes, recorded lectures, organized notes, and ongoing support throughout your preparation.",
    syllabusHeading: "Experience the Course Before You Join",
    syllabusIntro:
      "Browse free sample lectures from the AS Level (CAIE 9706) syllabus and explore the full **AS level course online** on Orb-Ed.",
    infoSections: [
      {
        heading: "What the AS Level Course Online Covers",
        body: "The course takes students through the main areas of the CAIE 9706 **AS Level Accounting** syllabus. Topics include double entry and the accounting system, depreciation, bank and other reconciliations, financial statements, ratio analysis, and cost accounting. Lessons focus on understanding the principles behind each topic and applying them correctly in questions.",
      },
      {
        eyebrow: "Build Your Exam Skills",
        heading: "Learn How to Approach Accounting Questions",
        body: "Understanding a topic is only part of exam preparation. Students also need to know how to apply accounting methods, show their workings, and present answers clearly. Regular practice helps students become familiar with different question types and develop a more accurate approach to solving problems.",
      },
      {
        eyebrow: "Sample Notes",
        heading: "Notes Prepared for AS Level Students",
        body: "Cover the complete 9-month CAIE 9706 **AS Level Accounting** syllabus, from double entry and the accounting system to depreciation, reconciliations, financial statements, ratio analysis, and cost accounting. Each topic includes clear explanations, worked examples, and practice questions to help you build confidence as you progress.",
      },
      {
        eyebrow: "Practice and Revision",
        heading: "Strengthen Your Understanding Through Practice",
        body: "Students can revisit recorded lectures, review their notes, and work through practice questions as they move from one topic to the next. This gives them the opportunity to revise difficult areas, check their understanding, and prepare more effectively as their exams approach.",
      },
      {
        eyebrow: "Continued Support",
        heading: "Guidance Throughout Your AS Level Journey",
        body: "From learning the fundamentals to preparing for the final examination, students receive continued guidance throughout the course. The combination of live teaching, recorded lessons, notes, and regular practice provides a practical way to stay organized and keep progressing through the syllabus.",
      },
    ],
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
      "Study published accounts, cash flow statements, and standard costing with a clear, structured approach through an **A2 level accounting course** that prepares you for the CAIE examination.",
    description:
      "The notes cover the complete CAIE 9706 A2 Level syllabus, from partnership changes and published accounts to statements of cash flows, business purchase, budgeting, standard costing, and investment appraisal. Every topic is explained clearly with worked examples and reinforced through past paper questions.",
    heroImage:
      "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=1400&q=80",
    ctaTitle: "Join the A2 Level Accounting Class",
    ctaSubhead:
      "Enroll for the Oct/Nov 2026 session and learn through focused lessons, regular past paper practice, and guidance throughout your exam preparation.",
    syllabusHeading: "Watch a Sample Lecture Before You Register",
    syllabusIntro:
      "Free A2 Level (CAIE 9706) lessons are available below to help you explore the **A2 level course online** before enrolling. The complete course is available on Orb-Ed.",
    infoSections: [
      {
        heading: "What You Will Learn",
        body: "The **A2 Level course online** program covers important areas of the CAIE 9706 syllabus, including published accounts, partnership changes, statements of cash flows, business purchase, budgeting, standard costing, and investment appraisal. Lessons are designed to help you understand how accounting concepts work and how to apply them to examination questions.",
      },
      {
        eyebrow: "Exam-Focused Preparation",
        heading: "Practice the Skills You Need for the Exam",
        body: "Past paper practice is an important part of the course. Students work through exam-style questions to improve their understanding, accuracy, and ability to present answers correctly. Regular practice also helps identify areas that need more attention before the final examination.",
      },
      {
        eyebrow: "Sample Notes",
        heading: "Notes Prepared for A2 Level Students",
        body: "The notes cover the complete CAIE 9706 A2 Level syllabus, from partnership changes and published accounts to statements of cash flows, business purchase, budgeting, standard costing, and investment appraisal. Every topic is explained clearly with worked examples and reinforced through past paper questions.",
      },
      {
        eyebrow: "Ongoing Learning Support",
        heading: "Guidance Throughout Your Preparation",
        body: "Students receive continued guidance as they work through the **A2 Level Accounting course** and prepare for their examinations. Lessons, notes, sample lectures, and past paper practice work together to give students useful resources for learning new topics, revising key concepts, and preparing for the CAIE examination.",
      },
    ],
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
      "Learn the fundamentals through an **accounting course for O'level**, strengthen your concepts, and prepare with confidence for your exams.",
    description:
      "These notes cover the complete CAIE 7707 syllabus, starting with the accounting equation and double entry before moving on to financial statements for sole traders, partnerships, limited companies, and clubs. Each topic includes worked examples and revision sheets to support your learning.",
    heroImage:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1400&q=80",
    ctaTitle: "Join the Oct/Nov 2026 O Level Batch",
    ctaSubhead:
      "Join the Oct/Nov 2026 batch and learn Accounting with a clear, structured approach that helps you build strong concepts from the start.",
    syllabusHeading: "Watch a Lesson Before Joining",
    syllabusIntro:
      "Free sample lectures from the O Level (CAIE 7707) are available below. If you enjoy the teaching style, you can continue with the complete **O levels accounting course online** on Orb-Ed.",
    infoSections: [
      {
        eyebrow: "Understanding the Fundamentals",
        heading: "Start with the Basics of Accounting",
        body: "The **O levels accounting course online** begins with essential accounting concepts and gradually introduces students to more advanced areas of the O Level syllabus. Students learn about the accounting equation, double entry, source documents, and the accounting system before moving into the preparation and interpretation of financial information.",
      },
      {
        eyebrow: "Applying Accounting Concepts",
        heading: "Learn Through Examples and Practice",
        body: "Accounting becomes easier to understand when students can apply each concept to practical questions. Lessons include worked examples and practice activities to help students see how accounting principles are used in different situations and develop a clear method for approaching questions.",
      },
      {
        eyebrow: "Sample Notes",
        heading: "Get Support from Notes Prepared for O Level Students",
        body: "These notes cover the complete CAIE 7707 syllabus, starting with the accounting equation and double entry before moving on to financial statements for sole traders, partnerships, limited companies, and clubs. Each topic includes worked examples and revision sheets to support your learning.",
      },
      {
        eyebrow: "Exam Preparation",
        heading: "Prepare for Your O Level Accounting Exams",
        body: "As students progress through the syllabus, they can use practice questions and revision material to review what they have learned. Working through different types of accounting questions helps students improve accuracy, understand the required methods, and become more comfortable with the format of their examination.",
      },
      {
        eyebrow: "Learning Support",
        heading: "Keep Your Preparation on Track",
        body: "Revisit recorded lessons and notes for **accounting course for o'level** whenever you need to review a topic or clarify a difficult concept. Use the available resources to stay on track with your syllabus and exam preparation.",
      },
    ],
  },
};
