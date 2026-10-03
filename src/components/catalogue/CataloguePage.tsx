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
        width={1500}
        height={1500}
        sizes="(min-width: 900px) 45vw, 90vw"
        className="select-none"
        draggable={false}
        priority={page <= 2}
      />
    </div>
  );
});
