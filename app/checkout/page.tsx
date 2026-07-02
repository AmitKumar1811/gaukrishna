'use client'

import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Footer } from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { 
  getAllAddresses, 
  createAddress, 
  editAddress, 
  removeAddress, 
  placeOrderFromCart, 
  createPaymentOrder, 
  verifyPayment 
} from '@/app/api/api-service'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [addresses, setAddresses] = useState<any[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true)
  const [isSavingAddress, setIsSavingAddress] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'Home',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  })
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)

  useEffect(() => {
    const loadAddresses = async () => {
      setIsLoadingAddresses(true)
      try {
        const res = await getAllAddresses()
        const list = Array.isArray(res) ? res : (res.data?.data || res.data || [])
        setAddresses(list)
        if (list.length > 0) {
          const defaultAddr = list.find((a: any) => a.isDefault)
          setSelectedAddressId(defaultAddr ? (defaultAddr._id || defaultAddr.id) : (list[0]._id || list[0].id))
        }
      } catch (error) {
        console.error('Failed to fetch addresses', error)
      } finally {
        setIsLoadingAddresses(false)
      }
    }
    loadAddresses()
  }, [])

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-primary mb-2">Cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add items to proceed with checkout</p>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'Home',
      email: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    })
    setEditingAddressId(null)
    setShowAddressForm(false)
  }

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingAddress(true)
    const payload = {
      name: formData.name,
      type: formData.type,
      email: formData.email,
      phone: formData.phone,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      pincode: formData.pincode,
    }
    try {
      if (editingAddressId) {
        await editAddress(editingAddressId, payload)
      } else {
        await createAddress(payload)
      }
      const res = await getAllAddresses()
      const list = res.data?.data || res.data || []
      setAddresses(Array.isArray(list) ? list : [])
      const newId =
        editingAddressId ||
        (Array.isArray(list) && list.length > 0 ? (list[list.length - 1]._id || list[list.length - 1].id) : null)
      if (newId) setSelectedAddressId(newId)
      resetForm()
    } catch (error) {
      console.error('Failed to save address', error)
    } finally {
      setIsSavingAddress(false)
    }
  }

  const handleEditAddress = (address: any) => {
    setEditingAddressId(address._id || address.id)
    setFormData({
      name: address.name || `${address.firstName || ''} ${address.lastName || ''}`.trim(),
      type: address.type || 'Home',
      email: address.email || '',
      phone: address.phone || '',
      addressLine1: address.addressLine1 || address.address || '',
      addressLine2: address.addressLine2 || '',
      city: address.city || '',
      state: address.state || '',
      country: address.country || '',
      pincode: address.pincode || '',
    })
    setShowAddressForm(true)
  }

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await removeAddress(addressId)
      const updated = addresses.filter((a) => (a._id || a.id) !== addressId)
      setAddresses(updated)
      if (selectedAddressId === addressId) {
        setSelectedAddressId(updated[0] ? updated[0]._id || updated[0].id : null)
      }
      if (editingAddressId === addressId) resetForm()
    } catch (error) {
      console.error('Failed to delete address', error)
    }
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) return
    const selectedAddress = addresses.find((a) => (a._id || a.id) === selectedAddressId)
    if (!selectedAddress) return

    const normalizedAddress = {
      type: selectedAddress.type || 'Home',
      name:
        selectedAddress.name ||
        `${selectedAddress.firstName || ''} ${selectedAddress.lastName || ''}`.trim() ||
        'Customer',
      phone: selectedAddress.phone || '',
      addressLine1: selectedAddress.addressLine1 || selectedAddress.address || '',
      addressLine2: selectedAddress.addressLine2 || selectedAddress.landmark || selectedAddress.area || '',
      city: selectedAddress.city || '',
      state: selectedAddress.state || '',
      country: selectedAddress.country || 'India',
      pincode: selectedAddress.pincode || '',
      isDefault: selectedAddress.isDefault ?? false,
    }

    setPlacingOrder(true)
    try {
      setPaymentLoading(true)

      const backendOrder = await placeOrderFromCart({ addressId: selectedAddressId })
      const resData = backendOrder.data || backendOrder || {};
      const appOrderId =
        resData?._id ||
        resData?.id ||
        resData?.orderId ||
        resData?.order?._id ||
        resData?.order?.id ||
        backendOrder?.orderId ||
        backendOrder?._id;

      if (!appOrderId) {
        console.error('Missing order ID in response:', backendOrder);
        throw new Error('Could not find order ID from checkout response');
      }

      const orderRes = await createPaymentOrder(appOrderId)
      const rpOrderId = orderRes.data?.id || orderRes.data?.orderId || orderRes.id || orderRes.orderId
      const rpAmount = orderRes.data?.amount || orderRes.amount
      const rpCurrency = orderRes.data?.currency || orderRes.currency || 'INR'

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ''
      const loadRazorpay = () =>
        new Promise<void>((resolve, reject) => {
          if (typeof window === 'undefined') return reject(new Error('window undefined'))
          if ((window as any).Razorpay) return resolve()
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Failed to load Razorpay'))
          document.body.appendChild(script)
        })

      await loadRazorpay()

      await new Promise<void>((resolve, reject) => {
        const rzp = new (window as any).Razorpay({
          key: razorpayKey,
          amount: rpAmount,
          currency: rpCurrency,
          name: 'Checkout',
          description: 'Order Payment',
          order_id: rpOrderId,
          handler: async (response: any) => {
            try {
              await verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
              resolve()
            } catch (err) {
              console.error('Payment verification failed', err)
              reject(err)
            }
          },
          prefill: {
            name: normalizedAddress.name,
            email: formData.email || selectedAddress.email || '',
            contact: normalizedAddress.phone,
          },
          theme: { color: '#1a5f48' },
        })
        rzp.on('payment.failed', (resp: any) => reject(resp?.error || new Error('Payment failed')))
        rzp.open()
      })

      const orderId = appOrderId || 'ORDER'
      clearCart()
      setOrderPlaced(true)
      router.push(`/order-success?orderId=${orderId}`)
    } catch (error) {
      console.error('Failed to place order', error)
    } finally {
      setPlacingOrder(false)
      setPaymentLoading(false)
    }
  }

  const taxAmount = Math.round(totalPrice * 0.18)
  const finalTotal = totalPrice + taxAmount

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
            <Link href="/cart" className="text-primary hover:underline">Cart</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">Checkout</span>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Saved Addresses */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Your Addresses</h2>
                      {addresses.length === 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          No saved addresses yet. Add one to continue.
                        </p>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {isLoadingAddresses ? 'Loading...' : `${addresses.length} saved`}
                    </Badge>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {addresses.map((addr) => {
                      const id = addr._id || addr.id
                      const isSelected = selectedAddressId === id
                      return (
                        <Card
                          key={id}
                          className={`p-4 border-2 cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary/5' : 'border-border'
                            }`}
                          onClick={() => setSelectedAddressId(id)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                {addr.type && (
                                  <Badge variant="outline" className="text-[11px] uppercase tracking-wide">
                                    {addr.type}
                                  </Badge>
                                )}
                                {addr.isDefault && (
                                  <Badge className="text-[11px] bg-primary text-white">Default</Badge>
                                )}
                              </div>
                              <p className="mt-1 font-semibold text-foreground">
                                {addr.name || `${addr.firstName || ''} ${addr.lastName || ''}`.trim()}
                              </p>
                              <p className="text-sm text-muted-foreground">{addr.phone}</p>
                              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                {addr.addressLine1 || addr.address}
                                {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                                {addr.area ? `, ${addr.area}` : ''}
                                {addr.landmark ? `, ${addr.landmark}` : ''}
                                {addr.city ? `, ${addr.city}` : ''}
                                {addr.state ? `, ${addr.state}` : ''}
                                {addr.country ? `, ${addr.country}` : ''}
                                {addr.pincode ? ` - ${addr.pincode}` : ''}
                              </p>
                              {addr.email && (
                                <p className="text-xs text-muted-foreground mt-1">{addr.email}</p>
                              )}
                            </div>
                            {isSelected && <Check className="h-5 w-5 text-primary" />}
                          </div>
                          <div className="flex gap-3 mt-3">
                            <button
                              type="button"
                              className="text-sm text-primary hover:underline"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditAddress(addr)
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="text-sm text-destructive hover:underline"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteAddress(id)
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </Card>
                      )
                    })}
                    {!addresses.length && !isLoadingAddresses && (
                      <p className="text-sm text-muted-foreground">No saved addresses. Add one below.</p>
                    )}
                  </div>
                </div>

                {/* Add / Edit Address */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">
                      {editingAddressId ? 'Edit Address' : 'Add a New Address'}
                    </h2>
                    {editingAddressId && (
                      <button
                        type="button"
                        className="text-sm text-primary hover:underline"
                        onClick={resetForm}
                      >
                        Cancel edit
                      </button>
                    )}
                  </div>
                  {!showAddressForm ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-primary text-primary"
                      onClick={() => setShowAddressForm(true)}
                    >
                      Add Address
                    </Button>
                  ) : (
                    <form onSubmit={handleSaveAddress} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                        <Select
                          value={formData.type}
                          onValueChange={(val) => setFormData((p) => ({ ...p, type: val }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Home">Home</SelectItem>
                            <SelectItem value="Office">Office</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="addressLine1"
                        placeholder="Address Line 1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="addressLine2"
                        placeholder="Address Line 2 (optional)"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <Input
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          name="state"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          name="pincode"
                          placeholder="Pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <Input
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                          disabled={isSavingAddress}
                        >
                          {isSavingAddress ? 'Saving...' : editingAddressId ? 'Update Address' : 'Save Address'}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={resetForm}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Order Items</h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={`${item.productId}-${item.variantId}`}
                        className="flex justify-between items-center pb-3 border-b border-border last:border-0"
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">{item.size} × {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-foreground">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={!selectedAddressId || placingOrder}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
                >
                  {placingOrder ? 'Placing order...' : 'Place Order'}
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">
                          {item.size} × {item.quantity}
                        </span>
                        <span className="text-foreground font-medium">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

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
                    <span className="text-muted-foreground">Tax (18%)</span>
                    <span className="text-foreground">₹{taxAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary text-lg">
                      ₹{finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
