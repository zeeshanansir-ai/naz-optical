'use client'

import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { WhatsAppButton } from './WhatsAppButton'
import { CATEGORIES } from '@/lib/constants'
import { Product } from '@/types'

interface Props {
  product: Product | null
  open: boolean
  onClose: () => void
}

export function QuickViewModal({ product, open, onClose }: Props) {
  if (!product) return null

  const categoryLabel = CATEGORIES.find(c => c.value === product.category)?.label ?? product.category

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative aspect-square bg-gray-50">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <div className="p-6 flex flex-col gap-4">
            <DialogHeader>
              <Badge variant="secondary" className="w-fit capitalize">{categoryLabel}</Badge>
              <DialogTitle className="text-xl font-semibold leading-snug">{product.name}</DialogTitle>
            </DialogHeader>
            <p className="text-2xl font-bold text-optical-gold">Rs. {product.price.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">
              Crafted with precision. Ask us about availability, lens options, and custom fitting.
            </p>
            <WhatsAppButton product={product} className="mt-auto w-full" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
