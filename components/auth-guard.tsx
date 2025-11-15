"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRoles?: string[]
  fallback?: React.ReactNode
}

export function AuthGuard({ children, requiredRoles = [], fallback }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <div className="h-8 w-8 border-4 border-steel-primary border-t-transparent rounded-full" />
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return (
      fallback || (
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>You don't have permission to access this page. Your role: {user.role}</AlertDescription>
        </Alert>
      )
    )
  }

  return children
}
