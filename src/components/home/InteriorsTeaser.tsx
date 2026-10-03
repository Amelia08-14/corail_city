import { residences } from "@/lib/residences";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { InteriorGalleryGrid } from "@/components/shared/InteriorGalleryGrid";

export function InteriorsTeaser() {
  const residence = residences[0];

  return (
    <section className="wrap section">
      <Reveal className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-muted">NOS INTÉRIEURS</p>
          <h2 className="text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.1] tracking-tighter">
            Des matières choisies,
            <br />
            <em className="font-display">pièce par pièce.</em>
          </h2>
        </div>
        <TextLink href={`/residences/${residence.slug}#galerie`} className="text-sm">
          Voir les {residence.gallery.length} visuels d&apos;{residence.shortName} <span aria-hidden>↗</span>
        </TextLink>
      </Reveal>

      <InteriorGalleryGrid residence={residence} limit={6} />
    </section>
  );
}
