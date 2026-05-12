'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/types'

const BADGE_STYLES: Record<string, string> = {
  new:     'bg-green-500 text-white',
  premium: 'bg-yellow-400 text-gray-900',
  sale:    'bg-red-600 text-white',
}

interface Props {
  product: Product
  onQuickView: (product: Product) => void
}

export function ProductCard({ product, onQuickView }: Props) {
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badge top-left */}
          {product.badge && (
            <span className={`absolute top-2 left-2 text-xs font-bold px-2.5 py-0.5 rounded capitalize ${BADGE_STYLES[product.badge] ?? 'bg-gray-200'}`}>
              {product.badge}
            </span>
          )}

          {/* Discount top-right */}
          {discount && (
            <span className="absolute top-2 right-2 text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded">
              -{discount}%
            </span>
          )}

          {/* 360° badge */}
          {product.images_360 && product.images_360.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-optical-navy text-white text-xs font-bold px-2 py-0.5 rounded z-10">360°</div>
          )}

          {/* Quick view hover overlay */}
          <div
            className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3"
            onClick={e => { e.preventDefault(); onQuickView(product) }}
          >
            <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Quick View
            </span>
          </div>
        </div>

        <div className="p-3 space-y-1">
          {product.brand && <p className="text-xs text-red-600 font-bold uppercase tracking-wide">{product.brand}</p>}
          <h3 className="font-medium text-sm leading-snug line-clamp-2 text-gray-800">{product.name}</h3>
          <div className="flex items-center gap-2 pt-0.5">
            <p className="text-optical-navy font-bold text-sm">Rs. {product.price.toLocaleString()}</p>
            {product.original_price && (
              <p className="text-gray-400 text-xs line-through">Rs. {product.original_price.toLocaleString()}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
