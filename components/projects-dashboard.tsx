"use client"

import { useState, useMemo } from "react"
import { Search, Plus, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

// Mock data for projects
const mockProjects = [
  {
    id: "1",
    name: "Stadium Expansion - North Wing",
    code: "PRJ-001",
    client: "Metro City Sports",
    startDate: "2024-01-15",
    dueDate: "2024-06-30",
    progress: 65,
    status: "In Progress",
    activeCount: 1,
  },
  {
    id: "2",
    name: "Commercial Tower Structural Frame",
    code: "PRJ-002",
    client: "ABC Development Corp",
    startDate: "2024-02-01",
    dueDate: "2024-08-15",
    progress: 40,
    status: "In Progress",
    activeCount: 3,
  },
  {
    id: "3",
    name: "Bridge Reinforcement Project",
    code: "PRJ-003",
    client: "Department of Transportation",
    startDate: "2024-03-10",
    dueDate: "2024-09-30",
    progress: 85,
    status: "On Track",
    activeCount: 2,
  },
]

export function ProjectsDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary"
      case "On Track":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <span className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                  SD
                </span>
                Active Projects
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Welcome, {user?.name}</p>
            </div>
            <Button className="flex items-center gap-2 bg-primary hover:bg-accent text-primary-foreground">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by project name, code, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 border-2 border-border focus:border-primary"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Card className="border border-border shadow-sm">
          <CardHeader className="bg-gradient-to-r from-secondary/5 to-primary/5 border-b border-border">
            <CardTitle className="text-xl font-bold">Projects</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Project Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Code</th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Client</th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Due Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Progress</th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <Link
                          href={`/projects/${project.id}`}
                          className="font-semibold text-primary hover:text-accent hover:underline"
                        >
                          {project.name}
                        </Link>
                      </td>
                      <td className="py-4 px-6 font-mono text-sm text-muted-foreground">{project.code}</td>
                      <td className="py-4 px-6 text-foreground text-sm">{project.client}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">
                        {new Date(project.dueDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-border rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-foreground w-12">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}
                        >
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">No projects found matching your search.</div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
