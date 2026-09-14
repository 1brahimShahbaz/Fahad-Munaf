import type { Metadata } from "next";
import { CoursePageTemplate } from "@/components/courses/CoursePageTemplate";
import { courses } from "@/data/courses";
import { getNotesLibraryData } from "@/lib/notesLibrary";
import { buildMetadata, breadcrumbJsonLd, courseJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AS Level Economics Course Karachi | CAIE 9708 | Fahad Munaf Parekh",
  titleAbsolute: true,
  description:
    "AS Level Economics tuition in Karachi and online. CAIE 9708 specialist. Covers the full AS syllabus with past papers, essay technique and exam preparation. Register for May/June 2027.",
  path: "/courses/as-level",
});

export default function ASLevelPage() {
  const { studyNotes } = getNotesLibraryData();

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
      <CoursePageTemplate
        course={courses.AS}
        studyNoteGroups={studyNotes.AS}
      />
    </>
  );
}
