import { ProjectDetail } from "@/components/project-detail"

export default function ProjectPage({ params }: { params: { id: string } }) {
  return <ProjectDetail projectId={params.id} />
}
