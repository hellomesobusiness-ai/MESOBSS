import { useState, useEffect, useCallback } from 'react'

export function useData<T>(collection: string) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/data?col=${collection}`)
      const json = await res.json()
      if (json.data) setData(json.data)
    } catch {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [collection])

  useEffect(() => { fetchData() }, [fetchData])

  const createItem = async (item: any) => {
    const res = await fetch(`/api/data?col=${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create', data: item }),
    })
    const json = await res.json()
    if (json.data) {
      setData((prev) => [...prev, json.data])
      return json.data
    }
    return null
  }

  const updateItem = async (id: string, item: any) => {
    const res = await fetch(`/api/data?col=${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update', id, data: item }),
    })
    const json = await res.json()
    if (json.data) {
      setData((prev) => prev.map((d: any) => (d.id === id ? json.data : d)))
      return json.data
    }
    return null
  }

  const deleteItem = async (id: string) => {
    const res = await fetch(`/api/data?col=${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id }),
    })
    const json = await res.json()
    if (json.success) {
      setData((prev) => prev.filter((d: any) => d.id !== id))
      return true
    }
    return false
  }

  return { data, loading, error, refetch: fetchData, createItem, updateItem, deleteItem }
}
