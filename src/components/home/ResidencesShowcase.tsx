import Image from "next/image";
import Link from "next/link";
import { residences } from "@/lib/residences";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

export function ResidencesShowcase() {
  return (
    <section className="wrap section" id="residences">
      <Reveal className="mb-14">
        <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-muted">01 / NOS RÉSIDENCES</p>
        <h2 className="text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-tighter">
          Chaque résidence,
          <br />
          <em className="font-display">une signature Corail City.</em>
        </h2>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-2">
        {residences.map((residence, index) => (
          <Reveal key={residence.slug}>
            <Link
              href={`/residences/${residence.slug}`}
              className="group block overflow-hidden rounded-2xl bg-mist"
            >
              <div className="relative h-[360px] overflow-hidden">
                <Image
                  src={residence.heroScenes[0].src}
                  alt={residence.heroScenes[0].alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02172ac9] via-transparent to-transparent" />
                <span className="absolute left-6 top-6 text-xs tracking-[0.15em] text-white">
                  {String(index + 1).padStart(2, "0")} · {residence.city.toUpperCase()}
                </span>
                <div className="absolute inset-x-6 bottom-6 text-white">
                  <p className="mb-2 text-xs tracking-[0.15em] text-ice">{residence.neighborhood.toUpperCase()}</p>
                  <h3 className="font-display text-4xl">{residence.shortName}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 p-6">
                <p className="text-sm text-muted">{residence.heroDescription}</p>
                <span
                  className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-line text-lg transition group-hover:bg-navy group-hover:text-white"
                  aria-hidden
                >
                  ↗
                </span>
              </div>
            </Link>
          </Reveal>
        ))}

        <Reveal>
          <div className="block overflow-hidden rounded-2xl bg-mist">
            <div className="relative h-[360px] overflow-hidden">
              <Image
                src="/images/brand/prochainement-teaser.jpg"
                alt="Esquisse architecturale conceptuelle d'une prochaine résidence Corail City"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover grayscale-[0.25]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/15 to-transparent" />
              <span className="absolute left-6 top-6 flex items-center gap-2 text-xs tracking-[0.15em] text-white">
                <span className="gold-rule" /> PROCHAINEMENT
              </span>
              <div className="absolute inset-x-6 bottom-6 text-white">
                <p className="mb-2 text-xs tracking-[0.15em] text-ice">NOUVEAU PROJET</p>
                <h3 className="font-display text-4xl">À venir</h3>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 p-6">
              <p className="text-sm text-muted">De nouvelles résidences Corail City rejoindront bientôt le catalogue.</p>
              <span className="flex-shrink-0 text-[0.65rem] uppercase tracking-[0.1em] text-muted/70">Esquisse conceptuelle</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-10">
        <TextLink href={`/residences/${residences[0].slug}`}>
          Explorer {residences[0].shortName} <span aria-hidden>↗</span>
        </TextLink>
      </div>
    </section>
  );
}
