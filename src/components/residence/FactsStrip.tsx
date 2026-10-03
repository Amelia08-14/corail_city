import type { Residence } from "@/lib/residences";

export function FactsStrip({ residence }: { residence: Residence }) {
  return (
    <div className="wrap grid grid-cols-1 gap-6 border-b border-line py-9 sm:grid-cols-3 sm:gap-5">
      {residence.facts.map((fact) => (
        <div key={fact.label} className="border-l border-line pl-6 first:border-l-0 first:pl-0 sm:pl-8">
          <span className="text-[0.6rem] font-semibold tracking-[0.15em] text-[#6f8190]">{fact.label}</span>
          <p className="mt-3 text-2xl font-normal tracking-tight sm:text-3xl">
            {fact.value}
            {fact.italic ? <span className="ml-2 font-display text-xl italic text-[#a1afb9]">{fact.italic}</span> : null}
            {fact.suffix ? <small className="ml-2 font-display text-xl italic">{fact.suffix}</small> : null}
          </p>
        </div>
      ))}
    </div>
  );
}
