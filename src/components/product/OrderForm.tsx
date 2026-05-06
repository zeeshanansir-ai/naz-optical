'use client'

import { useState } from 'react'
import { X, MessageCircle } from 'lucide-react'
import { Product } from '@/types'
import { WHATSAPP_NUMBER, WHATSAPP_NUMBER2 } from '@/lib/constants'

interface Props {
  product: Product
  open: boolean
  onClose: () => void
}

export function OrderForm({ product, open, onClose }: Props) {
  const [name,    setName]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')

  if (!open) return null

  function buildMessage(number: string) {
    const lines = [
      `🛍️ *New Order Inquiry — Naz Optical Service*`,
      ``,
      `*Product:* ${product.name}`,
      product.brand ? `*Brand:* ${product.brand}` : null,
      `*Price:* Rs. ${product.price.toLocaleString()}`,
      ``,
      `*Customer Details:*`,
      `👤 Name: ${name}`,
      `📞 Phone: ${phone}`,
      email ? `📧 Email: ${email}` : null,
      message ? `💬 Message: ${message}` : null,
    ].filter(Boolean).join('\n')

    const url = `https://wa.me/${number}?text=${encodeURIComponent(lines)}`
    window.open(url, '_blank')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Place Inquiry</h2>
            <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{product.name}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Product summary */}
        <div className="mx-6 mt-4 flex items-center gap-3 bg-gray-50 rounded-xl p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image_url} alt={product.name} className="w-14 h-14 object-contain rounded-lg bg-white border border-gray-100" />
          <div>
            <p className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</p>
            {product.brand && <p className="text-xs text-optical-gold font-semibold">{product.brand}</p>}
            <p className="text-sm font-bold text-optical-navy mt-0.5">Rs. {product.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Full Name *</label>
            <input
              type="text"
              placeholder="e.g. Ahmed Khan"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-optical-navy transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Phone Number *</label>
            <input
              type="tel"
              placeholder="e.g. 0300-1234567"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-optical-navy transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Email <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              type="email"
              placeholder="e.g. ahmed@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-optical-navy transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Message <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              placeholder="e.g. I need prescription lenses, my power is -2.5"
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-optical-navy transition-colors resize-none"
            />
          </div>
        </div>

        {/* Submit buttons */}
        <div className="px-6 pb-5 space-y-2">
          <p className="text-xs text-gray-400 text-center mb-3">Choose which number to send your inquiry to:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              disabled={!name || !phone}
              onClick={() => buildMessage(WHATSAPP_NUMBER)}
              className="flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              0300-4686170
            </button>
            <button
              disabled={!name || !phone}
              onClick={() => buildMessage(WHATSAPP_NUMBER2)}
              className="flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              0327-1830170
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-1">Name and phone are required</p>
        </div>
      </div>
    </div>
  )
}
