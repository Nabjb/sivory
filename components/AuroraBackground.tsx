"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex min-h-screen flex-col items-center justify-start bg-gray-900 text-white dark:bg-zinc-900",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#CF9160_10%,#7D7A71_15%,#000000_20%,#CF9160_25%,#7D7A71_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

              "--brand-gold": "#CF9160",
              "--brand-gray": "#7D7A71", 
              "--brand-white": "#FFFFFF",
              "--brand-black": "#000000",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--dark-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-20 blur-[10px] filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--brand-gold)_10%,var(--brand-gray)_15%,var(--brand-black)_20%,var(--brand-gold)_25%,var(--brand-gray)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--brand-black)_0%,var(--brand-black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--brand-black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--brand-white)_0%,var(--brand-white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--brand-white)_16%)] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-overlay after:content-[""] [background-image:var(--dark-gradient),var(--aurora)] after:[background-image:var(--dark-gradient),var(--aurora)]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
