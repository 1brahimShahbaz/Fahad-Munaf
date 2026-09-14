import Image from "next/image";
import { Globe, Sunrise, Sunset } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import {
  affiliationGroups,
  affiliationsBySlot,
  teachingAffiliationCount,
  type Affiliation,
  type AffiliationSlot,
} from "@/data/affiliations";

const SLOT_ICON: Record<AffiliationSlot, typeof Sunrise> = {
  morning: Sunrise,
  evening: Sunset,
  online: Globe,
};

/** Fallback when an institution's logo has not been supplied yet. */
function initials(name: string) {
  return name
    .replace(/[^A-Za-z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !/^(the|of|and)$/i.test(w))
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function AffiliationCard({ name, logoSrc, href, scale = 1 }: Affiliation) {
  const card = (
    <div className="flex h-full flex-col items-center gap-3">
      <div className="relative flex h-24 w-full items-center justify-center rounded-2xl bg-white p-3 ring-1 ring-navy-900/5 shadow-[0_12px_32px_-14px_rgba(27,33,69,0.65)] transition-all duration-300 ease-smooth group-hover:-translate-y-1 group-hover:ring-gold-500/50 group-hover:shadow-[0_20px_44px_-14px_rgba(248,168,48,0.45)] sm:h-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
        />
        {logoSrc ? (
          // `rounded-lg` on the image matters: two logos (Professionals Core,
          // Ascend) ship with a full-bleed coloured background, and rounding
          // them stops those tiles reading as hard coloured squares.
          // `scale` only normalises built-in padding — the tile stays fixed.
          <div
            className="relative h-full w-full"
            style={{ transform: `scale(${scale})` }}
          >
            <Image
              src={logoSrc}
              alt={`${name} logo`}
              width={240}
              height={240}
              loading="lazy"
              sizes="180px"
              className="absolute inset-0 h-full w-full rounded-lg object-contain"
            />
          </div>
        ) : (
          <span
            aria-hidden
            className="font-display text-2xl font-semibold tracking-tight text-navy-900/70"
          >
            {initials(name)}
          </span>
        )}
      </div>

      <p className="text-center font-inter text-[12.5px] font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-gold-500 sm:text-[13px]">
        {name}
      </p>
    </div>
  );

  const className =
    "group block w-[calc(50%-0.5rem)] max-w-[190px] rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 sm:w-[158px]";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${name}`}
        className={className}
      >
        {card}
      </a>
    );
  }

  return <div className={className}>{card}</div>;
}

function SlotBand({
  slot,
  label,
  blurb,
}: {
  slot: AffiliationSlot;
  label: string;
  blurb: string;
}) {
  const items = affiliationsBySlot(slot);
  if (items.length === 0) return null;
  const Icon = SLOT_ICON[slot];

  return (
    <div>
      {/* Rule-flanked label — keeps three stacked bands visually separate
          without adding three competing headings. */}
      <div className="flex items-center gap-4">
        <span aria-hidden className="h-px flex-1 bg-white/10" />
        <span className="flex items-center gap-2.5">
          <Icon
            aria-hidden
            className="h-4 w-4 shrink-0 text-gold-500"
            strokeWidth={2}
          />
          <span className="font-inter text-[11px] font-bold uppercase tracking-[0.18em] text-white">
            {label}
          </span>
          <span className="hidden font-inter text-[12px] text-white/45 sm:inline">
            · {blurb}
          </span>
        </span>
        <span aria-hidden className="h-px flex-1 bg-white/10" />
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-center gap-x-4 gap-y-7 sm:gap-x-6">
        {items.map((a) => (
          <AffiliationCard key={a.name} {...a} />
        ))}
      </div>
    </div>
  );
}

export function FooterAffiliations() {
  return (
    <section aria-labelledby="footer-affiliations-heading" className="pb-4">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-700/40 px-5 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(248,168,48,0.14),transparent)]"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <SectionEyebrow>Affiliations &amp; Partnerships</SectionEyebrow>
          <h2
            id="footer-affiliations-heading"
            className="mt-3 font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-white sm:text-[34px]"
          >
            Teaching at{" "}
            <span className="italic text-gold-500">
              {teachingAffiliationCount} institutions
            </span>{" "}
            across Karachi.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-inter text-sm leading-relaxed text-white/60">
            Sir Fahad teaches Economics through the morning school and college
            block and the evening academy block, alongside live online classes.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-4xl space-y-11">
          {affiliationGroups.map((g) => (
            <SlotBand
              key={g.slot}
              slot={g.slot}
              label={g.label}
              blurb={g.blurb}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
