'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getOrderById } from '@/app/api/api-service'
import { Loader2, ArrowLeft, Package, MapPin, Check } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Footer } from '@/components/footer'

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

    const statusStr = order.orderStatus || order.status || 'processing'
    const displayStatus = statusStr.charAt(0).toUpperCase() + statusStr.slice(1).toLowerCase()
    const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown Date'
    const displayOrderId = order.razorpayOrderId || `#ORD-${order._id?.slice(-6) || '0000'}`

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Link href="/profile/orders" className="inline-flex items-center text-sm text-gray-500 hover:text-[#1a5f48] mb-8 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Orders
                    </Link>

                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="p-6 sm:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-1">Order {displayOrderId}</h1>
                                <p className="text-sm text-gray-500">Placed on {dateStr}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide ${
                                    displayStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                                    ['Shipped', 'Transit', 'In transit'].includes(displayStatus) ? 'bg-blue-50 text-blue-700' :
                                    'bg-yellow-50 text-yellow-700'
                                }`}>
                                    {displayStatus}
                                </span>
                                {['Shipped', 'Transit', 'In transit'].includes(displayStatus) && (
                                    <Link href={`/track-order?orderId=${order.orderId || order._id}`}>
                                        <button className="px-4 py-2 text-sm font-medium text-white bg-[#1a5f48] rounded-full hover:bg-[#154d3b] transition-colors shadow-sm">
                                            Track Order
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="p-6 sm:p-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Package className="h-5 w-5 text-[#1a5f48]" />
                                Items Ordered
                            </h2>
                            <div className="space-y-4 mb-8">
                                {order.products?.map((item: any, idx: number) => {
                                    const prod = item.productId || {}
                                    return (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                {prod.image && (
                                                    <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded-md border border-gray-200" />
                                                )}
                                                <div>
                                                    <p className="font-medium text-gray-900">{prod.name || 'Product'}</p>
                                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-gray-900 text-right">
                                                ₹{(item.priceSnapshot * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {order.addressSnapshot && (
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-[#1a5f48]" />
                                            Shipping Address
                                        </h2>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p className="font-medium text-gray-900">{order.addressSnapshot.fullName}</p>
                                            <p>{order.addressSnapshot.addressLine}</p>
                                            <p>{order.addressSnapshot.city}, {order.addressSnapshot.state} - {order.addressSnapshot.pincode}</p>
                                            <p>{order.addressSnapshot.country}</p>
                                            <p className="pt-2">Phone: {order.addressSnapshot.phone}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Check className="h-5 w-5 text-[#1a5f48]" />
                                        Order Summary
                                    </h2>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Payment Status</span>
                                            <span className="text-gray-900 font-medium capitalize">{order.paymentStatus || 'pending'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Tracking Info</span>
                                            <span className="text-gray-900 font-medium">{order.delhiveryWaybill || order.shipmentWaybill || 'Not assigned yet'}</span>
                                        </div>
                                        <div className="pt-4 mt-4 border-t border-gray-200 flex justify-between">
                                            <span className="font-bold text-gray-900">Total Amount</span>
                                            <span className="font-bold text-lg text-[#1a5f48]">₹{(order.totalAmount || 0).toLocaleString()}</span>
                                        </div>
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
