import Link from 'next/link'
import { Glasses, MessageCircle } from 'lucide-react'
import { SITE_NAME, WHATSAPP_NUMBER } from '@/lib/constants'

const LINKS = {
  'Eyeglasses': ['Men Glasses', 'Women Glasses', 'Kids Glasses', 'Premium Glasses', 'Computer Glasses'],
  'Sunglasses': ['Men Sunglasses', 'Women Sunglasses', 'Polarized', 'Premium Sunglasses'],
  'Contact':    ['About Us', 'Reviews', 'Exchange Policy', 'Track Order'],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white/70 mt-0">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Glasses className="w-5 h-5 text-red-500" />
              {SITE_NAME}
            </div>
            <p className="text-sm leading-relaxed">Premium eyewear for every face. Quality frames, precision lenses, delivered to your door across Pakistan.</p>
            <div className="flex gap-3 pt-1">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><MessageCircle className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <p className="text-white font-semibold text-sm mb-3">{heading}</p>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item}>
                    <Link href="/" className="text-sm hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
