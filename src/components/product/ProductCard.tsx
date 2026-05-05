'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye, Camera } from 'lucide-react'
import { Product } from '@/types'

const BADGE_STYLES: Record<string, string> = {
  new:     'bg-green-500 text-white',
  premium: 'bg-optical-navy text-white',
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
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full capitalize ${BADGE_STYLES[product.badge] ?? 'bg-gray-200'}`}>
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-2 right-2 text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}

        {/* Try On badge */}
        {product.model_3d_url && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-optical-navy text-white text-xs font-semibold px-2 py-0.5 rounded-full z-10">
            <Camera className="w-3 h-3" /> Try On
          </div>
        )}

        {/* 360° badge */}
        {product.images_360 && product.images_360.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-white/90 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full z-10">360°</div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            className="flex items-center gap-1.5 bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full hover:bg-optical-gold hover:text-white transition-colors"
            onClick={() => onQuickView(product)}
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      <div className="p-3 space-y-1">
        {product.brand && <p className="text-xs text-optical-gold font-semibold uppercase tracking-wide">{product.brand}</p>}
        <h3 className="font-medium text-sm leading-snug line-clamp-2 text-gray-800">{product.name}</h3>
        <div className="flex items-center gap-2">
          <p className="text-optical-navy font-bold text-sm">Rs. {product.price.toLocaleString()}</p>
          {product.original_price && (
            <p className="text-gray-400 text-xs line-through">Rs. {product.original_price.toLocaleString()}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
