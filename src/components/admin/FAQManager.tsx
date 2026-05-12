'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, CheckCircle, X, Plus, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FAQ {
  id:         string
  question:   string
  answer:     string
  sort_order: number
  is_active:  boolean
}

interface FormState {
  question:   string
  answer:     string
  sort_order: string
}

const INIT: FormState = { question: '', answer: '', sort_order: '' }

export function FAQManager() {
  const [faqs, setFaqs]       = useState<FAQ[]>([])
  const [form, setForm]       = useState<FormState>(INIT)
  const [editFaq, setEdit]    = useState<FAQ | null>(null)
  const [showForm, setShow]   = useState(false)
  const [saving, setSaving]   = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  async function loadFaqs() {
    const res = await fetch('/api/faqs')
    if (res.ok) setFaqs(await res.json())
  }

  useEffect(() => { loadFaqs() }, [])

  function startEdit(faq: FAQ) {
    setEdit(faq)
    setForm({ question: faq.question, answer: faq.answer, sort_order: String(faq.sort_order) })
    setShow(true)
    setError(null)
    setSuccess(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setEdit(null)
    setForm(INIT)
    setShow(false)
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError(null)

    const payload = {
      question:   form.question,
      answer:     form.answer,
      sort_order: form.sort_order ? Number(form.sort_order) : faqs.length + 1,
    }

    const url    = editFaq ? `/api/faqs/${editFaq.id}` : '/api/faqs'
    const method = editFaq ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    })

    if (!res.ok) {
      const { error: msg } = await res.json()
      setError(msg ?? 'Failed to save')
    } else {
      setSuccess(true)
      setForm(INIT)
      setEdit(null)
      setShow(false)
      setTimeout(() => setSuccess(false), 3000)
      loadFaqs()
    }
    setSaving(false)
  }

  async function deleteFaq(id: string, question: string) {
    if (!confirm(`Delete this FAQ?\n\n"${question}"`)) return
    await fetch(`/api/faqs/${id}`, { method: 'DELETE' })
    loadFaqs()
  }

  return (
    <div className="space-y-6">

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800">FAQ Manager</h2>
          <p className="text-xs text-gray-400 mt-0.5">{faqs.length} question{faqs.length !== 1 ? 's' : ''} — shown on the homepage</p>
        </div>
        {!showForm && (
          <Button size="sm" className="bg-optical-navy hover:bg-optical-navy/90" onClick={() => { setShow(true); setEdit(null); setForm(INIT) }}>
            <Plus className="w-4 h-4 mr-1" /> Add FAQ
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="border border-blue-200 bg-blue-50 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-blue-700">{editFaq ? 'Edit FAQ' : 'New FAQ'}</h3>
            <button type="button" onClick={cancelEdit}><X className="w-4 h-4 text-blue-500" /></button>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="faq-q">Question *</Label>
            <Input
              id="faq-q"
              placeholder="e.g. Do you offer home delivery?"
              value={form.question}
              onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="faq-a">Answer *</Label>
            <textarea
              id="faq-a"
              rows={4}
              placeholder="Write the answer here..."
              value={form.answer}
              onChange={e => setForm(f => ({ ...f, answer: e.target.value }))}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-vertical"
            />
          </div>

          <div className="space-y-1.5 w-32">
            <Label htmlFor="faq-order">Sort Order <span className="text-xs font-normal text-gray-400">(lower = first)</span></Label>
            <Input
              id="faq-order"
              type="number"
              min={1}
              placeholder={String(faqs.length + 1)}
              value={form.sort_order}
              onChange={e => setForm(f => ({ ...f, sort_order: e.target.value }))}
            />
          </div>

          {error   && <p className="text-sm text-red-500">{error}</p>}
          {success && (
            <p className="text-sm text-green-600 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Saved!
            </p>
          )}

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={cancelEdit} className="flex-1">Cancel</Button>
            <Button type="submit" disabled={saving} className="flex-1 bg-optical-navy hover:bg-optical-navy/90">
              {saving ? 'Saving…' : editFaq ? 'Update FAQ' : 'Add FAQ'}
            </Button>
          </div>
        </form>
      )}

      {success && !showForm && (
        <p className="text-sm text-green-600 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4" /> Saved successfully!
        </p>
      )}

      {/* FAQ list */}
      {faqs.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No FAQs yet. Click Add FAQ to get started.</p>
      ) : (
        <ul className="space-y-2">
          {faqs.map((faq, i) => (
            <li key={faq.id} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-colors">
              <div className="flex-shrink-0 flex items-center gap-1 mt-0.5 text-gray-300">
                <GripVertical className="w-4 h-4" />
                <span className="text-xs font-mono w-4 text-center">{i + 1}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-800">{faq.question}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{faq.answer}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => startEdit(faq)} className="p-1.5 hover:text-optical-navy text-gray-400 transition-colors" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => deleteFaq(faq.id, faq.question)} className="p-1.5 hover:text-red-600 text-gray-400 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
