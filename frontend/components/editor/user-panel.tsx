"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Share2, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { User } from "@/types/project"

interface UserPanelProps {
  users: User[]
  sessionId: string
}

export function UserPanel({ users, sessionId }: UserPanelProps) {
  const { toast } = useToast()

  const handleShareLink = () => {
    const url = `${window.location.origin}/session/${sessionId}`
    navigator.clipboard.writeText(url)
    toast({
      title: "Link copied",
      description: "Session link has been copied to clipboard",
    })
  }

  const handleCopySessionId = () => {
    navigator.clipboard.writeText(sessionId)
    toast({
      title: "Session ID copied",
      description: "Session ID has been copied to clipboard",
    })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h3 className="font-medium">Collaboration</h3>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-3">Active Users ({users.length})</h4>
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getUserColor(user.color) }} />
                <span className="text-sm font-medium flex-1">{user.name}</span>
                <Badge variant="outline" className="text-xs">
                  {user.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-medium mb-3">Session Info</h4>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Session ID:</span>
              <Button variant="ghost" size="sm" className="h-auto p-1" onClick={handleCopySessionId}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <div className="font-mono text-xs bg-muted p-2 rounded">{sessionId}</div>
            <div>Started: {new Date().toLocaleTimeString()}</div>
          </div>

          <Button size="sm" variant="outline" className="w-full mt-3" onClick={handleShareLink}>
            <Share2 className="mr-2 h-3 w-3" />
            Share Session
          </Button>
        </div>
      </div>
    </div>
  )
}

function getUserColor(color: string): string {
  const colors = {
    red: "#ef4444",
    green: "#22c55e",
    blue: "#3b82f6",
    yellow: "#eab308",
    purple: "#a855f7",
    orange: "#f97316",
    pink: "#ec4899",
    indigo: "#6366f1",
  }
  return colors[color as keyof typeof colors] || colors.blue
}
