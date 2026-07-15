'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-meso-border bg-meso-black">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="MESO" width={32} height={32} />
              <span className="text-xl font-bold tracking-tighter text-white">MESO</span>
            </Link>
            <p className="text-sm text-meso-gray mt-4 max-w-xs leading-relaxed">
              Modernizing every SME with opportunity through AI, branding, technology, and talent.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-meso-gray mb-6">Services</h4>
            <div className="flex flex-col gap-3">
              <Link href="/services#monthly" className="text-sm text-meso-gray hover:text-white transition-colors">Monthly Packages</Link>
              <Link href="/services#single" className="text-sm text-meso-gray hover:text-white transition-colors">Single Services</Link>
              <Link href="/services#international" className="text-sm text-meso-gray hover:text-white transition-colors">International</Link>
              <Link href="/services#custom" className="text-sm text-meso-gray hover:text-white transition-colors">Custom Solutions</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-meso-gray mb-6">Company</h4>
            <div className="flex flex-col gap-3">
              <Link href="/portfolio" className="text-sm text-meso-gray hover:text-white transition-colors">Portfolio</Link>
              <Link href="/ecosystem" className="text-sm text-meso-gray hover:text-white transition-colors">Ecosystem</Link>
              <Link href="/blog" className="text-sm text-meso-gray hover:text-white transition-colors">Blog</Link>
              <Link href="/contact" className="text-sm text-meso-gray hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-meso-gray mb-6">Contact</h4>
            <p className="text-sm text-meso-gray mb-2">hello@meso.com</p>
            <p className="text-sm text-meso-gray">Dhaka, Bangladesh</p>
            <div className="flex gap-4 mt-6">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-meso-border flex items-center justify-center text-xs text-meso-gray hover:border-meso-blue hover:text-meso-blue transition-all">in</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-meso-border flex items-center justify-center text-xs text-meso-gray hover:border-meso-blue hover:text-meso-blue transition-all">X</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-meso-border flex items-center justify-center text-xs text-meso-gray hover:border-meso-blue hover:text-meso-blue transition-all">IG</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-meso-border flex items-center justify-center text-xs text-meso-gray hover:border-meso-blue hover:text-meso-blue transition-all">YT</a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-meso-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-meso-gray">&copy; 2024 MESO. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="text-xs text-meso-gray hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="text-xs text-meso-gray hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-xs text-meso-gray hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
