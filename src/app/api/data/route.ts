import { NextRequest, NextResponse } from 'next/server'
import { list, create, update, remove, type Collection } from '@/lib/store'

const validCollections: Collection[] = [
  'services', 'packages', 'singleCategories', 'intlServices',
  'portfolio', 'blogPosts', 'testimonials', 'inquiries',
  'leads', 'coupons', 'settings', 'users',
]

export async function GET(req: NextRequest) {
  const col = req.nextUrl.searchParams.get('col') as Collection | null
  if (!col || !validCollections.includes(col)) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 })
  }
  return NextResponse.json({ data: list(col) })
}

export async function POST(req: NextRequest) {
  const col = req.nextUrl.searchParams.get('col') as Collection | null
  if (!col || !validCollections.includes(col)) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 })
  }
  try {
    const body = await req.json()
    const { action, data, id } = body

    switch (action) {
      case 'create': {
        const item = create(col, data)
        return NextResponse.json({ data: item }, { status: 201 })
      }
      case 'update': {
        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
        const item = update(col, id, data)
        if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json({ data: item })
      }
      case 'delete': {
        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
        const ok = remove(col, id)
        if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json({ success: true })
      }
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
