"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Circle } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Session } from "@/types/project"

const mockSessions: Session[] = [
  { id: "s1", name: "Go API Server - Main Branch", activeUsers: 3 },
  { id: "s2", name: "React Dashboard - Feature", activeUsers: 2 },
]

export function SessionsSection() {
  const [sessions] = useState<Session[]>(mockSessions)
  const router = useRouter()

  const handleJoinSession = (sessionId: string) => {
    router.push(`/editor/session/${sessionId}`)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Active Sessions</h3>

      <div className="grid gap-4">
        {sessions.map((session) => (
          <Card key={session.id} className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{session.name}</CardTitle>
                <Badge variant="outline" className="border-green-600 text-green-600">
                  <Circle className="mr-1 h-2 w-2 fill-current" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3">{session.activeUsers} active users</CardDescription>
              <Button variant="outline" className="w-full" onClick={() => handleJoinSession(session.id)}>
                Join Session
              </Button>
            </CardContent>
          </Card>
        ))}

        {sessions.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Circle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No active sessions</p>
              <p className="text-sm text-muted-foreground">Join a project to see active sessions</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
