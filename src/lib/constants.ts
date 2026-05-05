import { Category } from '@/types'

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'men',        label: 'Men'               },
  { value: 'women',      label: 'Women'             },
  { value: 'kids',       label: 'Kids'              },
  { value: 'sunglasses', label: 'Sunglasses'        },
  { value: 'computer',   label: 'Computer Glasses'  },
]

export const WHATSAPP_NUMBER  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '923004686170'
export const WHATSAPP_NUMBER2 = '923271830170'

export const SITE_NAME     = 'Naz Optical Service'
export const SITE_TAGLINE  = 'Premium Quality & Precision Lenses'
export const ESTABLISHED   = '1965'

export const SOCIAL = {
  instagram: 'https://www.instagram.com/nazopticalservice',
  tiktok:    'https://www.tiktok.com/@nazopticalservice.pk',
  maps:      'https://www.google.com/maps/place/NAZ+OPTICAL+SERVICE+-+TOWNSHIP/@31.455833,74.3157701,17z',
}

export const LOCATIONS = ['Lahore', 'Shakargarh']
