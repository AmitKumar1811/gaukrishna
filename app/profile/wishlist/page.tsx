'use client'

import { useEffect, useState } from 'react'
import { userService } from '@/lib/user-service'
import { Loader2, Trash2, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

interface WishlistItem {
    _id: string;
    id: string; // If backend uses id
    name: string;
    image: string;
    price: number | string;
    originalPrice?: number | string;
    stock?: string;
    description?: string;
    images?: string[];
    gst_inclusive_price?: number;
    mrp?: number;
    slug?: string;
    variants?: {
        id: string;
        size: string;
        price: number;
        originalPrice: number;
        stock: number;
    }[];
}

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { addToCart } = useCart()

    const fetchWishlist = async () => {
        try {
            const data = await userService.getWishlist()
            setWishlist(Array.isArray(data) ? data : (data.products || []));
        } catch (error) {
            console.error('Failed to fetch wishlist:', error)
            toast.error('Failed to load wishlist')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchWishlist()
    }, [])

    const handleRemove = async (productId: string) => {
        try {
            // Optimistic update
            const currentWishlist = [...wishlist];
            setWishlist(wishlist.filter(item => (item._id || item.id) !== productId));

            await userService.removeFromWishlist(productId);
            toast.success('Removed from wishlist');

            // Re-fetch to sync state just in case
            // const updatedList = await userService.getWishlist();
            // setWishlist(Array.isArray(updatedList) ? updatedList : (updatedList.products || []));
        } catch (error) {
            console.error('Remove from wishlist failed:', error)
            toast.error('Failed to remove item')
            fetchWishlist(); // Revert on failure
        }
    }

    const handleAddToCart = async (item: WishlistItem) => {
        let variantId = 'default';
        let size = 'Standard';
        let price = typeof item.price === 'string' ? parseFloat(String(item.price).replace(/[^0-9.]/g, '')) : (Number(item.gst_inclusive_price) || Number(item.price) || 0);

        if (item.variants && item.variants.length > 0) {
            const variant = item.variants[0];
            variantId = variant.id;
            size = variant.size;
            price = variant.price;
        }

        await addToCart({
            productId: item._id || item.id,
            variantId: variantId,
            productName: item.name,
            size: size,
            price: price,
            quantity: 1
        })
        toast.success('Added to cart')
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-[#1a5f48]" />
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-2xl font-serif font-bold text-[#1a5f48] mb-8">My Wishlist</h1>

            {wishlist.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a5f48] text-white rounded hover:bg-[#154d3b] transition-colors"
                    >
                        Explore Products
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {wishlist.map((item) => {
                        const itemId = item._id || item.id;
                        const price = typeof item.price === 'number' ? `₹${item.price}` : (item.price || `₹${item.gst_inclusive_price || 0}`);
                        const originalPrice = item.originalPrice ? (typeof item.originalPrice === 'number' ? `₹${item.originalPrice}` : item.originalPrice) : (item.mrp ? `₹${item.mrp}` : null);
                        const image = item.image || (item.images && item.images[0]) || '/images/placeholder.jpg';

                        return (
                            <div key={itemId} className="flex flex-col sm:flex-row gap-6 border border-gray-100 rounded-lg p-6 bg-white hover:shadow-sm transition-all hover:border-[#1a5f48]/30">
                                <Link href={`/products/${item.slug || itemId}`} className="w-32 h-32 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                    <img src={image} alt={item.name} className="w-full h-full object-cover" />
                                </Link>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <Link href={`/products/${item.slug || itemId}`}>
                                                <h3 className="font-serif font-bold text-lg text-[#1a5f48] mb-2 hover:underline">{item.name}</h3>
                                            </Link>
                                            {/* Stock status if available */}
                                            {/* <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${item.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-700'
                                                }`}>
                                                {item.stock || 'In Stock'}
                                            </span> */}
                                        </div>

                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="font-bold text-lg text-gray-900">{price}</span>
                                            {originalPrice && (
                                                <span className="text-sm text-gray-400 line-through decoration-gray-400">{originalPrice}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-50 items-center">
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="px-6 py-2 bg-[#1a5f48] text-white text-sm font-medium rounded hover:bg-[#154d3b] transition-colors flex items-center gap-2"
                                        >
                                            <ShoppingCart size={16} />
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => handleRemove(itemId)}
                                            className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700 hover:underline"
                                        >
                                            <Trash2 size={16} />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
