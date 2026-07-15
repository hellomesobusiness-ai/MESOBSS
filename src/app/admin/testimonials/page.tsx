'use client'

import Link from 'next/link'
import AdminDataTable from '@/components/AdminDataTable'

export default function AdminTestimonialsPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-meso-gray mb-8">
        <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-white">Testimonials</span>
      </div>
      <AdminDataTable
        collection="testimonials"
        title="Testimonials"
        columns={[
          { key: 'author', label: 'Author' },
          { key: 'role', label: 'Role' },
          { key: 'text', label: 'Text' },
        ]}
      />
    </div>
  )
}
