import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AnimateStagger, AnimateStaggerItem } from "@/components/shared/AnimateStagger";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { StudentPhoto } from "@/lib/studentTypes";

type Props = {
  photos: StudentPhoto[];
};

export function ExtraCreditPreview({ photos }: Props) {
  if (photos.length === 0) return null;

  return (
    <AnimateSection index={4} className="bg-surface py-20 lg:py-24">
      <div className="container-x">
        <SectionHeader
          align="left"
          eyebrow="Extra credit"
          title={
            <>
              Life outside the{" "}
              <span className="italic text-gold-500">classroom.</span>
            </>
          }
          subtitle="Photos from student moments, and the community around Sir Fahad's Economics classes."
        />

        <AnimateStagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {photos.map((photo) => (
            <AnimateStaggerItem key={photo.id}>
              <figure className="card-rest overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card-rest">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-50">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={640}
                    height={800}
                    loading="lazy"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </figure>
            </AnimateStaggerItem>
          ))}
        </AnimateStagger>

        <div className="mt-12 flex justify-center">
          <Link href="/extra-credit" className="btn-primary">
            View more
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </AnimateSection>
  );
}
