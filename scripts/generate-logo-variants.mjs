/**
 * Builds the logo files the site actually references from the source artwork.
 *
 *   public/images/fmp(no bg).png   (source, 500×500 with transparent padding)
 *     → public/images/fmp-logo.png        trimmed, full colour (light backgrounds)
 *     → public/images/fmp-logo-light.png  navy recoloured to white (dark backgrounds)
 *     → public/images/fmp-mark.png        monogram only, no wordmark (favicons)
 *
 * The wordmark is ~2.2:1, which is illegible squashed into a 32px favicon, so
 * the monogram above the strapline is cropped out on its own. The two halves
 * are separated by a blank band, which is detected rather than hard-coded.
 *
 * The light variant exists because the wordmark is navy + gold on transparent:
 * on the navy footer the navy strokes would disappear, and a CSS `invert()`
 * filter would wreck the gold. Recolouring only the navy pixels keeps the gold.
 *
 * Run: node scripts/generate-logo-variants.mjs
 */
import sharp from "sharp";
import path from "path";
import fs from "fs";

const IMAGES = path.join(process.cwd(), "public", "images");
const SOURCE = path.join(IMAGES, "fmp(no bg).png");

if (!fs.existsSync(SOURCE)) {
  console.error(`missing source artwork: ${SOURCE}`);
  process.exit(1);
}

/** Navy strokes sit around #283060; gold around #F8A830. */
function isNavy(r, g, b) {
  const max = Math.max(r, g, b);
  return max < 150 && b >= r && b >= g;
}

const trimmed = await sharp(SOURCE)
  .trim({ threshold: 10 })
  .png()
  .toBuffer();

const meta = await sharp(trimmed).metadata();
await fs.promises.writeFile(path.join(IMAGES, "fmp-logo.png"), trimmed);
console.log(`fmp-logo.png        ${meta.width}x${meta.height}`);

const { data, info } = await sharp(trimmed)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

let recoloured = 0;
for (let i = 0; i < data.length; i += info.channels) {
  if (data[i + 3] < 16) continue;
  if (isNavy(data[i], data[i + 1], data[i + 2])) {
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    recoloured++;
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: info.channels },
})
  .png()
  .toFile(path.join(IMAGES, "fmp-logo-light.png"));
console.log(
  `fmp-logo-light.png  ${info.width}x${info.height}  (${recoloured} navy px → white)`
);

/* --- monogram only, for favicons ------------------------------------ */

const src = await sharp(trimmed)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

/** First fully-transparent horizontal band — the gap above the strapline. */
function firstBlankBand({ data, info }, minRows = 2) {
  let runStart = null;
  for (let y = 0; y < info.height; y++) {
    let filled = false;
    for (let x = 0; x < info.width && !filled; x++) {
      if (data[(y * info.width + x) * info.channels + 3] > 40) filled = true;
    }
    if (!filled) {
      if (runStart === null) runStart = y;
    } else if (runStart !== null) {
      if (y - runStart >= minRows) return runStart;
      runStart = null;
    }
  }
  return null;
}

const splitY = firstBlankBand(src);
if (splitY === null) {
  console.error("could not find the gap between mark and wordmark — skipping marks");
} else {
  const light = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png()
    .toBuffer();

  // The favicon sits on navy, where the navy strokes of the full-colour mark
  // would vanish — so ship a light mark for it alongside the standard one.
  for (const [name, source] of [
    ["fmp-mark.png", trimmed],
    ["fmp-mark-light.png", light],
  ]) {
    const mark = await sharp(source)
      .extract({ left: 0, top: 0, width: meta.width, height: splitY })
      .trim({ threshold: 10 })
      .png()
      .toBuffer();
    const m = await sharp(mark).metadata();
    await fs.promises.writeFile(path.join(IMAGES, name), mark);
    console.log(`${name.padEnd(19)} ${m.width}x${m.height}  (split at y=${splitY})`);
  }

  /* --- square avatar -------------------------------------------------- */

  // Blog author blocks render a round avatar. Until there is a portrait of
  // Fahad, use the monogram on brand navy.
  const AVATAR = 256;
  const avatarMark = await sharp(
    await sharp(light)
      .extract({ left: 0, top: 0, width: meta.width, height: splitY })
      .trim({ threshold: 10 })
      .toBuffer()
  )
    .resize({ width: Math.round(AVATAR * 0.68), fit: "inside" })
    .toBuffer();

  await sharp({
    create: {
      width: AVATAR,
      height: AVATAR,
      channels: 4,
      background: { r: 27, g: 33, b: 69, alpha: 1 },
    },
  })
    .composite([{ input: avatarMark, gravity: "center" }])
    .flatten({ background: { r: 27, g: 33, b: 69 } })
    .png()
    .toFile(path.join(IMAGES, "fmp-avatar.png"));
  console.log(`fmp-avatar.png      ${AVATAR}x${AVATAR}`);

  /* --- social preview card ------------------------------------------ */

  // Placeholder until a photo of Fahad is available: the wordmark on brand
  // navy, at the 1200×630 Open Graph / Twitter card size.
  const OG_W = 1200;
  const OG_H = 630;
  const wordmark = await sharp(light)
    .resize({ width: Math.round(OG_W * 0.62), fit: "inside" })
    .toBuffer();

  await sharp({
    create: {
      width: OG_W,
      height: OG_H,
      channels: 4,
      background: { r: 27, g: 33, b: 69, alpha: 1 },
    },
  })
    .composite([{ input: wordmark, gravity: "center" }])
    .flatten({ background: { r: 27, g: 33, b: 69 } })
    .png()
    .toFile(path.join(IMAGES, "fmp-og.png"));
  console.log(`fmp-og.png          ${OG_W}x${OG_H}`);
}
