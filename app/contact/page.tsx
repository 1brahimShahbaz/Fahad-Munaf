import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { AnimateStagger, AnimateStaggerItem } from "@/components/shared/AnimateStagger";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { ObfuscatedEmail } from "@/components/shared/ObfuscatedEmail";
import { HoursCard } from "@/components/contact/HoursCard";
import { FeedbackFormLazy } from "@/components/contact/FeedbackFormLazy";
import { ContactMapSection } from "@/components/contact/ContactMapSection";
import { TalkWithFMPBand } from "@/components/shared/TalkWithFMPBand";
import { SITE } from "@/lib/constants";
import { breadcrumbJsonLd, buildMetadata, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Fahad Munaf Parekh | Economics Tutor Karachi",
  titleAbsolute: true,
  description:
    "Get in touch with Fahad Munaf Parekh — Economics tutor in Karachi, Pakistan. Register for A Level or O Level Economics courses, in-person or online.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />

      <AnimateSection index={0} instant className="bg-surface pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="container-x">
          <SectionEyebrow>Get In Touch</SectionEyebrow>
          <h1 className="mt-3 font-display text-[44px] font-semibold italic leading-tight text-navy-900 sm:text-[56px]">
            Let&rsquo;s talk.
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-gray-500">
            Have a question about a course, class timings, or anything else?
            Message Sir Fahad directly — every query gets a personal reply.
          </p>
        </div>
      </AnimateSection>

      <AnimateSection index={1} className="bg-surface pb-12">
        <div className="container-x">
          <AnimateStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimateStaggerItem>
            <div className="card-rest rounded-2xl bg-white p-6 transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Phone className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">
                WhatsApp
              </p>
              <p className="mt-1.5 font-display text-[20px] font-semibold text-navy-900">
                {SITE.phone || "Message on WhatsApp"}
              </p>
              <div className="mt-3 flex gap-3 text-sm font-medium">
                <a
                  href={SITE.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-500 hover:text-gold-300"
                >
                  Text on WhatsApp →
                </a>
              </div>
            </div>
            </AnimateStaggerItem>

            <AnimateStaggerItem>
            <div className="card-rest rounded-2xl bg-white p-6 transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Mail className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">
                Email
              </p>
              <p className="mt-1.5 font-display text-[20px] font-semibold text-navy-900">
                <ObfuscatedEmail label="Email Sir Fahad" />
              </p>
              <ObfuscatedEmail
                showAddress={false}
                label="Send an email →"
                className="mt-3 inline-block text-sm font-medium text-gold-500 hover:text-gold-300"
              />
            </div>
            </AnimateStaggerItem>

            <AnimateStaggerItem>
            <div className="card-rest rounded-2xl bg-white p-6 transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <MapPin className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">
                Visit
              </p>
              <p className="mt-1.5 font-display text-[18px] font-semibold leading-snug text-navy-900">
                {SITE.address}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(SITE.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-gold-500 hover:text-gold-300"
              >
                Get directions →
              </a>
            </div>
            </AnimateStaggerItem>
          </AnimateStagger>

          <AnimateIn direction="up" delay={0.15} className="mt-5">
            <HoursCard />
          </AnimateIn>
        </div>
      </AnimateSection>

      <TalkWithFMPBand source="contact" index={2} />

      <AnimateSection index={2} className="bg-surface pb-12 lg:pb-16">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Feedback</SectionEyebrow>
            <h2 className="mt-3 font-display text-[32px] font-semibold italic leading-tight text-navy-900 sm:text-[40px]">
              We&rsquo;d love to hear from you.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
              Share your experience, suggestions, or questions. Every message is
              read by Sir Fahad&rsquo;s team.
            </p>
          </div>
          <AnimateIn direction="up" delay={0.1} className="mx-auto mt-10 max-w-2xl">
            <FeedbackFormLazy />
          </AnimateIn>
        </div>
      </AnimateSection>

      <AnimateSection index={3} className="bg-surface pb-20 lg:pb-24">
        <div className="container-x">
          <AnimateIn direction="up" delay={0.1}>
            <ContactMapSection />
          </AnimateIn>
        </div>
      </AnimateSection>
    </>
  );
}
