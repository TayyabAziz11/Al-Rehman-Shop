"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../Context/auth-context"

const colors = {
  primary: "#1E1E1E", // Dark text color
  secondary: "#F5F5F5", // Light background
  accent: "#D4A373", // Highlight color
  button: "#333333", // Dark button color
  text: "#222222", // Standard text color
}

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      // In a real app, you would call your API to register the user
      // For this demo, we'll just log them in directly
      const success = await login(email, password)
      if (success) {
        router.push("/")
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during registration. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-16" style={{ backgroundColor: colors.secondary }}>
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
            Create an Account
          </h1>

          {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm font-medium" style={{ color: colors.primary }}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ borderColor: "rgb(209, 213, 219)" }}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium" style={{ color: colors.primary }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ borderColor: "rgb(209, 213, 219)" }}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-medium" style={{ color: colors.primary }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ borderColor: "rgb(209, 213, 219)" }}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium"
                style={{ color: colors.primary }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ borderColor: "rgb(209, 213, 219)" }}
                placeholder="••••••••"
                required
                minLength={6}
              />
              <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters long</p>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md transition duration-300 cursor-pointer"
              style={{
                backgroundColor: isLoading ? "#999" : colors.button,
                color: colors.secondary,
              }}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="hover:underline" style={{ color: colors.accent }}>
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

