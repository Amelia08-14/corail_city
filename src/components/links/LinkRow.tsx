import { linkIcons, type LinkIconName } from "./icons";

export function LinkRow({
  icon,
  title,
  subtitle,
  href,
  external = true,
}: {
  icon: LinkIconName;
  title: string;
  subtitle: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-xl border border-navy/10 bg-white px-5 py-4 text-navy shadow-[0_4px_16px_rgba(3,20,40,0.08)] transition hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-[0_12px_28px_rgba(3,20,40,0.16)]"
    >
      <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border border-gold/35 bg-gradient-to-b from-mist to-white text-navy transition group-hover:border-gold group-hover:text-gold-dark">
        {linkIcons[icon]}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.95rem] font-medium leading-tight tracking-tight">{title}</span>
        <span className="block truncate text-xs text-muted">{subtitle}</span>
      </span>
      <span
        aria-hidden
        className="flex-shrink-0 text-base text-line transition group-hover:translate-x-0.5 group-hover:text-gold-dark"
      >
        ↗
      </span>
    </a>
  );
}
