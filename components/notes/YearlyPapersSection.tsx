"use client";

import { useEffect, useState } from "react";
import { FileText, Lock, Minus, Plus } from "lucide-react";
import { NotePreviewModal } from "@/components/shared/NotePreviewModal";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { requestAccessLink } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import type { NoteFile, NoteLevel, YearlyPaperGroup } from "@/lib/notesTypes";
import { NOTES_FREE_PREVIEW_LIMIT } from "@/lib/notesTypes";
import { cn } from "@/lib/utils";

const TABS: { id: NoteLevel; label: string }[] = [
  { id: "O", label: "O Level" },
  { id: "AS", label: "AS Level" },
  { id: "A2", label: "A2 Level" },
];

type Props = {
  yearlyPapers: Record<NoteLevel, YearlyPaperGroup[]>;
  /** When set, syncs tab with parent (notes page level filter). */
  activeLevel?: NoteLevel;
  onLevelChange?: (level: NoteLevel) => void;
};

export function YearlyPapersSection({
  yearlyPapers,
  activeLevel: controlledLevel,
  onLevelChange,
}: Props) {
  const [internalLevel, setInternalLevel] = useState<NoteLevel>("AS");
  const activeLevel = controlledLevel ?? internalLevel;
  const setActiveLevel = onLevelChange ?? setInternalLevel;

  const [openYearId, setOpenYearId] = useState<string | null>(null);
  const [preview, setPreview] = useState<NoteFile | null>(null);

  const years = yearlyPapers[activeLevel];

  useEffect(() => {
    setOpenYearId(years[0]?.id ?? null);
  }, [years, activeLevel]);

  return (
    <AnimateSection index={2} className="border-t border-gray-200 bg-surface py-20 lg:py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <SectionEyebrow>Yearly Papers</SectionEyebrow>
          <h2 className="mt-3 font-display text-[32px] font-semibold leading-tight text-navy-900 sm:text-[40px]">
            Past papers by year
          </h2>
          <p className="mt-3 text-[16px] text-gray-500">
            Fully solved papers with Sir Fahad&rsquo;s reasoning, year by year —
            preview in-browser only.
          </p>
        </div>

        {!controlledLevel && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveLevel(tab.id)}
                className={cn(
                  "rounded-full px-5 py-2 font-inter text-sm font-semibold transition-all",
                  activeLevel === tab.id
                    ? "bg-navy-900 text-white shadow-card-rest"
                    : "bg-white text-navy-900 ring-1 ring-gray-200 hover:bg-navy-900 hover:text-white"
                )}
                aria-pressed={activeLevel === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="mx-auto mt-10 max-w-4xl">
          {years.length === 0 ? (
            <p className="text-center text-gray-500">
              No yearly papers available for this level yet.
            </p>
          ) : (
            <div className="space-y-4">
              {years.map((yearGroup) => {
                const isOpen = openYearId === yearGroup.id;
                return (
                  <div
                    key={yearGroup.id}
                    className={cn(
                      "overflow-hidden rounded-2xl border transition-all duration-200",
                      isOpen
                        ? "border-gold-500/50 bg-white shadow-card-rest"
                        : "border-gray-200 bg-white hover:border-gold-500/30"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenYearId(isOpen ? null : yearGroup.id)
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="flex items-center gap-3 sm:gap-4">
                        <span
                          aria-hidden
                          className={cn(
                            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                            isOpen
                              ? "bg-gold-500 text-navy-900"
                              : "bg-navy-900 text-white"
                          )}
                        >
                          {isOpen ? (
                            <Minus className="h-4 w-4" strokeWidth={2.5} />
                          ) : (
                            <Plus className="h-4 w-4" strokeWidth={2.5} />
                          )}
                        </span>
                        <span className="font-display text-base font-semibold text-navy-900 sm:text-lg">
                          {yearGroup.year}
                        </span>
                      </span>
                      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                        {yearGroup.papers.length} paper
                        {yearGroup.papers.length === 1 ? "" : "s"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-gray-100">
                        {yearGroup.papers.map((paper, i) => {
                          const locked = i >= NOTES_FREE_PREVIEW_LIMIT;
                          return (
                            <div
                              key={paper.id}
                              className={cn(
                                "flex items-center justify-between gap-3 bg-cream-50 px-5 py-3.5 sm:px-6",
                                i < yearGroup.papers.length - 1 &&
                                  "border-b border-gray-100"
                              )}
                            >
                              <span className="flex min-w-0 items-center gap-3">
                                {locked ? (
                                  <Lock
                                    className="h-4 w-4 shrink-0 text-gray-400"
                                    strokeWidth={2}
                                  />
                                ) : (
                                  <FileText
                                    className="h-4 w-4 shrink-0 text-gold-500"
                                    strokeWidth={2}
                                  />
                                )}
                                <span
                                  className={cn(
                                    "truncate font-inter text-sm font-medium",
                                    locked ? "text-gray-400" : "text-navy-900"
                                  )}
                                >
                                  {paper.title}
                                </span>
                              </span>
                              {locked ? (
                                <a
                                  href={requestAccessLink("yearly past papers with solutions")}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() =>
                                    trackEvent("whatsapp_click", {
                                      context: "papers_locked_row",
                                    })
                                  }
                                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500 transition-all hover:border-gold-500 hover:bg-gold-500 hover:text-navy-900"
                                >
                                  <Lock className="h-3 w-3" strokeWidth={2.5} />
                                  Locked
                                </a>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setPreview(paper)}
                                  className="inline-flex shrink-0 items-center rounded-full border border-gold-500 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-500 transition-all hover:bg-gold-500 hover:text-navy-900"
                                >
                                  Preview
                                </button>
                              )}
                            </div>
                          );
                        })}

                        {yearGroup.papers.length > NOTES_FREE_PREVIEW_LIMIT && (
                          <a
                            href={requestAccessLink("yearly past papers with solutions")}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackEvent("whatsapp_click", {
                                context: "papers_full_pack",
                              })
                            }
                            className="flex items-center justify-between gap-3 border-t border-gray-100 bg-navy-900 px-5 py-3.5 font-inter text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-navy-700 sm:px-6"
                          >
                            <span className="flex items-center gap-2">
                              <Lock
                                className="h-3.5 w-3.5 text-gold-500"
                                strokeWidth={2.5}
                              />
                              {yearGroup.papers.length -
                                NOTES_FREE_PREVIEW_LIMIT}{" "}
                              more locked — request the full pack
                            </span>
                            <span aria-hidden className="text-gold-500">
                              →
                            </span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <NotePreviewModal
        open={!!preview}
        onClose={() => setPreview(null)}
        file={preview?.file ?? ""}
        title={preview?.title ?? "Past paper preview"}
      />
    </AnimateSection>
  );
}
