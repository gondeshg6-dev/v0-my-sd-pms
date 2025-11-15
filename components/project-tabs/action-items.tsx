"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ActionItem {
  id: string
  description: string
  owner: string
  dueDate: string
  status: "open" | "in-progress" | "closed"
  isOverdue: boolean
}

const mockActionItems: Record<string, ActionItem[]> = {
  "1": [
    {
      id: "a1",
      description: "Revise foundation bolt pattern per RFI-002",
      owner: "Detailer",
      dueDate: "2024-03-18",
      status: "in-progress",
      isOverdue: false,
    },
    {
      id: "a2",
      description: "Coordinate with MEP on ductwork routing",
      owner: "Fabricator",
      dueDate: "2024-03-15",
      status: "open",
      isOverdue: true,
    },
    {
      id: "a3",
      description: "Submit column connection samples",
      owner: "Fabricator",
      dueDate: "2024-03-25",
      status: "open",
      isOverdue: false,
    },
    {
      id: "a4",
      description: "Final approval on shop drawings",
      owner: "Detailer",
      dueDate: "2024-03-12",
      status: "closed",
      isOverdue: false,
    },
  ],
}

export function ActionItems({ projectId }: { projectId: string }) {
  const actionItems = mockActionItems[projectId] || mockActionItems["1"]

  const getStatusColor = (status: string, isOverdue: boolean) => {
    if (isOverdue && status !== "closed") {
      return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
    }
    switch (status) {
      case "open":
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200"
      case "in-progress":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
      case "closed":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Current Action Items</h3>
        <Button size="sm" className="h-8">
          <Plus className="h-3 w-3 mr-1" />
          New Action
        </Button>
      </div>

      <div className="space-y-3">
        {actionItems.map((item) => (
          <Card
            key={item.id}
            className={item.isOverdue && item.status !== "closed" ? "border-red-200 dark:border-red-800" : ""}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground text-sm mb-2">{item.description}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Owner:</span>
                      <span className="font-medium text-foreground">{item.owner}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Due:</span>
                      <span
                        className={`font-medium ${item.isOverdue && item.status !== "closed" ? "text-red-600 dark:text-red-400" : "text-foreground"}`}
                      >
                        {new Date(item.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getStatusColor(item.status, item.isOverdue)}`}>
                    {item.isOverdue && item.status !== "closed"
                      ? "OVERDUE"
                      : item.status === "open"
                        ? "Open"
                        : item.status === "in-progress"
                          ? "In Progress"
                          : "Closed"}
                  </Badge>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
