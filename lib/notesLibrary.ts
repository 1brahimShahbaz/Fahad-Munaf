import fs from "fs";
import path from "path";
import type {
  NoteFile,
  NoteGroup,
  NoteLevel,
  NoteResource,
  NotesLibraryData,
  YearlyPaperGroup,
} from "./notesTypes";

export type {
  NoteFile,
  NoteGroup,
  NoteLevel,
  NoteResource,
  NotesLibraryData,
  YearlyPaperGroup,
} from "./notesTypes";
export { countNoteFiles } from "./notesTypes";

const NOTES_ROOT = path.join(process.cwd(), "public", "notes");

const LEVEL_FOLDERS: Record<NoteLevel, string> = {
  AS: "As level",
  A2: "A2 lEVEL",
  O: "olevel",
};

/* ------------------------------------------------------------------ *
 * Exclusions — content that exists on disk but is not published.
 * ------------------------------------------------------------------ */

/** "Test Yourself" worksheets are shared privately; they never appear on the site. */
function isTestYourself(name: string): boolean {
  return /test\s*_?\s*yourself/i.test(name);
}

/** Blank question papers — the site publishes solved papers and reasoning only. */
function isUnsolved(name: string): boolean {
  return /unsolved/i.test(name);
}

function isExcluded(name: string): boolean {
  return isTestYourself(name) || isUnsolved(name);
}

/* ------------------------------------------------------------------ *
 * Naming — folders carry LMS ids and ordering prefixes that must never
 * reach the UI, e.g. "2617158 - 2_ Micro PDFs" → "Micro PDFs" and
 * "1. 2617163 - Chapter 1_ Demand and Supply" → "Chapter 1: Demand and Supply".
 * ------------------------------------------------------------------ */

function cleanLabel(name: string): string {
  let s = name.trim();

  // Leading order token ("1. " / "7) ") and LMS id ("2617163 - "), in either order.
  s = s.replace(/^\d+\s*[.)]\s*/, "");
  s = s.replace(/^\d+\s*-\s*/, "");
  s = s.replace(/^\d+\s*[.)]\s*/, "");
  // Section / topic code prefix ("2_ Micro PDFs", "1a_ Marginal Utility").
  s = s.replace(/^\d+[a-z]?_\s*/i, "");

  // Underscores stood in for characters Windows won't allow in a filename:
  s = s.replace(/PDF_s/gi, "PDFs"); //            apostrophe: "PDF_s" → "PDFs"
  s = s.replace(/(\S)_\s+/g, "$1: "); //          colon:      "Chapter 1_ X" → "Chapter 1: X"
  s = s.replace(/_\s*([A-Za-z][A-Za-z ]*?)\s*_\s*$/, " ($1)"); // "_Solved_" → "(Solved)"
  s = s.replace(/\s_\s/g, " & "); //              ampersand:  "Income _ Wealth" → "Income & Wealth"

  s = s.replace(/_/g, " ");
  // Tidy stray spacing, including inside brackets ("( Reasons )" → "(Reasons)").
  s = s.replace(/\(\s+/g, "(").replace(/\s+\)/g, ")");
  s = s.replace(/\s{2,}/g, " ").trim();
  return s;
}

function titleFromPdf(filename: string): string {
  // Some files came out of the LMS with a doubled extension, a UUID prefix, or
  // percent-encoding that lost its `%` signs ("_20Monopolistic").
  let s = filename.replace(/(\.pdf)+$/i, "");
  s = s.replace(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
    ""
  );
  s = s.replace(/_20(?=[A-Za-z])/g, " ").replace(/(^|\s)20(?=[A-Za-z]{2,})/g, "$1");
  return cleanLabel(s);
}

/**
 * Sort key for a folder/file name. Uses the curated order number, which is
 * either a leading "N." or the section number that follows the LMS id
 * ("2617158 - 2_ Micro PDFs" → 2). Falls back to a natural-order compare.
 */
function orderOf(name: string): number {
  const leading = name.match(/^(\d+)\s*[.)]/);
  if (leading) return parseInt(leading[1], 10);
  const section = name.match(/^\d+\s*-\s*(\d+)_/);
  if (section) return parseInt(section[1], 10);
  return Number.MAX_SAFE_INTEGER;
}

function byCuratedOrder(a: string, b: string) {
  const oa = orderOf(a);
  const ob = orderOf(b);
  if (oa !== ob) return oa - ob;
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function readDirSorted(dirAbs: string): fs.Dirent[] {
  try {
    return fs
      .readdirSync(dirAbs, { withFileTypes: true })
      .sort((a, b) => byCuratedOrder(a.name, b.name));
  } catch {
    return [];
  }
}

function toPublicSrc(fileAbs: string): string {
  const fromPublic = path.relative(path.join(process.cwd(), "public"), fileAbs);
  const posix = fromPublic.replace(/\\/g, "/");
  const segments = posix.split("/").filter(Boolean);
  return "/" + segments.map((s) => encodeURIComponent(s)).join("/");
}

function stableId(relPosix: string) {
  return relPosix
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180);
}

function extractYear(folderName: string): string {
  const match = folderName.match(/\b(19|20)\d{2}\b/);
  return match ? match[0] : cleanLabel(folderName);
}

/* ------------------------------------------------------------------ *
 * Study notes
 * ------------------------------------------------------------------ */

function isYearlyRootFolder(name: string): boolean {
  return /Paper.*Yearly/i.test(name);
}

function isStudyRootFolder(name: string): boolean {
  return (
    /Micro PDF/i.test(name) || /Macro PDF/i.test(name) || /9_ Notes/i.test(name)
  );
}

function buildGroupFromDir(dirAbs: string, relPosix: string): NoteGroup | null {
  if (!fs.existsSync(dirAbs)) return null;

  const files: NoteFile[] = [];
  const groups: NoteGroup[] = [];

  for (const ent of readDirSorted(dirAbs)) {
    if (isExcluded(ent.name)) continue;

    const full = path.join(dirAbs, ent.name);
    const rel = relPosix ? `${relPosix}/${ent.name}` : ent.name;

    if (ent.isDirectory()) {
      const child = buildGroupFromDir(full, rel);
      if (child && (child.files.length > 0 || child.groups.length > 0)) {
        groups.push(child);
      }
    } else if (ent.isFile() && /\.pdf$/i.test(ent.name)) {
      files.push({
        id: stableId(rel),
        title: titleFromPdf(ent.name),
        file: toPublicSrc(full),
      });
    }
  }

  if (files.length === 0 && groups.length === 0) return null;

  return {
    id: stableId(relPosix || path.basename(dirAbs)),
    title: cleanLabel(path.basename(dirAbs)),
    files,
    groups,
  };
}

/* ------------------------------------------------------------------ *
 * Yearly papers
 *
 * Each year holds one folder per paper variant, e.g.
 *   "2. 2616561 - June 2024 V11 _Solved_"
 * The PDFs inside are often named without that context ("june 2024 V11.pdf"),
 * so the folder — not the filename — is the source of truth for the label.
 * ------------------------------------------------------------------ */

function collectPdfs(dirAbs: string, relPosix: string): { abs: string; rel: string }[] {
  const out: { abs: string; rel: string }[] = [];
  for (const ent of readDirSorted(dirAbs)) {
    if (isExcluded(ent.name)) continue;
    const full = path.join(dirAbs, ent.name);
    const rel = `${relPosix}/${ent.name}`;
    if (ent.isDirectory()) out.push(...collectPdfs(full, rel));
    else if (ent.isFile() && /\.pdf$/i.test(ent.name)) out.push({ abs: full, rel });
  }
  return out;
}

function buildYearlyGroups(
  yearlyRootAbs: string,
  relRoot: string
): YearlyPaperGroup[] {
  if (!fs.existsSync(yearlyRootAbs)) return [];

  const years: YearlyPaperGroup[] = [];

  for (const yearDir of readDirSorted(yearlyRootAbs)) {
    if (!yearDir.isDirectory() || isExcluded(yearDir.name)) continue;

    const yearAbs = path.join(yearlyRootAbs, yearDir.name);
    const yearRel = `${relRoot}/${yearDir.name}`;
    const papers: NoteFile[] = [];

    for (const ent of readDirSorted(yearAbs)) {
      if (isExcluded(ent.name)) continue;

      const full = path.join(yearAbs, ent.name);
      const rel = `${yearRel}/${ent.name}`;

      if (ent.isDirectory()) {
        // One variant folder → one entry, labelled from the folder.
        const pdfs = collectPdfs(full, rel);
        if (pdfs.length === 0) continue;
        const label = cleanLabel(ent.name);
        pdfs.forEach((pdf, i) => {
          papers.push({
            id: stableId(pdf.rel),
            title: pdfs.length === 1 ? label : `${label} — ${i + 1}`,
            file: toPublicSrc(pdf.abs),
          });
        });
      } else if (ent.isFile() && /\.pdf$/i.test(ent.name)) {
        papers.push({
          id: stableId(rel),
          title: titleFromPdf(ent.name),
          file: toPublicSrc(full),
        });
      }
    }

    if (papers.length === 0) continue;

    years.push({
      id: stableId(yearRel),
      year: extractYear(yearDir.name),
      papers,
    });
  }

  // Newest year first.
  years.sort((a, b) => (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0));

  return years;
}

/* ------------------------------------------------------------------ *
 * Level scan
 * ------------------------------------------------------------------ */

function scanLevel(level: NoteLevel) {
  const studyNotes: NoteGroup[] = [];
  const yearlyPapers: YearlyPaperGroup[] = [];
  const levelAbs = path.join(NOTES_ROOT, LEVEL_FOLDERS[level]);

  if (!fs.existsSync(levelAbs)) return { studyNotes, yearlyPapers };

  for (const ent of readDirSorted(levelAbs)) {
    if (!ent.isDirectory() || isExcluded(ent.name)) continue;

    const full = path.join(levelAbs, ent.name);
    const rel = `${LEVEL_FOLDERS[level]}/${ent.name}`;

    if (isYearlyRootFolder(ent.name)) {
      yearlyPapers.push(...buildYearlyGroups(full, rel));
    } else if (isStudyRootFolder(ent.name)) {
      const group = buildGroupFromDir(full, rel);
      if (group) studyNotes.push(group);
    }
  }

  return { studyNotes, yearlyPapers };
}

/** Scans `public/notes/` for study notes and yearly past papers. */
export function getNotesLibraryData(): NotesLibraryData {
  const levels: NoteLevel[] = ["AS", "A2", "O"];
  const studyNotes = {} as Record<NoteLevel, NoteGroup[]>;
  const yearlyPapers = {} as Record<NoteLevel, YearlyPaperGroup[]>;

  for (const level of levels) {
    const scanned = scanLevel(level);
    studyNotes[level] = scanned.studyNotes;
    yearlyPapers[level] = scanned.yearlyPapers;
  }

  return { studyNotes, yearlyPapers };
}

function firstPdfInTree(group: NoteGroup): NoteFile | undefined {
  if (group.files.length > 0) return group.files[0];
  for (const child of group.groups) {
    const found = firstPdfInTree(child);
    if (found) return found;
  }
  return undefined;
}

function findNineNotesPack(groups: NoteGroup[]): NoteGroup | undefined {
  return groups.find((g) => /notes/i.test(g.title));
}

/** One featured note per level for the home page (from consolidated Notes packs). */
export function getSampleNotesForHome(): NoteResource[] {
  const { studyNotes } = getNotesLibraryData();
  const samples: NoteResource[] = [];

  for (const level of ["AS", "A2", "O"] as NoteLevel[]) {
    const groups = studyNotes[level];
    const ninePack = findNineNotesPack(groups);
    const first =
      (ninePack && firstPdfInTree(ninePack)) ??
      groups.map((g) => firstPdfInTree(g)).find(Boolean);

    if (first) {
      samples.push({ ...first, level });
    }
  }

  return samples;
}
