"use client"
import { useState } from "react"
import { ChevronDown, Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SubTask {
  taskNumber: string
  scopeOfWork: string
  startDate: string
  endDate: string
  assignedHours: number
  completedHours: number
  assignedBy: string
  assignedTo: string
  status: "In Progress" | "On Hold" | "Done"
  remarks: string
}

interface Task {
  taskNumber: string
  scopeOfWork: string
  startDate: string
  endDate: string
  assignedHours: number
  completedHours: number
  assignedBy: string
  assignedTo: string
  status: "In Progress" | "On Hold" | "Done"
  remarks: string
  subtasks?: SubTask[]
}

interface Section {
  id: string
  name: string
  prefix: string
  tasks: Task[]
}

const mockSections: Section[] = [
  {
    id: "project-study",
    name: "Project Study Tasks",
    prefix: "PS",
    tasks: [
      {
        taskNumber: "PS-001",
        scopeOfWork: "Review project requirements and specifications",
        startDate: "2024-11-15",
        endDate: "2024-11-20",
        assignedHours: 16,
        completedHours: 16,
        assignedBy: "Project Manager",
        assignedTo: "Detailer 1",
        status: "Done",
        remarks: "",
      },
      {
        taskNumber: "PS-002",
        scopeOfWork: "Analyze structural requirements",
        startDate: "2024-11-20",
        endDate: "2024-11-25",
        assignedHours: 20,
        completedHours: 12,
        assignedBy: "Lead Detailer",
        assignedTo: "Detailer 2",
        status: "In Progress",
        remarks: "Currently reviewing",
      },
    ],
  },
  {
    id: "modeling",
    name: "Modeling Tasks",
    prefix: "MT",
    tasks: [
      {
        taskNumber: "MT-001",
        scopeOfWork: "Create 3D structural model",
        startDate: "2024-11-25",
        endDate: "2024-12-05",
        assignedHours: 40,
        completedHours: 20,
        assignedBy: "Lead Detailer",
        assignedTo: "Detailer 1",
        status: "In Progress",
        remarks: "",
        subtasks: [
          {
            taskNumber: "MT-001.1",
            scopeOfWork: "Model main structural frame",
            startDate: "2024-11-25",
            endDate: "2024-11-28",
            assignedHours: 20,
            completedHours: 20,
            assignedBy: "Lead Detailer",
            assignedTo: "Detailer 1",
            status: "Done",
            remarks: "",
          },
          {
            taskNumber: "MT-001.2",
            scopeOfWork: "Add connection details to model",
            startDate: "2024-11-28",
            endDate: "2024-12-05",
            assignedHours: 20,
            completedHours: 0,
            assignedBy: "Lead Detailer",
            assignedTo: "Detailer 1",
            status: "In Progress",
            remarks: "",
          },
        ],
      },
    ],
  },
  {
    id: "model-checking",
    name: "Model Checking Tasks",
    prefix: "MC",
    tasks: [
      {
        taskNumber: "MC-001",
        scopeOfWork: "Verify model accuracy and integrity",
        startDate: "2024-12-05",
        endDate: "2024-12-10",
        assignedHours: 24,
        completedHours: 8,
        assignedBy: "Checker",
        assignedTo: "Checker 1",
        status: "On Hold",
        remarks: "Hold due to RFI-01",
        subtasks: [
          {
            taskNumber: "MC-001.1",
            scopeOfWork: "Structural frame verification",
            startDate: "2024-12-05",
            endDate: "2024-12-07",
            assignedHours: 12,
            completedHours: 8,
            assignedBy: "Checker",
            assignedTo: "Checker 1",
            status: "On Hold",
            remarks: "Awaiting RFI response",
          },
          {
            taskNumber: "MC-001.2",
            scopeOfWork: "Connection details verification",
            startDate: "2024-12-07",
            endDate: "2024-12-10",
            assignedHours: 12,
            completedHours: 0,
            assignedBy: "Checker",
            assignedTo: "Checker 1",
            status: "On Hold",
            remarks: "Awaiting RFI response",
          },
        ],
      },
    ],
  },
  {
    id: "ga-editing",
    name: "GA Editing Tasks",
    prefix: "GAE",
    tasks: [
      {
        taskNumber: "GAE-001",
        scopeOfWork: "Edit and finalize GA drawings",
        startDate: "2024-12-10",
        endDate: "2024-12-20",
        assignedHours: 32,
        completedHours: 8,
        assignedBy: "Lead Detailer",
        assignedTo: "Detailer 3",
        status: "In Progress",
        remarks: "",
        subtasks: [
          {
            taskNumber: "GAE-001.1",
            scopeOfWork: "Layout and dimension GA drawings",
            startDate: "2024-12-10",
            endDate: "2024-12-15",
            assignedHours: 16,
            completedHours: 8,
            assignedBy: "Lead Detailer",
            assignedTo: "Detailer 3",
            status: "In Progress",
            remarks: "",
          },
          {
            taskNumber: "GAE-001.2",
            scopeOfWork: "Add notes and annotations",
            startDate: "2024-12-15",
            endDate: "2024-12-20",
            assignedHours: 16,
            completedHours: 0,
            assignedBy: "Lead Detailer",
            assignedTo: "Detailer 3",
            status: "In Progress",
            remarks: "",
          },
        ],
      },
    ],
  },
  {
    id: "ga-checking",
    name: "GA Checking Tasks",
    prefix: "GAC",
    tasks: [
      {
        taskNumber: "GAC-001",
        scopeOfWork: "Final GA checking and approval",
        startDate: "2024-12-20",
        endDate: "2024-12-28",
        assignedHours: 24,
        completedHours: 0,
        assignedBy: "Checker",
        assignedTo: "Checker 2",
        status: "In Progress",
        remarks: "",
        subtasks: [
          {
            taskNumber: "GAC-001.1",
            scopeOfWork: "Check layout and dimensions",
            startDate: "2024-12-20",
            endDate: "2024-12-24",
            assignedHours: 12,
            completedHours: 0,
            assignedBy: "Checker",
            assignedTo: "Checker 2",
            status: "In Progress",
            remarks: "",
          },
          {
            taskNumber: "GAC-001.2",
            scopeOfWork: "Final approval and sign-off",
            startDate: "2024-12-24",
            endDate: "2024-12-28",
            assignedHours: 12,
            completedHours: 0,
            assignedBy: "Checker",
            assignedTo: "Checker 2",
            status: "In Progress",
            remarks: "",
          },
        ],
      },
    ],
  },
  {
    id: "shop-editing",
    name: "Shop Drawing Editing Tasks",
    prefix: "SDE",
    tasks: [
      {
        taskNumber: "SDE-001",
        scopeOfWork: "Create shop drawing details",
        startDate: "2024-12-15",
        endDate: "2025-01-05",
        assignedHours: 48,
        completedHours: 10,
        assignedBy: "Lead Detailer",
        assignedTo: "Detailer 1",
        status: "In Progress",
        remarks: "",
        subtasks: [
          {
            taskNumber: "SDE-001.1",
            scopeOfWork: "Fabrication piece mark drawings",
            startDate: "2024-12-15",
            endDate: "2024-12-25",
            assignedHours: 24,
            completedHours: 10,
            assignedBy: "Lead Detailer",
            assignedTo: "Detailer 1",
            status: "In Progress",
            remarks: "",
          },
          {
            taskNumber: "SDE-001.2",
            scopeOfWork: "Assembly and erection drawings",
            startDate: "2024-12-25",
            endDate: "2025-01-05",
            assignedHours: 24,
            completedHours: 0,
            assignedBy: "Lead Detailer",
            assignedTo: "Detailer 1",
            status: "In Progress",
            remarks: "",
          },
        ],
      },
    ],
  },
  {
    id: "shop-checking",
    name: "Shop Drawing Checking Tasks",
    prefix: "SDC",
    tasks: [
      {
        taskNumber: "SDC-001",
        scopeOfWork: "Verify shop drawing accuracy",
        startDate: "2025-01-05",
        endDate: "2025-01-15",
        assignedHours: 32,
        completedHours: 0,
        assignedBy: "Checker",
        assignedTo: "Checker 1",
        status: "In Progress",
        remarks: "",
        subtasks: [
          {
            taskNumber: "SDC-001.1",
            scopeOfWork: "Check fabrication drawings",
            startDate: "2025-01-05",
            endDate: "2025-01-10",
            assignedHours: 16,
            completedHours: 0,
            assignedBy: "Checker",
            assignedTo: "Checker 1",
            status: "In Progress",
            remarks: "",
          },
          {
            taskNumber: "SDC-001.2",
            scopeOfWork: "Check erection drawings",
            startDate: "2025-01-10",
            endDate: "2025-01-15",
            assignedHours: 16,
            completedHours: 0,
            assignedBy: "Checker",
            assignedTo: "Checker 1",
            status: "In Progress",
            remarks: "",
          },
        ],
      },
    ],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-yellow-100 text-yellow-800 border-yellow-300"
    case "On Hold":
      return "bg-red-100 text-red-800 border-red-300"
    case "Done":
      return "bg-green-100 text-green-800 border-green-300"
    default:
      return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

const getStatusDot = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-yellow-500"
    case "On Hold":
      return "bg-red-500"
    case "Done":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

export function TeamWorkflow({ projectId }: { projectId: string }) {
  const [sections, setSections] = useState<Section[]>(mockSections)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(mockSections.map((s) => s.id)))
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const toggleTaskExpand = (taskNumber: string) => {
    const newExpanded = new Set(expandedTasks)
    if (newExpanded.has(taskNumber)) {
      newExpanded.delete(taskNumber)
    } else {
      newExpanded.add(taskNumber)
    }
    setExpandedTasks(newExpanded)
  }

  const toggleAllSections = () => {
    if (expandedSections.size === sections.length) {
      setExpandedSections(new Set())
    } else {
      setExpandedSections(new Set(sections.map((s) => s.id)))
    }
  }

  // Calculate summary stats
  const allTasks = sections.flatMap((s) => s.tasks)
  const stats = {
    total: allTasks.length,
    inProgress: allTasks.filter((t) => t.status === "In Progress").length,
    onHold: allTasks.filter((t) => t.status === "On Hold").length,
    done: allTasks.filter((t) => t.status === "Done").length,
  }
  const overallProgress = Math.round((stats.done / stats.total) * 100)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-xs font-medium text-blue-600 mb-1">Total Tasks</div>
            <div className="text-3xl font-bold text-blue-900">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="pt-6">
            <div className="text-xs font-medium text-yellow-600 mb-1">In Progress</div>
            <div className="text-3xl font-bold text-yellow-900">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="pt-6">
            <div className="text-xs font-medium text-red-600 mb-1">On Hold</div>
            <div className="text-3xl font-bold text-red-900">{stats.onHold}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="text-xs font-medium text-green-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-900">{stats.done}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="text-xs font-medium text-purple-600 mb-1">Overall Progress</div>
            <div className="text-3xl font-bold text-purple-900">{overallProgress}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by task number, scope, or assignee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="On Hold">On Hold</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={toggleAllSections} variant="outline" size="sm">
          {expandedSections.size === sections.length ? "Collapse All" : "Expand All"}
        </Button>
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const sectionTasks = section.tasks
          const completedCount = sectionTasks.filter((t) => t.status === "Done").length
          const progressPercent = Math.round((completedCount / sectionTasks.length) * 100)

          return (
            <Card key={section.id} className="overflow-hidden border-l-4 border-l-steel-primary">
              <div
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-steel-primary to-steel-accent text-white cursor-pointer hover:from-steel-primary/90 hover:to-steel-accent/90 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <ChevronDown
                      className={`h-5 w-5 transition-transform flex-shrink-0 ${
                        expandedSections.has(section.id) ? "" : "-rotate-90"
                      }`}
                    />
                    <h3 className="text-lg font-semibold">{section.name}</h3>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">
                      {completedCount} of {sectionTasks.length} done
                    </span>
                  </div>
                  <div className="ml-8 mt-2 w-32 bg-white/20 rounded-full h-2 overflow-hidden">
                    <div className="bg-white h-full transition-all" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              </div>

              {expandedSections.has(section.id) && (
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 sticky top-0 z-10">
                          <th className="px-4 py-2 text-left font-semibold text-slate-900 w-24">Task #</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-900 flex-1 min-w-40">SOW</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-900 w-24">Start</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-900 w-24">End</th>
                          <th className="px-4 py-2 text-center font-semibold text-slate-900 w-20">Assigned Hrs</th>
                          <th className="px-4 py-2 text-center font-semibold text-slate-900 w-20">Completed Hrs</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-900 w-28">Assigned By</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-900 w-28">Assigned To</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-900 w-32">Status</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-900 flex-1 min-w-40">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.tasks.map((task) => {
                          const matchesSearch =
                            searchTerm === "" ||
                            task.taskNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            task.scopeOfWork.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
                          const matchesStatus = filterStatus === "all" || task.status === filterStatus

                          if (!matchesSearch || !matchesStatus) return null

                          return (
                            <>
                              {/* Parent task row */}
                              <tr
                                key={task.taskNumber}
                                className="border-b border-slate-200 hover:bg-blue-50/30 transition-colors"
                              >
                                <td className="px-4 py-2 font-semibold text-slate-900 whitespace-nowrap">
                                  {task.taskNumber}
                                </td>
                                <td className="px-4 py-2 text-slate-700 text-xs">{task.scopeOfWork}</td>
                                <td className="px-4 py-2 text-slate-700 text-xs">{task.startDate}</td>
                                <td className="px-4 py-2 text-slate-700 text-xs">{task.endDate}</td>
                                <td className="px-4 py-2 text-slate-700 text-xs text-center">{task.assignedHours}</td>
                                <td className="px-4 py-2 text-slate-700 text-xs text-center">{task.completedHours}</td>
                                <td className="px-4 py-2 text-slate-700 text-xs">{task.assignedBy}</td>
                                <td className="px-4 py-2 text-slate-700 text-xs font-medium">{task.assignedTo}</td>
                                <td className="px-4 py-2">
                                  <div className="flex items-center gap-1">
                                    <div className={`h-2.5 w-2.5 rounded-full ${getStatusDot(task.status)}`} />
                                    <span
                                      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold border ${getStatusColor(
                                        task.status,
                                      )}`}
                                    >
                                      {task.status}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-4 py-2 text-slate-700 text-xs">
                                  {task.remarks && (
                                    <span
                                      className={`${
                                        task.status === "On Hold" ? "text-red-600 font-medium" : "text-slate-600"
                                      }`}
                                    >
                                      {task.remarks}
                                    </span>
                                  )}
                                </td>
                              </tr>
                              {/* Subtasks rows */}
                              {task.subtasks &&
                                expandedTasks.has(task.taskNumber) &&
                                task.subtasks.map((subtask) => (
                                  <tr
                                    key={subtask.taskNumber}
                                    className="border-b border-slate-200 bg-slate-50/50 hover:bg-blue-50/20 transition-colors"
                                  >
                                    <td className="px-4 py-2 font-semibold text-slate-700 whitespace-nowrap pl-8">
                                      {subtask.taskNumber}
                                    </td>
                                    <td className="px-4 py-2 text-slate-600 text-xs">{subtask.scopeOfWork}</td>
                                    <td className="px-4 py-2 text-slate-600 text-xs">{subtask.startDate}</td>
                                    <td className="px-4 py-2 text-slate-600 text-xs">{subtask.endDate}</td>
                                    <td className="px-4 py-2 text-slate-600 text-xs text-center">
                                      {subtask.assignedHours}
                                    </td>
                                    <td className="px-4 py-2 text-slate-600 text-xs text-center">
                                      {subtask.completedHours}
                                    </td>
                                    <td className="px-4 py-2 text-slate-600 text-xs">{subtask.assignedBy}</td>
                                    <td className="px-4 py-2 text-slate-600 text-xs font-medium">
                                      {subtask.assignedTo}
                                    </td>
                                    <td className="px-4 py-2">
                                      <div className="flex items-center gap-1">
                                        <div className={`h-2.5 w-2.5 rounded-full ${getStatusDot(subtask.status)}`} />
                                        <span
                                          className={`inline-block px-2 py-0.5 rounded text-xs font-semibold border ${getStatusColor(
                                            subtask.status,
                                          )}`}
                                        >
                                          {subtask.status}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-2 text-slate-600 text-xs">
                                      {subtask.remarks && (
                                        <span
                                          className={`${
                                            subtask.status === "On Hold" ? "text-red-600 font-medium" : "text-slate-600"
                                          }`}
                                        >
                                          {subtask.remarks}
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                            </>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end p-4 border-t border-slate-200 bg-slate-50">
                    <Button
                      size="sm"
                      className="flex items-center gap-2 bg-steel-primary hover:bg-steel-accent text-white"
                    >
                      <Plus className="h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
