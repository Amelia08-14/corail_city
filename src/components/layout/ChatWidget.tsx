"use client";

import { useEffect, useState } from "react";
import { residences } from "@/lib/residences";

const questions = [
  { key: "surfaces", label: "Les appartements et surfaces ↗" },
  { key: "prestations", label: "Les prestations ↗" },
  { key: "tarifs", label: "Les prix et disponibilités ↗" },
  { key: "visite", label: "Organiser une visite ↗" },
] as const;

export function ChatWidget() {
  const residence = residences[0];
  const [open, setOpen] = useState(false);
  const [answerKey, setAnswerKey] = useState<(typeof questions)[number]["key"] | null>(null);

  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) setOpen(false);
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="chat-trigger flex items-center gap-2 bg-navy px-5 py-3 text-sm text-white hover:bg-navy-light"
        aria-expanded={open}
        aria-controls="chat-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path d="M20 11.5a8 8 0 0 1-8 8H5l-3 2v-9a10 10 0 0 1 10-10 8 8 0 0 1 8 9Z" />
          <path d="M7 9h9M7 13h6" />
        </svg>
        <span>Une question ?</span>
      </button>

      {open ? (
        <aside id="chat-panel" className="chat-panel" aria-label="Informations Corail City">
          <div className="flex items-start justify-between bg-navy px-6 py-6 text-white">
            <div>
              <span className="text-[0.625rem] tracking-[0.15em] text-ice">CORAIL CITY</span>
              <h3 className="mt-2 font-display text-3xl">À votre écoute.</h3>
            </div>
            <button
              type="button"
              className="text-2xl leading-none"
              onClick={() => setOpen(false)}
              aria-label="Fermer les questions"
            >
              ×
            </button>
          </div>
          <div className="p-6">
            <p className="mb-4 text-sm">Que souhaitez-vous savoir sur {residence.shortName} ?</p>
            <div className="flex flex-col gap-2">
              {questions.map((question) => (
                <button
                  key={question.key}
                  type="button"
                  className="rounded-md bg-mist px-3 py-3 text-left text-sm transition hover:bg-ice"
                  onClick={() => setAnswerKey(question.key)}
                >
                  {question.label}
                </button>
              ))}
            </div>
            {answerKey ? (
              <p className="mt-5 border-l-2 border-cyan pl-3 text-sm" aria-live="polite">
                {residence.answers[answerKey]}
              </p>
            ) : null}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-4 inline-flex text-sm underline underline-offset-4">
              Échanger avec notre équipe ↗
            </a>
          </div>
        </aside>
      ) : null}
    </>
  );
}
