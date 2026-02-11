import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { CartProvider } from '@/lib/cart-context'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gau Krishna - Pure A2 Ghee & Cold-Pressed Oils',
  description: 'Premium A2 ghee and cold-pressed oils sourced directly from Indian farms. 40+ quality checks, traditional processing, 100% pure.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
