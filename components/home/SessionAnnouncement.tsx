"use client";

import { useState } from "react";
import { ArrowRight, BookOpen, FileText, Play, PlayCircle } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { trackEvent } from "@/lib/analytics";
import { CTA_LABELS, registerLink } from "@/lib/constants";

const highlights = [
  {
    icon: PlayCircle,
    title: "Recorded lectures",
    desc: "Full HD recordings to revisit every concept, anytime.",
  },
  {
    icon: FileText,
    title: "Past papers",
    desc: "Topical and yearly papers with worked solutions.",
  },
  {
    icon: BookOpen,
    title: "Reading resources",
    desc: "Curated notes and reading material for every chapter.",
  },
];

/** youtube.com/shorts/nm2A-t4rk5A — the May/June 2027 admissions announcement. */
const ANNOUNCEMENT = {
  id: "nm2A-t4rk5A",
  title:
    "Admissions for the May/June 2027 Batch are now OPEN for IGCSE, O & A Level Economics",
};
const ANNOUNCEMENT_EMBED = `https://www.youtube-nocookie.com/embed/${ANNOUNCEMENT.id}?autoplay=1`;
const ANNOUNCEMENT_THUMB = `https://i.ytimg.com/vi/${ANNOUNCEMENT.id}/hqdefault.jpg`;

export function SessionAnnouncement() {
  const [playing, setPlaying] = useState(false);

  return (
    <AnimateSection
      direction="fade"
      className="relative isolate overflow-hidden bg-navy-900 text-white"
    >
      <div aria-hidden className="absolute inset-0 bg-grid-overlay" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-navy-500/30 blur-3xl"
      />

      <div className="container-x relative py-14 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Left — copy */}
          <div className="min-w-0">
            <span className="pill-gold-outline inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold-500 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-gold-500" />
              </span>
              May/June 2027 · Admissions Open
            </span>

            <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[3rem] sm:leading-[1.05] lg:text-[3.5rem]">
              Admissions for May/June 2027 are{" "}
              <span className="italic text-gold-500">now open</span>
            </h2>

            <p className="mt-4 max-w-xl text-[14px] leading-[1.6] text-white/85 sm:mt-6 sm:text-[17px] sm:leading-[1.7]">
              IGCSE, O Level and A Level Economics with Sir Fahad Munaf Parekh.
              Seats are filling for the new batch — message on WhatsApp to
              confirm yours and start the syllabus from lecture one.
            </p>

            <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-1">
              {highlights.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-500">
                    <item.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-inter text-[15px] font-semibold text-white">
                      {item.title}
                    </span>
                    <span className="block text-[13px] leading-snug text-white/65">
                      {item.desc}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-2 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={registerLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("register_click", {
                    location: "home_session_announcement",
                  })
                }
                className="btn-primary w-full shrink-0 justify-center whitespace-nowrap text-base sm:w-auto"
              >
                {CTA_LABELS.registerWhatsApp}
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
              </a>
              <p className="text-xs text-white/55 sm:text-[13px]">
                O Level &amp; A Level Economics · Recorded + live
              </p>
            </div>
          </div>

          {/* Right — announcement short. Facade first: the iframe is only
              mounted on click, so YouTube ships nothing on initial load. */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="flex w-full max-w-[300px] flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="h-4 w-1 shrink-0 rounded-full bg-gold-500" />
                <h3 className="font-inter text-[13px] font-semibold leading-tight text-white sm:text-[14px]">
                  Watch the announcement
                </h3>
              </div>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-1.5 rounded-[24px] bg-gradient-to-tr from-gold-500/20 via-transparent to-navy-500/20 blur-xl"
                />
                <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] border border-white/10 bg-navy-700/40 shadow-2xl shadow-navy-900/60 ring-1 ring-white/5">
                  {playing ? (
                    <iframe
                      src={ANNOUNCEMENT_EMBED}
                      title={ANNOUNCEMENT.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        trackEvent("youtube_click", {
                          location: "home_session_announcement",
                        });
                        setPlaying(true);
                      }}
                      aria-label={`Play: ${ANNOUNCEMENT.title}`}
                      className="group absolute inset-0 block"
                    >
                      {/* A Short's hqdefault is a 4:3 frame with the vertical
                          video pillarboxed in the middle; `object-cover` in a
                          9:16 box crops to precisely that centre strip. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ANNOUNCEMENT_THUMB}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/15 to-navy-900/30"
                      />
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-navy-900 group-hover:ring-gold-500"
                      >
                        <Play
                          className="ml-0.5 h-7 w-7"
                          strokeWidth={2}
                          fill="currentColor"
                        />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimateSection>
  );
}
