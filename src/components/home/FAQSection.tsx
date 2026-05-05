'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  { q: 'How to buy online glasses in Pakistan?',    a: 'Browse our collection, click "Inquire on WhatsApp" on any product, and our team will guide you through the order. We deliver across Pakistan in 1–4 days.' },
  { q: 'What glasses frames are trending?',          a: 'Currently trending: oversized acetate frames, classic aviators, round metal frames, and transparent frames. Check our New Arrivals section.' },
  { q: 'What is the most popular frame for glasses?', a: 'Wayfarer and aviator styles remain all-time classics. For women, cat-eye frames are highly popular. For men, rectangular and square frames are trending.' },
  { q: 'Do you offer prescription lenses?',          a: 'Yes! Contact us on WhatsApp with your prescription and we will fit precision lenses into any frame.' },
  { q: 'What is your exchange and return policy?',   a: 'We offer 7-day exchange or return on all products. Product must be unused and in original condition.' },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="max-w-3xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ</h2>
      <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        {FAQS.map((faq, i) => (
          <div key={i}>
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {faq.q}
              <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-4 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
