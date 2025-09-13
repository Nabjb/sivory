'use client'

import React, { createContext, useContext, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TransitionContextType {
  isTransitioning: boolean
  transitionData: {
    cardRect: DOMRect | null
    backgroundImage: string | null
    title: string | null
  } | null
  startTransition: (data: { cardRect: DOMRect; backgroundImage: string; title: string }) => void
  endTransition: () => void
}

const TransitionContext = createContext<TransitionContextType | null>(null)

export const useTransition = () => {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider')
  }
  return context
}

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionData, setTransitionData] = useState<{
    cardRect: DOMRect | null
    backgroundImage: string | null
    title: string | null
  } | null>(null)

  const startTransition = (data: { cardRect: DOMRect; backgroundImage: string; title: string }) => {
    setTransitionData(data)
    setIsTransitioning(true)
  }

  const endTransition = () => {
    setIsTransitioning(false)
    setTransitionData(null)
  }

  return (
    <TransitionContext.Provider value={{
      isTransitioning,
      transitionData,
      startTransition,
      endTransition
    }}>
      {children}
      
      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && transitionData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            {/* Expanding Card */}
            <motion.div
              initial={{
                x: transitionData.cardRect.left,
                y: transitionData.cardRect.top,
                width: transitionData.cardRect.width,
                height: transitionData.cardRect.height,
                borderRadius: '1rem'
              }}
              animate={{
                x: 0,
                y: 0,
                width: '100vw',
                height: '100vh',
                borderRadius: 0
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="absolute bg-gradient-to-br from-gray-900 via-black to-gray-800"
              style={{
                backgroundImage: `url('${transitionData.backgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Content Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80 flex items-center justify-center"
              >
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-center"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
                    {transitionData.title}
                  </h1>
                  <div className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-6 w-32" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full mx-auto"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  )
}
