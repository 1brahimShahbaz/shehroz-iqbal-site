import type { Metadata } from "next";
import { CoursePageTemplate } from "@/components/courses/CoursePageTemplate";
import { courses } from "@/data/courses";
import { buildMetadata, breadcrumbJsonLd, courseJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "A2 Level Accounting Course Online, CAIE 9706 - Shehroz Iqbal",
  titleAbsolute: true,
  description:
    "Take the A2 Level Accounting course online with Sir Shehroz Iqbal. Master published accounts, cash flow & costing for CAIE 9706. Enroll for Oct/Nov 2026.",
  path: "/courses/a2-level",
});

export default function A2LevelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd("A2")),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Courses", path: "/courses/as-level" },
              { name: "A2 Level", path: "/courses/a2-level" },
            ])
          ),
        }}
      />
      <CoursePageTemplate course={courses.A2} />
    </>
  );
}
