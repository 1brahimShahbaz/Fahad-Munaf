import { BlogPreview } from "@/components/home/BlogPreview";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { ExtraCreditPreview } from "@/components/home/ExtraCreditPreview";
import { ShortsMarquee } from "@/components/home/ShortsMarquee";
import { NotThisButThis } from "@/components/home/NotThisButThis";
import { RegistrationBanner } from "@/components/home/RegistrationBanner";
import { SampleLectures } from "@/components/home/SampleLectures";
import { SampleNotes } from "@/components/home/SampleNotes";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { FooterAffiliations } from "@/components/layout/FooterAffiliations";
import type { BlogCardPost } from "@/data/posts";
import type { NoteResource } from "@/data/notes";
import type { StudentPhoto } from "@/lib/studentTypes";

type Props = {
  sampleNotes: NoteResource[];
  extraCreditPhotos: StudentPhoto[];
  blogPreviewPosts: BlogCardPost[];
};

export function HomeBelowFold({
  sampleNotes,
  extraCreditPhotos,
  blogPreviewPosts,
}: Props) {
  return (
    <>
      <NotThisButThis />
      <SampleLectures />
      <SampleNotes notes={sampleNotes} />
      <AnimateSection index={2} className="bg-navy-900 pt-16 lg:pt-20">
        <div className="container-x">
          <FooterAffiliations />
        </div>
      </AnimateSection>
      <ShortsMarquee />
      <ExtraCreditPreview photos={extraCreditPhotos} />
      <BlogPreview posts={blogPreviewPosts} />
      <EcosystemSection />
      <RegistrationBanner source="home_footer_cta" />
    </>
  );
}
