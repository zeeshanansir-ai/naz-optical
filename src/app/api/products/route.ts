import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')

  let query = supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false })
  if (category && category !== 'all') query = query.eq('category', category)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const body = await req.json()
  const { name, category, price, image_url, storage_path } = body

  if (!name || !category || !price || !image_url) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
  }

  const { error } = await supabase.from('products').insert({
    name,
    category,
    price:        Number(price),
    image_url,
    storage_path,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true }, { status: 201 })
}
