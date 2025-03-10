"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShoppingCart, Heart, Star } from "lucide-react"
import { useCart, type Product } from "../Context/Cart-Context"

const colors = {
  primary: "#1E1E1E", // Charcoal Black
  secondary: "#F5F5F5", // Light Gray
  accent: "#D4A373", // Warm Beige/Gold
}

const USD_TO_PKR_RATE = 278.5 // Example conversion rate (1 USD = 278.5 PKR)

export default function ProductSection() {
  const router = useRouter()
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const { addToCart, cartItems } = useCart()
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  const products: Product[] = [
    {
      id: 1,
      name: "ZU Khaadi Embroidered Blue Daman & Dupatta",
      description: "ZU Khaadi Embroidered Blue Daman with Digital Dupatta for a chic, elegant look",
      price: 10.41,
      rating: 4.5,
      category: "Suit",
      image: "/product1.jpg",
    },
    {
      id: 2,
      name: "ZU Khaadi Embroidered Green Daman & Dupatta",
      description: "ZU Khaadi Embroidered Green Daman with Digital Dupatta for a chic, elegant look",
      price: 10.41,
      rating: 4.6,
      category: "Suit",
      image: "/product2.jpg",
    },
    {
      id: 3,
      name: "Gul Ahmed Soft Cotton Black",
      description: "Gul Ahmed Black Soft Cotton Unstitched for a cool, summer look",
      price: 9.33,
      rating: 4.8,
      category: "Cotton",
      image: "/product3.jpg",
    },
    {
      id: 4,
      name: "Gul Ahmed Soft Cotton Tea Pink",
      description: "Gul Ahmed Tea Pink Soft Cotton Unstitched for a cool, summer look",
      price: 9.33,
      rating: 4.8,
      category: "Cotton",
      image: "/product4.jpg",
    },
    {
      id: 5,
      name: "Gul Ahmed Soft Cotton Unstitched Suit Men",
      description: "Gul Ahmed Soft Cotton Unstitched for a cool, summer look",
      price: 9.33,
      rating: 4.6,
      category: "Cotton",
      image: "/product5.jpeg",
    },
    {
      id: 6,
      name: "Gul Ahmed VIP Soft Cotton Unstitched Suit Men",
      description: "Gul Ahmed Soft Cotton Unstitched for a cool, summer look",
      price: 9.33,
      rating: 4.6,
      category: "Cotton",
      image: "/product6.jpg",
    },
    {
      id: 7,
      name: "Gul Ahmed Soft Cotton Unstitched Suit Men",
      description: "Gul Ahmed Soft Cotton Unstitched for a cool, summer look",
      price: 9.33,
      rating: 4.6,
      category: "Cotton",
      image: "/product7.jpg",
    },
    {
      id: 8,
      name: "ZU Khaadi Embroidered Black Daman & Dupatta",
      description: "ZU Khaadi Embroidered Black Daman with Digital Dupatta for a chic, elegant look",
      price: 10.41,
      rating: 4.6,
      category: "Suit",
      image: "/product8.jpg",
    },
  ]

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation() // Prevent navigation when clicking the add to cart button
    addToCart(product)
    setAddedToCart(product.id)
    setTimeout(() => {
      setAddedToCart(null)
    }, 1500)
  }

  const navigateToProduct = (productId: number) => {
    router.push(`/products/${productId}`)
  }

  // Check if product is in cart
  const isInCart = (productId: number) => {
    return cartItems.some((item) => item.id === productId)
  }

  // Get product quantity in cart
  const getQuantityInCart = (productId: number) => {
    const item = cartItems.find((item) => item.id === productId)
    return item ? item.quantity || 0 : 0
  }

  return (
    <section className="py-20" style={{ backgroundColor: colors.secondary }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-14">
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: colors.primary, fontFamily: "Playfair Display, serif" }}
          >
            Our <span style={{ color: colors.accent }}>Collection</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mt-3" style={{ color: colors.primary, fontFamily: "Lora, serif" }}>
            Handpicked styles for every occasion, crafted with elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative cursor-pointer"
              style={{ backgroundColor: "#fff" }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => navigateToProduct(product.id)}
            >
              <div className="relative overflow-hidden h-72 rounded-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className={`w-full h-full object-cover transition-transform duration-500 ${hoveredProduct === product.id ? "scale-105" : "scale-100"}`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-300 ${
                    hoveredProduct === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ bottom: hoveredProduct === product.id ? "20px" : "-50px" }}
                >
                  <button
                    className="p-2 rounded-full shadow-md transition-all"
                    style={{ backgroundColor: "#fff", color: colors.primary }}
                    onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking the heart button
                  >
                    <Heart size={20} />
                  </button>
                  <button
                    className="px-4 py-2 rounded-md shadow-md flex items-center transition-all cursor-pointer"
                    style={{
                      backgroundColor: addedToCart === product.id || isInCart(product.id) ? "#4CAF50" : colors.accent,
                      color: colors.primary,
                    }}
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <ShoppingCart size={16} className="mr-1" />
                    {addedToCart === product.id
                      ? "Added!"
                      : isInCart(product.id)
                        ? `In Cart (${getQuantityInCart(product.id)})`
                        : "Add to Cart"}
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>
                  {product.name}
                </h3>
                <p className="text-sm mt-1" style={{ color: "#666" }}>
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-semibold" style={{ color: colors.accent }}>
                    PKR {Math.round(product.price * USD_TO_PKR_RATE).toLocaleString()}
                  </span>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400" />
                    <span className="text-sm ml-1" style={{ color: "#666" }}>
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

