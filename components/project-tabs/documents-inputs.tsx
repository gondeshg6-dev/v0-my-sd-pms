"use client"

import { Search, Upload, ChevronDown, Download, Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface RevisionHistory {
  revision: string
  dateReceived: string
  uploadedBy: string
  changeSummary: string
  status: "active" | "superseded"
  fileLink: string
}

interface Drawing {
  id: string
  drawingNo: string
  title: string
  discipline: "Structural" | "Architectural" | "Mechanical" | "Other"
  currentRevision: string
  revisionDate: string
  receivedFrom: string
  status: "Received" | "Awaiting Next Rev" | "Superseded" | "Approved for Detailing"
  fileLink: string
  linkedArea: string
  comments: string
  revisionHistory: RevisionHistory[]
}

const mockDrawings: Record<string, Drawing[]> = {
  "1": [
    {
      id: "drw1",
      drawingNo: "STR-001",
      title: "Foundation Plan - North Wing",
      discipline: "Structural",
      currentRevision: "Rev B",
      revisionDate: "2025-09-04",
      receivedFrom: "John (Fabricator)",
      status: "Approved for Detailing",
      fileLink: "/files/STR-001-RevB.pdf",
      linkedArea: "Zone A-North",
      comments: "Added baseplate stiffeners",
      revisionHistory: [
        {
          revision: "Rev A",
          dateReceived: "2025-08-15",
          uploadedBy: "John (Fabricator)",
          changeSummary: "Initial Issue",
          status: "superseded",
          fileLink: "/files/STR-001-RevA.pdf",
        },
        {
          revision: "Rev B",
          dateReceived: "2025-09-04",
          uploadedBy: "John (Fabricator)",
          changeSummary: "Added baseplate stiffeners",
          status: "active",
          fileLink: "/files/STR-001-RevB.pdf",
        },
      ],
    },
    {
      id: "drw2",
      drawingNo: "STR-002",
      title: "Column Details - Section C",
      discipline: "Structural",
      currentRevision: "Rev A",
      revisionDate: "2025-08-20",
      receivedFrom: "Maria (Fabricator)",
      status: "Awaiting Next Rev",
      fileLink: "/files/STR-002-RevA.pdf",
      linkedArea: "Zone C-Central",
      comments: "Pending bolt hole updates",
      revisionHistory: [
        {
          revision: "Rev A",
          dateReceived: "2025-08-20",
          uploadedBy: "Maria (Fabricator)",
          changeSummary: "Initial Issue",
          status: "active",
          fileLink: "/files/STR-002-RevA.pdf",
        },
      ],
    },
    {
      id: "drw3",
      drawingNo: "ARCH-001",
      title: "Architectural Elevation - West",
      discipline: "Architectural",
      currentRevision: "Rev C",
      revisionDate: "2025-08-10",
      receivedFrom: "Design Team",
      status: "Superseded",
      fileLink: "/files/ARCH-001-RevC.pdf",
      linkedArea: "Zone W-West",
      comments: "Replaced by latest revision",
      revisionHistory: [
        {
          revision: "Rev A",
          dateReceived: "2025-08-01",
          uploadedBy: "Design Team",
          changeSummary: "Initial Issue",
          status: "superseded",
          fileLink: "/files/ARCH-001-RevA.pdf",
        },
        {
          revision: "Rev B",
          dateReceived: "2025-08-05",
          uploadedBy: "Design Team",
          changeSummary: "Window opening adjustments",
          status: "superseded",
          fileLink: "/files/ARCH-001-RevB.pdf",
        },
        {
          revision: "Rev C",
          dateReceived: "2025-08-10",
          uploadedBy: "Design Team",
          changeSummary: "Final detailing notes added",
          status: "active",
          fileLink: "/files/ARCH-001-RevC.pdf",
        },
      ],
    },
  ],
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved for Detailing":
      return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
    case "Awaiting Next Rev":
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
    case "Superseded":
      return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
    case "Received":
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
    default:
      return ""
  }
}

const getDisciplineColor = (discipline: string) => {
  switch (discipline) {
    case "Structural":
      return "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
    case "Architectural":
      return "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
    case "Mechanical":
      return "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
    default:
      return "bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300"
  }
}

export function DocumentsInputs({ projectId }: { projectId: string }) {
  const drawings = mockDrawings[projectId] || mockDrawings["1"]
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDiscipline, setFilterDiscipline] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [expandedDrawing, setExpandedDrawing] = useState<string | null>(null)
  const [showLatestOnly, setShowLatestOnly] = useState(true)

  const filteredDrawings = drawings.filter((d) => {
    const matchesSearch =
      d.drawingNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDiscipline = !filterDiscipline || d.discipline === filterDiscipline
    const matchesStatus = !filterStatus || d.status === filterStatus
    return matchesSearch && matchesDiscipline && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Fabricator Drawings Register */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-base">Fabricator Drawings Register</CardTitle>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 bg-transparent">
                <Plus className="h-3 w-3 mr-1" />
                New Drawing
              </Button>
              <Button size="sm" className="h-8">
                <Upload className="h-3 w-3 mr-1" />
                Upload Revision
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search drawing no. or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterDiscipline || ""}
                onChange={(e) => setFilterDiscipline(e.target.value || null)}
                className="px-3 py-2 border border-border rounded-md text-sm bg-background"
              >
                <option value="">All Disciplines</option>
                <option value="Structural">Structural</option>
                <option value="Architectural">Architectural</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Other">Other</option>
              </select>
              <select
                value={filterStatus || ""}
                onChange={(e) => setFilterStatus(e.target.value || null)}
                className="px-3 py-2 border border-border rounded-md text-sm bg-background"
              >
                <option value="">All Status</option>
                <option value="Approved for Detailing">Approved for Detailing</option>
                <option value="Awaiting Next Rev">Awaiting Next Rev</option>
                <option value="Superseded">Superseded</option>
                <option value="Received">Received</option>
              </select>
              <label className="flex items-center gap-2 px-3 py-2 text-sm whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={showLatestOnly}
                  onChange={(e) => setShowLatestOnly(e.target.checked)}
                  className="h-4 w-4"
                />
                Latest Only
              </label>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm w-12"></th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm w-24">Drawing No.</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm flex-1">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm w-28">Discipline</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm w-20">Current Rev</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm w-28">Revision Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm w-32">Received From</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm w-40">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrawings.map((drawing) => (
                  <>
                    <tr
                      key={drawing.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => setExpandedDrawing(expandedDrawing === drawing.id ? null : drawing.id)}
                    >
                      <td className="py-4 px-4 w-12">
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${expandedDrawing === drawing.id ? "rotate-180" : ""}`}
                        />
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-foreground w-24">
                        <div className="font-bold">{drawing.drawingNo}</div>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground flex-1">
                        <div className="text-balance">{drawing.title}</div>
                      </td>
                      <td className="py-4 px-4 text-sm w-28">
                        <Badge variant="secondary" className={getDisciplineColor(drawing.discipline)}>
                          {drawing.discipline}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-foreground w-20">{drawing.currentRevision}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground w-28">
                        {new Date(drawing.revisionDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground w-32">{drawing.receivedFrom}</td>
                      <td className="py-4 px-4 w-40">
                        <Badge className={`text-xs ${getStatusColor(drawing.status)}`}>{drawing.status}</Badge>
                      </td>
                    </tr>

                    {/* Revision History Drawer */}
                    {expandedDrawing === drawing.id && (
                      <tr className="border-b border-border bg-muted/30">
                        <td colSpan={8} className="p-6">
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                              <div>
                                <div className="text-xs text-muted-foreground">Linked Area / Zone</div>
                                <div className="text-sm font-medium text-foreground">{drawing.linkedArea}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">File Link</div>
                                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                                  <Download className="h-3 w-3 mr-1" />
                                  Download
                                </Button>
                              </div>
                              <div className="md:col-span-2">
                                <div className="text-xs text-muted-foreground">Remarks</div>
                                <div className="text-sm text-foreground">{drawing.comments}</div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm text-foreground mb-3">Revision History</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-border/50">
                                      <th className="text-left py-2 px-3 font-medium text-muted-foreground text-xs">
                                        Revision
                                      </th>
                                      <th className="text-left py-2 px-3 font-medium text-muted-foreground text-xs">
                                        Date Received
                                      </th>
                                      <th className="text-left py-2 px-3 font-medium text-muted-foreground text-xs">
                                        Uploaded By
                                      </th>
                                      <th className="text-left py-2 px-3 font-medium text-muted-foreground text-xs">
                                        Change Summary
                                      </th>
                                      <th className="text-left py-2 px-3 font-medium text-muted-foreground text-xs">
                                        Status
                                      </th>
                                      <th className="text-left py-2 px-3 font-medium text-muted-foreground text-xs">
                                        File
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {drawing.revisionHistory.map((rev, idx) => (
                                      <tr key={idx} className="border-b border-border/50 hover:bg-muted/50">
                                        <td className="py-3 px-3 font-semibold text-foreground">{rev.revision}</td>
                                        <td className="py-3 px-3 text-muted-foreground">
                                          {new Date(rev.dateReceived).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-3 text-foreground text-xs">{rev.uploadedBy}</td>
                                        <td className="py-3 px-3 text-foreground text-xs">{rev.changeSummary}</td>
                                        <td className="py-3 px-3">
                                          <Badge
                                            variant="secondary"
                                            className={
                                              rev.status === "active"
                                                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                                                : "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200"
                                            }
                                          >
                                            {rev.status === "active" ? "Active" : "Superseded"}
                                          </Badge>
                                        </td>
                                        <td className="py-3 px-3">
                                          <Button size="sm" variant="ghost" className="h-6 px-2">
                                            <Download className="h-3 w-3" />
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
