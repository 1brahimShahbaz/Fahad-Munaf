import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

type LogoProps = {
  variant?: "light" | "dark";
  withSubline?: boolean;
  size?: "sm" | "md" | "header" | "lg";
  /**
   * Kept for call-site compatibility. The wordmark is already full colour, so
   * there is no tint to opt out of — this no longer changes anything.
   */
  natural?: boolean;
  /**
   * Drop the "Economics by Fahad Munaf Parekh" strapline and show the FMP
   * monogram alone. Used in the header, where the strapline is unreadable at
   * that height and the site name is already in the page title and h1.
   */
  mark?: boolean;
  /** Scale up on hover (header) */
  interactive?: boolean;
  className?: string;
};

/**
 * Both artworks are navy + gold on transparent. On dark backgrounds the navy
 * strokes would vanish, so we swap to the pre-rendered light variant (navy
 * recoloured to white, gold untouched) rather than filtering in CSS — see
 * `scripts/generate-logo-variants.mjs`.
 */
const SRC = {
  full: { dark: "/images/fmp-logo.png", light: "/images/fmp-logo-light.png" },
  mark: { dark: "/images/fmp-mark.png", light: "/images/fmp-mark-light.png" },
} as const;

/** Intrinsic size of each trimmed artwork. */
const DIMS = {
  full: { w: 383, h: 175 },
  mark: { w: 383, h: 109 },
} as const;

/**
 * The monogram is 3.5:1 against the full lockup's 2.2:1, so at a shared height
 * it would render far wider. Its heights are stepped down to keep the header
 * logo the same optical width as before.
 */
const SIZE_CLASSES: Record<
  "full" | "mark",
  Record<NonNullable<LogoProps["size"]>, string>
> = {
  full: {
    sm: "h-9 w-auto sm:h-10",
    header: "h-11 w-auto sm:h-12 lg:h-14",
    md: "h-10 w-auto lg:h-14",
    lg: "h-16 w-auto sm:h-18 lg:h-20",
  },
  mark: {
    sm: "h-6 w-auto sm:h-7",
    header: "h-7 w-auto sm:h-8 lg:h-9",
    md: "h-7 w-auto lg:h-9",
    lg: "h-10 w-auto sm:h-11 lg:h-12",
  },
};

export function Logo({
  variant = "dark",
  size = "md",
  mark = false,
  interactive = false,
  className,
}: LogoProps) {
  const kind = mark ? "mark" : "full";
  const { w, h } = DIMS[kind];

  return (
    <Link
      href="/"
      aria-label={`${SITE.personName} — Home`}
      className={cn(
        "group relative inline-flex shrink-0 items-center",
        !interactive && "transition-opacity duration-300 hover:opacity-90",
        className
      )}
    >
      <Image
        src={SRC[kind][variant]}
        alt={SITE.name}
        width={w}
        height={h}
        priority
        loading="eager"
        sizes={mark ? "160px" : "306px"}
        className={cn(
          SIZE_CLASSES[kind][size],
          interactive &&
            "origin-left transition-transform duration-300 ease-smooth group-hover:scale-105"
        )}
      />
    </Link>
  );
}
