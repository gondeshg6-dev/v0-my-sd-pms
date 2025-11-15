"use client"

import { useState, useMemo } from "react"
import { Search, Plus, Bell, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

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
  },
  {
    id: "4",
    name: "Industrial Warehouse Design",
    code: "PRJ-004",
    client: "Logistics Plus Inc",
    startDate: "2024-04-01",
    dueDate: "2024-07-15",
    progress: 20,
    status: "Planning",
  },
  {
    id: "5",
    name: "Multi-Story Parking Structure",
    code: "PRJ-005",
    client: "Urban Parking Solutions",
    startDate: "2024-01-20",
    dueDate: "2024-05-30",
    progress: 95,
    status: "Nearly Complete",
  },
]

const mockProjectNotifications = [
  { projectId: "1", message: "New RFI added", type: "rfi" },
  { projectId: "2", message: "Approval Transmittal added", type: "transmittal" },
  { projectId: "1", message: "Fabrication Transmittal updated", type: "transmittal" },
]

export function ProjectsDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

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
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "On Track":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Nearly Complete":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  const getProjectNotifications = (projectId: string) => {
    return mockProjectNotifications.filter((notif) => notif.projectId === projectId)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">ABC FABRICATION</h1>
              <p className="text-muted-foreground">Projects Dashboard</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by project name, code, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {mockProjectNotifications.length > 0 && (
          <Card className="mb-6 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-orange-900 dark:text-orange-200">
                  <p className="font-medium mb-2">Recent Activity Across Projects:</p>
                  <ul className="space-y-1">
                    {mockProjectNotifications.map((notif, idx) => {
                      const project = mockProjects.find((p) => p.id === notif.projectId)
                      return (
                        <li key={idx}>
                          <strong>{project?.code}</strong>: {notif.message}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Project Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Project Code</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Client Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Start Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Due Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Progress</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Notifications</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => {
                    const projectNotifs = getProjectNotifications(project.id)
                    return (
                      <tr
                        key={project.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <td className="py-4 px-4">
                          <Link
                            href={`/projects/${project.id}`}
                            className="text-steel-primary font-medium hover:text-steel-accent underline"
                          >
                            {project.name}
                          </Link>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground font-mono text-sm">{project.code}</td>
                        <td className="py-4 px-4 text-foreground">{project.client}</td>
                        <td className="py-4 px-4 text-muted-foreground text-sm">
                          {new Date(project.startDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 text-muted-foreground text-sm">
                          {new Date(project.dueDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-border rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-steel-primary h-full rounded-full"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-foreground">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {projectNotifs.length > 0 && (
                            <div className="flex items-center gap-2">
                              <Bell className="h-4 w-4 text-orange-500" />
                              <span className="text-xs font-medium text-orange-600">{projectNotifs.length}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No projects found matching your search.</div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
