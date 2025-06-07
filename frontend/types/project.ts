export interface Project {
  id: string
  name: string
  lastEdited: string
  collaborators: number
}

export interface Session {
  id: string
  name: string
  activeUsers: number
}

export interface File {
  id: string
  name: string
  type: "file" | "folder"
  content?: string
  children?: File[]
}

export interface User {
  id: string
  name: string
  color: string
  status: "editing" | "viewing" | "idle"
}
