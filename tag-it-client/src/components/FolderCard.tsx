"use client"

import type React from "react"
import { Folder, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { FolderItem } from "@/types/FolderItem"
import { useAppDispatch } from "@/redux/hooks"
import { addToFolderPath, fetchFolderContents, setCurrentFolder } from "@/redux/slices/folderContentsSlice"

interface FolderCardProps extends FolderItem {
  className?: string
}

const FolderCard: React.FC<FolderCardProps> = ({
  Id,
  Name,
  ParentFolderId,
  OwnerId,
  CreatedAt,
  UpdatedAt,
  IsDeleted,
  className,
}) => {
  const dispatch = useAppDispatch()

  const handleFolderClick = () => {
    dispatch(setCurrentFolder(Id))
    dispatch(addToFolderPath({ id: Id, name: Name }))
    dispatch(fetchFolderContents(Id))
  }

  // Don't render deleted folders
  if (IsDeleted) {
    return null
  }

  return (
    <div className={cn("group folder-card cursor-pointer", className)} onClick={handleFolderClick}>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="p-2 bg-tagit-mint/10 rounded-lg mr-3">
            <Folder className="h-8 w-8 text-tagit-blue" />
          </div>
          <div>
            <h3 className="font-medium text-tagit-darkblue">{Name}</h3>
            <p className="text-xs text-muted-foreground mt-1">Created {new Date(CreatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={(e) => e.stopPropagation()}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="absolute inset-0 bg-tagit-mint/5 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
    </div>
  )
}

export default FolderCard
