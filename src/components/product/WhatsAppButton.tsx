'use client'

import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { Product } from '@/types'

export function WhatsAppButton({ product, className }: { product: Product; className?: string }) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(product.whatsapp_msg)}`
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-green-500 hover:bg-green-600 text-white transition-colors ${className ?? ''}`}
    >
      <MessageCircle className="w-4 h-4" />
      Inquire on WhatsApp
    </a>
  )
}
