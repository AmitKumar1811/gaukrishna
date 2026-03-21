import { Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const minPrice = Math.min(...product.variants.map((v) => v.price))
  const maxOriginal = Math.max(...product.variants.map((v) => v.originalPrice))
  const discountPercent = Math.max(
    0,
    Math.round(((maxOriginal - minPrice) / maxOriginal) * 100)
  )

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300">
        <div className="relative overflow-hidden bg-[#f6f6f6] aspect-[4/5]">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 320px, 50vw"
            className="object-contain group-hover:scale-105 transition-transform duration-300 p-5"
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
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-[#1a5f48] line-clamp-2 min-h-[3.5rem] group-hover:text-[#154d3b] transition-colors">
            {product.name}
          </h3>

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

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 line-through">₹{maxOriginal.toLocaleString()}</span>
              <span className="text-lg font-bold text-[#1a5f48]">₹{minPrice.toLocaleString()}</span>
              <span className="text-[11px] text-gray-500">Best price with coupon</span>
            </div>
            <button className="px-5 py-2 border-2 border-[#1a5f48] text-[#1a5f48] font-bold rounded-lg hover:bg-[#1a5f48] hover:text-white transition-colors text-sm">
              ADD
            </button>
          </div>
          <div className="text-[11px] text-[#1a5f48] bg-[#e9f3ec] border border-[#d8e6dd] rounded-md px-3 py-2">
            Save ₹{(maxOriginal - minPrice).toLocaleString()} — no other discounts
          </div>
        </div>
      </div>
    </Link>
  )
}
