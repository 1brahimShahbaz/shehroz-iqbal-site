import type { CourseLevel } from "./courses";
import { RECORDED_VIDEOS } from "@/lib/recordedVideos";

export type SyllabusLesson = {
  title: string;
  duration: string;
  /**
   * If present, this lesson is a free preview and will play in the lightbox.
   * Otherwise the lesson is locked and clicks redirect to Orbed.
   */
  videoSrc?: string;
};

export type SyllabusTopic = {
  id: string;
  title: string;
  lessons: SyllabusLesson[];
};

export type SyllabusSection = {
  id: string;
  title: string;
  topics: SyllabusTopic[];
};

function previewLesson(
  video: { title: string; videoSrc: string },
  duration = "Preview"
): SyllabusLesson {
  return { title: video.title, duration, videoSrc: video.videoSrc };
}

function lockedLesson(title: string, duration: string): SyllabusLesson {
  return { title, duration };
}

/* ------------------------------------------------------------------ */
/* AS Level Accounting — CAIE 9706                                    */
/* ------------------------------------------------------------------ */
const asLevelSections: SyllabusSection[] = [
  {
    id: "financial",
    title: "Financial Accounting",
    topics: [
      {
        id: "as-accounting-system",
        title: "The Accounting System",
        lessons: [
          lockedLesson("Double Entry Book-keeping & the Accounting Equation", "22:40"),
          lockedLesson("Books of Prime Entry", "18:14"),
          lockedLesson("Ledgers & the Trial Balance", "19:55"),
          lockedLesson("Accruals & Prepayments", "17:08"),
          lockedLesson("Irrecoverable Debts & Provisions", "15:32"),
        ],
      },
      {
        id: "as-non-current-assets",
        title: "Accounting for Non-Current Assets",
        lessons: [
          previewLesson(RECORDED_VIDEOS.AS.depreciation),
          lockedLesson("Methods of Depreciation", "18:26"),
          lockedLesson("Disposal of Non-Current Assets", "16:44"),
          lockedLesson("Capital vs Revenue Expenditure", "12:18"),
        ],
      },
      {
        id: "as-reconciliation-verification",
        title: "Reconciliation & Verification",
        lessons: [
          previewLesson(RECORDED_VIDEOS.AS.bankReconciliation),
          lockedLesson("Control Accounts", "20:12"),
          lockedLesson("Correction of Errors", "18:48"),
          lockedLesson("Suspense Accounts", "14:36"),
        ],
      },
      {
        id: "as-financial-statements",
        title: "Preparation of Financial Statements",
        lessons: [
          lockedLesson("Sole Traders", "21:30"),
          lockedLesson("Partnerships", "24:18"),
          lockedLesson("Limited Companies", "26:52"),
          lockedLesson("Clubs & Non-Profit Organisations", "19:24"),
          lockedLesson("Manufacturing Businesses", "22:06"),
          lockedLesson("Incomplete Records", "23:44"),
        ],
      },
      {
        id: "as-analysis",
        title: "Analysis & Communication of Accounting Information",
        lessons: [
          previewLesson(RECORDED_VIDEOS.AS.ratios),
          lockedLesson("Users of Accounting Information", "12:10"),
          lockedLesson("Limitations of Ratio Analysis", "14:28"),
        ],
      },
    ],
  },
  {
    id: "cost",
    title: "Cost & Management Accounting",
    topics: [
      {
        id: "as-costing",
        title: "Costing Fundamentals",
        lessons: [
          lockedLesson("Costs & Cost Behaviour", "16:40"),
          lockedLesson("Materials & Labour Costs", "18:22"),
          lockedLesson("Overhead Absorption", "20:14"),
          lockedLesson("Marginal vs Absorption Costing", "22:48"),
          lockedLesson("Break-even Analysis", "19:36"),
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* A2 Level Accounting — CAIE 9706                                    */
/* ------------------------------------------------------------------ */
const a2LevelSections: SyllabusSection[] = [
  {
    id: "financial",
    title: "Financial Accounting (A Level)",
    topics: [
      {
        id: "a2-advanced-statements",
        title: "Advanced Financial Statements",
        lessons: [
          previewLesson(RECORDED_VIDEOS.A2.cashFlow),
          lockedLesson("Partnership Changes (Admission, Retirement, Dissolution)", "27:18"),
          lockedLesson("Limited Company Published Accounts (IAS/IFRS)", "25:42"),
          lockedLesson("Inventory Valuation (IAS 2)", "17:30"),
        ],
      },
      {
        id: "a2-business-purchase",
        title: "Business Purchase & Merger",
        lessons: [
          previewLesson(RECORDED_VIDEOS.A2.businessPurchase),
          lockedLesson("Goodwill", "16:52"),
          lockedLesson("Consignment & Joint Ventures", "21:24"),
          lockedLesson("Computerised Accounting Systems", "13:48"),
        ],
      },
      {
        id: "a2-analysis",
        title: "Analysis & Communication (Advanced)",
        lessons: [
          lockedLesson("Ratio Analysis & Interpretation", "24:10"),
          lockedLesson("Limitations of Accounting Information", "15:18"),
          lockedLesson("Reporting to Stakeholders", "14:02"),
        ],
      },
    ],
  },
  {
    id: "cost",
    title: "Cost & Management Accounting (A Level)",
    topics: [
      {
        id: "a2-costing-techniques",
        title: "Costing Techniques",
        lessons: [
          previewLesson(RECORDED_VIDEOS.A2.standardCosting),
          lockedLesson("Activity Based Costing (ABC)", "23:36"),
          lockedLesson("Variance Analysis", "26:14"),
        ],
      },
      {
        id: "a2-budgeting-decisions",
        title: "Budgeting & Decision Making",
        lessons: [
          lockedLesson("Budgeting & Budgetary Control", "22:48"),
          lockedLesson("Marginal Costing Decisions", "20:30"),
          lockedLesson("Investment Appraisal (NPV, IRR, Payback)", "25:54"),
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* O Level Accounting — CAIE 7707                                     */
/* ------------------------------------------------------------------ */
const oLevelSections: SyllabusSection[] = [
  {
    id: "recording",
    title: "Recording Financial Information",
    topics: [
      {
        id: "o-fundamentals",
        title: "Fundamentals of Accounting",
        lessons: [
          lockedLesson("The Accounting Equation", "12:24"),
          lockedLesson("Double Entry Book-keeping", "16:48"),
          lockedLesson("Books of Prime Entry", "15:12"),
          lockedLesson("Ledgers & the Trial Balance", "17:36"),
        ],
      },
      {
        id: "o-verification",
        title: "Verification of Accounting Records",
        lessons: [
          lockedLesson("Bank Reconciliation Statements", "16:54"),
          lockedLesson("Control Accounts", "15:30"),
          lockedLesson("Correction of Errors & Suspense Accounts", "18:22"),
        ],
      },
      {
        id: "o-procedures",
        title: "Accounting Procedures",
        lessons: [
          lockedLesson("Capital & Revenue Expenditure", "11:48"),
          lockedLesson("Depreciation of Non-Current Assets", "17:14"),
          lockedLesson("Accruals & Prepayments", "14:36"),
          lockedLesson("Irrecoverable Debts & Provisions", "13:52"),
          lockedLesson("Inventory Valuation", "12:40"),
        ],
      },
    ],
  },
  {
    id: "statements",
    title: "Financial Statements & Interpretation",
    topics: [
      {
        id: "o-financial-statements",
        title: "Preparation of Financial Statements",
        lessons: [
          previewLesson(RECORDED_VIDEOS.O.limitedCompany),
          previewLesson(RECORDED_VIDEOS.O.clubAccounts),
          previewLesson(RECORDED_VIDEOS.O.incompleteRecords),
          lockedLesson("Sole Traders", "18:30"),
          lockedLesson("Partnerships", "20:12"),
          lockedLesson("Manufacturing Accounts", "17:48"),
        ],
      },
      {
        id: "o-analysis-principles",
        title: "Analysis & Accounting Principles",
        lessons: [
          lockedLesson("Accounting Ratios", "16:24"),
          lockedLesson("Interpretation of Accounts", "15:06"),
          lockedLesson("Accounting Principles & Policies", "13:18"),
        ],
      },
    ],
  },
];

export const syllabusByLevel: Record<CourseLevel, SyllabusSection[]> = {
  AS: asLevelSections,
  A2: a2LevelSections,
  O: oLevelSections,
};

/** Flat topic list (e.g. counts). */
export function syllabusTopicsForLevel(level: CourseLevel): SyllabusTopic[] {
  return syllabusByLevel[level].flatMap((s) => s.topics);
}
