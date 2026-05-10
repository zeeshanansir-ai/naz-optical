'use client'

import { Suspense, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { CategoryCircles } from '@/components/home/CategoryCircles'
import { BrandScroll } from '@/components/home/BrandScroll'
import { SearchBar } from '@/components/home/SearchBar'
import { FilterBar } from '@/components/home/FilterBar'
import { ProductGrid } from '@/components/home/ProductGrid'
import { ProductSection } from '@/components/home/ProductSection'
import { FAQSection } from '@/components/home/FAQSection'
import { useProducts } from '@/hooks/useProducts'
import { Category } from '@/types'

function HomeContent() {
  const params        = useSearchParams()
  const urlCategory   = params.get('category') as Category | null
  const urlSearch     = params.get('q') ?? ''
  const gridRef       = useRef<HTMLDivElement>(null)

  const {
    products, byCategory, loading,
    search, setSearch,
    category, setCategory,
    sort, setSort,
  } = useProducts(urlCategory ?? 'all', urlSearch || undefined)

  // Sync URL param changes into state (fixes menu links not updating the filter)
  useEffect(() => { setCategory(urlCategory ?? 'all') }, [urlCategory])
  useEffect(() => { setSearch(urlSearch) },              [urlSearch])

  const isFiltered = category !== 'all' || search.trim().length > 0 || !!urlSearch

  return (
    <main>
      <HeroSection onShopNow={() => gridRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <TrustBar />
      <CategoryCircles />

      <section ref={gridRef} id="products" className="max-w-7xl mx-auto px-4 py-8 space-y-4">
        <SearchBar
          search={search || urlSearch}
          onSearch={setSearch}
          category={category}
          onCategory={setCategory}
        />
        <FilterBar
          sort={sort}
          onSort={setSort}
          category={category}
          onCategory={setCategory}
          total={products.length}
        />

        {isFiltered ? (
          <ProductGrid products={products} loading={loading} />
        ) : (
          <>
            <ProductSection
              title="Premium Sunglasses"
              subtitle="Acetate Material · Premium Finishing · Life Long Quality"
              products={byCategory['sunglasses'] ?? []}
              category="sunglasses"
              loading={loading}
            />
            <ProductSection
              title="Eyeglasses"
              subtitle="Luxury Designs · Finest Quality Material · 18 Months Warranty"
              products={byCategory['men'] ?? []}
              category="men"
              loading={loading}
            />
            <ProductSection
              title="Women's Collection"
              subtitle="Elegant frames designed for every style"
              products={byCategory['women'] ?? []}
              category="women"
              loading={loading}
            />
            <ProductSection
              title="Kids Glasses"
              subtitle="Durable & Fun Frames · Safe for Children · Flexible Material"
              products={byCategory['kids'] ?? []}
              category="kids"
              loading={loading}
            />
            <ProductSection
              title="Computer & Blue Light Glasses"
              subtitle="UV Protected · Greatest Tinted · Relaxed Filters"
              products={byCategory['computer'] ?? []}
              category="computer"
              loading={loading}
            />
            <ProductSection
              title="Contact Lenses"
              subtitle="Bella · Biomedics · Acuvue · Colored & Transparent"
              products={byCategory['contact'] ?? []}
              category="contact"
              loading={loading}
            />
            <BrandScroll />
            <FAQSection />
          </>
        )}
      </section>
    </main>
  )
}

export default function HomePage() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  )
}
