'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ImageUploader } from './ImageUploader'
import { CATEGORIES } from '@/lib/constants'
import { Category } from '@/types'

interface FormState {
  name:         string
  category:     Category | ''
  price:        string
  image_url:    string
  storage_path: string
}

const INIT: FormState = { name: '', category: '', price: '', image_url: '', storage_path: '' }

export function UploadPortal() {
  const [form, setForm]     = useState<FormState>(INIT)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]   = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.image_url) { setError('Please upload an image first'); return }
    setSaving(true); setError(null)

    const res = await fetch('/api/products', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(form),
    })

    if (!res.ok) {
      const { error: msg } = await res.json()
      setError(msg ?? 'Failed to save product')
    } else {
      setSuccess(true)
      setForm(INIT)
      setTimeout(() => setSuccess(false), 3000)
    }
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <ImageUploader
        onUploaded={(url, path) => setForm(f => ({ ...f, image_url: url, storage_path: path }))}
      />

      <div className="space-y-1.5">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          placeholder="e.g. Ray-Ban Classic Aviator"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Category</Label>
          <Select
            value={form.category}
            onValueChange={v => setForm(f => ({ ...f, category: v as Category }))}
            required
          >
            <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(c => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="price">Price (Rs.)</Label>
          <Input
            id="price"
            type="number"
            min={0}
            placeholder="2500"
            value={form.price}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            required
          />
        </div>
      </div>

      {error   && <p className="text-sm text-red-500">{error}</p>}
      {success && (
        <p className="text-sm text-green-600 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4" /> Product saved successfully!
        </p>
      )}

      <Button type="submit" disabled={saving} className="w-full bg-optical-navy hover:bg-optical-navy/90">
        {saving ? 'Saving…' : 'Save Product'}
      </Button>
    </form>
  )
}
