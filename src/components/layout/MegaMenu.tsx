'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface MegaItem {
  category: string
  shop: string[]
  featured: string[]
  tiles: { label: string; bg: string }[]
}

const MEGA_ITEMS: Record<string, MegaItem> = {
  Eyeglasses: {
    category: 'men',
    shop:     ['Eyeglasses', 'Men Glasses', 'Women Glasses', 'Premium Glasses', 'Ray Ban Glasses', 'Hugo Boss Glasses'],
    featured: ['Tom Ford Glasses', 'Prada Glasses', 'Cartier Glasses', 'Gucci Glasses', 'David Beckham', 'Mont Blanc'],
    tiles:    [{ label: 'Transparent Glasses', bg: '#dbeafe' }, { label: 'Blue Light Glasses', bg: '#fef3c7' }, { label: 'Transition Glasses', bg: '#fce7f3' }],
  },
  Sunglasses: {
    category: 'sunglasses',
    shop:     ['Sunglasses', 'Men Sunglasses', 'Women Sunglasses', 'Premium Sunglasses', 'Rayban Wayfarer', 'Polarized'],
    featured: ['Louis Vuitton', 'Ray Ban', 'Tom Ford', 'Prada Sunglasses', 'Oliver Peoples', 'Gucci Sunglasses'],
    tiles:    [{ label: 'Premium Sunglasses', bg: '#fee2e2' }, { label: 'Gucci Sunglasses', bg: '#fef9c3' }, { label: 'Cartier Sunglasses', bg: '#f3f4f6' }],
  },
  Lenses: {
    category: 'computer',
    shop:     ['Blue Light Glasses', 'Computer Glasses', 'Anti Glare Glasses', 'Transition Glasses'],
    featured: ['Bifocal Glasses', 'Progressive Glasses'],
    tiles:    [{ label: 'Bifocal Glasses', bg: '#dbeafe' }, { label: 'Progressive Glasses', bg: '#dcfce7' }],
  },
  'Contact Lenses': {
    category: 'computer',
    shop:     ['Contact Lenses', 'Transparent Lenses', 'Colored Lenses'],
    featured: ['Daily Disposable', 'Silicone Hydrogel', 'Bella Lenses', 'Bausch and Lomb'],
    tiles:    [{ label: 'Bella Lenses', bg: '#fce7f3' }, { label: 'Biomedics Lenses', bg: '#dbeafe' }, { label: 'Acuvue Lenses', bg: '#f0fdf4' }],
  },
}

interface Props {
  active: string | null
  onEnter: (label: string) => void
  onLeave: () => void
}

export function MegaMenu({ active, onEnter, onLeave }: Props) {
  return (
    <nav className="hidden lg:flex items-center gap-0" onMouseLeave={onLeave}>
      {Object.entries(MEGA_ITEMS).map(([label, data]) => (
        <div key={label} className="relative" onMouseEnter={() => onEnter(label)}>
          <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            active === label ? 'border-red-600 text-red-600' : 'border-transparent text-gray-700 hover:text-red-600'
          }`}>
            {label} <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <AnimatePresence>
            {active === label && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-0 bg-white border border-gray-100 shadow-2xl z-50 rounded-b-xl"
                style={{ minWidth: 680 }}
              >
                <div className="grid grid-cols-3 gap-0">
                  {/* Shop column */}
                  <div className="p-6 border-r border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Shop</p>
                    <ul className="space-y-2">
                      {data.shop.map(item => (
                        <li key={item}>
                          <Link href={`/?category=${data.category}`} className="text-sm text-gray-800 font-medium hover:text-red-600 transition-colors">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Featured column */}
                  <div className="p-6 border-r border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Featured</p>
                    <ul className="space-y-2">
                      {data.featured.map(item => (
                        <li key={item}>
                          <Link href={`/?category=${data.category}`} className="text-sm text-gray-800 font-medium hover:text-red-600 transition-colors">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Image tiles column */}
                  <div className="p-4 flex flex-col gap-3">
                    {data.tiles.map(tile => (
                      <Link
                        key={tile.label}
                        href={`/?category=${data.category}`}
                        className="relative rounded-lg overflow-hidden h-20 flex items-end p-2 hover:opacity-90 transition-opacity"
                        style={{ background: tile.bg }}
                      >
                        <span className="text-xs font-bold text-gray-800 bg-white/80 px-2 py-0.5 rounded">{tile.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <Link href="/reviews" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors border-b-2 border-transparent">
        Reviews
      </Link>
    </nav>
  )
}
