'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDES = [
  {
    bg: '#2d4a1e',
    badge: 'Limited Offer',
    badgeColor: 'bg-red-600',
    title: 'Premium Glasses',
    highlight: 'Flat 15% Off',
    sub: 'discount at checkout on all orders',
    btn: 'Shop Now',
    circle: 'bg-optical-gold/20',
  },
  {
    bg: '#1a2f4a',
    badge: 'New Arrivals',
    badgeColor: 'bg-optical-gold',
    title: 'Designer Frames',
    highlight: 'Est. 1965',
    sub: 'Dior · Ray Ban · Gucci · Tom Ford · Cartier',
    btn: 'Explore Collection',
    circle: 'bg-red-600/20',
  },
]

export function HeroSection({ onShopNow }: { onShopNow?: () => void }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  const slide = SLIDES[index]

  return (
    <section
      className="relative text-white overflow-hidden min-h-[360px] sm:min-h-[440px] flex items-center transition-colors duration-700"
      style={{ backgroundColor: slide.bg }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
      <div className={`absolute right-10 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full ${slide.circle} blur-3xl`} />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-16 sm:py-20 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl space-y-5"
          >
            <div>
              <span className={`inline-block ${slide.badgeColor} text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3`}>
                {slide.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                {slide.title}<br />
                <span className="text-optical-gold">{slide.highlight}</span>
              </h1>
              <p className="text-white/70 mt-2 text-base">{slide.sub}</p>
            </div>

            <button
              onClick={onShopNow}
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full text-sm transition-colors"
            >
              {slide.btn}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  )
}
