import type { Metadata } from "next";
import { NotesLibrary } from "@/components/notes/NotesLibrary";
import { StickyWhatsAppBar } from "@/components/notes/StickyWhatsAppBar";
import { getNotesLibraryData } from "@/lib/notesLibrary";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Notes Library — O Level, AS, A2 Economics",
  description:
    "Preview Economics notes and yearly past papers for O Level, AS Level and A2 Level — in-browser only with watermark protection.",
  path: "/notes",
});

export default function NotesPage() {
  const data = getNotesLibraryData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Economics Notes", path: "/notes" },
            ])
          ),
        }}
      />
      <NotesLibrary data={data} />
      <StickyWhatsAppBar />
    </>
  );
}
