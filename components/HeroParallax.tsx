"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { AuroraText } from './AuroraText';
import { ShimmerButton } from './ShimmerButton';
import { useTransition } from './TransitionProvider';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Detect mobile for optimized animations
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimized spring config for mobile
  const springConfig = isMobile 
    ? { stiffness: 200, damping: 40, bounce: 50 } 
    : { stiffness: 300, damping: 30, bounce: 100 };

  // Reduced movement ranges for mobile
  const mobileMultiplier = isMobile ? 0.6 : 1;

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000 * mobileMultiplier]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000 * mobileMultiplier]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [isMobile ? 10 : 15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [isMobile ? 15 : 20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [isMobile ? -300 : -500, isMobile ? 300 : 400]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden antialiased relative flex flex-col self-auto bg-gradient-to-br from-gray-900 via-black to-gray-800",
        isMobile 
          ? "h-[320vh] py-8 [perspective:800px]" 
          : "h-[320vh] py-12 [perspective:1000px]",
        "[transform-style:preserve-3d]"
      )}
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
        data-parallax-section
      >
        {/* Portfolio Section Header - Moving with Parallax */}
        <div className="text-center mb-20 px-4">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
            Crafted{" "}
            <span className="font-bold bg-gradient-to-r from-brand-gold via-brand-gold to-white bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          
          <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-6 w-20" />
          
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
            Every pergola tells a story of precision and passion
          </p>
        </div>

        <motion.div className={cn(
          "flex flex-row-reverse space-x-reverse mb-20",
          isMobile ? "space-x-8" : "space-x-20"
        )}>
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
        <motion.div className={cn(
          "flex flex-row mb-20",
          isMobile ? "space-x-8" : "space-x-20"
        )}>
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
        <motion.div className={cn(
          "flex flex-row-reverse space-x-reverse",
          isMobile ? "space-x-8" : "space-x-20"
        )}>
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const { startTransition, endTransition } = useTransition();
  const router = useRouter();

  const handleNavigation = (path: string, cardRef: React.RefObject<HTMLDivElement>, backgroundImage: string, title: string) => {
    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      startTransition({ cardRect, backgroundImage, title });
      
      setTimeout(() => {
        router.push(path);
        setTimeout(() => {
          endTransition();
        }, 100);
      }, 800);
    }
  };


  return (
    <div className="max-w-7xl relative mx-auto pt-8 pb-16 md:pt-12 md:pb-24 px-4 w-full left-0 top-0 z-20">
      {/* Backdrop for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent backdrop-blur-md rounded-3xl -mx-6 -my-6" />
      
      <div className="relative z-10 text-center">
        
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[0.9] tracking-tight drop-shadow-2xl text-center mb-1">
            pergolas crafted
          </h1>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight text-white drop-shadow-2xl text-center">
            to{" "}
            <AuroraText 
              colors={["#CF9160", "#7D7A71", "#FFFFFF", "#CF9160"]}
              speed={1.5}
              className="font-bold"
            >
              perfection
            </AuroraText>
          </h1>
        </motion.div>
        
        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-6"
        />

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="text-base md:text-lg text-white/85 max-w-xl mx-auto mb-8 leading-relaxed font-normal text-center"
        >
          Transform your outdoor space with bespoke pergolas designed with precision, 
          built with passion, and crafted to stand the test of time.
        </motion.p>

        {/* Design Choice Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-12 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Outdoor Design Card */}
            <OutdoorDesignCard />

            {/* Indoor Design Card */}
            <IndoorDesignCard />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col items-center mt-8 mb-12"
        >
          <p className="text-white/70 text-sm font-medium mb-4 tracking-wide">
            Explore Our Work
          </p>
          <motion.div
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-brand-gold/80 hover:text-brand-gold transition-colors duration-300 cursor-pointer"
            onClick={() => {
              const parallaxSection = document.querySelector('[data-parallax-section]');
              if (parallaxSection) {
                parallaxSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>

      </div>

    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  isMobile = false,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
  isMobile?: boolean;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: isMobile ? -10 : -20,
        scale: isMobile ? 1.01 : 1.02,
      }}
      key={product.title}
      className={cn(
        "group/product relative shrink-0 touch-manipulation",
        isMobile 
          ? "h-64 w-[20rem] sm:h-80 sm:w-[24rem]" 
          : "h-96 w-[30rem]"
      )}
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl group-hover/product:shadow-brand-gold/20"
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 rounded-xl"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none rounded-xl transition-opacity duration-300"></div>
      <div className="absolute inset-0 border-2 border-transparent group-hover/product:border-brand-gold/30 rounded-xl transition-all duration-300"></div>
      <h2 className="absolute bottom-6 left-6 opacity-0 group-hover/product:opacity-100 text-white text-xl font-semibold transition-all duration-300 transform translate-y-4 group-hover/product:translate-y-0">
        {product.title}
      </h2>
      <div className="absolute top-6 right-6 opacity-0 group-hover/product:opacity-100 transition-all duration-300">
        <div className="bg-brand-gold/20 backdrop-blur-sm rounded-full p-2">
          <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

const OutdoorDesignCard = () => {
  const { startTransition, endTransition } = useTransition();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      startTransition({ 
        cardRect, 
        backgroundImage: '/images/outdoorcard.png', 
        title: 'Outdoor Design' 
      });
      
      setTimeout(() => {
        router.push('/outdoor-design');
        setTimeout(() => {
          endTransition();
        }, 100);
      }, 800);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={handleClick}
      whileHover={{ 
        scale: 1.02,
        y: -8
      }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer relative overflow-hidden"
    >
      <div className="relative">
        {/* Subtle base border */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-brand-gold/30 transition-all duration-500 z-[1]" />
        
        {/* Glass morphism container */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl hover:shadow-brand-gold/20 transition-all duration-500 group-hover:bg-white/8">
          
          {/* Background image with better overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            style={{ backgroundImage: `url('/images/outdoorcard.png')` }}
          />
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80 rounded-2xl group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/70 transition-all duration-500" />
          
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Content with better typography hierarchy */}
          <div className="relative z-10 text-center">
            {/* Enhanced icon with better visual weight */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 backdrop-blur-sm border border-brand-gold/20 flex items-center justify-center group-hover:from-brand-gold/40 group-hover:to-brand-gold/20 group-hover:border-brand-gold/30 transition-all duration-300">
              <svg className="w-8 h-8 text-brand-gold group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 7 5-5 5 5" />
              </svg>
            </div>
            
            {/* Enhanced typography with better contrast */}
            <h3 className="text-2xl md:text-3xl font-light text-white mb-4 group-hover:text-brand-gold transition-colors duration-300 tracking-tight drop-shadow-lg">
              Outdoor <span className="font-bold bg-gradient-to-r from-brand-gold to-white bg-clip-text text-transparent">Design</span>
            </h3>
            
            {/* Better description styling */}
            <p className="text-white/80 group-hover:text-white/95 transition-colors duration-300 leading-relaxed mb-6 text-sm md:text-base">
              Premium pergolas, shade solutions, and complete outdoor living experiences
            </p>
            
            {/* Enhanced CTA with better visual feedback */}
            <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="flex items-center gap-2 text-brand-gold group-hover:text-white transition-colors duration-300">
                <span className="text-sm font-medium tracking-wide">Explore</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const IndoorDesignCard = () => {
  const { startTransition, endTransition } = useTransition();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      startTransition({ 
        cardRect, 
        backgroundImage: '/images/indoorblind.png', 
        title: 'Indoor Design' 
      });
      
      setTimeout(() => {
        router.push('/indoor-design');
        setTimeout(() => {
          endTransition();
        }, 100);
      }, 800);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={handleClick}
      whileHover={{ 
        scale: 1.02,
        y: -8
      }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer relative overflow-hidden"
    >
      <div className="relative">
        {/* Subtle base border */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-brand-gold/30 transition-all duration-500 z-[1]" />
        
        {/* Glass morphism container */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl hover:shadow-brand-gold/20 transition-all duration-500 group-hover:bg-white/8">
          
          {/* Background image with better overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            style={{ backgroundImage: `url('/images/indoorblind.png')` }}
          />
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80 rounded-2xl group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/70 transition-all duration-500" />
          
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Content with better typography hierarchy */}
          <div className="relative z-10 text-center">
            {/* Enhanced icon with better visual weight */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 backdrop-blur-sm border border-brand-gold/20 flex items-center justify-center group-hover:from-brand-gold/40 group-hover:to-brand-gold/20 group-hover:border-brand-gold/30 transition-all duration-300">
              <svg className="w-8 h-8 text-brand-gold group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h6v6H9z" />
              </svg>
            </div>
            
            {/* Enhanced typography with better contrast */}
            <h3 className="text-2xl md:text-3xl font-light text-white mb-4 group-hover:text-brand-gold transition-colors duration-300 tracking-tight drop-shadow-lg">
              Indoor <span className="font-bold bg-gradient-to-r from-brand-gold to-white bg-clip-text text-transparent">Design</span>
            </h3>
            
            {/* Better description styling */}
            <p className="text-white/80 group-hover:text-white/95 transition-colors duration-300 leading-relaxed mb-6 text-sm md:text-base">
              Sophisticated indoor environments with custom architectural elements
            </p>
            
            {/* Enhanced CTA with better visual feedback */}
            <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="flex items-center gap-2 text-brand-gold group-hover:text-white transition-colors duration-300">
                <span className="text-sm font-medium tracking-wide">Explore</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
