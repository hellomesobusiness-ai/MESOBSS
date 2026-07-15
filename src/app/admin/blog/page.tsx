'use client'

import Link from 'next/link'
import AdminDataTable from '@/components/AdminDataTable'

export default function AdminBlogPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-meso-gray mb-8">
        <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-white">Blog</span>
      </div>
      <AdminDataTable
        collection="blogPosts"
        title="Blog Posts"
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'cat', label: 'Category' },
          { key: 'date', label: 'Date' },
          { key: 'excerpt', label: 'Excerpt' },
        ]}
        defaultItem={{ date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
      />
    </div>
  )
}
