"use client"

import type React from "react"
import { useState } from "react"
import { Folder, MoreVertical, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { FolderItem } from "@/types/FolderItem"
import { useAppDispatch } from "@/redux/hooks"
import { addToFolderPath, fetchFolderContents, setCurrentFolder } from "@/redux/slices/folderContentsSlice"
import axiosInstance from "@/utils/axiosInstance"
import { toast } from "sonner"

interface FolderCardProps extends FolderItem {
  className?: string
}

const FolderCard: React.FC<FolderCardProps> = ({
  id,
  name,
  parentFolderId,
  ownerId,
  createdAt,
  isDeleted,
  className,
}) => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(name)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleFolderClick = () => {
    if (id && !isEditing) {
      dispatch(setCurrentFolder(id))
      dispatch(addToFolderPath({ id: id, name: name }))
      dispatch(fetchFolderContents(id))
    }
  }

  const handleRename = async () => {
    if (!editName.trim() || editName === name) {
      setIsEditing(false)
      setEditName(name)
      return
    }

    try {
      await axiosInstance.put(`/api/Folder/${id}`, {
        name: editName.trim(),
        ownerId: ownerId,
        parentFolderId: parentFolderId || null,
      })

      toast.success("Folder renamed successfully")
      setIsEditing(false)
      // Refresh folder contents
      if (parentFolderId) {
        dispatch(fetchFolderContents(parentFolderId))
      }
    } catch (error) {
      console.error("Failed to rename folder:", error)
      toast.error("Failed to rename folder")
      setEditName(name)
      setIsEditing(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete the folder "${name}"?`)) {
      return
    }

    setIsDeleting(true)
    try {
      await axiosInstance.delete(`/api/Folder/${id}`)

      toast.success("Folder deleted successfully")
      // Refresh folder contents
      if (parentFolderId) {
        dispatch(fetchFolderContents(parentFolderId))
      }
    } catch (error) {
      console.error("Failed to delete folder:", error)
      toast.error("Failed to delete folder")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRename()
    } else if (e.key === "Escape") {
      setIsEditing(false)
      setEditName(name)
    }
  }

  // Don't render deleted folders
  if (isDeleted) {
    return null
  }

  // Format date properly
  const formatDate = (dateInput: string | Date) => {
    try {
      const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
      if (isNaN(date.getTime())) {
        return "Unknown date";
      }
      return date.toLocaleDateString();
    } catch {
      return "Unknown date";
    }
  };

  const cardStyle = {
    backgroundColor: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "1.25rem",
    cursor: isEditing ? "default" : "pointer",
    transition: "all 0.3s ease",
    position: "relative" as const,
    opacity: isDeleting ? 0.5 : 1,
  }

  const hoverStyle = {
    borderColor: "#A8EBC7",
    boxShadow: "0 8px 24px rgba(75, 105, 130, 0.1)",
    transform: "translateY(-2px)",
  }

  return (
    <div
      className={cn("group", className)}
      style={cardStyle}
      onClick={handleFolderClick}
      onMouseEnter={(e) => {
        if (!isEditing) {
          Object.assign(e.currentTarget.style, hoverStyle)
        }
      }}
      onMouseLeave={(e) => {
        if (!isEditing) {
          Object.assign(e.currentTarget.style, cardStyle)
        }
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center flex-1">
          <div
            className="p-2 rounded-lg mr-3"
            style={{
              backgroundColor: "rgba(168, 235, 199, 0.1)",
            }}
          >
            <Folder className="h-8 w-8" style={{ color: "#4B6982" }} />
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={handleKeyPress}
                className="font-medium"
                style={{ color: "#4B6982" }}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h3 className="font-medium" style={{ color: "#4B6982" }}>
                {name || "Unnamed Folder"}
              </h3>
            )}
            <p className="text-xs text-gray-500 mt-1">Created {formatDate(createdAt)}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={isDeleting}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(true)
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete()
              }}
              disabled={isDeleting}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(168, 235, 199, 0.05)",
        }}
      ></div>
    </div>
  )
}

export default FolderCard
