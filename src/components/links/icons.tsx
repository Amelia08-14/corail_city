export const linkIcons = {
  facebook: (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15.2 8.2h-1.8c-.9 0-1.6.7-1.6 1.6v2.1h3.3l-.4 2.9h-2.9V21H8.9v-6.2H7V12h1.9V9.5c0-2.1 1.5-3.8 3.9-3.8h2.4v2.5Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13.8 3.8v10.9a3.4 3.4 0 1 1-2.6-3.3" />
      <path d="M13.8 3.8c.4 2.5 2.2 4.3 4.7 4.6v2.8c-1.8-.1-3.4-.7-4.7-1.7" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
      <line x1="7.6" y1="10.2" x2="7.6" y2="16.6" />
      <circle cx="7.6" cy="7.2" r="0.5" fill="currentColor" />
      <path d="M11.4 16.6v-6.4M11.4 13.1c0-1.6 1.1-2.9 2.6-2.9 1.6 0 2.3 1.1 2.3 3.1v3.3" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 4h2.6l1.3 3.6-1.9 1.3a12.3 12.3 0 0 0 6.1 6.1l1.3-1.9L20 14.4V17c0 1.1-.9 1.9-2 1.8C11.3 18.2 5.8 12.7 5.2 6.1 5.1 5 5.9 4 7 4Z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3.5" y="5.8" width="17" height="12.4" rx="1.8" />
      <path d="m4.3 6.6 7.7 6 7.7-6" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s6.8-6.1 6.8-11A6.8 6.8 0 0 0 5.2 10c0 4.9 6.8 11 6.8 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  ),
} as const;

export type LinkIconName = keyof typeof linkIcons;
