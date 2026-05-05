'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Category, Product, SortOption } from '@/types'
import { useDebounce } from './useDebounce'

export function useProducts(initialCategory?: Category | 'all') {
  const [all, setAll]           = useState<Product[]>([])
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState<Category | 'all'>(initialCategory ?? 'all')
  const [sort, setSort]         = useState<SortOption>('newest')
  const [loading, setLoading]   = useState(true)

  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setAll((data as Product[]) ?? [])
        setLoading(false)
      })
  }, [])

  const filtered = useMemo(() => {
    const q = debouncedSearch.toLowerCase()
    let results = all.filter(p => {
      const matchSearch   = !q || p.name.toLowerCase().includes(q) || (p.brand ?? '').toLowerCase().includes(q)
      const matchCategory = category === 'all' || p.category === category
      return matchSearch && matchCategory
    })
    if (sort === 'price_asc')  results = [...results].sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') results = [...results].sort((a, b) => b.price - a.price)
    return results
  }, [all, debouncedSearch, category, sort])

  // Group by category for homepage sections
  const byCategory = useMemo(() => {
    const map: Partial<Record<Category, Product[]>> = {}
    for (const p of all) {
      if (!map[p.category]) map[p.category] = []
      map[p.category]!.push(p)
    }
    return map
  }, [all])

  return { products: filtered, byCategory, loading, search, setSearch, category, setCategory, sort, setSort }
}
