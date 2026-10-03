import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company, getResidence, residences } from "@/lib/residences";
import { ResidenceExperience } from "@/components/residence/ResidenceExperience";

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
    title: residence.name,
    description: residence.metaDescription,
  };
}

export default async function ResidencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const residence = getResidence(slug);
  if (!residence) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: residence.name,
    description: residence.metaDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: residence.neighborhood,
      addressRegion: residence.city,
      addressCountry: "DZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: residence.address.lat,
      longitude: residence.address.lng,
    },
    telephone: company.phone,
    email: company.email,
    numberOfAccommodationUnits: residence.apartments.length,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ResidenceExperience residence={residence} />
    </>
  );
}
