"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileIcon, FolderOpen, FolderClosed, ChevronRight, ChevronDown, Plus, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import type { File } from "@/types/project"

interface FileExplorerProps {
  files: File[]
  onFileSelect: (file: File) => void
  activeFileId: string | undefined
}

export function FileExplorer({ files, onFileSelect, activeFileId }: FileExplorerProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-medium">Explorer</h3>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-2">
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

  const handleClick = () => {
    if (file.type === "file") {
      onFileSelect(file)
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div>
      <div
        className={cn(
          "group flex items-center rounded-sm py-1 px-2 text-sm cursor-pointer hover:bg-accent",
          isActive && "bg-accent text-accent-foreground",
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
      >
        {file.type === "folder" && (
          <Button variant="ghost" size="icon" className="mr-1 h-4 w-4 p-0" onClick={toggleExpand}>
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </Button>
        )}

        {file.type === "folder" ? (
          isExpanded ? (
            <FolderOpen className="mr-2 h-4 w-4 text-blue-500" />
          ) : (
            <FolderClosed className="mr-2 h-4 w-4 text-blue-500" />
          )
        ) : (
          <FileIcon className="mr-2 h-4 w-4 text-muted-foreground" />
        )}

        <span className="flex-1 truncate">{file.name}</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto h-5 w-5 opacity-0 group-hover:opacity-100">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
