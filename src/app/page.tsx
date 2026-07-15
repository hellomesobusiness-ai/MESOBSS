'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TextReveal, { SlideUp, FadeIn } from '@/components/TextReveal'
import MagneticButton from '@/components/MagneticButton'
import { supabase } from '@/lib/supabase'

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view')
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-fade').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeBanner />
        <WhoWeAre />
        <ServicesOverview />
        <Portfolio />
        <MistoAI />
        <Testimonials />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

/* ===== MARQUEE BANNER ===== */
function MarqueeBanner() {
  const logos = ['Branding', 'AI', 'Web', 'Marketing', 'Design', 'SEO', 'Automation', 'Content']
  return (
    <div className="relative py-6 border-t border-b border-meso-border bg-meso-surface overflow-hidden">
      <div className="marquee flex gap-16 whitespace-nowrap">
        {[...logos, ...logos].map((l, i) => (
          <span key={i} className="text-sm tracking-widest text-meso-gray uppercase flex items-center gap-16">
            <span>{l}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-meso-blue/40" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ===== HERO ===== */
function Hero() {
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => { mouseX.current = e.clientX; mouseY.current = e.clientY }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-meso-blue/5 rounded-full blur-3xl animate-glow" />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] right-[10%] w-16 h-16 border border-meso-blue/10 rounded-full hidden md:block"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[25%] left-[8%] w-10 h-10 border border-meso-blue/20 rounded-lg rotate-45 hidden md:block"
      />
      <motion.div
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[40%] right-[5%] w-24 h-24 border border-white/5 rounded-full hidden md:block"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto w-full pt-28">
        <SlideUp delay={0.3}>
          <span className="text-xs tracking-[0.2em] text-meso-blue uppercase mb-8 block">Intelligent Growth Infrastructure</span>
        </SlideUp>
        <h1 className="text-hero font-bold tracking-tighter leading-[0.9] mb-8">
          <TextReveal as="span" className="block" delay={0.5}>MODERNIZE</TextReveal>
          <TextReveal as="span" className="block" delay={0.7}>EVERY SME</TextReveal>
          <TextReveal as="span" className="block text-meso-blue" delay={0.9}>WITH OPPORTUNITY</TextReveal>
        </h1>
        <FadeIn delay={1.1}>
          <p className="text-lg text-meso-gray max-w-xl mb-12 leading-relaxed">
            We help businesses grow through AI, branding, websites, marketing and automation.
          </p>
        </FadeIn>
        <FadeIn delay={1.3}>
          <div className="flex flex-wrap gap-4">
            <MagneticButton>
              <Link href="/contact" className="px-8 py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-meso-blue hover:text-white transition-all duration-300 inline-block">
                Start a Project
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/services" className="px-8 py-4 rounded-full border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-all inline-block">
                Explore MESO
              </Link>
            </MagneticButton>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-white/40"
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ===== COUNTER HOOK ===== */
function useCounter(target: number, suffix: string, enabled: boolean) {
  const [count, setCount] = useState(0)
  const targetNum = typeof target === 'number' ? target : 0

  useEffect(() => {
    if (!enabled || targetNum === 0) return
    let start = 0
    const duration = 2000
    const step = Math.ceil(targetNum / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= targetNum) {
        setCount(targetNum)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [enabled, targetNum])

  return `${count}${suffix}`
}

/* ===== WHO WE ARE ===== */
function WhoWeAre() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  const projects = useCounter(50, '+', isInView)
  const clients = useCounter(30, '+', isInView)
  const satisfaction = useCounter(98, '%', isInView)

  return (
    <section id="who" ref={ref} className="py-40 px-6 md:px-12 border-t border-meso-border relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-meso-blue/[0.02] to-transparent" />
      <div className="max-w-[1440px] mx-auto relative z-10">
        <SlideUp>
          <span className="text-xs tracking-[0.2em] text-meso-gray uppercase mb-6 block">Who We Are</span>
        </SlideUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <TextReveal
            as="h2"
            className="text-heading font-semibold tracking-tighter leading-[1.05]"
            delay={0.2}
          >
            MESO is a business growth agency helping startups and SMEs through technology, marketing, design and AI.
          </TextReveal>
          <FadeIn delay={0.4}>
            <div>
              <p className="text-meso-gray leading-relaxed mb-8">
                We combine strategy, creativity, and artificial intelligence to build digital ecosystems that drive real business results. From brand identity to AI automation, we provide everything you need to compete at the highest level.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-8 pt-8 border-t border-meso-border"
              >
                {[
                  { value: projects, label: 'Projects' },
                  { value: clients, label: 'Clients' },
                  { value: satisfaction, label: 'Satisfaction' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="text-3xl font-bold text-white"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs text-meso-gray mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
              <FadeIn delay={0.7}>
                <Link
                  href="/ecosystem"
                  className="inline-flex items-center gap-2 text-sm text-meso-blue mt-8 hover:gap-4 transition-all"
                >
                  Explore our ecosystem <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </FadeIn>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ===== SERVICES OVERVIEW ===== */
const defaultServices = [
  { name: 'Monthly Packages', desc: 'Ongoing growth support with social media management, advertising, content strategy, and weekly reports.', icon: 'calendar_month', href: '/services#monthly' },
  { name: 'Single Services', desc: 'One-time projects including branding, web development, AI systems, photography, and video production.', icon: 'bolt', href: '/services#single' },
  { name: 'International', desc: 'Premium services for global clients. Branding, UI/UX, AI development, and growth marketing in USD.', icon: 'language', href: '/services#international' },
  { name: 'Custom Solutions', desc: 'Tailor-made systems designed around your unique business requirements.', icon: 'rocket_launch', href: '/services#custom' },
]

function ServicesOverview() {
  const [services, setServices] = useState(defaultServices)
  useEffect(() => {
    fetch('/api/data?col=services').then(r => r.json()).then(j => { if (j.data?.length) setServices(j.data) }).catch(() => {})
  }, [])

  return (
    <section className="py-40 px-6 md:px-12 bg-meso-surface">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-20">
          <div>
            <SlideUp>
              <span className="text-xs tracking-[0.2em] text-meso-gray uppercase mb-4 block">What We Do</span>
            </SlideUp>
            <TextReveal as="h2" className="text-heading font-semibold tracking-tighter" delay={0.2}>
              Services Overview
            </TextReveal>
          </div>
          <SlideUp delay={0.3}>
            <Link href="/services" className="hidden md:inline-flex text-sm text-white border-b border-white pb-1 hover:text-meso-blue hover:border-meso-blue transition-colors">
              View All Services
            </Link>
          </SlideUp>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((cat, i) => (
            <ServiceCard key={cat.name} title={cat.name} desc={cat.desc} icon={cat.icon} href={cat.href} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ title, desc, icon, href, index }: { title: string; desc: string; icon: string; href: string; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <motion.a
      ref={ref}
      href={href}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="group relative p-10 rounded-2xl bg-meso-elevated border border-meso-border hover:border-meso-blue/30 transition-all duration-500"
    >
      <span className="material-symbols-outlined text-3xl text-meso-blue mb-6 block">{icon}</span>
      <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-meso-blue transition-colors">{title}</h3>
      <p className="text-meso-gray leading-relaxed">{desc}</p>
      <span className="inline-flex items-center gap-2 text-sm text-meso-blue mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </span>
    </motion.a>
  )
}

/* ===== PORTFOLIO ===== */
function Portfolio() {
  const ref = useRef(null)
  const [projects, setProjects] = useState<any[]>([])
  useEffect(() => {
    fetch('/api/data?col=portfolio').then(r => r.json()).then(j => { if (j.data) setProjects(j.data) }).catch(() => {})
  }, [])

  const featured = projects.slice(0, 2)

  return (
    <section ref={ref} className="py-40 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-20">
          <div>
            <SlideUp>
              <span className="text-xs tracking-[0.2em] text-meso-gray uppercase mb-4 block">Our Work</span>
            </SlideUp>
            <TextReveal as="h2" className="text-heading font-semibold tracking-tighter" delay={0.2}>
              Featured Projects
            </TextReveal>
          </div>
          <SlideUp delay={0.3}>
            <Link href="/portfolio" className="hidden md:inline-flex text-sm text-white border-b border-white pb-1 hover:text-meso-blue hover:border-meso-blue transition-colors">
              View All Projects
            </Link>
          </SlideUp>
        </div>
        <div className="space-y-6">
          {featured.map((p, i) => (
            <ProjectRow key={p.id || i} project={p} index={i} />
          ))}
          {featured.length === 0 && (
            <div className="text-center text-meso-gray py-12">No projects yet. Add some in the admin panel.</div>
          )}
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ project, index }: { project: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const icons = ['spa', 'psychology', 'diamond', 'storefront']

  return (
    <Link href="/portfolio">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="group relative overflow-hidden rounded-2xl bg-meso-surface border border-meso-border cursor-pointer hover:border-meso-blue/20 transition-all duration-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 md:p-16 flex flex-col justify-center">
            <span className="text-xs tracking-widest text-meso-blue uppercase mb-3">{project.cat}</span>
            <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4 group-hover:text-meso-blue transition-colors">{project.title}</h3>
            <p className="text-meso-gray leading-relaxed mb-4">{project.desc}</p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-white inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                View Case Study <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </div>
          <div className="h-64 md:h-auto bg-meso-elevated flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-meso-blue/[0.03] to-transparent" />
            <div className="text-center relative z-10">
              <div className="w-24 h-24 rounded-full border border-meso-border flex items-center justify-center mx-auto mb-4 bg-meso-elevated/50 group-hover:border-meso-blue/30 group-hover:bg-meso-blue/5 transition-all">
                <span className="material-symbols-outlined text-4xl text-meso-gray group-hover:text-meso-blue transition-colors">{icons[index % icons.length]}</span>
              </div>
              <p className="text-xs text-meso-blue font-medium">{project.metric}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

/* ===== MISTO AI ===== */
function MistoAI() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const capabilities = [
    { name: 'Marketing', desc: 'AI-powered campaign optimization', icon: 'campaign' },
    { name: 'Growth', desc: 'Data-driven scaling strategies', icon: 'trending_up' },
    { name: 'Automation', desc: 'Intelligent workflow systems', icon: 'settings_automation' },
    { name: 'Branding', desc: 'Smart identity development', icon: 'palette' },
    { name: 'Sales', desc: 'Predictive revenue engine', icon: 'point_of_sale' },
  ]

  return (
    <section ref={ref} className="py-40 px-6 md:px-12 bg-gradient-to-b from-meso-black via-meso-surface to-meso-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-meso-blue/5 rounded-full blur-3xl animate-glow" />

      {/* Floating particles */}
      <motion.div
        animate={{ y: [0, -15, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-[20%] left-[10%] w-4 h-4 rounded-full bg-meso-blue/20 hidden md:block"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute bottom-[30%] right-[15%] w-3 h-3 rounded-full bg-meso-blue/15 hidden md:block"
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="text-center mb-20">
          <SlideUp>
            <span className="text-xs tracking-[0.2em] text-meso-blue uppercase mb-4 block">Intelligent Assistant</span>
          </SlideUp>
          <TextReveal as="h2" className="text-heading font-semibold tracking-tighter mb-6" delay={0.2}>
            Meet MISTO AI
          </TextReveal>
          <FadeIn delay={0.4}>
            <p className="text-lg text-meso-gray max-w-2xl mx-auto leading-relaxed">
              Your AI-powered business growth assistant. MISTO helps you make smarter decisions across every department.
            </p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-xl bg-meso-elevated border border-meso-border text-center group hover:border-meso-blue/30 hover:bg-meso-blue/[0.02] transition-all cursor-default"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-meso-blue/20 to-meso-blue/5 flex items-center justify-center mx-auto mb-4 group-hover:from-meso-blue/30 group-hover:to-meso-blue/10 transition-all">
                <span className="material-symbols-outlined text-meso-blue">{cap.icon}</span>
              </div>
              <h4 className="text-sm font-medium text-white mb-1">{cap.name}</h4>
              <p className="text-[10px] text-meso-gray leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
        <FadeIn delay={0.6}>
          <div className="text-center mt-12">
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-meso-blue border-b border-meso-blue/30 pb-0.5 hover:gap-4 transition-all">
              Learn how MISTO can transform your business <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ===== TESTIMONIALS ===== */
function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    fetch('/api/data?col=testimonials').then(r => r.json()).then(j => { if (j.data?.length) setTestimonials(j.data) }).catch(() => {})
  }, [])

  if (testimonials.length === 0) return null

  return (
    <section className="py-40 px-6 md:px-12 bg-meso-surface">
      <div className="max-w-[1440px] mx-auto">
        <SlideUp>
          <span className="text-xs tracking-[0.2em] text-meso-gray uppercase mb-6 block">Client Stories</span>
        </SlideUp>
        <div className="relative">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-3xl"
          >
            <p className="text-3xl md:text-4xl font-medium text-white leading-tight mb-10">
              &ldquo;{testimonials[active].text}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-meso-elevated border border-meso-border" />
              <div>
                <div className="text-white font-medium">{testimonials[active].author}</div>
                <div className="text-sm text-meso-gray">{testimonials[active].role}</div>
              </div>
            </div>
          </motion.div>
          <div className="flex gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === active ? 'bg-meso-blue w-8' : 'bg-meso-gray/30 hover:bg-meso-gray/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===== FAQ ===== */
const faqs = [
  { q: 'What is MESO?', a: 'MESO is a business growth agency that helps startups and SMEs grow through AI, branding, websites, marketing, and automation.' },
  { q: 'How much do services cost?', a: 'Our services start from BDT 5,500/month for monthly packages. Single purchase services start from BDT 15,000. International services are priced in USD.' },
  { q: 'How long does a project take?', a: 'Timeline depends on the service. Websites typically take 14-21 days. Branding projects take 10-14 days. AI solutions take 7-14 days.' },
  { q: 'Do you work with international clients?', a: 'Yes! We have dedicated international services priced in USD for clients outside Bangladesh.' },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-40 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-3xl mx-auto">
          <SlideUp>
            <span className="text-xs tracking-[0.2em] text-meso-gray uppercase mb-4 block text-center">FAQ</span>
          </SlideUp>
          <TextReveal as="h2" className="text-heading font-semibold tracking-tighter text-center mb-16" delay={0.2}>
            Frequently Asked Questions
          </TextReveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="border border-meso-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex justify-between items-center p-6 text-left text-white font-medium hover:bg-meso-elevated transition-colors"
                  >
                    {faq.q}
                    <span className={`text-meso-gray transition-transform ${open === i ? 'rotate-45' : ''}`}>
                      <span className="material-symbols-outlined">add</span>
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-meso-gray leading-relaxed">{faq.a}</p>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===== CONTACT ===== */
function ContactSection() {
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
    <section className="py-40 px-6 md:px-12 bg-meso-surface">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <SlideUp>
              <span className="text-xs tracking-[0.2em] text-meso-blue uppercase mb-4 block">Get in Touch</span>
            </SlideUp>
            <TextReveal as="h2" className="text-heading font-semibold tracking-tighter mb-8" delay={0.2}>
              Let&apos;s Build Something Great
            </TextReveal>
            <FadeIn delay={0.4}>
              <p className="text-meso-gray leading-relaxed mb-12">
                Tell us about your project and we&apos;ll get back to you within 24 hours with a custom proposal.
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-meso-blue/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-meso-blue">mail</span>
                  </div>
                  <div>
                    <div className="text-sm text-meso-gray">Email</div>
                    <div className="text-white">hello@meso.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-meso-blue/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-meso-blue">location_on</span>
                  </div>
                  <div>
                    <div className="text-sm text-meso-gray">Location</div>
                    <div className="text-white">Dhaka, Bangladesh</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.6}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  placeholder="Your Name *"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors"
                />
                <input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors"
                />
                <input
                  placeholder="Company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  placeholder="Country"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors"
                />
                <input
                  placeholder="Budget"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors"
                />
              </div>
              <input
                placeholder="Project Type"
                value={form.project_type}
                onChange={(e) => setForm({ ...form, project_type: e.target.value })}
                className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors"
              />
              <textarea
                placeholder="Tell us about your project..."
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-5 py-4 bg-meso-elevated border border-meso-border rounded-xl text-white placeholder:text-meso-gray focus:outline-none focus:border-meso-blue transition-colors resize-none"
              />
              {err && <p className="text-red-400 text-sm">{err}</p>}
              {done && <p className="text-meso-blue text-sm">Thank you! We&apos;ll be in touch within 24 hours.</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto px-10 py-4 rounded-full bg-white text-black font-medium hover:bg-meso-blue hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
