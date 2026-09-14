"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { FooterAffiliations } from "@/components/layout/FooterAffiliations";
import { Logo } from "@/components/shared/Logo";
import { ObfuscatedEmail } from "@/components/shared/ObfuscatedEmail";
import { SITE, CTA_LABELS, whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: CTA_LABELS.enrollInterest, href: "/register" },
  { label: "About", href: "/about" },
  { label: "Notes", href: "/notes" },
  { label: "Extra Credit", href: "/extra-credit" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const courseLinks = [
  { label: "AS Level", href: "/courses/as-level" },
  { label: "A2 Level", href: "/courses/a2-level" },
  { label: "O Level", href: "/courses/o-level" },
];

const SocialIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M21.582 7.156c-.232-.879-.913-1.567-1.787-1.804C18.213 4.92 12 4.92 12 4.92s-6.213 0-7.794.432c-.875.237-1.555.925-1.787 1.804C2 8.747 2 12 2 12s0 3.253.418 4.844c.232.879.913 1.567 1.787 1.804C5.787 19.08 12 19.08 12 19.08s6.213 0 7.794-.432c.875-.237 1.555-.925 1.787-1.804C22 15.253 22 12 22 12s0-3.253-.418-4.844zM10 15V9l5 3-5 3z" />
        </svg>
      );
    case "WhatsApp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l.601.953-.79 2.886 2.967-.798zm10.45-6.108c-.074-.124-.272-.198-.57-.347-.296-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
        </svg>
      );
    default:
      return null;
  }
};

const socials = [
  { name: "Facebook", href: SITE.socials.facebook, label: "Facebook" },
  { name: "Instagram", href: SITE.socials.instagram, label: "Instagram" },
  { name: "YouTube", href: SITE.socials.youtube, label: "YouTube" },
  { name: "WhatsApp", href: SITE.socials.whatsapp, label: "WhatsApp" },
];

export function Footer() {
  // The homepage shows Affiliations as its own section above "On the feed"
  // instead of down here, so it isn't skipped by people who never scroll to
  // the footer.
  const isHome = usePathname() === "/";

  return (
    <footer className="relative bg-navy-900 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
      />
      <div className="container-x py-16 lg:py-20">
        {!isHome && <FooterAffiliations />}

        <div
          className={cn(
            "grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4",
            !isHome && "mt-16 lg:mt-20"
          )}
        >
          <div>
            <Logo variant="light" size="lg" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Premium Economics tutoring designed to cultivate analytical minds
              and exceptional exam results.
            </p>
            <Link href="/register" className="btn-primary mt-6">
              {CTA_LABELS.enrollInterest}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-700 text-white transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-gold-500 hover:text-navy-900 hover:shadow-cta-glow-sm"
                >
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold text-gold-500">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold text-gold-500">
              Courses
            </h4>
            <ul className="mt-5 space-y-3">
              {courseLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold text-gold-500">
              Contact
            </h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link inline-flex items-start gap-2.5"
                >
                  <MessageCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold-500"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <ObfuscatedEmail
                  className="footer-link inline-flex items-start gap-2.5"
                  label="Email us"
                >
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold-500"
                    strokeWidth={2}
                    aria-hidden
                  />
                </ObfuscatedEmail>
              </li>
              <li className="flex items-start gap-2.5 text-white/80">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-500"
                  strokeWidth={2}
                  aria-hidden
                />
                <span>{SITE.address}</span>
              </li>
              <li>
                <a
                  href={SITE.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gold-500 hover:text-gold-300"
                >
                  WhatsApp Support →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            <span className="ml-2 text-white/40">
              Academic excellence in Economics.
            </span>
          </p>
          <p className="text-xs text-white/40">Built with care.</p>
        </div>
      </div>
    </footer>
  );
}
