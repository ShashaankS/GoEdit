"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Play, Settings, Share2, Circle, ChevronDown } from "lucide-react"

interface EditorHeaderProps {
  projectId: string
  isConnected: boolean
}

export function EditorHeader({ projectId, isConnected }: EditorHeaderProps) {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">IDE</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            <span className="font-medium">Project {projectId}</span>
            {isConnected && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                <span>Live</span>
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <span>Share</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(`https://ide.example.com/editor/${projectId}`)}
              >
                <Share2 className="mr-2 h-4 w-4" />
                <span>Copy link</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Invite collaborators</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" variant="outline">
            <Play className="w-4 h-4 mr-1" />
            Run
          </Button>

          <Button size="sm" variant="ghost">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
