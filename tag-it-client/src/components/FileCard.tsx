"use client"

import type React from "react"
import { Download, Eye, MoreVertical, Trash2, Share2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { FileItem } from "@/types/FileItem"
import { useState } from "react"

interface FileCardProps {
  file: FileItem
  onPreview: (file: FileItem) => void
  onDownload: (file: FileItem) => void
  onDelete: (fileId: number) => void
  customIcon?: React.ReactNode
  className?: string
}

// Helper function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

const FileCard = ({ file, onPreview, onDownload, onDelete, customIcon, className }: FileCardProps) => {
  const { id, fileName, fileType, size, tags, lastModified } = file
  const [isDeleting, setIsDeleting] = useState(false)

  // Format the date to a more readable format
  const formattedDate = new Date(lastModified).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  // Format the relative time (e.g., "2 days ago")
  const getRelativeTimeString = (date: string): string => {
    const now = new Date()
    const past = new Date(date)
    const diffTime = Math.abs(now.getTime() - past.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`
    } else if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)} months ago`
    } else {
      return `${Math.floor(diffDays / 365)} years ago`
    }
  }

  const relativeTime = getRelativeTimeString(lastModified)

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${fileName}?`)) {
      setIsDeleting(true)
      onDelete(id)
    }
  }

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {customIcon || (
                <div className="w-10 h-10 rounded-md bg-tagit-mint/20 flex items-center justify-center text-tagit-blue">
                  {fileType.substring(0, 3).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900 truncate max-w-[180px]">{fileName}</h3>
              <p className="text-sm text-gray-500">
                {fileType} • {formatFileSize(typeof size === "string" ? Number.parseInt(size) : size)}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isDeleting}>
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg p-1">
              <DropdownMenuItem
                onClick={() => onPreview(file)}
                className="flex items-center px-3 py-2 text-sm hover:bg-tagit-mint/20 hover:text-tagit-blue focus:bg-tagit-mint/20 focus:text-tagit-blue"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDownload(file)}
                className="flex items-center px-3 py-2 text-sm hover:bg-tagit-mint/20 hover:text-tagit-blue focus:bg-tagit-mint/20 focus:text-tagit-blue"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center px-3 py-2 text-sm hover:bg-tagit-mint/20 hover:text-tagit-blue focus:bg-tagit-mint/20 focus:text-tagit-blue">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center px-3 py-2 text-sm hover:bg-tagit-mint/20 hover:text-tagit-blue focus:bg-tagit-mint/20 focus:text-tagit-blue">
                <Edit className="mr-2 h-4 w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-gray-500" title={formattedDate}>
            Modified {relativeTime}
          </span>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-tagit-blue hover:text-tagit-darkblue hover:bg-tagit-mint/10"
              onClick={() => onPreview(file)}
            >
              <Eye className="h-3.5 w-3.5 mr-1" />
              Preview
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-tagit-blue hover:text-tagit-darkblue hover:bg-tagit-mint/10"
              onClick={() => onDownload(file)}
            >
              <Download className="h-3.5 w-3.5 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileCard
