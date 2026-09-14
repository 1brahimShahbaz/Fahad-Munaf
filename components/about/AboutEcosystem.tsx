"use client";
import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MonitorPlay, Radio, NotebookText, FileCheck2 } from "lucide-react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { EASE_OUT } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";
import { SITE, whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => (
    <div ref={ref} className={cn("z-10 flex size-14 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-[0_10px_28px_-12px_rgba(10,39,64,0.55)] sm:size-16", className)}>
      {children}
    </div>
  )
);
Circle.displayName = "Circle";

type NodeProps = { nodeRef: React.RefObject<HTMLDivElement>; icon: typeof MonitorPlay; label: string };
function Node({ nodeRef, icon: Icon, label }: NodeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Circle ref={nodeRef} className="text-gold-500">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
      </Circle>
      <span className="max-w-[84px] text-center text-[11px] font-semibold leading-tight text-navy-900 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function AboutEcosystem() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const recordedRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const papersRef = useRef<HTMLDivElement>(null);

  const beam = {
    gradientStartColor: "#F8A830", gradientStopColor: "#FBC470",
    pathColor: "#1B2145", pathOpacity: 0.12, duration: 4.5,
  };

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="relative mx-auto mt-14 flex h-[360px] w-full max-w-3xl items-center justify-center overflow-hidden sm:h-[420px]"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[280px] max-w-2xl items-stretch justify-between">
        <div className="flex flex-col items-center justify-between py-2">
          <Node nodeRef={recordedRef} icon={MonitorPlay} label="Recorded lectures" />
          <Node nodeRef={liveRef} icon={Radio} label="Live sessions" />
        </div>

        {/* The hub is Sir Fahad, not the platform — everything below routes
            through him, and the tile opens WhatsApp like every other CTA. */}
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { context: "about_ecosystem" })}
          aria-label={`Message ${SITE.name} on WhatsApp`}
          className="group flex flex-col items-center justify-center rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2">
          <div ref={centerRef}
            className="z-10 flex size-24 items-center justify-center rounded-3xl border border-gray-200 bg-white p-3.5 shadow-[0_20px_50px_-18px_rgba(248,168,48,0.45)] transition-all duration-300 ease-smooth group-hover:-translate-y-1 group-hover:border-gold-500/40 group-hover:shadow-[0_26px_60px_-16px_rgba(248,168,48,0.6)] sm:size-28">
            <div className="relative h-full w-full">
              <Image src="/images/fmp-mark.png" alt={SITE.name} fill sizes="112px" className="object-contain" />
            </div>
          </div>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider2 text-gold-500 transition-colors group-hover:text-navy-900">
            Message on WhatsApp
          </span>
        </a>

        <div className="flex flex-col items-center justify-between py-2">
          <Node nodeRef={notesRef} icon={NotebookText} label="Notes" />
          <Node nodeRef={papersRef} icon={FileCheck2} label="Past papers" />
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={recordedRef} toRef={centerRef} curvature={-70} endYOffset={-12} delay={0} {...beam} />
      <AnimatedBeam containerRef={containerRef} fromRef={liveRef} toRef={centerRef} curvature={70} endYOffset={12} delay={0.6} {...beam} />
      <AnimatedBeam containerRef={containerRef} fromRef={notesRef} toRef={centerRef} curvature={-70} endYOffset={-12} reverse delay={0.9} {...beam} />
      <AnimatedBeam containerRef={containerRef} fromRef={papersRef} toRef={centerRef} curvature={70} endYOffset={12} reverse delay={1.3} {...beam} />
    </motion.div>
  );
}
