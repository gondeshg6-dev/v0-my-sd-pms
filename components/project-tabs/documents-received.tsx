"use client"

import { useState } from "react"
import { Plus, Download, Trash2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  receivedDate: string
  uploadedBy: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Structural Design Report - Rev 2",
    type: "PDF",
    receivedDate: "2024-03-10",
    uploadedBy: "John Smith",
  },
  {
    id: "2",
    name: "Geotechnical Survey",
    type: "PDF",
    receivedDate: "2024-03-12",
    uploadedBy: "Emily Davis",
  },
  {
    id: "3",
    name: "Site Photos - Phase 1",
    type: "ZIP",
    receivedDate: "2024-03-15",
    uploadedBy: "Mike Chen",
  },
  {
    id: "4",
    name: "Material Specifications",
    type: "DOCX",
    receivedDate: "2024-03-18",
    uploadedBy: "Sarah Johnson",
  },
]

export function DocumentsReceived({ projectId }: { projectId: string }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Document Name</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Received Date</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Uploaded By</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc) => (
              <tr key={doc.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-steel-primary" />
                    <span className="text-foreground font-medium">{doc.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-mono text-muted-foreground">{doc.type}</span>
                </td>
                <td className="py-4 px-4 text-muted-foreground text-sm">
                  {new Date(doc.receivedDate).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 text-foreground">{doc.uploadedBy}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Download className="h-4 w-4 text-steel-primary" />
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

      {filteredDocuments.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No documents found.</div>
      )}
    </div>
  )
}
