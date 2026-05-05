import { Star } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

export const metadata = { title: `Customer Reviews — ${SITE_NAME}` }

const REVIEWS = [
  { name: 'Muhammad Yousaf', rating: 5, title: 'Best optical service in town',              body: 'The best optical service in town. The eye test was accurate, and everything was explained clearly. A wide variety of frames and high-quality lenses are available at very reasonable prices.',                                                                                              product: null,              date: 'Jan 2026' },
  { name: 'Arslan Mughal',   rating: 5, title: '10 stars if I could!',                      body: 'Exceptional experience at this optical shop! The staff were knowledgeable, friendly, and helped me find the perfect frames. The quality of the glasses is top-notch, and the prices were very reasonable. Highly recommend for anyone looking for great service and amazing eyewear!',        product: null,              date: 'Jul 2025' },
  { name: 'A L E E Y',      rating: 5, title: 'Ultimate destination for eyewear',           body: 'Exceptional service, stunning frames, and flawless lenses! Naz Optical Service is the ultimate destination for all your eyewear needs.',                                                                                                                                                   product: null,              date: 'May 2025' },
  { name: 'Naveed Khan',     rating: 5, title: 'Best optical service in Township',          body: 'Best optical service in Township. Great work. Nice gentleman.',                                                                                                                                                                                                                             product: null,              date: 'Jan 2026' },
  { name: 'Optimal Khan',    rating: 5, title: 'Flawless service & reasonable price',       body: 'Flawless service. Good comparative. And reasonable price.',                                                                                                                                                                                                                                product: null,              date: 'Jan 2026' },
  { name: 'Waqar Akhtar',    rating: 5, title: 'Extremely qualified optician',              body: 'Excellent service and extremely qualified optician.',                                                                                                                                                                                                                                       product: null,              date: 'May 2024' },
  { name: 'brown boy',       rating: 5, title: 'Lenses crafted to perfection',              body: 'Exceptional service and top-notch quality! The lenses were crafted to perfection and the attention to detail was impressive. Highly recommend!',                                                                                                                                            product: null,              date: 'May 2025' },
  { name: 'Imran Javeed',    rating: 5, title: 'Fully satisfied',                           body: 'Fully satisfied with the service and the quality of articles.',                                                                                                                                                                                                                            product: null,              date: 'Jan 2026' },
  { name: 'Maida Javaid',    rating: 5, title: 'Good quality and fast delivery',            body: 'Good quality and fast delivery service. Thanks.',                                                                                                                                                                                                                                          product: null,              date: 'Jan 2026' },
  { name: 'Rana Faisal',     rating: 5, title: 'Best optical shop in Township',             body: 'Experienced person & best optical shop in Township.',                                                                                                                                                                                                                                      product: null,              date: 'Apr 2026' },
  { name: 'Saddam Hussain',  rating: 5, title: 'Well behaved and good quality',             body: 'Well behaved person and good quality product.',                                                                                                                                                                                                                                            product: null,              date: 'May 2025' },
  { name: 'Rana Shahwaiz',   rating: 5, title: 'Best eyewear store in Township',            body: 'Best eyewear store in Township.',                                                                                                                                                                                                                                                          product: null,              date: 'Oct 2025' },
  { name: 'ZEESHAN ANSAR',   rating: 5, title: 'بہترین سروس',                               body: 'بہترین سروس۔ رانا صاحب — Excellent service. Rana Sahib.',                                                                                                                                                                                                                                 product: null,              date: 'Jan 2026' },
  { name: 'Online Work',     rating: 5, title: 'Experienced in eyeglasses field',           body: 'Experience persons in eyes glasses field.',                                                                                                                                                                                                                                                product: null,              date: 'May 2024' },
  { name: 'Ali Jamil',       rating: 5, title: 'Best eyewear store',                        body: 'Best eyewear store.',                                                                                                                                                                                                                                                                      product: null,              date: 'May 2024' },
  { name: 'Happy Shah',      rating: 5, title: 'Best optical shop',                         body: 'Best optical shop.',                                                                                                                                                                                                                                                                       product: null,              date: 'Jun 2025' },
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
