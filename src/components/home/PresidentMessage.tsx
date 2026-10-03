import { company } from "@/lib/residences";
import { Reveal } from "@/components/ui/Reveal";

export function PresidentMessage() {
  return (
    <section className="wrap section grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr]">
      <Reveal>
        <p className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-muted">
          <span className="gold-rule" /> LE MOT DU PRÉSIDENT
        </p>
        <h2 className="text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.1] tracking-tighter">
          Bien plus
          <br />
          <em className="font-display">qu&apos;une résidence.</em>
        </h2>
      </Reveal>
      <Reveal className="border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pl-14 lg:pt-0">
        {company.presidentMessage.map((paragraph) => (
          <p key={paragraph} className="mb-5 text-sm leading-loose text-muted last:mb-0">
            {paragraph}
          </p>
        ))}
        <div className="mt-8 flex items-center gap-4">
          <span className="gold-rule" />
          <p className="text-sm">
            {company.president}
            <span className="mt-1 block text-xs text-muted">Président de Corail City</span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
