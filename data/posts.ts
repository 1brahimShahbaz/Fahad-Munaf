import { posts } from "./postsContent";

export type {
  BlogBodyBlock,
  BlogCategory,
  BlogPost,
} from "@/lib/blogTypes";

import type { BlogPost } from "@/lib/blogTypes";

export { posts };

export const featuredPost = posts.find((p) => p.featured) ?? posts[0];
export const otherPosts = posts.filter((p) => !p.featured);

/**
 * A post without its `body`. Cards, previews and the blog index only need the
 * metadata — shipping the full article text to the client would put every
 * post's body (~160 KB) into the browser bundle and the RSC payload.
 */
export type BlogCardPost = Omit<BlogPost, "body">;

function toCard(post: BlogPost): BlogCardPost {
  const { body, ...card } = post;
  void body;
  return card;
}

/** Recent posts for the home page preview (featured first, then newest). */
export function getBlogPreviewPosts(limit = 4): BlogCardPost[] {
  const byDate = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured = byDate.find((p) => p.featured);
  const ordered = featured
    ? [featured, ...byDate.filter((p) => p.slug !== featured.slug)]
    : byDate;
  return ordered.slice(0, limit).map(toCard);
}

/** Everything the /blog index renders — metadata only, no article bodies. */
export function getBlogIndexData(): {
  featured: BlogCardPost;
  others: BlogCardPost[];
  categories: string[];
} {
  return {
    featured: toCard(featuredPost),
    others: otherPosts.map(toCard),
    categories: Array.from(new Set(posts.map((p) => p.category))),
  };
}
