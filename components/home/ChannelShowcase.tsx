"use client";

import Image from "next/image";
import { ArrowRight, MonitorPlay, PlayCircle } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { CTA_LABELS, SITE, registerLink } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { totalRecordedLectures } from "@/data/recordedLectures";

/**
 * Replaces the old "How to prepare for Economics" video block.
 *
 * The phone is drawn in CSS rather than pulled from a mockup library — it is a
 * rounded frame, a notch and a screenshot, and shipping a dependency for that
 * would cost more than it saves.
 *
 * The screenshot is the real channel page. Its intrinsic size is declared
 * exactly (826x1600) so the browser reserves the right box and the section
 * does not shift as the image loads.
 */
const SCREENSHOT = "/images/youtube-channel.jpeg";
const SCREENSHOT_W = 826;
const SCREENSHOT_H = 1600;

const points = [
  `${totalRecordedLectures} full lectures, free to watch`,
  "Topic series for O Level, AS and A2",
  "Explained in Urdu, Hindi and English",
];

export function ChannelShowcase() {
  return (
    <AnimateSection
      index={8}
      className="relative isolate overflow-hidden bg-navy-900 pt-16 text-white lg:py-24"
    >
      <div aria-hidden className="absolute inset-0 bg-grid-overlay opacity-40" />

      <div className="container-x relative grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Copy */}
        <div className="z-20 flex flex-col items-start">
          <SectionEyebrow className="text-gold-500">
            On YouTube
          </SectionEyebrow>
          <h2 className="mt-3 font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[42px] lg:text-[48px]">
            Watch the whole course{" "}
            <span className="text-gold-500">before you enrol.</span>
          </h2>
          <p className="mt-5 max-w-md font-inter text-[16px] leading-relaxed text-white/75 lg:text-[17px]">
            Every topic is already on the channel — not clips or teasers, but
            the full lectures students sit through in class. Watch a few, then
            decide.
          </p>

          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <PlayCircle
                  aria-hidden
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-500"
                  strokeWidth={2}
                />
                <span className="font-inter text-[15px] leading-snug text-white/80">
                  {p}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href={registerLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("register_click", { location: "channel_showcase" })
              }
              className="btn-primary w-full justify-center text-[15px] sm:w-auto"
            >
              {CTA_LABELS.registerWhatsApp}
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
            </a>
            <a
              href={SITE.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("youtube_click", { location: "channel_showcase" })
              }
              className="btn-outline-white w-full justify-center text-[15px] sm:w-auto"
            >
              <MonitorPlay className="h-4 w-4 shrink-0" strokeWidth={2} />
              Visit the channel
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Soft blob behind the device, echoing the reference layout. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl sm:h-[520px] sm:w-[520px]"
          />

          <div className="relative w-[248px] sm:w-[280px]">
            <div className="relative overflow-hidden rounded-[2.75rem] border-[10px] border-navy-700 bg-navy-700 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
              {/* Notch */}
              <div
                aria-hidden
                className="absolute left-1/2 top-0 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-navy-700"
              />
              <Image
                src={SCREENSHOT}
                alt={`${SITE.personName}'s YouTube channel — Economics lectures for O Level, IGCSE and A Level`}
                width={SCREENSHOT_W}
                height={SCREENSHOT_H}
                loading="lazy"
                sizes="280px"
                className="block h-auto w-full"
              />
            </div>

            {/* Subscriber-style badge, anchored to the device */}
            <div className="absolute -left-4 bottom-10 hidden items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-lg sm:flex">
              <PlayCircle
                aria-hidden
                className="h-4 w-4 shrink-0 text-[#FF0000]"
                strokeWidth={2}
              />
              <span className="font-inter text-[12.5px] font-semibold text-navy-900">
                {totalRecordedLectures} lectures
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimateSection>
  );
}
