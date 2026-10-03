"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Residence } from "@/lib/residences";
import { LinkButton } from "@/components/ui/Button";

export function ResidenceHero({ residence }: { residence: Residence }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [changing, setChanging] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const scene = residence.heroScenes[sceneIndex];

  useEffect(() => {
    let queued = false;
    function update() {
      queued = false;
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      el.style.setProperty("--hero-progress", String(progress));
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

  function selectScene(index: number) {
    if (index === sceneIndex) return;
    setChanging(true);
    window.setTimeout(() => {
      setSceneIndex(index);
      setChanging(false);
    }, 180);
  }

  return (
    <section className="hero-shell" id="accueil" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero-sky" aria-hidden />
      <div className="hero-wordmark">{residence.shortName.toUpperCase()}</div>
      <div className="hero-stage">
        <Image
          src={scene.src}
          alt={scene.alt}
          fill
          priority
          sizes="100vw"
          className={`hero-image ${changing ? "is-changing" : ""}`}
        />
      </div>
      <div className="hero-shade" aria-hidden />
      <div className="hero-coordinate">
        <span className="h-px w-8 flex-shrink-0 bg-cyan" /> {residence.neighborhood.toUpperCase()} · {residence.city.toUpperCase()}
      </div>
      <div className="hero-copy">
        <p className="mb-5 text-xs tracking-[0.22em] text-[#e0e9ef]">{residence.heroEyebrow}</p>
        <h1 id="hero-title" className="text-[clamp(2.85rem,4.1vw,4.45rem)] leading-[1.06] tracking-tighter">
          {residence.heroTitle}
          <br />
          <em className="font-display text-white">{residence.heroTitleEmphasis}</em>
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-[#e4e9ee]">{residence.heroDescription}</p>
        <a href="#residence" className="hero-explore inline-flex items-center gap-3 text-xs">
          <span className="circle-arrow" aria-hidden>
            ↓
          </span>
          <span>Entrer dans l&apos;expérience</span>
        </a>
      </div>

      <aside className="hero-property-card" aria-label={`Découvrir ${residence.shortName}`}>
        <div className="flex gap-2 pb-2" role="group" aria-label="Choisir l'ambiance">
          {residence.heroScenes.map((item, index) => (
            <button
              key={item.key}
              type="button"
              className={`scene-selector ${index === sceneIndex ? "active" : ""}`}
              aria-pressed={index === sceneIndex}
              onClick={() => selectScene(index)}
            >
              <Image src={item.src} alt="" width={130} height={85} className="h-full w-full object-cover" />
              <span className="absolute bottom-2 left-2 z-10 text-[0.55rem] text-white">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="property-card-body">
          <p className="mb-2 text-[0.47rem] tracking-[0.15em] text-muted">VOTRE PROCHAINE ADRESSE</p>
          <h2 className="text-base font-semibold tracking-tight">{residence.name}</h2>
          <span className="text-[0.6875rem] text-muted">
            {residence.neighborhood}, {residence.city}
          </span>
          <LinkButton href="#appartements" variant="primary" className="mt-4 w-full min-h-[43px] px-3 py-3 text-[0.65rem]">
            Trouver mon appartement <span aria-hidden>↗</span>
          </LinkButton>
        </div>
      </aside>

      <div className="hero-bottomline">
        <span>UNE SIGNATURE CORAIL CITY</span>
        <span>{scene.note}</span>
        <span className="text-[0.6875rem]">
          {String(sceneIndex + 1).padStart(2, "0")} <i className="not-italic opacity-50">/</i> {String(residence.heroScenes.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
