import type { Metadata } from "next"
import { EditorLayout } from "@/components/editor/editor-layout"

export const metadata: Metadata = {
  title: "Editor",
  description: "Collaborative code editor",
}

interface EditorPageProps {
  params: {
    projectId: string
  }
}

export default function EditorPage({ params }: EditorPageProps) {
  return <EditorLayout projectId={params.projectId} />
}
