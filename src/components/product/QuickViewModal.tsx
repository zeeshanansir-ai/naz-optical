'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { WhatsAppButton } from './WhatsAppButton'
import { Viewer360 } from './Viewer360'
import { VirtualTryOn } from './VirtualTryOn'
import { LiveViewers } from './LiveViewers'
import { CATEGORIES } from '@/lib/constants'
import { Product } from '@/types'

interface Props {
  product: Product | null
  open: boolean
  onClose: () => void
}

export function QuickViewModal({ product, open, onClose }: Props) {
  const [view, setView] = useState<'image' | '360'>('image')

  if (!open || !product) return null

  const categoryLabel = CATEGORIES.find(c => c.value === product.category)?.label ?? product.category
  const has360 = product.images_360 && product.images_360.length > 1
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Left — image */}
        <div className="relative bg-gray-50 md:w-1/2 shrink-0">
          {/* Tab switcher */}
          {has360 && (
            <div className="absolute top-3 left-3 z-10 flex gap-1.5">
              <button
                onClick={() => setView('image')}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold shadow transition-colors ${view === 'image' ? 'bg-optical-navy text-white' : 'bg-white text-gray-600'}`}
              >
                Photo
              </button>
              <button
                onClick={() => setView('360')}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold shadow transition-colors ${view === '360' ? 'bg-optical-navy text-white' : 'bg-white text-gray-600'}`}
              >
                360°
              </button>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 shadow transition-colors"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>

          {view === '360' && has360 ? (
            <div className="h-72 md:h-full md:min-h-[480px]">
              <Viewer360 images={product.images_360!} />
            </div>
          ) : (
            <div className="relative h-72 md:h-full md:min-h-[480px]">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.badge && (
                <span className={`absolute top-10 left-3 text-xs font-bold px-2 py-0.5 rounded-full capitalize ${
                  product.badge === 'new' ? 'bg-green-500 text-white' :
                  product.badge === 'premium' ? 'bg-optical-navy text-white' : 'bg-red-600 text-white'
                }`}>{product.badge}</span>
              )}
              {discount && (
                <span className="absolute top-10 right-3 text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded-full">-{discount}%</span>
              )}
            </div>
          )}
        </div>

        {/* Right — details */}
        <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{categoryLabel}</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1 leading-tight">{product.name}</h2>
            {product.brand && <p className="text-sm text-optical-gold font-semibold uppercase tracking-wide mt-0.5">{product.brand}</p>}
          </div>

          <div className="flex items-baseline gap-3">
            <p className="text-3xl font-bold text-optical-navy">Rs. {product.price.toLocaleString()}</p>
            {product.original_price && (
              <p className="text-base text-gray-400 line-through">Rs. {product.original_price.toLocaleString()}</p>
            )}
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            Premium quality eyewear from Naz Optical Service — trusted since 1965. Ask us about availability, prescription lenses, and custom fitting.
          </p>

          {has360 && (
            <div className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2 flex items-center gap-2">
              <span>🔄</span>
              <span>Tap <strong>360°</strong> above to rotate and inspect this frame from every angle</span>
            </div>
          )}

          <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-gray-100">
            <LiveViewers productId={product.id} />
            {product.model_3d_url ? (
              <VirtualTryOn modelUrl={product.model_3d_url} productName={product.name} />
            ) : (
              <div className="flex items-center gap-2 border border-red-200 bg-red-50 text-red-700 text-xs font-semibold px-4 py-2.5 rounded-md">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                Virtual Try On — visit our store or WhatsApp us to try this frame
              </div>
            )}
            <WhatsAppButton product={product} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
