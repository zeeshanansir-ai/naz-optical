'use client'

import { motion } from 'framer-motion'

const BRANDS = ['Ray Ban', 'Tom Ford', 'Prada', 'Gucci', 'Cartier', 'Oliver Peoples', 'Louis Vuitton', 'Hugo Boss']

export function BrandScroll() {
  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-lg font-bold text-center text-gray-800 mb-6">Shop by Brand</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex-shrink-0"
            >
              <div className="w-28 h-28 rounded-full bg-gray-100 hover:bg-optical-gold/10 transition-colors flex items-center justify-center cursor-pointer border border-gray-200 hover:border-optical-gold">
                <span className="text-xs font-semibold text-center text-gray-700 px-2 leading-tight">{brand}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
