"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { LogOut, Users, AlertCircle, Zap, Search } from 'lucide-react'

const fabricators = [
  { id: 1, name: "Fabricator A", activeProjects: 3, completed: 5, health: 85 },
  { id: 2, name: "Fabricator B", activeProjects: 2, completed: 3, health: 78 },
  { id: 3, name: "Fabricator C", activeProjects: 4, completed: 7, health: 92 },
]

const workloadData = [
  { name: "Week 1", fabricatorA: 3, fabricatorB: 2, fabricatorC: 4 },
  { name: "Week 2", fabricatorA: 2, fabricatorB: 3, fabricatorC: 3 },
  { name: "Week 3", fabricatorA: 4, fabricatorB: 2, fabricatorC: 5 },
]

export default function ManagerDashboard() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "Project Manager")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "Project Manager") {
    return null
  }

  const filteredFabricators = fabricators.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-secondary to-primary/10 border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                PM
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Project Manager Dashboard</h1>
                <p className="text-xs text-muted-foreground">{user.name}</p>
              </div>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-primary/30 hover:bg-primary/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border border-border bg-gradient-to-br from-card to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Fabricators</p>
                  <p className="text-3xl font-bold text-primary mt-1">3</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-gradient-to-br from-card to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Active Projects</p>
                  <p className="text-3xl font-bold text-primary mt-1">9</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-gradient-to-br from-card to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">System Health</p>
                  <p className="text-3xl font-bold text-primary mt-1">85%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg">Fabricator Workload Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={workloadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                  <Legend />
                  <Line type="monotone" dataKey="fabricatorA" stroke="#f26337" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="fabricatorB" stroke="#6b7280" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="fabricatorC" stroke="#d97706" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg">Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fabricators}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                  <Legend />
                  <Bar dataKey="activeProjects" fill="#f26337" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="completed" fill="#6b7280" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Fabricators List */}
        <Card className="border border-border">
          <CardHeader className="bg-gradient-to-r from-secondary/5 to-primary/5 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Fabricators</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search fabricators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-9 border-border"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Fabricator</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Active Projects</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Completed</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Health</th>
                </tr>
              </thead>
              <tbody>
                {filteredFabricators.map((fab) => (
                  <tr key={fab.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-foreground">{fab.name}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold text-sm">
                        {fab.activeProjects}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{fab.completed}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                        {fab.health}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
