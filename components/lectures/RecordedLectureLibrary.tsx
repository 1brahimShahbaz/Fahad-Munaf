"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ClipboardList,
  LineChart,
  Play,
  Plus,
  Sparkles,
  Store,
} from "lucide-react";
import { VideoLightbox } from "@/components/shared/VideoLightbox";
import { whatsappLink } from "@/lib/constants";

/**
 * "Unlock more videos" opens WhatsApp with the level/strand pre-typed, so the
 * first message already says what the student is asking for.
 */
function unlockLink(level?: string, strand?: string) {
  const what = level && strand ? `${level} ${strand}` : "Economics";
  return whatsappLink(
    `Hi Sir Fahad, I'd like access to the full ${what} lecture library. Could you share the details?`
  );
}
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { CourseLevel } from "@/data/courses";
import {
  lectureCount,
  recordedLectureGroups,
  strandTopics,
  youtubeEmbedUrl,
  youtubeThumbnail,
  type LectureLevelGroup,
  type LectureStrand,
  type RecordedLecture,
  type StrandId,
} from "@/data/recordedLectures";

type ActiveVideo = { url: string; title: string };

const STRAND_ICON: Record<StrandId, typeof Store> = {
  micro: Store,
  macro: LineChart,
  skills: ClipboardList,
  // Catch-all for lectures whose topic is not yet in the generator's PLAN.
  more: Plus,
};

/* ------------------------------------------------------------------ *
 * Lecture card — YouTube facade (thumbnail only until the user clicks)
 * ------------------------------------------------------------------ */

function LectureCard({
  lecture,
  index,
  onPlay,
}: {
  lecture: RecordedLecture;
  index: number;
  onPlay: (lecture: RecordedLecture) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPlay(lecture)}
      aria-label={`Play: ${lecture.title}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-card-rest transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
    >
      <span className="relative block aspect-video w-full overflow-hidden bg-navy-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={youtubeThumbnail(lecture.youtubeId)}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/10 to-transparent"
        />
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-navy-900 group-hover:ring-gold-500"
        >
          <Play className="ml-0.5 h-6 w-6" strokeWidth={2} fill="currentColor" />
        </span>
        <span className="absolute left-3 top-3 inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-navy-900/80 px-2 font-inter text-[11px] font-bold tabular-nums text-gold-500 backdrop-blur-sm">
          {String(lecture.lectureNo ?? index + 1).padStart(2, "0")}
        </span>
      </span>
      <span className="flex flex-1 items-start justify-between gap-3 px-4 py-4">
        <span className="font-display text-[15px] font-semibold leading-snug text-navy-900 transition-colors group-hover:text-gold-500">
          {lecture.title}
        </span>
        <span className="mt-0.5 shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
          Free
        </span>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * Strand (Microeconomics / Macroeconomics) accordion
 * ------------------------------------------------------------------ */

function StrandAccordion({
  strand,
  group,
  isOpen,
  onToggle,
  onPlay,
  onUnlock,
}: {
  strand: LectureStrand;
  group: LectureLevelGroup;
  isOpen: boolean;
  onToggle: () => void;
  onPlay: (lecture: RecordedLecture, group: LectureLevelGroup) => void;
  onUnlock: (location: string) => void;
}) {
  const Icon = STRAND_ICON[strand.id];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-colors duration-200",
        isOpen
          ? "border-gold-500/50 bg-white"
          : "border-gray-200 bg-white hover:border-gold-500/30"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
      >
        <span className="flex min-w-0 items-center gap-3 sm:gap-4">
          <span
            aria-hidden
            className={cn(
              "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
              isOpen ? "bg-gold-500 text-navy-900" : "bg-navy-900 text-white"
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-base font-semibold leading-tight text-navy-900 sm:text-lg">
              {strand.title}
            </span>
            <span className="mt-0.5 block truncate font-inter text-[13px] text-gray-500">
              {strand.blurb}
            </span>
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="hidden rounded-full bg-cream-50 px-2.5 py-1 font-inter text-[11px] font-bold uppercase tracking-[0.12em] text-navy-900 sm:inline-flex">
            {strand.lectures.length} videos
          </span>
          <ChevronDown
            aria-hidden
            className={cn(
              "h-5 w-5 text-navy-900 transition-transform duration-300",
              isOpen && "rotate-180 text-gold-500"
            )}
            strokeWidth={2}
          />
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 bg-cream-50/60 px-4 py-6 sm:px-5">
          <div className="space-y-9">
            {strandTopics(strand).map((topic) => {
              const lectures = strand.lectures.filter((l) => l.topic === topic);
              return (
                <div key={topic}>
                  <div className="mb-4 flex items-baseline gap-3 border-b border-navy-900/10 pb-2">
                    <h4 className="font-display text-lg font-semibold text-navy-900">
                      {topic}
                    </h4>
                    <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                      {lectures.length}{" "}
                      {lectures.length === 1 ? "video" : "videos"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {lectures.map((lecture, i) => (
                      <LectureCard
                        key={lecture.id}
                        lecture={lecture}
                        index={i}
                        onPlay={(l) => onPlay(l, group)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <a
            href={unlockLink(group.label, strand.title)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              onUnlock(
                `lectures_${group.level.toLowerCase()}_${strand.id}_strand`
              )
            }
            className="mt-6 flex items-center justify-between gap-3 rounded-xl bg-navy-900 px-5 py-3.5 font-inter text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-navy-700 hover:text-gold-500"
          >
            <span>
              Unlock more {group.label} {strand.title} videos
            </span>
            <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={2.5} />
          </a>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Level (O / AS / A2) accordion
 * ------------------------------------------------------------------ */

function LevelAccordion({
  group,
  isOpen,
  onToggle,
  openStrandId,
  onToggleStrand,
  onPlay,
  onUnlock,
}: {
  group: LectureLevelGroup;
  isOpen: boolean;
  onToggle: () => void;
  openStrandId: string | null;
  onToggleStrand: (strandKey: string) => void;
  onPlay: (lecture: RecordedLecture, group: LectureLevelGroup) => void;
  onUnlock: (location: string) => void;
}) {
  const total = lectureCount(group);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border transition-all duration-300",
        isOpen
          ? "border-gold-500/50 bg-white shadow-card-hover"
          : "border-gray-200 bg-white shadow-card-rest hover:border-gold-500/40"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors sm:px-7 sm:py-6",
          isOpen
            ? "grad-navy-hard text-white"
            : "bg-white text-navy-900"
        )}
      >
        <span className="flex min-w-0 items-center gap-4">
          <span
            aria-hidden
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-display text-sm font-bold transition-colors",
              isOpen
                ? "bg-gold-500 text-navy-900"
                : "bg-navy-900 text-gold-500"
            )}
          >
            {group.level}
          </span>
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-display text-[22px] font-semibold leading-tight sm:text-[26px]">
                {group.label}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-inter text-[10px] font-bold uppercase tracking-[0.14em]",
                  isOpen
                    ? "bg-white/10 text-gold-500"
                    : "bg-cream-50 text-gray-500"
                )}
              >
                {group.syllabus}
              </span>
            </span>
            <span
              className={cn(
                "mt-1 block font-inter text-[13px] leading-relaxed sm:text-sm",
                isOpen ? "text-white/70" : "text-gray-500"
              )}
            >
              {group.blurb}
            </span>
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-3 sm:gap-4">
          <span
            className={cn(
              "hidden font-inter text-[11px] font-bold uppercase tracking-[0.14em] sm:block",
              isOpen ? "text-gold-500" : "text-gray-500"
            )}
          >
            {total} videos
          </span>
          <span
            aria-hidden
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
              isOpen
                ? "rotate-180 bg-gold-500 text-navy-900"
                : "bg-cream-50 text-navy-900"
            )}
          >
            <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
          </span>
        </span>
      </button>

      {isOpen && (
        <div className="space-y-4 border-t border-gray-100 px-3 py-5 sm:px-5 sm:py-6">
          {group.strands.map((strand) => {
            const key = `${group.level}:${strand.id}`;
            return (
              <StrandAccordion
                key={key}
                strand={strand}
                group={group}
                isOpen={openStrandId === key}
                onToggle={() => onToggleStrand(key)}
                onPlay={onPlay}
                onUnlock={onUnlock}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Library
 * ------------------------------------------------------------------ */

type Props = {
  /** Restrict to specific levels (course pages pass a single level). */
  levels?: CourseLevel[];
  /** Level expanded on first render. Defaults to none — all collapsed. */
  defaultOpenLevel?: CourseLevel;
  /** Hide the closing "unlock everything" panel (course pages have their own CTA). */
  showFooterCta?: boolean;
  className?: string;
};

export function RecordedLectureLibrary({
  levels,
  defaultOpenLevel,
  showFooterCta = true,
  className,
}: Props) {
  const groups = useMemo(
    () =>
      levels
        ? recordedLectureGroups.filter((g) => levels.includes(g.level))
        : recordedLectureGroups,
    [levels]
  );

  const initialLevel = defaultOpenLevel ?? null;
  const [openLevel, setOpenLevel] = useState<CourseLevel | null>(initialLevel);
  const [openStrandId, setOpenStrandId] = useState<string | null>(
    initialLevel ? `${initialLevel}:micro` : null
  );
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);

  const totalVideos = useMemo(
    () => groups.reduce((n, g) => n + lectureCount(g), 0),
    [groups]
  );

  const handleToggleLevel = useCallback((level: CourseLevel) => {
    setOpenLevel((prev) => {
      const next = prev === level ? null : level;
      setOpenStrandId(next ? `${next}:micro` : null);
      return next;
    });
  }, []);

  const handleToggleStrand = useCallback((key: string) => {
    setOpenStrandId((prev) => (prev === key ? null : key));
  }, []);

  const handlePlay = useCallback(
    (lecture: RecordedLecture, group: LectureLevelGroup) => {
      trackEvent("lecture_play", {
        level: group.level,
        title: lecture.title,
        video_id: lecture.youtubeId,
      });
      setActiveVideo({
        url: youtubeEmbedUrl(lecture.youtubeId),
        title: lecture.title,
      });
    },
    []
  );

  const handleUnlock = useCallback((location: string) => {
    trackEvent("whatsapp_click", { context: location });
  }, []);

  return (
    <>
      <div className={cn("space-y-5", className)}>
        {groups.map((group) => (
          <LevelAccordion
            key={group.level}
            group={group}
            isOpen={openLevel === group.level}
            onToggle={() => handleToggleLevel(group.level)}
            openStrandId={openStrandId}
            onToggleStrand={handleToggleStrand}
            onPlay={handlePlay}
            onUnlock={handleUnlock}
          />
        ))}

        {showFooterCta && (
          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 rounded-3xl border border-gold-500/30 bg-gradient-to-b from-cream-50 to-white px-6 py-9 text-center shadow-card-rest">
            <span
              aria-hidden
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500"
            >
              <Sparkles className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <div>
              <h3 className="font-display text-[22px] font-semibold italic leading-tight text-navy-900 sm:text-[26px]">
                That&rsquo;s the free shelf.
              </h3>
              <p className="mt-2 font-inter text-[15px] leading-relaxed text-gray-500">
                These {totalVideos} lectures are a taster of the full
                course. Message Sir Fahad to unlock every topic — full-length
                lectures, past-paper walkthroughs, notes and marking.
              </p>
            </div>
            <a
              href={unlockLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleUnlock("lectures_library_footer")}
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3 font-inter text-sm font-semibold text-navy-900 shadow-cta-glow-sm transition-all hover:bg-gold-300"
            >
              Unlock more videos
              <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        )}
      </div>

      <VideoLightbox
        open={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.url ?? ""}
        title={activeVideo?.title ?? "Recorded lecture"}
      />
    </>
  );
}
