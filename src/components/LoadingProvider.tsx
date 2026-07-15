'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }}
            className="fixed inset-0 z-[9999] bg-meso-black flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: { duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] },
              }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 mx-auto mb-6"
              >
                <Image src="/logo.png" alt="MESO" width={64} height={64} className="w-16 h-16" />
              </motion.div>
              <span className="text-2xl font-bold tracking-tighter text-white block mb-2">MESO</span>
              <div className="flex items-center justify-center gap-2 mt-2">
                <motion.span
                  className="text-xs tracking-[0.2em] text-meso-gray uppercase"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Initializing ecosystem
                </motion.span>
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1 h-1 rounded-full bg-meso-blue"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1, transition: { duration: 2.4, ease: [0.23, 1, 0.32, 1] } }}
              className="h-[2px] bg-gradient-to-r from-transparent via-meso-blue to-transparent w-48 mt-10 origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.3 } }}
      >
        {children}
      </motion.div>
    </>
  )
}
