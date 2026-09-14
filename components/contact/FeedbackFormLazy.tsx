"use client";

import dynamic from "next/dynamic";
import { useReveal } from "@/lib/reveal";

/**
 * react-hook-form + zod are ~300 KB of JS and the feedback form sits far below
 * the fold. Mount it only once the user scrolls to it, so the contact page's
 * initial load never pays for validation machinery nobody has reached yet.
 */
const FeedbackForm = dynamic(
  () =>
    import("@/components/contact/FeedbackForm").then((mod) => ({
      default: mod.FeedbackForm,
    })),
  { ssr: false }
);

export function FeedbackFormLazy() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      {visible ? (
        <FeedbackForm />
      ) : (
        // Reserve the form's height so nothing shifts when it mounts.
        <div aria-hidden className="min-h-[520px] rounded-2xl bg-white/70" />
      )}
    </div>
  );
}
