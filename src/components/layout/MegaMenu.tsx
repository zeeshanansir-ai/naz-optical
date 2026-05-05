'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const MEGA_ITEMS = {
  Men:        { items: ['Classic Frames', 'Business Frames', 'Sports Frames', 'Reading Glasses'], category: 'men'        },
  Women:      { items: ['Designer Frames', 'Cat-Eye', 'Round Frames', 'Oversized'],              category: 'women'      },
  Kids:       { items: ['Age 3-8', 'Age 9-14', 'Sports Kids', 'Flexible Frames'],                category: 'kids'       },
  Sunglasses: { items: ['UV400 Protection', 'Polarised', 'Wrap Around', 'Aviator'],              category: 'sunglasses' },
  Computer:   { items: ['Blue Light Block', 'Anti-Glare', 'Full-Frame', 'Half-Frame'],           category: 'computer'   },
}

interface Props {
  active: string | null
  onEnter: (label: string) => void
  onLeave: () => void
}

export function MegaMenu({ active, onEnter, onLeave }: Props) {
  return (
    <nav className="hidden lg:flex items-center gap-1" onMouseLeave={onLeave}>
      {Object.entries(MEGA_ITEMS).map(([label, data]) => (
        <div key={label} className="relative" onMouseEnter={() => onEnter(label)}>
          <button className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            active === label ? 'bg-optical-gold/10 text-optical-gold' : 'hover:text-optical-gold'
          }`}>
            {label}
          </button>

          <AnimatePresence>
            {active === label && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-100 rounded-xl shadow-xl p-4 z-50"
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {label}
                </p>
                <ul className="space-y-1">
                  {data.items.map(item => (
                    <li key={item}>
                      <Link
                        href={`/?category=${data.category}`}
                        className="block px-2 py-1.5 text-sm rounded-md hover:bg-optical-gold/10 hover:text-optical-gold transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t">
                  <Link
                    href={`/?category=${data.category}`}
                    className="text-xs font-medium text-optical-gold hover:underline"
                  >
                    View all {label} →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  )
}
