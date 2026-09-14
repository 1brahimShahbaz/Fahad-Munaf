import { writeFileSync } from "fs";
import path from "path";
import { loadBlogPostsFromMarkdown } from "../lib/parseBlogPosts";

const posts = loadBlogPostsFromMarkdown();
const out = path.join(process.cwd(), "data", "postsContent.ts");

const body = `/** Auto-generated from blog-posts.md — run \`npm run generate:blog\` */
import type { BlogPost } from "@/lib/blogTypes";

export const posts: BlogPost[] = ${JSON.stringify(posts, null, 2)};
`;

writeFileSync(out, body, "utf-8");
console.log(`Wrote ${posts.length} posts to data/postsContent.ts`);
