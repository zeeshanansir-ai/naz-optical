'use client'

import { useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'

interface Props {
  images: string[]  // ordered array of frame URLs
}

export function Viewer360({ images }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const frameIndex    = useRef(0)
  const dragging      = useRef(false)
  const lastX         = useRef(0)
  const [current, setCurrent] = useState(0)
  const [hint, setHint]       = useState(true)

  const total = images.length

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function onDown(e: MouseEvent | TouchEvent) {
      dragging.current = true
      lastX.current = 'touches' in e ? e.touches[0].clientX : e.clientX
      setHint(false)
    }
    function onMove(e: MouseEvent | TouchEvent) {
      if (!dragging.current) return
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX
      const delta = x - lastX.current
      if (Math.abs(delta) > 8) {
        const next = ((frameIndex.current + (delta > 0 ? -1 : 1)) % total + total) % total
        frameIndex.current = next
        setCurrent(next)
        lastX.current = x
      }
    }
    function onUp() { dragging.current = false }

    el.addEventListener('mousedown',  onDown)
    el.addEventListener('mousemove',  onMove)
    el.addEventListener('mouseup',    onUp)
    el.addEventListener('mouseleave', onUp)
    el.addEventListener('touchstart', onDown, { passive: true })
    el.addEventListener('touchmove',  onMove, { passive: true })
    el.addEventListener('touchend',   onUp)

    return () => {
      el.removeEventListener('mousedown',  onDown)
      el.removeEventListener('mousemove',  onMove)
      el.removeEventListener('mouseup',    onUp)
      el.removeEventListener('mouseleave', onUp)
      el.removeEventListener('touchstart', onDown)
      el.removeEventListener('touchmove',  onMove)
      el.removeEventListener('touchend',   onUp)
    }
  }, [total])

  // Auto-spin on mount
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i >= total) { clearInterval(timer); return }
      setCurrent(i++)
    }, 40)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
    >
      {/* Preload all frames */}
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-75 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          draggable={false}
        />
      ))}

      {/* Drag hint */}
      {hint && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            Drag to rotate
          </div>
        </div>
      )}

      {/* Frame counter */}
      <div className="absolute bottom-2 right-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full">
        {current + 1}/{total}
      </div>
    </div>
  )
}
