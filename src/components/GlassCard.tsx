import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "accent";
  hover?: boolean;
}

export const GlassCard = ({ 
  children, 
  className, 
  variant = "default",
  hover = true 
}: GlassCardProps) => {
  return (
    <div
      className={[
        "glass-card rounded-3xl p-6",
        variant === "primary" && "glass-primary",
        variant === "accent" && "glass-accent",
        hover && "hover:scale-[1.02]",
        className
      ].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
};
