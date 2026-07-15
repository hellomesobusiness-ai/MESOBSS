'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TextReveal, { SlideUp, FadeIn } from '@/components/TextReveal'

export default function EcosystemPage() {
  const [stats, setStats] = useState<Record<string, number>>({})

  useEffect(() => {
    Promise.all(
      ['portfolio', 'testimonials', 'services', 'packages'].map(async (col) => {
        const res = await fetch(`/api/data?col=${col}`)
        const json = await res.json()
        return { key: col, count: json.data?.length || 0 }
      })
    ).then((results) => {
      const m: Record<string, number> = {}
      results.forEach((r) => { m[r.key] = r.count })
      setStats(m)
    })
  }, [])

  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="relative min-h-[80vh] flex items-center px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-meso-blue/5 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-[1440px] mx-auto w-full">
            <SlideUp>
              <span className="text-xs tracking-[0.2em] text-meso-blue uppercase mb-6 block">Ecosystem</span>
            </SlideUp>
            <TextReveal as="h1" className="text-heading font-semibold tracking-tighter mb-6 max-w-3xl">
              The Complete MESO Ecosystem for Business Growth
            </TextReveal>
            <FadeIn delay={0.4}>
              <p className="text-lg text-meso-gray max-w-2xl mb-10 leading-relaxed">
                A unified platform of AI, branding, marketing, and technology services designed to scale your business from ground zero to market leader.
              </p>
            </FadeIn>
            <FadeIn delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <Link href="/services" className="px-8 py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-meso-blue hover:text-white transition-all duration-300">
                  Explore Services
                </Link>
                <Link href="/contact" className="px-8 py-4 rounded-full border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-all">
                  Get Started
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-32 px-6 md:px-12 bg-meso-surface">
          <div className="max-w-[1440px] mx-auto">
            <SlideUp>
              <span className="text-xs tracking-[0.2em] text-meso-gray uppercase mb-4 block">Integrated Platform</span>
            </SlideUp>
            <TextReveal as="h2" className="text-section font-semibold tracking-tighter mb-16" delay={0.2}>
              Everything You Need in One Place
            </TextReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: 'brand_awareness', title: 'Brand Identity', desc: 'Strategic branding, logo design, visual identity, and brand guidelines that make you unforgettable.', href: '/services#single' },
                { icon: 'computer', title: 'Web Development', desc: 'Custom websites, e-commerce platforms, and landing pages built for performance and conversion.', href: '/services#single' },
                { icon: 'auto_awesome', title: 'AI Solutions', desc: 'Intelligent automation, chatbots, content systems, and predictive analytics for your business.', href: '/services#single' },
                { icon: 'campaign', title: 'Digital Marketing', desc: 'Data-driven advertising, social media management, and SEO strategies that drive results.', href: '/services#monthly' },
                { icon: 'photo_camera', title: 'Media Production', desc: 'Professional photography, video production, reels, and promotional content creation.', href: '/services#single' },
                { icon: 'analytics', title: 'Growth Analytics', desc: 'Real-time dashboards, performance tracking, and actionable insights for continuous improvement.', href: '/services#custom' },
              ].map((item, i) => (
                <Link key={item.title} href={item.href}>
                  <FadeIn delay={i * 0.08}>
                    <div className="p-8 rounded-2xl bg-meso-elevated border border-meso-border hover:border-meso-blue/20 transition-all duration-300 group h-full">
                      <span className="material-symbols-outlined text-3xl text-meso-blue mb-5 block">{item.icon}</span>
                      <h3 className="text-xl font-medium text-white mb-3 group-hover:text-meso-blue transition-colors">{item.title}</h3>
                      <p className="text-sm text-meso-gray leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeIn>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto text-center">
            <SlideUp>
              <span className="text-xs tracking-[0.2em] text-meso-gray uppercase mb-4 block">By the Numbers</span>
            </SlideUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {[
                { num: `${stats.portfolio || 0}+`, label: 'Projects Delivered' },
                { num: `${stats.testimonials || 0}+`, label: 'Client Stories' },
                { num: `${(stats.services || 0) + (stats.packages || 0)}`, label: 'Service Options' },
                { num: '98%', label: 'Client Satisfaction' },
              ].map((s) => (
                <div key={s.label} className="p-8 rounded-2xl bg-meso-surface border border-meso-border">
                  <div className="text-4xl font-bold text-white mb-2">{s.num}</div>
                  <div className="text-sm text-meso-gray">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6 md:px-12 bg-meso-surface">
          <div className="max-w-[1440px] mx-auto text-center">
            <FadeIn>
              <span className="material-symbols-outlined text-5xl text-meso-blue mb-6">rocket_launch</span>
              <h2 className="text-heading font-semibold tracking-tighter mb-6">Ready to Join the Ecosystem?</h2>
              <p className="text-meso-gray max-w-xl mx-auto mb-10 leading-relaxed">
                Start your transformation journey today. Get a free consultation and custom growth proposal.
              </p>
              <Link href="/contact" className="inline-flex px-10 py-4 rounded-full bg-white text-black font-medium hover:bg-meso-blue hover:text-white transition-all duration-300">
                Start Your Journey
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
