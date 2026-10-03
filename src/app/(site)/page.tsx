import { HomeHero } from "@/components/home/HomeHero";
import { ResidencesShowcase } from "@/components/home/ResidencesShowcase";
import { ConceptSection } from "@/components/home/ConceptSection";
import { InteriorsTeaser } from "@/components/home/InteriorsTeaser";
import { PresidentMessage } from "@/components/home/PresidentMessage";
import { VisionQuote } from "@/components/shared/VisionQuote";
import { HomeContact } from "@/components/home/HomeContact";
import { residences } from "@/lib/residences";

export default function Home() {
  return (
    <>
      <HomeHero />
      <ResidencesShowcase />
      <ConceptSection />
      <InteriorsTeaser />
      <PresidentMessage />
      <VisionQuote residence={residences[0]} id="vision" />
      <HomeContact />
    </>
  );
}
