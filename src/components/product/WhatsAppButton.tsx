'use client'

import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_NUMBER2 } from '@/lib/constants'
import { Product } from '@/types'

export function WhatsAppButton({ product, className }: { product: Product; className?: string }) {
  const msg = encodeURIComponent(product.whatsapp_msg || `Hi, I'm interested in ${product.name}`)
  return (
    <div className={`flex gap-2 ${className ?? ''}`}>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-green-500 hover:bg-green-600 text-white transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        0300-4686170
      </a>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER2}?text=${msg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-green-500 hover:bg-green-600 text-white transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        0327-1830170
      </a>
    </div>
  )
}
