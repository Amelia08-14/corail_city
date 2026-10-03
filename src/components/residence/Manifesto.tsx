"use client";

import { useEffect, useRef } from "react";
import type { Residence } from "@/lib/residences";
import { TextLink } from "@/components/ui/TextLink";
import { Reveal } from "@/components/ui/Reveal";

export function Manifesto({ residence }: { residence: Residence }) {
  const linesRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    let queued = false;
    function update() {
      queued = false;
      const container = linesRef.current;
      if (!container) return;
      const lines = container.querySelectorAll<HTMLElement>(".manifesto-line");
      lines.forEach((line) => {
        const isRead = line.getBoundingClientRect().top < window.innerHeight * 0.78;
        line.classList.toggle("is-read", isRead);
      });
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
    <section className="wrap section grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2.4fr]" id="residence">
      <Reveal className="flex flex-col items-start justify-between">
        <p className="max-w-[160px] text-xs font-semibold leading-loose tracking-[0.2em] text-muted">
          {residence.manifesto.eyebrow}
        </p>
        <span className="mt-6 grid h-16 w-16 place-items-center rounded-full border border-line font-display text-3xl text-[#8ea2b2] lg:mt-0">
          ↗
        </span>
      </Reveal>

      <div>
        <h2
          ref={linesRef}
          className="text-[clamp(2.2rem,4.3vw,4.5rem)] leading-[1.23] tracking-tighter"
        >
          {residence.manifesto.lines.map((line) => (
            <span key={line} className="manifesto-line">
              {line}
            </span>
          ))}
          <em className="manifesto-line font-display block text-[1.24em] not-italic leading-[1.17] tracking-tight text-navy">
            <span className="italic">{residence.manifesto.emphasis}</span>
          </em>
        </h2>

        <div className="mt-9 grid grid-cols-1 items-end gap-8 md:grid-cols-[1fr_auto]">
          <p className="max-w-xl text-sm leading-loose text-muted">{residence.manifesto.paragraph}</p>
          <TextLink href={residence.catalogPdf} download className="whitespace-nowrap text-xs">
            Découvrir le catalogue <span aria-hidden>↗</span>
          </TextLink>
        </div>
      </div>
    </section>
  );
}
