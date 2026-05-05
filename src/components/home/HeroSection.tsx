'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants'

export function HeroSection({ onShopNow }: { onShopNow?: () => void }) {
  return (
    <section className="relative bg-optical-navy text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#c9a84c_0%,_transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 flex flex-col items-center text-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-optical-gold text-sm font-semibold uppercase tracking-widest"
        >
          {SITE_NAME}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-6xl font-bold leading-tight max-w-3xl"
        >
          {SITE_TAGLINE}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/70 text-lg max-w-xl"
        >
          Discover our curated collection of frames — from classic elegance to modern bold. Every pair crafted for clarity, comfort, and style.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 flex-wrap justify-center"
        >
          <Button
            size="lg"
            className="bg-optical-gold hover:bg-optical-gold/90 text-optical-navy font-semibold"
            onClick={onShopNow}
          >
            Shop Collection
          </Button>
          <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
