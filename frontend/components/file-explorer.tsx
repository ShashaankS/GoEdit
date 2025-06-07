"use client"

import type React from "react"

import { useState } from "react"
import { FileIcon, FolderOpen, FolderClosed, ChevronRight, ChevronDown, Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { File } from "@/types/project"

interface FileExplorerProps {
  files: File[]
  onFileSelect: (file: File) => void
  activeFileId: string | undefined
}

export function FileExplorer({ files, onFileSelect, activeFileId }: FileExplorerProps) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Files</h3>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-1">
        {files.map((file) => (
          <FileTreeItem key={file.id} file={file} onFileSelect={onFileSelect} activeFileId={activeFileId} level={0} />
        ))}
      </div>
    </div>
  )
}

interface FileTreeItemProps {
  file: File
  onFileSelect: (file: File) => void
  activeFileId: string | undefined
  level: number
}

function FileTreeItem({ file, onFileSelect, activeFileId, level }: FileTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const isActive = file.id === activeFileId

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  const handleFileClick = () => {
    onFileSelect(file)
  }

  return (
    <div>
      <div
        className={`flex items-center py-1 px-2 rounded-md text-sm cursor-pointer ${
          isActive ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
        }`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={file.type === "file" ? handleFileClick : toggleExpand}
      >
        {file.type === "folder" && (
          <Button variant="ghost" size="icon" className="h-4 w-4 mr-1 p-0" onClick={toggleExpand}>
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </Button>
        )}

        {file.type === "folder" ? (
          isExpanded ? (
            <FolderOpen className="h-4 w-4 mr-1 text-blue-500" />
          ) : (
            <FolderClosed className="h-4 w-4 mr-1 text-blue-500" />
          )
        ) : (
          <FileIcon className="h-4 w-4 mr-1 text-gray-500" />
        )}

        <span className="truncate">{file.name}</span>

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-5 w-5 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {file.type === "folder" && isExpanded && file.children && (
        <div>
          {file.children.map((childFile) => (
            <FileTreeItem
              key={childFile.id}
              file={childFile}
              onFileSelect={onFileSelect}
              activeFileId={activeFileId}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
