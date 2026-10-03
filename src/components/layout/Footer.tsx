import Image from "next/image";
import Link from "next/link";
import { company, residences } from "@/lib/residences";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer({ onOpenLegal }: { onOpenLegal: () => void }) {
  const year = new Date().getFullYear();
  const residence = residences[0];

  return (
    <footer className="mx-[14px] mb-[14px] overflow-hidden rounded-[20px] bg-midnight pt-10 text-white">
      <div className="mx-auto max-w-[1500px] px-8">
        <div className="border-b border-white/20 pb-10 font-sans text-[clamp(3rem,10vw,9rem)] leading-[1.05] tracking-tighter text-[#f1f5f7]">
          CORAIL CITY<span className="align-top text-base font-normal">®</span>
        </div>

        <div className="flex flex-wrap items-center gap-10 border-b border-white/20 py-9">
          <Link href="/" className="w-[90px] flex-shrink-0" aria-label="Corail City, accueil">
            <Image src="/brand/logo.svg" alt="Corail City Immobilier" width={90} height={68} className="brightness-0 invert" />
          </Link>
          <p className="font-display text-3xl leading-tight text-[#edf1f5]">
            Des lieux de vie.
            <br />
            <em>Une exigence commune.</em>
          </p>
          <a
            href="#accueil"
            className="ml-auto grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border border-white/40 text-xl"
            aria-label="Revenir en haut de la page"
          >
            ↑
          </a>
        </div>

        <div className="grid gap-10 py-10 md:grid-cols-4">
          <div>
            <span className="mb-4 block text-[0.65rem] tracking-[0.15em] text-[#aebdcb]">LA RÉSIDENCE</span>
            <Link href={`/residences/${residence.slug}`} className="mb-3 block text-[#dce5ed] hover:text-gold">
              {residence.shortName}
            </Link>
            <a href={`/residences/${residence.slug}#appartements`} className="mb-3 block text-[#dce5ed] hover:text-gold">
              Les appartements
            </a>
            <a href={`/residences/${residence.slug}/catalogue`} className="block text-[#dce5ed] hover:text-gold">
              Catalogue à feuilleter
            </a>
          </div>
          <div>
            <span className="mb-4 block text-[0.65rem] tracking-[0.15em] text-[#aebdcb]">VOTRE PROJET</span>
            <a href="#contact" className="mb-3 block text-[#dce5ed] hover:text-gold">
              Nous contacter
            </a>
            <a href={residence.catalogPdf} download className="mb-3 block text-[#dce5ed] hover:text-gold">
              Télécharger le PDF
            </a>
            <a href={company.secondaryPhoneHref} className="block text-[#dce5ed] hover:text-gold">
              {company.secondaryPhone}
            </a>
          </div>
          <div>
            <span className="mb-4 block text-[0.65rem] tracking-[0.15em] text-[#aebdcb]">SIÈGE SOCIAL</span>
            <p className="mb-3 text-[#dce5ed]">{company.address}</p>
            <a href={`mailto:${company.email}`} className="text-[#dce5ed] hover:text-gold">
              {company.email}
            </a>
          </div>
          <div>
            <span className="mb-4 block text-[0.65rem] tracking-[0.15em] text-[#aebdcb]">SUIVEZ-NOUS</span>
            <SocialLinks />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/20 py-6 text-xs text-[#b7c5d1]">
          <span>© {year} {company.name}</span>
          <button type="button" onClick={onOpenLegal} className="text-xs text-[#b7c5d1] underline-offset-4 hover:underline">
            Informations &amp; confidentialité
          </button>
          <span className="hidden text-[0.625rem] tracking-[0.13em] md:inline">UNE NOUVELLE FAÇON D&apos;HABITER.</span>
        </div>
        <p className="max-w-3xl pb-8 text-[0.6875rem] leading-relaxed text-[#94a7b8]">
          Visuels d&apos;illustration non contractuels. Surfaces, matériaux et équipements sous réserve des études d&apos;exécution,
          des choix définitifs et des documents contractuels de vente.
        </p>
      </div>
    </footer>
  );
}
