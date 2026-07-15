'use client'

import Link from 'next/link'
import AdminDataTable from '@/components/AdminDataTable'

export default function AdminServicesPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-meso-gray mb-8">
        <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-white">Services</span>
      </div>
      <AdminDataTable
        collection="services"
        title="Services"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'desc', label: 'Description' },
          { key: 'icon', label: 'Icon' },
          { key: 'href', label: 'Link' },
        ]}
      />
    </div>
  )
}
