"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

const mockUsers = [
  { email: "admin@steeldetailing.com", password: "admin123", role: "Admin", name: "Admin User" },
  { email: "manager@steeldetailing.com", password: "manager123", role: "Project Manager", name: "Project Manager" },
  { email: "client@steeldetailing.com", password: "client123", role: "Client", name: "Client User" },
  { email: "detailer@steeldetailing.com", password: "detailer123", role: "Detailer", name: "Detailer User" },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const user = mockUsers.find((u) => u.email === email && u.password === password)

      if (user) {
        // Store user session
        const sessionData = {
          email: user.email,
          role: user.role,
          name: user.name,
          loginTime: new Date().toISOString(),
        }

        sessionStorage.setItem("user", JSON.stringify(sessionData))

        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(sessionData))
        }

        // Redirect based on role
        const dashboardMap: Record<string, string> = {
          Admin: "/dashboard/admin",
          "Project Manager": "/dashboard/manager",
          Client: "/dashboard/client",
          Detailer: "/dashboard/detailer",
        }

        const redirectUrl = dashboardMap[user.role] || "/dashboard"
        router.push(redirectUrl)
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (role: string) => {
    const user = mockUsers.find((u) => u.role === role)
    if (user) {
      setEmail(user.email)
      setPassword(user.password)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-steel-primary via-steel-secondary to-steel-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-2 pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 bg-steel-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                SD
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center text-foreground">Steel Detailing</CardTitle>
            <CardDescription className="text-center text-base">Project Management System</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2 items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email or Username</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-border"
                  disabled={isLoading}
                />
                <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-steel-primary hover:bg-steel-accent text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-background text-muted-foreground">Demo Accounts</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {["Admin", "Project Manager", "Client", "Detailer"].map((role) => (
                <Button
                  key={role}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin(role)}
                  className="text-xs"
                  disabled={isLoading}
                >
                  {role}
                </Button>
              ))}
            </div>

            <p className="text-xs text-center text-muted-foreground">
              For demo, click any role above to auto-fill credentials
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
