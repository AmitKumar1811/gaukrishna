"use client"

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, Sparkles, Star, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

type CategoryOption = {
  label: string
  id?: string
}

type PriceBounds = {
  min: number
  max: number
}

type InitialFilters = {
  search?: string
  category?: string
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  isBestSeller?: boolean
  isNewLaunch?: boolean
  limit: number
  page: number
}

interface ProductsFiltersProps {
  categories: CategoryOption[]
  priceBounds: PriceBounds
  initialFilters: InitialFilters
}

export default function ProductsFilters({ categories, priceBounds, initialFilters }: ProductsFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const minBound = Math.max(0, Math.floor(priceBounds.min))
  const maxBound = Math.max(minBound + 100, Math.ceil(priceBounds.max || minBound + 100))
  const startingMin = Math.min(Math.max(initialFilters.minPrice ?? minBound, minBound), maxBound)
  const startingMax = Math.max(Math.min(initialFilters.maxPrice ?? maxBound, maxBound), startingMin)

  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(initialFilters.search || '')
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialFilters.categoryId || initialFilters.category || 'all'
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([startingMin, startingMax])
  const [bestSeller, setBestSeller] = useState<boolean>(!!initialFilters.isBestSeller)
  const [newLaunch, setNewLaunch] = useState<boolean>(!!initialFilters.isNewLaunch)
  const [limit, setLimit] = useState<number>(initialFilters.limit || 10)

  const activeBadges = useMemo(() => {
    const badges: string[] = []
    if (searchValue) badges.push(`Search: "${searchValue}"`)
    if (selectedCategory !== 'all') {
      const cat = categories.find((c) => (c.id ?? c.label) === selectedCategory)
      if (cat) badges.push(cat.label)
    }
    if (bestSeller) badges.push('Best Sellers')
    if (newLaunch) badges.push('New Launches')
    if (priceRange[0] > minBound || priceRange[1] < maxBound) {
      badges.push(`₹${priceRange[0].toLocaleString()} - ₹${priceRange[1].toLocaleString()}`)
    }
    return badges
  }, [bestSeller, newLaunch, priceRange, minBound, maxBound, searchValue, selectedCategory, categories])

  const updateQuery = (updates: Record<string, string | undefined>, resetPage = true) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    if (resetPage) params.set('page', '1')
    router.replace(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      updateQuery({ search: searchValue || undefined })
    }, 400)
    return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  useEffect(() => {
    const handler = setTimeout(() => {
      updateQuery(
        {
          min_price: priceRange[0] !== minBound ? String(priceRange[0]) : undefined,
          max_price: priceRange[1] !== maxBound ? String(priceRange[1]) : undefined,
        },
        true
      )
    }, 300)
    return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRange, minBound, maxBound])

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    if (value === 'all') {
      updateQuery({ category: undefined, category_id: undefined })
      return
    }
    const selected = categories.find((c) => (c.id ?? c.label) === value)
    updateQuery({
      category_id: selected?.id,
      category: selected?.id ? undefined : selected?.label.toLowerCase(),
    })
  }

  const handleBestSellerToggle = (checked: boolean) => {
    setBestSeller(checked)
    updateQuery({ is_best_seller: checked ? 'true' : undefined })
  }

  const handleNewLaunchToggle = (checked: boolean) => {
    setNewLaunch(checked)
    updateQuery({ is_new_launch: checked ? 'true' : undefined })
  }

  const handleLimitChange = (value: string) => {
    const parsed = Number(value) || 10
    setLimit(parsed)
    updateQuery({ limit: String(parsed) })
  }

  const resetFilters = () => {
    setSearchValue('')
    setSelectedCategory('all')
    setPriceRange([minBound, maxBound])
    setBestSeller(false)
    setNewLaunch(false)
    setLimit(initialFilters.limit || 10)
    const params = new URLSearchParams()
    params.set('page', '1')
    params.set('limit', String(initialFilters.limit || 10))
    router.replace(`${pathname}?${params.toString()}`)
    setIsSheetOpen(false)
  }

  return (
    <div className="mb-8 space-y-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search products..."
            className="pl-9 h-11 shadow-sm"
          />
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="inline-flex items-center gap-2 border-[#1a5f48] text-[#1a5f48] hover:bg-[#1a5f48] hover:text-white"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-xl">
            <SheetHeader className="mb-4">
              <SheetTitle className="flex items-center gap-2 text-lg text-gray-900">
                <SlidersHorizontal className="h-5 w-5 text-[#1a5f48]" />
                Refine results
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id ?? category.label} value={category.id ?? category.label}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2 font-semibold text-gray-800">
                    <Sparkles className="h-4 w-4 text-[#1a5f48]" />
                    Price range
                  </div>
                  <span className="font-medium text-gray-900">
                    ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                  </span>
                </div>
                <Slider
                  min={minBound}
                  max={maxBound}
                  step={50}
                  value={priceRange}
                  onValueChange={(val) => setPriceRange([val[0], val[1]])}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹{minBound.toLocaleString()}</span>
                  <span>₹{maxBound.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-800">Best sellers</p>
                    <p className="text-xs text-gray-500">Only show top-loved picks</p>
                  </div>
                  <Switch checked={bestSeller} onCheckedChange={handleBestSellerToggle} />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-800">New launches</p>
                    <p className="text-xs text-gray-500">Fresh additions this season</p>
                  </div>
                  <Switch checked={newLaunch} onCheckedChange={handleNewLaunchToggle} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Products per page</label>
                <Select value={String(limit)} onValueChange={handleLimitChange}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[6, 9, 10, 12, 15].map((count) => (
                      <SelectItem key={count} value={String(count)}>
                        {count} items
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <SheetFooter className="mt-6 flex items-center justify-between">
              <Button variant="ghost" size="sm" className="gap-2 text-[#1a5f48]" onClick={resetFilters}>
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <SheetClose asChild>
                <Button className="bg-[#1a5f48] text-white hover:bg-[#154d3b]">Apply filters</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {activeBadges.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {activeBadges.map((badge) => (
            <Badge
              key={badge}
              variant="secondary"
              className={cn(
                'gap-2 rounded-full bg-[#1a5f48]/10 text-[#1a5f48] border border-[#1a5f48]/20 font-medium'
              )}
            >
              {badge.includes('Best') && <Star className="h-3.5 w-3.5" />}
              {badge.includes('New') && <Sparkles className="h-3.5 w-3.5" />}
              {badge}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
