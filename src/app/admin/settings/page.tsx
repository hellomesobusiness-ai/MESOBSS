'use client'

import Link from 'next/link'
import AdminDataTable from '@/components/AdminDataTable'

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-meso-gray mb-8">
        <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-white">Settings</span>
      </div>
      <AdminDataTable
        collection="settings"
        title="Site Settings"
        columns={[
          { key: 'key', label: 'Setting' },
          { key: 'value', label: 'Value' },
        ]}
      />
    </div>
  )
}
