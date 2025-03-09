"use client"
import Link from "next/link"
import { useCart } from "@/app/Context/Cart-Context"
import { ShoppingCart, Trash, Plus, Minus } from "lucide-react"

const colors = {
  primary: "#1E1E1E", // Dark text color
  secondary: "#F5F5F5", // Light background
  accent: "#D4A373", // Highlight color
  button: "#333333", // Dark button color
  text: "#222222", // Standard text color
}

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const cartTotal = getCartTotal()

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16"
        style={{ backgroundColor: colors.secondary }}
      >
        <div className="text-center">
          <ShoppingCart size={64} className="mx-auto mb-6" style={{ color: colors.primary }} />
          <h1 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
            Your cart is empty
          </h1>
          <p className="text-lg mb-8" style={{ color: colors.text }}>
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            href="/Shop"
            className="inline-flex items-center px-6 py-3 rounded-md transition duration-300"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16" style={{ backgroundColor: colors.secondary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-10" style={{ color: colors.primary }}>
          Your Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-6 flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0">
                        <img
                          src={item.image || "/placeholder.svg?height=96&width=96"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 ml-0 sm:ml-6">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium" style={{ color: colors.primary }}>
                            {item.name}
                          </h3>
                          <p className="font-medium" style={{ color: colors.primary }}>
                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>

                        {/* Quantity Controls */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-1">{item.quantity || 1}</span>
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 flex items-center"
                          >
                            <Trash size={16} className="mr-1" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium mb-6" style={{ color: colors.primary }}>
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <span className="font-medium" style={{ color: colors.primary }}>
                    Subtotal
                  </span>
                  <span className="font-medium" style={{ color: colors.primary }}>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-600">Calculated at checkout</span>
                </div>

                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <span className="text-lg font-bold" style={{ color: colors.primary }}>
                    Total
                  </span>
                  <span className="text-lg font-bold" style={{ color: colors.accent }}>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                className="w-full mt-6 py-3 px-4 rounded-md transition duration-300 text-center"
                style={{
                  backgroundColor: colors.button,
                  color: colors.secondary,
                }}
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <Link href="/Shop" className="text-sm hover:underline" style={{ color: colors.primary }}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

