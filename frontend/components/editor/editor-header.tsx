"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Play, Settings, Share2, Circle, ChevronDown, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EditorHeaderProps {
  projectId: string
  isConnected: boolean
}

export function EditorHeader({ projectId, isConnected }: EditorHeaderProps) {
  const { toast } = useToast()

  const handleShare = () => {
    const url = `${window.location.origin}/editor/${projectId}`
    navigator.clipboard.writeText(url)
    toast({
      title: "Link copied",
      description: "Project link has been copied to clipboard",
    })
  }

  const handleRun = () => {
    toast({
      title: "Running code",
      description: "Code execution feature coming soon!",
    })
  }

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">IDE</span>
          </div>
          <span className="font-medium">Project {projectId}</span>
          {isConnected && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Circle className="h-2 w-2 fill-green-500 text-green-500" />
              <span>Live</span>
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem>Invite collaborators</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button size="sm" variant="outline" onClick={handleRun}>
          <Play className="mr-2 h-4 w-4" />
          Run
        </Button>

        <Button size="sm" variant="ghost">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
