import type { Metadata } from "next";
import { CoursePageTemplate } from "@/components/courses/CoursePageTemplate";
import { courses } from "@/data/courses";
import { getNotesLibraryData } from "@/lib/notesLibrary";
import { buildMetadata, breadcrumbJsonLd, courseJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "O Level Accounting Course Karachi | CAIE 7707 | Shehroz Iqbal",
  titleAbsolute: true,
  description:
    "O Level Accounting tuition in Karachi and online. CAIE 7707 specialist. Full syllabus coverage, past-paper practice and exam technique. Register for Oct/Nov 2026.",
  path: "/courses/o-level",
});

export default function OLevelPage() {
  const { studyNotes } = getNotesLibraryData();

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
              { name: "Courses", path: "/courses/as-level" },
              { name: "O Level", path: "/courses/o-level" },
            ])
          ),
        }}
      />
      <CoursePageTemplate
        course={courses.O}
        studyNoteGroups={studyNotes.O}
      />
    </>
  );
}
