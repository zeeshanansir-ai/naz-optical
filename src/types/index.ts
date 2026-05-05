export type Category = 'men' | 'women' | 'kids' | 'sunglasses' | 'computer'
export type SortOption = 'newest' | 'price_asc' | 'price_desc'

export interface Product {
  id: string
  name: string
  category: Category
  brand: string | null
  price: number
  original_price: number | null
  image_url: string
  storage_path: string
  whatsapp_msg: string
  badge: 'new' | 'premium' | 'sale' | null
  images_360: string[] | null   // ordered array of URLs for 360° spinner
  model_3d_url: string | null   // .glb URL for virtual try-on
  is_active: boolean
  created_at: string
}

export interface QuickViewState {
  open: boolean
  product: Product | null
}

export interface Review {
  id: string
  reviewer_name: string
  rating: number
  title: string
  body: string
  product_name: string | null
  created_at: string
}
