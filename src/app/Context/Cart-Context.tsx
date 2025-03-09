"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Product = {
  id: number
  name: string
  description: string
  price: number
  rating: number
  category: string
  image: string
  quantity?: number
}

type CartContextType = {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

// Create a default context value
const defaultCartContext: CartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartCount: () => 0,
}

const CartContext = createContext<CartContextType>(defaultCartContext)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [mounted, setMounted] = useState(false)

  // Only run this effect on the client side
  useEffect(() => {
    setMounted(true)

    // Load cart from localStorage
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, mounted])

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // Check if product already exists in cart
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // Increase quantity if product already exists
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
        )
      } else {
        // Add new product with quantity 1
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + (item.quantity || 1), 0)
  }

  // Don't render children until mounted on client
  if (!mounted) {
    return null
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

