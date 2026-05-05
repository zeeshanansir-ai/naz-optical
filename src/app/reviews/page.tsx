import { Star } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

export const metadata = { title: `Customer Reviews — ${SITE_NAME}` }

const REVIEWS = [
  { name: 'Ali Hassan',       rating: 5, title: 'Best optical store in Lahore!',       body: 'Been coming to Naz Optical since years. The quality of frames and lenses is unmatched. Staff is very professional and helpful. Highly recommend!',                         product: 'Dior Geometric Frame',        date: '20-04-2026' },
  { name: 'Sana Arshad',      rating: 5, title: 'Amazing Bella contact lenses',        body: 'Got my Bella colored lenses from Naz Optical — the range is fantastic and they helped me pick the right power. Very satisfied with the service.',                          product: 'Bella Contact Lenses',        date: '12-04-2026' },
  { name: 'Tariq Mehmood',    rating: 5, title: 'Excellent prescription service',      body: 'Got my eye test done and prescription glasses made at the same visit. The optometrist was very thorough. Glasses were ready quickly and the clarity is superb.',            product: 'Prescription Glasses',        date: '05-04-2026' },
  { name: 'Nadia Butt',       rating: 5, title: 'Designer frames at great prices',     body: 'Found Dior frames here that I could not find anywhere else in Lahore. The prices were very reasonable and the staff was extremely helpful. Will definitely come back.',     product: 'Dior Classic Sunglasses',     date: '28-03-2026' },
  { name: 'Zubair Chaudhry',  rating: 4, title: 'Good blue light glasses',            body: 'Ordered blue-blocking lenses for my computer work. Noticed a real difference in eye strain. Good quality at a fair price. Delivery to Shakargarh was fast too.',           product: 'Blue Light Computer Glasses', date: '15-03-2026' },
  { name: 'Iqra Shahid',      rating: 5, title: 'Est. 1965 — the experience shows!',  body: 'You can tell this is a store with decades of expertise. They know exactly what suits your face and your needs. The quality is premium and the service is top class.',       product: null,                          date: '01-03-2026' },
  { name: 'Kamran Iqbal',     rating: 5, title: 'Fast WhatsApp ordering',             body: 'Ordered via WhatsApp and the whole process was smooth. Got my sunglasses delivered in 2 days. Packaging was excellent and the product was exactly as shown.',              product: 'Premium Sunglasses',          date: '18-02-2026' },
  { name: 'Maryam Nawaz',     rating: 5, title: 'Great kids glasses',                 body: 'Bought glasses for my son. They were very patient and helped pick a frame that fits well and is durable. My son loves them! Will return for future purchases.',             product: 'Kids Glasses',                date: '10-02-2026' },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
        <p className="text-gray-500 mt-2">Trusted since 1965 · Lahore &amp; Shakargarh</p>
        <div className="flex justify-center items-center gap-2 mt-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">4.9 / 5</span>
        </div>
      </div>

      <div className="space-y-4">
        {REVIEWS.map((r, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="space-y-2 flex-1">
              <Stars rating={r.rating} />
              <h3 className="font-semibold text-gray-900">&ldquo;{r.title}&rdquo;</h3>
              <p className="text-sm text-gray-600">{r.body}</p>
            </div>
            <div className="text-right text-sm text-gray-500 flex-shrink-0">
              <p className="font-semibold text-gray-800">{r.name}</p>
              <p>Reviewed on {r.date}</p>
              {r.product && <p className="text-red-600 font-medium mt-1">{r.product}</p>}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
