'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getOrderById } from '@/app/api/api-service'
import { Loader2, ArrowLeft, Package, MapPin, Receipt, Truck, Banknote, CreditCard } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function OrderDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const orderId = params.id as string
    const [order, setOrder] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId) return
            try {
                const data = await getOrderById(orderId)
                setOrder(data)
            } catch (error) {
                console.error('Failed to fetch order details:', error)
                toast.error('Failed to load order details')
                router.push('/profile/orders')
            } finally {
                setIsLoading(false)
            }
        }
        fetchOrder()
    }, [orderId, router])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-[#1a5f48]" />
            </div>
        )
    }

    if (!order) return null

    const statusStr = order.delhiveryShipmentStatus || order.orderStatus || order.status || 'processing'
    const displayStatus = statusStr.charAt(0).toUpperCase() + statusStr.slice(1).toLowerCase()
    const orderStatusStr = order.orderStatus ? order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1).toLowerCase() : null
    const dateStr = order.createdAt
        ? new Date(order.createdAt).toLocaleString('en-IN', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        : 'Unknown Date'
    const displayOrderId = order.customOrderId ? `#${order.customOrderId}` : (order.razorpayOrderId || `#ORD-${order._id?.slice(-6) || '0000'}`)
    const waybill = order.delhiveryWaybill || order.shipmentWaybill
    const isCod = String(order.paymentMethod || '').toUpperCase() === 'COD'
    const paymentStatusRaw = String(order.paymentStatus || 'pending').toLowerCase()
    const paymentStatusLabel =
        isCod && paymentStatusRaw === 'pending'
            ? 'Pay on Delivery'
            : paymentStatusRaw.charAt(0).toUpperCase() + paymentStatusRaw.slice(1)
    const subtotal = typeof order.subtotal === 'number'
        ? order.subtotal
        : (order.products || []).reduce((sum: number, item: any) => sum + (Number(item.priceSnapshot) || 0) * (Number(item.quantity) || 1), 0)
    const shippingFee = Number(order.shippingFee) || 0
    const codFee = Number(order.codFee) || 0
    const discountAmount = Number(order.discountAmount) || 0
    const trackingHistory = Array.isArray(order.trackingHistory)
        ? [...order.trackingHistory].sort(
            (a, b) => new Date(b.statusDateTime || b.createdAt || 0).getTime() - new Date(a.statusDateTime || a.createdAt || 0).getTime()
        )
        : []

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Link href="/profile/orders" className="inline-flex items-center text-sm text-gray-500 hover:text-[#1a5f48] mb-6 sm:mb-8 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Orders
                    </Link>

                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="p-6 sm:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <div className="flex flex-wrap items-center gap-2.5 mb-1">
                                    <h1 className="text-2xl font-bold text-gray-900">Order {displayOrderId}</h1>
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${isCod ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-[#1a5f48] border border-emerald-200'}`}>
                                        {isCod ? <Banknote className="h-3.5 w-3.5" /> : <CreditCard className="h-3.5 w-3.5" />}
                                        {isCod ? 'COD' : 'Prepaid'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">Placed on {dateStr}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide ${displayStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                                        ['Shipped', 'Transit', 'In transit'].includes(displayStatus) ? 'bg-blue-50 text-blue-700' :
                                            displayStatus === 'Cancelled' ? 'bg-red-50 text-red-700' :
                                                'bg-yellow-50 text-yellow-700'
                                    }`}>
                                    {displayStatus}
                                </span>
                                {(waybill || ['Shipped', 'Transit', 'In transit', 'Manifested', 'Confirmed'].includes(displayStatus)) && (
                                    <Link href={`/track-order?orderId=${encodeURIComponent(order.customOrderId || order.orderId || order._id)}`}>
                                        <button className="px-4 py-2 text-sm font-medium text-white bg-[#1a5f48] rounded-full hover:bg-[#154d3b] transition-colors shadow-sm">
                                            Track Order
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-8">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Package className="h-5 w-5 text-[#1a5f48]" />
                                    Items Ordered ({order.products?.reduce((sum: number, i: any) => sum + (Number(i.quantity) || 1), 0) || 0})
                                </h2>
                                <div className="space-y-4">
                                    {order.products?.map((item: any, idx: number) => {
                                        const prod = item.productId || {}
                                        const unitPrice = Number(item.priceSnapshot) || 0
                                        const qty = Number(item.quantity) || 1
                                        return (
                                            <div key={idx} className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-4 min-w-0">
                                                    {prod.image && (
                                                        <img src={prod.image} alt={prod.name || 'Product'} className="w-16 h-16 object-cover rounded-md border border-gray-200 shrink-0" />
                                                    )}
                                                    <div className="min-w-0">
                                                        {prod.slug ? (
                                                            <Link href={`/products/${prod.slug}`} className="font-medium text-gray-900 hover:text-[#1a5f48] transition-colors block truncate">
                                                                {prod.name || 'Product'}
                                                            </Link>
                                                        ) : (
                                                            <p className="font-medium text-gray-900 truncate">{prod.name || 'Product'}</p>
                                                        )}
                                                        <p className="text-sm text-gray-500 mt-0.5">
                                                            ₹{unitPrice.toLocaleString()} × {qty}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="font-semibold text-gray-900 text-right shrink-0">
                                                    ₹{(unitPrice * qty).toLocaleString()}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {order.addressSnapshot && (
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-[#1a5f48]" />
                                            Shipping Address
                                        </h2>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p className="font-medium text-gray-900">{order.addressSnapshot.fullName}</p>
                                            <p>{order.addressSnapshot.addressLine}</p>
                                            {order.addressSnapshot.landmark && <p>{order.addressSnapshot.landmark}</p>}
                                            <p>{order.addressSnapshot.city}, {order.addressSnapshot.state} - {order.addressSnapshot.pincode}</p>
                                            <p>{order.addressSnapshot.country || 'India'}</p>
                                            <p className="pt-2 font-medium text-gray-800">Phone: {order.addressSnapshot.phone}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Receipt className="h-5 w-5 text-[#1a5f48]" />
                                        Order & Payment Summary
                                    </h2>
                                    <div className="space-y-2.5 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Payment Method</span>
                                            <span className="text-gray-900 font-medium">
                                                {isCod ? 'Cash on Delivery (COD)' : 'Online Payment'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Payment Status</span>
                                            <span className={`font-medium ${paymentStatusRaw === 'paid' ? 'text-green-700' : paymentStatusRaw === 'failed' ? 'text-red-600' : 'text-amber-700'}`}>
                                                {paymentStatusLabel}
                                            </span>
                                        </div>
                                        {orderStatusStr && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Order Status</span>
                                                <span className="text-gray-900 font-medium">{orderStatusStr}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Waybill / Tracking ID</span>
                                            <span className="text-gray-900 font-medium">{waybill || 'Not assigned yet'}</span>
                                        </div>
                                        {order.razorpayPaymentId && (
                                            <div className="flex justify-between gap-2">
                                                <span className="text-gray-500">Payment ID</span>
                                                <span className="text-gray-900 font-mono text-xs">{order.razorpayPaymentId}</span>
                                            </div>
                                        )}

                                        <div className="pt-3 mt-3 border-t border-gray-200 space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Subtotal</span>
                                                <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                                            </div>
                                            {discountAmount > 0 && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">
                                                        Discount{order.couponCode ? ` (${order.couponCode})` : ''}
                                                    </span>
                                                    <span className="text-[#1a5f48] font-medium">-₹{discountAmount.toLocaleString()}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Shipping Fee</span>
                                                <span className="text-gray-900">{shippingFee > 0 ? `₹${shippingFee.toLocaleString()}` : 'Free'}</span>
                                            </div>
                                            {codFee > 0 && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">COD Charge</span>
                                                    <span className="text-gray-900">₹{codFee.toLocaleString()}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between items-center">
                                            <span className="font-bold text-gray-900">
                                                {isCod && paymentStatusRaw === 'pending' ? 'Payable on Delivery' : 'Total Amount'}
                                            </span>
                                            <span className="font-bold text-lg text-[#1a5f48]">₹{(order.totalAmount || 0).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {trackingHistory.length > 0 && (
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Truck className="h-5 w-5 text-[#1a5f48]" />
                                        Shipment Updates
                                    </h2>
                                    <div className="space-y-4">
                                        {trackingHistory.map((event: any, idx: number) => {
                                            const eventTime = event.statusDateTime || event.createdAt
                                            const formattedTime = eventTime
                                                ? new Date(eventTime).toLocaleString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })
                                                : ''
                                            return (
                                                <div key={idx} className="flex gap-3">
                                                    <div className="flex flex-col items-center">
                                                        <div className={`w-3 h-3 rounded-full mt-1.5 ${idx === 0 ? 'bg-[#1a5f48]' : 'bg-gray-300'}`} />
                                                        {idx < trackingHistory.length - 1 && (
                                                            <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                                                        )}
                                                    </div>
                                                    <div className="pb-2 flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                                            <p className="font-semibold text-sm text-gray-900">{event.status || 'Update'}</p>
                                                            {formattedTime && (
                                                                <span className="text-xs text-gray-500">{formattedTime}</span>
                                                            )}
                                                        </div>
                                                        {event.instructions && (
                                                            <p className="text-sm text-gray-600 mt-0.5">{event.instructions}</p>
                                                        )}
                                                        {event.location && (
                                                            <p className="text-xs text-gray-500 mt-0.5">{event.location}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
