/**
 * Inlines the logo as a data URI so `proposal.html` is a single portable file
 * that can be emailed or opened anywhere without the image breaking.
 *
 * Run: node docs/build-proposal.mjs
 */
import fs from "fs";
import path from "path";

const root = process.cwd();
const tpl = fs.readFileSync(path.join(root, "docs", "proposal.template.html"), "utf8");
const logo = fs.readFileSync(path.join(root, "public", "images", "fmp-logo-light.png"));
const out = tpl.replace("__LOGO__", `data:image/png;base64,${logo.toString("base64")}`);

const dest = path.join(root, "docs", "proposal.html");
fs.writeFileSync(dest, out);
console.log(`wrote docs/proposal.html  (${(out.length / 1024).toFixed(0)} KB, logo inlined)`);
