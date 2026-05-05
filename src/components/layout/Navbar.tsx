'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Glasses, Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MegaMenu } from './MegaMenu'
import { MobileNav } from './MobileNav'
import { SITE_NAME } from '@/lib/constants'

export function Navbar() {
  const [activeMega, setActiveMega]   = useState<string | null>(null)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-optical-navy flex-shrink-0">
          <Glasses className="w-6 h-6 text-red-600" />
          <span className="text-sm sm:text-base leading-tight">{SITE_NAME}</span>
        </Link>

        {/* Mega Menu — desktop */}
        <MegaMenu
          active={activeMega}
          onEnter={setActiveMega}
          onLeave={() => setActiveMega(null)}
        />

        {/* Right: search */}
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search glasses..."
                className="border border-gray-200 rounded-full px-4 py-1.5 text-sm w-48 focus:outline-none focus:border-red-400"
              />
              <button type="button" onClick={() => setSearchOpen(false)}>
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 hover:text-red-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
