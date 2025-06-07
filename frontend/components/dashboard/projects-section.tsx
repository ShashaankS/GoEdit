"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FolderOpen, Users, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import type { Project } from "@/types/project"

const mockProjects: Project[] = [
  { id: "1", name: "Go API Server", lastEdited: "2 hours ago", collaborators: 3 },
  { id: "2", name: "React Dashboard", lastEdited: "Yesterday", collaborators: 2 },
  { id: "3", name: "CLI Tool", lastEdited: "3 days ago", collaborators: 1 },
]

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [newProjectName, setNewProjectName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newProjectName.trim()) {
      toast({
        title: "Error",
        description: "Project name cannot be empty",
        variant: "destructive",
      })
      return
    }

    const newProject: Project = {
      id: `${projects.length + 1}`,
      name: newProjectName,
      lastEdited: "Just now",
      collaborators: 1,
    }

    setProjects([newProject, ...projects])
    setNewProjectName("")
    setIsDialogOpen(false)

    toast({
      title: "Project created",
      description: `${newProjectName} has been created successfully.`,
    })
  }

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor/${projectId}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Recent Projects</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Enter project name"
                />
              </div>
              <Button type="submit" className="w-full">
                Create Project
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <FolderOpen className="h-4 w-4 text-blue-500" />
                <CardTitle className="text-base">{project.name}</CardTitle>
              </div>
              <Badge variant="secondary">
                <Users className="mr-1 h-3 w-3" />
                {project.collaborators}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <CardDescription>Last edited {project.lastEdited}</CardDescription>
                <Button size="sm" onClick={() => handleOpenProject(project.id)}>
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No projects yet</p>
              <p className="text-sm text-muted-foreground">Create your first project to get started</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
