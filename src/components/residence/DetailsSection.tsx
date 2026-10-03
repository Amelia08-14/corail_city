"use client";

import Image from "next/image";
import type { Residence } from "@/lib/residences";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

export function DetailsSection({
  residence,
  onOpenGallery,
}: {
  residence: Residence;
  onOpenGallery: (index: number) => void;
}) {
  const { details } = residence;

  return (
    <section className="wrap section">
      <Reveal className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr_1fr]">
        <p className="pt-2 text-xs font-semibold tracking-[0.2em] text-muted">{details.eyebrow}</p>
        <h2 className="text-[clamp(2rem,3.2vw,3rem)] leading-[1.1] tracking-tighter">
          {details.title}
          <br />
          <em className="font-display">{details.titleEmphasis}</em>
        </h2>
        <p className="max-w-[250px] self-end text-sm text-muted">{details.intro}</p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr]">
        <button
          type="button"
          className="detail-photo h-[420px] lg:h-[640px]"
          onClick={() => onOpenGallery(details.mainPhoto.galleryIndex)}
        >
          <Image
            src={details.mainPhoto.src}
            alt={details.mainPhoto.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
          <span className="absolute inset-x-7 bottom-7 z-[2] flex items-end justify-between gap-4 text-white">
            <span>
              <small className="mb-2 block text-[0.5rem] tracking-[0.14em] text-[#e1e9ef]">{details.mainPhoto.label}</small>
              {details.mainPhoto.caption}
            </span>
            <i className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-white/70 not-italic">↗</i>
          </span>
        </button>

        <div>
          <button
            type="button"
            className="detail-photo h-[340px]"
            onClick={() => onOpenGallery(details.sidePhoto.galleryIndex)}
          >
            <Image
              src={details.sidePhoto.src}
              alt={details.sidePhoto.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <span className="absolute inset-x-7 bottom-7 z-[2] flex items-end justify-between gap-4 text-white">
              <span>
                <small className="mb-2 block text-[0.5rem] tracking-[0.14em] text-[#e1e9ef]">{details.sidePhoto.label}</small>
                {details.sidePhoto.caption}
              </span>
              <i className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-white/70 not-italic">↗</i>
            </span>
          </button>

          <div className="mt-6 border-t border-[#d2dce3]">
            {details.accordion.map((item, index) => (
              <details key={item.title} className="border-b border-[#d2dce3]">
                <summary className="flex list-none items-center gap-4 py-5 text-sm">
                  <span className="text-[0.6875rem] text-muted">{String(index + 1).padStart(2, "0")}</span>
                  {item.title}
                  <i className="ml-auto text-xl not-italic">+</i>
                </summary>
                <p className="pb-6 pl-9 text-sm leading-relaxed text-muted">{item.body}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-xs text-muted">{details.footnote}</p>
        <TextLink href={residence.catalogPdf} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap text-sm">
          Toutes les prestations <span aria-hidden>↗</span>
        </TextLink>
      </div>
    </section>
  );
}
