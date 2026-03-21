"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { LayoutGrid, Tag, Star, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { apiService } from "@/lib/api-service"
import { iconMap } from "@/lib/fallback-data"
import Link from "next/link"

type CategoryItem = {
  icon: typeof LayoutGrid
  name: string
  id?: string
  href?: string
}

type DisplayProduct = {
  id: string | number
  name: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  discount: string
  label?: string
  badgeType?: string
  bestSeller?: boolean
  weight?: string
  saveAmount: number
}

export function Categories() {
  const [categories, setCategories] = useState<CategoryItem[]>([{ icon: LayoutGrid, name: "All", href: "/products" }])
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(undefined)
  const [products, setProducts] = useState<DisplayProduct[]>([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true)
  const [isProductsLoading, setIsProductsLoading] = useState(true)



  useEffect(() => {
    let cancelled = false

    const loadCategories = async () => {
      setIsCategoriesLoading(true)
      try {
        const response = await apiService.categories?.getAll?.()
        const rawCategories = response.data;

        const mappedCategories: CategoryItem[] = rawCategories
          .map((cat: any) => {
            const slug = (cat?.slug || cat?.name || "").toString().toLowerCase().trim()
            if (!slug) return null
            const icon = iconMap[slug] ?? LayoutGrid
            return {
              icon,
              name: cat.name || slug,
              id: cat._id || cat.id,
            }
          })
          .filter(Boolean) as CategoryItem[]

        if (!cancelled && mappedCategories.length) {
          const withAll = [...mappedCategories, { icon: LayoutGrid, name: "All", href: "/products" }]
          setCategories(withAll)
          setActiveCategory(mappedCategories[0].name)
          setActiveCategoryId(mappedCategories[0].id)
        }
      } catch (error) {
        console.error("Failed to fetch categories", error)
      } finally {
        if (!cancelled) setIsCategoriesLoading(false)
      }
    }
    loadCategories()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const loadProducts = async () => {
      setIsProductsLoading(true)
      try {
        const params = activeCategoryId ? { categoryId: activeCategoryId } : undefined
        const response = await apiService.products.getAll(params)
        const rawData = response.data?.data || []

        const mappedProducts: DisplayProduct[] = rawData.map((item: any) => {
          const price = Number(item.price) || 0
          const originalPrice = Number(item.mrp || item.price) || price
          const discountPercent =
            originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
          return {
            id: item.id || item._id,
            name: item.name,
            image:
              Array.isArray(item.images) && item.images.length > 0
                ? (item.images[0].url || item.images[0])
                : "/images/image.webp",
            price,
            originalPrice,
            rating: item.rating || 0,
            reviews: item.review_count || 0,
            discount: discountPercent > 0 ? `${discountPercent}% OFF` : "",
            label: item.is_best_seller ? "Top Rated Choice" : "",
            badgeType: item.is_best_seller ? "trending" : "bolt",
            bestSeller: !!item.is_best_seller,
            weight: item.weight ? `${item.weight}g` : undefined,
            saveAmount: Math.max(0, originalPrice - price),
          }
        })

        if (!cancelled) {
          setProducts(mappedProducts)
        }
      } catch (error) {
        console.error("Failed to load products:", error)
      } finally {
        if (!cancelled) setIsProductsLoading(false)
      }
    }

    loadProducts()
    return () => {
      cancelled = true
    }
  }, [activeCategoryId])

  return (
    <section className="py-8 bg-[#f8faf7] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex md:hidden overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 px-2 pb-4">
            {isCategoriesLoading
              ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 min-w-[72px] snap-start animate-pulse"
                >
                  <div className="h-14 w-14 rounded-full border-2 border-[#1a5f48]/30 bg-white" />
                  <div className="h-3 w-12 rounded bg-[#1a5f48]/20" />
                </div>
              ))
              : categories.map((category) => {
                const isActive = activeCategory === category.name
                return (
                  <button
                    key={category.name}
                    onClick={() => {
                      setActiveCategory(category.name)
                      setActiveCategoryId(category.id)
                    }}
                    className="group flex flex-col items-center gap-2 min-w-[72px] snap-start"
                  >
                    <div
                      className={`h-14 w-14 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${isActive
                        ? "bg-[#1a5f48] border-[#1a5f48] text-white"
                        : "bg-white border-[#1a5f48] text-[#1a5f48]"
                        }`}
                    >
                      <category.icon
                        strokeWidth={1.5}
                        className="h-6 w-6"
                      />
                    </div>
                    <span
                      className={`text-xs font-semibold tracking-wide whitespace-nowrap ${isActive ? "text-[#1a5f48]" : "text-gray-600"
                        }`}
                    >
                      {category.name}
                    </span>
                  </button>
                )
              })}
          </div>

          {/* Desktop: Centered Wrap */}
          <div className="hidden md:flex flex-wrap justify-center items-center gap-10">
            {isCategoriesLoading
              ? Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 animate-pulse">
                  <div className="h-16 w-16 rounded-full border-2 border-[#1a5f48]/30 bg-white" />
                  <div className="h-3 w-16 rounded bg-[#1a5f48]/20" />
                </div>
              ))
              : categories.map((category) => {
                const isActive = activeCategory === category.name
                return (
                  <button
                    key={category.name}
                    onClick={() => {
                      setActiveCategory(category.name)
                      setActiveCategoryId(category.id)
                    }}
                    className="group flex flex-col items-center gap-2"
                  >
                    <div
                      className={`h-16 w-16 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${isActive
                        ? "bg-[#1a5f48] border-[#1a5f48] text-white"
                        : "bg-white border-[#1a5f48] text-[#1a5f48] hover:bg-[#e8f3ee]"
                        }`}
                    >
                      <category.icon
                        strokeWidth={1.5}
                        className="h-7 w-7"
                      />
                    </div>
                    <span
                      className={`text-sm font-semibold tracking-wide ${isActive ? "text-[#1a5f48]" : "text-gray-600"
                        }`}
                    >
                      {category.name}
                    </span>
                  </button>
                )
              })}
          </div>
        </div>

        {/* Products Grid/Slider */}
        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0">
          {isProductsLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="min-w-[260px] md:min-w-0 snap-center bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-100" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-5 w-48 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-8 w-full bg-gray-200 rounded" />
                </div>
              </div>
            ))
            : products.map((product) => (
              <div
                key={product.id}
                className="min-w-[260px] md:min-w-0 snap-center group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-0 left-0 z-10">
                    <div className="bg-[#1a5f48] text-white text-[10px] font-bold px-2 py-1.5 rounded-br-xl">
                      {product.discount}
                    </div>
                  </div>
                )}

                {/* Best Seller Badge */}
                {product.bestSeller && (
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-[#1a5f48] text-white text-[10px] font-bold px-2 py-1 rounded-bl-xl flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Best Seller
                    </div>
                  </div>
                )}

                {/* Product Image */}
                <div className="relative aspect-square w-full bg-white p-6 group-hover:bg-gray-50 transition-colors">
                  <Image
                    src={product.image}
                    alt={product.name}
                    sizes="(min-width: 1024px) 280px, 100vw"
                    fill
                    className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4 pt-1 flex flex-col gap-3 flex-1">
                  {/* Label (Top Rated / Selling Fast) */}
                  <div className="flex items-center justify-between min-h-[24px]">
                    {product.label && (
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold ${product.badgeType === 'trending' ? 'bg-[#e7f5ef] text-[#1a5f48]' : 'bg-[#fff4e5] text-[#b96b00]'
                        }`}>
                        {product.badgeType === 'trending' ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <Zap className="h-3 w-3 fill-current" />
                        )}
                        {product.label}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-[15px] leading-tight font-bold text-gray-900 line-clamp-2 h-[40px]">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  {/* Price and Add Button */}
                  <div className="flex items-end justify-between mt-auto pt-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    </div>
                    <Button
                      variant="outline"
                      className="border-[#1a5f48] text-[#1a5f48] hover:bg-[#1a5f48] hover:text-white font-bold h-8 px-4 text-xs tracking-wider uppercase rounded-md transition-colors"
                    >
                      ADD
                    </Button>
                  </div>

                  {/* Savings Footer */}
                  <div className="mt-2 bg-[#ecfdf5] text-[#1a5f48] text-[10px] font-bold px-2 py-1.5 rounded flex items-center gap-1.5 w-full">
                    <Tag className="h-3 w-3" />
                    <span>
                      Save ₹{product.saveAmount} {product.saveAmount > 3000 ? '- no other discounts' : 'with coupon'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#1a5f48] font-bold border border-[#1a5f48] rounded-full hover:bg-[#1a5f48] hover:text-white transition-all shadow-sm text-sm"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  )
}
