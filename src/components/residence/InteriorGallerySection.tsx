import type { Residence } from "@/lib/residences";
import { Reveal } from "@/components/ui/Reveal";
import { InteriorGalleryGrid } from "@/components/shared/InteriorGalleryGrid";

export function InteriorGallerySection({
  residence,
  onOpenGallery,
}: {
  residence: Residence;
  onOpenGallery: (index: number) => void;
}) {
  return (
    <section className="wrap section" id="galerie">
      <Reveal className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-muted">LA GALERIE</p>
          <h2 className="text-[clamp(2.3rem,4vw,3.6rem)] leading-[1.1] tracking-tighter">
            Chaque pièce,
            <br />
            <em className="font-display">en image.</em>
          </h2>
        </div>
        <p className="max-w-[365px] text-sm leading-loose text-muted">
          {residence.gallery.length} visuels d&apos;ambiance : chambres, salles de bains, espaces communs et façade.
          Cliquez sur une image pour l&apos;agrandir.
        </p>
      </Reveal>

      <InteriorGalleryGrid residence={residence} onOpen={onOpenGallery} />
    </section>
  );
}
