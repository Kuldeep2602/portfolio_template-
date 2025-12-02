import type { ReactNode } from "react";

interface SocialButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  icon: ReactNode;
}

export const SocialButton = ({ children, href, className, icon }: SocialButtonProps) => {
  const Component: any = href ? "a" : "button";
  return (
    <Component
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={[
        "btn-glass rounded-2xl px-6 py-3 flex items-center gap-3",
        "text-gray-900 font-medium",
        "transition-all duration-300",
        className
      ].filter(Boolean).join(" ")}
    >
      {icon}
      {children}
    </Component>
  );
};
