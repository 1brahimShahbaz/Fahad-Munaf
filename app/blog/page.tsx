import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { getBlogIndexData } from "@/data/posts";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Economics Blog — CAIE A Level",
  description:
    "Economics study guides, exam technique, and concept explainers by Fahad Munaf Parekh — CAIE 9708, Edexcel, AS/A2, and O Level. Tips for Pakistan and online students.",
  path: "/blog",
  keywords: [
    "Fahad Munaf Parekh blog",
    "economics a level blog",
    "CAIE 9708 tips",
    "economics exam technique",
    "economics study guide",
    "O Level economics revision",
    "economics tutor Pakistan",
  ],
});

export default function BlogPage() {
  const { featured, others, categories } = getBlogIndexData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ])
          ),
        }}
      />
    <BlogIndex
      featuredPost={featured}
      otherPosts={others}
      categories={categories}
    />
    </>
  );
}
