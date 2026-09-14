"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-navy-900 shadow-cta-glow-sm transition-all duration-300 ease-smooth hover:-translate-y-1 hover:bg-gold-300 hover:shadow-cta-glow active:scale-95 focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
      style={{
        bottom: "max(5.5rem, calc(1.25rem + env(safe-area-inset-bottom, 0px)))",
        right: "max(1.25rem, env(safe-area-inset-right, 0px))",
      }}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}
