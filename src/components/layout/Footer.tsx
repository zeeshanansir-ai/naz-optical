import Link from 'next/link'
import { Glasses, MessageCircle, MapPin } from 'lucide-react'
import { SITE_NAME, WHATSAPP_NUMBER, WHATSAPP_NUMBER2, ESTABLISHED, SOCIAL, LOCATIONS } from '@/lib/constants'

const LINKS = {
  'Eyeglasses': ['Men Glasses', 'Women Glasses', 'Kids Glasses', 'Premium Glasses', 'Computer Glasses'],
  'Sunglasses': ['Men Sunglasses', 'Women Sunglasses', 'Polarized', 'Premium Sunglasses'],
  'Help':       ['About Us', 'Reviews', 'Exchange Policy', 'Track Order'],
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
            <p className="text-xs text-white/50">Est. {ESTABLISHED}</p>
            <p className="text-sm leading-relaxed">Luxury eyewear &amp; precision eye care in Lahore &amp; Shakargarh since {ESTABLISHED}. Designer frames, lenses &amp; contact lenses.</p>

            {/* Locations */}
            <a href={SOCIAL.maps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {LOCATIONS.join(' · ')}
            </a>

            {/* WhatsApp numbers */}
            <div className="space-y-1 text-xs">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                0300-4686170
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER2}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                0327-1830170
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 pt-1">
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-green-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
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
          <p>© {new Date().getFullYear()} {SITE_NAME} (Est. {ESTABLISHED}). All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
