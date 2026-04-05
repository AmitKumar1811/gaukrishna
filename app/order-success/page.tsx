'use client'

import { Footer } from '@/components/footer'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SuccessIcon, OrderDetailCard, NextSteps, ActionButtons } from './order-success-components'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || Math.random().toString(36).substring(2, 11).toUpperCase()
  const total = parseInt(searchParams.get('total') || '0').toLocaleString()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <main className="flex-1 flex flex-col items-center justify-center py-10 sm:py-20 px-4">
        <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
          <SuccessIcon />

          <div className="text-center mb-8 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1a5f48] mb-3 leading-tight">
              Order Placed!
            </h1>
            <p className="text-base sm:text-lg text-gray-500 max-w-md mx-auto">
              Your order has been confirmed successfully. Get ready for premium freshness!
            </p>
          </div>

          <OrderDetailCard orderId={orderId} total={total} />
          <NextSteps />
          <ActionButtons />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#1a5f48] font-medium">Processing your order...</div>}>
      <OrderSuccessContent />
    </Suspense>
  )
}
