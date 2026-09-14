"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { CTA_LABELS, registerLink } from "@/lib/constants";

type Slide = {
  image: string;
  imageWidth: number;
  imageHeight: number;
  /**
   * Crop anchor for the hero. The banners are all wider than they are tall but
   * the hero is wider still, so `object-cover` scales to width and the crop is
   * effectively vertical — this picks which band of each photo survives it.
   */
  objectPosition: string;
  eyebrow: string;
  mobileTitle: string;
  mobileTagline?: string;
  headlineLead: string;
  headlineAccent: string;
  subhead: string;
  subheadShort: string;
  registerUrl: string;
  imageAlt: string;
};

const slides: Slide[] = [
  {
    image: "/images/banner1.webp",
    imageWidth: 1600,
    imageHeight: 1200,
    objectPosition: "center 45%",
    eyebrow: "IGCSE · O Level · AS · A2",
    mobileTitle: "Economics, decoded.",
    mobileTagline: "Sir Fahad Munaf Parekh",
    headlineLead: "Sir Fahad Munaf Parekh —",
    headlineAccent: "Economics, decoded.",
    subhead:
      "CAIE 9708, O Level 2281 and IGCSE 0455, taught concept-first: every topic built from the ground up until the diagrams and the evaluation come easily.",
    subheadShort:
      "CAIE 9708, O Level 2281 & IGCSE 0455 — taught concept-first.",
    registerUrl: registerLink(),
    imageAlt:
      "Sir Fahad Munaf Parekh teaching a full Economics class in Karachi",
  },
  {
    image: "/images/banner2.webp",
    imageWidth: 1600,
    imageHeight: 1200,
    objectPosition: "center 42%",
    eyebrow: "200+ lectures · Free on YouTube",
    mobileTitle: "200+ free lectures.",
    mobileTagline: "Watch before you enrol",
    headlineLead: "200+ recorded lectures,",
    headlineAccent: "free to watch.",
    subhead:
      "Complete topic series for O Level, AS and A2 — micro, macro and topical past-paper walkthroughs, explained in Urdu, Hindi and English.",
    subheadShort:
      "Full O Level, AS & A2 topic series — micro, macro and past papers.",
    registerUrl: registerLink(),
    imageAlt:
      "Economics students with Sir Fahad Munaf Parekh after a class",
  },
  {
    image: "/images/banner3.webp",
    imageWidth: 1440,
    imageHeight: 1083,
    objectPosition: "center 75%",
    eyebrow: "May/June 2027 — Admissions open",
    mobileTitle: "May/June 2027",
    mobileTagline: "Admissions open now",
    headlineLead: "The May/June 2027 batch is",
    headlineAccent: "now open.",
    subhead:
      "Live classes with recorded backups, topical past-paper drilling and WhatsApp doubt support — for IGCSE, O Level and A Level Economics.",
    subheadShort:
      "Live + recorded classes, past-paper drilling and WhatsApp support.",
    registerUrl: registerLink(),
    imageAlt:
      "Sir Fahad Munaf Parekh lecturing a full Economics theatre in Karachi",
  },
];

const heroTitleClass =
  "mt-2 font-display text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.02em] text-white sm:mt-5 sm:text-[3.5rem] sm:leading-[1.05] lg:text-[4.25rem]";

function SlidePanel({
  slide,
  index,
  isActive,
}: {
  slide: Slide;
  index: number;
  isActive: boolean;
}) {
  const TitleTag = isActive ? "h1" : "h2";

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col sm:relative sm:block sm:h-full sm:min-h-[inherit]">
      {/* Mobile image strip */}
      <div className="relative h-[calc(min(42vw,220px)+5rem)] w-full shrink-0 sm:hidden">
        <Image
          src={slide.image}
          alt={slide.imageAlt}
          width={slide.imageWidth}
          height={slide.imageHeight}
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectPosition: slide.objectPosition }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-navy-900/20 via-transparent to-navy-900"
        />
      </div>

      {/* Desktop background */}
      <div className="absolute inset-0 hidden sm:block">
        <Image
          src={slide.image}
          alt={slide.imageAlt}
          width={slide.imageWidth}
          height={slide.imageHeight}
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectPosition: slide.objectPosition }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/75 to-navy-900/25 lg:via-navy-900/60 lg:to-navy-900/10"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-transparent to-navy-900/50"
        />
      </div>

      {/* Copy */}
      <div className="relative z-10 w-full min-w-0 max-w-full bg-navy-900 sm:absolute sm:inset-0 sm:flex sm:items-center sm:bg-transparent sm:pt-20 lg:pt-24">
        <div className="mx-auto w-full min-w-0 max-w-[1280px] px-5 pb-6 pt-4 sm:px-8 sm:py-8 lg:px-12">
          <div className="min-w-0 max-w-full sm:max-w-[640px]">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-gold-500 sm:text-[12px] sm:tracking-[0.18em]">
              {slide.eyebrow}
            </span>

            {slide.mobileTagline ? (
              <p className="mt-2 font-inter text-[13px] font-medium leading-snug text-white/75 sm:hidden">
                {slide.mobileTagline}
              </p>
            ) : null}

            <TitleTag className={heroTitleClass}>
              <span className="sm:hidden">{slide.mobileTitle}</span>
              <span className="hidden sm:inline">
                {slide.headlineLead}{" "}
                <span className="italic">{slide.headlineAccent}</span>
              </span>
              {index === 0 ? (
                <span className="sr-only">
                  {" "}
                  — Best A Level Economics Tutor in Karachi, Pakistan
                </span>
              ) : null}
            </TitleTag>

            <p className="mt-2.5 text-[13px] leading-[1.45] text-white/85 sm:mt-6 sm:text-base sm:leading-[1.7]">
              <span className="sm:hidden">{slide.subheadShort}</span>
              <span className="hidden sm:inline">{slide.subhead}</span>
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
              <a
                href={slide.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("register_click", {
                    location: `home_hero_slide_${index}`,
                  })
                }
                className="btn-primary w-full justify-center px-5 py-2.5 text-[13px] sm:w-auto sm:px-7 sm:py-3.5 sm:text-base"
              >
                {CTA_LABELS.registerWhatsApp}
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
              </a>
              <Link
                href="#sample-lectures"
                className={cn(
                  "inline-flex w-auto max-w-full items-center justify-center gap-1.5 self-start rounded-full border border-white/35 px-4 py-2 font-inter text-[12px] font-semibold text-white transition-colors hover:bg-white/10",
                  "sm:gap-2 sm:border-[1.5px] sm:border-white/80 sm:bg-transparent sm:px-7 sm:py-3.5 sm:text-base sm:hover:bg-white sm:hover:text-navy-900"
                )}
              >
                <Play className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} fill="currentColor" />
                Sample lecture
              </Link>
            </div>

            {/* A verifiable fact rather than a star rating — there is no review
                source behind stars, and the lecture count is checkable. */}
            <div className="mt-3 flex items-center gap-2 text-[11px] text-white/70 sm:mt-8 sm:text-sm">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Play className="ml-0.5 h-2.5 w-2.5" strokeWidth={0} fill="currentColor" />
              </span>
              <span>200+ lectures free to watch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30, align: "start" },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () =>
      startTransition(() =>
        setSelectedIndex(emblaApi.selectedScrollSnap())
      );
    const onResize = () => emblaApi.reInit();
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("resize", onResize);
    window.addEventListener("resize", onResize);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("resize", onResize);
      window.removeEventListener("resize", onResize);
    };
  }, [emblaApi]);

  return (
    <AnimateSection
      direction="fade"
      instant
      className="relative -mt-20 w-full min-w-0 max-w-full overflow-x-clip bg-navy-900 text-white lg:-mt-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -left-16 top-1/4 h-48 w-48 rounded-full bg-gold-500/10 blur-3xl animate-float-up-slow" />
        <span className="absolute right-[8%] top-[18%] h-32 w-32 rounded-full bg-navy-500/30 blur-2xl animate-float-up" />
        <span className="absolute bottom-[20%] left-[12%] h-24 w-24 rounded-full bg-gold-500/15 blur-2xl animate-float-up" />
      </div>
      <div className="hero-embla__viewport relative z-[1]" ref={emblaRef}>
        <div className="hero-embla__container">
          {slides.map((s, i) => (
            <div key={i} className="hero-embla__slide">
              <SlidePanel slide={s} index={i} isActive={selectedIndex === i} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 bg-navy-900 px-4 py-3 sm:absolute sm:bottom-8 sm:left-1/2 sm:z-20 sm:-translate-x-1/2 sm:bg-transparent sm:py-0">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() =>
              startTransition(() => emblaApi?.scrollTo(i))
            }
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              selectedIndex === i
                ? "w-8 bg-gold-500"
                : "w-5 bg-white/30 hover:bg-white/50"
            )}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-6 right-6 z-20 hidden gap-2 sm:pointer-events-auto sm:flex">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={scrollPrev}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/15"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={scrollNext}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/15"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </AnimateSection>
  );
}
