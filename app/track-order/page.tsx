'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getOrderById } from '@/app/api/api-service'
import { Footer } from '@/components/footer'
import { Loader2, ExternalLink, Package } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

function TrackOrderContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const orderId = searchParams.get('orderId')
    
    const [order, setOrder] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(!!orderId)

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId) return
            try {
                const data = await getOrderById(orderId)
                setOrder(data)
            } catch (error) {
                console.error('Failed to fetch order:', error)
                toast.error('Failed to load tracking details')
            } finally {
                setIsLoading(false)
            }
        }
        fetchOrder()
    }, [orderId])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="h-10 w-10 animate-spin text-[#1a5f48] mx-auto mb-4" />
                    <p className="text-gray-500">Fetching tracking details...</p>
                </div>
            </div>
        )
    }

    if (order) {
        const waybill = order.delhiveryWaybill || order.shipmentWaybill
        const status = order.delhiveryShipmentStatus || order.orderStatus || 'Processing'
        const displayStatus = status.charAt(0).toUpperCase() + status.slice(1)
        const trackingUrl = waybill ? `https://www.delhivery.com/track/package/${waybill}` : null

        return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <div className="w-16 h-16 bg-[#1a5f48]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="h-8 w-8 text-[#1a5f48]" />
                    </div>
                    
                    <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Order Tracking</h1>
                    <p className="text-gray-500 mb-8">Order #{order.razorpayOrderId || order._id?.slice(-6)}</p>

                    <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Current Status</p>
                                <p className="font-semibold text-gray-900">{displayStatus}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Waybill Number</p>
                                <p className="font-semibold text-gray-900">{waybill || 'Pending Allocation'}</p>
                            </div>
                        </div>
                    </div>

                    {trackingUrl ? (
                        <a 
                            href={trackingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-[#1a5f48] text-white rounded-lg hover:bg-[#154d3b] transition-colors font-semibold gap-2"
                        >
                            Track Live on Delhivery
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    ) : (
                        <p className="text-gray-500 italic">Live tracking link will be available once the order is manifested.</p>
                    )}
                    
                    <div className="mt-8">
                        <Link href={`/profile/orders/${order._id}`} className="text-[#1a5f48] hover:underline text-sm">
                            ← Back to Order Details
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    // Fallback manual entry form if no orderId in URL
    return (
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
            <h1 className="text-4xl font-bold font-serif text-[#1a5f48] mb-8">Track Your Order</h1>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.
            </p>
            <div className="max-w-md mx-auto space-y-4">
                <input
                    type="text"
                    placeholder="Order ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#1a5f48] focus:border-[#1a5f48]"
                />
                <input
                    type="email"
                    placeholder="Billing Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#1a5f48] focus:border-[#1a5f48]"
                />
                <button className="w-full bg-[#1a5f48] text-white py-3 rounded hover:bg-[#154d3b] transition-colors font-semibold">
                    Track
                </button>
            </div>
        </div>
    )
}

export default function TrackOrderPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-1">
                <Suspense fallback={
                    <div className="flex justify-center items-center min-h-[60vh]">
                        <Loader2 className="h-8 w-8 animate-spin text-[#1a5f48]" />
                    </div>
                }>
                    <TrackOrderContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    )
}
