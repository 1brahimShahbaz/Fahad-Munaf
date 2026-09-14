"use client";

import Image from "next/image";
import { ArrowUpRight, Mail, MessageCircle, Smartphone } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { SITE, TALK_TOPICS, whatsappLink } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Props = {
  /** Analytics label for this placement, e.g. "home" or "contact". */
  source: string;
  index?: number;
  className?: string;
};

/**
 * "Talk with FMP" — one number for calls, WhatsApp and quick questions.
 * Pairs with the floating dock in `components/layout/TalkWithFMP.tsx`.
 */
export function TalkWithFMPBand({ source, index = 6, className }: Props) {
  return (
    <AnimateSection
      index={index}
      className={cn(
        "edge-gold-hard relative isolate overflow-hidden bg-navy-900 py-20 text-white lg:py-24",
        className
      )}
    >
      <div aria-hidden className="absolute inset-0 grad-gold-spot" />
      <div aria-hidden className="absolute inset-0 bg-grid-overlay opacity-40" />
      <Image
        src="/images/fmp-logo.png"
        alt=""
        aria-hidden
        width={640}
        height={640}
        className="pointer-events-none absolute -right-16 top-1/2 hidden w-[520px] max-w-none -translate-y-1/2 opacity-[0.06] [filter:brightness(0)_invert(1)] lg:block"
      />

      <div className="container-x relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Copy + number */}
          <div>
            <SectionEyebrow className="text-gold-500">
              One number, every question
            </SectionEyebrow>
            <h2 className="mt-3 font-display text-[32px] font-semibold leading-tight sm:text-[42px]">
              Talk with{" "}
              <span className="text-grad-gold italic">FMP.</span>
            </h2>
            <p className="mt-5 max-w-md font-inter text-[16px] leading-relaxed text-white/80">
              Admissions, fees, timings or a diagram you can&rsquo;t crack —
              text the same line and you reach Sir Fahad&rsquo;s desk directly.
              No forms, no queue.
            </p>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", { context: `${source}_number` })
              }
              className="group mt-8 inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-gold-500/60 hover:bg-white/10"
            >
              <span
                aria-hidden
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-900"
              >
                <Smartphone className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="block text-left font-display text-[24px] font-semibold leading-tight text-white sm:text-[28px]">
                {SITE.phone}
              </span>
              <ArrowUpRight
                aria-hidden
                className="ml-1 h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-gold-500"
                strokeWidth={2.5}
              />
            </a>
          </div>

          {/* Quick-start card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-3.5">
              <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-gold-500/60">
                <Image
                  src="/images/fmp-logo.png"
                  alt=""
                  aria-hidden
                  width={112}
                  height={112}
                  className="h-11 w-11 object-contain"
                />
                <span
                  aria-hidden
                  className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-navy-900 bg-whatsapp"
                />
              </span>
              <div>
                <p className="font-display text-[19px] font-semibold leading-tight text-white">
                  {SITE.personName}
                </p>
                <p className="mt-1 font-inter text-[12px] text-white/70">
                  {SITE.tagline}
                </p>
              </div>
            </div>

            <p className="mt-6 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
              Tap a question to start
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TALK_TOPICS.map((topic) => (
                <a
                  key={topic.id}
                  href={whatsappLink(topic.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", {
                      context: `${source}_band_${topic.id}`,
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-2 font-inter text-[13px] font-medium text-white transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gold-500 hover:text-navy-900"
                >
                  {topic.label}
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                </a>
              ))}
            </div>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", { context: `${source}_band` })
              }
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-inter text-[15px] font-semibold text-white shadow-[0_10px_28px_rgba(37,211,102,0.35)] transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} fill="white" />
              Chat on WhatsApp
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 flex items-center justify-center gap-2 font-inter text-[13px] font-medium text-white/60 transition-colors hover:text-gold-500"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={2} />
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </AnimateSection>
  );
}
