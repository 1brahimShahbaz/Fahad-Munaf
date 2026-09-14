"use client";

import Image from "next/image";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import type { StudentPhoto } from "@/lib/studentTypes";

type Props = {
  photos: StudentPhoto[];
};

export function StudentLifeSection({ photos }: Props) {
  if (photos.length === 0) return null;

  return (
    <AnimateSection index={3} className="bg-surface py-20 lg:py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <SectionEyebrow>Student life</SectionEyebrow>
          <h2 className="mt-3 font-display text-[32px] font-semibold leading-tight text-navy-900 sm:text-[40px]">
            Learning <span className="italic">together.</span>
          </h2>

        </div>

        <ul className="mt-14 columns-2 gap-4 sm:columns-3 lg:columns-4 lg:gap-5">
          {photos.map((photo) => (
            <li key={photo.id} className="mb-4 break-inside-avoid lg:mb-5">
              <figure className="card-rest overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card-rest">
                <div className="relative w-full overflow-hidden bg-cream-50">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={640}
                    height={800}
                    loading="lazy"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </AnimateSection>
  );
}
