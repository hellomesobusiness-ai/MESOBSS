import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  }
  try {
    const { email, password } = await request.json()
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password })
    if (error) return NextResponse.json({ error: error.message }, { status: 401 })
    return NextResponse.json({ user: data.user })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
