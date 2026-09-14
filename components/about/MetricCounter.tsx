"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

type MetricProps = {
  value: number;
  suffix?: string;
  suffixSize?: "lg" | "md" | "sm";
  label: string;
  subline?: string;
  separator?: string;
};

export function MetricCounter({
  value,
  suffix = "+",
  suffixSize = "lg",
  label,
  subline,
  separator = ",",
}: MetricProps) {
  /* threshold 0.3 often never fires on mobile (short viewport, IO quirks). */
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "0px 0px 25% 0px",
  });

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const suffixClass =
    suffixSize === "lg"
      ? "text-[64px] sm:text-[72px]"
      : suffixSize === "md"
        ? "text-[40px] sm:text-[48px]"
        : "text-[28px] sm:text-[34px]";

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-baseline justify-center font-space tabular-nums leading-none">
        <span className="text-[72px] font-bold text-navy-900 sm:text-[96px]">
          {inView ? (
            reducedMotion ? (
              value.toLocaleString("en-US")
            ) : (
              <CountUp
                end={value}
                duration={2}
                separator={separator}
                preserveValue
                useEasing
              />
            )
          ) : (
            0
          )}
        </span>
        <span
          className={`ml-1 font-bold text-gold-500 ${suffixClass}`}
        >
          {suffix}
        </span>
      </div>
      <div className="mx-auto mt-3 h-0.5 w-10 bg-gold-500" />
      <p className="mt-4 text-[14px] font-semibold uppercase tracking-wider2 text-navy-900">
        {label}
      </p>
      {subline && (
        <p className="mt-1 text-[13px] text-gray-500">{subline}</p>
      )}
    </div>
  );
}
