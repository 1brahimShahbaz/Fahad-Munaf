import type { Metadata } from "next";
import { CoursePageTemplate } from "@/components/courses/CoursePageTemplate";
import { courses } from "@/data/courses";
import { getNotesLibraryData } from "@/lib/notesLibrary";
import { buildMetadata, breadcrumbJsonLd, courseJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "O Level Economics Course Karachi | CAIE 2281 | Fahad Munaf Parekh",
  titleAbsolute: true,
  description:
    "O Level Economics tuition in Karachi and online. CAIE 2281 specialist. Full syllabus coverage, past-paper practice and exam technique. Register for May/June 2027.",
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
