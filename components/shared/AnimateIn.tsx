"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  REVEAL_CLASS,
  REVEAL_VISIBLE_CLASS,
  revealVars,
  useReveal,
  type AnimateDirection,
} from "@/lib/reveal";

type Props = {
  children: ReactNode;
  className?: string;
  direction?: AnimateDirection;
  delay?: number;
};

export function AnimateIn({
  children,
  className,
  direction = "up",
  delay = 0,
}: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(REVEAL_CLASS, visible && REVEAL_VISIBLE_CLASS, className)}
      style={revealVars(direction, delay)}
    >
      {children}
    </div>
  );
}
