import { ScrollFX } from "@/components/layout/ScrollFX";
import { SiteChrome } from "@/components/layout/SiteChrome";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollFX />
      <div className="reading-progress fixed left-0 top-0 z-[160] h-[3px] w-full bg-cyan" aria-hidden />
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <SiteChrome>{children}</SiteChrome>
    </>
  );
}
