'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AuroraBackground } from '@/components/AuroraBackground'
import { ProfessionalFooter } from '@/components/ProfessionalFooter'
import { client } from '@/sanity/lib/client'
import { useEffect, useState } from 'react'

interface Subcategory {
  _id: string
  title: string
  slug: { current: string }
  projectCount: number
}

export default function OutdoorDesign() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSubcategories() {
      try {
        const query = `*[_type == "subcategory" && category->title == "Outdoor"] | order(title asc) {
          _id,
          title,
          slug,
          "projectCount": count(*[_type == "project" && subcategory->_id == ^._id])
        }`
        
        const data = await client.fetch(query)
        setSubcategories(data)
      } catch (error) {
        console.error('Error fetching subcategories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubcategories()
  }, [])

  if (loading) {
    return (
      <AuroraBackground className="min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading categories...</div>
        </div>
      </AuroraBackground>
    )
  }

  return (
    <AuroraBackground className="min-h-screen">
      {/* Hero Section - Keep exactly the same */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative pt-32 pb-20 md:pt-40 md:pb-24 z-10 w-full"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="text-brand-gold text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-8">
              Outdoor Design Portfolio
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight leading-tight">
              Outdoor <span className="font-bold bg-gradient-to-r from-brand-gold via-brand-gold to-white bg-clip-text text-transparent">Excellence</span>
            </h1>
            
            {/* Decorative line */}
            <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-12 w-32" />
            
            <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
              Transforming outdoor spaces with premium pergolas, shade solutions, and complete outdoor living experiences that redefine luxury.
            </p>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center mb-16"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 border-2 border-brand-gold/60 text-white font-semibold rounded-full hover:bg-brand-gold hover:text-black transition-all duration-300 backdrop-blur-sm bg-white/8 shadow-lg hover:shadow-xl"
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

      {/* Subcategories Grid - NEW: Shows subcategories instead of projects */}
      <section className="py-24 relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
              Outdoor <span className="font-bold text-brand-gold">Categories</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-8 w-24" />
            <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
              Choose a category to explore our outdoor design projects
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subcategories.map((subcategory, index) => (
              <motion.div
                key={subcategory._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Link href={`/outdoor-design/${subcategory.slug.current}`}>
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10 hover:border-brand-gold/40 transition-all duration-500 bg-white/5 backdrop-blur-sm">
                    <div className="p-8 text-center">
                      <h3 className="text-2xl md:text-3xl font-light mb-4 group-hover:text-brand-gold transition-colors duration-300">
                        {subcategory.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {subcategory.projectCount} {subcategory.projectCount === 1 ? 'project' : 'projects'}
                      </p>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/20 via-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <ProfessionalFooter pageType="outdoor" />
    </AuroraBackground>
  )
}