import Image from "next/image";
import { residences } from "@/lib/residences";

export function HomeHero() {
  const residence = residences[0];

  return (
    <section className="hero-shell" id="accueil" aria-labelledby="hero-title">
      <div className="hero-sky" aria-hidden />
      <div className="hero-wordmark">CORAIL CITY</div>
      <div className="hero-stage">
        <Image
          src="/images/brand/hero-el-bahdja.jpg"
          alt="Résidence El Bahdja au coucher du soleil, quartier de Tixeraïne, vue dégagée sur le parc"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
      </div>
      <div className="hero-shade" aria-hidden />
      <div className="hero-coordinate">
        <span className="h-px w-8 flex-shrink-0 bg-cyan" /> ALGER · PROMOTEUR IMMOBILIER
      </div>
      <div className="hero-copy">
        <p className="mb-5 text-xs tracking-[0.22em] text-[#e0e9ef]">DES LIEUX DE VIE, PENSÉS AUTREMENT.</p>
        <h1 id="hero-title" className="text-[clamp(2.85rem,4.1vw,4.45rem)] leading-[1.06] tracking-tighter">
          Construire l&apos;Algérie
          <br />
          <em className="font-display text-white">de demain.</em>
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-[#e4e9ee]">
          Corail City conçoit des résidences contemporaines à Alger, où l&apos;architecture, la lumière et le confort
          intelligent redéfinissent le quotidien.
        </p>
        <a href="#residences" className="hero-explore mt-6 inline-flex items-center gap-3 text-xs">
          <span className="circle-arrow" aria-hidden>
            ↓
          </span>
          <span>Découvrir nos résidences</span>
        </a>
      </div>
      <div className="hero-bottomline">
        <span>UNE SIGNATURE CORAIL CITY</span>
        <span>Projection d&apos;ambiance · non contractuelle</span>
        <span>{residence.shortName.toUpperCase()}</span>
      </div>
    </section>
  );
}
