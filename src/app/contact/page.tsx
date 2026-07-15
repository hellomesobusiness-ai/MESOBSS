'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TextReveal, { SlideUp, FadeIn } from '@/components/TextReveal'
import { supabase } from '@/lib/supabase'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', company: '', budget: '', project_type: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setErr('')
    if (!supabase) {
      setErr('Database not configured. Please try again later.')
      setSubmitting(false)
      return
    }
    const { error } = await supabase.from('inquiries').insert([form])
    if (error) {
      setErr('Something went wrong. Please try again.')
    } else {
      setDone(true)
      setForm({ name: '', email: '', phone: '', country: '', company: '', budget: '', project_type: '', message: '' })
    }
    setSubmitting(false)
  }

  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="px-6 md:px-12 pb-32">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <SlideUp>
                  <span className="text-xs tracking-[0.2em] text-meso-blue uppercase mb-6 block">Get in Touch</span>
                </SlideUp>
                <TextReveal as="h1" className="text-heading font-semibold tracking-tighter mb-8">
                  Start Your Growth Journey
                </TextReveal>
                <FadeIn delay={0.4}>
                  <p className="text-lg text-meso-gray leading-relaxed mb-12">
                    Fill out the form and our team will get back to you within 24 hours with a custom proposal.
                  </p>
                </FadeIn>
                <FadeIn delay={0.5}>
                  <div className="space-y-6">
                    {[
                      { icon: 'mail', label: 'Email', value: 'hello@meso.com' },
                      { icon: 'call', label: 'Phone', value: '+880 1700-000000' },
                      { icon: 'location_on', label: 'Location', value: 'Dhaka, Bangladesh' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-meso-blue/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-meso-blue">{item.icon}</span>
                        </div>
                        <div>
                          <div className="text-sm text-meso-gray">{item.label}</div>
                          <div className="text-white">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={0.6}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input placeholder="Your Name *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors" />
                    <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors" />
                    <input placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors" />
                    <input placeholder="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors" />
                  </div>
                  <input placeholder="Project Type" value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })} className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors" />
                  <textarea placeholder="Tell us about your project..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors resize-none" />
                  {err && <p className="text-red-400 text-sm">{err}</p>}
                  {done && <p className="text-meso-blue text-sm">Thank you! We&apos;ll be in touch within 24 hours.</p>}
                  <button type="submit" disabled={submitting} className="w-full md:w-auto px-10 py-4 rounded-full bg-white text-black font-medium hover:bg-meso-blue hover:text-white transition-all duration-300 disabled:opacity-50">
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
