import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Product } from '@/types'

export const dynamic = 'force-dynamic'

async function getProduct(id: string): Promise<Product | null> {
  const admin = createAdminClient()
  const { data } = await admin.from('products').select('*').eq('id', id).eq('is_active', true).single()
  return data as Product | null
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id)
  if (!product) return { title: 'Product Not Found' }

  const title       = `${product.name}${product.brand ? ` by ${product.brand}` : ''} | Naz Optical`
  const description = product.description
    ?? `Buy ${product.name}${product.brand ? ` by ${product.brand}` : ''} at Naz Optical. Rs. ${product.price.toLocaleString()}. Fast delivery across Pakistan.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: product.image_url }],
      siteName: 'Naz Optical',
    },
  }
}

const BADGE_STYLES: Record<string, string> = {
  new:     'bg-green-500 text-white',
  premium: 'bg-yellow-400 text-gray-900',
  sale:    'bg-red-600 text-white',
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  if (!product) notFound()

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in: ${product.name}${product.brand ? ` by ${product.brand}` : ''} — Rs. ${product.price.toLocaleString()}`
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-2">
        <nav className="text-xs text-gray-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href={`/?category=${product.category}`} className="hover:text-gray-600 capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">

            {/* Image */}
            <div className="relative bg-gray-50 aspect-square flex items-center justify-center p-8">
              {product.badge && (
                <span className={`absolute top-4 left-4 text-xs font-bold px-2.5 py-1 rounded capitalize z-10 ${BADGE_STYLES[product.badge]}`}>
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 text-xs font-bold bg-red-600 text-white px-2 py-1 rounded z-10">
                  -{discount}%
                </span>
              )}
              <Image
                src={product.image_url}
                alt={product.name}
                width={420}
                height={420}
                className="object-contain w-full h-full"
                priority
              />
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col gap-5">
              {product.brand && (
                <p className="text-xs font-bold text-red-600 uppercase tracking-widest">{product.brand}</p>
              )}
              <h1 className="text-2xl font-bold text-gray-900 leading-snug">{product.name}</h1>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#0a1931]">Rs. {product.price.toLocaleString()}</span>
                {product.original_price && (
                  <span className="text-gray-400 text-base line-through">Rs. {product.original_price.toLocaleString()}</span>
                )}
                {discount && (
                  <span className="text-sm font-bold text-green-600">{discount}% off</span>
                )}
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={`https://wa.me/923335130444?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-base transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.554 4.112 1.523 5.845L0 24l6.335-1.502A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.006-1.371l-.36-.214-3.728.883.934-3.626-.235-.372A9.796 9.796 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
                  Order via WhatsApp
                </a>
                <Link
                  href="/"
                  className="flex items-center justify-center w-full py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors"
                >
                  ← Back to all products
                </Link>
              </div>
            </div>
          </div>

          {/* Description tab section */}
          {product.description && (
            <div className="border-t border-gray-100">
              <div className="flex border-b border-gray-100">
                <div className="px-6 py-3 text-sm font-semibold text-[#0a1931] border-b-2 border-[#0a1931]">
                  Description
                </div>
              </div>
              <div className="px-8 py-6">
                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
