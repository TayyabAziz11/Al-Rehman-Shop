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

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/")
      } else {
        setError("Invalid email or password. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.")
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
            Login to Your Account
          </h1>

          {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

          <form onSubmit={handleSubmit}>
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
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium" style={{ color: colors.primary }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
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
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/Register" className="hover:underline" style={{ color: colors.accent }}>
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

