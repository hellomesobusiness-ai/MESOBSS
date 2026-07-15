'use client'

import Link from 'next/link'
import AdminDataTable from '@/components/AdminDataTable'

export default function AdminCouponsPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-meso-gray mb-8">
        <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-white">Coupons</span>
      </div>
      <AdminDataTable
        collection="coupons"
        title="Coupons"
        columns={[
          { key: 'code', label: 'Code' },
          { key: 'discount', label: 'Discount', type: 'number' },
          { key: 'type', label: 'Type' },
          { key: 'active', label: 'Active', type: 'boolean' },
          { key: 'expires_at', label: 'Expires' },
        ]}
        defaultItem={{ active: true, type: 'percentage' }}
      />
    </div>
  )
}
