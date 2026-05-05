'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Glasses } from 'lucide-react'
import { MegaMenu } from './MegaMenu'
import { MobileNav } from './MobileNav'
import { SITE_NAME } from '@/lib/constants'

export function Navbar() {
  const [activeMega, setActiveMega] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-optical-navy">
          <Glasses className="w-6 h-6 text-optical-gold" />
          <span className="text-sm sm:text-base leading-tight">{SITE_NAME}</span>
        </Link>

        {/* Mega Menu — desktop */}
        <MegaMenu
          active={activeMega}
          onEnter={setActiveMega}
          onLeave={() => setActiveMega(null)}
        />

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
