
const orders = [
    {
        orderId: '#GK-001',
        date: 'February 10, 2025',
        status: 'Shipped',
        total: '₹2,350',
        items: [
            { name: 'A2 Gir Cow Ghee - 1L', quantity: 1 },
            { name: 'Wood-Pressed Mustard Oil - 500ml', quantity: 1 }
        ],
    },
    {
        orderId: '#GK-002',
        date: 'January 25, 2025',
        status: 'Delivered',
        total: '₹1,200',
        items: [
            { name: 'Bilona-Churned Desi Buffalo Ghee - 500ml', quantity: 1 }
        ],
    },
    {
        orderId: '#GK-003',
        date: 'January 15, 2025',
        status: 'Processing',
        total: '₹560',
        items: [
            { name: 'Wood-Pressed Coconut Oil - 500ml', quantity: 1 }
        ],
    },
]

export default function OrderPage() {
    return (
        <div>
            <h1 className="text-2xl font-serif font-bold text-[#1a5f48] mb-8">Order History</h1>
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
        </div>
    )
}
