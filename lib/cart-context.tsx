'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, updateCartItem as apiUpdateCartItem, clearCart as apiClearCart } from '../app/api/api-service'

export interface CartItem {
  productId: string
  variantId: string
  productName: string
  size: string
  price: number
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => Promise<void>
  removeFromCart: (productId: string, variantId: string) => Promise<void>
  updateQuantity: (productId: string, variantId: string, quantity: number) => Promise<void>
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
    setMounted(true)
  }, [])


  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, mounted])

  const addToCart = async (newItem: CartItem) => {
    try {
      await apiAddToCart({ productId: newItem.productId, quantity: newItem.quantity })
    } catch (error) {
      console.error('Failed to sync add-to-cart with API:', error)
    }

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
    try {
      await apiRemoveFromCart(productId)
    } catch (error) {
      console.error('Failed to remove item from API cart:', error)
    }

    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      )
    )
  }

  const updateQuantity = async (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId, variantId)
      return
    }

    try {
      await apiUpdateCartItem({ productId, quantity })
    } catch (error) {
      console.error('Failed to update quantity on API cart:', error)
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
    apiClearCart().catch((error) => console.error('Failed to clear API cart:', error))
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
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
