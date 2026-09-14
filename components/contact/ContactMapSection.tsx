import { MapPin, Navigation } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { SITE } from "@/lib/constants";

const directionsUrl = `https://maps.google.com/?q=${encodeURIComponent(SITE.address)}`;

export function ContactMapSection() {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow>Find Us</SectionEyebrow>
        <h2 className="mt-3 font-display text-[32px] font-semibold italic leading-tight text-navy-900 sm:text-[40px]">
          Find us in Karachi.
        </h2>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-3xl border border-gray-200/90 bg-navy-900 shadow-card-hover ring-1 ring-navy-900/5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-navy-900 via-gold-500 to-navy-900"
        />

        <div className="relative aspect-[4/3] min-h-[300px] sm:aspect-[16/10] sm:min-h-[380px] lg:min-h-[440px]">
          <iframe
            src={SITE.mapEmbed}
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sir Fahad Munaf Parekh — Economics classes in Karachi"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
          />

          {/* Soft vignette so the location card reads clearly over the map */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/50 via-navy-900/5 to-transparent"
          />

          <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[min(100%,22rem)] lg:bottom-8 lg:left-8">
            <div className="rounded-2xl border border-white/20 bg-white/95 p-5 shadow-[0_16px_48px_rgba(27,33,69,0.18)] backdrop-blur-md sm:p-6">
              <div className="flex items-start gap-3">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <MapPin className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">
                    Teaching location
                  </p>
                  <p className="mt-1 font-display text-[17px] font-semibold leading-snug text-navy-900">
                    {SITE.address}
                  </p>
                </div>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5 w-full justify-center px-5 py-3 text-[14px] sm:w-auto"
              >
                <Navigation className="h-4 w-4" strokeWidth={2} aria-hidden />
                Get directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
