"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

/**
 * Cinematic scroll-to-expand opener for /extra-credit — a real classroom
 * glimpse clip instead of the usual static banner, since this page is
 * specifically the "see the classroom" page. Locks page scroll to itself
 * until fully expanded (see scroll-expansion-hero.tsx), so it only belongs
 * as the first thing on the page — the gallery sections render as children
 * and pick up normal scrolling once the video finishes expanding.
 */
export function ExtraCreditHero({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="/videos/FMP1.mp4"
      posterSrc="/images/2.jpeg"
      bgImageSrc="/images/banner3.webp"
      title="Life In The Classroom"
      date="Sir Fahad Munaf Parekh · Economics"
      scrollToExpand="Scroll to expand"
      textBlend
    >
      {children}
    </ScrollExpandMedia>
  );
}
