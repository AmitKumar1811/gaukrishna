'use client'

import { useEffect, useState } from 'react'
import { Footer } from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { validateCoupon } from '@/app/api/api-service'
import { clearStoredCoupon, getStoredCoupon, storeCoupon, type AppliedCoupon } from '@/lib/coupon-storage'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart, syncCart } = useCart()
  const [serverCartLoading, setServerCartLoading] = useState(true)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null)
  const [couponError, setCouponError] = useState('')
  const [couponLoading, setCouponLoading] = useState(false)

  useEffect(() => {
    const syncWithServer = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setServerCartLoading(false)
        return
      }

      try {
        await syncCart()
      } catch (error) {
        console.error('Failed to sync API cart:', error)
      } finally {
        setServerCartLoading(false)
      }
    }

    syncWithServer()
    const stored = getStoredCoupon()
    if (stored) {
      setAppliedCoupon(stored)
      setCouponCode(stored.code)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const stored = getStoredCoupon()
    if (!stored || !totalPrice) return
    validateCoupon({ code: stored.code, subtotal: totalPrice })
      .then((result) => {
        const applied: AppliedCoupon = {
          code: result.code,
          discount: result.discount,
          shippingFee: result.shippingFee,
          total: result.total,
          message: result.message,
        }
        setAppliedCoupon(applied)
        storeCoupon(applied)
        setCouponError('')
      })
      .catch((error: any) => {
        setAppliedCoupon(null)
        clearStoredCoupon()
        setCouponError(error.response?.data?.message || 'Coupon is no longer valid')
      })
  }, [totalPrice])

  const handleApplyCoupon = async () => {
    setCouponError('')
    if (!couponCode.trim()) {
      setCouponError('Enter a coupon code')
      return
    }
    if (!localStorage.getItem('token')) {
      setCouponError('Please login to apply a coupon')
      return
    }
    setCouponLoading(true)
    try {
      const result = await validateCoupon({ code: couponCode.trim(), subtotal: totalPrice })
      const applied: AppliedCoupon = {
        code: result.code,
        discount: result.discount,
        shippingFee: result.shippingFee,
        total: result.total,
        message: result.message,
      }
      setAppliedCoupon(applied)
      storeCoupon(applied)
    } catch (error: any) {
      setAppliedCoupon(null)
      clearStoredCoupon()
      setCouponError(error.response?.data?.message || 'Invalid coupon')
    } finally {
      setCouponLoading(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponError('')
    clearStoredCoupon()
  }

  const shippingFee = appliedCoupon ? appliedCoupon.shippingFee : (totalPrice < 500 ? 50 : 0)
  const discount = appliedCoupon?.discount || 0
  const payableTotal = appliedCoupon ? appliedCoupon.total : totalPrice + shippingFee

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

                <div className="mb-5">
                  <label className="text-sm font-semibold text-foreground mb-2 block">Coupon</label>
                  <div className="flex gap-2">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="flex-1 border border-border rounded-md px-3 py-2 text-sm uppercase"
                      disabled={Boolean(appliedCoupon)}
                    />
                    {appliedCoupon ? (
                      <button type="button" onClick={handleRemoveCoupon} className="text-sm font-semibold text-destructive">
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={couponLoading}
                        className="px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-60"
                      >
                        {couponLoading ? '...' : 'Apply'}
                      </button>
                    )}
                  </div>
                  {couponError && <p className="text-xs text-destructive mt-2">{couponError}</p>}
                  {appliedCoupon && <p className="text-xs text-primary mt-2">{appliedCoupon.message || `${appliedCoupon.code} applied`}</p>}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Coupon ({appliedCoupon?.code})</span>
                      <span className="text-primary font-semibold">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">{shippingFee > 0 ? `₹${shippingFee}` : 'Free'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground text-xs font-medium">Included in price</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary text-lg">
                      ₹{payableTotal.toLocaleString()}
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
