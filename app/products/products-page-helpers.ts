import 'server-only'

import { getAllCategories, getAllProducts } from '@/app/api/api-service'
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
    const lower = query.category.toLowerCase()
    const normalized = query.category.charAt(0).toUpperCase() + query.category.slice(1).toLowerCase()
    if (lower === 'combo') return 'Health Combos'
    if (lower === 'atta') return 'Premium Atta'
    if (lower === 'ghee') return 'A2 Desi & Gir Cow Bilona Ghee'
    if (lower === 'chyawanprash') return 'Ram Rasoi & Gau Krishna Kesar Yukt Chyawanprash'
    if (lower === 'oil' || lower === 'oils') return 'Wood Pressed Groundnut & Virgin Coconut Oils'
    if (lower === 'dup') return 'Panchgavya Dhoop Batti'
    return normalized
  }

  if (query.tag) return query.tag.charAt(0).toUpperCase() + query.tag.slice(1)
  if (query.search) return `Search Results for "${query.search}"`
  return 'All Swadeshi & Ayurvedic Products'
}

export function getProductsPageDescription(category?: string) {
  const lower = (category || '').toLowerCase()
  if (lower === 'ghee') {
    return 'Buy pure A2 Desi & Gir Cow Bilona Ghee online directly from Gau Krishna (Dhingsara). Check 1kg price, nutrition, and A2 cow ghee health benefits.'
  }
  if (lower === 'chyawanprash') {
    return 'Buy Gau Krishna & Ram Rasoi Kesar Yukt Chyawanprash (कृष्णा च्यवनप्राश) online. Check ingredients, 1kg price, reviews, and immunity benefits.'
  }
  if (lower === 'oil' || lower === 'oils') {
    return 'Shop Wood Pressed Groundnut Oil and Virgin Coconut Oil (for cooking & face/skin care) extracted without chemicals using traditional kolhu methods.'
  }
  if (lower === 'dup') {
    return 'Natural Panchgavya Dhoop Batti made with desi cow dung, ghee, and pure herbs for clean daily pooja.'
  }
  if (lower === 'atta') return 'Freshly stone-ground flour from premium grains.'
  return 'Buy Gau Krishna & Ram Rasoi Chyawanprash, A2 Gir Cow Bilona Ghee, Virgin Coconut Oil, Wood Pressed Groundnut Oil, and Panchgavya Dhoop Batti online.'
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
    const response = await getAllCategories()
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
    // Explicitly construct API params to ensure backend receives what it expects
    const apiParams: Record<string, any> = {}

    if (params) {
      // Support both 'search' and 'q' as common backend search parameters
      const searchVal = params.search || params.q
      if (searchVal) {
        apiParams.search = searchVal
        apiParams.q = searchVal
      }

      // Handle Category
      const catId = params.categoryId || params.category_id
      if (catId) apiParams.category_id = catId
      if (params.category) apiParams.category = params.category

      // Handle Price Range
      const minP = params.minPrice || params.min_price
      const maxP = params.maxPrice || params.max_price
      if (minP) apiParams.min_price = minP
      if (maxP) apiParams.max_price = maxP

      // Handle Flags
      if (params.is_best_seller === 'true' || params.isBestSeller === true) apiParams.is_best_seller = true
      if (params.is_new_launch === 'true' || params.isNewLaunch === true) apiParams.is_new_launch = true

      // Handle Pagination
      if (params.page) apiParams.page = params.page
      if (params.limit) apiParams.limit = params.limit
      if (params.tag) apiParams.tag = params.tag
    }

    const { data } = await getAllProducts(apiParams)
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

