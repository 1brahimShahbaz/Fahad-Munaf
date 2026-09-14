/**
 * Download topic-relevant blog hero images (Unsplash / Pexels — free to use).
 * Run: node scripts/download-blog-covers.mjs
 */
import fs from "fs";
import path from "path";
import https from "https";

const OUT = path.join(process.cwd(), "public", "images", "blog");

/** slug filename → hero image URL (1200×630) */
const COVERS = {
  "how-to-study-economics-a-level-complete-guide.jpg":
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=630&fit=crop&q=80",
  "economics-9708-paper-4-essay-writing-guide.jpg":
    "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "o-level-economics-complete-revision-guide.jpg":
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=630&fit=crop&q=80",
  "market-failure-economics-a-level-explained.jpg":
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80",
  "as-level-economics-vs-a2-level-economics-differences.jpg":
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop&q=80",
  "top-10-economics-mistakes-a-level-students-make.jpg":
    "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "keynesian-vs-monetarist-economics-a-level-explained.jpg":
    "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&h=630&fit=crop&q=80",
  "elasticity-economics-a-level-complete-guide.jpg":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80",
  "online-economics-tuition-pakistan-guide.jpg":
    "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "economics-notes-as-level-how-to-make-good-notes.jpg":
    "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "caie-vs-edexcel-economics-a-level-which-is-harder.jpg":
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "how-to-prepare-for-caie-economics-october-november-2026.jpg":
    "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "inflation-explained-economics-students-guide.jpg":
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80",
  "economics-in-karachi-students-guide.jpg":
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&h=630&fit=crop&q=80",
  "global-oil-market-economics-explained.jpg":
    "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&h=630&fit=crop&q=80",
  "iran-us-conflict-global-economy-impact.jpg":
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80",
  "o-level-economics-inflation-revision-guide.jpg":
    "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "a-level-economics-inflation-macroeconomics-guide.jpg":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80",
  "pakistan-inflation-crisis-economics-analysis.jpg":
    "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&h=630&fit=crop&q=80",
  "demand-pull-vs-cost-push-inflation-economics.jpg":
    "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "economics-tuition-karachi-online-guide.jpg":
    "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "best-economics-tutor-karachi-a-level-o-level.jpg":
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&h=630&fit=crop&q=80",
  "rising-oil-prices-inflation-pakistan.jpg":
    "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&h=630&fit=crop&q=80",
};

function download(url) {
  return new Promise((resolve, reject) => {
    const fetch = (u) => {
      https
        .get(u, { headers: { "User-Agent": "fahad-munaf-parekh-site/1.0" } }, (res) => {
          if (
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            fetch(res.headers.location);
            return;
          }
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode} for ${u}`));
            return;
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => resolve(Buffer.concat(chunks)));
        })
        .on("error", reject);
    };
    fetch(url);
  });
}

fs.mkdirSync(OUT, { recursive: true });

let ok = 0;
for (const [file, url] of Object.entries(COVERS)) {
  const dest = path.join(OUT, file);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
    console.log(`Skip ${file} (already exists)`);
    ok++;
    continue;
  }
  process.stdout.write(`Downloading ${file}... `);
  try {
    const buf = await download(url);
    if (buf.length < 5000) throw new Error("file too small");
    fs.writeFileSync(dest, buf);
    console.log(`OK (${Math.round(buf.length / 1024)} KB)`);
    ok++;
  } catch (e) {
    console.log(`FAILED — ${e.message}`);
    process.exitCode = 1;
  }
}

console.log(`\n${ok}/${Object.keys(COVERS).length} covers saved to public/images/blog/`);
