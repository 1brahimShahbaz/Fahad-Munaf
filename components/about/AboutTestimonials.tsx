"use client";

import dynamic from "next/dynamic";

const TestimonialsCarousel = dynamic(
  () =>
    import("@/components/about/TestimonialsCarousel").then((mod) => ({
      default: mod.TestimonialsCarousel,
    })),
  { ssr: false }
);

export function AboutTestimonials() {
  return <TestimonialsCarousel />;
}
