"use client"

import type React from "react"
import { Download, Eye, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import TagDisplay from "./TagDisplay"

interface FileCardProps {
  id: string
  name: string
  type: string
  size: string
  tags: string[]
  lastModified: string
  customIcon?: React.ReactNode
  onPreview?: () => void
}

const FileCard = ({ id, name, type, size, tags, lastModified, customIcon, onPreview }: FileCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {customIcon || (
                <div className="w-10 h-10 rounded-md bg-tagit-mint/20 flex items-center justify-center text-tagit-blue">
                  {type.substring(0, 3).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900 truncate max-w-[180px]">{name}</h3>
              <p className="text-sm text-gray-500">
                {type} • {size}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg p-1">
              <DropdownMenuItem
                onClick={onPreview}
                className="flex items-center px-3 py-2 text-sm hover:bg-tagit-mint/20 hover:text-tagit-blue focus:bg-tagit-mint/20 focus:text-tagit-blue"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center px-3 py-2 text-sm hover:bg-tagit-mint/20 hover:text-tagit-blue focus:bg-tagit-mint/20 focus:text-tagit-blue">
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center px-3 py-2 text-sm hover:bg-tagit-mint/20 hover:text-tagit-blue focus:bg-tagit-mint/20 focus:text-tagit-blue">
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center px-3 py-2 text-sm hover:bg-tagit-mint/20 hover:text-tagit-blue focus:bg-tagit-mint/20 focus:text-tagit-blue">
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {tags.length > 0 && (
          <div className="mt-3">
            <TagDisplay tags={tags} maxDisplay={3} />
          </div>
        )}

        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-gray-500">Modified {lastModified}</span>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-tagit-blue hover:text-tagit-darkblue hover:bg-tagit-mint/10"
              onClick={onPreview}
            >
              <Eye className="h-3.5 w-3.5 mr-1" />
              Preview
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-tagit-blue hover:text-tagit-darkblue hover:bg-tagit-mint/10"
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
