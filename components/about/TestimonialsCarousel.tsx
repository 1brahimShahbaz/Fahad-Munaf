"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { VideoLightbox } from "@/components/shared/VideoLightbox";
import { recommendationVideos } from "@/data/recommendationVideos";

export function TestimonialsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  }, []);

  return (
    <AnimateSection index={4} className="bg-navy-900 py-20 lg:py-24">
      <div className="container-x">
        <div>
          <SectionEyebrow>What Students Say</SectionEyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[34px] font-semibold italic leading-tight text-white sm:text-[42px]">
            In their words.
          </h2>
          <p className="mt-3 max-w-xl text-[16px] text-white/70">
            Straight from students — what it&apos;s actually like studying
            Economics in class.
          </p>
        </div>

        <div
          ref={scrollerRef}
          className="reels-scroll mt-12 flex gap-5 overflow-x-auto scroll-smooth pb-4"
        >
          {recommendationVideos.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveSrc(v.src)}
              className="group relative aspect-[9/16] min-w-[220px] flex-[0_0_220px] overflow-hidden rounded-2xl shadow-card-hover ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:ring-gold-500/50 sm:min-w-[260px] sm:flex-[0_0_260px]"
              aria-label="Play testimonial clip"
            >
              <video
                src={v.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-navy-900/10"
              />
              <span className="absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
                <Volume2 className="h-3 w-3" strokeWidth={2.5} />
                Tap to play with sound
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <button
            aria-label="Previous clip"
            onClick={() => scrollBy(-1)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-700 text-gold-500 transition-colors hover:bg-navy-500"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            aria-label="Next clip"
            onClick={() => scrollBy(1)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-700 text-gold-500 transition-colors hover:bg-navy-500"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <VideoLightbox
        open={!!activeSrc}
        onClose={() => setActiveSrc(null)}
        videoUrl={activeSrc ?? ""}
        title="Student testimonial"
      />
    </AnimateSection>
  );
}
