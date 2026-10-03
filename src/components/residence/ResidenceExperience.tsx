"use client";

import { useCallback, useState } from "react";
import { formatArea, type Residence } from "@/lib/residences";
import { ResidenceHero } from "./ResidenceHero";
import { FactsStrip } from "./FactsStrip";
import { Manifesto } from "./Manifesto";
import { LivingFeature } from "./LivingFeature";
import { ApartmentsCatalog } from "./ApartmentsCatalog";
import { FloorSelector } from "./FloorSelector";
import { ApartmentDialog } from "./ApartmentDialog";
import { GalleryDialog } from "./GalleryDialog";
import { SmartHome } from "./SmartHome";
import { SerenitySection } from "./SerenitySection";
import { DetailsSection } from "./DetailsSection";
import { InteriorGallerySection } from "./InteriorGallerySection";
import { AddressSection } from "./AddressSection";
import { VisionQuote } from "@/components/shared/VisionQuote";
import { ContactSection, type ContactPrefill } from "./ContactSection";

export function ResidenceExperience({ residence }: { residence: Residence }) {
  const [apartmentRef, setApartmentRef] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [prefill, setPrefill] = useState<ContactPrefill | null>(null);

  const openGallery = useCallback((index: number) => setGalleryIndex(index), []);
  const stepGallery = useCallback(
    (direction: 1 | -1) => {
      setGalleryIndex((current) => {
        if (current === null) return current;
        return (current + direction + residence.gallery.length) % residence.gallery.length;
      });
    },
    [residence.gallery.length],
  );

  function inquireApartment(ref: string) {
    const apartment = residence.apartments.find((item) => item.ref === ref);
    setApartmentRef(null);
    setPrefill({
      reference: ref,
      type: "À définir",
      message: `Bonjour, je souhaite recevoir les informations, la typologie et les disponibilités de l'appartement ${ref} de la ${residence.name}${
        apartment ? ` (${formatArea(apartment.area)} m²)` : ""
      }.`,
    });
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <ResidenceHero residence={residence} />
      <FactsStrip residence={residence} />
      <Manifesto residence={residence} />
      <LivingFeature residence={residence} onOpenGallery={openGallery} />
      <ApartmentsCatalog residence={residence} onSelectApartment={setApartmentRef} />
      <FloorSelector residence={residence} onSelectApartment={setApartmentRef} />
      <SmartHome residence={residence} />
      <SerenitySection residence={residence} />
      <DetailsSection residence={residence} onOpenGallery={openGallery} />
      <InteriorGallerySection residence={residence} onOpenGallery={openGallery} />
      <AddressSection residence={residence} />
      <VisionQuote residence={residence} />
      <ContactSection residence={residence} prefill={prefill} />

      <ApartmentDialog
        residence={residence}
        reference={apartmentRef}
        onClose={() => setApartmentRef(null)}
        onInquire={inquireApartment}
      />
      <GalleryDialog residence={residence} index={galleryIndex} onClose={() => setGalleryIndex(null)} onStep={stepGallery} />
    </>
  );
}
