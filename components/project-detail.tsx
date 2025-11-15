"use client"

import { useState } from "react"
import { ChevronRight, Bell } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectHealth } from "./project-tabs/project-health"
import { RFICoordinationLogs } from "./project-tabs/rfi-coordination-logs"
import { DocumentsInputs } from "./project-tabs/documents-inputs"
import { ApprovalTransmittal } from "./project-tabs/approval-transmittal"
import { FabricationTransmittal } from "./project-tabs/fabrication-transmittal"
import { TeamWorkflow } from "./project-tabs/team-workflow"
import Link from "next/link"

const mockProjectDetails: Record<
  string,
  {
    name: string
    code: string
    client: string
    startDate: string
    dueDate: string
    progress: number
    status: string
    currentPhase: string
    assignedDetailer: string
  }
> = {
  "1": {
    name: "Stadium Expansion - North Wing",
    code: "PRJ-001",
    client: "Metro City Sports",
    startDate: "2024-01-15",
    dueDate: "2024-06-30",
    progress: 65,
    status: "In Progress",
    currentPhase: "Coordination",
    assignedDetailer: "Mike Chen",
  },
  "2": {
    name: "Commercial Tower Structural Frame",
    code: "PRJ-002",
    client: "ABC Development Corp",
    startDate: "2024-02-01",
    dueDate: "2024-08-15",
    progress: 40,
    status: "In Progress",
    currentPhase: "Modeling",
    assignedDetailer: "Lisa Wong",
  },
}

const mockNotifications = [
  { id: 1, type: "rfi", message: "New RFI RFI-005 added", timestamp: "2024-11-12" },
  { id: 2, type: "transmittal", message: "Approval Transmittal AT-004 added", timestamp: "2024-11-11" },
  { id: 3, type: "change", message: "Fabrication Transmittal FT-004 status updated", timestamp: "2024-11-10" },
]

export function ProjectDetail({ projectId }: { projectId: string }) {
  const project = mockProjectDetails[projectId] || mockProjectDetails["1"]
  const [activeTab, setActiveTab] = useState("health")
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Breadcrumb and Notifications */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                ABC FABRICATION
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{project.name}</span>
              <ChevronRight className="h-4 w-4" />
              <span>Steel Detailing Dashboard</span>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-muted rounded-lg transition-colors relative"
              >
                <Bell className="h-5 w-5 text-foreground" />
                {mockNotifications.length > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg p-4 z-10">
                  <h3 className="font-semibold text-foreground mb-3">Notifications</h3>
                  <div className="space-y-2">
                    {mockNotifications.map((notif) => (
                      <div key={notif.id} className="p-2 bg-muted/50 rounded text-sm text-foreground">
                        <div className="font-medium">{notif.message}</div>
                        <div className="text-xs text-muted-foreground">{notif.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">{project.name}</h1>
              <p className="text-muted-foreground">{project.code}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-2">Client</div>
              <div className="font-semibold text-foreground text-balance">{project.client}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-2">Assigned Detailer</div>
              <div className="font-semibold text-foreground">{project.assignedDetailer}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-2">Current Phase</div>
              <div className="font-semibold text-foreground">{project.currentPhase}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-2">Progress</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
                  <div className="bg-steel-primary h-full rounded-full" style={{ width: `${project.progress}%` }} />
                </div>
                <span className="font-semibold text-foreground text-sm">{project.progress}%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-2">Due Date</div>
              <div className="font-semibold text-foreground">{new Date(project.dueDate).toLocaleDateString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section - Removed Actions and KPIs tabs */}
        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-border overflow-x-auto">
              <div className="px-6 pt-6">
                <TabsList className="grid grid-cols-7 bg-muted w-full">
                  <TabsTrigger value="health" className="text-xs md:text-sm">
                    Health
                  </TabsTrigger>
                  <TabsTrigger value="drawings" className="text-xs md:text-sm">
                    Drawings & Inputs
                  </TabsTrigger>
                  <TabsTrigger value="rfi" className="text-xs md:text-sm">
                    RFI
                  </TabsTrigger>
                  <TabsTrigger value="coordination" className="text-xs md:text-sm">
                    Coord Dwgs
                  </TabsTrigger>
                  <TabsTrigger value="team-workflow" className="text-xs md:text-sm">
                    Team Workflow
                  </TabsTrigger>
                  <TabsTrigger value="approval" className="text-xs md:text-sm">
                    Approval Transmittal
                  </TabsTrigger>
                  <TabsTrigger value="fabrication" className="text-xs md:text-sm">
                    Fabrication Transmittal
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="health" className="p-6">
              <ProjectHealth project={project} projectId={projectId} />
            </TabsContent>

            <TabsContent value="drawings" className="p-6">
              <DocumentsInputs projectId={projectId} />
            </TabsContent>

            <TabsContent value="rfi" className="p-6">
              <RFICoordinationLogs projectId={projectId} isRFIOnly={true} />
            </TabsContent>

            <TabsContent value="coordination" className="p-6">
              <RFICoordinationLogs projectId={projectId} isCoordinationOnly={true} />
            </TabsContent>

            <TabsContent value="team-workflow" className="p-6">
              <TeamWorkflow projectId={projectId} />
            </TabsContent>

            <TabsContent value="approval" className="p-6">
              <ApprovalTransmittal projectId={projectId} />
            </TabsContent>

            <TabsContent value="fabrication" className="p-6">
              <FabricationTransmittal projectId={projectId} />
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  )
}
