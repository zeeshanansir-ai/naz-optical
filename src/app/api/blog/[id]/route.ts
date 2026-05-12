import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = createAdminClient()
  const { title, slug, excerpt, content, cover_image_url, is_published } = await req.json()

  const { error } = await admin.from('blog_posts').update({
    title,
    slug:            slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    excerpt:         excerpt || null,
    content,
    cover_image_url: cover_image_url || null,
    is_published:    is_published ?? false,
    updated_at:      new Date().toISOString(),
  }).eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const admin = createAdminClient()
  const { error } = await admin.from('blog_posts').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
