'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Glasses } from 'lucide-react'

const CATEGORIES = [
  { label: 'Eyeglasses',       category: 'men',        bg: '#e8f4ea' },
  { label: 'Women Glasses',    category: 'women',      bg: '#fce8f0' },
  { label: 'Kids Glasses',     category: 'kids',       bg: '#e8f0fc' },
  { label: 'Sunglasses',       category: 'sunglasses', bg: '#f5e8c8' },
  { label: 'Computer Glasses', category: 'computer',   bg: '#e8f8f5' },
]

export function CategoryCircles() {
  return (
    <section className="bg-[#faf9f4] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Shop By Category</h2>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                href={`/?category=${cat.category}`}
                className="flex flex-col items-center gap-3 group"
              >
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm"
                  style={{ background: cat.bg }}
                >
                  <Glasses className="w-10 h-10 text-optical-navy opacity-70" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center max-w-[90px] leading-tight">
                  {cat.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
