import Link from 'next/link'
import {
  LayoutGrid,
  Snowflake,
  Utensils,
  Droplet,
  Package,
  Wheat,
  Tag,
  Sparkles
} from 'lucide-react'

const categories = [
  { icon: LayoutGrid, name: 'All', href: '/products' },
  { icon: Snowflake, name: 'Winter Picks', href: '/products?tag=winter' },
  { icon: Utensils, name: 'Ghee', href: '/products?category=ghee' },
  { icon: Droplet, name: 'Oils', href: '/products?category=oils' },
  { icon: Package, name: 'Combos', href: '/products?category=combo' },
  { icon: Wheat, name: 'Atta', href: '/products?category=atta' },
  { icon: Tag, name: 'Deal', href: '/products?tag=deal' },
  { icon: Sparkles, name: 'Superfoods', href: '/products?tag=superfood' },
]

export function Categories() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#1a5f48]/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#1a5f48] font-bold tracking-widest uppercase text-sm">Shop by Category</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            Welcome To <span className="text-[#1a5f48]">Gau Krishna!</span>
          </h2>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            Experience the essence of purity with our range of traditional products.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#1a5f48]/20 hover:-translate-y-1"
            >
              <div className="h-20 w-20 mb-4 rounded-full bg-[#dcf0e8]/30 flex items-center justify-center group-hover:bg-[#1a5f48] transition-colors duration-300">
                <category.icon
                  strokeWidth={1.5}
                  className="h-10 w-10 text-[#1a5f48] group-hover:text-white transition-colors duration-300"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1a5f48] transition-colors">
                {category.name}
              </h3>
              <span className="text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                Explore &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
