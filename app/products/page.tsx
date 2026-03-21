import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Product } from '@/lib/products'
import Link from 'next/link'
import { apiService } from '@/lib/api-service'

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function fetchProducts(params?: Record<string, any>): Promise<Product[]> {
  try {
    const response = await apiService.products.getAll(params)
    const rawData = response.data?.data || []
    return rawData.map((item: any) => ({
      id: item.id || item._id,
      slug: item.slug || item.id || item._id,
      name: item.name,
      image: Array.isArray(item.images) && item.images.length > 0
        ? (item.images[0].url || item.images[0])
        : '/images/image.webp',
      rating: item.rating || 0,
      reviews: item.review_count || 0,
      category: typeof item.category === 'object' ? item.category?.name : (item.category || 'Uncategorized'),
      categoryId: typeof item.category === 'object' ? (item.category?._id || item.category?.id) : undefined,
      description: item.short_description || item.description || '',
      fullDescription: item.description || '',
      tags: item.is_best_seller ? ['Best Seller'] : [],
      variants: item.variants && item.variants.length > 0
        ? item.variants.map((v: any) => ({
          id: v.id || v._id || Math.random().toString(),
          size: v.size || v.weight || 'Standard',
          price: v.price,
          originalPrice: v.mrp || v.price,
          quantity: v.stock?.toString() || '1'
        }))
        : [{
          id: 'default',
          size: item.weight ? `${item.weight}g` : 'Standard',
          price: item.price,
          originalPrice: item.mrp || item.price,
          quantity: item.stock?.toString() || '1'
        }],
      benefits: [],
      certifications: [],
    }))
  } catch (error) {
    console.error('Failed to load products:', error)
    return []
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined
  const categoryId = typeof resolvedSearchParams.categoryId === 'string' ? resolvedSearchParams.categoryId : undefined
  const tag = typeof resolvedSearchParams.tag === 'string' ? resolvedSearchParams.tag : undefined
  const searchQuery = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : undefined


  let products: Product[] = []
  try {
    const apiParams: Record<string, any> = {}
    if (categoryId) apiParams.categoryId = categoryId
    else if (category) apiParams.category = category
    if (tag) apiParams.tag = tag
    if (searchQuery) apiParams.search = searchQuery

    products = await fetchProducts(Object.keys(apiParams).length ? apiParams : undefined)

    console.log(products);
  } catch (error) {
    console.error(error)
  }

  let filteredProducts = products
  let title = 'All Products'

  if (categoryId) {
    filteredProducts = products.filter((p) => p.categoryId === categoryId)
    title = products.find((p) => p.categoryId === categoryId)?.category ?? 'Products'
  } else if (category) {
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
