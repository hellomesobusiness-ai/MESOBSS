'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const statsConfig = [
  { label: 'Services', collection: 'services', href: '/admin/services', color: 'bg-meso-blue' },
  { label: 'Packages', collection: 'packages', href: '/admin/packages', color: 'bg-green-500' },
  { label: 'Portfolio', collection: 'portfolio', href: '/admin/portfolio', color: 'bg-purple-500' },
  { label: 'Blog Posts', collection: 'blogPosts', href: '/admin/blog', color: 'bg-orange-500' },
  { label: 'Inquiries', collection: 'inquiries', href: '/admin/inquiries', color: 'bg-pink-500' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({})
  const [recentInquiries, setRecent] = useState<any[]>([])

  useEffect(() => {
    Promise.all(
      statsConfig.map(async (s) => {
        const res = await fetch(`/api/data?col=${s.collection}`)
        const json = await res.json()
        return { key: s.collection, data: json.data || [] }
      })
    ).then((results) => {
      const map: Record<string, number> = {}
      results.forEach((r) => { map[r.key] = r.data.length })
      setStats(map)

      const inq = results.find((r) => r.key === 'inquiries')
      if (inq) setRecent(inq.data.slice(0, 5).reverse())
    })
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="text-sm text-meso-gray mt-1">Welcome to the MESO admin panel</p>
        </div>
        <Link href="/" className="text-sm text-meso-blue hover:underline">View Site</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {statsConfig.map((s) => (
          <Link key={s.label} href={s.href} className="p-6 rounded-xl bg-meso-elevated border border-meso-border hover:border-meso-blue/20 transition-all">
            <div className={`w-3 h-3 rounded-full ${s.color} mb-3`} />
            <div className="text-3xl font-bold text-white">{stats[s.collection] ?? 0}</div>
            <div className="text-xs text-meso-gray mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl bg-meso-elevated border border-meso-border">
          <h2 className="text-lg font-medium text-white mb-4">Recent Inquiries</h2>
          {recentInquiries.length === 0 ? (
            <p className="text-sm text-meso-gray">No inquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="flex items-center justify-between py-3 border-b border-meso-border last:border-0">
                  <div>
                    <p className="text-sm text-white">{inq.name}</p>
                    <p className="text-xs text-meso-gray">{inq.company || '—'} · {inq.project_type || '—'}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded uppercase font-bold ${
                    inq.status === 'new' ? 'bg-meso-blue/10 text-meso-blue' :
                    inq.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-500' :
                    inq.status === 'won' ? 'bg-green-500/10 text-green-500' : 'bg-meso-gray/10 text-meso-gray'
                  }`}>{inq.status || 'new'}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 rounded-xl bg-meso-elevated border border-meso-border">
          <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'New Service', href: '/admin/services', icon: 'add_circle' },
              { label: 'New Package', href: '/admin/packages', icon: 'add_circle' },
              { label: 'New Project', href: '/admin/portfolio', icon: 'add_circle' },
              { label: 'New Blog', href: '/admin/blog', icon: 'add_circle' },
            ].map((action) => (
              <Link key={action.label} href={action.href} className="flex items-center gap-3 p-4 rounded-lg bg-meso-surface border border-meso-border hover:border-meso-blue/20 transition-all">
                <span className="material-symbols-outlined text-meso-blue">{action.icon}</span>
                <span className="text-sm text-white">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
