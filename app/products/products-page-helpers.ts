import 'server-only'

import { apiService } from '@/lib/api-service'
import { Product, mapApiProductToProduct } from '@/lib/products'

export type SearchParamsRecord = { [key: string]: string | string[] | undefined }

export type ProductsPageQuery = {
  category?: string
  categoryId?: string
  tag?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  isBestSeller: boolean
  isNewLaunch: boolean
  page: number
  limit: number
}

const toStringValue = (value: string | string[] | undefined) => (typeof value === 'string' ? value : undefined)

const toNumberValue = (value: string | string[] | undefined) => {
  if (typeof value !== 'string') return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

export function parseProductsPageQuery(searchParams: SearchParamsRecord): ProductsPageQuery {
  const category = toStringValue(searchParams['category'])
  const categoryId = toStringValue(searchParams['categoryId'])
  const tag = toStringValue(searchParams['tag'])
  const search = toStringValue(searchParams['search'])

  const minPrice = toNumberValue(searchParams['minPrice']) ?? toNumberValue(searchParams['min_price'])
  const maxPrice = toNumberValue(searchParams['maxPrice']) ?? toNumberValue(searchParams['max_price'])
  const page = toNumberValue(searchParams['page']) ?? 1
  const limit = toNumberValue(searchParams['limit']) ?? 10

  const isBestSeller = searchParams['is_best_seller'] === 'true'
  const isNewLaunch = searchParams['is_new_launch'] === 'true'

  return {
    category,
    categoryId,
    tag,
    search,
    minPrice,
    maxPrice,
    isBestSeller,
    isNewLaunch,
    page,
    limit,
  }
}

export function buildProductsPageLink(searchParams: SearchParamsRecord, targetPage: number, limit: number) {
  const params = new URLSearchParams()
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => v && params.append(key, v))
      return
    }
    if (value) params.set(key, value)
  })

  params.set('page', String(targetPage))
  params.set('limit', String(limit))
  return `/products?${params.toString()}`
}

export function getProductsPageTitle(query: ProductsPageQuery, products: Product[]) {
  if (query.categoryId) {
    return products.find((p) => p.categoryId === query.categoryId)?.category ?? 'Products'
  }

  if (query.category) {
    const normalized = query.category.charAt(0).toUpperCase() + query.category.slice(1).toLowerCase()
    if (query.category.toLowerCase() === 'combo') return 'Health Combos'
    if (query.category.toLowerCase() === 'atta') return 'Premium Atta'
    return normalized
  }

  if (query.tag) return query.tag.charAt(0).toUpperCase() + query.tag.slice(1)
  if (query.search) return `Search Results for "${query.search}"`
  return 'All Products'
}

export function getProductsPageDescription(category?: string) {
  if (category === 'ghee') return 'Pure A2 Desi Cow Ghee made from traditional Bilona method.'
  if (category === 'oils') return 'Cold-pressed oils extracted using traditional wood-pressing technique.'
  if (category === 'atta') return 'Freshly stone-ground flour from premium grains.'
  return 'Premium A2 ghee, cold-pressed oils, and healthy staples sourced directly from farms.'
}

export function computeProductsPagination(opts: {
  backendTotalPages?: number
  totalItems: number
  productsLength: number
  limit: number
  requestedPage: number
}) {
  const computedTotalPages = opts.backendTotalPages
    ? opts.backendTotalPages
    : opts.totalItems > 0
      ? Math.ceil(opts.totalItems / opts.limit)
      : Math.ceil(opts.productsLength / opts.limit)

  const totalPages = Math.max(1, computedTotalPages)
  const currentPage = Math.min(Math.max(opts.requestedPage, 1), totalPages)
  return { totalPages, currentPage }
}

export async function fetchCategories(): Promise<{ label: string; id: string }[]> {
  try {
    const response = await apiService.categories.getAll()
    const rawData = response.data?.data || response.data || []
    return rawData
      .map((item: any) => ({
        id: item._id || item.id || '',
        label: item.name || 'Uncategorized',
      }))
      .filter((c: any) => c.id && c.label)
  } catch (error) {
    console.error('Failed to load categories:', error)
    return []
  }
}

export async function fetchProducts(params?: Record<string, any>): Promise<{
  products: Product[]
  total: number
  totalPages?: number
}> {
  try {
    const { data } = await apiService.products.getAll(params)
    const rawData = data?.data || []
    return {
      products: rawData.map(mapApiProductToProduct),
      total: data?.total || rawData.length,
      totalPages: data?.totalPages,
    }
  } catch (error) {
    console.error('Failed to load products:', error)
    return { products: [], total: 0 }
  }
}

