"use client";

import { useCallback, useRef, useState } from "react";
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

export function CatalogueFlipbook({ pages }: { pages: CataloguePageData[] }) {
  const bookRef = useRef<FlipBookHandle | null>(null);
  const [current, setCurrent] = useState(0);
  const total = pages.length;

  const goPrev = useCallback(() => bookRef.current?.pageFlip().flipPrev(), []);
  const goNext = useCallback(() => bookRef.current?.pageFlip().flipNext(), []);

  return (
    <div className="flex flex-col items-center">
      <div className="flipbook-stage w-full max-w-[900px]">
        <HTMLFlipBook
          ref={bookRef as never}
          className="mx-auto shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
          style={{}}
          width={500}
          height={500}
          size="stretch"
          minWidth={280}
          maxWidth={760}
          minHeight={280}
          maxHeight={760}
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
        <button
          type="button"
          onClick={goPrev}
          disabled={current <= 0}
          className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-lg text-white transition hover:border-gold hover:text-gold disabled:opacity-30"
          aria-label="Page précédente"
        >
          ←
        </button>
        <p className="min-w-[110px] text-center text-sm tracking-[0.15em] text-white/80">
          {String(current + 1).padStart(2, "0")} <span className="text-white/40">/</span> {String(total).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={goNext}
          disabled={current >= total - 1}
          className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-lg text-white transition hover:border-gold hover:text-gold disabled:opacity-30"
          aria-label="Page suivante"
        >
          →
        </button>
      </div>
    </div>
  );
}
