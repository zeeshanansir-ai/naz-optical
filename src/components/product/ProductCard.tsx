'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/lib/constants'
import { Product } from '@/types'

interface Props {
  product: Product
  onQuickView: (product: Product) => void
}

export function ProductCard({ product, onQuickView }: Props) {
  const categoryLabel = CATEGORIES.find(c => c.value === product.category)?.label ?? product.category

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
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="gap-2"
            onClick={() => onQuickView(product)}
          >
            <Eye className="w-4 h-4" />
            Quick View
          </Button>
        </div>
      </div>

      <div className="p-3 space-y-1">
        <Badge variant="outline" className="text-xs capitalize">{categoryLabel}</Badge>
        <h3 className="font-medium text-sm leading-snug line-clamp-2">{product.name}</h3>
        <p className="text-optical-gold font-bold text-sm">Rs. {product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  )
}
