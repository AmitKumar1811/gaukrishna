'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/product-card'
import Link from 'next/link'
import { products } from '@/lib/products'


export function ProductsSection() {
  const [activeTab, setActiveTab] = useState('All')
  const tabs = ['All', 'Ghee', 'Oils', 'Combo']

  const filteredProducts = activeTab === 'All'
    ? products.slice(0, 6)
    : products.filter(p => p.category === activeTab || (activeTab === 'Combo' && p.category === 'Combo')).slice(0, 6)

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a5f48] mb-2">
              Our Best Sellers
            </h2>
            <p className="text-muted-foreground">Handpicked favorites for your home.</p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab
                  ? 'bg-[#1a5f48] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 text-[#1a5f48] font-bold hover:underline underline-offset-4 transition-all"
          >
            View All Products &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1a5f48] text-[#1a5f48] rounded-full font-bold hover:bg-[#1a5f48] hover:text-white transition-colors"
          >
            View All Products &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
