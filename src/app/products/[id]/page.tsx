"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { ShoppingCart, Heart, Star, ArrowLeft } from "lucide-react"
import { useCart, type Product } from "../../Context/Cart-Context"

const colors = {
  primary: "#1E1E1E", // Charcoal Black
  secondary: "#F5F5F5", // Light Gray
  accent: "#D4A373", // Warm Beige/Gold
}

const USD_TO_PKR_RATE = 278.5 // Example conversion rate (1 USD = 278.5 PKR)

// This would typically come from an API or database
const getProductData = (id: number): Product | undefined => {
  const products: Product[] = [
    {
      id: 1,
      name: "ZU Khaadi Embroidered Blue Daman & Dupatta",
      description:
        "This exquisite piece features delicate embroidery on the front daman, paired with a vibrant blue hue for a modern yet traditional look. The intricate digital net dupatta adds a touch of elegance, making it perfect for both casual and festive occasions. Crafted with attention to detail, this outfit offers comfort, style, and a perfect blend of heritage and contemporary design.",
      price: 10.41,
      rating: 4.5,
      category: "Suit",
      image: "/product1.jpg",
    },
    {
      id: 2,
      name: "ZU Khaadi Embroidered Green Daman & Dupatta",
      description:
        "This exquisite piece features delicate embroidery on the front daman, paired with a vibrant green hue for a modern yet traditional look. The intricate digital net dupatta adds a touch of elegance, making it perfect for both casual and festive occasions. Crafted with attention to detail, this outfit offers comfort, style, and a perfect blend of heritage and contemporary design.",
      price: 10.41,
      rating: 4.6,
      category: "Suit",
      image: "/product2.jpg",
    },
    {
      id: 3,
      name: "Gul Ahmed Soft Cotton Black",
      description: "Gul Ahmed Soft Cotton Black Unstitched fabric is designed to provide ultimate comfort and breathability for the summer season. Made from high-quality soft cotton, this fabric ensures a cool and soothing experience, even in the hottest weather. Its rich black color adds a touch of elegance and versatility, making it perfect for creating both casual and semi-formal outfits. Ideal for those who appreciate premium fabric quality and timeless style, this unstitched piece allows you to customize your look while staying comfortable and chic all day long",
      price: 9.33,
      rating: 4.8,
      category: "Cotton",
      image: "/product3.jpg",
    },
    {
      id: 4,
      name: "Gul Ahmed Soft Cotton Tea Pink",
      description: "Gul Ahmed Soft Cotton Tea Pink Unstitched fabric is designed to provide ultimate comfort and breathability for the summer season. Made from high-quality soft cotton, this fabric ensures a cool and soothing experience, even in the hottest weather. Its rich Tea Pink color adds a touch of elegance and versatility, making it perfect for creating both casual and semi-formal outfits. Ideal for those who appreciate premium fabric quality and timeless style, this unstitched piece allows you to customize your look while staying comfortable and chic all day long",
      price: 9.33,
      rating: 4.8,
      category: "Cotton",
      image: "/product4.jpg",
    },
    {
      id: 5,
      name: "Gul Ahmed Soft Cotton Unstitched Suit Men",
      description: "Gul Ahmed Soft Cotton Unstitched fabric is designed to provide ultimate comfort and breathability for the summer season. Made from high-quality soft cotton, this fabric ensures a cool and soothing experience, even in the hottest weather. Its rich color adds a touch of elegance and versatility, making it perfect for creating both casual and semi-formal outfits. Ideal for those who appreciate premium fabric quality and timeless style, this unstitched piece allows you to customize your look while staying comfortable and chic all day long",
      price: 9.33,
      rating: 4.6,
      category: "Cotton",
      image: "/product5.jpeg",
    },
    {
      id: 6,
      name: "Gul Ahmed VIP Soft Cotton Unstitched Suit Men",
      description: "Gul Ahmed Soft Cotton Unstitched fabric is designed to provide ultimate comfort and breathability for the summer season. Made from high-quality soft cotton, this fabric ensures a cool and soothing experience, even in the hottest weather. Its rich color adds a touch of elegance and versatility, making it perfect for creating both casual and semi-formal outfits. Ideal for those who appreciate premium fabric quality and timeless style, this unstitched piece allows you to customize your look while staying comfortable and chic all day long",
      price: 9.33,
      rating: 4.6,
      category: "Cotton",
      image: "/product6.jpg",
    },
    {
      id: 7,
      name: "Gul Ahmed Soft Cotton Unstitched Suit Men",
      description: "Gul Ahmed Soft Cotton Unstitched fabric is designed to provide ultimate comfort and breathability for the summer season. Made from high-quality soft cotton, this fabric ensures a cool and soothing experience, even in the hottest weather. Its rich color adds a touch of elegance and versatility, making it perfect for creating both casual and semi-formal outfits. Ideal for those who appreciate premium fabric quality and timeless style, this unstitched piece allows you to customize your look while staying comfortable and chic all day long",
      price: 9.33,
      rating: 4.6,
      category: "Cotton",
      image: "/product7.jpg",
    },
    {
      id: 8,
      name: "ZU Khaadi Embroidered Black Daman & Dupatta",
      description: "This exquisite piece features delicate embroidery on the front daman, paired with a vibrant black hue for a modern yet traditional look. The intricate digital net dupatta adds a touch of elegance, making it perfect for both casual and festive occasions. Crafted with attention to detail, this outfit offers comfort, style, and a perfect blend of heritage and contemporary design.",
      price: 10.41,
      rating: 4.6,
      category: "Suit",
      image: "/product8.jpg",
    },
  ]

  return products.find((product) => product.id === id)
}

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const { addToCart, cartItems, updateQuantity } = useCart()
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    if (params.id) {
      const productId = Number.parseInt(params.id as string)
      const foundProduct = getProductData(productId)
      setProduct(foundProduct)
    }
  }, [params.id])

  // Check if product is already in cart and set initial quantity
  useEffect(() => {
    if (product) {
      const cartItem = cartItems.find((item: Product) => item.id === product.id) // Changed from 'any' to 'Product'
      if (cartItem && cartItem.quantity) {
        setQuantity(cartItem.quantity)
      } else {
        setQuantity(1)
      }
    }
  }, [product, cartItems])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.secondary }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
            Product not found
          </h2>
          <button
            className="mt-4 px-4 py-2 rounded-md flex items-center mx-auto"
            style={{ backgroundColor: colors.accent, color: colors.primary }}
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const isInCart = cartItems.some((item: Product) => item.id === product.id) // Changed from 'any' to 'Product'

  const handleAddToCart = () => {
    if (isInCart) {
      // Update quantity if already in cart
      updateQuantity(product.id, quantity)
    } else {
      // Add to cart with specified quantity
      const productWithQuantity = { ...product, quantity }
      addToCart(productWithQuantity)
    }

    setAddedToCart(true)
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)

      // If already in cart, update quantity directly
      if (isInCart) {
        updateQuantity(product.id, newQuantity)
      }
    }
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.secondary }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <button
          className="mb-8 px-4 py-2 rounded-md flex items-center"
          style={{ backgroundColor: colors.accent, color: colors.primary }}
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={1000}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.primary, fontFamily: "Playfair Display, serif" }}
            >
              {product.name}
            </h1>

            <div className="flex items-center mt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm" style={{ color: "#666" }}>
                ({product.rating})
              </span>
            </div>

            <div className="mt-6">
              <span className="text-3xl font-bold" style={{ color: colors.accent }}>
                PKR {Math.round(product.price * USD_TO_PKR_RATE).toLocaleString()}
              </span>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>
                Description
              </h3>
              <p className="text-base" style={{ color: "#666", lineHeight: "1.6" }}>
                {product.description}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>
                Quantity
              </h3>
              <div className="flex items-center">
                <button
                  className="w-10 h-10 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: colors.accent, color: colors.primary }}
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </button>
                <span className="mx-4 text-lg font-medium" style={{ color: colors.primary }}>
                  {quantity}
                </span>
                <button
                  className="w-10 h-10 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: colors.accent, color: colors.primary }}
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                className="px-6 py-3 rounded-md flex items-center justify-center transition-all"
                style={{
                  backgroundColor: addedToCart ? "#4CAF50" : colors.accent,
                  color: colors.primary,
                  width: "100%",
                }}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} className="mr-2" />
                {addedToCart ? "Added to Cart!" : isInCart ? "Update Cart" : "Add to Cart"}
              </button>

              <button
                className="px-6 py-3 rounded-md flex items-center justify-center border-2 transition-all"
                style={{
                  borderColor: colors.accent,
                  color: colors.primary,
                  backgroundColor: "transparent",
                  width: "100%",
                }}
              >
                <Heart size={20} className="mr-2" />
                Add to Wishlist
              </button>
            </div>

            <div className="mt-8 p-4 rounded-md" style={{ backgroundColor: "#fff" }}>
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>
                Product Details
              </h3>
              <ul className="list-disc pl-5" style={{ color: "#666" }}>
                <li className="mb-1">Category: {product.category}</li>
                <li className="mb-1">Material: Premium Quality</li>
                <li className="mb-1">Available in multiple colors</li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
