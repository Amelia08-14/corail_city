"use client";

import Image from "next/image";
import { formatArea, type Residence } from "@/lib/residences";
import { useNativeDialog } from "@/lib/useNativeDialog";

export function ApartmentDialog({
  residence,
  reference,
  onClose,
  onInquire,
}: {
  residence: Residence;
  reference: string | null;
  onClose: () => void;
  onInquire: (reference: string) => void;
}) {
  const ref = useNativeDialog(Boolean(reference), onClose);
  const apartment = residence.apartments.find((item) => item.ref === reference);

  return (
    <dialog
      ref={ref}
      className="w-[1180px] max-w-[calc(100vw-32px)] md:grid md:grid-cols-[1.05fr_1fr]"
      aria-labelledby="apartment-title"
    >
      <button type="button" className="dialog-close" onClick={onClose} aria-label="Fermer la fiche appartement">
        ×
      </button>
      {apartment ? (
        <>
          <div className="relative aspect-square bg-mist md:max-h-[86vh]">
            <Image
              src={apartment.ficheImage}
              alt={`Plan 3D détaillé et perspective de l'appartement ${apartment.ref}`}
              fill
              sizes="(min-width: 768px) 590px, 100vw"
              className="object-contain"
            />
            <span className="absolute bottom-4 left-5 bg-[#003160aa] px-2 py-1 text-[0.625rem] tracking-[0.1em] text-white">
              FICHE {apartment.ficheNumber} · CATALOGUE
            </span>
          </div>
          <div className="flex max-h-[86vh] flex-col overflow-y-auto px-6 py-8 md:px-10 md:py-14">
            <p className="mb-4 text-[0.65rem] tracking-[0.2em] text-muted">{residence.name.toUpperCase()}</p>
            <h2 id="apartment-title" className="text-4xl tracking-tighter">
              Appartement {apartment.ref}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-mist px-3 py-1.5 text-navy">{apartment.typology}</span>
              <span className="rounded-full bg-mist px-3 py-1.5 text-navy">
                {apartment.bedrooms} chambre{apartment.bedrooms > 1 ? "s" : ""}
              </span>
              {apartment.isDuplex ? <span className="rounded-full bg-mist px-3 py-1.5 text-navy">Duplex</span> : null}
              {apartment.hasPool ? (
                <span className="rounded-full bg-gold/20 px-3 py-1.5 text-gold-dark">Piscine privée</span>
              ) : null}
            </div>

            <p className="mt-6 font-display text-5xl tracking-tight">
              {formatArea(apartment.area)} <small className="text-2xl">m²{apartment.provisional ? "*" : ""}</small>
            </p>
            <p className="mt-2 text-sm text-muted">
              Surface totale, balcons et terrasses inclus.
              {apartment.exteriorArea ? ` Dont ${formatArea(apartment.exteriorArea)} m² d'espaces extérieurs.` : ""}
            </p>

            <div className="mt-6 border-t border-line pt-5">
              <p className="mb-4 text-xs font-semibold tracking-[0.15em] text-muted">DÉTAIL DES SURFACES</p>
              <div className="flex flex-col">
                {apartment.rooms.map((room) => (
                  <div key={room.label} className="flex items-center justify-between border-b border-line py-2 text-sm">
                    <span className="text-ink">{room.label}</span>
                    <span className="font-display text-base tracking-tight text-navy">{formatArea(room.area)} m²</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm">
              <span className="text-xs text-muted">Adresse </span>
              {residence.neighborhood}, {residence.city}
            </p>

            <p className="mt-4 text-xs text-muted">
              {apartment.provisional
                ? "* Surface à confirmer. Données indicatives, selon études d'exécution et documents contractuels."
                : "Surfaces indicatives, selon études d'exécution et documents contractuels."}
            </p>

            <button
              type="button"
              onClick={() => onInquire(apartment.ref)}
              className="mt-6 w-full rounded-lg bg-navy px-5 py-4 text-sm text-white transition hover:bg-navy-light"
            >
              Recevoir les informations <span aria-hidden>↗</span>
            </button>
            <a
              href={`/residences/${residence.slug}/catalogue`}
              className="mt-3 inline-block text-sm underline underline-offset-4"
            >
              Voir la fiche dans le catalogue complet ↗
            </a>
          </div>
        </>
      ) : null}
    </dialog>
  );
}
