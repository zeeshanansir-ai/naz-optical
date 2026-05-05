import { Glasses } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-optical-navy text-white/70 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Glasses className="w-5 h-5 text-optical-gold" />
          {SITE_NAME}
        </div>
        <p className="text-sm">© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
      </div>
    </footer>
  )
}
