"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  REVEAL_CLASS,
  REVEAL_INSTANT_CLASS,
  REVEAL_VISIBLE_CLASS,
  directionAt,
  revealVars,
  useReveal,
  type AnimateDirection,
} from "@/lib/reveal";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  direction?: AnimateDirection;
  index?: number;
  delay?: number;
  /** Above-the-fold: animate straight away, in CSS, without waiting for JS. */
  instant?: boolean;
};

export function AnimateSection({
  children,
  className,
  id,
  direction,
  index = 0,
  delay = 0,
  instant = false,
}: Props) {
  const { ref, visible } = useReveal<HTMLElement>();
  const dir = direction ?? directionAt(index);
  const style = revealVars(dir, delay);

  // Hero / first-screen sections run a CSS keyframe that starts as soon as the
  // stylesheet parses — the LCP element is never gated on hydration.
  if (instant) {
    return (
      <section id={id} className={cn(REVEAL_INSTANT_CLASS, className)} style={style}>
        {children}
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id={id}
      className={cn(REVEAL_CLASS, visible && REVEAL_VISIBLE_CLASS, className)}
      style={style}
    >
      {children}
    </section>
  );
}
