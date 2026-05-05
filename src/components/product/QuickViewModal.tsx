'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { WhatsAppButton } from './WhatsAppButton'
import { Viewer360 } from './Viewer360'
import { VirtualTryOn } from './VirtualTryOn'
import { CATEGORIES } from '@/lib/constants'
import { Product } from '@/types'

interface Props {
  product: Product | null
  open: boolean
  onClose: () => void
}

export function QuickViewModal({ product, open, onClose }: Props) {
  const [view, setView] = useState<'image' | '360'>('image')

  if (!product) return null

  const categoryLabel = CATEGORIES.find(c => c.value === product.category)?.label ?? product.category
  const has360 = product.images_360 && product.images_360.length > 1

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) { onClose(); setView('image') } }}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-[3fr_2fr]">
          {/* Left — image or 360 viewer */}
          <div className="relative bg-gray-50">
            {has360 && (
              <div className="absolute top-2 left-2 z-10 flex gap-1">
                <button
                  onClick={() => setView('image')}
                  className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${view === 'image' ? 'bg-optical-navy text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}`}
                >
                  Photo
                </button>
                <button
                  onClick={() => setView('360')}
                  className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${view === '360' ? 'bg-optical-navy text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}`}
                >
                  360°
                </button>
              </div>
            )}

            {view === '360' && has360 ? (
              <Viewer360 images={product.images_360!} />
            ) : (
              <div className="relative aspect-square">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            )}
          </div>

          {/* Right — details */}
          <div className="p-6 flex flex-col gap-4">
            <DialogHeader>
              <Badge variant="secondary" className="w-fit capitalize">{categoryLabel}</Badge>
              <DialogTitle className="text-xl font-semibold leading-snug">{product.name}</DialogTitle>
            </DialogHeader>

            <div>
              <p className="text-2xl font-bold text-optical-navy">Rs. {product.price.toLocaleString()}</p>
              {product.original_price && (
                <p className="text-sm text-gray-400 line-through">Rs. {product.original_price.toLocaleString()}</p>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Crafted with precision. Ask us about availability, lens options, and custom fitting.
            </p>

            <div className="flex flex-col gap-2 mt-auto">
              {product.model_3d_url && (
                <VirtualTryOn modelUrl={product.model_3d_url} productName={product.name} />
              )}
              <WhatsAppButton product={product} className="w-full" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
