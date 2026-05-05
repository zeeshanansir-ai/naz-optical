'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ProductCard } from '@/components/product/ProductCard'
import { QuickViewModal } from '@/components/product/QuickViewModal'
import { Product, QuickViewState } from '@/types'

interface Props {
  title: string
  subtitle: string
  products: Product[]
  category: string
  loading?: boolean
}

export function ProductSection({ title, subtitle, products, category, loading }: Props) {
  const [qv, setQv] = useState<QuickViewState>({ open: false, product: null })

  return (
    <section className="py-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-sm text-gray-400 py-8 text-center">No products in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} onQuickView={p => setQv({ open: true, product: p })} />
            ))}
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Link
              href={`/?category=${category}`}
              className="inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-colors"
            >
              Explore {title}
            </Link>
          </div>
        )}
      </div>

      <QuickViewModal
        product={qv.product}
        open={qv.open}
        onClose={() => setQv({ open: false, product: null })}
      />
    </section>
  )
}
