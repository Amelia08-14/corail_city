"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import type { Residence } from "@/lib/residences";
import { Reveal } from "@/components/ui/Reveal";

const AMBIENCES = {
  day: {
    light: 95,
    brightness: 1.1,
    saturate: 1.04,
    icon: "☼",
    label: "Jour",
    description: "La lumière naturelle entre à flots. Des espaces ouverts pour profiter pleinement de la journée.",
  },
  evening: {
    light: 68,
    brightness: 0.93,
    saturate: 1.14,
    icon: "☾",
    label: "Soir",
    description: "Les scénarios s'activent au coucher du soleil : une lumière chaude, un intérieur accueillant.",
  },
  away: {
    light: 25,
    brightness: 0.5,
    saturate: 0.2,
    icon: "⌂",
    label: "Absence",
    description: "Éclairage réduit au minimum, volets fermés : le logement se met en veille jusqu'à votre retour.",
  },
} as const;

type Mode = keyof typeof AMBIENCES;

export function SmartHome({ residence }: { residence: Residence }) {
  const [mode, setMode] = useState<Mode>("evening");
  const [light, setLight] = useState<number>(AMBIENCES.evening.light);
  const [description, setDescription] = useState<string>(AMBIENCES.evening.description);
  const modelRef = useRef<HTMLDivElement | null>(null);

  function applyBrightness(amount: number, base: number) {
    const el = modelRef.current;
    if (!el) return;
    const factor = 0.55 + (amount / 100) * 0.6;
    el.style.setProperty("--model-brightness", String(base * factor));
  }

  function selectMode(key: Mode) {
    const ambience = AMBIENCES[key];
    setMode(key);
    setLight(ambience.light);
    setDescription(ambience.description);
    const el = modelRef.current;
    if (el) {
      el.dataset.mode = key;
      el.style.setProperty("--model-saturation", String(ambience.saturate));
    }
    applyBrightness(ambience.light, ambience.brightness);
  }

  function handleLightChange(value: number) {
    const amount = Math.min(100, Math.max(20, value));
    setLight(amount);
    applyBrightness(amount, AMBIENCES[mode].brightness);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = modelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--tilt-x", `${(0.5 - (event.clientY - rect.top) / rect.height) * 3}deg`);
    el.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 4}deg`);
  }

  function resetTilt() {
    const el = modelRef.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <section className="relative mx-[14px] overflow-hidden rounded-[22px] bg-[#e3e9ed] pb-16" id="art-de-vivre">
      <div className="wrap relative max-w-[1480px]">
        <Reveal className="max-w-[550px] pt-16">
          <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-muted">{residence.smartHome.eyebrow}</p>
          <h2 className="text-[clamp(2.6rem,4.5vw,4rem)] leading-[1.12] tracking-tighter">
            {residence.smartHome.title}
            <br />
            <em className="font-display">{residence.smartHome.titleEmphasis}</em>
          </h2>
          <div className="mt-6 max-w-[355px] text-sm leading-loose text-[#637682]">
            {residence.smartHome.intro.map((line) => (
              <p key={line} className="m-0">
                {line}
              </p>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-4 flex flex-col gap-8 py-10 lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-stretch lg:gap-10">
          <div
            ref={modelRef}
            data-mode={mode}
            className="smart-model relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-[18px] lg:h-full lg:min-h-[560px]"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
          >
            <Image
              src={residence.smartHome.image}
              alt={residence.smartHome.imageAlt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="smart-render object-cover"
            />
            <div className="smart-overlay absolute inset-0" aria-hidden />

            <span className="smart-glow smart-glow-dot" style={{ left: "29%", top: "34%", animationDelay: "0s" }} aria-hidden />
            <span className="smart-glow smart-glow-dot" style={{ left: "70%", top: "26%", animationDelay: ".6s" }} aria-hidden />
            <span className="smart-glow smart-glow-dot" style={{ left: "78%", top: "58%", animationDelay: "1.2s" }} aria-hidden />

            <button
              type="button"
              className="smart-hotspot left-[27%] top-[30%]"
              onClick={() =>
                setDescription(
                  "Le catalogue prévoit le pilotage de l'éclairage et des scénarios de vie. Testez Jour, Soir et Absence pour voir la maquette réagir.",
                )
              }
              aria-label="Découvrir le pilotage de l'éclairage"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-navy text-sm text-white">+</span>
              <span className="text-[0.6rem] text-navy">Éclairage</span>
            </button>
            <button
              type="button"
              className="smart-hotspot right-[10%] top-[42%]"
              onClick={() =>
                setDescription(
                  "Climatisation LG et chauffage individuel participent au confort de la résidence, y compris sur les terrasses et duplex avec piscine.",
                )
              }
              aria-label="Découvrir le confort thermique"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-navy text-sm text-white">+</span>
              <span className="text-[0.6rem] text-navy">Confort</span>
            </button>

            <div className="absolute bottom-3 left-0 right-0 text-center text-[0.55rem] leading-relaxed text-white/70">
              Terrasse d&apos;un duplex avec piscine privée · illustration non contractuelle
            </div>
          </div>

          <div className="flex w-full max-w-[340px] flex-col justify-center rounded-[17px] border border-white/70 bg-white/70 p-6 shadow-[0_20px_65px_#2942540c] backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-[#aabbc930] pb-5">
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-navy text-xl text-white">✳</span>
              <div>
                <span className="text-[0.5rem] tracking-[0.15em] text-[#8a99a4]">SMART LIVING</span>
                <h3 className="mt-1 text-[0.8125rem] font-medium tracking-tight">Le confort, en un geste.</h3>
              </div>
            </div>
            <p className="mb-3 mt-5 text-[0.625rem] text-[#6d8190]">Explorez une ambiance</p>
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="Scénarios d'ambiance">
              {(Object.keys(AMBIENCES) as Mode[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={mode === key}
                  onClick={() => selectMode(key)}
                  className={`flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-lg border text-[0.575rem] transition ${
                    mode === key ? "border-navy bg-navy text-white" : "border-[#ccdae377] bg-white/40 text-[#6d8190]"
                  }`}
                >
                  <span className="text-xl">{AMBIENCES[key].icon}</span>
                  {AMBIENCES[key].label}
                </button>
              ))}
            </div>
            <div className="mt-5">
              <label className="mb-3 flex justify-between text-[0.6rem] text-[#4f6c82]">
                <span>Ambiance lumineuse</span>
                <output className="text-navy">{light} %</output>
              </label>
              <input
                type="range"
                min={20}
                max={100}
                value={light}
                onChange={(event) => handleLightChange(Number(event.target.value))}
                aria-label="Intensité de l'ambiance lumineuse"
                className="h-[3px] w-full accent-navy"
              />
            </div>
            <p className="mt-4 min-h-[54px] text-[0.65rem] leading-relaxed text-[#5e7587]" aria-live="polite">
              {description}
            </p>
            <span className="mt-2 block text-[0.45rem] tracking-[0.06em] text-[#8499a8]">Démonstration d&apos;ambiance</span>
          </div>
        </div>

        <div className="grid gap-8 border-t border-[#b8c7d26b] pt-8 sm:grid-cols-3">
          {residence.smartHome.benefits.map((benefit, index) => (
            <div key={benefit.title}>
              <span className="text-[0.575rem] text-[#879eaf]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-base font-medium tracking-tight">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-loose text-[#718594]">{benefit.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
