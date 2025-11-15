"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function DashboardSidebar() {
  const [formData, setFormData] = useState({
    projectType: "",
    projectId: "",
    projectName: "",
    stage: "",
    client: "",
    salesRep: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Project submitted:", formData)
    setFormData({
      projectType: "",
      projectId: "",
      projectName: "",
      stage: "",
      client: "",
      salesRep: "",
    })
  }

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground p-6 overflow-y-auto border-r border-sidebar-border">
      {/* Header Logo */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-steel-accent to-steel-accent/70 p-3 rounded-lg w-fit">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h8v8H3V3m10 0h8v8h-8V3M3 13h8v8H3v-8m10 0h8v8h-8v-8" />
          </svg>
        </div>
        <h1 className="text-xl font-bold mt-2">Steel Details</h1>
      </div>

      {/* Submit Form */}
      <Card className="bg-sidebar-accent/50 border-sidebar-border mb-6 p-4">
        <h2 className="font-semibold text-sm mb-4 text-sidebar-foreground">Submit New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-medium mb-1 block text-sidebar-foreground/80">Project Type</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-background text-foreground border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select Type</option>
              <option value="structural">Structural</option>
              <option value="fabrication">Fabrication</option>
              <option value="installation">Installation</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium mb-1 block text-sidebar-foreground/80">Project ID</label>
            <Input
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              placeholder="P-001"
              className="text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-medium mb-1 block text-sidebar-foreground/80">Project Name</label>
            <Input
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Project name"
              className="text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-medium mb-1 block text-sidebar-foreground/80">Stage</label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-background text-foreground border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select Stage</option>
              <option value="design">Design</option>
              <option value="planning">Planning</option>
              <option value="fabrication">Fabrication</option>
              <option value="installation">Installation</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium mb-1 block text-sidebar-foreground/80">Client</label>
            <Input
              name="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="Client name"
              className="text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-medium mb-1 block text-sidebar-foreground/80">Sales Rep</label>
            <Input
              name="salesRep"
              value={formData.salesRep}
              onChange={handleChange}
              placeholder="Rep name"
              className="text-sm"
            />
          </div>

          <Button type="submit" className="w-full bg-steel-accent hover:bg-steel-accent/90 text-white font-medium py-2">
            Submit Project
          </Button>
        </form>
      </Card>
    </div>
  )
}
