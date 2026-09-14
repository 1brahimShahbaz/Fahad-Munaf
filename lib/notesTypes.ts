export type NoteLevel = "AS" | "A2" | "O";

export type NoteFile = {
  id: string;
  title: string;
  file: string;
};

export type NoteGroup = {
  id: string;
  title: string;
  files: NoteFile[];
  groups: NoteGroup[];
};

export type YearlyPaperGroup = {
  id: string;
  year: string;
  papers: NoteFile[];
};

export type NotesLibraryData = {
  studyNotes: Record<NoteLevel, NoteGroup[]>;
  yearlyPapers: Record<NoteLevel, YearlyPaperGroup[]>;
};

export type NoteResource = NoteFile & {
  level: NoteLevel;
};

export function countNoteFiles(groups: NoteGroup[]): number {
  let n = 0;
  const walk = (g: NoteGroup) => {
    n += g.files.length;
    g.groups.forEach(walk);
  };
  groups.forEach(walk);
  return n;
}

/** Number of files unlocked (previewable) per section — the rest require the full pack. */
export const NOTES_FREE_PREVIEW_LIMIT = 4;

/**
 * Flattens a group's files in render order (own files first, then nested
 * groups depth-first). The first {@link NOTES_FREE_PREVIEW_LIMIT} ids are
 * treated as unlocked previews for that section.
 */
export function flattenNoteFiles(group: NoteGroup): NoteFile[] {
  return [...group.files, ...group.groups.flatMap(flattenNoteFiles)];
}

/** Ids of the files that stay unlocked (previewable) within a single section. */
export function unlockedFileIds(group: NoteGroup): Set<string> {
  return new Set(
    flattenNoteFiles(group)
      .slice(0, NOTES_FREE_PREVIEW_LIMIT)
      .map((f) => f.id)
  );
}
