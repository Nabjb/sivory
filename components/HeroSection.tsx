'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Elegant Background with Layered Images */}
      <div className="absolute inset-0">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-white via-brand-white to-brand-gray/10" />
        
        {/* First image - Large background element */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-15"
            style={{
              backgroundImage: `url('/images/per1.jpg')`,
            }}
          />
        </motion.div>

        {/* Sophisticated overlay pattern */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-white/80 via-transparent to-brand-white/40" />

        {/* Geometric accent elements */}
        <motion.div
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute top-20 left-8 md:top-24 md:left-16 w-16 h-16 border-2 border-brand-gold/30 rotate-45"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute top-1/3 left-12 w-2 h-2 bg-brand-gold rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="absolute bottom-1/4 left-8 w-1 h-1 bg-brand-gray rounded-full"
        />
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

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Main Title */}
          <motion.div
            variants={titleVariants}
            className="mb-12 relative"
          >
            {/* Elegant backdrop */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-white/60 to-transparent backdrop-blur-sm rounded-3xl -mx-8 -my-4" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-brand-gold/60 text-sm md:text-base font-medium tracking-widest uppercase mb-4 text-center"
              >
                Premium Outdoor Solutions
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-brand-black leading-tight tracking-tight">
                pergolas crafted
              </h1>
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-gray to-brand-gold leading-tight mt-2"
              >
                to perfection
              </motion.h1>
              
              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100px' }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="h-0.5 bg-brand-gold mx-auto mt-6"
              />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-brand-black/80 max-w-2xl mx-auto mb-16 leading-relaxed font-light text-center"
          >
            Transform your outdoor space with bespoke pergolas designed with precision, 
            built with passion, and crafted to stand the test of time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.button
              onClick={() => handleNavigation('/outdoor-design')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-5 bg-gradient-to-r from-brand-gold to-brand-gray text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 7 5-5 5 5" />
                </svg>
                Outdoor Design
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gray to-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            
            <motion.button
              onClick={() => handleNavigation('/indoor-design')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-5 border-2 border-brand-gold text-brand-black font-semibold rounded-full hover:bg-brand-gold hover:text-white transition-all duration-300 overflow-hidden group"
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

          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={statsVariants}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 5,
                }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-brand-gold/20 hover:border-brand-gold/40 transition-all duration-300 group-hover:bg-white/20"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-brand-gold mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-brand-gray font-medium text-sm md:text-base">
                    {stat.label}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-brand-gold rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-brand-gold rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
