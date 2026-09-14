"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";

const WATERMARK_SRC = "/images/fmp-logo.png";
/** Zoom is relative to the fit-to-screen size: 1 = page fits the viewport. */
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 4;
const ZOOM_FACTOR = 1.25;

type RenderTask = ReturnType<PDFPageProxy["render"]>;

type ScrollAnchor = {
  /** Focal point as a ratio of the scrollable content. */
  rx: number;
  ry: number;
  /** Focal point's offset inside the visible viewport (px). */
  sx: number;
  sy: number;
};

const clampZoom = (z: number) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z));

type Props = {
  open: boolean;
  onClose: () => void;
  file: string;
  title: string;
};

export function NotePreviewModal({ open, onClose, file, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const renderTaskRef = useRef<RenderTask | null>(null);
  const renderSeqRef = useRef(0);
  const anchorRef = useRef<ScrollAnchor | null>(null);
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef<{ startDist: number; midX: number; midY: number; factor: number } | null>(null);

  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  /** Bumped by the resize observer to trigger a re-fit. */
  const [fitTick, setFitTick] = useState(0);

  const zoomPercent = Math.round(zoom * 100);

  /** Capture the current focal point so the next render keeps it in place. */
  const captureAnchor = useCallback((focalX?: number, focalY?: number) => {
    const el = containerRef.current;
    if (!el) return;
    const sx = focalX ?? el.clientWidth / 2;
    const sy = focalY ?? el.clientHeight / 2;
    anchorRef.current = {
      rx: el.scrollWidth > 0 ? (el.scrollLeft + sx) / el.scrollWidth : 0.5,
      ry: el.scrollHeight > 0 ? (el.scrollTop + sy) / el.scrollHeight : 0.5,
      sx,
      sy,
    };
  }, []);

  const applyZoom = useCallback(
    (next: number, focalX?: number, focalY?: number) => {
      captureAnchor(focalX, focalY);
      setZoom((z) => {
        const target = clampZoom(next);
        return Math.abs(target - z) < 0.001 ? z : target;
      });
    },
    [captureAnchor]
  );

  const zoomIn = useCallback(
    () => applyZoom(zoom * ZOOM_FACTOR),
    [applyZoom, zoom]
  );
  const zoomOut = useCallback(
    () => applyZoom(zoom / ZOOM_FACTOR),
    [applyZoom, zoom]
  );
  const zoomReset = useCallback(() => {
    anchorRef.current = null;
    setZoom(1);
  }, []);

  // Keyboard shortcuts + body scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!open || !pdfDoc) return;
      if (e.key === "ArrowLeft" && pageNum > 1) setPageNum((p) => p - 1);
      if (e.key === "ArrowRight" && pageNum < numPages)
        setPageNum((p) => p + 1);
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        zoomIn();
      }
      if (e.key === "-") {
        e.preventDefault();
        zoomOut();
      }
      if (e.key === "0") {
        e.preventDefault();
        zoomReset();
      }
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, pdfDoc, pageNum, numPages, zoomIn, zoomOut, zoomReset]);

  // Load / unload the document
  useEffect(() => {
    if (!open) {
      setPdfDoc(null);
      setPageNum(1);
      setNumPages(0);
      setError(null);
      setZoom(1);
      anchorRef.current = null;
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setPageNum(1);
    setZoom(1);

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        // Bundled locally — keeps the preview working without internet/CDN.
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();
        const doc = await pdfjs.getDocument(file).promise;
        if (cancelled) {
          doc.destroy();
          return;
        }
        setPdfDoc(doc);
        setNumPages(doc.numPages);
      } catch {
        if (!cancelled) setError("Could not load this PDF for preview.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, file]);

  useEffect(() => {
    return () => {
      renderTaskRef.current?.cancel();
      pdfDoc?.destroy();
    };
  }, [pdfDoc]);

  // Render the current page: fit-to-screen base scale × zoom, at device
  // pixel ratio, into an offscreen canvas first (no flicker, no canvas races).
  useEffect(() => {
    if (!pdfDoc) return;
    const seq = ++renderSeqRef.current;
    let stale = false;

    (async () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      setRendering(true);
      try {
        const page = await pdfDoc.getPage(pageNum);
        if (stale || seq !== renderSeqRef.current) return;

        const base = page.getViewport({ scale: 1 });
        const pad = container.clientWidth < 640 ? 24 : 64;
        const fitScale = Math.max(
          0.1,
          Math.min(
            (container.clientWidth - pad) / base.width,
            (container.clientHeight - pad) / base.height
          )
        );
        const viewport = page.getViewport({ scale: fitScale * zoom });
        const dpr = Math.min(window.devicePixelRatio || 1, 3);

        const off = document.createElement("canvas");
        off.width = Math.floor(viewport.width * dpr);
        off.height = Math.floor(viewport.height * dpr);
        const offCtx = off.getContext("2d");
        if (!offCtx) return;

        renderTaskRef.current?.cancel();
        const task = page.render({
          canvas: off,
          canvasContext: offCtx,
          viewport,
          transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
        });
        renderTaskRef.current = task;
        try {
          await task.promise;
        } catch {
          return; // cancelled by a newer render
        }
        if (stale || seq !== renderSeqRef.current) return;

        canvas.width = off.width;
        canvas.height = off.height;
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;
        canvas.getContext("2d")?.drawImage(off, 0, 0);

        // Restore the focal point captured before zooming.
        const anchor = anchorRef.current;
        anchorRef.current = null;
        requestAnimationFrame(() => {
          const el = containerRef.current;
          if (!el) return;
          if (anchor) {
            el.scrollLeft = anchor.rx * el.scrollWidth - anchor.sx;
            el.scrollTop = anchor.ry * el.scrollHeight - anchor.sy;
          }
        });
      } finally {
        if (seq === renderSeqRef.current) setRendering(false);
      }
    })();

    return () => {
      stale = true;
    };
  }, [pdfDoc, pageNum, zoom, fitTick]);

  // Re-fit on viewport resize / phone rotation
  useEffect(() => {
    if (!open) return;
    const el = containerRef.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(() => setFitTick((n) => n + 1), 150);
    });
    ro.observe(el);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [open, pdfDoc]);

  // Ctrl/trackpad wheel zoom (needs a non-passive listener)
  useEffect(() => {
    if (!open) return;
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      applyZoom(zoom * factor, e.clientX - rect.left, e.clientY - rect.top);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open, pdfDoc, zoom, applyZoom]);

  // Pinch to zoom: live CSS scale during the gesture, real re-render on release
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "touch") return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersRef.current.size === 2) {
      const [a, b] = [...pointersRef.current.values()];
      pinchRef.current = {
        startDist: Math.hypot(a.x - b.x, a.y - b.y),
        midX: (a.x + b.x) / 2,
        midY: (a.y + b.y) / 2,
        factor: 1,
      };
    }
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== "touch" || !pointersRef.current.has(e.pointerId))
        return;
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const pinch = pinchRef.current;
      if (!pinch || pointersRef.current.size < 2) return;
      const [a, b] = [...pointersRef.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch.startDist <= 0) return;
      const raw = dist / pinch.startDist;
      // Keep the live preview within real zoom bounds
      pinch.factor = clampZoom(zoom * raw) / zoom;
      const frame = frameRef.current;
      if (frame) {
        const rect = frame.getBoundingClientRect();
        frame.style.transformOrigin = `${pinch.midX - rect.left}px ${pinch.midY - rect.top}px`;
        frame.style.transform = `scale(${pinch.factor})`;
      }
    },
    [zoom]
  );

  const endPinch = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== "touch") return;
      pointersRef.current.delete(e.pointerId);
      const pinch = pinchRef.current;
      if (pinch && pointersRef.current.size < 2) {
        pinchRef.current = null;
        const frame = frameRef.current;
        if (frame) {
          frame.style.transform = "";
          frame.style.transformOrigin = "";
        }
        if (Math.abs(pinch.factor - 1) > 0.02) {
          const el = containerRef.current;
          const rect = el?.getBoundingClientRect();
          applyZoom(
            zoom * pinch.factor,
            rect ? pinch.midX - rect.left : undefined,
            rect ? pinch.midY - rect.top : undefined
          );
        }
      }
    },
    [zoom, applyZoom]
  );

  const onDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = zoom < 1.45 ? 2 : 1;
      if (next === 1) zoomReset();
      else applyZoom(next, e.clientX - rect.left, e.clientY - rect.top);
    },
    [zoom, applyZoom, zoomReset]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex flex-col bg-navy-900/95 backdrop-blur-sm"
      onContextMenu={(e) => e.preventDefault()}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5 sm:px-6 sm:py-3">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold text-white sm:text-lg">
            {title}
          </p>
          <p className="truncate text-[10px] font-medium uppercase tracking-wider text-white/50 sm:text-[11px]">
            Preview only · not downloadable
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="flex items-center rounded-full bg-white/10 p-0.5">
            <button
              type="button"
              onClick={zoomOut}
              disabled={!pdfDoc || zoom <= ZOOM_MIN}
              aria-label="Zoom out"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-40"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={zoomReset}
              disabled={!pdfDoc}
              aria-label="Reset zoom to fit"
              title="Fit to screen"
              className="min-w-[3.25rem] rounded-full px-1 py-1.5 text-center font-inter text-xs font-semibold tabular-nums text-white/90 transition-colors hover:bg-white/15"
            >
              {zoomPercent}%
            </button>
            <button
              type="button"
              onClick={zoomIn}
              disabled={!pdfDoc || zoom >= ZOOM_MAX}
              aria-label="Zoom in"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-40"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={zoomReset}
            disabled={!pdfDoc}
            aria-label="Fit to screen"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-40 sm:inline-flex"
          >
            <Maximize className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div
        ref={containerRef}
        className="relative flex flex-1 overflow-auto overscroll-contain"
        style={{
          touchAction: "pan-x pan-y",
          scrollbarColor: "rgba(255,255,255,0.35) transparent",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPinch}
        onPointerCancel={endPinch}
        onPointerLeave={endPinch}
        onDoubleClick={onDoubleClick}
      >
        {loading && (
          <p className="m-auto text-sm font-medium text-white/70">
            Loading preview…
          </p>
        )}
        {error && (
          <p className="m-auto px-6 text-center text-sm font-medium text-red-300">
            {error}
          </p>
        )}
        {!loading && !error && (
          <div className="m-auto shrink-0 p-3 sm:p-8">
            <div
              ref={frameRef}
              className="relative shadow-2xl transition-opacity duration-150"
              style={{ opacity: rendering ? 0.6 : 1 }}
            >
              <Image
                src={WATERMARK_SRC}
                alt="Sir Fahad Munaf Parekh Economics notes watermark"
                width={240}
                height={240}
                loading="lazy"
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[72%] w-[72%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-contain opacity-[0.14]"
                draggable={false}
              />
              <canvas
                ref={canvasRef}
                className="relative z-10 select-none bg-white"
              />
            </div>
          </div>
        )}
      </div>

      {!loading && !error && pdfDoc && (
        <footer className="flex shrink-0 flex-wrap items-center justify-center gap-3 border-t border-white/10 px-4 py-2.5 sm:gap-4 sm:py-3">
          {numPages > 1 ? (
            <>
              <button
                type="button"
                disabled={pageNum <= 1}
                onClick={() => setPageNum((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <span className="font-inter text-sm tabular-nums text-white/80">
                Page {pageNum} of {numPages}
              </span>
              <button
                type="button"
                disabled={pageNum >= numPages}
                onClick={() => setPageNum((p) => Math.min(numPages, p + 1))}
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20 disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <span className="font-inter text-xs text-white/60 sm:text-sm">
              Pinch or double-tap to zoom · drag to pan
            </span>
          )}
        </footer>
      )}
    </div>
  );
}
