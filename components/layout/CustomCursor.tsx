"use client";

import { useEffect, useRef } from "react";

/**
 * Gold dot + trailing ring cursor.
 *
 * Deliberately conservative:
 *  - Mouse/trackpad only (`pointer: fine`); phones and tablets are untouched.
 *  - Skipped entirely under `prefers-reduced-motion`.
 *  - The native cursor is only hidden *after* this mounts, so a JS failure
 *    can never leave the page without a pointer.
 *  - One rAF loop, transform-only writes — no layout, no paint.
 */

const INTERACTIVE = 'a,button,[role="button"],summary,label,select';
const TEXT_INPUT = "input,textarea";
/** Ring easing per frame — lower trails further behind the dot. */
const EASE = 0.18;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("fmp-cursor-on");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let hovering = false;
    let visible = false;
    let frame = 0;

    const setHoverState = (target: EventTarget | null) => {
      const el = target instanceof Element ? target : null;
      const isText = !!el?.closest(TEXT_INPUT);
      // Over a text field, hand the caret back to the browser.
      root.classList.toggle("fmp-cursor-text", isText);

      const next = !isText && !!el?.closest(INTERACTIVE);
      if (next === hovering) return;
      hovering = next;
      ring.classList.toggle("is-hovering", next);
      dot.classList.toggle("is-hovering", next);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        ringX = mouseX;
        ringY = mouseY;
        dot.classList.add("is-visible");
        ring.classList.add("is-visible");
      }
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      setHoverState(e.target);
    };

    const hide = () => {
      visible = false;
      dot.classList.remove("is-visible");
      ring.classList.remove("is-visible");
    };

    const onDown = () => ring.classList.add("is-pressed");
    const onUp = () => ring.classList.remove("is-pressed");

    const tick = () => {
      ringX += (mouseX - ringX) * EASE;
      ringY += (mouseY - ringY) * EASE;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      root.classList.remove("fmp-cursor-on", "fmp-cursor-text");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} aria-hidden className="fmp-cursor-ring" />
      <div ref={dotRef} aria-hidden className="fmp-cursor-dot" />
    </>
  );
}
