'use client'

import { useRef } from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { SearchBar } from '@/components/home/SearchBar'
import { ProductGrid } from '@/components/home/ProductGrid'
import { useProducts } from '@/hooks/useProducts'

export default function HomePage() {
  const gridRef = useRef<HTMLDivElement>(null)
  const { products, loading, search, setSearch, category, setCategory } = useProducts()

  return (
    <main>
      <HeroSection onShopNow={() => gridRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 py-12 space-y-6">
        <SearchBar
          search={search}
          onSearch={setSearch}
          category={category}
          onCategory={setCategory}
        />
        <ProductGrid products={products} loading={loading} />
      </section>
    </main>
  )
}
