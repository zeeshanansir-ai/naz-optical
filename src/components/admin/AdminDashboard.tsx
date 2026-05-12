'use client'

import { useState, useRef } from 'react'
import { UploadPortal } from './UploadPortal'
import { ProductList } from './ProductList'
import { BlogManager } from './BlogManager'
import { FAQManager } from './FAQManager'
import { Product } from '@/types'

type Tab = 'products' | 'blog' | 'faq'

export function AdminDashboard() {
  const [tab, setTab]              = useState<Tab>('products')
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
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-optical-navy">Admin Portal</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your products, blog, and FAQs.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 w-fit">
          {([
            ['products', '🛍️ Products'],
            ['blog',     '📝 Blog'],
            ['faq',      '❓ FAQ'],
          ] as [Tab, string][]).map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                tab === t
                  ? 'bg-optical-navy text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'products' && (
          <>
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
          </>
        )}

        {tab === 'blog' && (
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <BlogManager />
          </div>
        )}

        {tab === 'faq' && (
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <FAQManager />
          </div>
        )}

      </div>
    </div>
  )
}
