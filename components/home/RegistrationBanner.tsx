"use client";

import { ArrowRight } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { trackEvent } from "@/lib/analytics";
import { CTA_LABELS, registerLink } from "@/lib/constants";

type Props = {
  title?: string;
  subtitle?: string;
  badge?: string;
  source?: string;
  /** Enrolment destination (defaults to the WhatsApp register link). */
  registerHref?: string;
  ctaLabel?: string;
};

export function RegistrationBanner({
  title = "Registrations are open for the May/June 2027 session",
  subtitle = "Live online classes, recorded backups, full notes pack, weekly doubt sessions, and unlimited past-paper marking.",
  badge = "Registrations Open",
  source = "home_banner",
  registerHref = registerLink(),
  ctaLabel = CTA_LABELS.registerWhatsApp,
}: Props) {
  return (
    <AnimateSection
      index={6}
      className="edge-gold-hard relative isolate overflow-hidden bg-navy-900 text-white"
    >
      <div aria-hidden className="absolute inset-0 grad-gold-spot" />
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-overlay"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div className="container-x relative py-14 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="pill-gold-outline inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold-500 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-gold-500" />
              </span>
              {badge}
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-[28px] font-semibold leading-[1.15] text-white sm:text-[34px] lg:text-[42px]">
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/80">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <a
              href={registerHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("register_click", { location: source })
              }
              className="btn-primary grad-gold-hard text-base shadow-cta-glow"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
            <p className="text-xs text-white/60">
              Limited seats · Message to confirm yours
            </p>
          </div>
        </div>
      </div>
    </AnimateSection>
  );
}
