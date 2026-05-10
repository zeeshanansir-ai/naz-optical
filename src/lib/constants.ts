import { Category } from '@/types'

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'men',        label: 'Men Glasses'       },
  { value: 'women',      label: 'Women Glasses'     },
  { value: 'kids',       label: 'Kids Glasses'      },
  { value: 'sunglasses', label: 'Sunglasses'        },
  { value: 'computer',   label: 'Computer Glasses'  },
  { value: 'contact',    label: 'Contact Lenses'    },
]

export const WHATSAPP_NUMBER  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '923004686170'
export const WHATSAPP_NUMBER2 = '923271830170'

export const SITE_NAME     = 'Naz Optical Service'
export const SITE_TAGLINE  = 'Premium Quality & Precision Lenses'
export const ESTABLISHED   = '1965'

export const SOCIAL = {
  instagram: 'https://www.instagram.com/nazopticalservice',
  tiktok:    'https://www.tiktok.com/@nazopticalservice.pk',
  maps:      'https://www.google.com/maps/place/NAZ+OPTICAL+SERVICE+-+TOWNSHIP/@31.455833,74.3131952,17z/data=!3m1!4b1!4m6!3m5!1s0x3919074ed9040e57:0x3ab05d251613bc7e!8m2!3d31.455833!4d74.3157701!16s%2Fg%2F11kpf12vjw',
}

export const LOCATIONS = ['Lahore', 'Shakargarh']
