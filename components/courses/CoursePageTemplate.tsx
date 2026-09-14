"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { CourseAtAGlance } from "./CourseAtAGlance";
import { RecordedLectureLibrary } from "@/components/lectures/RecordedLectureLibrary";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { RegistrationBanner } from "@/components/home/RegistrationBanner";
import type { CourseContent } from "@/data/courses";
import {
  lectureCount,
  recordedLecturesByLevel,
} from "@/data/recordedLectures";
import type { NoteGroup } from "@/lib/notesTypes";
import { countNoteFiles } from "@/lib/notesTypes";
import { CTA_LABELS, registerLink } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const NotesExplorer = dynamic(
  () =>
    import("@/components/notes/NotesExplorer").then((mod) => ({
      default: mod.NotesExplorer,
    })),
  { ssr: false }
);

export function CoursePageTemplate({
  course,
  studyNoteGroups,
}: {
  course: CourseContent;
  studyNoteGroups: NoteGroup[];
}) {
  const lectureGroup = recordedLecturesByLevel[course.level];
  const lectureTotal = lectureCount(lectureGroup);
  const noteCount = countNoteFiles(studyNoteGroups);

  return (
    <>
      <AnimateSection
        index={0}
        direction="right"
        instant
        className="relative isolate overflow-hidden bg-navy-900 text-white"
      >
        <div className="grid min-h-[60vh] grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative flex items-center px-6 py-16 sm:px-10 lg:py-24 lg:pl-16">
            <div className="max-w-xl">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-1.5 text-[13px] text-white/60"
              >
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                <Link href="/courses/as-level" className="hover:text-white">
                  Courses
                </Link>
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                <span className="text-white">{course.badgeLabel}</span>
              </nav>
              <span className="mt-5 inline-flex items-center rounded-full bg-gold-500 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider2 text-navy-900">
                {course.badgeLabel} · {course.badgeSubLabel}
              </span>
              <h1 className="mt-5 font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]">
                {course.headline}{" "}
                <span className="italic text-gold-500">Sir Fahad Munaf Parekh.</span>
              </h1>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/80">
                {course.subhead}
              </p>
              <a
                href={registerLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("register_click", {
                    location: `course_${course.slug}_hero`,
                  })
                }
                className="btn-primary mt-8 inline-flex items-center gap-2"
              >
                {CTA_LABELS.registerWhatsApp}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
          <div className="relative min-h-[280px]">
            <Image
              src={course.heroImage}
              alt={`${course.badgeLabel} Economics with Sir Fahad Munaf Parekh — CAIE tutor`}
              width={1400}
              height={933}
              priority
              loading="eager"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </AnimateSection>

      <RegistrationBanner
        title={course.ctaTitle}
        subtitle={course.ctaSubhead}
        badge="Registrations Open"
        source={`course_${course.slug}_banner`}
        registerHref={registerLink()}
      />

      <CourseAtAGlance
        syllabus={course.syllabus}
        duration={course.duration}
        format={course.format}
        start={course.start}
      />

      <AnimateSection index={2} className="bg-surface py-20 lg:py-24">
        <div className="container-x">
          <div className="max-w-2xl">
            <SectionEyebrow>Recorded Lectures</SectionEyebrow>
            <h2 className="mt-3 font-display text-[32px] font-semibold leading-tight text-navy-900 sm:text-[40px]">
              Try a lecture before you register.
            </h2>
            <p className="mt-3 text-[16px] text-gray-500">
              {lectureTotal} {course.badgeLabel} ({course.syllabus}) lectures are
              free to watch below — open Microeconomics or Macroeconomics and
              press play. Message Sir Fahad to unlock the full course.
            </p>
          </div>
          <div className="mt-12 max-w-4xl">
            <RecordedLectureLibrary
              levels={[course.level]}
              defaultOpenLevel={course.level}
            />
          </div>
        </div>
      </AnimateSection>

      <AnimateSection index={3} className="bg-surface py-20 lg:py-24">
        <div className="container-x">
          <div className="max-w-2xl">
            <SectionEyebrow>Sample Notes</SectionEyebrow>
            <h2 className="mt-3 font-display text-[32px] font-semibold leading-tight text-navy-900 sm:text-[40px]">
              Notes built for {course.badgeLabel} students.
            </h2>
            <p className="mt-3 text-[16px] text-gray-500">
              {noteCount > 0
                ? `${noteCount} PDF${noteCount === 1 ? "" : "s"} available to preview — in-browser only, not downloadable.`
                : course.description}
            </p>
          </div>
          <div className="mt-12 max-w-4xl">
            <NotesExplorer groups={studyNoteGroups} />
          </div>
        </div>
      </AnimateSection>
    </>
  );
}
