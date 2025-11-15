"use client"

import { AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface ProjectHealthProps {
  project: {
    name: string
    client: string
    startDate: string
    dueDate: string
    progress: number
    status: string
    currentPhase: string
    assignedDetailer: string
  }
  projectId: string
}

const upcomingSubmittals = [
  {
    id: "at1",
    type: "Approval Transmittal",
    description: "Structural drawing submission",
    dueDate: "2024-11-20",
    status: "In Progress",
  },
  {
    id: "at2",
    type: "Fabrication Transmittal",
    description: "Connection details for fabrication",
    dueDate: "2024-11-25",
    status: "In Progress",
  },
  {
    id: "at3",
    type: "Approval Transmittal",
    description: "Final approval drawings",
    dueDate: "2024-12-05",
    status: "Not Started",
  },
]

const projectStatusData = [
  { name: "Completed", value: 65, color: "hsl(142, 71%, 45%)" },
  { name: "In Progress", value: 25, color: "hsl(217, 91%, 60%)" },
  { name: "Not Started", value: 10, color: "hsl(0, 0%, 64%)" },
]

export function ProjectHealth({ project, projectId }: ProjectHealthProps) {
  const overallStatus = project.progress > 75 ? "green" : project.progress > 50 ? "amber" : "red"

  const getSubmittalStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Not Started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Status Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-foreground">{project.progress}%</div>
              <div
                className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                  overallStatus === "green"
                    ? "bg-green-100 dark:bg-green-900/30"
                    : overallStatus === "amber"
                      ? "bg-yellow-100 dark:bg-yellow-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                }`}
              >
                {overallStatus === "green" ? (
                  <CheckCircle
                    className={`h-6 w-6 ${
                      overallStatus === "green"
                        ? "text-green-600 dark:text-green-400"
                        : overallStatus === "amber"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                    }`}
                  />
                ) : overallStatus === "amber" ? (
                  <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open RFIs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">4</div>
            <p className="text-xs text-muted-foreground mt-1">2 critical, 2 standard</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Timeline Health</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
              On Schedule
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Project Summary Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Project Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Project Name:</span>
              <span className="font-medium text-foreground">{project.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Client:</span>
              <span className="font-medium text-foreground">{project.client}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Start Date:</span>
              <span className="font-medium text-foreground">{new Date(project.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Target Completion:</span>
              <span className="font-medium text-foreground">{new Date(project.dueDate).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Project Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                completed: { label: "Completed", color: "hsl(142, 71%, 45%)" },
                inProgress: { label: "In Progress", color: "hsl(217, 91%, 60%)" },
                notStarted: { label: "Not Started", color: "hsl(0, 0%, 64%)" },
              }}
              className="h-48"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team & Status - Updated */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Team & Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Assigned Detailer:</span>
            <span className="font-medium text-foreground">{project.assignedDetailer}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current Phase:</span>
            <span className="font-medium text-foreground">{project.currentPhase}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Next Milestone:</span>
            <span className="font-medium text-foreground">Shop Drawings</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Upcoming Submittals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-semibold text-foreground">Type</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground">Description</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground">Due Date</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {upcomingSubmittals.map((submittal) => (
                  <tr key={submittal.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-2 px-3 text-foreground">{submittal.type}</td>
                    <td className="py-2 px-3 text-foreground">{submittal.description}</td>
                    <td className="py-2 px-3 text-foreground">{new Date(submittal.dueDate).toLocaleDateString()}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getSubmittalStatusColor(submittal.status)}`}
                      >
                        {submittal.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Risk & Overdue Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Highlighted Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm font-medium text-red-900 dark:text-red-200">
                Overdue: Foundation drawings - RFI response needed by{" "}
                {new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-200">
                At Risk: Column details - Due in 2 days
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
