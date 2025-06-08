"use client"

import React from "react"
import { ChevronRight, Home, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchFolderContents, selectFolderPath, setCurrentFolder } from "@/redux/slices/folderContentsSlice"

interface FileBreadcrumbProps {
  className?: string
}

const FileBreadcrumb: React.FC<FileBreadcrumbProps> = ({ className }) => {
  const dispatch = useAppDispatch()
  const folderPath = useAppSelector(selectFolderPath)

  const handleFolderClick = (folderId: number, index: number) => {
    if (index !== folderPath.length - 1) {
      dispatch(setCurrentFolder(folderId))
      dispatch(fetchFolderContents(folderId))
    }
  }

  return (
    <nav className={cn("flex", className)}>
      <ol className="flex items-center space-x-1 overflow-x-auto py-1 scrollbar-none">
        {folderPath.map((folder, index) => (
          <React.Fragment key={`${folder.id}-${index}`}>
            {index > 0 && (
              <li key={`separator-${index}`} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
            )}
            <li key={`folder-${folder.id}-${index}`}>
              {index === folderPath.length - 1 ? (
                <span className="flex items-center px-2 py-1 rounded-md" style={{ color: "#4B6982" }}>
                  {index === 0 ? <Home className="h-4 w-4 mr-1" /> : <FolderOpen className="h-4 w-4 mr-1" />}
                  {folder.name}
                </span>
              ) : (
                <button
                  onClick={() => handleFolderClick(folder.id, index)}
                  className="flex items-center px-2 py-1 rounded-md transition-colors hover:bg-[rgba(168,235,199,0.1)]"
                  style={{
                    color: "rgba(75, 105, 130, 0.7)",
                  }}
                >
                  {index === 0 ? <Home className="h-4 w-4 mr-1" /> : <FolderOpen className="h-4 w-4 mr-1" />}
                  {folder.name}
                </button>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}

export default FileBreadcrumb
