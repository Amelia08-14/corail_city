import type { Metadata } from "next";
import { manrope, cormorantGaramond } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Corail City — Une nouvelle façon d'habiter Alger",
    template: "%s — Corail City",
  },
  description:
    "Corail City, promoteur immobilier. Découvrez nos résidences à Alger, pensées pour le confort, l'élégance et la sérénité.",
  icons: {
    icon: "/brand/mark.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${manrope.variable} ${cormorantGaramond.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
