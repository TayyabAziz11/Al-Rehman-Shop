"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react"
import { useCart } from "../Context/Cart-Context"
import { useAuth } from "../Context/auth-context"

// Define the color scheme
const colors = {
  primary: "#1E1E1E", // Dark text color
  secondary: "#F5F5F5", // Light background
  accent: "#D4A373", // Highlight color
  button: "#333333", // Dark button color
  text: "#222222", // Standard text color
}

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/About" },
  { name: "Shop", path: "/Shop" },
  { name: "Contact", path: "/Contact" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartCount } = useCart()
  const { user, logout, isAuthenticated } = useAuth()
  const cartItemCount = getCartCount()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <nav
      className="shadow-md py-4 sticky top-0 z-50 transition-all"
      style={{ backgroundColor: colors.secondary, color: colors.text }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">Al Rehman</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-gray-800 font-medium transition duration-300 hover:text-[#D4A373]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Account and Cart - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-gray-800">
                  <span>Hello, {user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-800 hover:text-primary transition duration-300 cursor-pointer"
                >
                  <LogOut size={20} className="mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/Login"
                className="flex items-center text-gray-800 hover:text-primary transition duration-300 cursor-pointer"
              >
                <User size={20} className="mr-1" />
                <span>Login</span>
              </Link>
            )}
            <Link
              href="/Cart"
              className="flex items-center px-4 py-2 rounded-md transition duration-300 shadow-md hover:bg-gray-300 relative"
              style={{
                backgroundColor: colors.button,
                color: colors.secondary,
              }}
            >
              <ShoppingCart size={20} className="mr-1" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Login/User Button - Mobile */}
            {isAuthenticated ? (
              <button onClick={handleLogout} className="p-2 text-gray-800 hover:text-[#D4A373] transition duration-300">
                <LogOut size={20} />
              </button>
            ) : (
              <Link href="/Login" className="p-2 text-gray-800 hover:text-[#D4A373] transition duration-300">
                <User size={20} />
              </Link>
            )}

            {/* Cart Button - Mobile */}
            <Link href="/Cart" className="p-2 text-gray-800 hover:text-[#D4A373] transition duration-300 relative">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
              className="p-2 text-gray-800 hover:text-[#D4A373] focus:outline-none transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3 border-t mt-3" style={{ backgroundColor: colors.secondary }}>
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="block px-4 py-2 text-gray-800 hover:text-primary transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {isAuthenticated && <div className="px-4 py-2 text-gray-800">Hello, {user?.name}</div>}
        </div>
      </div>
    </nav>
  )
}

