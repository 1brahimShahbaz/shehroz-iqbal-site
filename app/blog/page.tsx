import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Accounting Blog — CAIE A Level",
  description:
    "Accounting study guides, exam technique, and concept explainers by Shehroz Iqbal — CAIE 9706, Edexcel, AS/A2, and O Level 7707. Tips for Pakistan and online students.",
  path: "/blog",
  keywords: [
    "Shehroz Iqbal blog",
    "accounting a level blog",
    "CAIE 9706 tips",
    "accounting exam technique",
    "accounting study guide",
    "O Level accounting revision",
    "accounting tutor Pakistan",
  ],
});

export default function BlogPage() {
  return <BlogIndex />;
}
