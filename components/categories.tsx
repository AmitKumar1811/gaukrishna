"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutGrid,
  Snowflake,
  Utensils,
  Droplet,
  Package,
  Wheat,
  Tag,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { icon: LayoutGrid, name: "New", href: "/products?sort=new" },
  { icon: Snowflake, name: "Ghee", href: "/products?category=ghee" },
  { icon: Utensils, name: "Oil", href: "/products?category=oil" },
  { icon: Droplet, name: "Deals", href: "/products?tag=deals" },
  { icon: Package, name: "Superfoods", href: "/products?category=superfoods" },
  { icon: Wheat, name: "Combo", href: "/products?category=combo" },
  { icon: Tag, name: "Under ₹499", href: "/products?price_lt=499" },
  { icon: Sparkles, name: "Under ₹999", href: "/products?price_lt=999" },
  { icon: LayoutGrid, name: "All", href: "/products" },
]

const products = [
  {
    id: 1,
    name: "Ghee Giants Combo - 5L + 5L",
    image: "/images/image.webp",
    price: 16653,
    originalPrice: 21350,
    rating: 4.8,
    reviews: 203,
    discount: "22% OFF",
    label: "Top Rated Choice",
    badgeType: "trending",
    weight: "10L",
    saveAmount: 4697,
  },
  {
    id: 2,
    name: "Khapli Atta 5 Kg Combo Pack of 2 - 5kg + 5kg",
    image: "/images/image.webp",
    price: 1547,
    originalPrice: 2200,
    rating: 4.7,
    reviews: 99,
    discount: "30% OFF",
    label: "Selling Fast",
    badgeType: "bolt",
    weight: "10kg",
    saveAmount: 653,
  },
  {
    id: 3,
    name: "A2 Gir Cow Ghee - 5L Dolchi",
    image: "/images/a2-ghee.webp",
    price: 10913,
    originalPrice: 11250,
    rating: 4.5,
    reviews: 673,
    discount: "3% OFF",
    label: "Top Rated Choice",
    bestSeller: true,
    badgeType: "trending",
    weight: "5L",
    saveAmount: 337,
  },
  {
    id: 4,
    name: "A2 Desi Cow Ghee - 5L Dolchi",
    image: "/images/a2-ghee.webp",
    price: 9797,
    originalPrice: 10100,
    rating: 4.7,
    reviews: 1382,
    discount: "3% OFF",
    label: "Top Rated Choice",
    bestSeller: true,
    badgeType: "trending",
    weight: "5L",
    saveAmount: 303,
  },
  {
    id: 5,
    name: "Bilona-Churned Desi Buffalo Ghee - 5L Dolchi",
    image: "/images/a2-ghee.webp",
    price: 6548,
    originalPrice: 6750,
    rating: 4.4,
    reviews: 202,
    discount: "3% OFF",
    label: "Top Rated Choice",
    bestSeller: true,
    badgeType: "trending",
    weight: "5L",
    saveAmount: 202,
  },
]

export function Categories() {
  const [activeCategory, setActiveCategory] = useState("New")

  return (
    <section className="py-8 bg-[#f8faf7] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Categories Tab Navigation */}
        <div className="mb-12">
          {/* Mobile: Horizontal Scroll */}
          <div className="flex md:hidden overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 px-2 pb-4">
            {categories.map((category) => {
              const isActive = activeCategory === category.name
              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
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
            {categories.map((category) => {
              const isActive = activeCategory === category.name
              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
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
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[260px] md:min-w-0 snap-center group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Discount Badge */}
              <div className="absolute top-0 left-0 z-10">
                <div className="bg-[#1a5f48] text-white text-[10px] font-bold px-2 py-1.5 rounded-br-xl">
                  {product.discount}
                </div>
              </div>

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
