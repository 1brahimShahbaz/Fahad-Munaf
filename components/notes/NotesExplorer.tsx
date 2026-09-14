"use client";

import dynamic from "next/dynamic";
import { startTransition, useEffect, useState } from "react";
import { FileText, Lock, Minus, Plus } from "lucide-react";
import { requestAccessLink } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import type { NoteFile, NoteGroup } from "@/lib/notesTypes";
import { unlockedFileIds } from "@/lib/notesTypes";
import { cn } from "@/lib/utils";

const NotePreviewModal = dynamic(
  () =>
    import("@/components/shared/NotePreviewModal").then((mod) => ({
      default: mod.NotePreviewModal,
    })),
  { ssr: false }
);

type Props = {
  groups: NoteGroup[];
  defaultOpenId?: string;
};

function countFiles(group: NoteGroup): number {
  return (
    group.files.length +
    group.groups.reduce((sum, g) => sum + countFiles(g), 0)
  );
}

function requestNotes(location: string) {
  trackEvent("whatsapp_click", { context: location });
  if (typeof window !== "undefined") {
    window.open(
      requestAccessLink("Economics notes pack"),
      "_blank",
      "noopener,noreferrer"
    );
  }
}

function NoteRow({
  file,
  onPreview,
  bordered,
  indentRem = 0,
  locked = false,
}: {
  file: NoteFile;
  onPreview: (file: NoteFile) => void;
  bordered?: boolean;
  indentRem?: number;
  locked?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 bg-cream-50 py-3.5 transition-colors hover:bg-cream-50 sm:pr-6",
        bordered && "border-b border-gray-100"
      )}
      style={{ paddingLeft: `${1.25 + indentRem}rem`, paddingRight: "1.25rem" }}
    >
      <span className="flex min-w-0 items-center gap-3">
        {locked ? (
          <Lock className="h-4 w-4 shrink-0 text-gray-400" strokeWidth={2} />
        ) : (
          <FileText className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={2} />
        )}
        <span
          className={cn(
            "truncate font-inter text-sm font-medium",
            locked ? "text-gray-400" : "text-navy-900"
          )}
        >
          {file.title}
        </span>
      </span>
      {locked ? (
        <button
          type="button"
          onClick={() => requestNotes("notes_locked_row")}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500 transition-all hover:border-gold-500 hover:bg-gold-500 hover:text-navy-900"
        >
          <Lock className="h-3 w-3" strokeWidth={2.5} />
          Locked
        </button>
      ) : (
        <button
          type="button"
          onClick={() => startTransition(() => onPreview(file))}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold-500 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-500 transition-all hover:bg-gold-500 hover:text-navy-900"
        >
          Preview
        </button>
      )}
    </div>
  );
}

function NestedGroups({
  groups,
  onPreview,
  depth,
  unlockedIds,
}: {
  groups: NoteGroup[];
  onPreview: (file: NoteFile) => void;
  depth: number;
  unlockedIds: Set<string>;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const indentRem = 1.5 + depth * 1.25;

  return (
    <div className="border-t border-gray-100">
      {groups.map((group) => {
        const isOpen = openId === group.id;
        const fileCount = countFiles(group);
        return (
          <div key={group.id}>
            <button
              type="button"
              onClick={() =>
                startTransition(() => setOpenId(isOpen ? null : group.id))
              }
              aria-expanded={isOpen}
              className={cn(
                "flex w-full items-center justify-between gap-3 py-3 text-left hover:bg-gray-50 sm:pr-6",
                isOpen && "border-b border-gray-100 bg-gray-50/60"
              )}
              style={{ paddingLeft: `${indentRem}rem`, paddingRight: "1.25rem" }}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    isOpen
                      ? "bg-gold-500 text-navy-900"
                      : "bg-navy-900/10 text-navy-900"
                  )}
                >
                  {isOpen ? (
                    <Minus className="h-3 w-3" strokeWidth={2.5} />
                  ) : (
                    <Plus className="h-3 w-3" strokeWidth={2.5} />
                  )}
                </span>
                <span className="truncate font-inter text-sm font-semibold text-navy-900">
                  {group.title}
                </span>
              </span>
              <span className="shrink-0 text-[11px] font-medium tabular-nums text-gray-500">
                {fileCount} PDF{fileCount === 1 ? "" : "s"}
              </span>
            </button>
            {isOpen && (
              <div>
                {group.files.map((file, i) => (
                  <NoteRow
                    key={file.id}
                    file={file}
                    onPreview={onPreview}
                    locked={!unlockedIds.has(file.id)}
                    bordered={
                      i < group.files.length - 1 || group.groups.length > 0
                    }
                    indentRem={indentRem + 0.75}
                  />
                ))}
                {group.groups.length > 0 && (
                  <NestedGroups
                    groups={group.groups}
                    onPreview={onPreview}
                    depth={depth + 1}
                    unlockedIds={unlockedIds}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function NotesExplorer({ groups, defaultOpenId }: Props) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId ?? groups[0]?.id ?? null
  );
  const [preview, setPreview] = useState<NoteFile | null>(null);

  useEffect(() => {
    setOpenId(defaultOpenId ?? groups[0]?.id ?? null);
  }, [groups, defaultOpenId]);

  if (groups.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No notes available for this level yet.
      </p>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {groups.map((group) => {
          const isOpen = openId === group.id;
          const fileCount = countFiles(group);
          const unlockedIds = unlockedFileIds(group);
          const lockedCount = fileCount - unlockedIds.size;

          return (
            <div
              key={group.id}
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
                startTransition(() => setOpenId(isOpen ? null : group.id))
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
                  <span className="font-display text-base font-semibold leading-tight text-navy-900 sm:text-lg">
                    {group.title}
                  </span>
                </span>
                <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                  {fileCount} PDF{fileCount === 1 ? "" : "s"}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-gray-100">
                  {group.files.map((file, i) => (
                    <NoteRow
                      key={file.id}
                      file={file}
                      onPreview={(file) =>
                        startTransition(() => setPreview(file))
                      }
                      locked={!unlockedIds.has(file.id)}
                      bordered={
                        i < group.files.length - 1 || group.groups.length > 0
                      }
                    />
                  ))}
                  {group.groups.length > 0 && (
                    <NestedGroups
                      groups={group.groups}
                      onPreview={(file) =>
                        startTransition(() => setPreview(file))
                      }
                      depth={0}
                      unlockedIds={unlockedIds}
                    />
                  )}

                  {lockedCount > 0 && (
                    <a
                      href={requestAccessLink("Economics notes pack")}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("whatsapp_click", {
                          context: "notes_full_pack",
                        })
                      }
                      className="flex items-center justify-between gap-3 border-t border-gray-100 bg-navy-900 px-5 py-3.5 font-inter text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-navy-700 sm:px-6"
                    >
                      <span className="flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5 text-gold-500" strokeWidth={2.5} />
                        {lockedCount} more locked — request the full pack
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

      <NotePreviewModal
        open={!!preview}
        onClose={() => startTransition(() => setPreview(null))}
        file={preview?.file ?? ""}
        title={preview?.title ?? "Note preview"}
      />
    </>
  );
}
