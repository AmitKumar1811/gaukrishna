import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import Link from 'next/link'
import ProductsFilters from './products-filters'
import {
  buildProductsPageLink,
  computeProductsPagination,
  fetchCategories,
  fetchProducts,
  getProductsPageDescription,
  getProductsPageTitle,
  parseProductsPageQuery,
  type SearchParamsRecord,
} from './products-page-helpers'

import type { Metadata } from 'next'

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const resolvedSearchParams = (await searchParams) as SearchParamsRecord
  const query = parseProductsPageQuery(resolvedSearchParams)
  
  return {
    title: getProductsPageTitle(query) + ' - Gau Krishna',
    description: getProductsPageDescription(query),
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = (await searchParams) as SearchParamsRecord
  const query = parseProductsPageQuery(resolvedSearchParams)
  const priceBounds = { min: 0, max: 10000 }

  const [productsResult, uniqueCategories] = await Promise.all([
    fetchProducts(resolvedSearchParams),
    fetchCategories()
  ])

  const products = productsResult.products
  const title = getProductsPageTitle(query, products)
  const description = getProductsPageDescription(query.category)

  const { totalPages, currentPage } = computeProductsPagination({
    backendTotalPages: productsResult.totalPages,
    totalItems: productsResult.total,
    productsLength: products.length,
    limit: query.limit,
    requestedPage: query.page,
  })

  const buildPageLink = (targetPage: number) =>
    buildProductsPageLink(resolvedSearchParams, targetPage, query.limit)

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
              {description}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ProductsFilters
            categories={uniqueCategories}
            priceBounds={priceBounds}
            initialFilters={{
              search: query.search,
              category: query.category,
              categoryId: query.categoryId,
              minPrice: query.minPrice,
              maxPrice: query.maxPrice,
              isBestSeller: query.isBestSeller,
              isNewLaunch: query.isNewLaunch,
              page: currentPage,
              limit: query.limit,
            }}
          />
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
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
