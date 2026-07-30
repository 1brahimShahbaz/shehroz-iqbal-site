import type { Metadata } from "next";
import { CoursePageTemplate } from "@/components/courses/CoursePageTemplate";
import { courses } from "@/data/courses";
import { buildMetadata, breadcrumbJsonLd, courseJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AS Level Accounting Course Online, CAIE 9706 - Shehroz Iqbal",
  titleAbsolute: true,
  description:
    "Join the AS Level Accounting course online with Sir Shehroz Iqbal. Live classes, recorded lessons & notes for CAIE 9706. Enroll for Oct/Nov 2026.",
  path: "/courses/as-level",
});

export default function ASLevelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd("AS")),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Courses", path: "/courses/as-level" },
              { name: "AS Level", path: "/courses/as-level" },
            ])
          ),
        }}
      />
      <CoursePageTemplate course={courses.AS} />
    </>
  );
}
