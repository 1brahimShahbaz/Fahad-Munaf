import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AnimateStagger, AnimateStaggerItem } from "@/components/shared/AnimateStagger";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { BlogCardPost } from "@/data/posts";

type Props = {
  posts: BlogCardPost[];
};

export function BlogPreview({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <AnimateSection index={5} className="bg-surface py-20 lg:py-24">
      <div className="container-x">
        <SectionHeader
          align="left"
          eyebrow="The blog"
          title={
            <>
              Read the Economics{" "}
              <span className="italic text-gold-500">blog.</span>
            </>
          }
          subtitle="Study guides, exam technique, and concept explainers for CAIE and Edexcel Economics."
        />

        <AnimateStagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {posts.map((post) => (
            <AnimateStaggerItem key={post.slug} className="h-full">
              <BlogCard post={post} />
            </AnimateStaggerItem>
          ))}
        </AnimateStagger>

        <div className="mt-12 flex justify-center">
          <Link href="/blog" className="btn-primary">
            View more
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </AnimateSection>
  );
}
