'use client'

import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Props {
  onUploaded: (url: string, path: string) => void
  currentUrl?: string
}

export function ImageUploader({ onUploaded, currentUrl }: Props) {
  const inputRef          = useRef<HTMLInputElement>(null)
  const [preview, setPreview]     = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError]         = useState<string | null>(null)

  async function handleFile(file: File) {
    setError(null)
    setUploading(true)
    const supabase  = createClient()
    const ext       = file.name.split('.').pop()
    const path      = `products/${crypto.randomUUID()}.${ext}`

    const { error: upErr } = await supabase.storage
      .from('product-images')
      .upload(path, file, { cacheControl: '3600', upsert: false })

    if (upErr) { setError(upErr.message); setUploading(false); return }

    const { data } = supabase.storage.from('product-images').getPublicUrl(path)
    setPreview(data.publicUrl)
    onUploaded(data.publicUrl, path)
    setUploading(false)
  }

  return (
    <div
      className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer hover:border-optical-gold/50 transition-colors"
      onClick={() => inputRef.current?.click()}
      onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
      onDragOver={e => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />
      {preview || currentUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview ?? currentUrl!} alt="Preview" className="w-40 h-40 object-contain rounded-lg bg-gray-50 border border-gray-100 p-2" />
      ) : (
        <Upload className="w-8 h-8 text-muted-foreground" />
      )}
      <p className="text-sm text-muted-foreground text-center">
        {uploading ? 'Uploading…' : preview ? 'Click to change image' : currentUrl ? 'Click to replace image' : 'Click or drag & drop an image'}
      </p>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
