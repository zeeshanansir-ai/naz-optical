import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = createAdminClient()
  const { question, answer, sort_order, is_active } = await req.json()

  const { error } = await admin.from('faqs').update({
    question,
    answer,
    sort_order: sort_order ?? 0,
    is_active:  is_active ?? true,
  }).eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const admin = createAdminClient()
  const { error } = await admin.from('faqs').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
