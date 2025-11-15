"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'

const mockUsers = [
  { email: "fabricator@steeldetailing.com", password: "client123", role: "Client", name: "Fabricator Co." },
  { email: "manager@steeldetailing.com", password: "manager123", role: "Project Manager", name: "John Manager" },
  { email: "teamlead@steeldetailing.com", password: "teamlead123", role: "Team Lead", name: "Sarah Lead" },
  { email: "detailer@steeldetailing.com", password: "detailer123", role: "Detailer", name: "Mike Detailer" },
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

        const dashboardMap: Record<string, string> = {
          Client: "/dashboard/client",
          "Project Manager": "/dashboard/manager",
          "Team Lead": "/dashboard/teamlead",
          Detailer: "/dashboard/detailer",
        }

        const redirectUrl = dashboardMap[user.role] || "/dashboard/client"
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
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-2 pb-6 bg-gradient-to-r from-secondary to-primary/20">
            <div className="flex items-center justify-center mb-4">
              <div className="h-14 w-14 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                SD
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center text-foreground">Steel Detailing</CardTitle>
            <CardDescription className="text-center text-base font-medium">Project Management System</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-8">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-2 items-start">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 border-2 border-border focus:border-primary"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 border-2 border-border focus:border-primary"
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
                className="w-full h-11 bg-primary hover:bg-accent text-primary-foreground font-semibold text-base transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-background text-muted-foreground font-semibold">Demo Logins</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { role: "Client", label: "Fabricator" },
                { role: "Project Manager", label: "PM" },
                { role: "Team Lead", label: "Team Lead" },
                { role: "Detailer", label: "Detailer" },
              ].map(({ role, label }) => (
                <Button
                  key={role}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin(role)}
                  className="text-xs font-medium hover:bg-primary/10 hover:border-primary"
                  disabled={isLoading}
                >
                  {label}
                </Button>
              ))}
            </div>

            <p className="text-xs text-center text-muted-foreground">Demo: Click any role to auto-fill credentials</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
