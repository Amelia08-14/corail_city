"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import type { CataloguePage as CataloguePageData } from "@/lib/residences";
import { CataloguePage } from "./CataloguePage";

type PageFlipInstance = {
  flipNext: () => void;
  flipPrev: () => void;
  turnToPage: (page: number) => void;
  getCurrentPageIndex: () => number;
};

type FlipBookHandle = { pageFlip: () => PageFlipInstance };

const navButton =
  "grid h-12 w-12 place-items-center rounded-full border border-white/30 text-lg text-white transition hover:border-gold hover:text-gold disabled:opacity-30";

export function CatalogueFlipbook({ pages }: { pages: CataloguePageData[] }) {
  const bookRef = useRef<FlipBookHandle | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const total = pages.length;

  const goPrev = useCallback(() => bookRef.current?.pageFlip().flipPrev(), []);
  const goNext = useCallback(() => bookRef.current?.pageFlip().flipNext(), []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void rootRef.current?.requestFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  // Les pages sont carrées : un double-page fait 2× la hauteur. On borne la largeur pour que
  // tout le livre tienne dans la fenêtre (ou l'écran en mode plein écran).
  const stageWidth = fullscreen ? "min(100%, calc((100vh - 130px) * 2))" : "min(100%, calc((100vh - 190px) * 2), 1400px)";

  return (
    <div
      ref={rootRef}
      className={`flex flex-col items-center ${fullscreen ? "justify-center bg-navy px-4" : ""}`}
    >
      <div className="flipbook-stage mx-auto w-full" style={{ maxWidth: stageWidth }}>
        <HTMLFlipBook
          ref={bookRef as never}
          className="mx-auto shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
          style={{}}
          width={500}
          height={500}
          size="stretch"
          minWidth={280}
          maxWidth={1100}
          minHeight={280}
          maxHeight={1100}
          startPage={0}
          drawShadow
          flippingTime={650}
          usePortrait
          startZIndex={10}
          autoSize
          maxShadowOpacity={0.4}
          showCover
          mobileScrollSupport={false}
          clickEventForward
          useMouseEvents
          swipeDistance={20}
          showPageCorners
          disableFlipByClick={false}
          onFlip={(event: { data: number }) => setCurrent(event.data)}
        >
          {pages.map((page) => (
            <CataloguePage key={page.page} src={page.src} page={page.page} total={total} density={page.page === 1 || page.page === total ? "hard" : "soft"} />
          ))}
        </HTMLFlipBook>
      </div>

      <div className="mt-8 flex items-center gap-6">
        <button type="button" onClick={goPrev} disabled={current <= 0} className={navButton} aria-label="Page précédente">
          ←
        </button>
        <p className="min-w-[110px] text-center text-sm tracking-[0.15em] text-white/80">
          {String(current + 1).padStart(2, "0")} <span className="text-white/40">/</span> {String(total).padStart(2, "0")}
        </p>
        <button type="button" onClick={goNext} disabled={current >= total - 1} className={navButton} aria-label="Page suivante">
          →
        </button>
        <button
          type="button"
          onClick={toggleFullscreen}
          className={`${navButton} ml-2`}
          aria-label={fullscreen ? "Quitter le plein écran" : "Afficher en plein écran"}
          title={fullscreen ? "Quitter le plein écran" : "Plein écran"}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {fullscreen ? (
              <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
            ) : (
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}
