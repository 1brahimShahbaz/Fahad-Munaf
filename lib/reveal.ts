"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal primitive — one shared IntersectionObserver for the whole
 * document, with the animation itself handled by CSS transitions on
 * `.motion-reveal` (see globals.css). Compositor-only properties (opacity +
 * transform), so reveals never touch layout or the main thread.
 *
 * This replaces framer-motion for section reveals: same feel, ~0 KB of JS.
 */

type RevealCallback = () => void;

let sharedObserver: IntersectionObserver | null = null;
const pending = new WeakMap<Element, RevealCallback>();

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const run = pending.get(entry.target);
        observer.unobserve(entry.target);
        pending.delete(entry.target);
        run?.();
      }
    },
    /**
     * `threshold: 0` — fire the moment a single pixel crosses the line.
     *
     * It must NOT be a ratio. A section can never intersect by more than
     * `viewport / sectionHeight`, so any ratio threshold silently breaks for
     * tall sections: a 13,000px lecture list on a 560px phone peaks at 4.2%,
     * never reaches 0.05, and stays at `opacity: 0` forever. That failed on
     * mobile only, because phones stack single-column (taller sections) into
     * a shorter viewport.
     */
    { threshold: 0, rootMargin: "0px 0px -4% 0px" }
  );

  return sharedObserver;
}

/**
 * @param instant Reveal on mount instead of on scroll (above-the-fold content).
 */
export function useReveal<T extends HTMLElement>(instant = false) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (instant) {
      // Next frame, so the transition has an initial state to animate from.
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const el = ref.current;
    if (!el) return;

    const observer = getObserver();
    if (!observer) {
      setVisible(true);
      return;
    }

    pending.set(el, () => setVisible(true));
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      pending.delete(el);
    };
  }, [instant]);

  return { ref, visible };
}

export type AnimateDirection = "up" | "down" | "left" | "right" | "fade";

/**
 * Cycle directions so sections feel varied as you scroll.
 * No "down" entries — content moving against the scroll direction reads as jumpy.
 */
const DIRECTION_CYCLE: AnimateDirection[] = [
  "up",
  "right",
  "left",
  "up",
  "fade",
  "up",
];

export function directionAt(index: number): AnimateDirection {
  return DIRECTION_CYCLE[index % DIRECTION_CYCLE.length];
}

/** Hidden-state offset, expressed as CSS custom properties. */
export function revealVars(
  direction: AnimateDirection,
  delaySeconds = 0
): React.CSSProperties {
  const vars: Record<string, string> = {};

  switch (direction) {
    case "up":
      vars["--rv-y"] = "22px";
      break;
    case "down":
      vars["--rv-y"] = "-22px";
      break;
    case "left":
      vars["--rv-x"] = "26px";
      break;
    case "right":
      vars["--rv-x"] = "-26px";
      break;
    case "fade":
      vars["--rv-scale"] = "0.97";
      break;
  }

  if (delaySeconds > 0) vars["--rv-delay"] = `${Math.round(delaySeconds * 1000)}ms`;

  return vars as React.CSSProperties;
}

/** Shared class on every reveal wrapper — see globals.css + the noscript fallback. */
export const REVEAL_CLASS = "motion-reveal";
export const REVEAL_VISIBLE_CLASS = "is-revealed";
/** Above-the-fold variant: CSS-only, runs without waiting for hydration. */
export const REVEAL_INSTANT_CLASS = "motion-reveal-instant";
