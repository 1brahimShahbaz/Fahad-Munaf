import type { Metadata } from "next";
import { CoursePageTemplate } from "@/components/courses/CoursePageTemplate";
import { courses } from "@/data/courses";
import { getNotesLibraryData } from "@/lib/notesLibrary";
import { buildMetadata, breadcrumbJsonLd, courseJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "A2 Level Economics Course Karachi | CAIE 9708 | Fahad Munaf Parekh",
  titleAbsolute: true,
  description:
    "A2 Level Economics tuition in Karachi and online. Advanced microeconomics, macroeconomics and Paper 4 essay technique. CAIE 9708 specialist. Register for May/June 2027.",
  path: "/courses/a2-level",
});

export default function A2LevelPage() {
  const { studyNotes } = getNotesLibraryData();

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
      <CoursePageTemplate
        course={courses.A2}
        studyNoteGroups={studyNotes.A2}
      />
    </>
  );
}
