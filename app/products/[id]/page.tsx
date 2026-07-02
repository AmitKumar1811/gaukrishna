'use client'
import { useState, useEffect, use } from 'react'
import { Footer } from '@/components/footer'
import { Product, mapApiProductToProduct } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Star, Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { getProductBySlug } from '@/app/api/api-service'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const productId = resolvedParams.id

  const [product, setProduct] = useState<Product | null>(null)
  const { addToCart } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<Product['variants'][number] | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({})

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({ transformOrigin: `${x}% ${y}%` })
  }

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      try {
        const response = await getProductBySlug(productId)
        const rawData = response.data?.data || response.data;
        if (!rawData || !rawData.name) {
          setProduct(null)
          setSelectedVariant(null)
          return
        }

        const data: Product = mapApiProductToProduct(rawData)

        setProduct(data)
        setSelectedVariant(data.variants[0] ?? null)
      } catch (error) {
        console.error(error)
        setProduct(null)
        setSelectedVariant(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-2">Loading product...</h1>
            <p className="text-muted-foreground">Please wait a moment.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
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

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    if (selectedVariant) {
      await addToCart({
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

  const handleBuyNow = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    if (selectedVariant) {
      await addToCart({
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
            <div className="flex flex-col gap-4">
              <div 
                className="relative flex items-center justify-center rounded-lg overflow-hidden h-[500px] cursor-crosshair bg-muted"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => {
                  setIsZoomed(false)
                  setZoomStyle({})
                }}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                  className={`w-full h-full object-cover transition-transform duration-100 ease-out pointer-events-none ${isZoomed ? 'scale-[2]' : 'scale-100'}`}
                  style={isZoomed ? zoomStyle : {}}
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setProduct({...product, image: img})} 
                      className={`w-20 h-20 flex-shrink-0 border-2 rounded-lg overflow-hidden transition-colors ${product.image === img ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} ${idx}`} 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}
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
              {product.variants.length > 1 && (
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
              )}

              {/* Pricing */}
              {selectedVariant && (
                <div className="mb-6">
                  {product.variants.length <= 1 && (
                    <div className="text-sm font-semibold text-muted-foreground mb-2 bg-muted/50 w-fit px-3 py-1 rounded-md">
                      Size: {selectedVariant.size}
                    </div>
                  )}
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
                  className="flex-1 border-[#1a5f48] text-[#1a5f48] hover:bg-[#1a5f48] hover:text-white font-bold h-12 text-sm tracking-wider uppercase rounded-md transition-colors"
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
                  className="flex-1 bg-[#1a5f48] text-white hover:bg-[#154d3b] font-bold h-12 text-sm tracking-wider uppercase rounded-md transition-colors"
                >
                  Buy Now
                </Button>
              </div>

              {/* Benefits and Ingredients Summary */}
              {(product.benefitsHtml || (product.benefits && product.benefits.length > 0)) && (
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-3">Key Benefits</h3>
                  {product.benefitsHtml ? (
                    <div 
                      className="text-sm text-muted-foreground space-y-2 [&>ul]:space-y-2 [&>ul>li]:flex [&>ul>li]:items-start [&>ul>li]:gap-2 [&>ul>li]:before:content-['✓'] [&>ul>li]:before:text-primary [&>ul>li]:before:font-bold"
                      dangerouslySetInnerHTML={{ __html: product.benefitsHtml }}
                    />
                  ) : (
                    <ul className="space-y-2">
                      {product.benefits.slice(0, 4).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              
              {product.ingredientsHtml && (
                <div className="border-t border-border pt-6 mt-6">
                  <h3 className="font-semibold text-foreground mb-3">Ingredients</h3>
                  <div 
                    className="text-sm text-muted-foreground space-y-2 [&>ul]:list-disc [&>ul]:pl-4"
                    dangerouslySetInnerHTML={{ __html: product.ingredientsHtml }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Full Description */}
          <div className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-primary mb-4">About This Product</h2>
            <div 
               className="text-muted-foreground leading-relaxed mb-8 space-y-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1" 
               dangerouslySetInnerHTML={{ __html: product.fullDescription }} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* All Benefits */}
              {(product.benefitsHtml || (product.benefits && product.benefits.length > 0)) && (
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Complete Benefits</h3>
                  {product.benefitsHtml ? (
                    <div 
                      className="text-sm text-muted-foreground space-y-2 [&>ul]:space-y-2 [&>ul>li]:flex [&>ul>li]:items-start [&>ul>li]:gap-2 [&>ul>li]:before:content-['✓'] [&>ul>li]:before:text-primary [&>ul>li]:before:font-bold"
                      dangerouslySetInnerHTML={{ __html: product.benefitsHtml }}
                    />
                  ) : (
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

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
