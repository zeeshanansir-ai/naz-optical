'use client'

import { SortOption, Category } from '@/types'
import { CATEGORIES } from '@/lib/constants'

interface Props {
  sort: SortOption
  onSort: (v: SortOption) => void
  category: Category | 'all'
  onCategory: (v: Category | 'all') => void
  total: number
}

export function FilterBar({ sort, onSort, category, onCategory, total }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-gray-100">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategory('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
            category === 'all' ? 'bg-optical-navy text-white border-optical-navy' : 'border-gray-200 text-gray-600 hover:border-optical-navy'
          }`}
        >
          All
        </button>
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            onClick={() => onCategory(c.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              category === c.value ? 'bg-optical-navy text-white border-optical-navy' : 'border-gray-200 text-gray-600 hover:border-optical-navy'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Right: count + sort */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400">{total} products</span>
        <select
          value={sort}
          onChange={e => onSort(e.target.value as SortOption)}
          className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-optical-navy"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  )
}
