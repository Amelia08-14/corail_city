"use client";

import { useNativeDialog } from "@/lib/useNativeDialog";
import { company } from "@/lib/residences";

export function LegalDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useNativeDialog(open, onClose);

  return (
    <dialog ref={ref} className="w-[min(760px,calc(100vw-32px))] px-8 py-14 md:px-14" aria-labelledby="legal-title">
      <button type="button" className="dialog-close" onClick={onClose} aria-label="Fermer les informations">
        ×
      </button>
      <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-navy">CORAIL CITY</p>
      <h2 id="legal-title" className="mb-8 font-display text-4xl">
        Informations
        <br />
        <em>&amp; confidentialité.</em>
      </h2>

      <h3 className="mb-3 mt-6 text-base font-semibold">Votre interlocuteur</h3>
      <p className="text-sm text-muted">
        {company.name} · {company.address}.
        <br />
        Contact : {company.email} · {company.phone}.
      </p>

      <h3 className="mb-3 mt-6 text-base font-semibold">Vos demandes</h3>
      <p className="text-sm text-muted">
        Le formulaire prépare un e-mail dans votre messagerie. Aucune demande n&apos;est envoyée automatiquement ni enregistrée
        sur ce site. Vous gardez la main sur son envoi.
      </p>

      <h3 className="mb-3 mt-6 text-base font-semibold">Services externes</h3>
      <p className="text-sm text-muted">
        La carte est fournie par Google Maps. Son affichage établit une connexion avec Google. Les liens téléphoniques et
        e-mail ouvrent les applications de votre appareil.
      </p>

      <h3 className="mb-3 mt-6 text-base font-semibold">Informations sur le projet</h3>
      <p className="text-sm text-muted">
        Le catalogue fourni par Corail City fait référence pour les informations présentées. Les illustrations, surfaces et
        prestations sont indicatives et ne remplacent pas les documents contractuels. Les typologies par référence, tarifs et
        disponibilités sont à confirmer auprès du bureau de vente.
      </p>
    </dialog>
  );
}
