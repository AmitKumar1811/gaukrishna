import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import StoreProvider from './StoreProvider'
import { ClientLayout } from './client-layout'
import { Analytics } from "@vercel/analytics/next"

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gaukrishna.in'),
  title: 'Gau Krishna (Ram Rasoi) - A2 Desi Cow Ghee, Kesar Yukt Chyawanprash & Wood-Pressed Oils',
  description:
    'Buy pure A2 Gir Cow Bilona Ghee, Ram Rasoi Kesar Yukt Chyawanprash (कृष्णा च्यवनप्राश), Virgin Coconut Oil for face & cooking, Wood Pressed Groundnut Oil, and Panchgavya Dhoop Batti directly from Dhingsara, Fatehabad.',
  keywords: [
    'gau krishna',
    'gaukrishna',
    'gau krishna chyawanprash',
    'ram rasoi chyawanprash',
    'krishna chyawanprash',
    'kesar yukt chyawanprash',
    'कृष्णा च्यवनप्राश',
    'a2 cow ghee benefits',
    'a2 gir cow ghee',
    'gaukrish ghee',
    'virgin coconut oil for face',
    'wood pressed groundnut oil',
    'panchgavya dhoop batti',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Gau Krishna (Ram Rasoi) - Pure A2 Ghee, Chyawanprash & Wood-Pressed Oils',
    description:
      'Authentic Swadeshi products from Dhingsara: A2 Bilona Cow Ghee, Ram Rasoi Kesar Yukt Chyawanprash, Virgin Coconut Oil, Wood Pressed Groundnut Oil & Panchgavya Dhoop Batti.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Gau Krishna',
    images: [{ url: '/images/a2-ghee.webp', alt: 'Gau Krishna A2 Desi Cow Ghee & Ram Rasoi Products' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gau Krishna (Ram Rasoi) - A2 Ghee & Kesar Yukt Chyawanprash',
    description:
      'Pure A2 Gir Cow Ghee, Ram Rasoi Chyawanprash, Virgin Coconut Oil & Wood Pressed Groundnut Oil from Dhingsara, Haryana.',
    images: ['/images/a2-ghee.webp'],
  },
  generator: 'v0.app',
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <StoreProvider>
          <CartProvider>
            <ClientLayout>{children}</ClientLayout>
          </CartProvider>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  )
}
