import type { Metadata } from "next";
import Image from "next/image";
import { company, residences } from "@/lib/residences";
import { LinkRow } from "@/components/links/LinkRow";
import { SocialTile } from "@/components/links/SocialTile";
import { linkIcons } from "@/components/links/icons";

export const metadata: Metadata = {
  title: "Tous nos liens",
  description: "Corail City — notre site, nos réseaux et nos coordonnées, en un seul endroit.",
  robots: { index: false, follow: false },
};

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-dark">
      <span className="gold-rule" aria-hidden /> {children}
    </p>
  );
}

export default function LiensPage() {
  const residence = residences[0];
  const { socials } = company;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef5fb_55%,#e3eef9_100%)] pb-10 text-ink">
      {/* Coupes diagonales cyan, comme les pages du catalogue */}
      <div className="pointer-events-none absolute -left-24 top-0 h-48 w-48 -rotate-45 bg-ice/60" aria-hidden />
      <div className="pointer-events-none absolute -left-10 top-24 h-px w-72 -rotate-45 bg-cyan/50" aria-hidden />
      <div className="pointer-events-none absolute -right-16 bottom-40 h-56 w-56 rotate-45 bg-ice/50" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-[520px] flex-col gap-4 px-4 pt-5 sm:pt-10">
        {/* En-tête compact : logo + signature */}
        <header className="flex items-center gap-4 px-1">
          <Image src="/brand/logo-color.svg" alt="Corail City Immobilier" width={110} height={84} priority className="h-auto w-[84px] flex-shrink-0" />
          <span className="h-11 w-px bg-navy/20" aria-hidden />
          <p className="text-[0.66rem] font-medium uppercase leading-[1.7] tracking-[0.2em] text-navy">
            L&apos;excellence au service
            <br />
            de votre avenir
            <span className="mt-1.5 block h-0.5 w-10 bg-cyan" aria-hidden />
          </p>
        </header>

        {/* Accès au site — action principale */}
        <a
          href={company.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex min-h-[96px] items-center gap-4 overflow-hidden rounded-[22px] bg-navy px-5 py-5 text-white shadow-[0_18px_44px_rgba(9,56,110,0.4)] ring-2 ring-cyan/60 transition hover:-translate-y-0.5 hover:bg-navy-light active:scale-[0.98]"
        >
          <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,#33cbff40,transparent_70%)]" aria-hidden />
          <span className="relative grid h-14 w-14 flex-shrink-0 place-items-center rounded-full bg-cyan text-navy [&>svg]:h-7 [&>svg]:w-7">
            {linkIcons.globe}
          </span>
          <span className="relative min-w-0 flex-1">
            <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-gold">Notre site officiel</span>
            <span className="block text-[1.35rem] font-bold uppercase leading-tight tracking-tight">Visiter le site</span>
            <span className="block truncate text-sm text-white/75">{company.siteLabel}</span>
          </span>
          <span className="relative grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-white text-xl text-navy transition group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </a>

        {/* Actions rapides */}
        <section aria-label="Actions rapides" className="grid grid-cols-2 gap-3">
          <a
            href={company.phoneHref}
            className="flex min-h-[104px] flex-col justify-between rounded-2xl bg-navy p-4 text-white shadow-[0_12px_30px_rgba(9,56,110,0.28)] transition hover:bg-navy-light active:scale-[0.97]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-cyan text-navy [&>svg]:h-5 [&>svg]:w-5">{linkIcons.phone}</span>
            <span>
              <span className="block text-[0.68rem] font-bold uppercase tracking-[0.14em] text-gold">Appeler</span>
              <span className="block text-[1.02rem] font-semibold">{company.phone}</span>
            </span>
          </a>
          <a
            href={residence.address.placeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[104px] flex-col justify-between rounded-2xl border-2 border-navy bg-white p-4 text-navy shadow-[0_12px_30px_rgba(9,56,110,0.12)] transition hover:bg-ice active:scale-[0.97]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white [&>svg]:h-5 [&>svg]:w-5">{linkIcons.pin}</span>
            <span>
              <span className="block text-[0.68rem] font-bold uppercase tracking-[0.14em] text-gold-dark">Itinéraire</span>
              <span className="block text-[1.02rem] font-semibold leading-tight">
                {residence.shortName}, {residence.city}
              </span>
            </span>
          </a>
        </section>

        {/* Réseaux sociaux */}
        <section aria-label="Réseaux sociaux" className="mt-1">
          <Eyebrow>Suivez-nous</Eyebrow>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <SocialTile icon="instagram" name="Instagram" handle={socials.instagram.label} href={socials.instagram.href} />
            <SocialTile icon="facebook" name="Facebook" handle={socials.facebook.label} href={socials.facebook.href} />
            <SocialTile icon="tiktok" name="TikTok" handle={socials.tiktok.label} href={socials.tiktok.href} />
            <SocialTile icon="linkedin" name="LinkedIn" handle={socials.linkedin.label} href={socials.linkedin.href} />
          </div>
        </section>

        {/* Coordonnées */}
        <section
          aria-label="Coordonnées"
          className="relative mt-1 overflow-hidden rounded-[22px] bg-navy px-5 pb-3 pt-5 text-white shadow-[0_20px_50px_rgba(9,56,110,0.3)]"
        >
          <span className="block h-0.5 w-8 bg-gold" aria-hidden />
          <h2 className="mt-3 text-[1.35rem] font-bold uppercase tracking-tight">Coordonnées</h2>
          <div className="mt-1">
            <LinkRow icon="mail" label="E-mail" value={company.email} href={`mailto:${company.email}`} external={false} />
            <LinkRow icon="phone" label="Fixe" value={company.secondaryPhone} href={company.secondaryPhoneHref} external={false} />
          </div>
        </section>

        <footer className="mt-3 text-center">
          <span className="mx-auto block h-0.5 w-10 bg-cyan" aria-hidden />
          <p className="mt-3 text-sm leading-relaxed text-navy/80">
            Construire l&apos;Algérie de demain,
            <br />
            <em className="font-display text-lg italic text-gold-dark">avec exigence.</em>
          </p>
        </footer>
      </div>
    </main>
  );
}
