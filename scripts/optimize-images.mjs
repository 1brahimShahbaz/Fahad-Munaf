/**
 * One-shot image optimizer for `public/images`.
 *
 * `output: 'export'` means next/image can't optimize at request time
 * (`images.unoptimized: true`), so whatever sits in public/ is exactly what the
 * browser downloads. This script re-encodes oversized sources in place and
 * keeps the originals in `.image-originals/` (outside public/, so they are
 * never deployed).
 *
 *   node scripts/optimize-images.mjs          # report only
 *   node scripts/optimize-images.mjs --apply  # rewrite files
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const APPLY = process.argv.includes("--apply");
const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "public", "images");
const BACKUP_DIR = path.join(ROOT, ".image-originals");

/** Files smaller than this are already fine — leave them alone. */
const SIZE_THRESHOLD = 180 * 1024;
/** Nothing on the site is displayed wider than this. */
const MAX_WIDTH = 1920;

const EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (EXT.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

async function encode(file, input, meta) {
  const ext = path.extname(file).toLowerCase();
  // Decode from an in-memory buffer: on Windows, sharp keeps the source file
  // handle open, which blocks writing the result back to the same path.
  const pipeline = sharp(input, { failOn: "none" });

  if (meta.width > MAX_WIDTH) {
    pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  if (ext === ".png") {
    // Quantized palette PNG — keeps the extension (so no code changes) while
    // cutting flat-colour graphics and screenshots by an order of magnitude.
    return pipeline
      .png({ quality: 80, effort: 9, palette: true, compressionLevel: 9 })
      .toBuffer();
  }
  if (ext === ".webp") {
    return pipeline.webp({ quality: 80, effort: 5 }).toBuffer();
  }
  return pipeline
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toBuffer();
}

const files = walk(SRC_DIR);
let before = 0;
let after = 0;
let changed = 0;
const rows = [];

for (const file of files) {
  // Always re-encode from the pristine original when one exists, so repeat
  // runs are idempotent instead of compounding compression artefacts.
  const backupPath = path.join(BACKUP_DIR, path.relative(SRC_DIR, file));
  const sourcePath = fs.existsSync(backupPath) ? backupPath : file;

  const input = fs.readFileSync(sourcePath);
  const original = input.length;
  before += original;

  if (original < SIZE_THRESHOLD) {
    after += original;
    continue;
  }

  let meta;
  try {
    meta = await sharp(input).metadata();
  } catch {
    after += original;
    continue;
  }

  let buf;
  try {
    buf = await encode(file, input, meta);
  } catch (err) {
    console.warn(`  skipped (encode failed): ${path.relative(ROOT, file)}`, err.message);
    after += original;
    continue;
  }

  // Only keep the new version if it is a meaningful win.
  if (buf.length >= original * 0.9) {
    after += original;
    continue;
  }

  rows.push({
    file: path.relative(ROOT, file),
    from: original,
    to: buf.length,
    width: meta.width,
  });
  after += buf.length;
  changed++;

  if (APPLY) {
    fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    if (!fs.existsSync(backupPath)) fs.writeFileSync(backupPath, input);
    fs.writeFileSync(file, buf);
  }
}

const mb = (n) => (n / 1048576).toFixed(2);
rows.sort((a, b) => b.from - b.to - (a.from - a.to));
for (const r of rows) {
  console.log(
    `${mb(r.from).padStart(7)} MB → ${mb(r.to).padStart(7)} MB  (${r.width}px)  ${r.file}`
  );
}
console.log(
  `\n${changed} file(s) ${APPLY ? "rewritten" : "would change"} — ` +
    `public/images: ${mb(before)} MB → ${mb(after)} MB ` +
    `(saves ${mb(before - after)} MB)`
);
if (!APPLY) console.log("Re-run with --apply to write the changes.");
else console.log(`Originals preserved in ${path.relative(ROOT, BACKUP_DIR)}/`);
