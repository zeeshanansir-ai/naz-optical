import { SITE_NAME, WHATSAPP_NUMBER, WHATSAPP_NUMBER2, SOCIAL } from '@/lib/constants'
import { MapPin, Phone } from 'lucide-react'

export const metadata = { title: `About Us — ${SITE_NAME}` }

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-10">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">About Naz Optical Service</h1>
        <p className="text-gray-500 mt-2">Trusted eyewear specialists since 1965</p>
      </div>

      <div className="prose prose-gray max-w-none space-y-4 text-gray-700 leading-relaxed">
        <p>
          Naz Optical Service has been serving the people of Lahore and Shakargarh since <strong>1965</strong> — over five decades of trusted eye care and premium eyewear. What started as a small optical shop has grown into one of the most reputable eyewear destinations in the region.
        </p>
        <p>
          We offer a wide selection of <strong>designer frames, sunglasses, and precision-engineered lenses</strong> from leading brands including Dior, Ray Ban, Tom Ford, Prada, Gucci, Cartier, and many more. Our in-store optometrist provides professional eye testing and prescription services, ensuring every customer leaves with the perfect vision correction.
        </p>
        <p>
          We also stock <strong>Bella color contact lenses</strong>, Bausch & Lomb, Biomedics, Acuvue, and other contact lens brands — including powered options for vision correction.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
          <h2 className="font-bold text-gray-900 text-lg">Our Services</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {[
              'Designer frames & sunglasses',
              'Prescription lenses (all types)',
              'Blue light & computer glasses',
              'Contact lenses (colored & powered)',
              'Professional eye testing',
              'Lens replacement & repair',
              'Nationwide delivery',
            ].map(s => (
              <li key={s} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-lg">Contact & Location</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <a href={SOCIAL.maps} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-red-600 transition-colors">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Township, Lahore &amp; Shakargarh, Punjab, Pakistan</span>
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-600 transition-colors">
              <Phone className="w-4 h-4 shrink-0" />
              0300-4686170
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER2}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-600 transition-colors">
              <Phone className="w-4 h-4 shrink-0" />
              0327-1830170
            </a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              @nazopticalservice
            </a>
          </div>
        </div>
      </div>

      <div className="bg-optical-navy text-white rounded-2xl p-6 text-center space-y-3">
        <p className="font-bold text-lg">Visit Us In Store</p>
        <p className="text-white/70 text-sm">Come in for a free eye test or to browse our full collection of frames and lenses in person.</p>
        <a
          href={SOCIAL.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-optical-navy font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          Get Directions
        </a>
      </div>

    </main>
  )
}
