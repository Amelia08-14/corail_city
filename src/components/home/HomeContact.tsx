import { company, residences } from "@/lib/residences";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function HomeContact() {
  const residence = residences[0];

  return (
    <section className="wrap section grid gap-14 md:grid-cols-2" id="contact">
      <Reveal>
        <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-muted">02 / RENCONTRONS-NOUS</p>
        <h2 className="mb-7 text-[clamp(2.5rem,4.5vw,3.8rem)] leading-[1.1] tracking-tighter">
          Et si tout
          <br />
          <em className="font-display">commençait ici ?</em>
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Un projet Corail City vous intéresse ? Notre équipe vous accompagne et vous renseigne sur {residence.shortName},
          notre première résidence.
        </p>
        <a href={company.phoneHref} className="mt-8 flex items-center gap-6 text-2xl tracking-tight">
          {company.phone} <span className="text-xl">↗</span>
        </a>
        <a href={`mailto:${company.email}`} className="mt-2 block text-sm">
          {company.email}
        </a>
        <SocialLinks tone="light" className="mt-8" />
      </Reveal>

      <Reveal className="flex flex-col justify-center gap-4 rounded-2xl bg-mist p-8">
        <p className="text-sm text-muted">
          Renseignez-vous dès maintenant sur les typologies, surfaces et disponibilités de la Résidence {residence.shortName}.
        </p>
        <LinkButton href={`/residences/${residence.slug}#contact`} className="w-full">
          Découvrir {residence.shortName} <span aria-hidden>↗</span>
        </LinkButton>
        <LinkButton href={residence.catalogPdf} download variant="light" className="w-full">
          Télécharger le catalogue <span aria-hidden>↙</span>
        </LinkButton>
      </Reveal>
    </section>
  );
}
