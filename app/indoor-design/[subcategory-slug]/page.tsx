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

export default function IndoorSubcategoryPage({ params }: { params: { 'subcategory-slug': string } }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get subcategory info
        const subcategoryQuery = `*[_type == "subcategory" && slug.current == $slug && category->title == "Indoor"][0] {
          _id,
          title,
          slug
        }`
        
        const subcategoryData = await client.fetch(subcategoryQuery, { slug: params['subcategory-slug'] })
        
        if (!subcategoryData) {
          notFound()
        }
        
        setSubcategory(subcategoryData)

        // Get projects for this subcategory
        const projectsQuery = `*[_type == "project" && subcategory->slug.current == $slug && category->title == "Indoor"] | order(featured desc, _createdAt desc) {
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
      <AuroraBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </AuroraBackground>
    )
  }

  if (!subcategory) {
    notFound()
  }

  return (
    <AuroraBackground>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-6 lg:px-8">
          <div className="text-brand-gold text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-8">
            Indoor Design • {subcategory.title}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight leading-tight">
            {subcategory.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover our collection of {subcategory.title.toLowerCase()} projects, where modern design meets timeless elegance.
          </p>
          
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center space-x-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/indoor-design" className="hover:text-brand-gold transition-colors">Indoor Design</Link>
            <span>/</span>
            <span className="text-brand-gold">{subcategory.title}</span>
          </nav>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/indoor-design/${subcategory.slug.current}/${project.slug.current}`}>
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10 hover:border-brand-gold/40 transition-all duration-500">
                    <div 
                      className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${urlFor(project.mainImage).width(800).height(600).url()})`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                    
                    {project.featured && (
                      <div className="absolute top-6 right-6 bg-brand-gold text-black px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-2xl font-light text-white mb-3 group-hover:text-brand-gold transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <ProfessionalFooter pageType="indoor" />
    </AuroraBackground>
  )
}