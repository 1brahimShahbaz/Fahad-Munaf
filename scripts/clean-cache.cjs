/**
 * Removes Next.js and webpack caches that can drift out of sync on Windows
 * (interrupted dev, antivirus locks, multiple dev servers, HMR after crashes).
 * Run: npm run clean
 */
const fs = require("fs");
const path = require("path");

const dirs = [".next", path.join("node_modules", ".cache")];

for (const d of dirs) {
  if (fs.existsSync(d)) {
    fs.rmSync(d, { recursive: true, force: true });
    process.stdout.write(`Removed ${d}\n`);
  }
}
