'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AuroraBackground } from '@/components/AuroraBackground'
import { ProfessionalFooter } from '@/components/ProfessionalFooter'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface Project {
  _id: string
  title: string
  description: string
  slug: { current: string }
  category: {
    title: string
  }
  subcategory: {
    title: string
    slug: { current: string }
  }
  mainImage: any
  gallery?: any[]
  projectDetails?: {
    location?: string
    year?: number
    materials?: string[]
    dimensions?: string
  }
}

export default function IndoorProjectPage({ 
  params 
}: { 
  params: { 'subcategory-slug': string; 'project-slug': string } 
}) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const query = `*[_type == "project" && slug.current == $projectSlug && subcategory->slug.current == $subcategorySlug && category->title == "Indoor"][0] {
          _id,
          title,
          description,
          slug,
          category->{
            title
          },
          subcategory->{
            title,
            slug
          },
          mainImage,
          gallery,
          projectDetails
        }`
        
        const data = await client.fetch(query, { 
          projectSlug: params['project-slug'],
          subcategorySlug: params['subcategory-slug']
        })
        
        if (!data) {
          setLoading(false)
          return
        }
        
        setProject(data)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params])

  if (loading) {
    return (
      <AuroraBackground className="min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading project...</div>
        </div>
      </AuroraBackground>
    )
  }

  if (!project) {
    notFound()
  }

  return (
    <AuroraBackground className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-white/60">
          <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/indoor-design" className="hover:text-brand-gold transition-colors">Indoor Design</Link>
          <span>/</span>
          <Link 
            href={`/indoor-design/${project.subcategory.slug.current}`}
            className="hover:text-brand-gold transition-colors"
          >
            {project.subcategory.title}
          </Link>
          <span>/</span>
          <span className="text-brand-gold">{project.title}</span>
        </div>
      </div>

      {/* Project Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-brand-gold text-sm font-semibold tracking-wide uppercase mb-4">
            {project.category.title} • {project.subcategory.title}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light mb-8 tracking-tight">
            {project.title}
          </h1>
          
          <p className="text-xl text-white/80 leading-relaxed mb-12">
            {project.description}
          </p>

          {/* Main Image */}
          <div className="relative w-full h-96 md:h-[600px] rounded-3xl overflow-hidden mb-12">
            <Image
              src={urlFor(project.mainImage).width(1200).height(600).url()}
              alt={project.mainImage.alt || project.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Project Details */}
          {project.projectDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {project.projectDetails.location && (
                <div>
                  <h3 className="text-brand-gold text-sm font-semibold tracking-wide uppercase mb-2">
                    Location
                  </h3>
                  <p className="text-white/80">{project.projectDetails.location}</p>
                </div>
              )}
              
              {project.projectDetails.year && (
                <div>
                  <h3 className="text-brand-gold text-sm font-semibold tracking-wide uppercase mb-2">
                    Year
                  </h3>
                  <p className="text-white/80">{project.projectDetails.year}</p>
                </div>
              )}
              
              {project.projectDetails.dimensions && (
                <div>
                  <h3 className="text-brand-gold text-sm font-semibold tracking-wide uppercase mb-2">
                    Dimensions
                  </h3>
                  <p className="text-white/80">{project.projectDetails.dimensions}</p>
                </div>
              )}
              
              {project.projectDetails.materials && project.projectDetails.materials.length > 0 && (
                <div>
                  <h3 className="text-brand-gold text-sm font-semibold tracking-wide uppercase mb-2">
                    Materials
                  </h3>
                  <p className="text-white/80">{project.projectDetails.materials.join(', ')}</p>
                </div>
              )}
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((image, index) => (
                <div key={index} className="relative w-full h-64 rounded-2xl overflow-hidden">
                  <Image
                    src={urlFor(image).width(800).height(400).url()}
                    alt={image.alt || `${project.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Professional Footer */}
      <ProfessionalFooter pageType="indoor" />
    </AuroraBackground>
  )
}