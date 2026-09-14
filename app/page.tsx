import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/HeroSlider";
import { SessionAnnouncement } from "@/components/home/SessionAnnouncement";
import { HomeBelowFold } from "@/components/home/HomeBelowFold";
import { HomeFaq } from "@/components/home/HomeFaq";
import { ChannelShowcase } from "@/components/home/ChannelShowcase";
import { TalkWithFMPBand } from "@/components/shared/TalkWithFMPBand";
import {
  buildMetadata,
  courseListJsonLd,
  lectureVideoListJsonLd,
} from "@/lib/seo";
import { recordedLectureGroups } from "@/data/recordedLectures";
import { getBlogPreviewPosts } from "@/data/posts";
import { getSampleNotesForHome } from "@/lib/notesLibrary";
import { getStudentGalleryPreview } from "@/lib/studentGallery";

export const metadata: Metadata = buildMetadata({
  // Title, description and the on-page headings all carry the same core terms
  // — Economics, tutor, Karachi, CAIE, A/O Level, Sir Fahad Munaf Parekh — so the
  // page reads as consistently about one topic.
  title: "A Level & O Level Economics Tutor Karachi | Sir Fahad Munaf Parekh",
  titleAbsolute: true,
  description:
    "Sir Fahad Munaf Parekh — CAIE 9708 & O Level Economics tutor in Karachi. Free recorded lectures, notes and solved past papers for students. May/June 2027 admissions open.",
  path: "/",
  keywords: [
    "best a level economics tutor karachi",
    "a level economics teacher karachi",
    "economics tutor karachi",
    "caie economics 9708 karachi",
    "edexcel economics tutor pakistan",
    "o level economics tutor karachi",
    "as level economics karachi",
    "a2 level economics karachi",
    "economics tuition karachi",
    "best economics teacher pakistan",
    "online economics tutor pakistan",
    "fahad munaf parekh economics",
  ],
});

export default function HomePage() {
  const sampleNotes = getSampleNotesForHome();
  const extraCreditPhotos = getStudentGalleryPreview(8);
  const blogPreviewPosts = getBlogPreviewPosts(4);

  return (
    <>
      {/* Course carousel + free-lecture video list rich results. The site-wide
          Person / Organization / WebSite graph lives in app/layout.tsx. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(lectureVideoListJsonLd(recordedLectureGroups)),
        }}
      />

      {/* Hero slide 1 is the LCP element — start fetching it with the HTML,
          before React or the carousel has booted. (Home only.) */}
      <link
        rel="preload"
        as="image"
        href="/images/banner1.webp"
        fetchPriority="high"
      />
      {/* next/image preloads slide 1 via `priority`; slides 2–3 load lazily. */}
      <HeroSlider />
      <SessionAnnouncement />
      <HomeBelowFold
        sampleNotes={sampleNotes}
        extraCreditPhotos={extraCreditPhotos}
        blogPreviewPosts={blogPreviewPosts}
      />
      <HomeFaq />
      <TalkWithFMPBand source="home" index={7} />
      <ChannelShowcase />
    </>
  );
}
