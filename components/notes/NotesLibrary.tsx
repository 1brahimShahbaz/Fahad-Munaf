"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { NotesExplorer } from "@/components/notes/NotesExplorer";
import { YearlyPapersSection } from "@/components/notes/YearlyPapersSection";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { requestAccessLink } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import type { NoteLevel, NotesLibraryData } from "@/lib/notesTypes";
import { countNoteFiles, NOTES_FREE_PREVIEW_LIMIT } from "@/lib/notesTypes";
import { cn } from "@/lib/utils";

const TABS: { id: NoteLevel; label: string }[] = [
  { id: "O", label: "O Level" },
  { id: "AS", label: "AS Level" },
  { id: "A2", label: "A2 Level" },
];

type Props = {
  data: NotesLibraryData;
};

export function NotesLibrary({ data }: Props) {
  const [active, setActive] = useState<NoteLevel>("AS");
  const studyGroups = data.studyNotes[active];
  const noteCount = countNoteFiles(studyGroups);

  return (
    <>
      <AnimateSection
        index={0}
        direction="fade"
        instant
        className="relative isolate overflow-hidden bg-navy-900 text-white"
      >
        <div aria-hidden className="absolute inset-0 grad-gold-spot" />
        <div aria-hidden className="absolute inset-0 bg-grid-overlay" />
        <div className="container-x relative pt-20 pb-14 text-center lg:pt-28 lg:pb-16">
          <div className="mx-auto max-w-2xl">
            <SectionEyebrow>Notes Library</SectionEyebrow>
            <h1 className="mt-3 font-display text-[40px] font-semibold italic leading-[1.05] tracking-[-0.02em] text-white sm:text-[56px]">
              Preview notes for every level.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/80">
              The first {NOTES_FREE_PREVIEW_LIMIT} notes in every section are free
              to preview — watermarked and not downloadable. Unlock the rest by
              messaging Sir Fahad for the full pack.
            </p>
            <div className="mt-7 flex justify-center">
              <a
                href={requestAccessLink("Economics notes pack")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_click", {
                    context: "notes_hero_full_pack",
                  })
                }
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-[14px] font-semibold text-navy-900 shadow-cta-glow-sm transition-all hover:bg-gold-300"
              >
                Request full pack
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={cn(
                  "rounded-full px-5 py-2 text-[13px] font-medium transition-all",
                  active === tab.id
                    ? "bg-gold-500 text-navy-900 shadow-cta-glow-sm"
                    : "border border-white/30 bg-white/5 text-white hover:bg-white/15"
                )}
                aria-pressed={active === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </AnimateSection>

      <AnimateSection index={1} className="bg-surface py-20 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[32px] font-semibold leading-tight text-navy-900 sm:text-[40px]">
              Study notes
            </h2>
            <p className="mt-2 text-[15px] text-gray-500">
              {noteCount} PDF{noteCount === 1 ? "" : "s"} for{" "}
              {TABS.find((t) => t.id === active)?.label}
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-4xl">
            <NotesExplorer groups={studyGroups} />
          </div>
        </div>
      </AnimateSection>

      <YearlyPapersSection
        yearlyPapers={data.yearlyPapers}
        activeLevel={active}
        onLevelChange={setActive}
      />
    </>
  );
}
