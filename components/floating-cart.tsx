'use client'

import { useCart } from '@/lib/cart-context'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function FloatingCart() {
  const { totalItems, totalPrice } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || totalItems === 0) return null

  return (
    <Link href="/cart">
      <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1a5f48] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 hover:bg-[#154d3b] transition-all cursor-pointer border-2 border-white/20 backdrop-blur-sm">
        <div className="relative">
          <ShoppingCart size={24} />
          <span className="absolute -top-3 -right-3 bg-[#e8a356] text-[#1a5f48] text-[11px] font-extrabold h-6 w-6 flex items-center justify-center rounded-full border-2 border-[#1a5f48] shadow-sm">
            {totalItems}
          </span>
        </div>
        <div className="flex flex-col text-left mr-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#e8a356] leading-none mb-0.5">Your Cart</span>
          <span className="text-sm font-bold leading-none">₹{totalPrice.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  )
}
