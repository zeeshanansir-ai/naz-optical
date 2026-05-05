'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/product/ProductCard'
import { QuickViewModal } from '@/components/product/QuickViewModal'
import { Product, QuickViewState } from '@/types'

interface Props {
  products: Product[]
  loading: boolean
}

export function ProductGrid({ products, loading }: Props) {
  const [qv, setQv] = useState<QuickViewState>({ open: false, product: null })

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No products found. Try a different search or category.
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onQuickView={product => setQv({ open: true, product })}
          />
        ))}
      </div>
      <QuickViewModal
        product={qv.product}
        open={qv.open}
        onClose={() => setQv({ open: false, product: null })}
      />
    </>
  )
}
