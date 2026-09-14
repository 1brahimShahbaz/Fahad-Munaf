import type { Metadata } from "next";
import {
  CalendarCheck,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { RegistrationForm } from "@/components/register/RegistrationForm";
import { CTA_LABELS, SITE, whatsappLink, registerLink } from "@/lib/constants";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Register | Economics Tuition with Fahad Munaf Parekh",
  description:
    "Register for O Level, AS Level or A2 Level Economics tuition with Fahad Munaf Parekh. Fill in your details and the team will get back to you with the next steps.",
  path: "/register",
});

const perks = [
  {
    icon: CalendarCheck,
    title: "Quick response",
    text: "Sir Fahad's team reviews every registration and replies personally.",
  },
  {
    icon: ShieldCheck,
    title: "Private & secure",
    text: "Your details are sent straight to us and never shared with anyone.",
  },
  {
    icon: MessageCircle,
    title: "Prefer WhatsApp?",
    text: "You can also reach out directly for an instant conversation.",
  },
];

export default function RegisterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Register", path: "/register" },
            ])
          ),
        }}
      />
      <AnimateSection index={0} instant className="bg-surface pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="container-x">
          <SectionEyebrow>Enrolment</SectionEyebrow>
          <h1 className="mt-3 font-display text-[44px] font-semibold italic leading-tight text-navy-900 sm:text-[56px]">
            {CTA_LABELS.enrollInterest}
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-gray-500">
            Fill in your details and Sir Fahad&rsquo;s team will get back to you
            with the next steps.
          </p>
        </div>
      </AnimateSection>

      <AnimateSection index={1} className="bg-surface pb-20 lg:pb-24">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <AnimateIn direction="up">
              <RegistrationForm />
            </AnimateIn>

            <AnimateIn direction="up" delay={0.1} className="space-y-5">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="card-rest rounded-2xl bg-cream-50 p-6"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <perk.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
                    {perk.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                    {perk.text}
                  </p>
                </div>
              ))}

              <a
                href={registerLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-navy w-full justify-center"
              >
                {CTA_LABELS.registerWhatsApp}
                <ExternalLink className="h-4 w-4" strokeWidth={2} />
              </a>

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center"
              >
                Message us on WhatsApp
              </a>
              <p className="text-center text-xs text-gray-500">
                Or text{" "}
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy-900 underline-offset-2 hover:text-gold-500 hover:underline"
                >
                  {SITE.phone || "on WhatsApp"}
                </a>
              </p>
            </AnimateIn>
          </div>
        </div>
      </AnimateSection>
    </>
  );
}
