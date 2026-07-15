'use client'

import Link from 'next/link'
import AdminDataTable from '@/components/AdminDataTable'

export default function AdminPackagesPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-meso-gray mb-8">
        <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-white">Packages</span>
      </div>
      <AdminDataTable
        collection="packages"
        title="Monthly Packages"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'price', label: 'Price' },
          { key: 'currency', label: 'Currency' },
          { key: 'popular', label: 'Popular', type: 'boolean' },
          { key: 'features', label: 'Features', render: (v: string[]) => v?.join(', ') || '-' },
        ]}
        defaultItem={{ currency: 'BDT', popular: false, features: [] }}
      />
    </div>
  )
}
