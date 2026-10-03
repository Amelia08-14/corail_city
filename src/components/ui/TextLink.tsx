import type { AnchorHTMLAttributes, ReactNode } from "react";

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function TextLink({ className = "", children, ...rest }: TextLinkProps) {
  return (
    <a
      className={`inline-flex items-center gap-7 border-b border-current py-2 text-sm font-medium transition-all hover:gap-10 hover:text-navy-light ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
