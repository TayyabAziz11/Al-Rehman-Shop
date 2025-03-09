"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

// Create a default context value
const defaultContextValue: AuthContextType = {
  user: null,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Only run this effect on the client side
  useEffect(() => {
    setMounted(true)

    // Check if user is already logged in on initial load
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Mock login function - in a real app, this would call your API
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simple validation - in a real app, this would verify credentials with your backend
      if (email && password.length >= 6) {
        // Mock user data - in a real app, this would come from your backend
        const userData: User = {
          id: "user-1",
          name: email.split("@")[0], // Use part of email as name
          email: email,
        }

        // Save to state and localStorage
        setUser(userData)

        // Only access localStorage on the client
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userData))
        }

        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)

    // Only access localStorage on the client
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
  }

  // Don't render children until mounted on client
  if (!mounted) {
    return null
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

