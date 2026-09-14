"use client";

import dynamic from "next/dynamic";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateSection } from "@/components/shared/AnimateSection";

/**
 * The animated beam diagram is the only framer-motion consumer left on the
 * site. Loading it on demand keeps the library out of every page's initial
 * bundle — it streams in after hydration, well below the fold.
 */
const AboutEcosystem = dynamic(
  () =>
    import("@/components/about/AboutEcosystem").then((mod) => ({
      default: mod.AboutEcosystem,
    })),
  {
    ssr: false,
    loading: () => <div aria-hidden className="min-h-[320px]" />,
  }
);

export function EcosystemSection() {
  return (
    <AnimateSection index={6} className="bg-surface py-20 lg:py-24">
      <div className="container-x">
        {/* The title used to open with an empty line and a stray <br />, which
            left a large gap above the heading. */}
        <SectionHeader
          eyebrow="Everything you need"
          title={
            <>
              One teacher,{" "}
              <span className="italic text-gold-500">complete support.</span>
            </>
          }
          subtitle="Recorded lectures, live classes, study notes and past papers — every part of the course comes from Sir Fahad directly, so there is never a question about where to look or who to ask."
        />
        <AboutEcosystem />
      </div>
    </AnimateSection>
  );
}
