import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const admin = createAdminClient()
  const { title, slug, excerpt, content, cover_image_url, is_published } = await req.json()

  if (!title || !slug || !content) {
    return NextResponse.json({ error: 'Title, slug, and content are required' }, { status: 422 })
  }

  const { error } = await admin.from('blog_posts').insert({
    title,
    slug: slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    excerpt:         excerpt || null,
    content,
    cover_image_url: cover_image_url || null,
    is_published:    is_published ?? false,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true }, { status: 201 })
}
