import { forwardRef } from "react";
import Image from "next/image";

type CataloguePageProps = {
  src: string;
  page: number;
  total: number;
  density?: "hard" | "soft";
};

export const CataloguePage = forwardRef<HTMLDivElement, CataloguePageProps>(function CataloguePage(
  { src, page, total, density = "soft" },
  ref,
) {
  return (
    <div ref={ref} data-density={density} className={`flipbook-page ${density === "hard" ? "is-cover" : ""}`}>
      <Image
        src={src}
        alt={`Catalogue Corail City, page ${page} sur ${total}`}
        width={2000}
        height={2000}
        quality={85}
        sizes="(min-width: 1400px) 700px, (min-width: 900px) 50vw, 100vw"
        className="select-none"
        draggable={false}
        priority={page <= 2}
      />
    </div>
  );
});
