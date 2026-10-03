import type { Residence } from "@/lib/residences";
import { Reveal } from "@/components/ui/Reveal";

export function SerenitySection({ residence }: { residence: Residence }) {
  const { serenity } = residence;

  return (
    <section className="wrap section">
      <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-muted">
            <span className="gold-rule" /> {serenity.eyebrow}
          </p>
          <h2 className="text-[clamp(2.3rem,4vw,3.6rem)] leading-[1.1] tracking-tighter">
            {serenity.title}
            <br />
            <em className="font-display">{serenity.titleEmphasis}</em>
          </h2>
        </Reveal>
        <Reveal className="max-w-[365px]">
          <p className="text-sm leading-loose text-muted">{serenity.intro}</p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-4">
        {serenity.items.map((item, index) => (
          <Reveal key={item.title} className="bg-white p-7">
            <span className="font-display text-3xl text-gold-dark">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-base font-medium tracking-tight text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
