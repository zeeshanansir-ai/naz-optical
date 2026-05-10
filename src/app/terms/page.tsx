import { SITE_NAME } from '@/lib/constants'

export const metadata = { title: `Terms & Conditions — ${SITE_NAME}` }

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-10">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Terms &amp; Conditions</h1>
        <p className="text-gray-500 mt-2">Naz Optical Service (NOS) · Last Updated: May 2026</p>
      </div>

      <p className="text-gray-700 leading-relaxed">
        Welcome to Naz Optical Service (NOS). By accessing our website or utilizing our professional optician services in Township, Lahore, or Shakargarh &amp; whole Pakistan, you agree to comply with the following terms and conditions. These terms are designed to ensure a premium and transparent experience for all our clients.
      </p>

      <section className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">1. Professional Services &amp; Clinical Accuracy</h2>
        <ul className="space-y-4 pl-0">
          <li className="flex gap-3">
            <span className="mt-1.5 w-2 h-2 bg-optical-navy rounded-full shrink-0" />
            <span><strong>Prescription Validity:</strong> All prescription glasses are fabricated based on the specific ophthalmic data provided by the client or generated during our in-house eye examination. NOS is not responsible for visual discomfort resulting from outdated prescriptions provided by external clinics.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 w-2 h-2 bg-optical-navy rounded-full shrink-0" />
            <span><strong>Examination Policy:</strong> While we provide high-accuracy refraction tests, these screenings do not replace a full medical consultation with an Ophthalmologist for underlying ocular diseases.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">2. Orders &amp; Bespoke Customization</h2>
        <ul className="space-y-4 pl-0">
          <li className="flex gap-3">
            <span className="mt-1.5 w-2 h-2 bg-optical-navy rounded-full shrink-0" />
            <span><strong>Custom Fabrication:</strong> Since prescription lenses are custom-surfaced to your unique physiological measurements, orders cannot be cancelled once the laboratory process has commenced.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 w-2 h-2 bg-optical-navy rounded-full shrink-0" />
            <span><strong>Product Availability:</strong> Inclusion of designer eyewear (e.g., Celine, Dior) on our digital platforms does not guarantee immediate stock availability at all branches. We reserve the right to source specific frames from our Main Haider Road or Shakargarh inventories as needed.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">3. Warranty &amp; Framework Policy</h2>
        <ul className="space-y-4 pl-0">
          <li className="flex gap-3">
            <span className="mt-1.5 w-2 h-2 bg-optical-navy rounded-full shrink-0" />
            <span><strong>Manufacturer Warranty:</strong> Authentic designer frames are covered under a limited manufacturer&apos;s warranty against structural defects. This does not cover accidental damage, scratches, or improper handling by the user.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 w-2 h-2 bg-optical-navy rounded-full shrink-0" />
            <span><strong>Lens Coating Integrity:</strong> Performance coatings, such as blue-light filters and anti-reflective layers, must be maintained according to the provided care instructions to remain valid under service guarantees.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">4. Returns &amp; Exchanges</h2>
        <ul className="space-y-4 pl-0">
          <li className="flex gap-3">
            <span className="mt-1.5 w-2 h-2 bg-optical-navy rounded-full shrink-0" />
            <span><strong>Hygiene &amp; Standards:</strong> Due to the medical nature of contact lenses and customized eyewear, returns are only accepted in cases of verified manufacturing discrepancies.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 w-2 h-2 bg-optical-navy rounded-full shrink-0" />
            <span><strong>Exchange Window:</strong> Any adjustments for frame fitting or lens orientation must be requested within 7 days of collection at our Lahore or Shakargarh centers.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">5. Limitation of Liability</h2>
        <p>
          Naz Optical Service (NOS) shall not be liable for any indirect or consequential damages arising from the use of our products. Our total liability is limited to the repair or replacement of the specific vision solution purchased.
        </p>
      </section>

      <div className="bg-optical-navy text-white rounded-2xl p-6 text-center space-y-3">
        <p className="font-bold text-lg">Questions About These Terms?</p>
        <p className="text-white/70 text-sm">Contact us at either of our branches in Lahore or Shakargarh — we are happy to clarify.</p>
        <a
          href="/about"
          className="inline-block bg-white text-optical-navy font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          Contact Us
        </a>
      </div>

    </main>
  )
}
