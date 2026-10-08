import { linkIcons, type LinkIconName } from "./icons";

/** Ligne de coordonnées — style panneau « Coordonnées » du catalogue (page 28). */
export function LinkRow({
  icon,
  label,
  value,
  href,
  external = true,
}: {
  icon: LinkIconName;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex min-h-[72px] items-center gap-4 border-b border-white/15 py-3.5 last:border-b-0 active:bg-white/5"
    >
      <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-cyan text-navy shadow-[0_0_0_4px_#33cbff26] transition group-hover:scale-105">
        {linkIcons[icon]}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.68rem] font-bold uppercase tracking-[0.14em] text-gold">{label}</span>
        <span className="block truncate text-[1.02rem] font-medium text-white">{value}</span>
      </span>
      <span aria-hidden className="text-lg text-white/40 transition group-hover:translate-x-0.5 group-hover:text-cyan">
        ↗
      </span>
    </a>
  );
}
