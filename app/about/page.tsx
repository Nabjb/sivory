"use client";

import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/AuroraBackground';

export default function AboutPage() {
  return (
    <AuroraBackground className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="text-brand-gold text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-8">
            Our Story
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight leading-tight">
            About <span className="font-bold bg-gradient-to-r from-brand-gold via-brand-gold to-white bg-clip-text text-transparent">Sivory</span>
          </h1>
          
          {/* Decorative line */}
          <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-12 w-32" />
          
          <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
            Crafting exceptional outdoor and indoor spaces with passion, precision, and years of expertise that transforms visions into reality.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-16 items-start mb-24"
        >
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8 tracking-tight">
              Our <span className="font-bold text-brand-gold">Journey</span>
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              With over a decade of experience in architectural design and construction, Sivory Design has become 
              synonymous with excellence in creating beautiful, functional outdoor and indoor spaces that exceed expectations.
            </p>
            <p className="text-lg text-white/70 mb-12 leading-relaxed">
              Our team of skilled craftsmen and designers work tirelessly to bring your vision to life, 
              ensuring every project meets our high standards of quality, innovation, and aesthetic appeal.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="text-center p-8 bg-white/8 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-brand-gold/40 transition-all duration-500 group"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-brand-gold mb-3 group-hover:text-white transition-colors duration-300">15+</h3>
                <p className="text-white/70 font-medium text-lg group-hover:text-white/90 transition-colors duration-300">Years Experience</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="text-center p-8 bg-white/8 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-brand-gold/40 transition-all duration-500 group"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-brand-gold mb-3 group-hover:text-white transition-colors duration-300">500+</h3>
                <p className="text-white/70 font-medium text-lg group-hover:text-white/90 transition-colors duration-300">Projects Completed</p>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white/8 backdrop-blur-xl border border-brand-gold/20 rounded-3xl p-12 min-h-[500px] flex items-center justify-center relative overflow-hidden group"
          >
            {/* Quote background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-brand-gold/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            <div className="relative z-10 text-center">
              <div className="text-brand-gold/60 text-8xl mb-6 leading-none">"</div>
              <p className="text-white/90 text-xl md:text-2xl font-light italic leading-relaxed mb-8">
                Excellence is not a skill, it's an attitude that we bring to every project, every detail, every moment.
              </p>
              <div className="text-brand-gold/60 text-8xl rotate-180 leading-none">"</div>
              <div className="mt-8">
                <p className="text-brand-gold font-semibold text-lg">— Sivory Design Team</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Mission & Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white mb-8 tracking-tight">
            Our <span className="font-bold text-brand-gold">Values</span>
          </h2>
          
          <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-16 w-24" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Craftsmanship",
                description: "Every project is executed with meticulous attention to detail and premium materials."
              },
              {
                title: "Innovation",
                description: "We continuously push boundaries to create unique, cutting-edge design solutions."
              },
              {
                title: "Client Partnership",
                description: "Your vision guides our process, ensuring results that exceed your expectations."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-brand-gold/30 transition-all duration-500 group"
              >
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-brand-gold transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
