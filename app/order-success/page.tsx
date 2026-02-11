'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Check, Package, MapPin, Mail } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

import { useSearchParams } from 'next/navigation'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || Math.random().toString(36).substr(2, 9).toUpperCase()
  const total = searchParams.get('total') || '0'

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <Check size={48} className="text-primary" />
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-3">Order Placed Successfully!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Order ID */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="text-xl font-bold text-foreground">#{orderId}</p>
                </div>
              </div>

              {/* Order Total */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Total</p>
                  <p className="text-xl font-bold text-primary">₹{parseInt(total).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Delivery & Communication */}
            <div className="space-y-4 pt-8 border-t border-border">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-1">Expected Delivery</p>
                  <p className="text-sm text-muted-foreground">3-5 business days to your address</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-1">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">A confirmation and tracking email has been sent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Messages */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-foreground mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Check your email for order confirmation and tracking details</li>
              <li>Your order will be packed and shipped within 24 hours</li>
              <li>You can track your order status anytime using the order ID</li>
              <li>Contact our support team if you have any questions</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/products">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="bg-transparent">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  )
}
