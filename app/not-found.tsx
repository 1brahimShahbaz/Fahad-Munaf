import Link from "next/link";
import { AnimateSection } from "@/components/shared/AnimateSection";

export default function NotFound() {
  return (
    <AnimateSection
      direction="up"
      className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden bg-surface px-6 py-20"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(27,33,69,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(27,33,69,0.06)_1px,transparent_1px)] bg-[size:48px_48px]"
      />
      <div className="relative text-center">
        <h1 className="font-display text-[120px] font-bold italic leading-none text-navy-900 sm:text-[180px]">
          4
          <span className="relative inline-block">
            0
            <span
              aria-hidden
              className="absolute -bottom-3 left-1/2 h-1.5 w-12 -translate-x-1/2 bg-gold-500"
            />
          </span>
          4
        </h1>
        <h2 className="mt-6 font-display text-[28px] font-medium text-navy-900 sm:text-[34px]">
          Looks like this page is off the curve.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[16px] text-gray-500">
          The link you followed doesn&rsquo;t exist — try the homepage or browse
          the courses.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            Go home
          </Link>
          <Link href="/courses/as-level" className="btn-outline-navy">
            Browse courses
          </Link>
        </div>
      </div>
    </AnimateSection>
  );
}
