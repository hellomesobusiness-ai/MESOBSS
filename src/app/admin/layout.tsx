'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

const sidebarLinks = [
  { href: '/admin', icon: 'dashboard', label: 'Dashboard' },
  { href: '/admin/services', icon: 'auto_awesome', label: 'Services' },
  { href: '/admin/packages', icon: 'inventory_2', label: 'Packages' },
  { href: '/admin/portfolio', icon: 'work', label: 'Portfolio' },
  { href: '/admin/blog', icon: 'article', label: 'Blog' },
  { href: '/admin/inquiries', icon: 'forum', label: 'Inquiries' },
  { href: '/admin/leads', icon: 'leaderboard', label: 'Leads' },
  { href: '/admin/testimonials', icon: 'star', label: 'Testimonials' },
  { href: '/admin/users', icon: 'group', label: 'Users' },
  { href: '/admin/coupons', icon: 'confirmation_number', label: 'Coupons' },
  { href: '/admin/seo', icon: 'search', label: 'SEO' },
  { href: '/admin/settings', icon: 'settings', label: 'Settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    async function check() {
      const { supabase } = await import('@/lib/supabase')
      if (!supabase) {
        setAuthed(true)
        setChecking(false)
        return
      }
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setAuthed(true)
      } else {
        router.push('/login')
      }
      setChecking(false)
    }
    check()
  }, [router])

  if (checking) {
    return (
      <div className="min-h-screen bg-meso-black flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-meso-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-meso-black flex items-center justify-center">
        <p className="text-meso-gray">Redirecting to login...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-meso-black flex">
      <aside className="w-64 fixed left-0 top-0 bottom-0 border-r border-meso-border bg-meso-surface/50 backdrop-blur-xl overflow-y-auto hide-scrollbar z-50">
        <div className="p-6 border-b border-meso-border">
          <Link href="/admin" className="text-xl font-bold tracking-tighter text-white">MESO</Link>
          <p className="text-[10px] tracking-widest text-meso-gray uppercase mt-1">Admin Panel</p>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                  active ? 'bg-meso-blue/10 text-meso-blue' : 'text-meso-gray hover:text-white hover:bg-meso-elevated'
                }`}
              >
                <span className="material-symbols-outlined text-base">{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-meso-elevated border border-meso-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] tracking-widest text-green-500 uppercase">Local Mode</span>
          </div>
          <p className="text-[10px] text-meso-gray">Data persists during session</p>
        </div>
      </aside>
      <div className="ml-64 flex-1 min-h-screen">
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
