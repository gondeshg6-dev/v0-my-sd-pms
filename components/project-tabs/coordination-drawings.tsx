"use client"

import { useState } from "react"
import { Plus, Eye, Download, Trash2, FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Drawing {
  id: string
  number: string
  description: string
  revision: string
  receivedDate: string
}

const mockDrawings: Drawing[] = [
  {
    id: "1",
    number: "DWG-001",
    description: "Structural General Arrangement",
    revision: "Rev 2",
    receivedDate: "2024-03-10",
  },
  {
    id: "2",
    number: "DWG-002",
    description: "Column Connection Details",
    revision: "Rev 1",
    receivedDate: "2024-03-08",
  },
  {
    id: "3",
    number: "DWG-003",
    description: "Beam Layout Plan",
    revision: "Rev 3",
    receivedDate: "2024-03-05",
  },
  {
    id: "4",
    number: "DWG-004",
    description: "Lateral Bracing System",
    revision: "Draft",
    receivedDate: "2024-03-01",
  },
]

export function CoordinationDrawings({ projectId }: { projectId: string }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [drawings, setDrawings] = useState<Drawing[]>(mockDrawings)

  const filteredDrawings = drawings.filter(
    (drawing) =>
      drawing.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drawing.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search drawings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Upload Drawing
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Drawing No.</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Received Date</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Description</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Revision</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrawings.map((drawing) => (
              <tr key={drawing.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4 font-mono text-sm font-medium text-steel-primary">{drawing.number}</td>
                <td className="py-4 px-4 text-sm text-foreground">
                  {new Date(drawing.receivedDate).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <FileImage className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">{drawing.description}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-muted-foreground font-mono text-sm">{drawing.revision}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="View">
                      <Eye className="h-4 w-4 text-steel-primary" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Download">
                      <Download className="h-4 w-4 text-steel-primary" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Delete">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredDrawings.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No drawings found.</div>
      )}
    </div>
  )
}
