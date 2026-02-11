import { Star } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const minPrice = Math.min(...product.variants.map((v) => v.price))

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image container */}
        <div className="relative overflow-hidden bg-muted aspect-square">
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 space-y-2 flex flex-col">
            {product.tags.map((tag, idx) => (
              <div
                key={idx}
                className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-bold"
              >
                {tag.includes('OFF') ? tag : tag}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-3 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(product.rating)
                      ? 'fill-secondary text-secondary'
                      : 'text-muted'
                  }
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg font-bold text-primary">₹{minPrice.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">onwards</span>
          </div>

          {/* View button */}
          <button className="w-full py-2 px-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
            View Details
          </button>
        </div>
      </div>
    </Link>
  )
}
