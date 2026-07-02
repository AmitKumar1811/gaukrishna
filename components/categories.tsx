"use client"

import { useEffect, useState } from "react"
import { getAllCategories, getAllProducts } from "@/app/api/api-service"
import {
  ALL_CATEGORY,
  CategoriesView,
  mapApiCategoryToCategoryItem,
  mapApiProductToDisplayProduct,
  type CategoryItem,
  type DisplayProduct,
} from "./categories-internals"

export function Categories() {
  const [categories, setCategories] = useState<CategoryItem[]>([ALL_CATEGORY])
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY.name)
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(undefined)
  const [products, setProducts] = useState<DisplayProduct[]>([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true)
  const [isProductsLoading, setIsProductsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const loadCategories = async () => {
      setIsCategoriesLoading(true)
      try {
        const response = await getAllCategories()
        const rawCategories = Array.isArray(response) ? response : (response?.data?.data || response?.data || [])

        const mappedCategories = rawCategories.map(mapApiCategoryToCategoryItem).filter(Boolean) as CategoryItem[]

        if (!cancelled && mappedCategories.length) {
          setCategories([ALL_CATEGORY, ...mappedCategories])
        }
      } catch (error) {
        console.error("Failed to fetch categories", error)
      } finally {
        if (!cancelled) setIsCategoriesLoading(false)
      }
    }
    loadCategories()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const loadProducts = async () => {
      setIsProductsLoading(true)
      try {
        const params = activeCategoryId ? { categoryId: activeCategoryId } : undefined
        const response = await getAllProducts(params)
        const rawData = response.data?.data || []
        const mappedProducts = rawData.map(mapApiProductToDisplayProduct) as DisplayProduct[]

        if (!cancelled) {
          setProducts(mappedProducts)
        }
      } catch (error) {
        console.error("Failed to load products:", error)
      } finally {
        if (!cancelled) setIsProductsLoading(false)
      }
    }

    loadProducts()
    return () => {
      cancelled = true
    }
  }, [activeCategoryId])

  return (
    <CategoriesView
      categories={categories}
      activeCategory={activeCategory}
      isCategoriesLoading={isCategoriesLoading}
      products={products}
      isProductsLoading={isProductsLoading}
      onSelectCategory={(category) => {
        setActiveCategory(category.name)
        setActiveCategoryId(category.id)
      }}
    />
  )
}
