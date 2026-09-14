import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AnimateStagger, AnimateStaggerItem } from "@/components/shared/AnimateStagger";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SampleNoteCard } from "@/components/shared/SampleNoteCard";
import type { NoteResource } from "@/data/notes";
import { whatsappLink } from "@/lib/constants";

export function SampleNotes({ notes }: { notes: NoteResource[] }) {
  if (notes.length === 0) return null;

  return (
    <AnimateSection index={2} className="bg-surface py-20 lg:py-24">
      <div className="container-x">
        <SectionHeader
          align="left"
          eyebrow="Economics Notes"
          title="A Level & O Level Economics notes that click."
          subtitle="Concise, exam-ready summaries — preview samples in-browser before you enrol."
        />
        <AnimateStagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {notes.map((n) => (
            <AnimateStaggerItem key={n.id}>
              <SampleNoteCard note={n} />
            </AnimateStaggerItem>
          ))}
        </AnimateStagger>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-navy-900 hover:text-gold-500"
          >
            Browse all notes & past papers
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <Link
            href={whatsappLink(
              "Hi Sir Fahad, I'd like to request the full notes pack."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-6 py-3 text-[15px] font-medium text-navy-900"
          >
            <MessageCircle
              className="h-4 w-4 text-whatsapp"
              strokeWidth={2}
              fill="currentColor"
            />
            Request full pack on WhatsApp
          </Link>
        </div>
      </div>
    </AnimateSection>
  );
}
