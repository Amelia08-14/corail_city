"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { company, formatArea, type Residence } from "@/lib/residences";
import { SocialLinks } from "@/components/ui/SocialLinks";

export type ContactPrefill = {
  reference: string;
  type: string;
  message: string;
};

export function ContactSection({
  residence,
  prefill,
}: {
  residence: Residence;
  prefill: ContactPrefill | null;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [preparedMessage, setPreparedMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copier ma demande");
  const [mailHref, setMailHref] = useState("#");

  useEffect(() => {
    if (!prefill || !formRef.current) return;
    const form = formRef.current;
    const referenceSelect = form.elements.namedItem("reference") as HTMLSelectElement | null;
    const typeSelect = form.elements.namedItem("type") as HTMLSelectElement | null;
    const messageField = form.elements.namedItem("message") as HTMLTextAreaElement | null;
    if (referenceSelect) referenceSelect.value = prefill.reference;
    if (typeSelect) typeSelect.value = prefill.type;
    if (messageField) messageField.value = prefill.message;
    window.setTimeout(() => {
      (form.elements.namedItem("name") as HTMLInputElement | null)?.focus({ preventScroll: true });
    }, 400);
  }, [prefill]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "").trim();
    const phoneField = form.elements.namedItem("phone") as HTMLInputElement;
    if ((phone.match(/\d/g) || []).length < 8) {
      phoneField.setCustomValidity("Indiquez un numéro de téléphone valide.");
      phoneField.reportValidity();
      return;
    }
    phoneField.setCustomValidity("");

    const message = `Bonjour,\n\nJe souhaite être recontacté au sujet de la ${residence.name}.\n\nNom : ${String(
      data.get("name"),
    ).trim()}\nTéléphone : ${phone}\nE-mail : ${String(data.get("email") ?? "").trim() || "Non précisé"}\nTypologie souhaitée : ${data.get(
      "type",
    )}\nRéférence : ${data.get("reference")}\n\n${String(data.get("message") ?? "").trim()}\n\nJ'accepte d'être recontacté par Corail City au sujet de mon projet immobilier.`;

    const url = `mailto:${company.email}?subject=${encodeURIComponent(
      `Demande d'informations — ${residence.name}`,
    )}&body=${encodeURIComponent(message)}`;

    setPreparedMessage(message);
    setMailHref(url);
    setSubmitted(true);
    setCopyLabel("Copier ma demande");
    window.location.href = url;
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setCopyLabel("Demande copiée");
    } catch {
      setCopyLabel("Sélectionnez puis copiez le texte");
    }
  }

  return (
    <section className="wrap section grid grid-cols-1 gap-16 lg:grid-cols-2" id="contact">
      <div>
        <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-muted">05 / RENCONTRONS-NOUS</p>
        <h2 className="mb-7 text-[clamp(2.5rem,4.5vw,3.8rem)] leading-[1.1] tracking-tighter">
          Et si tout
          <br />
          <em className="font-display">commençait ici ?</em>
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Un appartement vous intéresse ? Notre équipe vous accompagne dans votre projet et vous renseigne sur les
          disponibilités.
        </p>
        <a href={company.phoneHref} className="mt-8 flex items-center gap-6 text-2xl tracking-tight">
          {company.phone} <span className="text-xl">↗</span>
        </a>
        <a href={`mailto:${company.email}`} className="mt-2 block text-sm">
          {company.email}
        </a>
        <div className="mt-10 flex items-center gap-5 border-t border-line pt-7">
          <span className="grid h-[52px] w-[44px] flex-shrink-0 place-items-center rounded-md border border-[#c5d3df] text-2xl">
            ↙
          </span>
          <div>
            <span className="mb-2 block text-[0.625rem] tracking-[0.15em] text-muted">LE PROJET, DANS LES DÉTAILS</span>
            <a href={residence.catalogPdf} download className="text-sm">
              Catalogue {residence.shortName} <small className="ml-3 text-xs text-muted">PDF · {residence.catalogPages}</small>
            </a>
          </div>
        </div>
        <SocialLinks tone="light" className="mt-8" />
      </div>

      <form ref={formRef} className="pt-1" onSubmit={handleSubmit}>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block text-sm">
            Nom et prénom <span className="text-muted">*</span>
            <input
              name="name"
              autoComplete="name"
              placeholder="Votre nom complet"
              required
              maxLength={100}
              className="mt-3 block w-full border-0 border-b border-[#cdd7df] bg-transparent py-3 text-base outline-none"
            />
          </label>
          <label className="block text-sm">
            Téléphone <span className="text-muted">*</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Votre numéro de téléphone"
              required
              minLength={8}
              maxLength={30}
              onChange={(event) => event.currentTarget.setCustomValidity("")}
              className="mt-3 block w-full border-0 border-b border-[#cdd7df] bg-transparent py-3 text-base outline-none"
            />
          </label>
        </div>

        <label className="mt-6 block text-sm">
          E-mail
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Votre adresse e-mail"
            maxLength={150}
            className="mt-3 block w-full border-0 border-b border-[#cdd7df] bg-transparent py-3 text-base outline-none"
          />
        </label>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <label className="block text-sm">
            Votre projet
            <select name="type" defaultValue="À définir" className="mt-3 block w-full border-0 border-b border-[#cdd7df] bg-transparent py-3 text-base">
              <option value="À définir">Choisir une typologie</option>
              <option>F3</option>
              <option>F4</option>
              <option>F5</option>
              <option>Duplex</option>
            </select>
          </label>
          <label className="block text-sm">
            Appartement
            <select
              name="reference"
              defaultValue="Non précisé"
              className="mt-3 block w-full border-0 border-b border-[#cdd7df] bg-transparent py-3 text-base"
            >
              <option value="Non précisé">Sans préférence</option>
              {residence.apartments.map((apartment) => (
                <option key={apartment.ref} value={apartment.ref}>
                  {apartment.ref} · {formatArea(apartment.area)} m²{apartment.provisional ? "*" : ""}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-6 block text-sm">
          Votre message
          <textarea
            name="message"
            rows={3}
            placeholder="Une question, une demande de visite…"
            maxLength={2500}
            className="mt-3 block w-full resize-y border-0 border-b border-[#cdd7df] bg-transparent py-3 text-base outline-none"
          />
        </label>

        <label className="consent mt-5 flex items-start gap-3 text-sm text-muted">
          <input type="checkbox" required name="consent" className="mt-1 h-4 w-4 flex-shrink-0 accent-navy" />
          <span>J&apos;accepte d&apos;être recontacté par Corail City au sujet de mon projet immobilier.</span>
        </label>

        <button type="submit" className="mt-6 w-full rounded-lg bg-navy px-6 py-4 text-sm text-white transition hover:bg-navy-light">
          Préparer ma demande <span aria-hidden>↗</span>
        </button>
        <p className="mt-3 text-xs text-muted">Votre demande sera préparée dans votre messagerie pour être envoyée à notre équipe.</p>

        {submitted ? (
          <div className="mt-6 rounded-lg bg-mist p-5" role="status">
            <strong className="text-base font-semibold">Votre demande est prête.</strong>
            <p className="my-2 text-sm">
              Finalisez son envoi dans votre messagerie. Vous pouvez aussi copier le texte et l&apos;envoyer à {company.email}.
            </p>
            <button type="button" onClick={copyMessage} className="mr-5 border-b border-current text-sm">
              {copyLabel}
            </button>
            <a href={mailHref} className="border-b border-current text-sm">
              Ouvrir ma messagerie ↗
            </a>
          </div>
        ) : null}
      </form>
    </section>
  );
}
