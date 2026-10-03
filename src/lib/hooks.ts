"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useMotionAllowed(): boolean {
  const [allowed, setAllowed] = useState<boolean>(() => !prefersReducedMotion());
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = () => setAllowed(!query.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);
  return allowed;
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  // Elements reveal instantly when IntersectionObserver is unsupported or motion is reduced;
  // both are static per-mount capabilities, so this is computed once rather than set in an effect.
  const [visible, setVisible] = useState<boolean>(
    () => typeof window !== "undefined" && (!("IntersectionObserver" in window) || prefersReducedMotion()),
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, revealClassName: visible ? "reveal is-visible" : "reveal will-reveal" };
}
