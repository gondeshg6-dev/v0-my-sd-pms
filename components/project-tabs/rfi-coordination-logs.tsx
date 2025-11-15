"use client"

import type React from "react"

import { Filter, Plus, Search, Download, Upload, X, Mail } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface RFI {
  id: string
  number: string
  description: string
  dateRaised: string
  raisedBy: string
  status: "open" | "answered" | "closed"
  daysOpen: number
  rfiFile?: string
  answeredFile?: string
}

interface CoordinationDrawing {
  id: string
  number: string
  receivedDate: string
}

const mockRFIs: Record<string, RFI[]> = {
  "1": [
    {
      id: "r1",
      number: "RFI-001",
      description: "Foundation settlement tolerance clarification",
      dateRaised: "2024-03-01",
      raisedBy: "Detailer",
      status: "answered",
      daysOpen: 5,
      rfiFile: "RFI-001_Original.pdf",
      answeredFile: "RFI-001_Answered.pdf",
    },
    {
      id: "r2",
      number: "RFI-002",
      description: "Column base plate size confirmation",
      dateRaised: "2024-03-05",
      raisedBy: "Fabricator",
      status: "open",
      daysOpen: 3,
      rfiFile: "RFI-002_Original.pdf",
    },
    {
      id: "r3",
      number: "RFI-003",
      description: "Beam to column connection details",
      dateRaised: "2024-03-08",
      raisedBy: "Detailer",
      status: "open",
      daysOpen: 1,
      rfiFile: "RFI-003_Original.pdf",
    },
    {
      id: "r4",
      number: "RFI-004",
      description: "MEP coordination - ductwork clearance",
      dateRaised: "2024-02-20",
      raisedBy: "Other",
      status: "closed",
      daysOpen: 15,
      rfiFile: "RFI-004_Original.pdf",
      answeredFile: "RFI-004_Answered.pdf",
    },
  ],
}

const mockCoordinationDrawings: Record<string, CoordinationDrawing[]> = {
  "1": [
    {
      id: "cd1",
      number: "COORD-101",
      receivedDate: "2024-03-10",
    },
    {
      id: "cd2",
      number: "COORD-102",
      receivedDate: "2024-03-08",
    },
    {
      id: "cd3",
      number: "COORD-103",
      receivedDate: "2024-03-05",
    },
  ],
}

interface RFICoordinationLogsProps {
  projectId: string
  isRFIOnly?: boolean
  isCoordinationOnly?: boolean
}

export function RFICoordinationLogs({ projectId, isRFIOnly, isCoordinationOnly }: RFICoordinationLogsProps) {
  const [rfis, setRfis] = useState<RFI[]>(mockRFIs[projectId] || mockRFIs["1"])
  const coordDrawings = mockCoordinationDrawings[projectId] || mockCoordinationDrawings["1"]
  const [searchTerm, setSearchTerm] = useState("")
  const [uploadModal, setUploadModal] = useState<{ isOpen: boolean; rfiId: string | null }>({
    isOpen: false,
    rfiId: null,
  })
  const [emailModal, setEmailModal] = useState<{ isOpen: boolean; rfiId: string | null }>({
    isOpen: false,
    rfiId: null,
  })
  const [dragActive, setDragActive] = useState(false)

  const filteredRFIs = rfis.filter(
    (r) =>
      r.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const rfiStats = {
    total: rfis.length,
    open: rfis.filter((r) => r.status === "open").length,
    closed: rfis.filter((r) => r.status === "closed").length,
    avgResponse: Math.round(rfis.reduce((sum, r) => sum + r.daysOpen, 0) / rfis.length),
  }

  const handleRFIUpload = (rfiId: string, fileName: string) => {
    console.log("[v0] RFI uploaded to RFI folder:", rfiId, "File:", fileName)
    setRfis(
      rfis.map((rfi) =>
        rfi.id === rfiId
          ? {
              ...rfi,
              status: "answered",
              answeredFile: fileName,
            }
          : rfi,
      ),
    )
    setUploadModal({ isOpen: false, rfiId: null })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0 && uploadModal.rfiId) {
      const file = files[0]
      console.log("[v0] File dropped:", file.name)
      handleRFIUpload(uploadModal.rfiId, file.name)
    }
  }

  const getRFIStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
      case "answered":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
      case "closed":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      {!isCoordinationOnly && (
        <>
          {/* RFI Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-foreground">{rfiStats.total}</div>
                <p className="text-xs text-muted-foreground">Total RFIs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{rfiStats.open}</div>
                <p className="text-xs text-muted-foreground">Open</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{rfiStats.closed}</div>
                <p className="text-xs text-muted-foreground">Closed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-foreground">{rfiStats.avgResponse}</div>
                <p className="text-xs text-muted-foreground">Avg Days to Response</p>
              </CardContent>
            </Card>
          </div>

          {/* RFI Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">RFI Log</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8 bg-transparent">
                    <Filter className="h-3 w-3 mr-1" />
                    Filter
                  </Button>
                  <Button size="sm" className="h-8">
                    <Plus className="h-3 w-3 mr-1" />
                    New RFI
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search RFI number or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">RFI No.</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Description</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Date Raised</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Raised by</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Days Open</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Download RFI</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Upload Answer</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Send Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRFIs.map((rfi) => (
                      <tr key={rfi.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4 font-mono text-sm font-semibold text-steel-primary">{rfi.number}</td>
                        <td className="py-4 px-4 text-sm text-foreground text-balance">{rfi.description}</td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {new Date(rfi.dateRaised).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 text-sm text-foreground">{rfi.raisedBy}</td>
                        <td className="py-4 px-4">
                          <Badge className={`text-xs ${getRFIStatusColor(rfi.status)}`}>
                            {rfi.status === "open" ? "Open" : rfi.status === "answered" ? "Answered" : "Closed"}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-foreground font-medium">{rfi.daysOpen}</td>
                        <td className="py-4 px-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs bg-transparent"
                            onClick={() => {
                              if (rfi.rfiFile) {
                                console.log("[v0] Downloading:", rfi.rfiFile)
                              }
                            }}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </td>
                        <td className="py-4 px-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs bg-transparent"
                            onClick={() => setUploadModal({ isOpen: true, rfiId: rfi.id })}
                          >
                            <Upload className="h-3 w-3" />
                          </Button>
                        </td>
                        <td className="py-4 px-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs bg-transparent"
                            disabled={rfi.status !== "answered"}
                            onClick={() => setEmailModal({ isOpen: true, rfiId: rfi.id })}
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Upload RFI Modal */}
          {uploadModal.isOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-96 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-base">Upload Answered RFI</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUploadModal({ isOpen: false, rfiId: null })}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive
                        ? "border-steel-primary bg-steel-primary/5"
                        : "border-border bg-muted/20 hover:border-steel-primary/50"
                    }`}
                  >
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground mb-1">Drag and drop your answered RFI file</p>
                    <p className="text-xs text-muted-foreground mb-3">or click to browse</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.dwg,.rvt"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file && uploadModal.rfiId) {
                          handleRFIUpload(uploadModal.rfiId, file.name)
                        }
                      }}
                      className="hidden"
                      id="rfi-upload"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("rfi-upload")?.click()}
                      className="text-xs"
                    >
                      Browse Files
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Files will be saved to the RFI file folder
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {emailModal.isOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-96 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-base">Send RFI via Email</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEmailModal({ isOpen: false, rfiId: null })}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground">To</label>
                      <Input placeholder="recipient@example.com" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Subject</label>
                      <Input placeholder="RFI Answer Submission" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Message</label>
                      <textarea
                        placeholder="Add your message here..."
                        className="w-full mt-1 px-3 py-2 border border-border rounded-lg text-sm"
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" onClick={() => setEmailModal({ isOpen: false, rfiId: null })}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        console.log("[v0] Email sent for RFI:", emailModal.rfiId)
                        setEmailModal({ isOpen: false, rfiId: null })
                      }}
                    >
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}

      {!isRFIOnly && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Coordination Drawings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Drawing No.</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Received Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Revision</th>
                  </tr>
                </thead>
                <tbody>
                  {coordDrawings.map((drawing) => (
                    <tr key={drawing.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4 font-mono text-sm font-semibold text-steel-primary">{drawing.number}</td>
                      <td className="py-4 px-4 text-sm text-foreground">
                        {new Date(drawing.receivedDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground">Rev A</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
