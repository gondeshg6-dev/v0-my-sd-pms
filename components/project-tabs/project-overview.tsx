import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectOverviewProps {
  project: {
    name: string
    description: string
    teamMembers: { name: string; role: string }[]
    milestones: { date: string; description: string }[]
  }
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Project Description */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Project Description</h3>
        <p className="text-muted-foreground">{project.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.teamMembers.map((member, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-steel-primary mt-2" />
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {new Date(milestone.date).toLocaleDateString()}
                    </p>
                    <p className="text-muted-foreground text-sm">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
