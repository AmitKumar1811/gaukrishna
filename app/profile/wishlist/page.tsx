
const wishlist = [
    {
        image: '/images/image.webp',
        name: 'A2 Gir Cow Ghee - 5L Dolchi',
        price: '₹1450',
        originalPrice: '₹1600',
        stock: 'In Stock',
    },
    {
        image: '/images/image.webp',
        name: 'Wood-Pressed Groundnut Oil - 5L Tin Can',
        price: '₹1950',
        originalPrice: '₹2200',
        stock: 'Low Stock',
    },
]

export default function WishlistPage() {
    return (
        <div>
            <h1 className="text-2xl font-serif font-bold text-[#1a5f48] mb-8">My Wishlist</h1>
            <div className="space-y-6">
                {wishlist.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-6 border border-gray-100 rounded-lg p-6 bg-white hover:shadow-sm transition-all hover:border-[#1a5f48]/30">
                        <div className="w-32 h-32 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-serif font-bold text-lg text-[#1a5f48] mb-2">{item.name}</h3>
                                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${item.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-700'
                                        }`}>
                                        {item.stock}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 mb-4">
                                    <span className="font-bold text-lg text-gray-900">{item.price}</span>
                                    <span className="text-sm text-gray-400 line-through decoration-gray-400">{item.originalPrice}</span>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-gray-50 items-center">
                                <button className="px-6 py-2 bg-[#1a5f48] text-white text-sm font-medium rounded hover:bg-[#154d3b] transition-colors">
                                    Add to Cart
                                </button>
                                <button className="text-sm font-medium text-red-500 hover:text-red-700 hover:underline">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
