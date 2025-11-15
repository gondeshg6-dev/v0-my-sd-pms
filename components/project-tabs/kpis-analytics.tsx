"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const deliverableMetrics = [
  { month: "Jan", planned: 12, issued: 8 },
  { month: "Feb", planned: 15, issued: 14 },
  { month: "Mar", planned: 18, issued: 16 },
  { month: "Apr", planned: 20, issued: 12 },
  { month: "May", planned: 22, issued: 20 },
]

const rfiTrendData = [
  { week: "Wk1", rfiRaised: 2, rfiClosed: 0 },
  { week: "Wk2", rfiRaised: 3, rfiClosed: 1 },
  { week: "Wk3", rfiRaised: 2, rfiClosed: 2 },
  { week: "Wk4", rfiRaised: 4, rfiClosed: 3 },
]

export function KPIsAnalytics({ projectId }: { projectId: string }) {
  const kpiCards = [
    {
      title: "Deliverables On Time",
      value: "85%",
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Avg RFI Response Time",
      value: "3.2 days",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Revisions per Drawing",
      value: "1.8",
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      title: "Schedule Adherence",
      value: "92%",
      color: "text-purple-600 dark:text-purple-400",
    },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpiCards.map((kpi, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">{kpi.title}</p>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Drawings Issued vs Planned</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              planned: {
                label: "Planned",
                color: "hsl(var(--chart-1))",
              },
              issued: {
                label: "Issued",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliverableMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="planned" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="issued" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">RFI Trend (4-Week)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              rfiRaised: {
                label: "RFI Raised",
                color: "hsl(var(--chart-3))",
              },
              rfiClosed: {
                label: "RFI Closed",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rfiTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rfiRaised"
                  stroke="var(--color-chart-3)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-chart-3)", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="rfiClosed"
                  stroke="var(--color-chart-4)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-chart-4)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
