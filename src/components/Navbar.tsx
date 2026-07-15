'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/ecosystem', label: 'Ecosystem' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const mobileLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/ecosystem', label: 'Ecosystem' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] } }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-meso-black/80 backdrop-blur-xl border-b border-meso-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group relative z-10">
            <Image
              src="/logo.png"
              alt="MESO"
              width={36}
              height={36}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xl font-bold tracking-tighter text-white">MESO</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-meso-gray hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-meso-blue transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex px-5 py-2.5 rounded-full text-sm font-medium bg-white text-black hover:bg-meso-blue hover:text-white transition-all duration-300"
            >
              Start a Project
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-10"
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
              <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { x: 0 } : { x: '100%' }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-0 z-40 bg-meso-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
      >
        <Image src="/logo.png" alt="MESO" width={48} height={48} className="mb-4 opacity-50" />
        {mobileLinks.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={menuOpen ? { opacity: 1, y: 0, transition: { delay: i * 0.08 } } : {}}
          >
            <Link
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-medium text-white hover:text-meso-blue transition-colors"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={menuOpen ? { opacity: 1, y: 0, transition: { delay: 0.6 } } : {}}
        >
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-8 py-4 rounded-full bg-white text-black text-lg font-medium hover:bg-meso-blue hover:text-white transition-all duration-300"
          >
            Start a Project
          </Link>
        </motion.div>
      </motion.div>
    </>
  )
}
