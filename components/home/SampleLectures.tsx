import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { RecordedLectureLibrary } from "@/components/lectures/RecordedLectureLibrary";
import { totalRecordedLectures } from "@/data/recordedLectures";

export function SampleLectures() {
  return (
    <AnimateSection
      id="sample-lectures"
      index={1}
      className="bg-surface py-20 lg:py-24"
    >
      <div className="container-x">
        <SectionHeader
          eyebrow="Recorded Lectures"
          title="Try a CAIE Economics lecture before you register."
          subtitle={`${totalRecordedLectures} full concept lectures, free to watch — pick your level, then Micro or Macro.`}
        />

        <div className="mx-auto mt-12 max-w-5xl">
          <RecordedLectureLibrary />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <Link
            href="/courses/o-level"
            className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-navy-900 hover:text-gold-500"
          >
            O Level course
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <Link
            href="/courses/as-level"
            className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-navy-900 hover:text-gold-500"
          >
            AS Level course
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <Link
            href="/courses/a2-level"
            className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-navy-900 hover:text-gold-500"
          >
            A2 Level course
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </AnimateSection>
  );
}
