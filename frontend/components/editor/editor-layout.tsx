"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { EditorHeader } from "./editor-header"
import { FileExplorer } from "./file-explorer"
import { UserPanel } from "./user-panel"
import { MonacoEditor } from "./monaco-editor"
import { useToast } from "@/hooks/use-toast"
import type { File, User } from "@/types/project"

interface EditorLayoutProps {
  projectId: string
}

export function EditorLayout({ projectId }: EditorLayoutProps) {
  const [files, setFiles] = useState<File[]>([])
  const [activeFile, setActiveFile] = useState<File | null>(null)
  const [activeUsers, setActiveUsers] = useState<User[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    if (!token) {
      router.push("/login")
      return
    }

    loadProjectData()
    connectWebSocket()
  }, [projectId, router])

  const loadProjectData = async () => {
    try {
      const mockFiles: File[] = [
        {
          id: "f1",
          name: "main.go",
          type: "file",
          content: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    // Start coding here...
}`,
        },
        {
          id: "f2",
          name: "utils.go",
          type: "file",
          content: `package main

import "fmt"

func add(a, b int) int {
    return a + b
}

func multiply(a, b int) int {
    return a * b
}`,
        },
        {
          id: "f3",
          name: "src",
          type: "folder",
          children: [
            {
              id: "f4",
              name: "app.go",
              type: "file",
              content: `package src

import "fmt"

func Run() {
    fmt.Println("Running application...")
}`,
            },
          ],
        },
        {
          id: "f5",
          name: "README.md",
          type: "file",
          content: `# Project ${projectId}

This is a collaborative Go project.

## Getting Started

1. Install Go
2. Run \`go run main.go\`
3. Start coding!

## Features

- Real-time collaboration
- Syntax highlighting
- Multiple file support
`,
        },
      ]

      setFiles(mockFiles)
      setActiveFile(mockFiles[0])

      const mockUsers: User[] = [
        { id: "u1", name: "You", color: "blue", status: "editing" },
        { id: "u2", name: "Alice", color: "red", status: "viewing" },
        { id: "u3", name: "Bob", color: "green", status: "editing" },
      ]
      setActiveUsers(mockUsers)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load project data",
        variant: "destructive",
      })
    }
  }

  const connectWebSocket = () => {
    setTimeout(() => {
      setIsConnected(true)
      toast({
        title: "Connected",
        description: "Real-time collaboration is now active",
      })
    }, 1000)
  }

  const handleFileSelect = (file: File) => {
    if (file.type === "file") {
      setActiveFile(file)
    }
  }

  const handleCodeChange = (newCode: string) => {
    if (activeFile) {
      const updatedFiles = updateFileContent(files, activeFile.id, newCode)
      setFiles(updatedFiles)

      const updatedFile = { ...activeFile, content: newCode }
      setActiveFile(updatedFile)
    }
  }

  const updateFileContent = (files: File[], fileId: string, newContent: string): File[] => {
    return files.map((file) => {
      if (file.id === fileId) {
        return { ...file, content: newContent }
      } else if (file.type === "folder" && file.children) {
        return {
          ...file,
          children: updateFileContent(file.children, fileId, newContent),
        }
      }
      return file
    })
  }

  const getLanguageFromFileName = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase()

    switch (extension) {
      case "js":
        return "javascript"
      case "ts":
        return "typescript"
      case "jsx":
      case "tsx":
        return "typescript"
      case "html":
        return "html"
      case "css":
        return "css"
      case "json":
        return "json"
      case "go":
        return "go"
      case "py":
        return "python"
      case "md":
        return "markdown"
      default:
        return "plaintext"
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <EditorHeader projectId={projectId} isConnected={isConnected} />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r bg-background">
          <FileExplorer files={files} onFileSelect={handleFileSelect} activeFileId={activeFile?.id} />
        </div>

        <div className="flex-1">
          {activeFile ? (
            <MonacoEditor
              value={activeFile.content || ""}
              language={getLanguageFromFileName(activeFile.name)}
              onChange={handleCodeChange}
              filename={activeFile.name}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Select a file to start editing</p>
            </div>
          )}
        </div>

        <div className="w-64 border-l bg-background">
          <UserPanel users={activeUsers} sessionId={`session-${projectId}`} />
        </div>
      </div>
    </div>
  )
}
