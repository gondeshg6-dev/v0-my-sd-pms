"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface RFI {
  id: string
  number: string
  description: string
  dateRaised: string
  responseStatus: "Pending" | "In Review" | "Resolved"
  assignedTo: string
}

const mockRFIs: RFI[] = [
  {
    id: "1",
    number: "RFI-001",
    description: "Clarification needed on beam connection details",
    dateRaised: "2024-03-15",
    responseStatus: "Resolved",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "2",
    number: "RFI-002",
    description: "Confirm anchor bolt sizing for column base plates",
    dateRaised: "2024-03-18",
    responseStatus: "In Review",
    assignedTo: "Mike Chen",
  },
  {
    id: "3",
    number: "RFI-003",
    description: "Request modification to lateral bracing layout",
    dateRaised: "2024-03-20",
    responseStatus: "Pending",
    assignedTo: "Sarah Johnson",
  },
]

export function RFILogs({ projectId }: { projectId: string }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [rfiList, setRfiList] = useState<RFI[]>(mockRFIs)

  const filteredRFIs = rfiList.filter(
    (rfi) =>
      rfi.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rfi.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "In Review":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search RFIs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New RFI
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">RFI No.</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Description</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Date Raised</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Response Status</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Assigned To</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRFIs.map((rfi) => (
              <tr key={rfi.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4 font-mono text-sm font-medium text-steel-primary">{rfi.number}</td>
                <td className="py-4 px-4 text-foreground">{rfi.description}</td>
                <td className="py-4 px-4 text-muted-foreground text-sm">
                  {new Date(rfi.dateRaised).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rfi.responseStatus)}`}>
                    {rfi.responseStatus}
                  </span>
                </td>
                <td className="py-4 px-4 text-foreground">{rfi.assignedTo}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit2 className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRFIs.length === 0 && <div className="text-center py-8 text-muted-foreground">No RFIs found.</div>}
    </div>
  )
}
