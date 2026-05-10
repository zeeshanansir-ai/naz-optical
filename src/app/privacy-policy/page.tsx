import { SITE_NAME, WHATSAPP_NUMBER, WHATSAPP_NUMBER2 } from '@/lib/constants'

export const metadata = { title: `Privacy Policy — ${SITE_NAME}` }

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-10">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy &amp; Data Protection Protocol</h1>
        <p className="text-gray-500 mt-2">Naz Optical Service (NOS) · Effective Date: May 2026</p>
      </div>

      <section className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">1. Commitment to Privacy</h2>
        <p>
          At Naz Optical Service (NOS), we recognize that the protection of your personal and clinical information is a cornerstone of professional vision care. With a heritage of service dating back to <strong>1965</strong>, we are committed to maintaining the highest standards of data integrity and confidentiality for our clients across our Lahore and Shakargarh locations.
        </p>
      </section>

      <section className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">2. Scope of Information Collection</h2>
        <p>To provide precise optician services and manage the complexities of custom eyewear fabrication, we collect and process the following categories of data:</p>
        <ul className="space-y-3 pl-0">
          {[
            { title: 'Individual Identifiers', desc: 'Includes your full name, primary contact details, and shipping address for the fulfillment of orders.' },
            { title: 'Clinical Records', desc: 'Detailed vision assessments, ophthalmic prescriptions, and lens history required to ensure accuracy in your vision correction.' },
            { title: 'Transaction Metadata', desc: 'Records of specific frame selections, lens enhancements, and warranty information related to your purchases.' },
            { title: 'Technical Information', desc: 'Standard web logs, including IP addresses and cookies, utilized solely to enhance site navigation and service delivery.' },
          ].map(item => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 bg-optical-navy rounded-full shrink-0" />
              <span><strong>{item.title}:</strong> {item.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">3. Purpose and Legal Basis for Processing</h2>
        <p>We process your information under the principle of "Purpose Limitation," ensuring data is only used for the following objectives:</p>
        <ul className="space-y-3 pl-0">
          {[
            { title: 'Order Execution', desc: 'Facilitating the custom manufacturing of prescription lenses and the secure transit of frames from our branches in Township, Lahore, and Shakargarh.' },
            { title: 'Clinical Continuity', desc: 'Maintaining a longitudinal record of your vision health to allow for comparative analysis during future eye examinations.' },
            { title: 'Communication', desc: 'Providing essential service updates, including appointment reminders and notification of completed orders.' },
            { title: 'Service Optimization', desc: 'Analyzing internal trends to ensure our inventory reflects the premium quality and stylistic standards our clients expect.' },
          ].map(item => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 bg-optical-navy rounded-full shrink-0" />
              <span><strong>{item.title}:</strong> {item.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">4. Data Safeguards and Security</h2>
        <p>NOS employs robust administrative and technical measures to protect your data from unauthorized access or disclosure:</p>
        <ul className="space-y-3 pl-0">
          {[
            { title: 'Strict Confidentiality', desc: 'We maintain a rigorous policy against the sale or trade of client data to third-party entities.' },
            { title: 'Vetted Partners', desc: 'Your information is only disclosed to essential service providers—such as specialized optical laboratories or logistics partners—under strict confidentiality agreements.' },
            { title: 'Secure Infrastructure', desc: 'Our digital records are housed on encrypted servers to ensure your vision history remains private and accessible only to authorized personnel.' },
          ].map(item => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 bg-optical-navy rounded-full shrink-0" />
              <span><strong>{item.title}:</strong> {item.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">5. Client Rights and Autonomy</h2>
        <p>We empower our clients with full transparency regarding their data. You have the right to:</p>
        <ul className="space-y-3 pl-0">
          {[
            { title: 'Access & Portability', desc: 'Request a copy of your current vision prescription or a summary of your service history.' },
            { title: 'Rectification', desc: 'Update or correct any personal information held within our records.' },
            { title: 'Data Minimization', desc: 'Request the removal of your contact details from our promotional outreach and marketing lists.' },
          ].map(item => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 bg-optical-navy rounded-full shrink-0" />
              <span><strong>{item.title}:</strong> {item.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-gray-50 rounded-2xl p-6 space-y-3 text-gray-700">
        <h2 className="text-xl font-bold text-gray-900">6. Contact Information</h2>
        <p>
          For any inquiries regarding this policy or to exercise your data rights, please contact the management at our <strong>Main Haider Road</strong> facility in Lahore or our <strong>Shakargarh Main Bazaar</strong> branch.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-green-700 transition-colors"
          >
            WhatsApp: 0300-4686170
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER2}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-green-700 transition-colors"
          >
            WhatsApp: 0327-1830170
          </a>
        </div>
      </section>

    </main>
  )
}
