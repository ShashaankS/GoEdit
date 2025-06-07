"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { User } from "@/types/project"
import { Share2 } from "lucide-react"

interface UserPanelProps {
  users: User[]
  sessionId: string
}

export function UserPanel({ users, sessionId }: UserPanelProps) {
  const handleShareLink = () => {
    navigator.clipboard.writeText(`https://ide.example.com/session/${sessionId}`)
    alert("Session link copied to clipboard!")
  }

  return (
    <div className="p-4">
      <h3 className="font-medium mb-3">Active Users ({users.length})</h3>
      <div className="space-y-2 mb-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getUserColor(user.color) }}></div>
            <span className="text-sm font-medium">{user.name}</span>
            <Badge variant="outline" className="text-xs">
              {user.status}
            </Badge>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div>
        <h4 className="font-medium mb-2 text-sm">Session Info</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <div>Session ID: {sessionId}</div>
          <div>Started: {new Date().toLocaleTimeString()}</div>
          <Button size="sm" variant="outline" className="w-full mt-2" onClick={handleShareLink}>
            <Share2 className="h-3 w-3 mr-1" />
            Share Link
          </Button>
        </div>
      </div>
    </div>
  )
}

// Helper function to get CSS color from user color name
function getUserColor(color: string): string {
  switch (color) {
    case "red":
      return "#ef4444"
    case "green":
      return "#22c55e"
    case "blue":
      return "#3b82f6"
    case "yellow":
      return "#eab308"
    case "purple":
      return "#a855f7"
    default:
      return "#3b82f6"
  }
}
