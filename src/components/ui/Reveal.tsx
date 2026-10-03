"use client";

import type { HTMLAttributes } from "react";
import { useReveal } from "@/lib/hooks";

type RevealProps = HTMLAttributes<HTMLDivElement>;

export function Reveal({ className = "", ...rest }: RevealProps) {
  const { ref, revealClassName } = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`${revealClassName} ${className}`} {...rest} />;
}
