'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Product } from '@/types'
import { OrderForm } from './OrderForm'

export function WhatsAppButton({ product, className }: { product: Product; className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold bg-green-500 hover:bg-green-600 text-white transition-colors ${className ?? ''}`}
      >
        <MessageCircle className="w-4 h-4" />
        Inquire on WhatsApp
      </button>

      <OrderForm product={product} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
