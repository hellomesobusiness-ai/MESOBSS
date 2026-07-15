'use client'

import Link from 'next/link'
import AdminDataTable from '@/components/AdminDataTable'

export default function AdminUsersPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-meso-gray mb-8">
        <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-white">Users</span>
      </div>
      <AdminDataTable
        collection="users"
        title="Users"
        columns={[
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          { key: 'created_at', label: 'Created' },
        ]}
        defaultItem={{ role: 'user' }}
      />
    </div>
  )
}
