"use client"

import { useState } from "react"
import { ShoppingCart, Heart, Star } from "lucide-react"
import { useCart, type Product } from "../Context/Cart-Context"

const colors = {
  primary: "#1E1E1E", // Charcoal Black
  secondary: "#F5F5F5", // Light Gray
  accent: "#D4A373", // Warm Beige/Gold
}

export default function ProductSection() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const { addToCart } = useCart()
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  const products: Product[] = [
    {
      id: 1,
      name: "Classic Cotton T-Shirt",
      description: "Premium cotton essential tee for everyday comfort",
      price: 29.99,
      rating: 4.8,
      category: "t-shirts",
      image: "/bg-image2.jpg",
    },
    {
      id: 2,
      name: "Slim Fit Denim Jeans",
      description: "Stylish dark wash jeans with perfect stretch",
      price: 59.99,
      rating: 4.6,
      category: "bottoms",
      image: "/bg-image2.jpg",
    },
    {
      id: 3,
      name: "Oversized Hoodie",
      description: "Ultra-soft fleece interior for maximum comfort",
      price: 49.99,
      rating: 4.7,
      category: "outerwear",
      image: "/bg-image2.jpg",
    },
    {
      id: 4,
      name: "Tailored Blazer",
      description: "Sophisticated professional wear with modern fit",
      price: 89.99,
      rating: 4.5,
      category: "formal",
      image: "/bg-image2.jpg",
    },
    {
      id: 5,
      name: "Tailored Blazer",
      description: "Sophisticated professional wear with modern fit",
      price: 89.99,
      rating: 4.5,
      category: "formal",
      image: "/bg-image2.jpg",
    },
    {
      id: 6,
      name: "Tailored Blazer",
      description: "Sophisticated professional wear with modern fit",
      price: 89.99,
      rating: 4.5,
      category: "formal",
      image: "/bg-image2.jpg",
    },
    {
      id: 7,
      name: "Tailored Blazer",
      description: "Sophisticated professional wear with modern fit",
      price: 89.99,
      rating: 4.5,
      category: "formal",
      image: "/bg-image2.jpg",
    },
    {
      id: 8,
      name: "Tailored Blazer",
      description: "Sophisticated professional wear with modern fit",
      price: 89.99,
      rating: 4.5,
      category: "formal",
      image: "/bg-image2.jpg",
    },
    {
      id: 9,
      name: "Tailored Blazer",
      description: "Sophisticated professional wear with modern fit",
      price: 89.99,
      rating: 4.5,
      category: "formal",
      image: "/bg-image2.jpg",
    },
  ]

  const handleAddToCart = (product: Product) => {
    addToCart(product)

    // Show visual feedback
    setAddedToCart(product.id)
    setTimeout(() => {
      setAddedToCart(null)
    }, 1500)
  }

  return (
    <section className="py-20" style={{ backgroundColor: colors.secondary }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Title */}
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative"
              style={{ backgroundColor: "#fff" }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image with Hover Effect */}
              <div className="relative overflow-hidden h-72 rounded-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${hoveredProduct === product.id ? "scale-105" : "scale-100"}`}
                />

                {/* Soft Overlay Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
                ></div>

                {/* Hover Action Buttons */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-300 ${
                    hoveredProduct === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    bottom: hoveredProduct === product.id ? "20px" : "-50px", // Adjust position for desktop
                  }}
                >
                  <button
                    className="p-2 rounded-full shadow-md transition-all"
                    style={{ backgroundColor: "#fff", color: colors.primary }}
                  >
                    <Heart size={20} />
                  </button>
                  <button
                    className="px-4 py-2 rounded-md shadow-md flex items-center transition-all cursor-pointer"
                    style={{
                      backgroundColor: addedToCart === product.id ? "#4CAF50" : colors.accent,
                      color: colors.primary,
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart size={16} className="mr-1" />
                    {addedToCart === product.id ? "Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>
                  {product.name}
                </h3>
                <p className="text-sm mt-1" style={{ color: "#666" }}>
                  {product.description}
                </p>

                {/* Price & Rating */}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-semibold" style={{ color: colors.accent }}>
                    ${product.price}
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/Shop"
            className="inline-flex items-center px-6 py-3 border font-medium rounded-md transition duration-300"
            style={{
              borderColor: colors.accent,
              color: colors.primary,
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.accent
              e.currentTarget.style.color = colors.primary
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = colors.primary
            }}
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  )
}

