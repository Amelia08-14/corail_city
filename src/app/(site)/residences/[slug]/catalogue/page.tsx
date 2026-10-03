import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResidence, residences } from "@/lib/residences";
import { CatalogueFlipbook } from "@/components/catalogue/CatalogueFlipbook";

export function generateStaticParams() {
  return residences.map((residence) => ({ slug: residence.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const residence = getResidence(slug);
  if (!residence) return {};
  return {
    title: `Catalogue — ${residence.name}`,
    description: `Feuilletez le catalogue complet de la ${residence.name} : typologies, plans 3D et prestations.`,
  };
}

export default async function CataloguePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const residence = getResidence(slug);
  if (!residence) notFound();

  return (
    <section className="relative mx-[14px] overflow-hidden rounded-[22px] bg-navy pb-20 pt-36 text-white">
      <div className="wrap">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Link href={`/residences/${residence.slug}`} className="mb-6 inline-flex items-center gap-3 text-xs text-white/70 hover:text-gold">
              <span aria-hidden>←</span> Retour à {residence.shortName}
            </Link>
            <p className="mb-5 flex items-center gap-3 text-xs tracking-[0.2em] text-ice">
              <span className="gold-rule" /> LE CATALOGUE COMPLET
            </p>
            <h1 className="text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] tracking-tighter">
              {residence.name}.
              <br />
              <em className="font-display">Feuilletez chaque page.</em>
            </h1>
          </div>
          <a
            href={residence.catalogPdf}
            download
            className="inline-flex min-h-[52px] items-center gap-6 rounded-lg bg-white px-6 py-4 text-sm text-navy transition hover:bg-ice"
          >
            Télécharger le PDF <span aria-hidden>↙</span>
          </a>
        </div>

        <p className="mx-auto mb-10 max-w-xl text-center text-sm text-white/70">
          Cliquez sur un coin de page ou utilisez les flèches pour tourner les pages : architecture, prestations, plans
          d&apos;étage et les {residence.apartments.length} fiches typologies avec leurs plans 3D détaillés.
        </p>

        <CatalogueFlipbook pages={residence.cataloguePages} />
      </div>
    </section>
  );
}
