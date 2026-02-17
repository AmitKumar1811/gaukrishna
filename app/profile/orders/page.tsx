'use client'

import { useEffect, useState } from 'react'
import { userService } from '@/lib/user-service'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface OrderItem {
    name: string;
    quantity: number;
    price?: number;
}

interface Order {
    orderId: string;
    _id: string; // Backend ID
    date: string;
    createdAt?: string;
    status: string;
    total: string | number;
    totalAmount?: number;
    items: OrderItem[];
}

export default function OrderPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await userService.getOrders()
                // Map backend data to UI structure if necessary
                const mappedOrders = data.map((order: any) => ({
                    orderId: order.orderId || `#ORD-${order._id?.slice(-6) || '0000'}`,
                    _id: order._id,
                    date: order.date || new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    status: order.status || 'Processing',
                    total: order.total || `₹${order.totalAmount || 0}`,
                    items: order.items || []
                }))
                setOrders(mappedOrders)
            } catch (error) {
                console.error('Failed to fetch orders:', error)
                toast.error('Failed to load orders')
            } finally {
                setIsLoading(false)
            }
        }

        fetchOrders()
    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-[#1a5f48]" />
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-2xl font-serif font-bold text-[#1a5f48] mb-8">Order History</h1>

            {orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a5f48] text-white rounded hover:bg-[#154d3b] transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.orderId} className="bg-white border border-gray-100 rounded-lg p-6 hover:shadow-sm transition-shadow">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-50 pb-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-lg text-[#1a5f48]">{order.orderId}</span>
                                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Shipped' ? 'bg-blue-50 text-blue-700' :
                                                'bg-yellow-50 text-yellow-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{order.date}</p>
                                </div>
                                <div className="text-right mt-2 sm:mt-0">
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="font-bold text-lg text-gray-900">{order.total}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span className="text-gray-700">{item.name}</span>
                                        <span className="text-gray-500">x{item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3 justify-end pt-2">
                                <button className="px-4 py-2 text-sm font-medium text-[#1a5f48] border border-[#1a5f48] rounded hover:bg-[#1a5f48] hover:text-white transition-colors">
                                    View Details
                                </button>
                                {order.status !== 'Delivered' ? (
                                    <button className="px-4 py-2 text-sm font-medium text-white bg-[#1a5f48] rounded hover:bg-[#154d3b] transition-colors">
                                        Track Order
                                    </button>
                                ) : (
                                    <button className="px-4 py-2 text-sm font-medium text-white bg-[#1a5f48] rounded hover:bg-[#154d3b] transition-colors">
                                        Buy Again
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
