import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, GraduationCap, Sparkles } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/constants";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { MetricCounter } from "@/components/about/MetricCounter";
import { totalRecordedLectures } from "@/data/recordedLectures";
import { teachingAffiliationCount } from "@/data/affiliations";
import { AboutTestimonials } from "@/components/about/AboutTestimonials";
import { SirFahadTagline } from "@/components/about/SirFahadTagline";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Fahad Munaf Parekh | Economics Tutor Karachi",
  titleAbsolute: true,
  description:
    "Meet Sir Fahad Munaf Parekh — A Level and O Level Economics tutor in Karachi. CAIE 9708, O Level 2281 and Edexcel, taught concept-first across Karachi and online.",
  path: "/about",
});

const qualifications = [
  "Cambridge International AS & A Level Economics (9708)",
  "Cambridge O Level Economics (2281)",
  "Microeconomics, macroeconomics, market failure & policy",
  "Essay writing, data response & multiple choice technique",
];

const offerings = [
  "Live online classes with recorded backups",
  "Full syllabus notes and past-paper practice",
  "Free sample lectures for every level",
  "WhatsApp doubt support between sessions",
  "Registration for May/June 2027 — straight over WhatsApp",
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ])
          ),
        }}
      />
      <AnimateSection
        index={0}
        direction="right"
        instant
        className="relative isolate overflow-hidden bg-navy-900 text-white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-0">
          <div className="relative z-10 flex items-center px-6 py-10 sm:px-10 lg:py-14 lg:pl-12 xl:pl-16">
            <div className="max-w-xl">
              <SectionEyebrow>About</SectionEyebrow>
              <h1 className="mt-3 font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[40px] lg:text-[44px]">
                <span className="text-white">Fahad Munaf Parekh</span>
                <span className="mt-1 block text-[0.55em] font-medium not-italic leading-snug text-white/70">
                  Sir Fahad — A Level &amp; O Level Economics tutor in Karachi · CAIE 9708, O Level 2281 &amp; Edexcel
                </span>
              </h1>
              <div className="mt-5 space-y-3.5 text-[15px] leading-[1.7] text-white/85">
                <p>
                  I&rsquo;m Fahad Munaf Parekh — known to students as Sir Fahad — an
                  Economics tutor in Karachi. I teach A Level Economics (CAIE
                  9708 and Edexcel) and O Level and IGCSE Economics (CAIE 2281
                  and 0455) to ambitious students in Karachi and online across
                  Pakistan, guiding them from confusion to confidence and to A
                  and A* grades.
                </p>
                <p>
                  My approach is concept-first: understand the logic behind
                  markets, governments, and global trade, and the rest follows.
                  Once the concepts are clear, essays, diagrams, and
                  data-response answers become straightforward — and strong
                  grades follow.
                </p>
                <p>
                  I teach with patience and structure, whether in person in
                  Karachi or through live online classes. Every topic is broken
                  into clear steps — definition, diagram, analysis, evaluation,
                  and application to unseen scenarios — exactly what CAIE and
                  Edexcel examiners reward.
                </p>
              </div>
              <Link
                href="/courses/as-level"
                className="btn-primary mt-6 text-sm"
              >
                See my courses
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] max-h-[380px] w-full sm:max-h-[420px] lg:aspect-auto lg:max-h-none lg:min-h-[420px]">
            <Image
              src="/images/1.jpeg"
              alt="Sir Fahad Munaf Parekh teaching a full Economics class"
              width={1200}
              height={1600}
              priority
              loading="eager"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 hidden w-px bg-gold-500/40 lg:block"
            />
          </div>
        </div>
      </AnimateSection>

      <AnimateSection index={1} className="border-t border-gray-200/60 bg-surface py-14 lg:py-20">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionEyebrow>Background</SectionEyebrow>
              <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-navy-900 sm:text-[34px]">
                Teaching Economics is what I do — and what I love.
              </h2>
              <div className="mt-6 space-y-4 font-inter text-[15px] leading-[1.75] text-gray-600">
                <p>
                  I am based at {SITE.address}, where I work with students
                  face-to-face and online. Over the years I have built a
                  reputation for explaining difficult ideas — elasticity,
                  market failure, exchange rates, fiscal policy — in plain
                  language that still satisfies the mark scheme.
                </p>
                <p>
                  Thousands of students have passed through my classes, from
                  first-time O Level learners to A2 candidates sitting Paper 3
                  and Paper 4. Many return for the next stage of the syllabus;
                  others refer friends and siblings. That trust is the result of
                  consistent preparation, honest feedback, and lessons that
                  respect your time.
                </p>
                <p>
                  Whether you are starting Economics for the first time or
                  pushing for an A or A* in your final sitting, my goal is the
                  same: give you a clear mental model of the subject, train your
                  exam technique, and support you until you walk into the hall
                  feeling ready.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <GraduationCap
                    className="h-6 w-6 text-gold-500"
                    strokeWidth={1.75}
                  />
                  <h3 className="font-display text-[20px] font-semibold text-navy-900">
                    Syllabi & topics
                  </h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {qualifications.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 font-inter text-[14px] leading-relaxed text-gray-600"
                    >
                      <Sparkles
                        aria-hidden
                        className="mt-0.5 h-4 w-4 shrink-0 text-gold-500"
                        strokeWidth={2}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <BookOpen
                    className="h-6 w-6 text-gold-500"
                    strokeWidth={1.75}
                  />
                  <h3 className="font-display text-[20px] font-semibold text-navy-900">
                    What you get as a student
                  </h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {offerings.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 font-inter text-[14px] leading-relaxed text-gray-600"
                    >
                      <Check
                        aria-hidden
                        className="mt-0.5 h-4 w-4 shrink-0 text-gold-500"
                        strokeWidth={2.5}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="font-inter text-[14px] leading-relaxed text-gray-500">
                Questions before you enrol? Reach me on{" "}
                <a
                  href={whatsappLink()}
                  className="font-semibold text-gold-500 hover:text-navy-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>{" "}
                or via the{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-gold-500 hover:text-navy-900"
                >
                  contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </AnimateSection>

      <AnimateSection index={2} className="bg-surface py-16 lg:py-24">
        <div className="container-x">
          <SirFahadTagline />

          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-12 sm:mt-20 sm:grid-cols-2 sm:gap-16">
            <MetricCounter
              value={totalRecordedLectures}
              suffix="+"
              label="Free Recorded Lectures"
              subline="O Level, AS & A2 — on YouTube"
              separator=""
            />
            <MetricCounter
              value={teachingAffiliationCount}
              label="Institutions"
              subline="Morning & evening blocks in Karachi"
              separator=""
            />
          </div>
        </div>
      </AnimateSection>

      <AboutTestimonials />
    </>
  );
}
