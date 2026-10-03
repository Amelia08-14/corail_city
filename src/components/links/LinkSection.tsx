import type { ReactNode } from "react";

export function LinkSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="w-full">
      <p className="mb-3 flex items-center gap-3 text-[0.65rem] tracking-[0.2em] text-white/55">
        <span className="h-px w-5 flex-shrink-0 bg-gold" /> {title}
      </p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}
