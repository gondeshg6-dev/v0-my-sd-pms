"use client"

import { createContext, useContext, type ReactNode, useEffect, useState } from "react"

interface User {
  email: string
  role: "Admin" | "Project Manager" | "Client" | "Detailer"
  name: string
  loginTime: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  logout: () => void
  hasPermission: (requiredRoles: string[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user") || localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user data:", error)
        sessionStorage.removeItem("user")
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    sessionStorage.removeItem("user")
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/login"
  }

  const hasPermission = (requiredRoles: string[]) => {
    if (!user) return false
    return requiredRoles.includes(user.role)
  }

  return <AuthContext.Provider value={{ user, isLoading, logout, hasPermission }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
