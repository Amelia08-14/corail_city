"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const corner = "absolute h-5 w-5 border-gold";

export function SelfQRCode() {
  const [url] = useState<string | null>(() =>
    typeof window === "undefined" ? null : window.location.href.split("#")[0],
  );

  return (
    <div className="relative p-4">
      <span className={`${corner} left-0 top-0 border-l-2 border-t-2 rounded-tl-md`} aria-hidden />
      <span className={`${corner} right-0 top-0 border-r-2 border-t-2 rounded-tr-md`} aria-hidden />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2 rounded-bl-md`} aria-hidden />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2 rounded-br-md`} aria-hidden />
      <div className="flex h-[168px] w-[168px] items-center justify-center rounded-xl bg-white p-3 shadow-[0_14px_45px_rgba(0,0,0,0.4)]">
        {url ? (
          <QRCodeSVG value={url} size={144} level="M" fgColor="#09386e" bgColor="#ffffff" />
        ) : (
          <div className="h-[144px] w-[144px] animate-pulse rounded-lg bg-mist" />
        )}
      </div>
    </div>
  );
}
