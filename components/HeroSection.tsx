'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuroraText } from './AuroraText'
import { ShimmerButton } from './ShimmerButton'

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleNavigation = (path: string) => {
    setIsTransitioning(true)
    
    // Wait for the transition animation to complete before navigating
    setTimeout(() => {
      router.push(path)
    }, 1500)
  }

  const stats = [
    { number: '15+', label: 'Years of Experience' },
    { number: '500+', label: 'Projects Completed' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Customer Support' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  }

  const statsVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-48 pb-20">
      {/* Luxury Dark Background */}
      <div className="absolute inset-0">
        {/* Rich dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        
        {/* Premium texture layer */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(207, 145, 96, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(125, 122, 113, 0.12) 0%, transparent 50%),
                radial-gradient(circle at 50% 20%, rgba(207, 145, 96, 0.08) 0%, transparent 60%)
              `
            }}
          />
        </div>
        
        {/* Luxury pergola showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: `url('/images/per1.jpg')`,
              filter: 'contrast(1.3) brightness(0.4) saturate(1.2)',
            }}
          />
        </motion.div>

        {/* Sophisticated dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        
        {/* Premium lighting effects */}
        <div className="absolute inset-0">
          {/* Elegant spotlight */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4, delay: 1 }}
            className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(207, 145, 96, 0.4) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
          {/* Side accent lighting */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 3, delay: 1.5 }}
            className="absolute top-1/3 -left-32 w-96 h-96 opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(207, 145, 96, 0.6) 0%, transparent 70%)',
              filter: 'blur(120px)',
            }}
          />
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 3, delay: 2 }}
            className="absolute top-2/3 -right-32 w-96 h-96 opacity-12"
            style={{
              background: 'radial-gradient(circle, rgba(125, 122, 113, 0.5) 0%, transparent 70%)',
              filter: 'blur(120px)',
            }}
          />
        </div>

      </div>

      {/* Crazy Transition Overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isTransitioning ? { 
          opacity: 1, 
          scale: 50,
          rotate: 360 
        } : { 
          opacity: 0, 
          scale: 0,
          rotate: 0 
        }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut",
          type: "spring",
          stiffness: 50 
        }}
        className="fixed inset-0 z-50 bg-gradient-to-r from-brand-gold via-brand-gray to-brand-black rounded-full"
        style={{ 
          transformOrigin: 'center center',
          pointerEvents: isTransitioning ? 'all' : 'none'
        }}
      />

      {/* Particle Effect Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                x: '50vw', 
                y: '50vh', 
                scale: 0 
              }}
              animate={{ 
                opacity: [0, 1, 0], 
                x: `${Math.random() * 100}vw`, 
                y: `${Math.random() * 100}vh`, 
                scale: [0, 1, 0] 
              }}
              transition={{ 
                duration: 1.2, 
                delay: i * 0.05,
                ease: "easeOut" 
              }}
              className="absolute w-2 h-2 bg-brand-gold rounded-full"
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10 -mt-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Main Title */}
          <motion.div
            variants={titleVariants}
            className="mb-12 relative text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-brand-gold/80 text-sm md:text-base font-medium tracking-widest uppercase mb-6 text-center"
            >
              Premium Outdoor Solutions
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white leading-tight tracking-tight drop-shadow-2xl text-center"
            >
              pergolas crafted
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight mt-2 text-white drop-shadow-2xl text-center"
            >
            to{" "}
            <AuroraText 
              colors={["#CF9160", "#7D7A71", "#FFFFFF", "#CF9160"]}
              speed={1.5}
              className="font-bold"
            >
              perfection
            </AuroraText>
            </motion.h1>
            
            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="h-0.5 bg-brand-gold mx-auto mt-6"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-16 leading-relaxed font-light text-center drop-shadow-lg"
          >
            Transform your outdoor space with bespoke pergolas designed with precision, 
            built with passion, and crafted to stand the test of time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShimmerButton
                onClick={() => handleNavigation('/outdoor-design')}
                shimmerColor="#000000"
                background="linear-gradient(135deg, #CF9160 0%, #7D7A71 100%)"
                className="px-10 py-5 text-white font-semibold"
                shimmerDuration="2s"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 7 5-5 5 5" />
                  </svg>
                  Outdoor Design
                </span>
              </ShimmerButton>
            </motion.div>
            
            <motion.button
              onClick={() => handleNavigation('/indoor-design')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-5 border-2 border-brand-gold text-white font-semibold rounded-full hover:bg-brand-gold hover:text-black transition-all duration-300 overflow-hidden group backdrop-blur-sm bg-white/10"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h6v6H9z" />
                </svg>
                Indoor Design
              </span>
              <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>

          {/* Stats Section - Enhanced */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto mt-20 mb-24"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={statsVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
                className="text-center group"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-brand-gold/50 transition-all duration-300 group-hover:bg-white/15 shadow-xl hover:shadow-2xl">
                  <h3 className="text-3xl md:text-4xl font-bold text-brand-gold mb-2 group-hover:text-white transition-colors duration-300">
                    {stat.number}
                  </h3>
                  <p className="text-white/80 font-medium text-sm md:text-base group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}

export default HeroSection
