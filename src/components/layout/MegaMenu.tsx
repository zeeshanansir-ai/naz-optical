'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface NavItem { label: string; href: string }
interface MegaItem {
  href:     string
  shop:     NavItem[]
  featured: NavItem[]
  tiles:    { label: string; bg: string; href: string }[]
}

const MEGA_ITEMS: Record<string, MegaItem> = {
  Eyeglasses: {
    href: '/',
    shop: [
      { label: 'All Eyeglasses',   href: '/'                     },
      { label: 'Men Glasses',      href: '/?category=men'        },
      { label: 'Women Glasses',    href: '/?category=women'      },
      { label: 'Kids Glasses',     href: '/?category=kids'       },
      { label: 'Computer Glasses', href: '/?category=computer'   },
      { label: 'Contact Lenses',   href: '/?category=contact'    },
    ],
    featured: [
      { label: 'Ray Ban',    href: '/?q=Ray+Ban'    },
      { label: 'Tom Ford',   href: '/?q=Tom+Ford'   },
      { label: 'Prada',      href: '/?q=Prada'      },
      { label: 'Cartier',    href: '/?q=Cartier'    },
      { label: 'Gucci',      href: '/?q=Gucci'      },
      { label: 'Hugo Boss',  href: '/?q=Hugo+Boss'  },
    ],
    tiles: [
      { label: 'Men Glasses',      bg: '#dbeafe', href: '/?category=men'      },
      { label: 'Blue Light Glasses', bg: '#fef3c7', href: '/?category=computer' },
      { label: 'Kids Glasses',     bg: '#fce7f3', href: '/?category=kids'     },
    ],
  },
  Sunglasses: {
    href: '/?category=sunglasses',
    shop: [
      { label: 'All Sunglasses',     href: '/?category=sunglasses' },
      { label: 'Men Sunglasses',     href: '/?category=sunglasses' },
      { label: 'Women Sunglasses',   href: '/?category=sunglasses' },
      { label: 'Polarized',          href: '/?category=sunglasses' },
      { label: 'Premium Sunglasses', href: '/?category=sunglasses' },
      { label: 'Sports Sunglasses',  href: '/?category=sunglasses' },
    ],
    featured: [
      { label: 'Ray Ban',        href: '/?category=sunglasses&q=Ray+Ban'       },
      { label: 'Louis Vuitton',  href: '/?category=sunglasses&q=Louis+Vuitton' },
      { label: 'Tom Ford',       href: '/?category=sunglasses&q=Tom+Ford'      },
      { label: 'Prada',          href: '/?category=sunglasses&q=Prada'         },
      { label: 'Oliver Peoples', href: '/?category=sunglasses&q=Oliver+Peoples'},
      { label: 'Gucci',          href: '/?category=sunglasses&q=Gucci'         },
    ],
    tiles: [
      { label: 'Ray Ban Sunglasses',    bg: '#fee2e2', href: '/?category=sunglasses&q=Ray+Ban' },
      { label: 'Gucci Sunglasses',      bg: '#fef9c3', href: '/?category=sunglasses&q=Gucci'   },
      { label: 'Cartier Sunglasses',    bg: '#f3f4f6', href: '/?category=sunglasses&q=Cartier' },
    ],
  },
  Lenses: {
    href: '/?category=computer',
    shop: [
      { label: 'Computer Glasses',   href: '/?category=computer' },
      { label: 'Blue Light Glasses', href: '/?category=computer' },
      { label: 'Anti Glare Glasses', href: '/?category=computer' },
      { label: 'Progressive Lenses', href: '/?category=computer' },
    ],
    featured: [
      { label: 'Bifocal Glasses',     href: '/?category=computer&q=Bifocal'     },
      { label: 'Progressive Glasses', href: '/?category=computer&q=Progressive' },
    ],
    tiles: [
      { label: 'Bifocal Glasses',     bg: '#dbeafe', href: '/?category=computer&q=Bifocal'     },
      { label: 'Progressive Glasses', bg: '#dcfce7', href: '/?category=computer&q=Progressive' },
      { label: 'Anti Glare',          bg: '#fef3c7', href: '/?category=computer&q=Anti'        },
    ],
  },
  'Contact Lenses': {
    href: '/?category=contact',
    shop: [
      { label: 'All Contact Lenses', href: '/?category=contact'          },
      { label: 'Colored Lenses',     href: '/?category=contact&q=Colored' },
      { label: 'Bella Lenses',       href: '/?category=contact&q=Bella'   },
      { label: 'Daily Disposable',   href: '/?category=contact&q=Daily'   },
    ],
    featured: [
      { label: 'Bella',        href: '/?category=contact&q=Bella'   },
      { label: 'Bausch & Lomb', href: '/?category=contact&q=Bausch' },
      { label: 'Acuvue',       href: '/?category=contact&q=Acuvue'  },
      { label: 'Biomedics',    href: '/?category=contact&q=Biomedics'},
    ],
    tiles: [
      { label: 'Bella Lenses',     bg: '#fce7f3', href: '/?category=contact&q=Bella'    },
      { label: 'Acuvue Lenses',    bg: '#f0fdf4', href: '/?category=contact&q=Acuvue'   },
      { label: 'Colored Lenses',   bg: '#dbeafe', href: '/?category=contact&q=Colored'  },
    ],
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
          <Link
            href={data.href}
            className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              active === label ? 'border-red-600 text-red-600' : 'border-transparent text-gray-700 hover:text-red-600'
            }`}
          >
            {label} <ChevronDown className="w-3.5 h-3.5" />
          </Link>

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
                        <li key={item.label}>
                          <Link href={item.href} className="text-sm text-gray-800 font-medium hover:text-red-600 transition-colors">
                            {item.label}
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
                        <li key={item.label}>
                          <Link href={item.href} className="text-sm text-gray-800 font-medium hover:text-red-600 transition-colors">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Tiles column */}
                  <div className="p-4 flex flex-col gap-3">
                    {data.tiles.map(tile => (
                      <Link
                        key={tile.label}
                        href={tile.href}
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
