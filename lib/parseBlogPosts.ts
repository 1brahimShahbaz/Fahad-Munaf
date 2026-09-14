import fs from "fs";
import path from "path";
import type { BlogPost } from "@/lib/blogTypes";

const BLOG_MD = path.join(process.cwd(), "blog-posts.md");

/** Topic hero images in `public/images/blog/` (see `scripts/download-blog-covers.mjs`). */
function coverForSlug(slug: string): string {
  return `/images/blog/${slug}.jpg`;
}

type BodyBlock = BlogPost["body"][number];

function stripInlineMd(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[(.+?)\]\([^)]+\)/g, "$1")
    .trim();
}

function parseMeta(section: string, key: string): string | undefined {
  const re = new RegExp(`\\*\\*${key}:\\*\\*\\s*(?:\`([^\`]+)\`|(.+))`, "i");
  const m = section.match(re);
  return m ? (m[1] ?? m[2]).trim() : undefined;
}

function parseBody(raw: string): BodyBlock[] {
  const lines = raw.split("\n");
  const blocks: BodyBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed || trimmed === "---") {
      i++;
      continue;
    }

    if (trimmed.startsWith("*Written by")) break;

    if (trimmed.startsWith("#### ")) {
      blocks.push({ type: "h2", text: stripInlineMd(trimmed.slice(5)) });
      i++;
      continue;
    }

    if (/^\*\*[^*]+\*\*$/.test(trimmed) && trimmed.length < 120) {
      blocks.push({ type: "h2", text: stripInlineMd(trimmed) });
      i++;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(stripInlineMd(lines[i].trim().slice(2)));
        i++;
      }
      blocks.push({ type: "quote", text: quoteLines.join(" ") });
      continue;
    }

    if (trimmed.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const row = lines[i].trim();
        if (!/^\|[\s\-:|]+\|$/.test(row)) {
          tableLines.push(
            row
              .split("|")
              .slice(1, -1)
              .map((c) => stripInlineMd(c))
              .filter(Boolean)
              .join(" — ")
          );
        }
        i++;
      }
      if (tableLines.length) {
        blocks.push({
          type: "callout",
          text: tableLines.join(" · "),
        });
      }
      continue;
    }

    if (/^[-*] /.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i].trim())) {
        items.push(stripInlineMd(lines[i].trim().replace(/^[-*] /, "")));
        i++;
      }
      blocks.push({ type: "p", text: items.map((t) => `• ${t}`).join(" ") });
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(stripInlineMd(lines[i].trim().replace(/^\d+\.\s/, "")));
        i++;
      }
      blocks.push({
        type: "p",
        text: items.map((t, n) => `${n + 1}. ${t}`).join(" "),
      });
      continue;
    }

    const para: string[] = [stripInlineMd(trimmed)];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("|") &&
      !lines[i].trim().startsWith(">") &&
      !/^[-*] /.test(lines[i].trim()) &&
      !/^\d+\.\s/.test(lines[i].trim()) &&
      lines[i].trim() !== "---" &&
      !lines[i].trim().startsWith("*Written by")
    ) {
      para.push(stripInlineMd(lines[i].trim()));
      i++;
    }
    const text = para.join(" ");
    if (text) {
      const isCta =
        text.includes("Register") ||
        text.includes("WhatsApp") ||
        text.includes("Courses page");
      blocks.push({ type: isCta ? "callout" : "p", text });
    }
  }

  return blocks;
}

function parsePostSection(section: string): BlogPost | null {
  const slug = parseMeta(section, "Slug");
  const category = parseMeta(section, "Category");
  const readingTime = parseMeta(section, "Read time") ?? "6 min read";
  const date = parseMeta(section, "Publish date") ?? "2026";
  const excerpt = parseMeta(section, "Meta description");

  if (!slug || !category || !excerpt) return null;

  const metaEnd = section.search(/\n---\n/);
  if (metaEnd === -1) return null;

  const afterMeta = section.slice(metaEnd + 5);
  const titleMatch = afterMeta.match(/^### (.+)$/m);
  if (!titleMatch) return null;

  const title = stripInlineMd(titleMatch[1]);
  let bodyRaw = afterMeta.slice(titleMatch.index! + titleMatch[0].length);
  const writtenIdx = bodyRaw.search(/^\*Written by/m);
  if (writtenIdx >= 0) bodyRaw = bodyRaw.slice(0, writtenIdx);
  bodyRaw = bodyRaw.replace(/^---\s*$/gm, "").trim();

  const body = parseBody(bodyRaw);
  if (body.length === 0) return null;

  return {
    slug,
    title,
    category: category as BlogPost["category"],
    excerpt,
    cover: coverForSlug(slug),
    date,
    readingTime: readingTime.includes("read")
      ? readingTime
      : `${readingTime} read`,
    featured:
      slug === "how-to-prepare-for-caie-economics-october-november-2026",
    keywords: parseMeta(section, "Target keywords")
      ?.split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    body,
  };
}

export function loadBlogPostsFromMarkdown(): BlogPost[] {
  if (!fs.existsSync(BLOG_MD)) return [];

  const content = fs.readFileSync(BLOG_MD, "utf-8");
  const sections = content.split(/^## Post \d+\s*$/m).slice(1);

  const posts: BlogPost[] = [];
  for (const section of sections) {
    const post = parsePostSection(section);
    if (post) posts.push(post);
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
