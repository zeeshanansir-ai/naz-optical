import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = createAdminClient()
  const body  = await req.json()
  const { name, category, brand, price, original_price, badge, image_url, storage_path, images_360, model_3d_url } = body

  const { error } = await admin.from('products').update({
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
  }).eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const admin = createAdminClient()
  const { error } = await admin.from('products').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
