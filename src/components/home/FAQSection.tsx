'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  id:       string
  question: string
  answer:   string
}

export function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/faqs')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setFaqs(data) })
  }, [])

  if (faqs.length === 0) return null

  return (
    <section className="max-w-3xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ</h2>
      <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        {faqs.map(faq => (
          <div key={faq.id}>
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(open === faq.id ? null : faq.id)}
            >
              {faq.question}
              <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-4 transition-transform ${open === faq.id ? 'rotate-180' : ''}`} />
            </button>
            {open === faq.id && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
