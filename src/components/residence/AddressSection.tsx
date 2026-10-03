"use client";

import { useState } from "react";
import type { Residence } from "@/lib/residences";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

export function AddressSection({ residence }: { residence: Residence }) {
  const [mapType, setMapType] = useState<"m" | "k">("m");
  const { lat, lng, placeUrl } = residence.address;
  const satellite = mapType === "k" ? "!5e1" : "";
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6395.75!2d${lng}!3d${lat}!3m2!1i1024!2i768!4f13.1${satellite}!6i16`;
  const mapLink = placeUrl;

  return (
    <section className="wrap section" id="adresse">
      <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <Reveal>
          <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-muted">{residence.address.eyebrow}</p>
          <h2 className="text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-tighter">
            {residence.address.title}
            <br />
            <em className="font-display">{residence.address.titleEmphasis}</em>
          </h2>
        </Reveal>
        <Reveal className="max-w-[365px]">
          <p className="mb-3 text-sm">
            {residence.neighborhood} · Bir Mourad Raïs
          </p>
          <p className="text-xs text-muted">
            Écoles, commerces et services de proximité. Un quartier connecté aux principaux axes d&apos;Alger.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-line lg:grid-cols-[360px_1fr]">
        <div className="bg-[#f1f5f7] p-8 md:p-10">
          <span className="mb-6 block text-[0.55rem] tracking-[0.15em] text-muted">{residence.address.coordinate}</span>
          <h3 className="text-4xl tracking-tighter">
            {residence.neighborhood.split(" ")[0]}
            <br />
            <em className="font-display">{residence.neighborhood.split(" ").slice(1).join(" ")}.</em>
          </h3>
          <div className="my-6 flex flex-col gap-3">
            {residence.address.lines.map((line, index) => (
              <p key={line} className="flex gap-4 text-sm">
                <span className="text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                {line}
              </p>
            ))}
          </div>
          <TextLink href={mapLink} target="_blank" rel="noopener noreferrer" className="text-sm">
            Explorer le quartier <span aria-hidden>↗</span>
          </TextLink>
          <p className="mt-6 max-w-[310px] text-xs text-muted">{residence.address.note}</p>
        </div>

        <div className="relative min-h-[400px] bg-[#e2e8ec] md:min-h-[510px]">
          <div className="absolute left-4 top-4 z-[1] flex overflow-hidden rounded-lg bg-white p-1 shadow-[0_5px_25px_#06244720]">
            <button
              type="button"
              onClick={() => setMapType("m")}
              aria-pressed={mapType === "m"}
              className={`rounded-md px-4 py-2 text-sm ${mapType === "m" ? "bg-navy text-white" : "bg-white text-ink"}`}
            >
              Plan
            </button>
            <button
              type="button"
              onClick={() => setMapType("k")}
              aria-pressed={mapType === "k"}
              className={`rounded-md px-4 py-2 text-sm ${mapType === "k" ? "bg-navy text-white" : "bg-white text-ink"}`}
            >
              Satellite
            </button>
          </div>
          <iframe
            title={`Carte du quartier de ${residence.neighborhood} à ${residence.city}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 saturate-[.7]"
          />
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-5 right-5 rounded-md bg-white px-4 py-2 text-sm"
          >
            Ouvrir la carte ↗
          </a>
        </div>
      </div>
    </section>
  );
}
