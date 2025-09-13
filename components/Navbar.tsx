"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode | (({ scrollStage }: { scrollStage: number }) => React.ReactNode);
  className?: string;
  visible?: boolean;
  scrollStage?: number;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode | (({ scrollStage }: { scrollStage: number }) => React.ReactNode);
  className?: string;
  visible?: boolean;
  scrollStage?: number;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [scrollStage, setScrollStage] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Multi-stage scroll behavior
    if (latest < 50) {
      setScrollStage(0); // Transparent
      setVisible(false);
    } else if (latest < 150) {
      setScrollStage(1); // Semi-transparent
      setVisible(true);
    } else if (latest < 300) {
      setScrollStage(2); // Solid background
      setVisible(true);
    } else {
      setScrollStage(3); // Compact mode
      setVisible(true);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
      animate={{
        paddingTop: scrollStage >= 3 ? "8px" : "24px",
      }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean; scrollStage?: number }>,
              { visible, scrollStage },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible, scrollStage = 0 }: NavBodyProps) => {
  // Advanced backdrop and styling based on scroll stage
  const getBackdropFilter = () => {
    switch (scrollStage) {
      case 0: return "none";
      case 1: return "blur(8px)";
      case 2: return "blur(12px)";
      case 3: return "blur(16px)";
      default: return "none";
    }
  };

  const getBackground = () => {
    switch (scrollStage) {
      case 0: return "rgba(0, 0, 0, 0)";
      case 1: return "rgba(0, 0, 0, 0.3)";
      case 2: return "rgba(0, 0, 0, 0.6)";
      case 3: return "rgba(0, 0, 0, 0.8)";
      default: return "rgba(0, 0, 0, 0)";
    }
  };

  const getBorderGlow = () => {
    if (scrollStage >= 2) {
      return "0 0 20px rgba(207, 145, 96, 0.2), 0 0 40px rgba(207, 145, 96, 0.1)";
    }
    return "none";
  };

  return (
    <motion.div
      animate={{
        backdropFilter: getBackdropFilter(),
        background: getBackground(),
        boxShadow: visible
          ? `0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2), ${getBorderGlow()}`
          : "none",
        scale: scrollStage >= 3 ? 0.95 : 1,
        borderRadius: scrollStage >= 2 ? "24px" : "32px",
        border: scrollStage >= 2 ? "1px solid rgba(207, 145, 96, 0.2)" : "1px solid transparent",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-6xl flex-row items-center justify-between self-start px-6 py-3 lg:flex",
        className,
      )}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        animate={{
          opacity: scrollStage >= 2 ? 0.1 : 0,
          background: scrollStage >= 2 
            ? "linear-gradient(135deg, rgba(207, 145, 96, 0.1), rgba(125, 122, 113, 0.05))"
            : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10 flex w-full items-center justify-between">
        {typeof children === 'function' ? children({ scrollStage: scrollStage || 0 }) : children}
      </div>
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const pathname = usePathname();

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (hovered === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onItemClick?.();
    }
    if (e.key === 'ArrowRight' && index < items.length - 1) {
      const nextLink = document.querySelector(`[data-nav-index="${index + 1}"]`) as HTMLElement;
      nextLink?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      const prevLink = document.querySelector(`[data-nav-index="${index - 1}"]`) as HTMLElement;
      prevLink?.focus();
    }
  };

  return (
    <motion.div
      onMouseLeave={() => {
        setHovered(null);
        setMousePosition({ x: 0, y: 0 });
      }}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium text-white lg:flex",
        className,
      )}
      role="menubar"
      aria-label="Main navigation"
    >
      {items.map((item, idx) => {
        const isActive = pathname === item.link;
        
        return (
          <motion.div key={`link-${idx}`} className="relative">
            <Link
              href={item.link}
              data-nav-index={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onFocus={() => setHovered(idx)}
              onBlur={() => setHovered(null)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onClick={onItemClick}
              className={cn(
                "relative block px-5 py-2.5 transition-all duration-300 rounded-full",
                "font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-brand-gold/50",
                isActive 
                  ? "text-brand-gold font-semibold" 
                  : "text-white hover:text-brand-gold focus:text-brand-gold"
              )}
              aria-current={isActive ? "page" : undefined}
              role="menuitem"
            >
              {/* Magnetic hover effect */}
              {hovered === idx && (
                <motion.div
                  layoutId="magnetic-hover"
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm border border-white/20"
                  animate={{
                    x: mousePosition.x * 0.1,
                    y: mousePosition.y * 0.1,
                    scale: 1.05,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                />
              )}
              
              {/* Active state indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/10 backdrop-blur-sm border border-brand-gold/40"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              
              {/* Underline animation */}
              <motion.div
                className="absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-brand-gold to-white"
                animate={{
                  width: isActive ? "80%" : hovered === idx ? "60%" : "0%",
                  x: "-50%",
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
              
              <span className="relative z-20 whitespace-nowrap select-none">
                {item.name}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible, scrollStage = 0 }: MobileNavProps) => {
  const getBackdropFilter = () => {
    switch (scrollStage) {
      case 0: return "none";
      case 1: return "blur(8px)";
      case 2: return "blur(12px)";
      case 3: return "blur(16px)";
      default: return visible ? "blur(10px)" : "none";
    }
  };

  const getBackground = () => {
    switch (scrollStage) {
      case 0: return "rgba(0, 0, 0, 0)";
      case 1: return "rgba(0, 0, 0, 0.4)";
      case 2: return "rgba(0, 0, 0, 0.7)";
      case 3: return "rgba(0, 0, 0, 0.85)";
      default: return visible ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)";
    }
  };

  return (
    <motion.div
      animate={{
        backdropFilter: getBackdropFilter(),
        background: getBackground(),
        boxShadow: visible
          ? `0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), ${scrollStage >= 2 ? "0 0 20px rgba(207, 145, 96, 0.3)" : ""}`
          : "none",
        borderRadius: visible ? "16px" : "24px",
        scale: scrollStage >= 3 ? 0.96 : 1,
        border: scrollStage >= 2 ? "1px solid rgba(207, 145, 96, 0.3)" : "1px solid transparent",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between px-3 py-3 lg:hidden",
        "touch-manipulation", // Optimize for touch
        className,
      )}
    >
      {/* Mobile gradient background */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        animate={{
          opacity: scrollStage >= 2 ? 0.15 : 0,
          background: scrollStage >= 2 
            ? "linear-gradient(135deg, rgba(207, 145, 96, 0.15), rgba(125, 122, 113, 0.08))"
            : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10 w-full">
        {typeof children === 'function' ? children({ scrollStage: scrollStage || 0 }) : children}
      </div>
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className={cn(
            "absolute inset-x-0 top-20 z-50 mx-2 flex flex-col items-start justify-start gap-6 rounded-2xl",
            "bg-gradient-to-br from-black/90 via-black/85 to-black/90 backdrop-blur-xl",
            "border border-brand-gold/20 px-6 py-8",
            "shadow-2xl shadow-black/50",
            "touch-manipulation", // Optimize for touch
            className,
          )}
        >
          {/* Mobile menu gradient overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-gold/5 to-transparent opacity-50" />
          
          {/* Close area - tap outside to close */}
          <div 
            className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
            style={{ top: 0 }}
          />
          
          <div className="relative z-10 flex w-full flex-col gap-6">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button 
      onClick={onClick} 
      className={cn(
        "relative p-3 rounded-xl transition-all duration-300 touch-manipulation",
        "bg-white/5 backdrop-blur-sm border border-white/10",
        "hover:bg-white/10 hover:border-brand-gold/30 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-brand-gold/50",
        "text-white hover:text-brand-gold"
      )}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {/* Button background glow */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0"
        animate={{
          opacity: isOpen ? 0.3 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Icon container with rotation */}
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10"
      >
        {isOpen ? (
          <IconX className="h-6 w-6" />
        ) : (
          <IconMenu2 className="h-6 w-6" />
        )}
      </motion.div>
    </motion.button>
  );
};

export const NavbarLogo = ({ scrollStage = 0 }: { scrollStage?: number }) => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <motion.div 
        className="relative rounded-full bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm border border-white/20 shadow-lg"
        animate={{
          scale: scrollStage >= 3 ? 0.9 : 1,
          padding: scrollStage >= 3 ? "6px" : "8px",
          boxShadow: scrollStage >= 2 
            ? "0 0 30px rgba(207, 145, 96, 0.4), 0 0 60px rgba(207, 145, 96, 0.2)" 
            : "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
        whileHover={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(207, 145, 96, 0.15))",
          borderColor: "rgba(207, 145, 96, 0.5)",
          boxShadow: "0 0 35px rgba(207, 145, 96, 0.5), 0 0 70px rgba(207, 145, 96, 0.3)",
          scale: scrollStage >= 3 ? 0.95 : 1.05,
        }}
        transition={{ 
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 25
        }}
      >
        {/* Breathing animation background */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-gold/15 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-brand-gold/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          animate={{
            scale: scrollStage >= 3 ? 0.85 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/images/sivorylogo.png"
            alt="Sivory Design Logo"
            width={300}
            height={300}
            className="h-6 w-6 object-contain relative z-10"
            priority
            style={{
              filter: `drop-shadow(0 0 ${scrollStage >= 2 ? '12px' : '8px'} rgba(207, 145, 96, 0.4)) contrast(1.1) brightness(1.1) saturate(1.2)`,
            }}
          />
        </motion.div>
      </motion.div>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

// Main Navbar Implementation
const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Indoor Design", link: "/indoor-design" },
    { name: "Outdoor Design", link: "/outdoor-design" },
    { name: "About", link: "/about" },
  ];

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        {({ scrollStage }) => (
          <>
            <NavbarLogo scrollStage={scrollStage} />
            <NavItems items={navItems} />
            <motion.div
              animate={{
                scale: scrollStage >= 3 ? 0.9 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <NavbarButton 
                href="/contact" 
                variant="primary"
                className={cn(
                  "transition-all duration-300",
                  scrollStage >= 2 && "bg-gradient-to-r from-brand-gold to-brand-gold/80 hover:from-brand-gold/90 hover:to-brand-gold/70"
                )}
              >
                Contact
              </NavbarButton>
            </motion.div>
          </>
        )}
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        {({ scrollStage }) => (
          <>
            <MobileNavHeader>
              <NavbarLogo scrollStage={scrollStage} />
              <MobileNavToggle
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              />
            </MobileNavHeader>
            <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
              {navItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  className="w-full"
                >
                  <Link
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center w-full px-4 py-4 rounded-xl transition-all duration-300",
                      "text-lg font-medium touch-manipulation",
                      "hover:bg-white/5 active:bg-white/10 hover:translate-x-2",
                      "border border-transparent hover:border-brand-gold/20",
                      "text-white hover:text-brand-gold",
                      "focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                    )}
                  >
                    <span className="relative">
                      {item.name}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-brand-gold"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 + 0.2, duration: 0.3 }}
                className="w-full mt-4 pt-4 border-t border-white/10"
              >
                <NavbarButton 
                  href="/contact" 
                  variant="primary" 
                  className="w-full justify-center py-4 text-lg font-semibold bg-gradient-to-r from-brand-gold to-brand-gold/80 hover:from-brand-gold/90 hover:to-brand-gold/70 touch-manipulation"
                >
                  Contact Us
                </NavbarButton>
              </motion.div>
            </MobileNavMenu>
          </>
        )}
      </MobileNav>
    </Navbar>
  );
};

export default MainNavbar;