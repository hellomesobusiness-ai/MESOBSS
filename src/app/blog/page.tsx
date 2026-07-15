'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TextReveal, { SlideUp, FadeIn } from '@/components/TextReveal'

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/data?col=blogPosts').then(r => r.json()).then(j => { if (j.data) setPosts(j.data) }).catch(() => {})
  }, [])

  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="px-6 md:px-12 pb-20">
          <div className="max-w-[1440px] mx-auto">
            <SlideUp>
              <span className="text-xs tracking-[0.2em] text-meso-blue uppercase mb-6 block">Insights</span>
            </SlideUp>
            <TextReveal as="h1" className="text-heading font-semibold tracking-tighter mb-8">
              Blog & Resources
            </TextReveal>
            <FadeIn delay={0.4}>
              <p className="text-lg text-meso-gray max-w-2xl leading-relaxed">
                Insights on business growth, AI, marketing, and technology for SMEs and startups.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="px-6 md:px-12 pb-32">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.length === 0 && (
              <div className="col-span-2 text-center text-meso-gray py-12">No posts yet. Add them in the admin panel.</div>
            )}
            {posts.map((post, i) => (
              <FadeIn key={post.id} delay={i * 0.1}>
                <Link href="/contact">
                  <div className="p-8 rounded-2xl bg-meso-surface border border-meso-border hover:border-meso-blue/20 hover:bg-meso-blue/[0.02] transition-all cursor-pointer group h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] tracking-widest uppercase text-meso-blue bg-meso-blue/10 px-2 py-1 rounded">{post.cat}</span>
                      <span className="text-xs text-meso-gray">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3 group-hover:text-meso-blue transition-colors">{post.title}</h3>
                    <p className="text-sm text-meso-gray leading-relaxed">{post.excerpt}</p>
                    <span className="text-xs text-meso-blue mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all opacity-0 group-hover:opacity-100">
                      Read more <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-12 pb-32">
          <div className="max-w-[1440px] mx-auto p-12 md:p-20 rounded-3xl bg-gradient-to-br from-meso-surface to-meso-elevated border border-meso-border text-center">
            <FadeIn>
              <h2 className="text-heading font-semibold tracking-tighter mb-4">Want to Stay Updated?</h2>
              <p className="text-meso-gray max-w-xl mx-auto mb-8 leading-relaxed">
                Subscribe to our newsletter for the latest insights on business growth, AI, and marketing.
              </p>
              <Link href="/contact" className="inline-flex px-10 py-4 rounded-full bg-white text-black font-medium hover:bg-meso-blue hover:text-white transition-all duration-300">
                Get in Touch
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
