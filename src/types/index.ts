export type Category = 'men' | 'women' | 'kids' | 'sunglasses' | 'computer'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  image_url: string
  storage_path: string
  whatsapp_msg: string
  is_active: boolean
  created_at: string
}

export interface QuickViewState {
  open: boolean
  product: Product | null
}
