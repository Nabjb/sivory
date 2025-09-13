import type { Metadata } from 'next'
import './globals.css'
import MainNavbar from '@/components/Navbar'
import { TransitionProvider } from '@/components/TransitionProvider'

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
      <body>
        <TransitionProvider>
          <MainNavbar />
          <main>
            {children}
          </main>
        </TransitionProvider>
      </body>
    </html>
  )
}
