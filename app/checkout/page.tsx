'use client'

import React, { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { Footer } from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Check } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { 
  getAllAddresses, 
  createAddress, 
  editAddress, 
  removeAddress, 
  placeOrderFromCart, 
  buyNow,
  createPaymentOrder, 
  verifyPayment,
  checkStock,
  getProductById,
  validateCoupon
} from '@/app/api/api-service'
import { clearStoredCoupon, getStoredCoupon, storeCoupon, type AppliedCoupon } from '@/lib/coupon-storage'
import { normalizeIndianPhone, validateIndianPhone } from '@/lib/validation'
import { IndianPhoneInput } from '@/components/ui/indian-phone-input'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function normalizeAddressesList(res: any): any[] {
  if (Array.isArray(res)) return res
  if (Array.isArray(res?.data?.data)) return res.data.data
  if (Array.isArray(res?.data)) return res.data
  return []
}

function hasValidAuthToken(): boolean {
  if (typeof window === 'undefined') return false
  const token = localStorage.getItem('token')
  return Boolean(token && token !== 'null' && token !== 'undefined' && token.trim() !== '')
}

function formatSizeFromWeight(weight: unknown): string {
  if (!weight) return 'Standard'
  const trimmed = String(weight).trim()
  if (!trimmed) return 'Standard'
  return /[a-zA-Z]$/.test(trimmed) ? trimmed : `${trimmed}g`
}

function formatStockFailureMessage(res: any): string {
  const rows = Array.isArray(res?.data) ? res.data : []
  const unavailable = rows.filter(
    (d: any) =>
      d &&
      (d.inStock === false ||
        d.isActive === false ||
        (typeof d.availableStock === 'number' &&
          typeof d.requestedQuantity === 'number' &&
          d.availableStock < d.requestedQuantity))
  )
  const details = unavailable
    .map((d: any) =>
      d.isActive === false
        ? `${d.name || 'Item'} (unavailable)`
        : `${d.name || 'Item'} (available: ${d.availableStock ?? 0})`
    )
    .join(', ')

  return (
    res?.message ||
    (details
      ? `Out of stock / insufficient stock: ${details}`
      : 'Some items are out of stock or the requested quantity is not available.')
  )
}

function CheckoutForm() {
  const router = useRouter()
  const { items, isLoaded: isCartLoaded, totalPrice, clearCart, syncCart } = useCart()
  const [authChecked, setAuthChecked] = useState(false)
  const [addresses, setAddresses] = useState<any[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true)
  const [isSavingAddress, setIsSavingAddress] = useState(false)
  const [addressError, setAddressError] = useState('')
  const [phoneError, setPhoneError] = useState('')
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
    country: 'India',
    pincode: '',
  })
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const [stockIssueError, setStockIssueError] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null)
  const [couponError, setCouponError] = useState('')
  const [couponLoading, setCouponLoading] = useState(false)

  const searchParams = useSearchParams()
  const isBuyNow = searchParams?.get('type') === 'buynow'
  const buyNowProductId = searchParams?.get('productId')
  const buyNowVariantId = searchParams?.get('variantId') || 'default'
  const parsedQuantity = searchParams?.get('quantity') ? parseInt(searchParams?.get('quantity') as string, 10) : 1
  const buyNowQuantity = Number.isFinite(parsedQuantity) && parsedQuantity > 0 ? parsedQuantity : 1
  const [buyNowProduct, setBuyNowProduct] = useState<any>(null)
  const [isLoadingBuyNow, setIsLoadingBuyNow] = useState(false)
  const [buyNowError, setBuyNowError] = useState('')

  useEffect(() => {
    if (!hasValidAuthToken()) {
      const currentQuery = searchParams?.toString()
      const target = currentQuery ? `/checkout?${currentQuery}` : '/checkout'
      router.replace(`/login?redirect=${encodeURIComponent(target)}`)
      return
    }
    setAuthChecked(true)
  }, [router, searchParams])

  useEffect(() => {
    if (!authChecked) return
    if (isBuyNow) {
      if (!buyNowProductId) {
        setBuyNowProduct(null)
        setBuyNowError('No product specified for Buy Now checkout')
        setIsLoadingBuyNow(false)
        return
      }

      setIsLoadingBuyNow(true)
      setBuyNowError('')
      setStockIssueError('')
      getProductById(buyNowProductId)
        .then(async (res) => {
          const productData = res?.data?.data || res?.data
          if (!productData || !productData.name) {
            setBuyNowProduct(null)
            setBuyNowError('Product not found')
            return
          }
          setBuyNowProduct(productData)

          const resolvedPid = productData._id || productData.id || buyNowProductId
          try {
            const stockRes = await checkStock([{ productId: resolvedPid, quantity: buyNowQuantity }])
            const hasRowFailure = Array.isArray(stockRes?.data) && stockRes.data.some(
              (d: any) =>
                d &&
                (d.inStock === false ||
                  d.isActive === false ||
                  (typeof d.availableStock === 'number' &&
                    typeof d.requestedQuantity === 'number' &&
                    d.availableStock < d.requestedQuantity))
            )
            if ((stockRes && (stockRes.allInStock === false || stockRes.success === false)) || hasRowFailure) {
              setStockIssueError(formatStockFailureMessage(stockRes))
            }
          } catch (stockErr) {
            console.error('Failed to pre-check Buy Now stock:', stockErr)
          }
        })
        .catch((err) => {
          console.error(err)
          setBuyNowProduct(null)
          setBuyNowError(err.response?.data?.message || 'Failed to load product details')
        })
        .finally(() => {
          setIsLoadingBuyNow(false)
        })
    }
  }, [authChecked, isBuyNow, buyNowProductId, buyNowQuantity])

  const matchedBuyNowVariant =
    Array.isArray(buyNowProduct?.variants) && buyNowProduct.variants.length > 0
      ? (buyNowProduct.variants.find((v: any) => (v.id || v._id) === buyNowVariantId) || buyNowProduct.variants[0])
      : null

  const buyNowResolvedProductId = buyNowProduct?._id || buyNowProduct?.id || (buyNowProductId as string)
  const buyNowResolvedVariantId = matchedBuyNowVariant ? (matchedBuyNowVariant.id || matchedBuyNowVariant._id || 'default') : 'default'
  const buyNowUnitPrice = matchedBuyNowVariant?.price ?? buyNowProduct?.price ?? 0
  const buyNowSize = matchedBuyNowVariant
    ? (matchedBuyNowVariant.size || formatSizeFromWeight(matchedBuyNowVariant.weight) || 'Standard')
    : formatSizeFromWeight(buyNowProduct?.weight)

  const displayItems = isBuyNow
    ? (buyNowProduct ? [{
        productId: buyNowResolvedProductId,
        variantId: buyNowResolvedVariantId,
        productName: buyNowProduct.name || buyNowProduct.title || 'Product',
        size: buyNowSize,
        price: buyNowUnitPrice,
        quantity: buyNowQuantity
      }] : [])
    : items

  const displayTotalPrice = isBuyNow
    ? (buyNowProduct ? buyNowUnitPrice * buyNowQuantity : 0)
    : totalPrice

  useEffect(() => {
    if (!authChecked) return

    const loadAddresses = async () => {
      setIsLoadingAddresses(true)
      try {
        const res = await getAllAddresses()
        const list = normalizeAddressesList(res)
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
    if (!isBuyNow) {
      const stored = getStoredCoupon()
      if (stored) {
        setAppliedCoupon(stored)
        setCouponCode(stored.code)
      }
    }
  }, [authChecked, isBuyNow])

  useEffect(() => {
    if (!authChecked || isBuyNow || !isCartLoaded) return
    if (items.length === 0) {
      setStockIssueError('')
      return
    }
    let cancelled = false
    syncCart({ silent: true }).then((res) => {
      if (cancelled) return
      if (!res.ok) {
        setStockIssueError(res.message || 'Some items in your cart are out of stock.')
      } else {
        setStockIssueError('')
      }
    })
    return () => {
      cancelled = true
    }
  }, [authChecked, isBuyNow, isCartLoaded, items, syncCart])

  useEffect(() => {
    if (!authChecked || !hasValidAuthToken()) return
    const stored = getStoredCoupon()
    if (!stored || !displayTotalPrice || displayTotalPrice <= 0) return
    setCouponCode(stored.code)
    validateCoupon({ code: stored.code, subtotal: displayTotalPrice })
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
  }, [authChecked, displayTotalPrice])

  if (!authChecked) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Redirecting to login...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!isBuyNow && !isCartLoaded) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading checkout...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (displayItems.length === 0 && !orderPlaced && !isBuyNow) {
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
    if (name === 'phone') {
      const trimmed = value.trim()
      if (trimmed && !/^[+]?[\d\s()-]+$/.test(trimmed)) {
        setPhoneError('Phone number can only contain digits')
      } else if (phoneError) {
        setPhoneError(validateIndianPhone(value) || '')
      }
    }
    if (addressError) setAddressError('')
  }

  const handlePhoneBlur = () => {
    setPhoneError(validateIndianPhone(formData.phone) || '')
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
      country: 'India',
      pincode: '',
    })
    setEditingAddressId(null)
    setAddressError('')
    setPhoneError('')
    setShowAddressForm(false)
  }

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddressError('')
    setPhoneError('')

    const phoneValidationError = validateIndianPhone(formData.phone)
    const pincodeDigits = formData.pincode.replace(/\D/g, '')
    if (!formData.name.trim()) {
      setAddressError('Please enter a full name')
      return
    }
    if (phoneValidationError) {
      setPhoneError(phoneValidationError)
      return
    }
    if (!formData.addressLine1.trim()) {
      setAddressError('Please enter Address Line 1')
      return
    }
    if (!formData.city.trim() || !formData.state.trim()) {
      setAddressError('Please enter both City and State')
      return
    }
    if (pincodeDigits.length !== 6) {
      setAddressError('Please enter a valid 6-digit pincode')
      return
    }

    setIsSavingAddress(true)
    const payload = {
      name: formData.name.trim(),
      type: formData.type || 'Home',
      email: formData.email.trim(),
      phone: normalizeIndianPhone(formData.phone),
      addressLine1: formData.addressLine1.trim(),
      addressLine2: formData.addressLine2.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      country: formData.country.trim() || 'India',
      pincode: pincodeDigits,
    }
    try {
      const previousIds = new Set(addresses.map((a) => a._id || a.id))
      if (editingAddressId) {
        await editAddress(editingAddressId, payload)
      } else {
        await createAddress(payload)
      }
      const res = await getAllAddresses()
      const list = normalizeAddressesList(res)
      setAddresses(list)
      const createdAddr = list.find((a) => !previousIds.has(a._id || a.id))
      const fallbackLast = list.length > 0 ? (list[list.length - 1]._id || list[list.length - 1].id) : null
      const newId = editingAddressId || createdAddr?._id || createdAddr?.id || fallbackLast
      if (newId) setSelectedAddressId(newId)
      toast.success(editingAddressId ? 'Address updated successfully' : 'Address added successfully')
      resetForm()
    } catch (error: any) {
      console.error('Failed to save address', error)
      const msg = error?.response?.data?.message || 'Failed to save address. Please check details and try again.'
      setAddressError(msg)
      toast.error(msg)
    } finally {
      setIsSavingAddress(false)
    }
  }

  const handleEditAddress = (address: any) => {
    setEditingAddressId(address._id || address.id)
    setAddressError('')
    setPhoneError('')
    setFormData({
      name: address.name || `${address.firstName || ''} ${address.lastName || ''}`.trim(),
      type: address.type || 'Home',
      email: address.email || '',
      phone: address.phone || '',
      addressLine1: address.addressLine1 || address.address || '',
      addressLine2: address.addressLine2 || '',
      city: address.city || '',
      state: address.state || '',
      country: address.country || 'India',
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
      toast.success('Address removed')
    } catch (error: any) {
      console.error('Failed to delete address', error)
      toast.error(error?.response?.data?.message || 'Failed to delete address')
    }
  }

  const deliveryFee = appliedCoupon
    ? appliedCoupon.shippingFee
    : (displayTotalPrice > 0 && displayTotalPrice < 500 ? 50 : 0)
  const discount = appliedCoupon?.discount || 0
  const finalTotal = appliedCoupon ? appliedCoupon.total : displayTotalPrice + deliveryFee

  const handlePlaceOrder = async () => {
    setCheckoutError('')
    if (!selectedAddressId) {
      setCheckoutError('Please select a delivery address')
      return
    }
    const selectedAddress = addresses.find((a) => (a._id || a.id) === selectedAddressId)
    if (!selectedAddress) {
      setCheckoutError('Selected address not found. Please pick or add an address.')
      return
    }
    if (isBuyNow && !buyNowProduct) {
      setCheckoutError(buyNowError || 'Product details are unavailable.')
      return
    }
    if (!isBuyNow && items.length === 0) {
      setCheckoutError('Your cart is empty.')
      return
    }

    const normalizedAddress = {
      type: selectedAddress.type || 'Home',
      name:
        selectedAddress.name ||
        `${selectedAddress.firstName || ''} ${selectedAddress.lastName || ''}`.trim() ||
        'Customer',
      phone: normalizeIndianPhone(selectedAddress.phone || ''),
      addressLine1: selectedAddress.addressLine1 || selectedAddress.address || '',
      addressLine2: selectedAddress.addressLine2 || selectedAddress.landmark || selectedAddress.area || '',
      city: selectedAddress.city || '',
      state: selectedAddress.state || '',
      country: selectedAddress.country || 'India',
      pincode: selectedAddress.pincode || '',
      ...(selectedAddress.email || formData.email ? { email: selectedAddress.email || formData.email } : {}),
    }

    setPlacingOrder(true)
    try {
      // Stock validation for BOTH Buy Now and Cart Checkout before order creation
      const stockPayload = isBuyNow
        ? [{ productId: buyNowResolvedProductId, quantity: buyNowQuantity }]
        : items.map((item) => ({ productId: item.productId, quantity: item.quantity }))

      const stockRes = await checkStock(stockPayload)
      const stockRows = Array.isArray(stockRes?.data) ? stockRes.data : []
      const hasUnavailable = stockRows.some(
        (d: any) =>
          d &&
          (d.inStock === false ||
            d.isActive === false ||
            (typeof d.availableStock === 'number' &&
              typeof d.requestedQuantity === 'number' &&
              d.availableStock < d.requestedQuantity))
      )
      if ((stockRes && (stockRes.allInStock === false || stockRes.success === false)) || hasUnavailable) {
        const msg = formatStockFailureMessage(stockRes)
        setStockIssueError(msg)
        setCheckoutError(msg)
        toast.error(msg)
        return
      }

      setPaymentLoading(true)

      let backendOrder: any
      if (isBuyNow && buyNowProductId) {
        // Buy Now flow ignores local storage and sends payload directly
        backendOrder = await buyNow({
          productId: buyNowResolvedProductId,
          quantity: buyNowQuantity,
          address: normalizedAddress,
          ...(appliedCoupon?.code ? { couponCode: appliedCoupon.code } : {}),
          ...(buyNowResolvedVariantId && buyNowResolvedVariantId !== 'default' ? { variantId: buyNowResolvedVariantId } : {}),
        })
      } else {
        // Cart Checkout flow
        backendOrder = await placeOrderFromCart({
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            ...(i.variantId && i.variantId !== 'default' ? { variantId: i.variantId } : {}),
          })),
          address: normalizedAddress,
          ...(appliedCoupon?.code ? { couponCode: appliedCoupon.code } : {}),
        })
      }

      const resData = backendOrder?.data || backendOrder || {}
      const appOrderId =
        resData?._id ||
        resData?.id ||
        resData?.orderId ||
        resData?.order?._id ||
        resData?.order?.id ||
        backendOrder?.orderId ||
        backendOrder?._id

      if (!appOrderId) {
        console.error('Missing order ID in response:', backendOrder)
        throw new Error('Could not find order ID from checkout response')
      }

      const orderRes = await createPaymentOrder(appOrderId)
      const rpOrderId = orderRes?.data?.id || orderRes?.data?.orderId || orderRes?.id || orderRes?.orderId
      const rpAmount = orderRes?.data?.amount || orderRes?.amount
      const rpCurrency = orderRes?.data?.currency || orderRes?.currency || 'INR'

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || orderRes?.data?.key || orderRes?.key || ''
      if (!razorpayKey) {
        throw new Error('Payment gateway key is not configured')
      }
      if (!rpOrderId || !rpAmount) {
        throw new Error('Failed to initialize payment order')
      }

      const loadRazorpay = () =>
        new Promise<void>((resolve, reject) => {
          if (typeof window === 'undefined') return reject(new Error('window undefined'))
          if ((window as any).Razorpay) return resolve()
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Failed to load Razorpay checkout SDK'))
          document.body.appendChild(script)
        })

      await loadRazorpay()

      let verifyResult: any = null
      await new Promise<void>((resolve, reject) => {
        const RazorpayCtor = (window as any).Razorpay
        if (typeof RazorpayCtor !== 'function') {
          reject(new Error('Payment gateway failed to initialize'))
          return
        }
        const rzp = new RazorpayCtor({
          key: razorpayKey,
          amount: rpAmount,
          currency: rpCurrency,
          name: 'Gau Krishna',
          description: 'Order Payment',
          order_id: rpOrderId,
          handler: async (response: any) => {
            try {
              verifyResult = await verifyPayment({
                razorpay_order_id: response?.razorpay_order_id || rpOrderId,
                razorpay_payment_id: response?.razorpay_payment_id,
                razorpay_signature: response?.razorpay_signature,
              })
              resolve()
            } catch (err) {
              console.error('Payment verification failed', err)
              reject(err)
            }
          },
          modal: {
            ondismiss: () => {
              reject(new Error('Payment cancelled by user. Please try again.'))
            },
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

      const orderId =
        verifyResult?.order?.customOrderId ||
        resData?.customOrderId ||
        resData?.order?.customOrderId ||
        appOrderId ||
        'ORDER'
      if (!isBuyNow) {
        clearCart()
      }
      clearStoredCoupon()
      setOrderPlaced(true)
      router.push(`/order-success?orderId=${encodeURIComponent(orderId)}&total=${finalTotal}`)
    } catch (error: any) {
      console.error('Failed to place order', error)
      const msg =
        error?.response?.data?.message ||
        error?.description ||
        error?.message ||
        'Failed to place order. Please try again.'
      setCheckoutError(msg)
      toast.error(msg)
    } finally {
      setPlacingOrder(false)
      setPaymentLoading(false)
    }
  }

  const handleApplyCoupon = async () => {
    setCouponError('')
    if (!couponCode.trim()) {
      setCouponError('Enter a coupon code')
      return
    }
    if (!displayTotalPrice || displayTotalPrice <= 0) {
      setCouponError('Add items or wait for product details to load before applying a coupon')
      return
    }
    if (!hasValidAuthToken()) {
      setCouponError('Please login to apply a coupon')
      return
    }
    setCouponLoading(true)
    try {
      const result = await validateCoupon({ code: couponCode.trim(), subtotal: displayTotalPrice })
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
                            <SelectItem value="Work">Work</SelectItem>
                            <SelectItem value="Office">Office</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {addressError && (
                        <p className="text-sm text-destructive">{addressError}</p>
                      )}
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      <div>
                        <IndianPhoneInput
                          id="checkout-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={(val) => {
                            setFormData((prev) => ({ ...prev, phone: val }))
                            const trimmed = val.trim()
                            if (trimmed && !/^[+]?[\d\s()-]+$/.test(trimmed)) {
                              setPhoneError('Phone number can only contain digits')
                            } else if (phoneError) {
                              setPhoneError(validateIndianPhone(val) || '')
                            }
                            if (addressError) setAddressError('')
                          }}
                          onBlur={handlePhoneBlur}
                          error={Boolean(phoneError)}
                          heightClassName="[&_.react-tel-input_.form-control]:!h-10"
                          placeholder="Phone Number (10-digit mobile)"
                          required
                        />
                        {phoneError && (
                          <p className="text-sm text-destructive mt-1">{phoneError}</p>
                        )}
                      </div>
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
                    {isBuyNow && isLoadingBuyNow && (
                      <p className="text-sm text-muted-foreground">Loading product details...</p>
                    )}
                    {isBuyNow && buyNowError && (
                      <p className="text-sm text-destructive">{buyNowError}</p>
                    )}
                    {displayItems.map((item) => (
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

                {(stockIssueError || checkoutError) && (
                  <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">Unable to proceed with order</p>
                      <p>{checkoutError || stockIssueError}</p>
                      {!isBuyNow && stockIssueError && (
                        <Link href="/cart" className="mt-1 inline-block font-semibold underline text-red-900">
                          Review your cart
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={
                    !selectedAddressId ||
                    placingOrder ||
                    paymentLoading ||
                    Boolean(stockIssueError) ||
                    (isBuyNow && (!buyNowProduct || isLoadingBuyNow || Boolean(buyNowError)))
                  }
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
                >
                  {paymentLoading
                    ? 'Opening payment...'
                    : placingOrder
                      ? 'Placing order...'
                      : 'Place Order'}
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  {displayItems.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="text-sm">
                      <div className="flex justify-between gap-2 mb-1">
                        <span className="text-muted-foreground">
                          {item.productName} ({item.size}) × {item.quantity}
                        </span>
                        <span className="text-foreground font-medium shrink-0">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

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
                    <span className="text-foreground">₹{displayTotalPrice.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Coupon ({appliedCoupon?.code})</span>
                      <span className="text-primary font-semibold">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">{deliveryFee > 0 ? `₹${deliveryFee}` : 'Free'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">Included in price</span>
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutForm />
    </Suspense>
  )
}
