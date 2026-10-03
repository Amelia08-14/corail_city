import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex min-h-[52px] items-center justify-between gap-6 rounded-lg px-6 py-4 text-sm font-medium transition hover:-translate-y-0.5";

const variants = {
  primary: "bg-navy text-white hover:bg-navy-light",
  light: "bg-white text-navy hover:bg-ice",
} as const;

type Variant = keyof typeof variants;

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function LinkButton({ variant = "primary", className = "", children, ...rest }: LinkButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function ActionButton({ variant = "primary", className = "", children, ...rest }: ActionButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
