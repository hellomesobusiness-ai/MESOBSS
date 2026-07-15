'use client'

import Link from 'next/link'
import AdminDataTable from '@/components/AdminDataTable'

export default function AdminInquiriesPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-meso-gray mb-8">
        <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-white">Inquiries</span>
      </div>
      <AdminDataTable
        collection="inquiries"
        title="Inquiries"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'company', label: 'Company' },
          { key: 'project_type', label: 'Project Type' },
          { key: 'status', label: 'Status' },
          { key: 'created_at', label: 'Date' },
        ]}
      />
    </div>
  )
}
