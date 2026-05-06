'use client'

import { useState, useEffect } from 'react'

interface Props {
  productId: string
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getBase(productId: string) {
  const hash = productId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return 5 + Math.floor(seededRandom(hash) * 17) // 5–22
}

export function LiveViewers({ productId }: Props) {
  const base = getBase(productId)
  const [count, setCount] = useState(base)

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2 // -2 to +2
      setCount(prev => Math.min(22, Math.max(5, prev + delta)))
    }, 30000 + Math.random() * 30000) // 30–60s

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
      </span>
      <span><strong className="text-gray-700">{count} people</strong> viewing this right now</span>
    </div>
  )
}
