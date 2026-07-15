'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TextReveal, { SlideUp, FadeIn } from '@/components/TextReveal'

const defaultPackages = [
  { name: 'Starter', price: '5,500', currency: 'BDT', features: ['Social media management', 'Basic boosting', 'Content strategy', 'Monthly report', '6 posters', '2 reels'] },
  { name: 'Growth', price: '12,500', currency: 'BDT', features: ['Social media management', 'Meta advertising', 'Website support', 'Weekly reports', '12 posters', '3 reels', 'Weekly meetings'], popular: true },
  { name: 'Business', price: '22,500', currency: 'BDT', features: ['Full digital management', 'Advanced advertising', 'Website management', 'AI consultation', 'Business analysis', 'Priority support'] },
]

const defaultSingleCats = [
  { name: 'Graphic Design', items: ['Logo Design', 'Brand Identity', 'Packaging Design', 'Poster Design', 'Social Media Design'] },
  { name: 'Photography', items: ['Product Photography', 'Fashion Photography', 'Corporate Photography'] },
  { name: 'Video Production', items: ['Reels', 'Advertisements', 'Promotional Videos'] },
  { name: 'Website', items: ['Business Website', 'Portfolio Website', 'Landing Page', 'E-commerce Website'] },
  { name: 'AI Services', items: ['AI Chatbot', 'AI Automation', 'AI Content System'] },
  { name: 'Marketing', items: ['Facebook Ads', 'Instagram Ads', 'Google Ads', 'Lead Generation'] },
]

const defaultIntl = [
  { title: 'Branding', price: '$1,500+' },
  { title: 'Web Development', price: '$2,500+' },
  { title: 'UI/UX Design', price: '$1,200+' },
  { title: 'AI Systems', price: '$3,000+' },
  { title: 'Growth Marketing', price: '$1,800+' },
  { title: 'Lead Generation', price: '$1,000+' },
  { title: 'Automation', price: '$2,000+' },
]

export default function ServicesPage() {
  const [packages, setPackages] = useState(defaultPackages)
  const [singleCats, setSingleCats] = useState(defaultSingleCats)
  const [intl, setIntl] = useState(defaultIntl)

  useEffect(() => {
    fetch('/api/data?col=packages').then(r => r.json()).then(j => { if (j.data?.length) setPackages(j.data) }).catch(() => {})
    fetch('/api/data?col=singleCategories').then(r => r.json()).then(j => { if (j.data?.length) setSingleCats(j.data) }).catch(() => {})
    fetch('/api/data?col=intlServices').then(r => r.json()).then(j => { if (j.data?.length) setIntl(j.data) }).catch(() => {})
  }, [])
  return (
    <>
      <Navbar />
      <main className="pt-32">
        {/* Hero */}
        <section className="px-6 md:px-12 pb-32">
          <div className="max-w-[1440px] mx-auto">
            <SlideUp>
              <span className="text-xs tracking-[0.2em] text-meso-blue uppercase mb-6 block">Our Services</span>
            </SlideUp>
            <TextReveal as="h1" className="text-heading font-semibold tracking-tighter mb-8 max-w-4xl">
              Complete Growth Infrastructure for Your Business
            </TextReveal>
            <FadeIn delay={0.4}>
              <p className="text-lg text-meso-gray max-w-2xl leading-relaxed">
                From monthly retainers to one-time projects, we offer everything you need to build, grow, and scale your business.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Monthly Packages */}
        <section id="monthly" className="px-6 md:px-12 py-32 bg-meso-surface">
          <div className="max-w-[1440px] mx-auto">
            <SlideUp>
              <span className="text-xs tracking-[0.2em] text-meso-gray uppercase mb-4 block">Category 01</span>
            </SlideUp>
            <TextReveal as="h2" className="text-section font-semibold tracking-tighter mb-16" delay={0.2}>
              Monthly Packages
            </TextReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg, i) => (
                <FadeIn key={pkg.name} delay={i * 0.1}>
                  <div className={`relative p-8 rounded-2xl border transition-all ${
                    pkg.popular ? 'border-meso-blue bg-meso-blue/5 scale-[1.02]' : 'border-meso-border bg-meso-elevated'
                  }`}>
                    {pkg.popular && (
                      <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-meso-blue text-black text-[10px] font-bold tracking-widest uppercase">Popular</span>
                    )}
                    <h3 className="text-xl font-medium text-white mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-sm text-meso-gray">{pkg.currency}</span>
                      <span className="text-4xl font-bold text-white">{pkg.price}</span>
                      <span className="text-sm text-meso-gray">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-meso-gray">
                          <span className="material-symbols-outlined text-meso-blue text-lg">check_circle</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className={`block w-full py-3 rounded-full text-sm font-medium text-center transition-all ${
                      pkg.popular ? 'bg-meso-blue text-black hover:bg-white' : 'bg-white/5 text-white hover:bg-white hover:text-black'
                    }`}>
                      Select Plan
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Single Services */}
        <section id="single" className="px-6 md:px-12 py-32">
          <div className="max-w-[1440px] mx-auto">
            <SlideUp>
              <span className="text-xs tracking-[0.2em] text-meso-gray uppercase mb-4 block">Category 02</span>
            </SlideUp>
            <TextReveal as="h2" className="text-section font-semibold tracking-tighter mb-16" delay={0.2}>
              Single Purchase Services
            </TextReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {singleCats.map((cat, i) => (
                <FadeIn key={cat.name} delay={i * 0.08}>
                  <div className="p-8 rounded-2xl bg-meso-elevated border border-meso-border">
                    <h3 className="text-lg font-medium text-white mb-4">{cat.name}</h3>
                    <ul className="space-y-3">
                      {cat.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-meso-gray">
                          <span className="w-1.5 h-1.5 rounded-full bg-meso-blue" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* International Services */}
        <section id="international" className="px-6 md:px-12 py-32 bg-meso-surface">
          <div className="max-w-[1440px] mx-auto">
            <SlideUp>
              <span className="text-xs tracking-[0.2em] text-meso-gray uppercase mb-4 block">Category 03</span>
            </SlideUp>
            <TextReveal as="h2" className="text-section font-semibold tracking-tighter mb-4" delay={0.2}>
              International Services
            </TextReveal>
            <FadeIn delay={0.3}>
              <p className="text-meso-gray mb-16 max-w-xl">Premium services for clients outside Bangladesh. Priced in USD.</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {intl.map((svc, i) => (
                <FadeIn key={svc.title} delay={i * 0.08}>
                  <div className="flex items-center justify-between p-6 rounded-xl bg-meso-elevated border border-meso-border hover:border-meso-blue/20 transition-all">
                    <span className="text-white font-medium">{svc.title}</span>
                    <span className="text-meso-blue font-medium">{svc.price}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.4}>
              <div className="text-center mt-12">
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-meso-blue border-b border-meso-blue/30 pb-0.5 hover:gap-4 transition-all">
                  Need help choosing? Contact us <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Custom Solutions */}
        <section id="custom" className="px-6 md:px-12 py-32">
          <div className="max-w-[1440px] mx-auto">
            <SlideUp>
              <span className="text-xs tracking-[0.2em] text-meso-gray uppercase mb-4 block">Category 04</span>
            </SlideUp>
            <TextReveal as="h2" className="text-section font-semibold tracking-tighter mb-16" delay={0.2}>
              Custom Solutions
            </TextReveal>
            <div className="p-12 md:p-20 rounded-3xl bg-gradient-to-br from-meso-surface to-meso-elevated border border-meso-border text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-meso-blue/[0.03] to-transparent" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-8 right-12 w-8 h-8 border border-meso-blue/10 rounded-full hidden md:block"
              />
              <FadeIn delay={0.3}>
                <span className="material-symbols-outlined text-5xl text-meso-blue mb-6 relative">rocket_launch</span>
                <h3 className="text-3xl font-semibold text-white mb-4">Need Something Unique?</h3>
                <p className="text-meso-gray max-w-xl mx-auto mb-8 leading-relaxed">
                  Tell us your requirements and our team will design a custom package tailored to your business needs.
                </p>
                <Link href="/contact" className="inline-flex px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-meso-blue hover:text-white transition-all duration-300">
                  Request a Quote
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
