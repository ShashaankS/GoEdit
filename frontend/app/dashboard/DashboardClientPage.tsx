"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectsSection } from "@/components/dashboard/projects-section"
import { SessionsSection } from "@/components/dashboard/sessions-section"
import type { Project, Session } from "@/types/project"

type DashboardPageProps = {}

export default function DashboardClientPage({}: DashboardPageProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [newProjectName, setNewProjectName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("auth-token")
    if (!token) {
      router.push("/login")
      return
    }

    // Load projects and sessions
    loadProjects()
    loadSessions()
  }, [router])

  const loadProjects = async () => {
    // In a real app, you would fetch projects from an API
    // For demo purposes, we'll use mock data
    const mockProjects: Project[] = [
      { id: "1", name: "Go API Server", lastEdited: "2 hours ago", collaborators: 3 },
      { id: "2", name: "React Dashboard", lastEdited: "Yesterday", collaborators: 2 },
      { id: "3", name: "CLI Tool", lastEdited: "3 days ago", collaborators: 1 },
    ]
    setProjects(mockProjects)
  }

  const loadSessions = async () => {
    // In a real app, you would fetch active sessions from an API
    // For demo purposes, we'll use mock data
    const mockSessions: Session[] = [
      { id: "s1", name: "Go API Server - Main Branch", activeUsers: 3 },
      { id: "s2", name: "React Dashboard - Feature", activeUsers: 2 },
    ]
    setSessions(mockSessions)
  }

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newProjectName.trim()) {
      toast({
        title: "Error",
        description: "Project name cannot be empty",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would make an API call to create a project
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

  const handleJoinSession = (sessionId: string) => {
    router.push(`/editor/session/${sessionId}`)
  }

  return (
    <DashboardShell>
      <DashboardHeader />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProjectsSection />
        </div>
        <div>
          <SessionsSection />
        </div>
      </div>
    </DashboardShell>
  )
}
