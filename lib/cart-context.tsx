'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { clearCart as apiClearCart, checkStock } from '../app/api/api-service'

export interface CartItem {
  productId: string
  variantId: string
  productName: string
  size: string
  price: number
  quantity: number
}

export interface StockCheckItemResult {
  productId: string
  name?: string
  availableStock: number
  requestedQuantity: number
  isActive?: boolean
  inStock: boolean
}

export interface StockSyncResult {
  ok: boolean
  unavailableItems: StockCheckItemResult[]
  message?: string
}

interface CartContextType {
  items: CartItem[]
  isLoaded: boolean
  stockStatus: Record<string, StockCheckItemResult>
  hasStockIssues: boolean
  addToCart: (item: CartItem) => Promise<void>
  removeFromCart: (productId: string, variantId: string) => Promise<void>
  updateQuantity: (productId: string, variantId: string, quantity: number) => Promise<void>
  clearCart: () => void
  syncCart: (options?: { silent?: boolean }) => Promise<StockSyncResult>
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function parseStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  const savedCart = localStorage.getItem('cart')
  if (!savedCart) return []
  try {
    const parsed = JSON.parse(savedCart)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    localStorage.removeItem('cart')
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)
  const [stockStatus, setStockStatus] = useState<Record<string, StockCheckItemResult>>({})

  // Load cart from localStorage on mount
  useEffect(() => {
    const parsed = parseStoredCart()
    setItems(parsed)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, mounted])

  const addToCart = async (newItem: CartItem) => {
    if (newItem.quantity <= 0) return
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === newItem.productId && item.variantId === newItem.variantId
      )

      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === newItem.productId && item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }

      return [...prevItems, newItem]
    })
  }

  const removeFromCart = async (productId: string, variantId: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      )
    )
    setStockStatus((prev) => {
      if (!(productId in prev)) return prev
      const next = { ...prev }
      delete next[productId]
      return next
    })
  }

  const updateQuantity = async (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId, variantId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token && token !== 'null' && token !== 'undefined') {
      apiClearCart().catch((error) => console.error('Failed to clear API cart:', error))
    }
    setItems([])
    setStockStatus({})
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const syncCart = useCallback(async (options?: { silent?: boolean }): Promise<StockSyncResult> => {
    const activeItems = mounted ? items : parseStoredCart()
    if (activeItems.length === 0) {
      setStockStatus({})
      return { ok: true, unavailableItems: [] }
    }

    try {
      const aggregatedByProduct = new Map<string, number>()
      for (const item of activeItems) {
        aggregatedByProduct.set(
          item.productId,
          (aggregatedByProduct.get(item.productId) || 0) + item.quantity
        )
      }
      const stockItems = Array.from(aggregatedByProduct.entries()).map(([productId, quantity]) => ({
        productId,
        quantity,
      }))

      const res = await checkStock(stockItems)
      const rows: StockCheckItemResult[] = Array.isArray(res?.data) ? res.data : []
      const nextStatus: Record<string, StockCheckItemResult> = {}
      for (const row of rows) {
        if (row?.productId) {
          nextStatus[row.productId] = row
        }
      }
      setStockStatus(nextStatus)

      const unavailableItems = rows.filter(
        (d) =>
          d &&
          (d.inStock === false ||
            d.isActive === false ||
            (typeof d.availableStock === 'number' &&
              typeof d.requestedQuantity === 'number' &&
              d.availableStock < d.requestedQuantity))
      )

      if ((res && (res.allInStock === false || res.success === false)) || unavailableItems.length > 0) {
        const details = unavailableItems
          .map((d) =>
            d.isActive === false
              ? `${d.name || 'Item'} (unavailable)`
              : `${d.name || 'Item'} (available: ${d.availableStock ?? 0})`
          )
          .join(', ')
        const msg =
          res?.message ||
          (details
            ? `Out of stock / insufficient stock: ${details}`
            : 'Some items in your cart are currently out of stock.')
        if (!options?.silent) {
          toast.error(msg)
        }
        return { ok: false, unavailableItems, message: msg }
      }

      return { ok: true, unavailableItems: [] }
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Some items in your cart are currently out of stock.'
      if (!options?.silent) {
        toast.error(msg)
      }
      return { ok: false, unavailableItems: [], message: msg }
    }
  }, [items, mounted])

  const hasStockIssues = Object.values(stockStatus).some(
    (s) =>
      s.inStock === false ||
      s.isActive === false ||
      (typeof s.availableStock === 'number' &&
        typeof s.requestedQuantity === 'number' &&
        s.availableStock < s.requestedQuantity)
  )

  return (
    <CartContext.Provider
      value={{
        items,
        isLoaded: mounted,
        stockStatus,
        hasStockIssues,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        syncCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
