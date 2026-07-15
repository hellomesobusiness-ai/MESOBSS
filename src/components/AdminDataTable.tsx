'use client'

import { useState } from 'react'
import { useData } from '@/hooks/useData'

interface Column {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'number' | 'select' | 'boolean'
  options?: { label: string; value: string }[]
  render?: (value: any) => string
}

interface Props {
  collection: string
  title: string
  columns: Column[]
  defaultItem?: Record<string, any>
}

export default function AdminDataTable({ collection, title, columns, defaultItem = {} }: Props) {
  const { data, loading, error, createItem, updateItem, deleteItem } = useData<any>(collection)
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState<Record<string, any>>({})
  const [saving, setSaving] = useState(false)

  const startAdd = () => {
    setForm({ ...defaultItem })
    setAdding(true)
    setEditing(null)
  }

  const startEdit = (item: any) => {
    setForm({ ...item })
    setEditing(item.id)
    setAdding(false)
  }

  const cancel = () => {
    setEditing(null)
    setAdding(false)
    setForm({})
  }

  const save = async () => {
    setSaving(true)
    if (adding) {
      const { id, created_at, ...rest } = form
      await createItem(rest)
    } else if (editing) {
      const { id, created_at, ...rest } = form
      await updateItem(editing, rest)
    }
    setSaving(false)
    cancel()
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItem(id)
    }
  }

  if (loading) return <div className="text-meso-gray py-8">Loading...</div>
  if (error) return <div className="text-red-400 py-8">{error}</div>

  const formFields = columns.filter((c) => c.key !== 'id' && c.key !== 'created_at')

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <button onClick={startAdd} className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-meso-blue hover:text-white transition-all">
          Add New
        </button>
      </div>

      {/* Add/Edit Form */}
      {(adding || editing) && (
        <div className="mb-8 p-6 rounded-2xl bg-meso-elevated border border-meso-border">
          <h3 className="text-lg font-medium text-white mb-4">{adding ? 'Add New' : 'Edit'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formFields.map((col) => (
              <div key={col.key}>
                <label className="text-xs text-meso-gray block mb-1">{col.label}</label>
                {col.type === 'textarea' ? (
                  <textarea
                    value={form[col.key] || ''}
                    onChange={(e) => setForm({ ...form, [col.key]: e.target.value })}
                    className="w-full px-3 py-2 bg-meso-black border border-meso-border rounded-lg text-white text-sm focus:outline-none focus:border-meso-blue"
                    rows={3}
                  />
                ) : col.type === 'select' ? (
                  <select
                    value={form[col.key] || ''}
                    onChange={(e) => setForm({ ...form, [col.key]: e.target.value })}
                    className="w-full px-3 py-2 bg-meso-black border border-meso-border rounded-lg text-white text-sm focus:outline-none focus:border-meso-blue"
                  >
                    <option value="">Select...</option>
                    {col.options?.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : col.type === 'boolean' ? (
                  <button
                    onClick={() => setForm({ ...form, [col.key]: !form[col.key] })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${form[col.key] ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-meso-black text-meso-gray border border-meso-border'}`}
                  >
                    {form[col.key] ? 'Active' : 'Inactive'}
                  </button>
                ) : (
                  <input
                    type={col.type === 'number' ? 'number' : 'text'}
                    value={form[col.key] || ''}
                    onChange={(e) => setForm({ ...form, [col.key]: e.target.value })}
                    className="w-full px-3 py-2 bg-meso-black border border-meso-border rounded-lg text-white text-sm focus:outline-none focus:border-meso-blue"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={save} disabled={saving} className="px-6 py-2 rounded-full bg-meso-blue text-black text-sm font-medium hover:bg-white transition-all disabled:opacity-50">
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={cancel} className="px-6 py-2 rounded-full border border-meso-border text-meso-gray text-sm hover:text-white transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-meso-border">
              {columns.map((col) => (
                <th key={col.key} className="text-left text-meso-gray font-medium py-3 px-4 text-xs uppercase tracking-wider">{col.label}</th>
              ))}
              <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-meso-gray">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="text-center text-meso-gray py-12">No items yet. Click &quot;Add New&quot; to create one.</td></tr>
            )}
            {data.map((item: any) => (
              <tr key={item.id} className="border-b border-meso-border/50 hover:bg-meso-surface/50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-4 text-white">
                    {col.render ? col.render(item[col.key]) : col.type === 'boolean' ? (
                      <span className={item[col.key] ? 'text-green-400' : 'text-meso-gray'}>{item[col.key] ? 'Active' : 'Inactive'}</span>
                    ) : col.type === 'number' ? (
                      new Intl.NumberFormat().format(Number(item[col.key])) || item[col.key]
                    ) : (
                      item[col.key] || '-'
                    )}
                  </td>
                ))}
                <td className="py-3 px-4 text-right">
                  <button onClick={() => startEdit(item)} className="text-meso-blue hover:text-white mr-4 transition-colors text-xs">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 transition-colors text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
