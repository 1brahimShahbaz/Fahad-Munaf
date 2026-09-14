/**
 * Generates `data/recordedLectures.ts` from the YouTube Data API.
 *
 *   node --env-file=.env.local scripts/generate-lectures.mjs
 *
 * Source of truth is the channel's three "Complete Lectures" playlists (one
 * per level). Everything else the parser derives from the video titles, which
 * follow a strict house format:
 *
 *   AS Economics 9708 | Inflation ( Effects of Inflation ) - Lecture 3
 *   <level prefix>    | <topic>   ( <detail> )            - Lecture <n>
 *
 * Resilience, in order of preference:
 *   - no API key            -> keep the committed file, exit 0
 *   - API error, file exists-> keep the committed file, exit 0 (warn loudly)
 *   - API error, no file    -> exit 1
 * A stale library is recoverable; a build that silently ships an empty one is not.
 *
 * Topics not present in PLAN are never dropped — they land in a "More
 * Lectures" strand and the script warns, so a new upload is visible on the
 * site immediately and can be filed properly afterwards.
 */
import fs from "fs";
import path from "path";

const KEY = process.env.YOUTUBE_API_KEY;
const HANDLE = "economicwithfahadmunafparekh";
const OUT = path.join(process.cwd(), "data", "recordedLectures.ts");

/* ------------------------------------------------------------------ *
 * Curated taxonomy — topic -> strand, in teaching order
 * ------------------------------------------------------------------ */

const PLAN = {
  O: {
    micro: [
      "Basic Economic Problem",
      "Economic System",
      "Demand",
      "Price Elasticity of Demand",
      "Supply",
      "Price Elasticity of Supply",
      "Market",
      "Market Failure",
      "Households",
      "Money & Banking",
      "Labour Market",
      "Cost, Revenue & Profits",
      "Business Growth",
      "Market Structures",
    ],
    macro: [
      "Inflation",
      "Retail & Consumer Price Index",
      "Unemployment",
      "Population",
      "International Trade",
      "Exchange Rate",
      "Balance of Payment",
    ],
    skills: ["Syllabus & Paper Pattern"],
  },
  AS: {
    micro: [
      "Basic Economic Problem",
      "Demand",
      "Price Elasticity of Demand",
      "Income Elasticity of Demand (YED)",
      "Cross Elasticity of Demand (XED)",
      "Supply",
      "Price Elasticity of Supply (PES)",
      "Market",
      "Consumer Surplus",
      "Producer Surplus",
      "Market Failure",
      "Income/Wealth Inequality & Gini Coefficient",
    ],
    macro: [
      "Circular Flow of Income & Wealth",
      "National Income",
      "Inflation",
      "Unemployment",
      "Economic Growth",
      "International Trade",
      "Terms of Trade",
      "Exchange Rate",
      "Balance of Payment",
    ],
  },
  A2: {
    micro: [
      "Theory of Demand (Utility)",
      "Indifference Curve & Budget Line",
      "Theory of Supply",
      "Efficiency",
      "Perfect Market Structures",
      "Imperfect Market Structures",
      "Market Failure",
      "Labour Market",
    ],
    macro: [
      "Circular Flow of Income & Wealth",
      "National Income",
      "Balance of Payment",
      "Developed & Developing Economy",
    ],
  },
};

/** Parsed topic -> canonical topic (folds the "Topical …" title variants in). */
const MERGE = {
  O: {
    "Price Elasticity of Demand Topical Past Paper Practice": "Price Elasticity of Demand",
    "Basic Economic Problem Topical Past Paper Question": "Basic Economic Problem",
    "Market 6 Marker Question": "Market",
    "Supply Topical Past Paper Questions": "Supply",
    "Demand Topical Past Paper Questions": "Demand",
    "Master Inflation in One Video": "Inflation",
    "Updated Syllabus & Paper Pattern - May June 2027": "Syllabus & Paper Pattern",
  },
  AS: {
    "Cross Elasticity of Demand (XED) Topical 8 Marker Question": "Cross Elasticity of Demand (XED)",
    "Cross Elasticity of Demand": "Cross Elasticity of Demand (XED)",
    "Income Elasticity of Demand (YED) Topical 8 Marker Question": "Income Elasticity of Demand (YED)",
    "Income Elasticity of Demand (YED) Topical 12 Marker Question": "Income Elasticity of Demand (YED)",
    "Income Elasticity of Demand": "Income Elasticity of Demand (YED)",
    "Demand Topical Past Paper Practice 8 Marker Question": "Demand",
    "Basic Economic Problem Topical 8 Marker": "Basic Economic Problem",
    "Price Elasticity of Supply": "Price Elasticity of Supply (PES)",
  },
  A2: {
    "Imperfect Market Structures Intro": "Imperfect Market Structures",
    "Imperfect Market Structure": "Imperfect Market Structures",
    "Uses and Problems of National Income": "National Income",
    "Theory of Demand": "Theory of Demand (Utility)",
  },
};

/** Lecture numbers for videos whose titles carry none. */
const FORCE_NO = {
  "Master Inflation in One Video": 12,
  "Updated Syllabus & Paper Pattern - May June 2027": 2,
  "Syllabus & Paper Pattern": 1,
  Population: 1,
  "Economic System": 1,
  "Retail & Consumer Price Index": 1,
  "Market Structures": 1,
  "Business Growth": 1,
  Households: 1,
  "Money & Banking": 1,
  "National Income": 1,
};

const GINI_ORDER = {
  "Updated Syllabus/Paper Pattern": 1,
  "How to solve 8 & 12 marks question": 2,
};

const STRAND_TITLE = {
  micro: "Microeconomics",
  macro: "Macroeconomics",
  skills: "Syllabus & Exam Skills",
  more: "More Lectures",
};

const BLURB = {
  O: {
    micro: "Demand, supply, elasticity, market failure and the firm — built up from first principles.",
    macro: "Inflation, unemployment, trade and exchange rates, with the policy chains examiners reward.",
    skills: "Orientation classes covering the 2281 / 0455 syllabus and the paper pattern.",
    more: "Recently added lectures, not yet filed into a topic series.",
  },
  AS: {
    micro: "The price system in full: elasticities, price controls, tax incidence and market failure.",
    macro: "Circular flow, national income, inflation and the balance of payments at AS depth.",
    more: "Recently added lectures, not yet filed into a topic series.",
  },
  A2: {
    micro: "Utility and indifference curves, cost theory, market structures and the labour market.",
    macro: "Circular flow, national income accounting and development economics.",
    more: "Recently added lectures, not yet filed into a topic series.",
  },
};

const LEVEL_META = {
  O: {
    label: "O Level",
    syllabus: "CAIE 2281 / 0455",
    blurb: "Foundation lectures — the concepts every O Level paper keeps coming back to.",
    match: /O Level.*Complete Lectures/i,
  },
  AS: {
    label: "AS Level",
    syllabus: "CAIE 9708",
    blurb: "AS foundations — diagrams, elasticities and the macro toolkit, explained step by step.",
    match: /^AS Economics 9708 Complete Lectures/i,
  },
  A2: {
    label: "A2 Level",
    syllabus: "CAIE 9708",
    blurb: "A2 stretch topics — theory-heavy micro and the evaluation-friendly macro chains.",
    match: /^A2 Economics 9708 Complete Lectures/i,
  },
};

/* ------------------------------------------------------------------ *
 * Title parsing
 * ------------------------------------------------------------------ */

const STRIP_PREFIX = [
  /^IGCSE\s*\/\s*O Level Economics 2281\/0455\s*/i,
  /^O Level\s*\/\s*IGCSE Economics 2281\s*\/\s*0455\s*\|\s*/i,
  /^AS Economics 9708\s*\|\s*/i,
  /^A2 Economics 9708\s*\|\s*/i,
];
const STRIP_SUFFIX = [
  /\s*\|\s*(A2|AS)\s*Economics?\s*\|?\s*9708.*$/i,
  /\s*\|\s*AS Econ 9708.*$/i,
  /\s*\|\s*IGSCE\s*&\s*O Level Economics.*$/i,
  /\s*\|\s*O Level\s*&\s*IGCSE Economics.*$/i,
  /\s*\|\s*IGCSE,?\s*O\s*&\s*AS Level Economics.*$/i,
  /\s*\(\s*Exclusive Online Lectures?\s*\)\s*/gi,
  /\s*\|\s*Urdu\s*[,/]?\s*Hindi.*$/i,
  /\s*\|\s*Urdu\s*Language.*$/i,
  /\s*\|\s*Urdu\s*\/\s*Hindi.*$/i,
  /\s*\|\s*Urdu,\s*Hindi\s*&\s*English Language.*$/i,
  /\s*Urdu\s*\/?\s*Hindi Language\s*\|?\s*$/i,
];

function parseTitle(rawTitle) {
  let s = rawTitle;
  for (const re of STRIP_PREFIX) s = s.replace(re, "");
  for (const re of STRIP_SUFFIX) s = s.replace(re, "");
  s = s.replace(/\s*\|\s*$/, "").replace(/\s{2,}/g, " ").trim();

  let num = null;
  let sub = null;
  const m = s.match(
    /\s*[-–—]?\s*\b(?:Lecture|Class|Part)\s*(\d+)\s*(?:Part\s*(\d+))?\s*$/i
  );
  if (m) {
    num = Number(m[1]);
    sub = m[2] ? Number(m[2]) : null;
    s = s.slice(0, m.index).trim();
  }
  s = s.replace(/\s*[-–—|]\s*$/, "").trim();

  let topic = s;
  let detail = null;
  const p = s.match(/^(.*?)\s*\(\s*(.+?)\s*\)\s*$/);
  if (p) {
    topic = p[1].trim();
    detail = p[2].trim();
  }
  return { topic, detail, num, sub };
}

/* ------------------------------------------------------------------ *
 * API
 * ------------------------------------------------------------------ */

let units = 0;

async function api(endpoint, params) {
  const qs = new URLSearchParams({ ...params, key: KEY });
  const r = await fetch(`https://www.googleapis.com/youtube/v3/${endpoint}?${qs}`);
  units++;
  if (!r.ok) throw new Error(`${endpoint} -> HTTP ${r.status}: ${(await r.text()).slice(0, 400)}`);
  return r.json();
}

async function paged(endpoint, params) {
  const items = [];
  let pageToken;
  do {
    const page = await api(endpoint, {
      ...params,
      maxResults: "50",
      ...(pageToken ? { pageToken } : {}),
    });
    items.push(...(page.items ?? []));
    pageToken = page.nextPageToken;
  } while (pageToken);
  return items;
}

/* ------------------------------------------------------------------ *
 * Emit
 * ------------------------------------------------------------------ */

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const HEADER = `// GENERATED FILE — do not edit by hand.
// Rebuild with: npm run generate:lectures   (see scripts/generate-lectures.mjs)
// Source: the three "Complete Lectures" playlists on the YouTube channel.
import type { CourseLevel } from "./courses";

export type RecordedLecture = {
  /** Stable slug used for React keys and analytics. */
  id: string;
  /** Card title — this lecture's specific focus within its topic series. */
  title: string;
  /** Topic series the lecture belongs to, e.g. "Inflation". Groups the cards. */
  topic: string;
  /** Position within the topic series, as numbered on YouTube. */
  lectureNo?: number;
  /** YouTube video id — lectures are hosted on YouTube, not on this site. */
  youtubeId: string;
  /** Publication date, \`YYYY-MM-DD\` — required for video rich results. */
  uploadDate?: string;
};

export type StrandId = "micro" | "macro" | "skills" | "more";

export type LectureStrand = {
  id: StrandId;
  title: string;
  blurb: string;
  /** Teaching order — grouped by topic series, then by lecture number. */
  lectures: RecordedLecture[];
};

export type LectureLevelGroup = {
  level: CourseLevel;
  /** Menu label, e.g. "O Level". */
  label: string;
  /** Syllabus code shown next to the label. */
  syllabus: string;
  blurb: string;
  strands: LectureStrand[];
};

/** \`https://www.youtube.com/watch?v=<id>\` → privacy-friendly embed URL. */
export function youtubeEmbedUrl(youtubeId: string): string {
  return \`https://www.youtube-nocookie.com/embed/\${youtubeId}\`;
}

/** Poster frame served straight from YouTube (no local storage needed). */
export function youtubeThumbnail(youtubeId: string): string {
  return \`https://i.ytimg.com/vi/\${youtubeId}/hqdefault.jpg\`;
}

export function youtubeWatchUrl(youtubeId: string): string {
  return \`https://www.youtube.com/watch?v=\${youtubeId}\`;
}

/** Topic series inside a strand, in order — used for the sub-headings. */
export function strandTopics(strand: LectureStrand): string[] {
  const seen: string[] = [];
  for (const l of strand.lectures) if (!seen.includes(l.topic)) seen.push(l.topic);
  return seen;
}
`;

function emit(byLevel) {
  const varName = { O: "oLevelGroup", AS: "asLevelGroup", A2: "a2LevelGroup" };
  let out = HEADER;
  const totals = {};

  for (const level of ["O", "AS", "A2"]) {
    const meta = LEVEL_META[level];
    const items = byLevel[level];
    out +=
      `\nconst ${varName[level]}: LectureLevelGroup = {\n` +
      `  level: "${level}",\n  label: "${meta.label}",\n  syllabus: "${meta.syllabus}",\n` +
      `  blurb:\n    "${esc(meta.blurb)}",\n  strands: [\n`;

    // planned strands first, then the catch-all
    const planned = Object.entries(PLAN[level]);
    const unplanned = items.filter((i) => i.strand === "more");
    const strands = [...planned, ...(unplanned.length ? [["more", []]] : [])];

    let count = 0;
    for (const [sid, topics] of strands) {
      const topicList =
        sid === "more"
          ? [...new Set(unplanned.map((i) => i.topic))]
          : topics;
      const strandItems = items.filter((i) => i.strand === sid);
      if (!strandItems.length) continue;

      out +=
        `    {\n      id: "${sid}",\n      title: "${STRAND_TITLE[sid]}",\n` +
        `      blurb:\n        "${esc(BLURB[level][sid])}",\n      lectures: [\n`;

      for (const topic of topicList) {
        const list = strandItems
          .filter((i) => i.topic === topic)
          .sort((a, b) => (a.num ?? 0) - (b.num ?? 0) || (a.sub ?? 0) - (b.sub ?? 0));
        if (!list.length) continue;
        out += `        // ${topic} — ${list.length} lecture${list.length > 1 ? "s" : ""}\n`;
        for (const it of list) {
          const n = it.sub ? `${it.num}.${it.sub}` : it.num;
          const title = it.detail ?? (it.num != null ? `Lecture ${n}` : topic);
          const id = `${level.toLowerCase()}-${sid}-${slug(topic)}-${String(n ?? 1).replace(".", "-")}`;
          out +=
            `        {\n          id: "${id}",\n          title: "${esc(title)}",\n` +
            `          topic: "${esc(topic)}",\n`;
          if (it.num != null) out += `          lectureNo: ${it.num},\n`;
          out += `          youtubeId: "${it.videoId}",\n`;
          if (it.uploadDate) out += `          uploadDate: "${it.uploadDate}",\n`;
          out += `        },\n`;
          count++;
        }
      }
      out += `      ],\n    },\n`;
    }
    out += `  ],\n};\n`;
    totals[level] = count;
  }

  out += `
/** Menu order on the site: O Level → AS Level → A2 Level. */
export const recordedLectureGroups: LectureLevelGroup[] = [
  oLevelGroup,
  asLevelGroup,
  a2LevelGroup,
];

export const recordedLecturesByLevel: Record<CourseLevel, LectureLevelGroup> = {
  O: oLevelGroup,
  AS: asLevelGroup,
  A2: a2LevelGroup,
};

export function lectureCount(group: LectureLevelGroup): number {
  return group.strands.reduce((n, s) => n + s.lectures.length, 0);
}

export const totalRecordedLectures = recordedLectureGroups.reduce(
  (n, g) => n + lectureCount(g),
  0
);
`;
  return { out, totals };
}

/* ------------------------------------------------------------------ *
 * Main
 * ------------------------------------------------------------------ */

function bail(msg) {
  if (fs.existsSync(OUT)) {
    console.warn(`\n! ${msg}`);
    console.warn(`! Keeping the committed ${path.relative(process.cwd(), OUT)}.\n`);
    process.exit(0);
  }
  console.error(`\n${msg}\nNo existing data file to fall back on.\n`);
  process.exit(1);
}

if (!KEY) {
  bail(
    "YOUTUBE_API_KEY is not set — skipping lecture regeneration.\n" +
      "  Set it in .env.local and run with `node --env-file=.env.local`."
  );
}

let playlists;
try {
  const ch = await api("channels", { part: "contentDetails", forHandle: HANDLE });
  if (!ch.items?.length) throw new Error(`no channel for @${HANDLE}`);
  playlists = await paged("playlists", {
    part: "snippet,contentDetails",
    channelId: ch.items[0].id,
  });
} catch (e) {
  bail(`YouTube API failed: ${e.message}`);
}

const byLevel = { O: [], AS: [], A2: [] };
let skippedPrivate = 0;
const unplannedSeen = [];

for (const level of ["O", "AS", "A2"]) {
  const pl = playlists.find((p) => LEVEL_META[level].match.test(p.snippet.title));
  if (!pl) bail(`No "Complete Lectures" playlist matched for ${level}.`);

  let items;
  try {
    items = await paged("playlistItems", {
      part: "snippet,contentDetails,status",
      playlistId: pl.id,
    });
  } catch (e) {
    bail(`Failed to read playlist "${pl.snippet.title}": ${e.message}`);
  }

  for (const it of items) {
    // Private/deleted entries keep their slot in a playlist but carry no title.
    if (it.status?.privacyStatus !== "public") {
      skippedPrivate++;
      continue;
    }
    const parsed = parseTitle(it.snippet.title);
    const topic = MERGE[level]?.[parsed.topic] ?? parsed.topic;

    let num = parsed.num ?? FORCE_NO[parsed.topic] ?? FORCE_NO[topic] ?? null;
    if (topic === "Income/Wealth Inequality & Gini Coefficient")
      num = GINI_ORDER[parsed.detail] ?? 99;

    let detail = parsed.detail;
    if (detail && /^(PES|XED|YED)$/i.test(detail)) detail = null;
    if (detail && topic.includes(`(${detail})`)) detail = null;
    if (detail === "Utility" && topic.startsWith("Theory of Demand")) detail = null;

    const strandEntry = Object.entries(PLAN[level]).find(([, t]) => t.includes(topic));
    const strand = strandEntry ? strandEntry[0] : "more";
    if (!strandEntry) unplannedSeen.push(`${level}  "${topic}"  (${it.snippet.title})`);

    byLevel[level].push({
      videoId: it.contentDetails.videoId,
      topic,
      detail,
      num,
      sub: parsed.sub,
      strand,
      uploadDate: it.contentDetails.videoPublishedAt?.slice(0, 10),
    });
  }
}

const { out, totals } = emit(byLevel);

const ids = [...out.matchAll(/^ {10}id: "(.+?)",$/gm)].map((m) => m[1]);
const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
if (dup.length) bail(`Duplicate lecture ids generated: ${[...new Set(dup)].join(", ")}`);

fs.writeFileSync(OUT, out);

const total = totals.O + totals.AS + totals.A2;
console.log(
  `lectures: O=${totals.O} AS=${totals.AS} A2=${totals.A2} total=${total}` +
    `  (${skippedPrivate} private skipped, ${units} quota units)`
);

if (unplannedSeen.length) {
  console.warn(
    `\n! ${unplannedSeen.length} lecture(s) have a topic that is not in PLAN.\n` +
      `! They are published under "More Lectures" so nothing is lost — add the\n` +
      `! topic to PLAN in scripts/generate-lectures.mjs to file them properly:\n` +
      unplannedSeen.map((u) => `!   ${u}`).join("\n") +
      "\n"
  );
}
