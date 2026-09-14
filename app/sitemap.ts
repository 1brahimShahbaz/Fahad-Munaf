import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { posts } from "@/data/posts";

/** Required for `output: 'export'` — sitemap must be generated at build time. */
export const dynamic = "force-static";

const BASE = SITE.url;

type StaticRoute = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const STATIC_ROUTES: StaticRoute[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/register", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/courses/as-level", changeFrequency: "weekly", priority: 0.9 },
  { path: "/courses/a2-level", changeFrequency: "weekly", priority: 0.9 },
  { path: "/courses/o-level", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/notes", changeFrequency: "weekly", priority: 0.7 },
  { path: "/extra-credit", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
