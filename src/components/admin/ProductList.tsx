'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Pencil, Trash2, Loader2 } from 'lucide-react'
import { Product } from '@/types'
import { CATEGORIES } from '@/lib/constants'

interface Props {
  onEdit: (product: Product) => void
}

export function ProductList({ onEdit }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const res  = await fetch('/api/products')
    const data = await res.json()
    setProducts(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(product: Product) {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    setDeleting(product.id)
    await fetch(`/api/products/${product.id}`, { method: 'DELETE' })
    await load()
    setDeleting(null)
  }

  if (loading) return (
    <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading products…
    </div>
  )

  if (products.length === 0) return (
    <p className="text-center text-gray-400 py-10 text-sm">No products yet. Upload your first product above.</p>
  )

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">All Products ({products.length})</h2>
        <button onClick={load} className="text-xs text-gray-400 hover:text-gray-600 underline">Refresh</button>
      </div>

      <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        {products.map(p => {
          const catLabel = CATEGORIES.find(c => c.value === p.category)?.label ?? p.category
          return (
            <div key={p.id} className="flex items-center gap-4 p-3 bg-white hover:bg-gray-50 transition-colors">
              {/* Thumbnail */}
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <Image src={p.image_url} alt={p.name} fill className="object-contain p-1" sizes="56px" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 truncate">{p.name}</p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{catLabel}</span>
                  {p.brand && <span className="text-xs text-optical-gold font-semibold">{p.brand}</span>}
                  {p.badge && <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${
                    p.badge === 'new' ? 'bg-green-100 text-green-700' :
                    p.badge === 'premium' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                  }`}>{p.badge}</span>}
                  {p.images_360 && p.images_360.length > 1 && <span className="text-xs bg-optical-navy/10 text-optical-navy px-2 py-0.5 rounded-full">360°</span>}
                  {p.model_3d_url && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Try On</span>}
                </div>
              </div>

              {/* Price */}
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-optical-navy">Rs. {p.price.toLocaleString()}</p>
                {p.original_price && <p className="text-xs text-gray-400 line-through">Rs. {p.original_price.toLocaleString()}</p>}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onEdit(p)}
                  className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(p)}
                  disabled={deleting === p.id}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors disabled:opacity-40"
                  title="Delete"
                >
                  {deleting === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
