import { Star } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

export const metadata = { title: `Customer Reviews — ${SITE_NAME}` }

const REVIEWS = [
  { name: 'Ahmed Khan',     rating: 5, title: 'Excellent quality!',            body: 'Great frames, fast delivery. Exactly as described. Will definitely order again.',     product: 'Ray Ban Wayfarer (Black)',    date: '15-04-2026' },
  { name: 'Sara Malik',     rating: 5, title: 'Excellent service and delivery', body: 'Excellent fit. Easy selection and ordering process. Very good price. Great service.', product: 'Tom Ford Classic (Brown)',    date: '10-03-2026' },
  { name: 'Usman Ali',      rating: 4, title: 'Good value for money',           body: 'Good quality frames. Arrived in 2 days. Packaging was great.',                        product: 'Gucci Sunglasses (Gold)',    date: '28-02-2026' },
  { name: 'Fatima Zahra',   rating: 5, title: 'Love these glasses!',            body: 'Ordered computer glasses. Blue light blocking works well. Very comfortable.',         product: 'Computer Glasses (Black)',   date: '20-02-2026' },
  { name: 'Zaheer Baloch',  rating: 5, title: 'Excellent frame',                body: 'Excellent frame in this price range. Highly recommend.',                              product: null,                         date: '24-03-2026' },
  { name: 'Hania Tareen',   rating: 5, title: 'Perfect fit',                    body: 'Perfect fit and great quality. The WhatsApp ordering was very convenient.',           product: 'Prada Glasses (Silver)',     date: '18-01-2026' },
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
        <p className="text-gray-500 mt-2">Reviews ({REVIEWS.length * 2134})</p>
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
