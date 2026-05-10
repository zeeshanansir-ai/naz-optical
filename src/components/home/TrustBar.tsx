import { ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react'

const ITEMS = [
  { icon: ShieldCheck, label: 'Premium Quality Products' },
  { icon: Truck,       label: 'Free Delivery In Pakistan' },
  { icon: RefreshCw,   label: '7 Days Exchange or Return' },
  { icon: Star,        label: '5 Star Rated on Google',   gold: true },
]

export function TrustBar() {
  return (
    <div className="border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        {ITEMS.map(({ icon: Icon, label, gold }) => (
          <div key={label} className="flex items-center gap-2 text-sm text-gray-600">
            <Icon className={`w-4 h-4 ${gold ? 'text-yellow-400 fill-yellow-400' : 'text-optical-navy'}`} />
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
