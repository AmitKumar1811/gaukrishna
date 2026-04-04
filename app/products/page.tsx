import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Product } from '@/lib/products'
import Link from 'next/link'
import { apiService } from '@/lib/api-service'
import ProductsFilters from './products-filters'

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function fetchCategories(): Promise<{ label: string, id: string }[]> {
  try {
    const response = await apiService.categories.getAll()
    const rawData = response.data?.data || response.data || []
    return rawData.map((item: any) => ({
      id: item._id || item.id || '',
      label: item.name || 'Uncategorized'
    })).filter((c: any) => c.id && c.label)
  } catch (error) {
    console.error('Failed to load categories:', error)
    return []
  }
}

async function fetchProducts(params?: Record<string, any>): Promise<{ products: Product[], total: number, totalPages?: number }> {
  try {
    const response = await apiService.products.getAll(params);
    const rawData = response.data?.data || []
    const products = rawData.map((item: any) => ({
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
      isBestSeller: !!item.is_best_seller,
      isNewLaunch: !!item.is_new_launch,
    }))
    return {
      products,
      total: response.data?.total || rawData.length,
      totalPages: response.data?.totalPages
    }
  } catch (error) {
    console.error('Failed to load products:', error)
    return { products: [], total: 0 }
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined
  const categoryId = typeof resolvedSearchParams.categoryId === 'string' ? resolvedSearchParams.categoryId : undefined
  const tag = typeof resolvedSearchParams.tag === 'string' ? resolvedSearchParams.tag : undefined
  const searchQuery = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : undefined
  const minPriceParam = resolvedSearchParams.minPrice || resolvedSearchParams.min_price
  const maxPriceParam = resolvedSearchParams.maxPrice || resolvedSearchParams.max_price
  const minPrice = typeof minPriceParam === 'string' ? Number(minPriceParam) : undefined
  const maxPrice = typeof maxPriceParam === 'string' ? Number(maxPriceParam) : undefined
  const isBestSeller = resolvedSearchParams.is_best_seller === 'true'
  const isNewLaunch = resolvedSearchParams.is_new_launch === 'true'
  const page = Number(resolvedSearchParams.page) || 1
  const limit = Number(resolvedSearchParams.limit) || 10

  let products: Product[] = []
  let totalItems = 0
  let backendTotalPages: number | undefined
  try {

    const apiParams: Record<string, any> = { ...resolvedSearchParams }
    apiParams.page = page
    apiParams.limit = limit

    const result = await fetchProducts(Object.keys(apiParams).length ? apiParams : undefined)
    products = result.products
    totalItems = result.total
    backendTotalPages = result.totalPages
  } catch (error) {
    console.error(error)
  }

  let title = 'All Products'
  if (categoryId) {
    title = products.find((p) => p.categoryId === categoryId)?.category ?? 'Products'
  } else if (category) {
    title = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    if (category.toLowerCase() === 'combo') title = 'Health Combos'
    if (category.toLowerCase() === 'atta') title = 'Premium Atta'
  } else if (tag) {
    title = tag.charAt(0).toUpperCase() + tag.slice(1)
  } else if (searchQuery) {
    title = `Search Results for "${searchQuery}"`
  }

  const priceBounds = { min: 0, max: 10000 }

  const uniqueCategories = await fetchCategories();

  const computedTotalPages = backendTotalPages ? backendTotalPages : totalItems > 0 ? Math.ceil(totalItems / limit) : Math.ceil(products.length / limit)
  const totalPages = Math.max(1, computedTotalPages)
  const currentPage = Math.min(Math.max(page, 1), totalPages)
  const paginatedProducts = products;

  const buildPageLink = (targetPage: number) => {
    const params = new URLSearchParams()
    Object.entries(resolvedSearchParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => v && params.append(key, v))
      } else if (value) {
        params.set(key, value)
      }
    })
    params.set('page', targetPage.toString())
    params.set('limit', limit.toString())
    return `/products?${params.toString()}`
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
          <ProductsFilters
            categories={uniqueCategories}
            priceBounds={priceBounds}
            initialFilters={{
              search: searchQuery,
              category,
              categoryId,
              minPrice,
              maxPrice,
              isBestSeller,
              isNewLaunch,
              page: currentPage,
              limit,
            }}
          />
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProducts.map((product) => (
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
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <nav className="flex items-center gap-2" aria-label="Pagination">
                <Link
                  href={buildPageLink(Math.max(1, currentPage - 1))}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:border-[#1a5f48] hover:text-[#1a5f48] disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-disabled={currentPage === 1}
                >
                  Previous
                </Link>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNumber = idx + 1
                  return (
                    <Link
                      key={pageNumber}
                      href={buildPageLink(pageNumber)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg ${pageNumber === currentPage
                        ? 'bg-[#1a5f48] text-white'
                        : 'border border-gray-200 hover:border-[#1a5f48] hover:text-[#1a5f48]'
                        }`}
                    >
                      {pageNumber}
                    </Link>
                  )
                })}
                <Link
                  href={buildPageLink(Math.min(totalPages, currentPage + 1))}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:border-[#1a5f48] hover:text-[#1a5f48] disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-disabled={currentPage === totalPages}
                >
                  Next
                </Link>
              </nav>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
