'use client'

import { useEffect, useState } from 'react'
import { Footer } from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { apiService } from '@/lib/api-service'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const [serverCartLoading, setServerCartLoading] = useState(true)

  // Fetch server cart data on mount
  useEffect(() => {
    const fetchServerCart = async () => {
      try {
        const response = await apiService.cart.get()
        console.log('Server cart data fetched from nodejs:', response.data)
      } catch (error) {
        console.error('Failed to fetch API cart:', error)
      } finally {
        setServerCartLoading(false)
      }
    }

    fetchServerCart()
  }, [])

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-primary mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some products to get started</p>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary hover:underline">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/products" className="text-primary hover:underline">Products</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">Cart</span>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="flex gap-4 p-4 bg-card border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{item.productName}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.size}</p>
                      <p className="font-semibold text-primary mb-3">₹{item.price.toLocaleString()}</p>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            void updateQuantity(item.productId, item.variantId, item.quantity - 1)
                          }
                          className="w-8 h-8 border border-border rounded hover:border-primary flex items-center justify-center text-sm"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            void updateQuantity(item.productId, item.variantId, item.quantity + 1)
                          }
                          className="w-8 h-8 border border-border rounded hover:border-primary flex items-center justify-center text-sm"
                        >
                          +
                        </button>
                        <span className="text-sm text-muted-foreground ml-2">
                          Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => void removeFromCart(item.productId, item.variantId)}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded transition-colors"
                      title="Remove from cart"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={clearCart}
                className="mt-4 text-sm text-destructive hover:text-destructive/80 transition-colors"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">
                      ₹{Math.round(totalPrice * 0.18).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary text-lg">
                      ₹{Math.round(totalPrice * 1.18).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link href="/checkout" className="w-full block">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-3">
                    <span className="flex items-center justify-center gap-2">
                      Proceed to Checkout
                      <ArrowRight size={18} />
                    </span>
                  </Button>
                </Link>

                <Link href="/products" className="w-full block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
