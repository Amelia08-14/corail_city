import { Reveal } from "@/components/ui/Reveal";
import type { Residence } from "@/lib/residences";

export function VisionQuote({ residence, id }: { residence: Residence; id?: string }) {
  const { vision } = residence;

  return (
    <section className="relative mx-[14px] overflow-hidden rounded-[20px] bg-navy py-24 text-white" id={id}>
      <span className="vision-mark" aria-hidden>
        &ldquo;
      </span>
      <Reveal className="wrap relative z-[1] text-center">
        <p className="mb-8 text-xs tracking-[0.2em] text-ice">L&apos;ENGAGEMENT CORAIL CITY</p>
        <blockquote className="font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-tight tracking-tight">
          « {vision.quote}
          <br />
          <em>{vision.quoteEmphasis} »</em>
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="h-px w-6 flex-shrink-0 bg-cyan" />
          <p className="text-left text-sm">
            {vision.author}
            <span className="mt-1 block text-xs text-ice">{vision.role}</span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
