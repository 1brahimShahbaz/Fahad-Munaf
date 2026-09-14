"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail, MessageCircle, X } from "lucide-react";
import { SITE, TALK_TOPICS, whatsappLink } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Floating "Talk with FMP" dock — one number for everything: WhatsApp chat
 * and pre-typed quick questions. Rendered on every page
 * (except /notes, which has its own sticky WhatsApp bar).
 */
export function TalkWithFMP() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close the dock on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape to close, click outside to dismiss.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      if (!prev) trackEvent("talk_dock_open", { path: pathname });
      return !prev;
    });
  }, [pathname]);

  if (pathname === "/notes") return null;

  return (
    <div
      className={cn(
        "fixed z-40 flex flex-col items-end gap-3 transition-all duration-500 ease-smooth",
        mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
        right: "max(1.25rem, env(safe-area-inset-right, 0px))",
        transitionDelay: mounted ? "400ms" : "0ms",
      }}
    >
      {/* ---------------------------------------------------------- panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Talk with Fahad Munaf Parekh"
          className="w-[min(21rem,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[0_24px_60px_rgba(27,33,69,0.28)] animate-talk-dock-in"
        >
          {/* Header — profile card */}
          <div className="relative isolate overflow-hidden bg-navy-900 px-5 pb-5 pt-5 text-white">
            <div aria-hidden className="absolute inset-0 bg-grid-overlay opacity-40" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat panel"
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <div className="relative flex items-center gap-3.5">
              <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-gold-500/60">
                <Image
                  src="/images/fmp-logo.png"
                  alt=""
                  aria-hidden
                  width={112}
                  height={112}
                  className="h-11 w-11 object-contain"
                />
                <span
                  aria-hidden
                  className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-navy-900 bg-whatsapp"
                />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[19px] font-semibold leading-tight">
                  Talk with FMP
                </p>
                <p className="mt-0.5 font-inter text-[12px] text-white/70">
                  {SITE.personName} · {SITE.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Quick-start chips */}
          <div className="px-5 pt-4">
            <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
              Start the conversation
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {TALK_TOPICS.map((topic) => (
                <a
                  key={topic.id}
                  href={whatsappLink(topic.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", {
                      context: `talk_dock_${topic.id}`,
                    })
                  }
                  className="flex items-center justify-between gap-1.5 rounded-xl border border-gray-200 bg-cream-50 px-3 py-2 font-inter text-[12.5px] font-medium leading-snug text-navy-900 transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:bg-white hover:text-gold-500"
                >
                  <span>{topic.label}</span>
                  <ArrowUpRight className="h-3 w-3 shrink-0" strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 px-5 pb-5 pt-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", { context: "talk_dock_primary" })
              }
              className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 font-inter text-[14px] font-semibold text-white shadow-[0_6px_16px_rgba(37,211,102,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(37,211,102,0.32)]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} fill="white" />
              Chat on WhatsApp
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center justify-center gap-2 border-t border-gray-100 pt-3 font-inter text-[12.5px] font-medium text-gray-500 transition-colors hover:text-navy-900"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={2} />
              Prefer email? {SITE.email}
            </a>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close Talk with FMP" : "Talk with FMP on WhatsApp"}
        className={cn(
          "group relative inline-flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 font-inter text-[14px] font-semibold shadow-[0_12px_32px_rgba(27,33,69,0.35)] transition-all duration-300 ease-smooth hover:-translate-y-0.5 active:scale-95 sm:py-2.5 sm:pr-5",
          open
            ? "bg-navy-900 text-white"
            : "bg-navy-900 text-white hover:bg-navy-700"
        )}
      >
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-whatsapp/40 animate-pulse-ring"
          />
        )}
        <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:h-10 sm:w-10">
          {open ? (
            <X className="h-4 w-4 text-navy-900" strokeWidth={2.5} />
          ) : (
            <Image
              src="/images/fmp-logo.png"
              alt=""
              aria-hidden
              width={80}
              height={80}
              className="h-7 w-7 object-contain sm:h-8 sm:w-8"
            />
          )}
        </span>
        <span className="relative whitespace-nowrap">
          {open ? "Close" : "Talk with FMP"}
        </span>
        {!open && (
          <span
            aria-hidden
            className="relative inline-flex h-2 w-2 shrink-0 rounded-full bg-whatsapp shadow-[0_0_0_3px_rgba(37,211,102,0.25)]"
          />
        )}
      </button>
    </div>
  );
}
