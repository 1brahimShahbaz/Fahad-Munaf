import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionEyebrow } from "./SectionEyebrow";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  /** Use on navy/dark section backgrounds */
  variant?: "light" | "dark";
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "light",
  className,
  titleClassName,
}: Props) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "left" && "max-w-2xl",
        className
      )}
    >
      {eyebrow ? (
        <SectionEyebrow className={isDark ? "text-gold-500" : undefined}>
          {eyebrow}
        </SectionEyebrow>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-balance font-display text-[34px] font-semibold leading-tight sm:text-[42px]",
          isDark ? "text-white" : "text-navy-900",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-3 max-w-xl font-inter text-[16px] leading-relaxed",
            align === "center" && "mx-auto",
            isDark ? "text-white/70" : "text-gray-500"
          )}
        >
          {subtitle}
        </p>
      ) : null}
      <div
        aria-hidden
        className={cn(
          "section-title-line mt-5",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
