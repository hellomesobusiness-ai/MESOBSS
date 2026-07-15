'use client'

import Link from 'next/link'
import AdminDataTable from '@/components/AdminDataTable'

export default function AdminPortfolioPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-meso-gray mb-8">
        <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-white">Portfolio</span>
      </div>
      <AdminDataTable
        collection="portfolio"
        title="Portfolio Projects"
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'cat', label: 'Category' },
          { key: 'desc', label: 'Description' },
          { key: 'metric', label: 'Metric' },
        ]}
      />
    </div>
  )
}
