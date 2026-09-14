import fs from "fs";
import path from "path";
import type { StudentPhoto } from "./studentTypes";

export type { StudentPhoto } from "./studentTypes";

const IMAGES_ROOT = path.join(process.cwd(), "public", "images");

const IMAGE_EXT = /\.(jpe?g|png|webp|heic)$/i;

/** Numbered student photos at `public/images/` root (e.g. `1.jpg` … `27.jpg`). */
const NUMBERED_PHOTO_MAX = 27;
const NUMBERED_EXT = ["jpg", "jpeg", "png", "webp", "heic"] as const;

/**
 * Logos, marks, avatars, OG cards and hero banners — everything in
 * `public/images/` that is brand furniture rather than a photo of a class.
 * `aff\d` is the affiliation logos (`AFF1.jpg` …, see data/affiliations.ts),
 * which must never appear in the student gallery; `fmp` covers the whole
 * generated set (`fmp-logo`, `fmp-mark`, `fmp-avatar`, `fmp-og`,
 * `fmp(no bg)`) plus the `FMP.jpg` social tile.
 */
const SKIP_PATTERN =
  /^(aff\d|orbed|fmp|thumbnail|avatar|teacher-|banner\d)/i;

/** Blog hero images (stock covers) live under `public/images/blog/` — for posts only. */
function shouldSkipPath(relPath: string): boolean {
  const normalized = relPath.replace(/\\/g, "/");
  if (normalized.startsWith("blog/")) return true;
  const base = path.basename(normalized);
  return SKIP_PATTERN.test(base);
}

function toPublicSrc(...segments: string[]): string {
  const posix = segments.join("/");
  return (
    "/" +
    posix
      .split("/")
      .map((s) => encodeURIComponent(s))
      .join("/")
  );
}

function stableId(rel: string) {
  return rel
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 160);
}

function isImageFile(name: string) {
  return IMAGE_EXT.test(name) && !name.endsWith(".download");
}

function sortPhotos(a: string, b: string): number {
  const baseA = path.basename(a);
  const baseB = path.basename(b);

  const tier = (name: string) => {
    if (/^banner\d+/i.test(name)) return 0;
    if (/^\d+\.(jpe?g|png|webp|heic)$/i.test(name)) return 1;
    if (/^(mentoring|behindsllybus)/i.test(name)) return 2;
    return 3;
  };

  const ta = tier(baseA);
  const tb = tier(baseB);
  if (ta !== tb) return ta - tb;

  const numA = parseInt(baseA.match(/^(\d+)/)?.[1] ?? "9999", 10);
  const numB = parseInt(baseB.match(/^(\d+)/)?.[1] ?? "9999", 10);
  if (ta === 1 && numA !== numB) return numA - numB;

  if (/^banner/i.test(baseA) && /^banner/i.test(baseB)) {
    const bA = parseInt(baseA.match(/banner(\d+)/i)?.[1] ?? "0", 10);
    const bB = parseInt(baseB.match(/banner(\d+)/i)?.[1] ?? "0", 10);
    return bA - bB;
  }

  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

/** Load `1.jpg` … `26.jpg` (or .jpeg etc.) from the images root when present. */
function collectNumberedRootPhotos(out: string[]): void {
  for (let n = 1; n <= NUMBERED_PHOTO_MAX; n++) {
    for (const ext of NUMBERED_EXT) {
      const name = `${n}.${ext}`;
      const relPath = name;
      if (shouldSkipPath(relPath)) continue;
      const fullPath = path.join(IMAGES_ROOT, name);
      if (fs.existsSync(fullPath)) {
        out.push(relPath);
        break;
      }
    }
  }
}

/** Recursively collect image paths relative to `public/images/`. */
function collectImagePaths(
  dirAbs: string,
  relDir: string,
  out: string[]
): void {
  if (!fs.existsSync(dirAbs)) return;

  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dirAbs, { withFileTypes: true });
  } catch {
    return;
  }

  for (const ent of entries) {
    if (ent.name.startsWith(".") || ent.name === "insession.html") continue;

    const relPath = relDir ? `${relDir}/${ent.name}` : ent.name;
    const fullPath = path.join(dirAbs, ent.name);

    if (ent.isDirectory()) {
      collectImagePaths(fullPath, relPath, out);
      continue;
    }

    if (!isImageFile(ent.name) || shouldSkipPath(relPath)) continue;
    out.push(relPath.replace(/\\/g, "/"));
  }
}

function isBannerSrc(src: string): boolean {
  return /banner\d/i.test(src);
}

/** Subset for home page preview (student shots, not hero banners). */
export function getStudentGalleryPreview(limit = 8): StudentPhoto[] {
  const photos = getStudentGalleryPhotos().filter((p) => !isBannerSrc(p.src));
  return photos.slice(0, limit);
}

/** Collects student and classroom photos from `public/images/`. */
export function getStudentGalleryPhotos(): StudentPhoto[] {
  const relPaths: string[] = [];
  collectNumberedRootPhotos(relPaths);
  collectImagePaths(IMAGES_ROOT, "", relPaths);

  const unique = [...new Set(relPaths)].sort(sortPhotos);

  return unique.map((rel) => ({
    id: stableId(rel),
    src: toPublicSrc("images", ...rel.split("/")),
    alt: "Economics students with Sir Fahad Munaf Parekh",
  }));
}
