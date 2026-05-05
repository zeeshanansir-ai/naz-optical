'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  { q: 'Where is Naz Optical Service located?',         a: 'We have locations in Lahore (Township) and Shakargarh. You can find us on Google Maps or contact us on WhatsApp at 0300-4686170 or 0327-1830170 for directions.' },
  { q: 'Do you offer eye tests and optometry services?', a: 'Yes! We provide professional eye care and optometry consultations at our store. Our experienced optometrists will test your vision and recommend the right prescription lenses for you.' },
  { q: 'What brands do you carry?',                    a: 'We stock premium designer brands including Dior, Ray Ban, Tom Ford, Prada, Gucci, Cartier, Oliver Peoples, Louis Vuitton, Hugo Boss, and many more. We also carry Bella contact lenses, Bausch & Lomb, Biomedics, and Acuvue.' },
  { q: 'Do you offer prescription lenses?',             a: 'Yes! We specialise in high-clarity, prescription-ready lenses including blue-blocking lenses, bifocals, progressive, anti-glare, and transition lenses. Contact us on WhatsApp with your prescription.' },
  { q: 'Do you sell contact lenses?',                   a: 'Yes, we stock Bella color contact lenses and other brands including powered options. Available in both transparent and colored varieties. Contact us on WhatsApp for availability.' },
  { q: 'How can I order online?',                       a: 'Browse our collection, click "Inquire on WhatsApp" on any product, and our team will assist you. We deliver across Pakistan. You can also follow us on Instagram @nazopticalservice or TikTok @nazopticalservice.pk.' },
  { q: 'What is your exchange and return policy?',      a: 'We offer exchange or return on products. Please contact us on WhatsApp within 7 days of receiving your order. Items must be unused and in original condition.' },
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
