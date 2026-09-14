/**
 * Generate favicons from public/images/fmp-mark-light.png (the monogram — the full
 * wordmark is too wide to stay legible at 32px) for Google Search & browsers.
 *
 * Run: node scripts/generate-favicons.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";
import toIco from "to-ico";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "public", "images", "fmp-mark-light.png");

/** Brand navy — see `navy.900` in tailwind.config.ts. */
const NAVY = { r: 27, g: 33, b: 69, alpha: 1 };

/** Breathing room around the mark, as a fraction of the icon edge. */
const PADDING = 0.12;

if (!fs.existsSync(SRC)) {
  console.error("Missing source:", SRC);
  process.exit(1);
}

/**
 * The mark is transparent outside its strokes, and `fit: "contain"` only
 * paints the letterbox bars — so the icon needs an explicit `flatten` to put
 * navy behind the glyph itself rather than leaving it see-through.
 */
async function png(size) {
  const inner = Math.round(size * (1 - PADDING * 2));
  const resized = await sharp(SRC)
    .resize(inner, inner, {
      fit: "contain",
      background: { ...NAVY, alpha: 0 },
    })
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: NAVY,
    },
  })
    .composite([{ input: resized, gravity: "center" }])
    .flatten({ background: NAVY })
    .png()
    .toBuffer();
}

const outputs = [
  { file: path.join(ROOT, "public", "favicon.png"), size: 48 },
  { file: path.join(ROOT, "public", "icon.png"), size: 192 },
  { file: path.join(ROOT, "public", "apple-touch-icon.png"), size: 180 },
  { file: path.join(ROOT, "app", "icon.png"), size: 32 },
  { file: path.join(ROOT, "app", "apple-icon.png"), size: 180 },
];

for (const { file, size } of outputs) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, await png(size));
  console.log("wrote", path.relative(ROOT, file), `(${size}x${size})`);
}

const icoBuffers = await Promise.all([png(16), png(32), png(48)]);
const ico = await toIco(icoBuffers);

for (const icoPath of [
  path.join(ROOT, "public", "favicon.ico"),
  path.join(ROOT, "app", "favicon.ico"),
]) {
  fs.writeFileSync(icoPath, ico);
  console.log("wrote", path.relative(ROOT, icoPath));
}

console.log("Favicon generation complete.");
