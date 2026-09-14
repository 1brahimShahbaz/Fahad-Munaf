import { BookOpen, Calendar, Clock, type LucideIcon, Monitor } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AnimateStagger, AnimateStaggerItem } from "@/components/shared/AnimateStagger";

type StatItem = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export function CourseAtAGlance({
  syllabus,
  duration,
  format,
  start,
}: {
  syllabus: string;
  duration: string;
  format: string;
  start: string;
}) {
  const items: StatItem[] = [
    { icon: BookOpen, label: "Syllabus", value: syllabus },
    { icon: Clock, label: "Duration", value: duration },
    { icon: Monitor, label: "Format", value: format },
    { icon: Calendar, label: "Start", value: start },
  ];

  return (
    <AnimateSection index={1} className="bg-surface py-12 lg:py-14">
      <div className="container-x">
        <AnimateStagger className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {items.map(({ icon: Icon, label, value }) => (
            <AnimateStaggerItem key={label}>
            <div
              className="rounded-2xl bg-cream-50 p-6 transition-all hover:-translate-y-0.5"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">
                {label}
              </p>
              <p className="mt-1.5 font-display text-[22px] font-semibold leading-tight text-navy-900">
                {value}
              </p>
            </div>
            </AnimateStaggerItem>
          ))}
        </AnimateStagger>
      </div>
    </AnimateSection>
  );
}
