import Image from "next/image";
import { residences } from "@/lib/residences";
import { Reveal } from "@/components/ui/Reveal";

export function ConceptSection() {
  const residence = residences[0];

  return (
    <section className="wrap section">
      <Reveal className="mb-14 max-w-2xl">
        <p className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-muted">
          <span className="gold-rule" /> DE L&apos;ESQUISSE À LA RÉALITÉ
        </p>
        <h2 className="text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.1] tracking-tighter">
          Chaque projet Corail City
          <br />
          <em className="font-display">naît d&apos;un dessin.</em>
        </h2>
        <p className="mt-6 max-w-lg text-sm leading-loose text-muted">
          Avant les fondations, il y a le trait : une silhouette, des proportions, une façade pensée dans le détail.
          {" "}{residence.shortName} est la première à prendre vie.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Reveal className="relative overflow-hidden rounded-2xl bg-mist">
          <div className="relative aspect-[4/5]">
            <Image
              src="/images/brand/el-bahdja-sketch.jpg"
              alt="Esquisse architecturale de la Résidence El Bahdja"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <span className="absolute left-5 top-5 text-xs tracking-[0.15em] text-navy/70">01 · L&apos;ESQUISSE</span>
        </Reveal>
        <Reveal className="relative overflow-hidden rounded-2xl bg-mist">
          <div className="relative aspect-[4/5]">
            <Image
              src="/images/el-bahdja/hero-building.jpg"
              alt="Résidence El Bahdja achevée, façade en pierre claire et bois"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02172ab0] via-transparent to-transparent" />
          </div>
          <span className="absolute left-5 top-5 text-xs tracking-[0.15em] text-white">02 · LA RÉALITÉ</span>
        </Reveal>
      </div>
    </section>
  );
}
