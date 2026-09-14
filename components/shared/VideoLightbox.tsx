"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  /** Embeds default to 16:9; set for vertical sources such as YouTube Shorts. */
  portrait?: boolean;
};

export function VideoLightbox({
  open,
  onClose,
  videoUrl,
  title,
  portrait = false,
}: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const isLocalVideo = /\.(mp4|webm|mov)$/i.test(videoUrl);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        aria-label="Close video"
        className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {isLocalVideo ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            className="block max-h-[88vh] max-w-[92vw] bg-black"
          />
        ) : (
          <div
            className={
              portrait
                ? "aspect-[9/16] h-[88vh] max-h-[88vh] w-auto bg-black"
                : "aspect-video w-full max-w-4xl bg-black"
            }
          >
            <iframe
              src={`${videoUrl}?autoplay=1&rel=0`}
              title={title || "Sample lecture"}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
