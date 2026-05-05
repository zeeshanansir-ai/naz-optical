'use client'

import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { CATEGORIES } from '@/lib/constants'
import { Category } from '@/types'

interface Props {
  search: string
  onSearch: (v: string) => void
  category: Category | 'all'
  onCategory: (v: Category | 'all') => void
}

export function SearchBar({ search, onSearch, category, onCategory }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search glasses..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="pl-9 pr-9"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => onSearch('')}
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
      <Select value={category} onValueChange={v => onCategory(v as Category | 'all')}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {CATEGORIES.map(c => (
            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
