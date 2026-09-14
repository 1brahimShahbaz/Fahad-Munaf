"use client";

import { useMemo, startTransition, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { BlogCard } from "./BlogCard";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AnimateStagger, AnimateStaggerItem } from "@/components/shared/AnimateStagger";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import type { BlogCardPost } from "@/data/posts";
import { cn } from "@/lib/utils";

type Props = {
  /** Metadata-only posts — article bodies never reach the client. */
  featuredPost: BlogCardPost;
  otherPosts: BlogCardPost[];
  categories: string[];
};

export function BlogIndex({ featuredPost, otherPosts, categories }: Props) {
  const allCategories = useMemo(() => ["All", ...categories], [categories]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered: BlogCardPost[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return otherPosts.filter((p) => {
      const inCategory =
        activeCategory === "All" ||
        (p.category as string) === activeCategory;
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        (p.keywords?.some((k) => k.toLowerCase().includes(q)) ?? false);
      return inCategory && inQuery;
    });
  }, [activeCategory, query, otherPosts]);

  return (
    <>
      <AnimateSection index={0} instant className="bg-surface pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="container-x">
          <SectionEyebrow>The Blog</SectionEyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-[40px] font-semibold italic leading-[1.05] tracking-[-0.02em] text-navy-900 sm:text-[56px]">
            Economics, exams, and everything in between.
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-gray-500">
            Tips, walkthroughs, and concept explainers — updated weekly to give
            you the competitive edge in your academic journey.
          </p>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full max-w-sm">
              <span className="sr-only">Search articles</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                strokeWidth={2}
              />
              <input
                type="text"
                value={query}
                onChange={(e) =>
                  startTransition(() => setQuery(e.target.value))
                }
                placeholder="Search articles…"
                className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {allCategories.map((c) => (
                <button
                  key={c}
                  onClick={() =>
                    startTransition(() => setActiveCategory(c))
                  }
                  className={cn(
                    "rounded-full px-4 py-2 text-[13px] font-medium transition-all",
                    activeCategory === c
                      ? "bg-gold-500 text-navy-900"
                      : "border border-gray-200 bg-white text-navy-900 hover:bg-cream-50"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </AnimateSection>

      <AnimateSection index={1} className="bg-surface py-12 lg:py-16">
        <div className="container-x">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="card-rest group grid overflow-hidden rounded-2xl border border-gray-200 bg-white lg:grid-cols-[1.2fr_1fr]"
          >
            <div className="relative aspect-[16/10] w-full lg:aspect-auto">
              <Image
                src={featuredPost.cover}
                alt={featuredPost.title}
                width={1200}
                height={750}
                loading="lazy"
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <span className="inline-flex w-fit items-center rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider2 text-navy-900">
                Featured · {featuredPost.category}
              </span>
              <h2 className="mt-5 font-display text-[26px] font-semibold leading-tight text-navy-900 sm:text-[34px]">
                {featuredPost.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-gray-500">
                {featuredPost.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-gold-500/30">
                  <Image
                    src="/images/fmp-avatar.png"
                    alt="Sir Fahad Munaf Parekh, CAIE Economics tutor"
                    width={40}
                    height={40}
                    loading="lazy"
                    sizes="40px"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <p className="text-[13px] text-gray-500">
                  <span className="font-semibold text-navy-900">
                    Sir Fahad Munaf Parekh
                  </span>{" "}
                  · {featuredPost.readingTime}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500">
                Read article
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </div>
          </Link>
        </div>
      </AnimateSection>

      <AnimateSection index={2} className="bg-surface py-16 lg:py-20">
        <div className="container-x">
          {filtered.length > 0 ? (
            <AnimateStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filtered.map((p) => (
                <AnimateStaggerItem key={p.slug} className="h-full">
                  <BlogCard post={p} />
                </AnimateStaggerItem>
              ))}
            </AnimateStagger>
          ) : (
            <p className="text-center text-gray-500">
              No posts match your filters yet.
            </p>
          )}
        </div>
      </AnimateSection>
    </>
  );
}
