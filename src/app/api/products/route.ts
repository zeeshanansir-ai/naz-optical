import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  const admin = createAdminClient()
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')

  let query = admin.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false })
  if (category && category !== 'all') query = query.eq('category', category)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not set in environment variables' }, { status: 500 })
  }

  const admin = createAdminClient()
  const body  = await req.json()
  const { name, category, brand, price, original_price, badge, image_url, storage_path, images_360, model_3d_url } = body

  if (!name || !category || !price || !image_url) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
  }

  const { error } = await admin.from('products').insert({
    name,
    category,
    brand:          brand || null,
    price:          Number(price),
    original_price: original_price ? Number(original_price) : null,
    badge:          badge && badge !== 'none' ? badge : null,
    image_url,
    storage_path,
    images_360:     images_360?.length > 0 ? images_360 : null,
    model_3d_url:   model_3d_url || null,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true }, { status: 201 })
}
