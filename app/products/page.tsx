import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/products'
import Link from 'next/link'

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined
  const tag = typeof searchParams.tag === 'string' ? searchParams.tag : undefined
  const searchQuery = typeof searchParams.search === 'string' ? searchParams.search : undefined

  let filteredProducts = products
  let title = 'All Products'

  if (category) {
    filteredProducts = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase() ||
        (category.toLowerCase() === 'combo' && p.category.toLowerCase() === 'combo')
    )
    title = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    if (category.toLowerCase() === 'combo') title = 'Health Combos'
    if (category.toLowerCase() === 'atta') title = 'Premium Atta'
  } else if (tag) {
    filteredProducts = products.filter((p) =>
      p.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
    )
    title = tag.charAt(0).toUpperCase() + tag.slice(1)
  } else if (searchQuery) {
    filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    title = `Search Results for "${searchQuery}"`
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <div className="bg-gradient-to-b from-[#1a5f48]/5 to-background py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-[#1a5f48] transition-colors">Home</Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/products" className="text-muted-foreground hover:text-[#1a5f48] transition-colors">Products</Link>
              {title !== 'All Products' && (
                <>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-[#1a5f48] font-medium">{title}</span>
                </>
              )}
            </div>
            <h1 className="text-4xl font-serif font-bold text-[#1a5f48] mb-2">{title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {category === 'ghee' ? 'Pure A2 Desi Cow Ghee made from traditional Bilona method.' :
                category === 'oils' ? 'Cold-pressed oils extracted using traditional wood-pressing technique.' :
                  category === 'atta' ? 'Freshly stone-ground flour from premium grains.' :
                    'Premium A2 ghee, cold-pressed oils, and healthy staples sourced directly from farms.'}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or browse our other categories.</p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-[#1a5f48] text-white rounded hover:bg-[#154d3b] transition-colors"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
