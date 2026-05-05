'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className="bg-red-600 text-white text-sm text-center py-2 px-4 relative">
      <span className="font-medium">Pay with bank transfer &amp; get 15% discount</span>
      <span className="hidden sm:inline"> · Free delivery across Pakistan</span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
