import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { ChatWidget } from '@/components/chat/ChatWidget'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: 'Premium eyewear for men, women, kids, sunglasses and computer glasses.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <AnnouncementBar />
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
