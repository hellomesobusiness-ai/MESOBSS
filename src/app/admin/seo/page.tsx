'use client'

import Link from 'next/link'
import AdminDataTable from '@/components/AdminDataTable'

export default function AdminSEOPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-meso-gray mb-8">
        <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-white">SEO</span>
      </div>
      <AdminDataTable
        collection="settings"
        title="SEO & Settings"
        columns={[
          { key: 'key', label: 'Key' },
          { key: 'value', label: 'Value' },
        ]}
      />
    </div>
  )
}
