'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AuroraBackground } from '@/components/AuroraBackground'
import { ProfessionalFooter } from '@/components/ProfessionalFooter'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'

interface Project {
  _id: string
  title: string
  description: string
  slug: { current: string }
  mainImage: any
  featured: boolean
}

interface Subcategory {
  _id: string
  title: string
  slug: { current: string }
}

export default function OutdoorSubcategoryPage({ params }: { params: { 'subcategory-slug': string } }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Get subcategory info
        const subcategoryQuery = `*[_type == "subcategory" && slug.current == $slug && category->title == "Outdoor"][0] {
          _id,
          title,
          slug
        }`
        
        const subcategoryData = await client.fetch(subcategoryQuery, { slug: params['subcategory-slug'] })
        
        if (!subcategoryData) {
          setLoading(false)
          return
        }
        
        setSubcategory(subcategoryData)

        // Get projects for this subcategory
        const projectsQuery = `*[_type == "project" && subcategory->slug.current == $slug && category->title == "Outdoor"] | order(featured desc, _createdAt desc) {
          _id,
          title,
          description,
          slug,
          mainImage,
          featured
        }`
        
        const projectsData = await client.fetch(projectsQuery, { slug: params['subcategory-slug'] })
        setProjects(projectsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params['subcategory-slug']])

  if (loading) {
    return (
      <AuroraBackground className="min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading projects...</div>
        </div>
      </AuroraBackground>
    )
  }

  if (!subcategory) {
    notFound()
  }

  return (
    <AuroraBackground className="min-h-screen">
      {/* Header */}
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
              Outdoor Design • {subcategory.title}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight leading-tight">
              {subcategory.title} <span className="font-bold bg-gradient-to-r from-brand-gold via-brand-gold to-white bg-clip-text text-transparent">Projects</span>
            </h1>
            
            {/* Decorative line */}
            <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-12 w-32" />
            
            <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
              Explore our {subcategory.title.toLowerCase()} design projects and transformations
            </p>
          </motion.div>

          {/* Breadcrumb */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center mb-16"
          >
            <div className="flex items-center gap-2 text-white/60">
              <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href="/outdoor-design" className="hover:text-brand-gold transition-colors">Outdoor Design</Link>
              <span>/</span>
              <span className="text-brand-gold">{subcategory.title}</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <section className="py-24 relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Link href={`/outdoor-design/${subcategory.slug.current}/${project.slug.current}`}>
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10 hover:border-brand-gold/40 transition-all duration-500">
                    <div 
                      className="w-full h-96 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ 
                        backgroundImage: `url('${urlFor(project.mainImage).width(800).height(600).url()}')` 
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                    
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-brand-gold text-black px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}
                    
                    {/* Project Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="text-brand-gold text-sm font-semibold mb-3 tracking-wide uppercase">
                        {subcategory.title}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-light mb-4 group-hover:text-brand-gold transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-white/80 leading-relaxed text-base">
                        {project.description}
                      </p>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/30 via-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Glass morphism overlay */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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