import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sivory Design - Pergolas Crafted to Perfection',
  description: 'Premium pergola design and construction with years of experience in creating beautiful outdoor spaces.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
