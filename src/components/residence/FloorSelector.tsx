"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { formatArea, getApartmentBlock, type Residence } from "@/lib/residences";
import { Reveal } from "@/components/ui/Reveal";

export function FloorSelector({
  residence,
  onSelectApartment,
}: {
  residence: Residence;
  onSelectApartment: (ref: string) => void;
}) {
  const groups = residence.floorGroups;
  const [selectedKey, setSelectedKey] = useState(groups[groups.length - 2]?.key ?? groups[0].key);

  const totalHeight = useMemo(() => groups.reduce((sum, group) => sum + group.bandHeight, 0), [groups]);

  const markers = useMemo(() => {
    const ordered = [...groups].reverse();
    return ordered.reduce<{ group: (typeof groups)[number]; fromTop: number; centerPercent: number }[]>(
      (acc, group) => {
        const previous = acc[acc.length - 1];
        const fromTop = previous ? previous.fromTop + previous.group.bandHeight : 0;
        const centerPercent = ((fromTop + group.bandHeight / 2) / totalHeight) * 100;
        return [...acc, { group, fromTop, centerPercent }];
      },
      [],
    );
  }, [groups, totalHeight]);

  const selected = groups.find((group) => group.key === selectedKey) ?? groups[0];
  const units = residence.apartments.filter((apartment) => selected.units.includes(apartment.ref));

  return (
    <section className="wrap section" id="etages">
      <Reveal className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-muted">
            <span className="gold-rule" /> LE PROJET, NIVEAU PAR NIVEAU
          </p>
          <h2 className="text-[clamp(2.3rem,4vw,3.6rem)] leading-[1.1] tracking-tighter">
            Choisissez votre étage.
            <br />
            <em className="font-display">Découvrez l&apos;appartement.</em>
          </h2>
        </div>
        <p className="max-w-[365px] text-sm leading-loose text-muted">
          Résidence {residence.buildingProfile} : cliquez sur un repère le long de la façade pour découvrir les
          appartements disponibles à ce niveau de la Résidence {residence.shortName}.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px]">
          <Image
            src="/images/brand/el-bahdja-elevation.jpg"
            alt="Élévation architecturale de la Résidence El Bahdja"
            fill
            sizes="320px"
            className="object-contain"
            priority
          />
          {markers.map(({ group, centerPercent }) => (
            <button
              key={group.key}
              type="button"
              onClick={() => setSelectedKey(group.key)}
              aria-pressed={group.key === selectedKey}
              aria-label={`${group.label} (${group.floorLabel})`}
              style={{ top: `${centerPercent}%` }}
              className={`absolute left-1/2 flex h-7 min-w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border px-2 text-[0.6rem] font-semibold tracking-tight transition ${
                group.key === selectedKey
                  ? "border-gold bg-gold text-navy shadow-[0_6px_18px_rgba(203,178,122,0.5)]"
                  : "border-navy/30 bg-white text-navy hover:border-navy"
              }`}
            >
              {group.floorLabel}
            </button>
          ))}
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-mist p-7 lg:p-10">
          <p className="text-xs tracking-[0.15em] text-muted">NIVEAU SÉLECTIONNÉ</p>
          <h3 className="mt-3 text-3xl tracking-tight text-ink">{selected.label}</h3>
          <p className="mt-2 max-w-md text-sm text-muted">{selected.caption}</p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {units.length > 0 ? (
              units.map((apartment) => (
                <button
                  key={apartment.ref}
                  type="button"
                  onClick={() => onSelectApartment(apartment.ref)}
                  className="flex items-center justify-between rounded-lg bg-white px-4 py-4 text-left transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(9,56,110,0.12)]"
                >
                  <span>
                    <span className="flex items-center gap-2">
                      <span className="font-display text-2xl tracking-tight text-navy">{apartment.ref}</span>
                      <span className="rounded-full bg-mist px-2 py-0.5 text-[0.6rem] tracking-[0.05em] text-muted">
                        Bloc {getApartmentBlock(apartment.ref)}
                      </span>
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      {apartment.typology} · {apartment.bedrooms} ch.
                    </span>
                  </span>
                  <span className="flex flex-col items-end">
                    <span className="text-sm text-ink">{formatArea(apartment.area)} m²</span>
                    <span aria-hidden className="mt-1 text-lg text-navy">
                      ↗
                    </span>
                  </span>
                </button>
              ))
            ) : (
              <p className="rounded-lg bg-white px-4 py-4 text-sm text-muted sm:col-span-2">
                Parties communes à ce niveau, pas d&apos;appartement.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
