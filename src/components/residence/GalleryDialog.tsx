"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Residence } from "@/lib/residences";
import { useNativeDialog } from "@/lib/useNativeDialog";

export function GalleryDialog({
  residence,
  index,
  onClose,
  onStep,
}: {
  residence: Residence;
  index: number | null;
  onClose: () => void;
  onStep: (direction: 1 | -1) => void;
}) {
  const ref = useNativeDialog(index !== null, onClose);
  const touchStart = useRef<number | null>(null);
  const item = index !== null ? residence.gallery[index] : null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    function onKeydown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onStep(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onStep(1);
      }
    }
    dialog.addEventListener("keydown", onKeydown);
    return () => dialog.removeEventListener("keydown", onKeydown);
  }, [ref, onStep]);

  return (
    <dialog
      ref={ref}
      className="w-[1150px] max-w-[calc(100vw-32px)] overflow-hidden bg-midnight text-white"
      aria-labelledby="gallery-title"
    >
      <button type="button" className="dialog-close" onClick={onClose} aria-label="Fermer la galerie">
        ×
      </button>
      {item ? (
        <>
          <div
            className="relative h-[55dvh] max-h-[740px] w-full bg-[#06192b] md:h-[min(67dvh,740px)]"
            onTouchStart={(event) => {
              touchStart.current = event.changedTouches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchStart.current === null) return;
              const distance = event.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(distance) > 45) onStep(distance > 0 ? -1 : 1);
              touchStart.current = null;
            }}
          >
            <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 1150px, 100vw" className="object-contain" />
          </div>
          <div className="flex items-center justify-between gap-5 px-6 py-6 md:px-8">
            <div>
              <p className="mb-2 text-[0.65rem] tracking-[0.15em] text-ice">
                {String(index! + 1).padStart(2, "0")} / {String(residence.gallery.length).padStart(2, "0")}
              </p>
              <h3 id="gallery-title" className="text-2xl">
                {item.title}
              </h3>
              <p className="mt-1 text-[0.6875rem] text-ice">Visuel d&apos;illustration non contractuel</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Image précédente"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/50 text-lg"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Image suivante"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/50 text-lg"
              >
                →
              </button>
            </div>
          </div>
        </>
      ) : null}
    </dialog>
  );
}
