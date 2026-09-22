import type { Metadata } from "next";
import { CoursePageTemplate } from "@/components/courses/CoursePageTemplate";
import { courses } from "@/data/courses";
import { buildMetadata, breadcrumbJsonLd, courseJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "O Level Accounting Classes (CAIE 7707) - Shehroz Iqbal",
  titleAbsolute: true,
  description:
    "Build strong Accounting fundamentals for O Level (CAIE 7707) with Sir Shehroz Iqbal in Karachi & online. Enroll now for the Oct/Nov 2026 batch.",
  path: "/courses/o-level-accounting-course",
});

export default function OLevelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd("O")),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Courses", path: "/courses/as-level-accounting-course" },
              { name: "O Level & IGCSE", path: "/courses/o-level-accounting-course" },
            ])
          ),
        }}
      />
      <CoursePageTemplate course={courses.O} />
    </>
  );
}
