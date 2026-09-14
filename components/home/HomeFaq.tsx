import Link from "next/link";
import {
  BookOpen,
  CalendarCheck,
  GraduationCap,
  MapPin,
  MessageCircle,
  MonitorPlay,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { HOME_FAQS, faqPageJsonLd } from "@/lib/seo";
import { SITE, whatsappLink } from "@/lib/constants";

/**
 * One icon per question, in the order `HOME_FAQS` is declared. Kept here
 * rather than in `lib/seo.ts` so the SEO data stays presentation-free — and
 * `at()` means adding a question never crashes the grid, it just repeats.
 */
const FAQ_ICONS: LucideIcon[] = [
  GraduationCap,
  MapPin,
  MonitorPlay,
  Wallet,
  BookOpen,
  CalendarCheck,
  MessageCircle,
];

/**
 * Visible FAQ for local-SEO rich results. Every question and answer is plain
 * static HTML — no accordion — so Google reads the full text without needing
 * to expand anything, and the matching FAQPage JSON-LD sits alongside it.
 */
export function HomeFaq() {
  return (
    <AnimateSection
      index={7}
      id="faq"
      className="relative isolate overflow-hidden border-t border-white/10 bg-navy-900 py-16 text-white lg:py-24"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd()),
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-grid-overlay opacity-50" />

      <div className="container-x relative">
        <SectionHeader
          variant="dark"
          eyebrow="FAQs"
          title={
            <>
              Frequently asked{" "}
              <span className="text-gold-500">questions.</span>
            </>
          }
          subtitle="Everything students and parents ask about A Level and O Level Economics tuition in Karachi and online across Pakistan."
        />

        <dl className="mt-14 grid grid-cols-1 gap-x-8 gap-y-11 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-y-14">
          {HOME_FAQS.map((faq, i) => {
            const Icon = FAQ_ICONS[i % FAQ_ICONS.length];
            return (
              <div
                key={faq.question}
                className="flex max-w-sm flex-col items-center text-center sm:items-start sm:text-left"
              >
                <span
                  aria-hidden
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/[0.06] text-gold-500 lg:h-12 lg:w-12"
                >
                  <Icon className="h-5 w-5 lg:h-[22px] lg:w-[22px]" strokeWidth={1.75} />
                </span>
                <dt className="mt-4 font-display text-[17px] font-semibold leading-snug text-white lg:text-[18px]">
                  {faq.question}
                </dt>
                <dd className="mt-2 font-inter text-[14px] leading-[1.7] text-white/60 lg:text-[15px]">
                  {faq.answer}
                </dd>
              </div>
            );
          })}
        </dl>

        {/* Closing card — the one place the FAQ asks for an action. */}
        <div className="mt-14 flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-9 text-center lg:mt-16 lg:px-8 lg:py-10">
          <div>
            <h3 className="font-display text-[21px] font-semibold text-white lg:text-[24px]">
              Still have questions?
            </h3>
            <p className="mx-auto mt-2 max-w-md font-inter text-[15px] leading-relaxed text-white/60 lg:text-[16px]">
              Can&rsquo;t find what you&rsquo;re looking for? Message{" "}
              {SITE.name} directly — replies are usually within the hour.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-[15px]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              Ask on WhatsApp
            </a>
            <Link href="/contact" className="btn-outline-white text-[15px]">
              Contact page
            </Link>
          </div>
        </div>
      </div>
    </AnimateSection>
  );
}
