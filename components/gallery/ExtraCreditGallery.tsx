import { StudentLifeSection } from "@/components/gallery/StudentLifeSection";
import type { StudentPhoto } from "@/lib/studentTypes";

export function ExtraCreditGallery({
  studentPhotos,
}: {
  studentPhotos: StudentPhoto[];
}) {
  return <StudentLifeSection photos={studentPhotos} />;
}
