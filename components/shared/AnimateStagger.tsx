"use client";

import { createContext, useContext, useMemo, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  REVEAL_CLASS,
  REVEAL_VISIBLE_CLASS,
  revealVars,
  useReveal,
} from "@/lib/reveal";

type StaggerContext = {
  visible: boolean;
  /** Seconds between each child's reveal. */
  stagger: number;
  /** Monotonic counter — assigns each item its position in the cascade. */
  next: () => number;
};

const StaggerCtx = createContext<StaggerContext | null>(null);

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

/**
 * Reveals its children one after another when the group scrolls into view.
 * The group is observed once; each item only pays for a CSS transition-delay.
 */
export function AnimateStagger({
  children,
  className,
  stagger = 0.08,
}: StaggerProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const counter = useRef(0);

  const ctx = useMemo<StaggerContext>(() => {
    counter.current = 0;
    return {
      visible,
      stagger,
      next: () => counter.current++,
    };
  }, [visible, stagger]);

  return (
    <div ref={ref} className={className}>
      <StaggerCtx.Provider value={ctx}>{children}</StaggerCtx.Provider>
    </div>
  );
}

export function AnimateStaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(StaggerCtx);
  const indexRef = useRef<number | null>(null);
  if (indexRef.current === null) indexRef.current = ctx?.next() ?? 0;

  const visible = ctx?.visible ?? true;
  const delay = 0.05 + indexRef.current * (ctx?.stagger ?? 0.08);

  return (
    <div
      className={cn(REVEAL_CLASS, visible && REVEAL_VISIBLE_CLASS, className)}
      style={revealVars("up", delay)}
    >
      {children}
    </div>
  );
}
