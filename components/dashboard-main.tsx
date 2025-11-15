"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const projectStageData = [
  { stage: "Design", count: 12 },
  { stage: "Planning", count: 8 },
  { stage: "Fabrication", count: 5 },
  { stage: "Installation", count: 3 },
  { stage: "Inspection", count: 2 },
  { stage: "Complete", count: 1 },
]

const keyLinks = [
  { title: "Project Plan", icon: "📋" },
  { title: "Project Milestones", icon: "🎯" },
  { title: "Forward: The Steel Economy Index", icon: "📊" },
  { title: "Supply Chain Dashboard", icon: "🚚" },
]

export function DashboardMain() {
  return (
    <div className="flex-1 overflow-y-auto bg-background p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Project Management Dashboard</h1>
          <div className="bg-gradient-to-br from-steel-accent to-steel-accent/70 p-3 rounded-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3m10 0h8v8h-8V3M3 13h8v8H3v-8m10 0h8v8h-8v-8" />
            </svg>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-steel-primary text-steel-primary-foreground rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Overview</h2>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-sm font-medium mb-1 text-steel-primary-foreground/80">Project Start Date</p>
            <p className="text-lg font-bold">03/05/24</p>
            <p className="text-xs text-steel-primary-foreground/60 mt-1">Start Date</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1 text-steel-primary-foreground/80">Project End Date</p>
            <p className="text-lg font-bold">05/10/25</p>
            <p className="text-xs text-steel-primary-foreground/60 mt-1">End Date</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1 text-steel-primary-foreground/80">Project Duration</p>
            <p className="text-lg font-bold">400d</p>
            <p className="text-xs text-steel-primary-foreground/60 mt-1">Duration</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1 text-steel-primary-foreground/80">Project Status</p>
            <p className="text-lg font-bold">42%</p>
            <p className="text-xs text-steel-primary-foreground/60 mt-1">% Complete</p>
          </div>
        </div>
      </div>

      {/* Charts and Links Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Chart */}
        <div className="col-span-2">
          <Card className="border-steel-border">
            <CardHeader>
              <CardTitle className="text-foreground">Projects by Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectStageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-background)",
                      border: `1px solid var(--color-border)`,
                    }}
                  />
                  <Bar dataKey="count" fill="var(--color-chart-1)" name="Projects" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Key Links */}
        <div>
          <Card className="border-steel-border h-full">
            <CardHeader>
              <CardTitle className="text-foreground">Key Project Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {keyLinks.map((link, idx) => (
                <button
                  key={idx}
                  className="w-full text-left px-4 py-3 rounded-md hover:bg-secondary/50 transition-colors border border-border text-sm font-medium text-foreground group"
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.title}
                  <span className="float-right text-secondary-foreground group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
