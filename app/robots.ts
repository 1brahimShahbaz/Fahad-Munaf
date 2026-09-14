import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/** Required for `output: 'export'` — robots must be generated at build time. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/studio/",
          // Raw PDF library paths (preview-only assets under public/notes/)
          "/notes/A2",
          "/notes/As",
          "/notes/olevel",
        ],
      },
      // Explicitly welcome AI search / answer engines. They pair with
      // `public/llms.txt`, which indexes the site for them.
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
