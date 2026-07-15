'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TextReveal, { SlideUp, FadeIn } from '@/components/TextReveal'

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/data?col=portfolio').then(r => r.json()).then(j => { if (j.data) setProjects(j.data) }).catch(() => {})
  }, [])

  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="px-6 md:px-12 pb-32">
          <div className="max-w-[1440px] mx-auto">
            <SlideUp>
              <span className="text-xs tracking-[0.2em] text-meso-blue uppercase mb-6 block">Our Work</span>
            </SlideUp>
            <TextReveal as="h1" className="text-heading font-semibold tracking-tighter mb-8">
              Projects & Case Studies
            </TextReveal>
            <FadeIn delay={0.4}>
              <p className="text-lg text-meso-gray max-w-2xl leading-relaxed">
                See how we&apos;ve helped businesses transform through technology, design, and strategy.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="px-6 md:px-12 pb-32">
          <div className="max-w-[1440px] mx-auto space-y-6">
            {projects.length === 0 && (
              <p className="text-center text-meso-gray py-12">No projects yet. Add them in the admin panel.</p>
            )}
            {projects.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.1}>
                <Link href="/contact">
                  <div className="group grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 rounded-2xl bg-meso-surface border border-meso-border hover:border-meso-blue/20 transition-all cursor-pointer">
                    <div className="md:col-span-2">
                      <span className="text-xs tracking-widest text-meso-blue uppercase mb-2 block">{p.cat}</span>
                      <h2 className="text-3xl font-semibold text-white mb-4 group-hover:text-meso-blue transition-colors">{p.title}</h2>
                      <p className="text-meso-gray leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="flex flex-col items-end justify-center">
                      <div className="text-3xl font-bold text-meso-blue">{p.metric}</div>
                      <span className="text-xs text-meso-gray mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Case Study <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-12 pb-32">
          <div className="max-w-[1440px] mx-auto p-12 md:p-20 rounded-3xl bg-gradient-to-br from-meso-surface to-meso-elevated border border-meso-border text-center">
            <FadeIn>
              <h2 className="text-heading font-semibold tracking-tighter mb-4">Want Results Like These?</h2>
              <p className="text-meso-gray max-w-xl mx-auto mb-8 leading-relaxed">
                Let&apos;s discuss how we can transform your business with a custom growth strategy.
              </p>
              <Link href="/contact" className="inline-flex px-10 py-4 rounded-full bg-white text-black font-medium hover:bg-meso-blue hover:text-white transition-all duration-300">
                Start Your Project
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
