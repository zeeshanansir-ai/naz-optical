'use client'

import { useState, useRef } from 'react'
import { UploadPortal } from './UploadPortal'
import { ProductList } from './ProductList'
import { Product } from '@/types'

export function AdminDashboard() {
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [listKey, setListKey]         = useState(0)
  const formRef                       = useRef<HTMLDivElement>(null)

  function handleEdit(product: Product) {
    setEditProduct(product)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleSaved() {
    setEditProduct(null)
    setListKey(k => k + 1)
  }

  function handleCancelEdit() {
    setEditProduct(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-optical-navy">Admin Portal</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your product listings.</p>
        </div>

        {/* Upload / Edit form */}
        <div ref={formRef} className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-5">
            {editProduct ? '✏️ Edit Product' : '➕ Add New Product'}
          </h2>
          <UploadPortal
            editProduct={editProduct}
            onSaved={handleSaved}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        {/* Product list */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <ProductList key={listKey} onEdit={handleEdit} />
        </div>

      </div>
    </div>
  )
}
