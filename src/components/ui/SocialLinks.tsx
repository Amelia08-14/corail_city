import { company } from "@/lib/residences";

const icons = {
  instagram: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M15 8.5h-2c-.8 0-1.5.7-1.5 1.5v2h3.4l-.5 3H11.5V21H8v-6h-2v-3h2v-2.3C8 7.2 9.7 5.5 12.2 5.5H15v3Z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M14 4v10.2a3.3 3.3 0 1 1-2.6-3.23" />
      <path d="M14 4c.4 2.2 2 3.8 4.2 4.1" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10" x2="7.5" y2="16.5" />
      <circle cx="7.5" cy="7" r="0.6" fill="currentColor" />
      <path d="M11.5 16.5V10M11.5 12.7c0-1.5 1-2.7 2.4-2.7 1.5 0 2.1 1 2.1 2.9v3.6" />
    </svg>
  ),
};

export function SocialLinks({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const entries = Object.entries(company.socials) as [keyof typeof icons, { label: string; href: string }][];
  const toneClass =
    tone === "dark"
      ? "border-white/25 text-white/80 hover:border-gold hover:text-gold"
      : "border-line text-navy hover:border-gold-dark hover:text-gold-dark";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {entries.map(([key, social]) => (
        <a
          key={key}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Corail City sur ${key}`}
          className={`grid h-9 w-9 place-items-center rounded-full border transition ${toneClass}`}
        >
          {icons[key]}
        </a>
      ))}
    </div>
  );
}
