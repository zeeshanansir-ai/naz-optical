import { SITE_NAME, WHATSAPP_NUMBER } from '@/lib/constants'

export const metadata = { title: `Exchange & Return Policy — ${SITE_NAME}` }

const POLICIES = [
  {
    title: '7-Day Exchange',
    body: 'You may exchange any product within 7 days of receiving it. The item must be unused, in its original condition, and with original packaging.',
  },
  {
    title: 'Prescription Lenses',
    body: 'Prescription lenses are custom-made to your specifications. Please double-check your prescription before placing an order. Exchanges are only accepted if there is an error on our part.',
  },
  {
    title: 'Contact Lenses',
    body: 'Unopened contact lens boxes may be exchanged within 7 days. Opened boxes cannot be returned for hygiene reasons.',
  },
  {
    title: 'Damaged or Wrong Item',
    body: 'If you receive a damaged or incorrect item, contact us on WhatsApp within 48 hours with photos. We will arrange a replacement or full refund at no extra cost.',
  },
  {
    title: 'How to Initiate an Exchange',
    body: 'Simply WhatsApp us at 0300-4686170 or 0327-1830170 with your order details and reason for exchange. Our team will guide you through the process.',
  },
  {
    title: 'Delivery Charges',
    body: 'Return delivery charges are the customer\'s responsibility unless the item was damaged or incorrect. We cover the delivery cost for sending the replacement.',
  },
]

export default function ExchangePolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Exchange & Return Policy</h1>
        <p className="text-gray-500 mt-2">We want you to be completely satisfied with your purchase.</p>
      </div>

      <div className="space-y-4">
        {POLICIES.map((p, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-1.5">{p.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center space-y-3">
        <p className="font-bold text-gray-900">Need help with an exchange?</p>
        <p className="text-sm text-gray-600">Contact us on WhatsApp and we will sort it out quickly.</p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I need help with an exchange/return.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors"
        >
          WhatsApp Us
        </a>
      </div>
    </main>
  )
}
