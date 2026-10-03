import type { Metadata } from "next";
import Image from "next/image";
import { company, residences } from "@/lib/residences";
import { LinkRow } from "@/components/links/LinkRow";
import { LinkSection } from "@/components/links/LinkSection";
import { SelfQRCode } from "@/components/links/SelfQRCode";

export const metadata: Metadata = {
  title: "Tous nos liens",
  description: "Corail City — tous nos liens et coordonnées, en un seul endroit.",
  robots: { index: false, follow: false },
};

export default function LiensPage() {
  const residence = residences[0];

  return (
    <main className="relative min-h-screen overflow-hidden bg-navy px-5 py-16 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0, #fff 1px, transparent 1px, transparent 28px)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,#33cbff26,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,#cbb27a2e,transparent_70%)]" />

      <div className="relative mx-auto flex max-w-[460px] flex-col items-center text-center">
        <Image src="/brand/logo.svg" alt="Corail City Immobilier" width={100} height={76} className="brightness-0 invert" priority />
        <span className="mt-6 h-px w-10 bg-gold" aria-hidden />

        <h1 className="mt-6 text-[2rem] leading-[1.1] tracking-tight">
          Tous nos liens,
          <br />
          <em className="font-display text-[1.15em] italic text-ice">en un seul endroit.</em>
        </h1>
        <p className="mt-3 text-sm text-white/60">Scannez le QR code ou sélectionnez un accès ci-dessous</p>

        <div className="mt-9">
          <SelfQRCode />
        </div>

        <div className="mt-10 flex w-full flex-col gap-7">
          <LinkSection title="SUIVEZ-NOUS">
            <LinkRow icon="facebook" title="Facebook" subtitle="Page officielle" href={company.socials.facebook.href} />
            <LinkRow icon="instagram" title="Instagram" subtitle={company.socials.instagram.label} href={company.socials.instagram.href} />
            <LinkRow icon="tiktok" title="TikTok" subtitle={company.socials.tiktok.label} href={company.socials.tiktok.href} />
            <LinkRow icon="linkedin" title="LinkedIn" subtitle={company.socials.linkedin.label} href={company.socials.linkedin.href} />
          </LinkSection>

          <LinkSection title="NOUS CONTACTER">
            <LinkRow icon="phone" title="Appeler Corail City" subtitle={company.phone} href={company.phoneHref} external={false} />
            <LinkRow icon="mail" title="Nos e-mails" subtitle={company.email} href={`mailto:${company.email}`} external={false} />
          </LinkSection>

          <LinkSection title="LOCALISATION">
            <LinkRow
              icon="pin"
              title={`Résidence ${residence.shortName}`}
              subtitle={`${residence.neighborhood}, ${residence.city}`}
              href={residence.address.placeUrl}
            />
          </LinkSection>
        </div>

        <span className="mt-12 h-px w-10 bg-gold" aria-hidden />
        <p className="mt-6 text-sm leading-relaxed text-white/75">
          Construire l&apos;Algérie de demain,
          <br />
          <em className="font-display text-base italic text-gold">avec exigence.</em>
        </p>
      </div>
    </main>
  );
}
