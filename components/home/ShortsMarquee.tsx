"use client";

import { useState } from "react";
import { Maximize2, Play } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { VideoLightbox } from "@/components/shared/VideoLightbox";
import { SITE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

type Short = {
  /** YouTube video id. */
  id: string;
  title: string;
  subtitle: string;
};

/** Vertical clips from youtube.com/@economicwithfahadmunafparekh. */
const shorts: Short[] = [
  {
    id: "Ai9Ch2ryyXY",
    title: "From 4 students to 400",
    subtitle: "A look back at how the batch grew, one result at a time.",
  },
  {
    id: "SnDy2N0XQwU",
    title: "AS Level Workshop 2025",
    subtitle: "Inside a weekend workshop ahead of the AS Level exams.",
  },
  {
    id: "Dk3B4HHGsxw",
    title: "When the room goes quiet",
    subtitle: "The moment a hard concept finally clicks for everyone.",
  },
  {
    id: "WC5jWbaBVns",
    title: "Results that speak for themselves",
    subtitle: "Straight from results day — no script, just reactions.",
  },
  {
    id: "VZzIbzEIV7M",
    title: "IGCSE / O Level Workshop 2025",
    subtitle: "A focused revision workshop for O Level and IGCSE.",
  },
  {
    id: "9U7BwSfNGdc",
    title: "Inside an online class",
    subtitle: "What a live online Economics session actually looks like.",
  },
  {
    id: "26ptC0HXKVE",
    title: "The numbers don't lie",
    subtitle: "Grade breakdowns from another strong exam series.",
  },
];

/**
 * A Short's `hqdefault` is a 4:3 frame with the vertical video pillarboxed in
 * the middle, so `object-cover` inside a portrait card crops to the video.
 */
const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const embed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}`;

export function ShortsMarquee() {
  const [active, setActive] = useState<Short | null>(null);

  const openClip = (s: Short) => {
    trackEvent("youtube_click", { location: "home_shorts_marquee" });
    setActive(s);
  };

  // Duplicated once so the loop is seamless.
  const track = [...shorts, ...shorts];

  return (
    <AnimateSection index={3} className="bg-navy-900 py-20 lg:py-24">
      <div className="container-x">
        <SectionHeader
          align="left"
          variant="dark"
          eyebrow="On the feed"
          title={<span className="italic">Sixty seconds at a time.</span>}
          subtitle="Workshops, results and the day-to-day of teaching Economics — short clips from Sir Fahad's channel."
        />
        <p className="mt-4 font-inter text-[14px] text-white/55">
          Tap any clip to play it with sound.
        </p>
      </div>

      {/* Auto-scrolls left → right on a loop; hovering any card pauses it
          (`.fmp-marquee:hover .fmp-marquee-track`, see globals.css). */}
      <div className="fmp-marquee fmp-marquee-fade mt-12 overflow-hidden">
        <div className="fmp-marquee-track flex w-max gap-5 pb-4">
          {track.map((s, i) => (
            <div
              key={`${s.id}-${i}`}
              className="group/card relative aspect-[2/3] w-[240px] flex-none overflow-hidden rounded-3xl bg-navy-700 shadow-card-hover ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:ring-gold-500/40 sm:w-[280px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumb(s.id)}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-[1.04]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/15 to-navy-900/35"
              />

              <button
                type="button"
                onClick={() => openClip(s)}
                aria-label={`Expand: ${s.title}`}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy-900/60 text-white backdrop-blur-sm transition-colors hover:bg-gold-500 hover:text-navy-900"
              >
                <Maximize2 className="h-3.5 w-3.5" strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={() => openClip(s)}
                aria-label={`Play: ${s.title}`}
                className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_10px_26px_rgba(220,38,38,0.45)] transition-transform duration-300 group-hover/card:scale-110"
              >
                <Play className="ml-0.5 h-6 w-6" strokeWidth={0} fill="currentColor" />
              </button>

              <button
                type="button"
                onClick={() => openClip(s)}
                aria-label={`Play: ${s.title}`}
                className="absolute inset-x-4 bottom-4 z-10 text-left"
              >
                <p className="font-display text-[16px] font-semibold leading-snug text-white">
                  {s.title}
                </p>
                <p className="mt-1 line-clamp-2 font-inter text-[12.5px] leading-snug text-white/65">
                  {s.subtitle}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="container-x mt-10">
        <a
          href={SITE.socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("youtube_click", { location: "home_shorts_channel" })
          }
          className="font-inter text-[14px] font-semibold text-gold-500 transition-colors hover:text-gold-300"
        >
          See more on YouTube →
        </a>
      </div>

      <VideoLightbox
        open={!!active}
        onClose={() => setActive(null)}
        videoUrl={active ? embed(active.id) : ""}
        title={active?.title}
        portrait
      />
    </AnimateSection>
  );
}
