'use client'
import { useState, useEffect } from 'react'
import { Footer } from '@/components/footer'
import { getProductById, products } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Star, Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [product, setProduct] = useState(getProductById(params.id))
  const { addToCart } = useCart()
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0])
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [isLoading, setIsLoading] = useState(!product)

  useEffect(() => {
    if (!product) {
      const found = getProductById(params.id)
      setProduct(found)
      setSelectedVariant(found?.variants[0])
      setIsLoading(false)
    }
  }, [params.id, product])

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-2">Product not found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        productName: product.name,
        size: selectedVariant.size,
        price: selectedVariant.price,
        quantity,
      })
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  const handleBuyNow = () => {
    if (selectedVariant) {
      addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        productName: product.name,
        size: selectedVariant.size,
        price: selectedVariant.price,
        quantity,
      })
      router.push('/checkout')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary hover:underline">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/products" className="text-primary hover:underline">Products</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground line-clamp-1">{product.name}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-muted rounded-lg p-8">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(product.rating)
                              ? 'fill-secondary text-secondary'
                              : 'text-muted'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Variants */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Select Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 border-2 rounded-lg transition-colors text-sm font-medium ${selectedVariant?.id === variant.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-foreground hover:border-primary/50'
                        }`}
                    >
                      <div className="font-semibold">{variant.size}</div>
                      <div className="text-xs mt-1">₹{variant.price.toLocaleString()}</div>
                      {variant.originalPrice > variant.price && (
                        <div className="text-xs text-secondary line-through">
                          ₹{variant.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              {selectedVariant && (
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">
                      ₹{(selectedVariant.price * quantity).toLocaleString()}
                    </span>
                    {selectedVariant.originalPrice > selectedVariant.price && (
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{(selectedVariant.originalPrice * quantity).toLocaleString()}
                      </span>
                    )}
                  </div>
                  {selectedVariant.originalPrice > selectedVariant.price && (
                    <div className="text-sm text-secondary font-medium">
                      Save ₹
                      {(
                        (selectedVariant.originalPrice - selectedVariant.price) *
                        quantity
                      ).toLocaleString()}
                    </div>
                  )}
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-2 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-border rounded-lg hover:border-primary flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-border rounded-lg hover:border-primary flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mb-8">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="lg"
                  className="flex-1 bg-transparent"
                >
                  {addedToCart ? (
                    <span className="flex items-center gap-2">
                      <Check size={20} /> Added to Cart
                    </span>
                  ) : (
                    'Add to Cart'
                  )}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  size="lg"
                  className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Buy Now
                </Button>
              </div>

              {/* Benefits */}
              <div className="border-t border-border pt-6">
                <h3 className="font-semibold text-foreground mb-3">Key Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.slice(0, 4).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-primary mb-4">About This Product</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.fullDescription}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* All Benefits */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Complete Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Quality Certifications</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-muted rounded-lg text-sm text-center text-foreground font-medium border border-border"
                    >
                      {cert}
                    </div>
                  ))}
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
