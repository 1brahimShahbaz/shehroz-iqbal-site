/** Builds a URL-safe path under `public/videos/recorded/`. */
export function recordedVideoPath(...segments: string[]): string {
  const encoded = segments.map((s) => encodeURIComponent(s)).join("/");
  return `/videos/recorded/${encoded}`;
}

export type RecordedVideo = {
  title: string;
  videoSrc: string;
};

/**
 * Free-preview recorded lectures (Accounting) — paths match the files in
 * `public/videos/recorded/`. These are the only lessons unlocked on the site;
 * every other syllabus lesson is locked and opens on Orb-Ed.
 */
export const RECORDED_VIDEOS = {
  O: {
    limitedCompany: {
      title: "Limited Company Accounts",
      videoSrc: recordedVideoPath("Olevel", "company.mp4"),
    },
    clubAccounts: {
      title: "Club (Non-Profit) Accounts",
      videoSrc: recordedVideoPath("Olevel", "club acc O level.mp4"),
    },
    incompleteRecords: {
      title: "Incomplete Records",
      videoSrc: recordedVideoPath("Olevel", "incomplete records.mp4"),
    },
  },
  AS: {
    depreciation: {
      title: "Depreciation of Non-Current Assets",
      videoSrc: recordedVideoPath("AS", "depreciation.mp4"),
    },
    bankReconciliation: {
      title: "Bank Reconciliation Statements",
      videoSrc: recordedVideoPath("AS", "bank reconcilation.mp4"),
    },
    ratios: {
      title: "Ratio Analysis & Interpretation",
      videoSrc: recordedVideoPath("AS", "ratios.mp4"),
    },
  },
  A2: {
    cashFlow: {
      title: "Statement of Cash Flows",
      videoSrc: recordedVideoPath("A2", "cashflow.mp4"),
    },
    businessPurchase: {
      title: "Sale & Purchase of a Business",
      videoSrc: recordedVideoPath("A2", "sale and purchase of business.mp4"),
    },
    standardCosting: {
      title: "Standard Costing",
      videoSrc: recordedVideoPath("A2", "Standard costing lecture.mp4"),
    },
  },
} as const;
