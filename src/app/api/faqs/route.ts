import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const admin = createAdminClient()
  const { question, answer, sort_order } = await req.json()

  if (!question || !answer) {
    return NextResponse.json({ error: 'Question and answer are required' }, { status: 422 })
  }

  const { error } = await admin.from('faqs').insert({
    question,
    answer,
    sort_order: sort_order ?? 0,
    is_active: true,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true }, { status: 201 })
}
