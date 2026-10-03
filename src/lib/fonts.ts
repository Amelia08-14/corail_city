import localFont from "next/font/local";

export const manrope = localFont({
  src: "../fonts/manrope.woff2",
  variable: "--font-manrope",
  weight: "400 700",
  display: "swap",
});

export const cormorantGaramond = localFont({
  src: [
    { path: "../fonts/cormorant-garamond.woff2", weight: "300 700", style: "normal" },
    { path: "../fonts/cormorant-garamond-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});
