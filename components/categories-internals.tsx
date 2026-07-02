import Image from 'next/image'
import Link from 'next/link'
import { LayoutGrid, Star, TrendingUp, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { iconMap } from '@/lib/fallback-data'

export type CategoryItem = {
  icon: typeof LayoutGrid
  name: string
  id?: string
  href?: string
}

export type DisplayProduct = {
  id: string | number
  slug: string
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

export const ALL_CATEGORY: CategoryItem = { icon: LayoutGrid, name: 'All', href: '/products' }

function toTitleCase(value: string) {
  const cleaned = value.trim().replace(/\s+/g, ' ')
  if (!cleaned) return cleaned
  return cleaned
    .toLowerCase()
    .replace(/(^|[\s-_])([a-z])/g, (_, prefix: string, char: string) => `${prefix}${char.toUpperCase()}`)
}

export function mapApiCategoryToCategoryItem(cat: any): CategoryItem | null {
  const slug = (cat?.slug || cat?.name || '').toString().toLowerCase().trim()
  if (!slug) return null
  const icon = iconMap[slug] ?? LayoutGrid
  return {
    icon,
    name: toTitleCase(cat?.name || slug),
    id: cat?._id || cat?.id,
  }
}

export function mapApiProductToDisplayProduct(item: any): DisplayProduct {
  const price = Number(item?.price) || 0
  const originalPrice = Number(item?.mrp || item?.price) || price
  const discountPercent = originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const bestSeller = !!item?.is_best_seller

  return {
    id: item?.id || item?._id,
    slug: item?.slug || item?.id || item?._id,
    name: item?.name,
    image:
      Array.isArray(item?.images) && item.images.length > 0
        ? item.images[0].url || item.images[0]
        : '/images/image.webp',
    price,
    originalPrice,
    rating: item?.rating || 0,
    reviews: item?.review_count || 0,
    discount: discountPercent > 0 ? `${discountPercent}% OFF` : '',
    label: bestSeller ? 'Top Rated Choice' : '',
    badgeType: bestSeller ? 'trending' : 'bolt',
    bestSeller,
    weight: item?.weight ? `${item.weight}g` : undefined,
    saveAmount: Math.max(0, originalPrice - price),
  }
}

function CategoriesSkeleton({
  count,
  circleClassName,
  labelClassName,
  itemClassName,
}: {
  count: number
  circleClassName: string
  labelClassName: string
  itemClassName: string
}) {
  return Array.from({ length: count }).map((_, idx) => (
    <div key={idx} className={itemClassName}>
      <div className={circleClassName} />
      <div className={labelClassName} />
    </div>
  ))
}

function CategoryButton({
  category,
  isActive,
  onClick,
  circleClassName,
  iconClassName,
  labelClassName,
  wrapperClassName,
}: {
  category: CategoryItem
  isActive: boolean
  onClick: () => void
  circleClassName: string
  iconClassName: string
  labelClassName: (isActive: boolean) => string
  wrapperClassName: string
}) {
  const Icon = category.icon
  return (
    <button onClick={onClick} className={wrapperClassName} type="button">
      <div className={circleClassName}>
        <Icon strokeWidth={1.5} className={iconClassName} />
      </div>
      <span className={labelClassName(isActive)}>{category.name}</span>
    </button>
  )
}

function CategoriesRow({
  categories,
  activeCategory,
  onSelect,
  loading,
  variant,
}: {
  categories: CategoryItem[]
  activeCategory: string
  onSelect: (category: CategoryItem) => void
  loading: boolean
  variant: 'mobile' | 'desktop'
}) {
  const isMobile = variant === 'mobile'

  const containerClassName = isMobile
    ? 'flex md:hidden overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 px-2 pb-4'
    : 'hidden md:flex flex-wrap justify-center items-center gap-10'

  const skeletonCount = isMobile ? 6 : 8
  const circleClassName = isMobile
    ? 'h-14 w-14 rounded-full border-2 border-[#1a5f48]/30 bg-white'
    : 'h-16 w-16 rounded-full border-2 border-[#1a5f48]/30 bg-white'
  const skeletonLabelClassName = isMobile ? 'h-3 w-12 rounded bg-[#1a5f48]/20' : 'h-3 w-16 rounded bg-[#1a5f48]/20'
  const skeletonItemClassName = isMobile
    ? 'flex flex-col items-center gap-2 min-w-[72px] snap-start animate-pulse'
    : 'flex flex-col items-center gap-2 animate-pulse'

  const wrapperClassName = isMobile
    ? 'group flex flex-col items-center gap-2 min-w-[72px] snap-start'
    : 'group flex flex-col items-center gap-2'

  const circleBase = isMobile ? 'h-14 w-14' : 'h-16 w-16'
  const iconClassName = isMobile ? 'h-6 w-6' : 'h-7 w-7'
  const circleClassNameFor = (isActive: boolean) =>
    `${circleBase} flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
      isActive
        ? 'bg-[#1a5f48] border-[#1a5f48] text-white'
        : `bg-white border-[#1a5f48] text-[#1a5f48]${isMobile ? '' : ' hover:bg-[#e8f3ee]'}`
    }`

  const labelClassName = (isActive: boolean) =>
    `${isMobile ? 'text-xs' : 'text-sm'} font-semibold tracking-wide${isMobile ? ' whitespace-nowrap' : ''} ${
      isActive ? 'text-[#1a5f48]' : 'text-gray-600'
    }`

  return (
    <div className={containerClassName}>
      {loading ? (
        <CategoriesSkeleton
          count={skeletonCount}
          circleClassName={circleClassName}
          labelClassName={skeletonLabelClassName}
          itemClassName={skeletonItemClassName}
        />
      ) : (
        categories.map((category) => {
          const isActive = activeCategory === category.name
          return (
            <CategoryButton
              key={category.name}
              category={category}
              isActive={isActive}
              onClick={() => onSelect(category)}
              wrapperClassName={wrapperClassName}
              circleClassName={circleClassNameFor(isActive)}
              iconClassName={iconClassName}
              labelClassName={labelClassName}
            />
          )
        })
      )}
    </div>
  )
}

function ProductSkeleton({ count }: { count: number }) {
  return Array.from({ length: count }).map((_, idx) => (
    <div
      key={idx}
      className="min-w-[260px] md:min-w-0 snap-center bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse"
    >
      <div className="aspect-square bg-gray-100" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-5 w-48 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-8 w-full bg-gray-200 rounded" />
      </div>
    </div>
  ))
}

function ProductTile({ product }: { product: DisplayProduct }) {
  return (
    <div className="min-w-[260px] md:min-w-0 snap-center group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      {product.discount && (
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-[#1a5f48] text-white text-[10px] font-bold px-2 py-1.5 rounded-br-xl">
            {product.discount}
          </div>
        </div>
      )}

      {product.bestSeller && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-[#1a5f48] text-white text-[10px] font-bold px-2 py-1 rounded-bl-xl flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            Best Seller
          </div>
        </div>
      )}

      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full bg-white overflow-hidden group-hover:bg-gray-50 transition-colors block">
        <Image
          src={product.image}
          alt={product.name}
          sizes="(min-width: 1024px) 280px, 100vw"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="p-4 pt-1 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between min-h-[24px]">
          {product.label && (
            <div
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold ${
                product.badgeType === 'trending' ? 'bg-[#e7f5ef] text-[#1a5f48]' : 'bg-[#fff4e5] text-[#b96b00]'
              }`}
            >
              {product.badgeType === 'trending' ? <TrendingUp className="h-3 w-3" /> : <Zap className="h-3 w-3 fill-current" />}
              {product.label}
            </div>
          )}
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-[15px] leading-tight font-bold text-gray-900 line-clamp-2 h-[40px] hover:underline">{product.name}</h3>
        </Link>

        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-bold text-gray-900">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-end justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-[#1a5f48] text-[#1a5f48] hover:bg-[#1a5f48] hover:text-white font-bold h-8 px-3 text-xs tracking-wider uppercase rounded-md transition-colors flex-1"
            >
              ADD
            </Button>
            <Button
              className="bg-[#1a5f48] text-white hover:bg-[#154d3b] font-bold h-8 px-3 text-xs tracking-wider uppercase rounded-md transition-colors flex-1"
            >
              BUY NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CategoriesView({
  categories,
  activeCategory,
  isCategoriesLoading,
  products,
  isProductsLoading,
  onSelectCategory,
}: {
  categories: CategoryItem[]
  activeCategory: string
  isCategoriesLoading: boolean
  products: DisplayProduct[]
  isProductsLoading: boolean
  onSelectCategory: (category: CategoryItem) => void
}) {
  return (
    <section className="py-8 bg-[#f8faf7] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <CategoriesRow
            variant="mobile"
            categories={categories}
            activeCategory={activeCategory}
            onSelect={onSelectCategory}
            loading={isCategoriesLoading}
          />
          <CategoriesRow
            variant="desktop"
            categories={categories}
            activeCategory={activeCategory}
            onSelect={onSelectCategory}
            loading={isCategoriesLoading}
          />
        </div>

        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0">
          {isProductsLoading ? (
            <ProductSkeleton count={6} />
          ) : (
            products.map((product) => <ProductTile key={product.id} product={product} />)
          )}
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
