"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { formatArea, type Residence } from "@/lib/residences";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

type AreaFilter = "all" | "small" | "medium" | "large";
type SortKey = "reference" | "area-asc" | "area-desc";

export function ApartmentsCatalog({
  residence,
  onSelectApartment,
}: {
  residence: Residence;
  onSelectApartment: (ref: string) => void;
}) {
  const [block, setBlock] = useState<"all" | string>("all");
  const [search, setSearch] = useState("");
  const [area, setArea] = useState<AreaFilter>("all");
  const [sort, setSort] = useState<SortKey>("reference");
  const [expanded, setExpanded] = useState(false);
  const [spotlightRef, setSpotlightRef] = useState(residence.apartments[residence.apartments.length - 1].ref);

  const filtered = useMemo(() => {
    return residence.apartments
      .filter((apartment) => {
        const matchesBlock =
          block === "all" || (block === "duplex" ? Boolean(apartment.isDuplex) : apartment.ref.startsWith(block));
        const matchesSearch = apartment.ref.toLowerCase().includes(search.trim().toLowerCase());
        const matchesArea =
          area === "all" ||
          (area === "small" && apartment.area < 125) ||
          (area === "medium" && apartment.area >= 125 && apartment.area <= 150) ||
          (area === "large" && apartment.area > 150);
        return matchesBlock && matchesSearch && matchesArea;
      })
      .sort((a, b) => {
        if (sort === "area-asc") return a.area - b.area;
        if (sort === "area-desc") return b.area - a.area;
        return a.ref.localeCompare(b.ref);
      });
  }, [residence.apartments, block, search, area, sort]);

  const shown = expanded ? filtered : filtered.slice(0, 5);
  const spotlight = residence.apartments.find((apartment) => apartment.ref === spotlightRef) ?? residence.apartments[0];

  function resetFilters() {
    setSearch("");
    setArea("all");
    setBlock("all");
    setExpanded(false);
  }

  return (
    <section className="wrap section" id="appartements">
      <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <Reveal>
          <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-muted">02 / LES APPARTEMENTS</p>
          <h2 className="text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-tighter">
            Votre espace.
            <br />
            <em className="font-display">Vos possibles.</em>
          </h2>
        </Reveal>
        <Reveal className="max-w-[365px]">
          <p className="mb-3 text-sm leading-loose text-ink">
            F3, F4, F5 et duplex. Découvrez les surfaces du catalogue et échangez avec notre équipe pour trouver votre
            appartement.
          </p>
          <p className="mb-4 text-xs text-muted">Tarifs, typologies par lot et disponibilités sur demande.</p>
          <TextLink href={`/residences/${residence.slug}/catalogue`} className="text-xs">
            Feuilleter le catalogue complet <span aria-hidden>↗</span>
          </TextLink>
        </Reveal>
      </div>

      <div className="flex flex-col gap-4 border-y border-line py-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les références">
          <button
            type="button"
            onClick={() => {
              setBlock("all");
              setExpanded(false);
            }}
            aria-pressed={block === "all"}
            className={`rounded-full px-4 py-3 text-sm transition ${block === "all" ? "bg-navy text-white" : "text-muted"}`}
          >
            Tous les appartements
          </button>
          {residence.apartmentSeries.map((series) => (
            <button
              key={series.key}
              type="button"
              onClick={() => {
                setBlock(series.key);
                setExpanded(false);
              }}
              aria-pressed={block === series.key}
              className={`rounded-full px-4 py-3 text-sm transition ${block === series.key ? "bg-navy text-white" : "text-muted"}`}
            >
              {series.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-sm text-muted">
          <span>Trier par</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="rounded-none border-0 bg-transparent py-2 text-navy"
          >
            <option value="reference">Référence</option>
            <option value="area-asc">Surface croissante</option>
            <option value="area-desc">Surface décroissante</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-6 py-6">
        <label className="flex min-w-[260px] flex-1 items-center gap-2 rounded-lg bg-mist px-4">
          <span aria-hidden className="text-xl">
            ⌕
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setExpanded(false);
            }}
            placeholder="Rechercher une référence, ex. B4"
            aria-label="Rechercher une référence"
            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-navy outline-none"
          />
        </label>
        <select
          value={area}
          onChange={(event) => {
            setArea(event.target.value as AreaFilter);
            setExpanded(false);
          }}
          className="text-sm text-navy"
        >
          <option value="all">Toutes les surfaces</option>
          <option value="small">Moins de 125 m²</option>
          <option value="medium">125 à 150 m²</option>
          <option value="large">Plus de 150 m²</option>
        </select>
        <p className="ml-auto text-sm text-muted" aria-live="polite">
          {filtered.length} référence{filtered.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(300px,0.8fr)_1.25fr]">
        <div className="catalog-intro">
          <Image
            src={residence.heroScenes[0].src}
            alt="Ambiance architecturale de la résidence"
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
          />
          <div className="absolute inset-x-6 top-6 z-[2] flex justify-between gap-4 text-[0.55rem] tracking-[0.12em] text-white">
            <span>{residence.shortName.toUpperCase()}</span>
            <span>{residence.neighborhood.toUpperCase()} ↗</span>
          </div>
          <div className="absolute inset-x-6 bottom-6 z-[2] text-white">
            <p className="mb-4 text-[0.55rem] tracking-[0.15em] text-[#e0e7eb]">VOTRE PROCHAIN CHAPITRE</p>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-4xl tracking-tighter">{spotlight.ref}</h3>
              <span className="text-xl tracking-tight">
                {formatArea(spotlight.area)}
                {spotlight.provisional ? "*" : ""} <small className="text-sm">m²</small>
              </span>
            </div>
            <button
              type="button"
              className="w-full rounded-md bg-white px-4 py-3 text-sm text-navy transition hover:bg-ice"
              onClick={() => onSelectApartment(spotlight.ref)}
            >
              Explorer cet appartement <span aria-hidden>↗</span>
            </button>
            <span className="mt-3 block text-[0.5rem] text-[#d0dfe7]">
              Surface indicative · disponibilités sur demande
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="hidden grid-cols-[1fr_1fr_60px] gap-3 border-b border-line pb-4 text-[0.6rem] tracking-[0.11em] text-muted sm:grid">
            <span>APPARTEMENT</span>
            <span>SURFACE TOTALE</span>
            <span className="text-right">DÉCOUVRIR</span>
          </div>
          <div>
            {shown.map((apartment) => (
              <button
                key={apartment.ref}
                type="button"
                className="apartment-row"
                onMouseEnter={() => setSpotlightRef(apartment.ref)}
                onFocus={() => setSpotlightRef(apartment.ref)}
                onClick={() => onSelectApartment(apartment.ref)}
                aria-label={`Découvrir l'appartement ${apartment.ref}, ${formatArea(apartment.area)} mètres carrés${apartment.provisional ? ", surface à confirmer" : ""}`}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-display text-2xl leading-none tracking-tight">{apartment.ref}</span>
                  <small className="hidden text-[0.6rem] tracking-[0.05em] text-muted sm:inline">
                    {apartment.typology} · {apartment.bedrooms} ch.{apartment.hasPool ? " · piscine" : ""}
                  </small>
                </span>
                <span className="text-lg tracking-tight">
                  {formatArea(apartment.area)}
                  {apartment.provisional ? "*" : ""}
                  <small className="ml-1 text-xs text-muted">m²</small>
                </span>
                <span className="apartment-arrow" aria-hidden>
                  ↗
                </span>
              </button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="py-10 text-base">
              Aucune référence ne correspond à votre recherche.{" "}
              <button type="button" onClick={resetFilters} className="border-b border-current">
                Réinitialiser les filtres
              </button>
            </p>
          ) : null}
          {filtered.length > 5 ? (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="flex w-full justify-between py-6 text-sm"
            >
              {expanded ? "Réduire la liste" : `Voir les ${filtered.length - 5} autres références`}
              <span>{expanded ? "−" : "+"}</span>
            </button>
          ) : null}
        </div>
      </div>

      <p className="mt-7 max-w-4xl text-xs leading-relaxed text-muted">
        Surfaces totales indicatives, balcons et terrasses inclus, selon études d&apos;exécution et documents contractuels.
        {residence.apartments.some((a) => a.provisional) ? " La surface de B3 reste à confirmer." : ""}
      </p>
    </section>
  );
}
