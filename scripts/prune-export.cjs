/**
 * Next.js static export creates folders (e.g. about/) alongside about.html.
 * On Apache, /about hits the folder → 403 Forbidden. Remove those folders only
 * when they hold no public .html (blog/ keeps post pages).
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(process.cwd(), "out");

/** Same-named `.html` routes that also ship a `public/<name>/` asset folder (must not be pruned). */
const KEEP_ASSET_DIRS = new Set(["notes"]);

/**
 * Asset folders that live in `public/` but are no longer referenced by any
 * page — kept on disk for archival, stripped from the deployed export.
 * Lectures now stream from YouTube (see `data/recordedLectures.ts`), so the
 * ~1 GB of self-hosted `.mp4` files must not be uploaded.
 */
const EXCLUDE_FROM_EXPORT = ["videos/recorded"];

function dirSize(dirPath) {
  let total = 0;
  for (const ent of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const full = path.join(dirPath, ent.name);
    total += ent.isDirectory() ? dirSize(full) : fs.statSync(full).size;
  }
  return total;
}

/**
 * Notes content that `lib/notesLibrary.ts` never publishes: "Test Yourself"
 * worksheets (Orb-Ed only) and blank "Unsolved" question papers. Keeping them
 * out of the export means they can't be reached by guessing a URL either.
 */
const EXCLUDED_NOTE_PATTERNS = [/test\s*_?\s*yourself/i, /unsolved/i];

function pruneNotes(dirPath) {
  if (!fs.existsSync(dirPath)) return { files: 0, bytes: 0 };
  let files = 0;
  let bytes = 0;

  for (const ent of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const full = path.join(dirPath, ent.name);
    const excluded = EXCLUDED_NOTE_PATTERNS.some((re) => re.test(ent.name));

    if (excluded) {
      const size = ent.isDirectory() ? dirSize(full) : fs.statSync(full).size;
      const count = ent.isDirectory() ? countFiles(full) : 1;
      fs.rmSync(full, { recursive: true, force: true });
      files += count;
      bytes += size;
      continue;
    }

    if (ent.isDirectory()) {
      const sub = pruneNotes(full);
      files += sub.files;
      bytes += sub.bytes;
    }
  }

  return { files, bytes };
}

function countFiles(dirPath) {
  let n = 0;
  for (const ent of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const full = path.join(dirPath, ent.name);
    n += ent.isDirectory() ? countFiles(full) : 1;
  }
  return n;
}

function dropExcluded() {
  for (const rel of EXCLUDE_FROM_EXPORT) {
    const target = path.join(OUT, ...rel.split("/"));
    if (!fs.existsSync(target)) continue;
    const mb = (dirSize(target) / 1048576).toFixed(0);
    fs.rmSync(target, { recursive: true, force: true });
    console.log(`excluded from export: ${rel} (${mb} MB)`);
  }
}

function hasPublicHtml(dirPath) {
  if (!fs.existsSync(dirPath)) return false;
  for (const name of fs.readdirSync(dirPath)) {
    if (name.endsWith(".html") && !name.startsWith("_")) return true;
  }
  return false;
}

function pruneDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const sub = path.join(dirPath, ent.name);
    pruneDir(sub);

    const indexHtml = path.join(sub, "index.html");
    const siblingHtml = path.join(dirPath, `${ent.name}.html`);

    if (KEEP_ASSET_DIRS.has(ent.name)) continue;
    if (fs.existsSync(indexHtml)) continue;
    if (!fs.existsSync(siblingHtml)) continue;
    if (hasPublicHtml(sub)) continue;

    fs.rmSync(sub, { recursive: true, force: true });
    console.log("pruned:", path.relative(OUT, sub));
  }
}

if (!fs.existsSync(OUT)) {
  console.error("out/ not found — run npm run build first");
  process.exit(1);
}

dropExcluded();

const notesPruned = pruneNotes(path.join(OUT, "notes"));
if (notesPruned.files > 0) {
  console.log(
    `excluded from export: ${notesPruned.files} unpublished note PDFs ` +
      `(${(notesPruned.bytes / 1048576).toFixed(0)} MB)`
  );
}

pruneDir(OUT);
console.log("Export prune complete.");
