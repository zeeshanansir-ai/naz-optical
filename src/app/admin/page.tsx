import { UploadPortal } from '@/components/admin/UploadPortal'
import { SITE_NAME } from '@/lib/constants'

export const metadata = { title: `Admin — ${SITE_NAME}` }

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-optical-navy">Upload Portal</h1>
          <p className="text-muted-foreground text-sm mt-1">Add new products to the store.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <UploadPortal />
        </div>
      </div>
    </div>
  )
}
