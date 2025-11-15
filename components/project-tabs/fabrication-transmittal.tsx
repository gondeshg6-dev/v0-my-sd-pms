"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download, ChevronDown, Mail, X, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockFabricationTransmittals = [
  {
    id: "FT-001",
    sentDate: "2024-11-01",
    description: "Structural frame fabrication drawings",
    status: "Fabrication In Progress",
    fabricationStartDate: "2024-11-02",
    remarks: "Structural frame fabrication underway",
  },
  {
    id: "FT-002",
    sentDate: "2024-10-20",
    description: "Connection details fabrication",
    status: "Fabrication Complete",
    fabricationStartDate: "2024-10-21",
    remarks: "All connection details fabricated per specifications",
  },
  {
    id: "FT-003",
    sentDate: "2024-10-05",
    description: "Material procurement and planning",
    status: "Ready for Fabrication",
    fabricationStartDate: null,
    remarks: "Awaiting material procurement",
  },
]

export function FabricationTransmittal({ projectId }: { projectId: string }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [emailModal, setEmailModal] = useState<{ isOpen: boolean; transmittalId: string | null }>({
    isOpen: false,
    transmittalId: null,
  })
  const [addTransmittalModal, setAddTransmittalModal] = useState(false)

  const filteredTransmittals = mockFabricationTransmittals.filter(
    (transmittal) =>
      transmittal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transmittal.remarks.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Fabrication Complete":
        return "bg-green-100 text-green-800"
      case "Fabrication In Progress":
        return "bg-blue-100 text-blue-800"
      case "Ready for Fabrication":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-6 justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by transmittal ID or remarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => setAddTransmittalModal(true)}
          className="bg-steel-primary hover:bg-steel-accent text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Transmittal
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="w-28 px-4 py-3 text-left text-sm font-semibold text-foreground">Transmittal ID</th>
              <th className="w-28 px-4 py-3 text-left text-sm font-semibold text-foreground">Sent Date</th>
              <th className="w-40 px-4 py-3 text-left text-sm font-semibold text-foreground">Description</th>
              <th className="w-32 px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="w-24 px-4 py-3 text-left text-sm font-semibold text-foreground">Download Transmittal</th>
              <th className="w-20 px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="w-12 px-4 py-3 text-left text-sm font-semibold text-foreground">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransmittals.map((transmittal) => (
              <>
                <tr
                  key={transmittal.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setExpandedId(expandedId === transmittal.id ? null : transmittal.id)}
                >
                  <td className="w-28 px-4 py-3 text-sm font-medium text-foreground">{transmittal.id}</td>
                  <td className="w-28 px-4 py-3 text-sm text-foreground">
                    {new Date(transmittal.sentDate).toLocaleDateString()}
                  </td>
                  <td className="w-40 px-4 py-3 text-sm text-foreground">{transmittal.description}</td>
                  <td className="w-32 px-4 py-3 text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(transmittal.status)}`}
                    >
                      {transmittal.status}
                    </span>
                  </td>
                  <td className="w-24 px-4 py-3">
                    <Button size="sm" variant="outline" className="h-8 text-xs bg-transparent">
                      <Download className="h-3 w-3" />
                    </Button>
                  </td>
                  <td className="w-20 px-4 py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs bg-transparent"
                      onClick={() => setEmailModal({ isOpen: true, transmittalId: transmittal.id })}
                    >
                      <Mail className="h-3 w-3" />
                    </Button>
                  </td>
                  <td className="w-12 px-4 py-3">
                    <button className="text-steel-primary hover:text-steel-dark transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </td>
                </tr>

                {expandedId === transmittal.id && (
                  <tr className="bg-muted/30 border-b border-border">
                    <td colSpan={7} className="px-4 py-4">
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Details</label>
                          <p className="text-sm text-foreground mt-1">{transmittal.remarks}</p>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase">
                            Fabrication Start Date
                          </label>
                          <p className="text-sm text-foreground mt-1">
                            {transmittal.fabricationStartDate
                              ? new Date(transmittal.fabricationStartDate).toLocaleDateString()
                              : "Not started"}
                          </p>
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

      {/* Email Modal */}
      {emailModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Send Transmittal via Email</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEmailModal({ isOpen: false, transmittalId: null })}
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
                  <Input placeholder="Fabrication Transmittal Submission" className="mt-1" />
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
                <Button variant="outline" onClick={() => setEmailModal({ isOpen: false, transmittalId: null })}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log("[v0] Email sent for transmittal:", emailModal.transmittalId)
                    setEmailModal({ isOpen: false, transmittalId: null })
                  }}
                >
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {addTransmittalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 shadow-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Add New Transmittal</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setAddTransmittalModal(false)} className="h-6 w-6 p-0">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Transmittal ID</label>
                  <Input placeholder="FT-XXX" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Sent Date</label>
                  <Input type="date" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <textarea
                    placeholder="Add description..."
                    className="w-full mt-1 px-3 py-2 border border-border rounded-lg text-sm"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Status</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ready for Fabrication">Ready for Fabrication</SelectItem>
                      <SelectItem value="Fabrication In Progress">Fabrication In Progress</SelectItem>
                      <SelectItem value="Fabrication Complete">Fabrication Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setAddTransmittalModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log("[v0] New transmittal added")
                    setAddTransmittalModal(false)
                  }}
                  className="bg-steel-primary hover:bg-steel-accent"
                >
                  Add Transmittal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
