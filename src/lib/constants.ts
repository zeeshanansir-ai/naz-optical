import { Category } from '@/types'

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'men',        label: 'Men'               },
  { value: 'women',      label: 'Women'             },
  { value: 'kids',       label: 'Kids'              },
  { value: 'sunglasses', label: 'Sunglasses'        },
  { value: 'computer',   label: 'Computer Glasses'  },
]

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '923001234567'

export const SITE_NAME = 'Naz Optical Service'
export const SITE_TAGLINE = 'Premium Quality & Precision Lenses'
