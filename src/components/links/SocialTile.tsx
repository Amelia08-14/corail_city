import { linkIcons, type LinkIconName } from "./icons";

export function SocialTile({ icon, name, handle, href }: { icon: LinkIconName; name: string; handle: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border border-cyan/40 bg-white px-3 pb-4 pt-5 text-center shadow-[0_8px_24px_rgba(9,56,110,0.1)] transition active:scale-[0.97] hover:-translate-y-0.5 hover:border-cyan hover:shadow-[0_14px_32px_rgba(9,56,110,0.18)]"
    >
      <span className="absolute -left-5 -top-5 h-10 w-10 rotate-45 bg-ice" aria-hidden />
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-navy text-white transition group-hover:bg-cyan group-hover:text-navy [&>svg]:h-6 [&>svg]:w-6">
        {linkIcons[icon]}
      </span>
      <span className="text-[0.95rem] font-bold uppercase tracking-tight text-navy">{name}</span>
      <span className="h-0.5 w-7 bg-cyan" aria-hidden />
      <span className="w-full truncate text-xs text-muted">{handle}</span>
    </a>
  );
}
