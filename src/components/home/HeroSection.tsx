'use client'

import { motion } from 'framer-motion'

export function HeroSection({ onShopNow }: { onShopNow?: () => void }) {
  return (
    <section className="relative bg-[#2d4a1e] text-white overflow-hidden min-h-[360px] sm:min-h-[440px] flex items-center">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />

      {/* Decorative circle */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-optical-gold/20 blur-3xl" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-16 sm:py-20 w-full">
        <div className="max-w-xl space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Limited Offer
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Premium Glasses<br />
              <span className="text-optical-gold">Flat 15% Off</span>
            </h1>
            <p className="text-white/70 mt-2 text-base">discount at checkout on all orders</p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onShopNow}
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full text-sm transition-colors"
          >
            Shop Now
          </motion.button>
        </div>
      </div>

      {/* Dots pagination */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        <span className="w-2 h-2 rounded-full bg-white" />
        <span className="w-2 h-2 rounded-full bg-white/40" />
      </div>
    </section>
  )
}
