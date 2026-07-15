'use client'

import Link from 'next/link'
import AdminDataTable from '@/components/AdminDataTable'

export default function AdminLeadsPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-meso-gray mb-8">
        <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-white">Leads</span>
      </div>
      <AdminDataTable
        collection="leads"
        title="Leads"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          { key: 'source', label: 'Source' },
          { key: 'status', label: 'Status' },
        ]}
        defaultItem={{ status: 'new', source: 'website' }}
      />
    </div>
  )
}
