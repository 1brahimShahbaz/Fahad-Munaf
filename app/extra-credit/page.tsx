import type { Metadata } from "next";
import { ExtraCreditGallery } from "@/components/gallery/ExtraCreditGallery";
import { ExtraCreditHero } from "@/components/gallery/ExtraCreditHero";
import { getStudentGalleryPhotos } from "@/lib/studentGallery";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Extra Credit — Photos & Class Clips",
  description:
    "Short clips from live Economics lessons, recommendation videos from students, and photo highlights from Sir Fahad Munaf Parekh’s classes.",
  path: "/extra-credit",
});

export default function ExtraCreditPage() {
  const studentPhotos = getStudentGalleryPhotos();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Extra Credit", path: "/extra-credit" },
            ])
          ),
        }}
      />
    <ExtraCreditHero>
      <ExtraCreditGallery studentPhotos={studentPhotos} />
    </ExtraCreditHero>
    </>
  );
}
