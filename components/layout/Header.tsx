"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { NAV_ITEMS, SITE, CTA_LABELS, whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCoursesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  /**
   * Only the homepage has a dark image hero to sit on, so it is the only
   * route that gets the transparent treatment. Everywhere else the header is
   * solid from the top, which keeps navy nav text legible on light pages.
   */
  const overHero = pathname === "/" && !scrolled;

  const navLinkClass = (active: boolean) =>
    cn(
      "nav-link relative inline-flex shrink-0 items-center gap-1 whitespace-nowrap px-2.5 py-2 font-inter text-[13.5px] font-medium transition-colors duration-300 ease-smooth xl:px-3.5 xl:text-[14px]",
      overHero
        ? active
          ? "text-white"
          : "text-white/75 hover:text-white"
        : active
          ? "text-navy-900"
          : "text-gray-500 hover:text-navy-900"
    );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-40 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-smooth",
          overHero ? "site-header--transparent" : "site-header--solid"
        )}
      >
        <div
          className={cn(
            // Full-bleed rather than the 1280px container: the logo sits on the
            // left edge and the nav + CTA on the right, as far apart as possible.
            "flex w-full items-center justify-between gap-4 px-5 transition-[height,padding] duration-500 ease-smooth sm:px-7 lg:px-9 xl:px-12",
            scrolled ? "h-[4.5rem] lg:h-20" : "h-20 lg:h-24"
          )}
        >
          <div className="flex shrink-0 items-center">
            <Logo
              variant={overHero ? "light" : "dark"}
              size="header"
              mark
              interactive
              className="scale-[0.88] origin-left xl:scale-100"
            />
          </div>

          {/* Desktop nav — pill rail */}
          {/* Nav + CTA share one right-hand group so `justify-between` puts
              the logo on the left edge and everything else on the right. */}
          <div className="flex min-w-0 items-center gap-2 xl:gap-5">
            <nav className="hidden min-w-0 lg:flex lg:items-center" aria-label="Main">
            <ul className="flex flex-nowrap items-center gap-0.5 overflow-visible xl:gap-1.5">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <li key={item.label} className="group relative">
                    <button
                      type="button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      aria-current={isActive(item.href) ? "page" : undefined}
                      data-active={isActive(item.href)}
                      className={navLinkClass(isActive(item.href))}
                    >
                      {item.label}
                      <ChevronDown
                        className="h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-300 ease-smooth group-hover:rotate-180"
                        strokeWidth={2.25}
                      />
                    </button>
                    <div className="pointer-events-none invisible absolute left-1/2 top-[calc(100%+0.5rem)] z-50 w-56 -translate-x-1/2 opacity-0 transition-all duration-300 ease-smooth group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                      <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-card-hover ring-1 ring-navy-900/5">
                        <div className="border-b border-gray-100 bg-navy-900 px-4 py-2.5">
                          <p className="font-inter text-[11px] font-semibold uppercase tracking-wider2 text-gold-500">
                            Courses
                          </p>
                        </div>
                        <ul className="p-2">
                          {item.children.map((c) => {
                            const active = isActive(c.href);
                            return (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  aria-current={active ? "page" : undefined}
                                  className={cn(
                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 font-inter text-sm font-medium transition-colors duration-300",
                                    active
                                      ? "bg-gold-500/12 text-gold-700"
                                      : "text-navy-900 hover:bg-gray-50"
                                  )}
                                >
                                  <span
                                    aria-hidden
                                    className={cn(
                                      "h-2 w-2 shrink-0 rounded-full transition-colors duration-300",
                                      active
                                        ? "bg-gold-500 ring-2 ring-gold-500/25"
                                        : "bg-gray-300"
                                    )}
                                  />
                                  {c.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      data-active={isActive(item.href)}
                      className={navLinkClass(isActive(item.href))}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-2 xl:gap-3">
            <Link
              href="/register"
              title={CTA_LABELS.enrollInterest}
              onClick={() =>
                trackEvent("register_click", { location: "header_cta" })
              }
              className={cn(
                "group hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold-500 font-inter font-semibold text-navy-900 shadow-cta-glow-sm transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-cta-glow lg:inline-flex",
                scrolled
                  ? "px-3.5 py-2 text-[13px] xl:px-5 xl:py-2.5 xl:text-[14px]"
                  : "px-3.5 py-2.5 text-[13px] xl:px-5 xl:py-3 xl:text-[14px]"
              )}
            >
              <span className="xl:hidden">{CTA_LABELS.enrollInterestHeader}</span>
              <span className="hidden xl:inline">{CTA_LABELS.enrollInterest}</span>
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 xl:h-4 xl:w-4"
                strokeWidth={2}
              />
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 lg:hidden",
                overHero
                  ? "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  : "border-transparent bg-navy-900 text-white shadow-sm hover:bg-navy-700"
              )}
            >
              <Menu className="h-5 w-5" strokeWidth={2} />
            </button>
            </div>
          </div>
        </div>
      </header>

      <div
        role="presentation"
        onClick={() => setMobileOpen(false)}
        className={cn(
          "fixed inset-0 z-[55] bg-navy-900/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-[60] flex w-full max-w-[min(100%,20rem)] flex-col overflow-hidden bg-navy-900 shadow-2xl transition-transform duration-500 ease-smooth lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Logo variant="light" size="header" mark interactive />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setCoursesOpen((o) => !o)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-inter text-base font-semibold text-white"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gold-500 transition-transform duration-300",
                        coursesOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <ul
                    className={cn(
                      "overflow-hidden pl-3 transition-all duration-300",
                      coursesOpen ? "max-h-48 pb-2 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    {item.children.map((c) => {
                      const active = isActive(c.href);
                      return (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors",
                              active
                                ? "bg-white/10 text-gold-500"
                                : "text-white/80 hover:text-white"
                            )}
                          >
                            <span
                              aria-hidden
                              className={cn(
                                "h-2 w-2 shrink-0 rounded-full transition-colors duration-300",
                                active ? "bg-gold-500" : "bg-white/35"
                              )}
                            />
                            {c.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-xl px-3 py-3 font-inter text-base font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-white/10 text-gold-500"
                        : "text-white/90 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <Link
            href="/register"
            onClick={() =>
              trackEvent("register_click", { location: "mobile_menu" })
            }
            className="btn-primary mt-8 w-full justify-center"
          >
            {CTA_LABELS.enrollInterest}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>

          {/* One number for every message */}
          <div className="mt-6 border-t border-white/10 pt-6">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", { context: "mobile_menu" })
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 font-inter text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} fill="white" />
              Text on WhatsApp
            </a>
            <p className="mt-3 text-center font-inter text-[13px] text-white/60">
              {SITE.phone}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
