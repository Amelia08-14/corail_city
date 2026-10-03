import Image from "next/image";
import type { Residence } from "@/lib/residences";
import { Reveal } from "@/components/ui/Reveal";

const SPANS = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
];

export function InteriorGalleryGrid({
  residence,
  limit,
  onOpen,
}: {
  residence: Residence;
  limit?: number;
  onOpen?: (index: number) => void;
}) {
  const images = limit ? residence.gallery.slice(0, limit) : residence.gallery;

  return (
    <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4 md:gap-4">
      {images.map((image, index) => {
        const span = SPANS[index % SPANS.length];
        const content = (
          <>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02172acc] via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute inset-x-3 bottom-3 translate-y-2 text-xs text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              {image.title}
            </span>
          </>
        );
        return (
          <Reveal key={image.src} className={`group relative overflow-hidden rounded-xl bg-mist ${span}`}>
            {onOpen ? (
              <button
                type="button"
                onClick={() => onOpen(index)}
                className="relative block h-full w-full text-left"
                aria-label={`Agrandir : ${image.title}`}
              >
                {content}
              </button>
            ) : (
              <div className="relative h-full w-full">{content}</div>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
