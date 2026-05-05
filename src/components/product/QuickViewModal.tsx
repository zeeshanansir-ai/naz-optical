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
      <DialogContent className="max-w-5xl w-full p-0 overflow-hidden">
        <div className="flex flex-col sm:flex-row min-h-[500px]">

          {/* Left — image or 360 viewer (takes majority of space) */}
          <div className="relative bg-gray-50 sm:w-[60%] shrink-0">
            {has360 && (
              <div className="absolute top-3 left-3 z-10 flex gap-1.5">
                <button
                  onClick={() => setView('image')}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors shadow ${view === 'image' ? 'bg-optical-navy text-white' : 'bg-white text-gray-600 hover:bg-white'}`}
                >
                  Photo
                </button>
                <button
                  onClick={() => setView('360')}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors shadow ${view === '360' ? 'bg-optical-navy text-white' : 'bg-white text-gray-600 hover:bg-white'}`}
                >
                  360°
                </button>
              </div>
            )}

            {view === '360' && has360 ? (
              <div className="h-full min-h-[360px] sm:min-h-[500px]">
                <Viewer360 images={product.images_360!} />
              </div>
            ) : (
              <div className="relative aspect-square sm:aspect-auto sm:h-full min-h-[360px] sm:min-h-[500px]">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 100vw, 60vw"
                />
              </div>
            )}
          </div>

          {/* Right — details */}
          <div className="flex-1 p-6 flex flex-col gap-4 border-l border-gray-100 overflow-y-auto">
            <DialogHeader>
              <Badge variant="secondary" className="w-fit capitalize">{categoryLabel}</Badge>
              <DialogTitle className="text-2xl font-bold leading-snug mt-1">{product.name}</DialogTitle>
              {product.brand && <p className="text-sm text-optical-gold font-semibold uppercase tracking-wide">{product.brand}</p>}
            </DialogHeader>

            <div>
              <p className="text-3xl font-bold text-optical-navy">Rs. {product.price.toLocaleString()}</p>
              {product.original_price && (
                <p className="text-sm text-gray-400 line-through mt-0.5">Rs. {product.original_price.toLocaleString()}</p>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium quality eyewear from Naz Optical Service — trusted since 1965. Ask us about availability, prescription lenses, and custom fitting.
            </p>

            {has360 && (
              <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
                🔄 Switch to <strong>360°</strong> view to rotate and inspect this frame from every angle
              </p>
            )}

            <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-gray-100">
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
