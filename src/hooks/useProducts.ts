'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Category, Product } from '@/types'
import { useDebounce } from './useDebounce'

export function useProducts() {
  const [all, setAll]           = useState<Product[]>([])
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState<Category | 'all'>('all')
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
    return all.filter(p => {
      const matchSearch   = !q || p.name.toLowerCase().includes(q)
      const matchCategory = category === 'all' || p.category === category
      return matchSearch && matchCategory
    })
  }, [all, debouncedSearch, category])

  return { products: filtered, loading, search, setSearch, category, setCategory }
}
