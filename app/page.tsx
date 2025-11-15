"use client"

import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/lib/auth-context"

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login")
      } else {
        const dashboardMap: Record<string, string> = {
          Client: "/dashboard/client",
          "Project Manager": "/dashboard/manager",
          "Team Lead": "/dashboard/teamlead",
          Detailer: "/dashboard/detailer",
        }
        const redirectUrl = dashboardMap[user.role] || "/dashboard/client"
        router.push(redirectUrl)
      }
    }
  }, [user, isLoading, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
