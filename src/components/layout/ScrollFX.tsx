"use client";

import { useEffect } from "react";

export function ScrollFX() {
  useEffect(() => {
    let queued = false;

    function update() {
      queued = false;
      document.documentElement.classList.toggle("is-scrolled", window.scrollY > 40);
      const fullHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = fullHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / fullHeight)) : 0;
      document.documentElement.style.setProperty("--reading-progress", String(progress));
    }

    function queue() {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  return null;
}
