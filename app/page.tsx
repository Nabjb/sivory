import { HeroParallax } from '../components/HeroParallax'
import ServicesSection from '../components/ServicesSection'

// Sample pergola projects data
const pergolaProjects = [
  {
    title: "Modern Outdoor Lounge",
    link: "/outdoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Garden Paradise Pergola",
    link: "/outdoor-design", 
    thumbnail: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Luxury Pool Deck",
    link: "/outdoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Rustic Wood Pergola",
    link: "/outdoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Contemporary Patio",
    link: "/outdoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Elegant Dining Area",
    link: "/indoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Cozy Reading Nook",
    link: "/indoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Minimalist Pergola",
    link: "/outdoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600298882974-c4ce2c8d4e0a?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Traditional Gazebo",
    link: "/outdoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600298882974-c4ce2c8d4e0a?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Modern Steel Frame",
    link: "/outdoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600566752734-eb6007d5e5e1?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Vine-Covered Retreat",
    link: "/outdoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Sunset Terrace",
    link: "/outdoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Urban Rooftop",
    link: "/outdoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Coastal Pergola",
    link: "/outdoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&crop=center"
  },
  {
    title: "Zen Garden Space",
    link: "/outdoor-design",
    thumbnail: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop&crop=center"
  }
];

export default function Home() {
  return (
    <main>
      <HeroParallax products={pergolaProjects} />
      <ServicesSection />
    </main>
  )
}
