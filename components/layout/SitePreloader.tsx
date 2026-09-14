"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Branded loading overlay — deliberately cheap, because a loader that outstays
 * its welcome *is* the lag the user feels.
 *
 * Rules:
 *  - Homepage only. Deep links (blog, courses, notes) paint immediately; they
 *    never waited on the homepage hero anyway.
 *  - Once per session. Returning to the homepage later in the visit is instant.
 *  - Waits on the hero (LCP) image only — never on fonts (`display: swap`
 *    already handles those) and never on below-the-fold media.
 *  - Hard cap well under a second so a slow network can't hold the page hostage.
 */

/** LCP image on the homepage — the only asset worth waiting on. */
const HERO_IMAGE = "/images/banner1.webp";
/** Safety cap — only used if the hero image hangs. */
const MAX_VISIBLE_MS = 1200;
/** Session key so the loader plays once, not on every homepage visit. */
const SEEN_KEY = "zm:preloader-seen";

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    const finish = () => resolve();
    img.onload = finish;
    img.onerror = finish;
    img.src = src;
    if (img.complete) finish();
  });
}

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function SitePreloader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Start "removed" and only opt in after mount, so the overlay never appears
  // on pages (or repeat visits) that shouldn't have it.
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!isHome || alreadySeen()) return;

    setActive(true);
    document.body.style.overflow = "hidden";

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* private mode — just don't remember it */
      }
      document.body.style.overflow = "";
      setHidden(true);
      window.setTimeout(() => setActive(false), 600);
    };

    preloadImage(HERO_IMAGE).then(finish);
    const maxTimer = window.setTimeout(finish, MAX_VISIBLE_MS);

    return () => {
      window.clearTimeout(maxTimer);
      document.body.style.overflow = "";
    };
  }, [isHome]);

  if (!active) return null;

  return (
    <div
      className={cn("fmp-preloader", hidden && "fmp-preloader--hidden")}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      aria-hidden={hidden}
    >
      <div className="fmp-preloader__stage">
        <div className="fmp-preloader__logo">
          <span className="fmp-preloader__base" />
          <span className="fmp-preloader__fill" />
        </div>
        <span className="fmp-preloader__bar">
          <i />
        </span>
      </div>
    </div>
  );
}
