/**
 * Builds the hero-slider banners from the classroom photos in public/images/.
 *
 * `next.config.mjs` sets `images.unoptimized: true` (required by `output:
 * 'export'`), so Next ships these bytes untouched — the hero is the LCP
 * element, which makes a hand-made WebP worth the build step.
 *
 * Source photos stay in place: they are also picked up by the student gallery
 * (see lib/studentGallery.ts), which skips anything matching `banner\d`.
 *
 * Run: node scripts/generate-banners.mjs
 */
import sharp from "sharp";
import path from "path";
import fs from "fs";

const IMAGES = path.join(process.cwd(), "public", "images");

/** Widest the hero is ever displayed; beyond this we would ship dead pixels. */
const TARGET_WIDTH = 1600;
const QUALITY = 78;

/** slide order → source photo. See `slides` in components/home/HeroSlider.tsx. */
const BANNERS = [
  { out: "banner1.webp", src: "8.jpeg" }, // mid-lecture, packed hall
  { out: "banner2.webp", src: "6.jpeg" }, // full-class group photo
  { out: "banner3.webp", src: "4.jpeg" }, // lecture theatre, projector + laptop
];

let missing = 0;
for (const { out, src } of BANNERS) {
  const from = path.join(IMAGES, src);
  if (!fs.existsSync(from)) {
    console.error(`missing source photo: ${src} — skipping ${out}`);
    missing++;
    continue;
  }

  const info = await sharp(from)
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(path.join(IMAGES, out));

  const kb = (info.size / 1024).toFixed(0);
  console.log(`${out.padEnd(13)} ${info.width}x${info.height}  ${kb} KB  ← ${src}`);
}

if (missing) process.exitCode = 1;
