'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function OutdoorDesign() {
  const projects = [
    {
      id: 1,
      title: "Modern Pergola Paradise",
      description: "Contemporary design with clean lines and premium materials",
      image: "/images/per1.jpg",
      category: "Pergolas"
    },
    {
      id: 2,
      title: "Luxury Outdoor Living",
      description: "Complete outdoor transformation with integrated lighting",
      image: "/images/per2.jpg",
      category: "Complete Spaces"
    },
    // Placeholder projects
    {
      id: 3,
      title: "Garden Pergola Retreat",
      description: "Natural wood finish with climbing plant integration",
      image: "/images/per1.jpg",
      category: "Pergolas"
    },
    {
      id: 4,
      title: "Poolside Elegance",
      description: "Water-resistant design with premium shade solutions",
      image: "/images/per2.jpg",
      category: "Pool Areas"
    }
  ]

  return (
    <div className="min-h-screen bg-brand-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative py-24 bg-gradient-to-br from-brand-white to-brand-gray/10"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="text-brand-gold/60 text-sm md:text-base font-medium tracking-widest uppercase mb-4">
              Outdoor Design Portfolio
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-black via-brand-gold to-brand-gray mb-6">
              Outdoor Excellence
            </h1>
            <p className="text-xl text-brand-black/70 max-w-3xl mx-auto">
              Transforming outdoor spaces with premium pergolas, shade solutions, and complete outdoor living experiences.
            </p>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-12"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 border-2 border-brand-gold text-brand-black font-semibold rounded-full hover:bg-brand-gold hover:text-white transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <div 
                    className="w-full h-80 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
                  
                  {/* Project Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-brand-gold text-sm font-medium mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/80">
                      {project.description}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="py-24 bg-gradient-to-r from-brand-gray/10 to-brand-gold/10"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
            Ready to Transform Your Outdoor Space?
          </h2>
          <p className="text-xl text-brand-black/70 mb-8 max-w-2xl mx-auto">
            Let's create your perfect outdoor living experience with our premium pergola designs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-brand-gold to-brand-gray text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Your Free Quote
          </motion.button>
        </div>
      </motion.section>
    </div>
  )
}
