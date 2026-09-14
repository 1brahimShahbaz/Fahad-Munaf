"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { NotePreviewModal } from "@/components/shared/NotePreviewModal";
import type { NoteResource } from "@/data/notes";

const LEVEL_TO_BG: Record<NoteResource["level"], string> = {
  AS: "from-cream-50 via-cream-50 to-white",
  A2: "from-navy-900/[0.06] via-cream-50 to-white",
  O: "from-gold-500/10 via-cream-50 to-white",
};

const LEVEL_TO_LABEL: Record<NoteResource["level"], string> = {
  AS: "AS LEVEL",
  A2: "A2 LEVEL",
  O: "O LEVEL",
};

export function SampleNoteCard({ note }: { note: NoteResource }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="card-rest flex flex-col rounded-2xl border border-gray-200 bg-white p-6">
        <div className="relative">
          <div
            className={`relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br ${LEVEL_TO_BG[note.level]}`}
          >
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative">
                <div className="absolute -right-2 top-2 h-44 w-32 rotate-[8deg] rounded-md border border-gray-200 bg-white shadow-card-rest" />
                <div className="relative flex h-44 w-32 flex-col items-center justify-center rounded-md border border-gray-200 bg-white p-3 shadow-card-rest">
                  <FileText
                    className="h-10 w-10 text-navy-700/50"
                    strokeWidth={1.25}
                  />
                  <div className="mt-3 w-full space-y-1">
                    <div className="h-1 w-full rounded-full bg-gray-200" />
                    <div className="h-1 w-3/4 rounded-full bg-gray-200" />
                    <div className="h-1 w-5/6 rounded-full bg-gray-200" />
                    <div className="h-1 w-2/3 rounded-full bg-gray-200" />
                  </div>
                  <div className="mt-3 h-6 w-12 rounded bg-gold-500/30" />
                </div>
              </div>
            </div>
            <span className="absolute right-3 top-3 rounded-full bg-navy-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider2 text-white">
              {LEVEL_TO_LABEL[note.level]}
            </span>
          </div>
        </div>
        <div className="mt-5 flex-1">
          <h3 className="font-display text-[18px] font-semibold leading-snug text-navy-900">
            {note.title}
          </h3>
          <p className="mt-1.5 text-[13px] text-gray-500">PDF · preview only</p>
        </div>
        <div className="mt-5 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn-outline-navy inline-flex w-full items-center justify-center py-3 text-[15px]"
          >
            Preview PDF
          </button>
        </div>
      </article>

      <NotePreviewModal
        open={open}
        onClose={() => setOpen(false)}
        file={note.file}
        title={note.title}
      />
    </>
  );
}
