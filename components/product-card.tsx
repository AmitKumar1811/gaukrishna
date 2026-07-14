'use client'

import { Star, Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/products'
import { useCart } from '@/lib/cart-context'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addToCart, updateQuantity } = useCart()
  const minPrice = Math.min(...product.variants.map((v) => v.price))
  const maxOriginal = Math.max(...product.variants.map((v) => v.originalPrice))
  const discountPercent = Math.max(
    0,
    Math.round(((maxOriginal - minPrice) / maxOriginal) * 100)
  )

  const defaultVariant = product.variants.find(v => v.price === minPrice) || product.variants[0]
  const cartItem = items.find(item => item.productId === product.id && item.variantId === defaultVariant.id)
  const quantity = cartItem?.quantity || 0

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await addToCart({
      productId: product.id,
      variantId: defaultVariant.id,
      productName: product.name,
      size: defaultVariant.size,
      price: defaultVariant.price,
      quantity: 1
    })
  }

  const handleUpdate = async (e: React.MouseEvent, newQuantity: number) => {
    e.preventDefault()
    e.stopPropagation()
    await updateQuantity(product.id, defaultVariant.id, newQuantity)
  }

  return (
    <div className="group flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300">
      <Link href={`/products/${product.slug}`} className="relative overflow-hidden bg-[#f6f6f6] aspect-square block">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 320px, 60vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={false}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2 flex flex-col">
          {discountPercent > 0 && (
            <div className="bg-[#1a5f48] text-white px-2 py-1 rounded-full text-[11px] font-bold shadow-sm">
              {discountPercent}% OFF
            </div>
          )}
          {product.tags.includes('Best Seller') && (
            <div className="bg-[#1a5f48] text-white px-2 py-1 rounded-full text-[11px] font-bold shadow-sm flex items-center gap-1">
              Best Seller
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 space-y-3">
        {/* Title */}
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="font-serif text-lg font-bold text-[#1a5f48] line-clamp-2 min-h-[3.5rem] group-hover:text-[#154d3b] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(product.rating)
                    ? 'fill-secondary text-secondary'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price and Add to Cart (Pushed to bottom) */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">₹{maxOriginal.toLocaleString()}</span>
            <span className="text-lg font-bold text-[#1a5f48]">₹{minPrice.toLocaleString()}</span>
            <span className="text-[11px] text-gray-500">Best price with coupon</span>
          </div>
          {quantity > 0 ? (
            <div className="flex items-center gap-3 bg-white rounded-lg px-2 py-1.5 border-2 border-[#1a5f48]">
              <button onClick={(e) => handleUpdate(e, quantity - 1)} className="p-1 hover:bg-[#f0f0f0] rounded-md transition-colors text-[#1a5f48]">
                <Minus size={16} />
              </button>
              <span className="font-bold text-[#1a5f48] min-w-[1rem] text-center">{quantity}</span>
              <button onClick={(e) => handleUpdate(e, quantity + 1)} className="p-1 hover:bg-[#f0f0f0] rounded-md transition-colors text-[#1a5f48]">
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button onClick={handleAdd} className="px-5 py-2 border-2 border-[#1a5f48] text-[#1a5f48] font-bold rounded-lg hover:bg-[#1a5f48] hover:text-white transition-colors text-sm">
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

