/**
 * Generates `public/llms.txt` — the answer-engine index (llmstxt.org).
 *
 *   npx tsx scripts/generate-llms.ts
 *
 * Hand-maintained llms.txt files rot: the previous one still advertised a
 * deleted page, a session that had moved on, and a role that belonged to a
 * different tutor. This reads the same sources the site renders from — SITE,
 * courses, the generated blog posts and the generated lecture library — so it
 * cannot describe anything the site does not actually have.
 *
 * Runs after `generate:blog` and `generate:lectures` in the prebuild chain,
 * because it consumes both of their outputs.
 */
import { writeFileSync } from "fs";
import path from "path";
import { SITE } from "../lib/constants";
import { courses } from "../data/courses";
import { posts } from "../data/posts";
import {
  recordedLectureGroups,
  lectureCount,
  totalRecordedLectures,
} from "../data/recordedLectures";
import { blogSeoTitle } from "../lib/seo";

const u = (p = "") => `${SITE.url}${p}`;

/** Collapse to a single line — llms.txt entries must not wrap. */
const line = (s: string) => s.replace(/\s+/g, " ").trim();

const out: string[] = [];

/* ---------- header ------------------------------------------------- */
out.push(`# ${SITE.domain}`);
out.push("");
out.push(
  `> ${line(SITE.description)}`
);
out.push("");

/* ---------- facts an answer engine will want to quote --------------- */
out.push("Key facts:");
out.push(`- Tutor: ${SITE.personName} (also known as "Sir Fahad").`);
out.push(
  "- Subjects: A Level Economics — AS and A2 (CAIE 9708 & Edexcel); O Level and IGCSE Economics (CAIE 2281 / 0455)."
);
out.push(
  `- Location: ${SITE.address}. In-person teaching plus live online classes across Pakistan and internationally.`
);
out.push(
  "- Teaching blocks: morning school and college sessions, evening academy sessions, and live online classes."
);
out.push(
  `- Free resources: ${totalRecordedLectures} full recorded lectures on YouTube, a previewable notes library, and ${posts.length} study guides on the blog.`
);
out.push(
  "- Enrolment: May/June 2027 session. Registration is handled over WhatsApp."
);
out.push(`- Website: ${u()}`);
out.push("");

/* ---------- home ---------------------------------------------------- */
out.push("## Home");
out.push("");
out.push(`[${line(SITE.name)} — Economics Tutor in Karachi](${u()}): ${line(SITE.description)}`);
out.push("");

/* ---------- courses -------------------------------------------------- */
out.push("## Courses");
out.push("");
for (const level of ["O", "AS", "A2"] as const) {
  const c = courses[level];
  const group = recordedLectureGroups.find((g) => g.level === level);
  const free = group ? ` ${lectureCount(group)} lectures free to watch.` : "";
  const label = group?.label ?? c.badgeLabel;
  out.push(
    `[${label} Economics (${c.syllabus}) | ${SITE.personName}](${u(
      `/courses/${c.slug}`
    )}): ${line(c.subhead)}${free}`
  );
}
out.push("");

/* ---------- the lecture library, level by level ---------------------- */
out.push("## Free recorded lectures");
out.push("");
out.push(
  line(
    `${totalRecordedLectures} full-length Economics lectures, free to watch, grouped by level and then by topic series. Explained in Urdu, Hindi and English.`
  )
);
out.push("");
for (const g of recordedLectureGroups) {
  const strands = g.strands
    .map((s) => `${s.title} (${s.lectures.length})`)
    .join(", ");
  out.push(`- ${g.label} — ${g.syllabus}: ${lectureCount(g)} lectures. ${strands}.`);
}
out.push("");

/* ---------- resources ------------------------------------------------ */
out.push("## Learning resources");
out.push("");
out.push(
  `[Economics notes library](${u(
    "/notes"
  )}): Full-syllabus notes and yearly past papers for O Level, AS Level and A2 Level, previewable in the browser.`
);
out.push(
  `[Extra Credit gallery](${u(
    "/extra-credit"
  )}): Classroom clips, student recommendations and photos from live Economics sessions.`
);
out.push(
  `[Blog](${u(
    "/blog"
  )}): Study guides, exam technique and concept explainers for CAIE and Edexcel Economics.`
);
out.push("");

/* ---------- every blog post, from the generated data ----------------- */
out.push("## Blog");
out.push("");
out.push(`[Index of /blog](${u("/blog")}):`);
for (const p of posts) {
  out.push(
    `[${blogSeoTitle(p.slug, p.title)} | ${SITE.personName}](${u(
      `/blog/${p.slug}`
    )}): ${line(p.excerpt)}`
  );
}
out.push("");

/* ---------- about / enrol / contact ---------------------------------- */
out.push("## About");
out.push("");
out.push(
  `[About ${SITE.personName} | Economics Tutor Karachi](${u(
    "/about"
  )}): Background, teaching philosophy and the institutions Sir Fahad teaches at across Karachi.`
);
out.push("");

out.push("## Register");
out.push("");
out.push(
  `[Enrol for May/June 2027 | ${SITE.personName}](${u(
    "/register"
  )}): Register for O Level, AS Level or A2 Level Economics tuition. Submit the form or message on WhatsApp to confirm a place.`
);
out.push("");

out.push("## Contact");
out.push("");
out.push(
  `[Contact ${SITE.personName} | Economics Tutor Karachi](${u(
    "/contact"
  )}): Enquiries, office hours and location. Fastest reply is over WhatsApp.`
);
out.push("");

const dest = path.join(process.cwd(), "public", "llms.txt");
writeFileSync(dest, out.join("\n"), "utf-8");
console.log(
  `llms.txt: ${posts.length} posts, ${totalRecordedLectures} lectures, ${
    Object.keys(courses).length
  } courses`
);
