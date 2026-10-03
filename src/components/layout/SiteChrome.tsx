"use client";

import { useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ChatWidget } from "./ChatWidget";
import { LegalDialog } from "./LegalDialog";

export function SiteChrome({ children }: { children: ReactNode }) {
  const [legalOpen, setLegalOpen] = useState(false);

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer onOpenLegal={() => setLegalOpen(true)} />
      <ChatWidget />
      <LegalDialog open={legalOpen} onClose={() => setLegalOpen(false)} />
    </>
  );
}
