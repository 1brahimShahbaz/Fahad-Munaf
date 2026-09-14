import { ArrowRight, Check, X } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { cn } from "@/lib/utils";

/** Each row reframes a habit students arrive with into what actually scores. */
const CONTRASTS = [
  {
    not: "Memorising forty definitions",
    but: "Knowing which diagram the question is really asking for",
  },
  {
    not: "Watching two hundred hours of lectures",
    but: "Drilling the dozen chains that show up every session",
  },
  {
    not: "Writing everything you know",
    but: "Writing the evaluation the mark scheme pays for",
  },
  {
    not: "Hoping for a kind paper",
    but: "Walking in already knowing the pattern",
  },
] as const;

export function NotThisButThis({ className }: { className?: string }) {
  return (
    <AnimateSection
      id="the-method"
      index={5}
      className={cn(
        "edge-gold-hard relative isolate overflow-hidden bg-navy-900 py-20 text-white lg:py-24",
        className
      )}
    >
      <div aria-hidden className="absolute inset-0 grad-gold-spot" />
      <div aria-hidden className="absolute inset-0 bg-grid-overlay opacity-30" />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow className="text-gold-500">The method</SectionEyebrow>
          <h2 className="mt-3 font-display text-[32px] font-semibold leading-tight sm:text-[42px]">
            It&rsquo;s not more work.
            <br />
            It&rsquo;s{" "}
            <span className="text-grad-gold italic">the right work.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-inter text-[16px] leading-relaxed text-white/75">
            An A* isn&rsquo;t won by covering more ground than everyone else.
            It&rsquo;s won by knowing exactly which ground the examiner is
            standing on.
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          {CONTRASTS.map((row) => (
            <li
              key={row.not}
              className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-[2px] transition-colors duration-300 hover:border-gold-500/40 hover:bg-white/[0.08] sm:p-6"
            >
              <span className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/50"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="font-inter text-[15px] leading-snug text-white/45 line-through decoration-white/25">
                  {row.not}
                </span>
              </span>

              <span className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-900"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="font-display text-[17px] font-semibold leading-snug text-white sm:text-[18px]">
                  {row.but}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-11 flex justify-center">
          <a
            href="#sample-lectures"
            className="grad-gold-hard inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-inter text-sm font-semibold text-navy-900 shadow-cta-glow-sm transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-cta-glow"
          >
            See the method in a lecture
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </AnimateSection>
  );
}
