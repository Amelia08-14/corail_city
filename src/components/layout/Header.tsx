"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company } from "@/lib/residences";

const residenceNav = [
  { href: "#residence", label: "La résidence" },
  { href: "#appartements", label: "Les appartements" },
  { href: "#art-de-vivre", label: "L'art de vivre" },
  { href: "#adresse", label: "L'adresse" },
];

const homeNav = [
  { href: "#residences", label: "Nos résidences" },
  { href: "#vision", label: "Notre vision" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const isResidence = pathname.startsWith("/residences/");
  const nav = isResidence ? residenceNav : homeNav;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) setOpen(false);
    }
    document.addEventListener("keydown", onKeydown);
    document.body.classList.toggle("locked", open);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [open]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 901px)");
    const listener = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return (
    <header className="site-header flex h-[72px] items-center justify-between gap-6 px-4">
      <Link href="/" className="brand w-[90px] flex-shrink-0" aria-label="Corail City, accueil">
        <Image src="/brand/logo.svg" alt="Corail City Immobilier" width={90} height={68} priority />
      </Link>

      <nav className="desktop-nav hidden items-center gap-6 rounded-full px-6 py-4 text-xs md:flex" aria-label="Navigation principale">
        {nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a href="#contact" className="header-contact hidden rounded-full px-4 py-3 text-xs md:inline-flex md:items-center md:gap-4">
        Parlons de votre projet <span aria-hidden>↗</span>
      </a>

      <button
        type="button"
        className="menu-toggle flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className="block h-px w-6 bg-current transition-transform"
          style={open ? { transform: "translateY(4px) rotate(45deg)" } : undefined}
        />
        <span
          className="block h-px w-6 bg-current transition-transform"
          style={open ? { transform: "translateY(-4px) rotate(-45deg)" } : undefined}
        />
      </button>

      {open ? (
        <nav
          id="mobile-menu"
          className="fixed inset-0 z-[99] flex flex-col gap-2 overflow-auto bg-[#eaf0f4] px-7 pt-32 pb-10 text-navy md:hidden"
          aria-label="Navigation mobile"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 font-display text-3xl"
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="border-b border-line py-4 font-display text-3xl">
            Parlons de votre projet ↗
          </a>
          <a href={company.phoneHref} className="mt-4 text-base">
            {company.phone}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
