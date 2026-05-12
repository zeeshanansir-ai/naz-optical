'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { CATEGORIES, SITE_NAME } from '@/lib/constants'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent">
        <Menu className="w-5 h-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-left text-optical-navy">{SITE_NAME}</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 space-y-1">
          {CATEGORIES.map(c => (
            <Link
              key={c.value}
              href={`/?category=${c.value}`}
              onClick={() => setOpen(false)}
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-optical-gold/10 hover:text-optical-gold transition-colors"
            >
              {c.label}
            </Link>
          ))}
          <Link
            href="/reviews"
            onClick={() => setOpen(false)}
            className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-optical-gold/10 hover:text-optical-gold transition-colors"
          >
            Reviews
          </Link>
          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-optical-gold/10 hover:text-optical-gold transition-colors"
          >
            Blog
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
