'use client'

import { useState } from 'react'
import { CheckCircle, X, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ImageUploader } from './ImageUploader'
import { createClient } from '@/lib/supabase/client'
import { CATEGORIES } from '@/lib/constants'
import { Category } from '@/types'

interface FormState {
  name:           string
  category:       Category | ''
  brand:          string
  price:          string
  original_price: string
  badge:          'new' | 'premium' | 'sale' | ''
  image_url:      string
  storage_path:   string
  images_360:     string[]
  model_3d_url:   string
}

const INIT: FormState = {
  name: '', category: '', brand: '', price: '', original_price: '',
  badge: '', image_url: '', storage_path: '', images_360: [], model_3d_url: '',
}

export function UploadPortal() {
  const [form, setForm]           = useState<FormState>(INIT)
  const [saving, setSaving]       = useState(false)
  const [success, setSuccess]     = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [uploading360, set360]    = useState(false)
  const [uploadingModel, setModel]= useState(false)

  async function upload360(files: FileList) {
    set360(true)
    const supabase = createClient()
    const urls: string[] = []
    const sorted = Array.from(files).sort((a, b) => a.name.localeCompare(b.name))

    for (const file of sorted) {
      const path = `360/${crypto.randomUUID()}_${file.name}`
      await supabase.storage.from('product-images').upload(path, file, { cacheControl: '3600' })
      const { data } = supabase.storage.from('product-images').getPublicUrl(path)
      urls.push(data.publicUrl)
    }

    setForm(f => ({ ...f, images_360: urls }))
    set360(false)
  }

  async function uploadModel(file: File) {
    setModel(true)
    const supabase = createClient()
    const path = `models/${crypto.randomUUID()}_${file.name}`
    await supabase.storage.from('product-images').upload(path, file, { cacheControl: '3600' })
    const { data } = supabase.storage.from('product-images').getPublicUrl(path)
    setForm(f => ({ ...f, model_3d_url: data.publicUrl }))
    setModel(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.image_url) { setError('Please upload a main image first'); return }
    setSaving(true); setError(null)

    const res = await fetch('/api/products', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        ...form,
        images_360:   form.images_360.length > 0 ? form.images_360 : null,
        model_3d_url: form.model_3d_url || null,
      }),
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">

      {/* Main image */}
      <div className="space-y-1.5">
        <Label>Main Product Image *</Label>
        <ImageUploader onUploaded={(url, path) => setForm(f => ({ ...f, image_url: url, storage_path: path }))} />
      </div>

      {/* Product name */}
      <div className="space-y-1.5">
        <Label htmlFor="name">Product Name *</Label>
        <Input id="name" placeholder="e.g. Ray-Ban Classic Aviator" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
      </div>

      {/* Category + Brand */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Category *</Label>
          <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v as Category }))} required>
            <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" placeholder="e.g. Ray Ban" value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} />
        </div>
      </div>

      {/* Price + Original + Badge */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="price">Price (Rs.) *</Label>
          <Input id="price" type="number" min={0} placeholder="2500" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="original_price">Original Price</Label>
          <Input id="original_price" type="number" min={0} placeholder="3500" value={form.original_price} onChange={e => setForm(f => ({ ...f, original_price: e.target.value }))} />
        </div>
        <div className="space-y-1.5">
          <Label>Badge</Label>
          <Select value={form.badge} onValueChange={v => setForm(f => ({ ...f, badge: v as 'new' | 'premium' | 'sale' | '' }))}>
            <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="sale">Sale</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 360° images */}
      <div className="space-y-2 border border-dashed border-gray-200 rounded-xl p-4">
        <Label className="flex items-center gap-2 text-sm font-semibold">
          360° View Images
          <span className="text-xs font-normal text-gray-400">(optional — upload 24–36 frames, named in order)</span>
        </Label>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-optical-navy">
          <Upload className="w-4 h-4" />
          {uploading360 ? 'Uploading…' : form.images_360.length > 0 ? `${form.images_360.length} frames uploaded ✓` : 'Select all frame images at once'}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => e.target.files && upload360(e.target.files)}
          />
        </label>
        {form.images_360.length > 0 && (
          <button type="button" onClick={() => setForm(f => ({ ...f, images_360: [] }))} className="text-xs text-red-500 flex items-center gap-1">
            <X className="w-3 h-3" /> Clear 360° frames
          </button>
        )}
      </div>

      {/* 3D model */}
      <div className="space-y-2 border border-dashed border-gray-200 rounded-xl p-4">
        <Label className="flex items-center gap-2 text-sm font-semibold">
          3D Model for Try-On
          <span className="text-xs font-normal text-gray-400">(optional — .glb file)</span>
        </Label>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-optical-navy">
          <Upload className="w-4 h-4" />
          {uploadingModel ? 'Uploading…' : form.model_3d_url ? 'Model uploaded ✓' : 'Select .glb file'}
          <input
            type="file"
            accept=".glb,.gltf"
            className="hidden"
            onChange={e => e.target.files?.[0] && uploadModel(e.target.files[0])}
          />
        </label>
        {form.model_3d_url && (
          <button type="button" onClick={() => setForm(f => ({ ...f, model_3d_url: '' }))} className="text-xs text-red-500 flex items-center gap-1">
            <X className="w-3 h-3" /> Remove model
          </button>
        )}
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
