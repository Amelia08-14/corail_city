"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Residence } from "@/lib/residences";

export function LivingFeature({
  residence,
  onOpenGallery,
}: {
  residence: Residence;
  onOpenGallery: (index: number) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let queued = false;
    function update() {
      queued = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight * 0.85)));
      el.style.setProperty("--section-progress", String(progress));
    }
    function queue() {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    }
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  return (
    <section className="living-feature" ref={sectionRef} aria-label={`Les intérieurs de ${residence.shortName}`}>
      <Image src={residence.livingFeature.image} alt={residence.livingFeature.imageAlt} fill sizes="100vw" />
      <div className="absolute inset-x-6 bottom-8 z-[1] flex flex-wrap items-end justify-between gap-6 text-white sm:inset-x-14">
        <div>
          <p className="mb-4 text-xs tracking-[0.15em]">{residence.livingFeature.eyebrow}</p>
          <h2 className="text-[clamp(2.4rem,5.6vw,4.5rem)] leading-[1.1] tracking-tighter">
            {residence.livingFeature.title}
            <br />
            <em className="font-display text-[1.1em]">{residence.livingFeature.titleEmphasis}</em>
          </h2>
        </div>
        <button
          type="button"
          className="round-button"
          onClick={() => onOpenGallery(0)}
          aria-label="Ouvrir la galerie des intérieurs"
        >
          <span className="text-[0.5rem] tracking-[0.18em]">EXPLORER</span>
          <span aria-hidden>↗</span>
        </button>
      </div>
      <span className="absolute bottom-5 right-8 z-[2] text-[0.5rem] text-white">
        Ambiance intérieure · illustration non contractuelle
      </span>
      <div className="absolute right-9 top-7 z-[2] text-[0.625rem] tracking-[0.1em] text-white">
        01 — {String(residence.gallery.length).padStart(2, "0")}
      </div>
    </section>
  );
}
