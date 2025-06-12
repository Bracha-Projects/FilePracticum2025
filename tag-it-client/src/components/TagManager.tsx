"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Plus, X, Tag, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import axiosInstance from "@/utils/axiosInstance"
import { toast } from "sonner"
import type { Tag as TagDTO } from "@/types/Tag"

interface TagManagerProps {
  fileId?: number // Optional - if provided, will associate tags with this file
  initialTags: TagDTO[]
  onTagsUpdate: (tags: TagDTO[]) => void
  isGlobal?: boolean // If true, manages global tags instead of file-specific tags
}

const TagManager: React.FC<TagManagerProps> = ({ fileId, initialTags, onTagsUpdate, isGlobal = false }) => {
  const [tags, setTags] = useState<TagDTO[]>(initialTags)
  const [newTag, setNewTag] = useState("")
  const [editingTag, setEditingTag] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTags(initialTags)
  }, [initialTags])

  const addTag = async () => {
    if (!newTag.trim() || tags.some((tag) => tag.tagName.toLowerCase() === newTag.trim().toLowerCase())) {
      return
    }

    const tagToAdd = newTag.trim()
    setIsLoading(true)

    try {
      let response

      if (isGlobal) {
        // Add global tag
        response = await axiosInstance.post<TagDTO>(`/api/Tag`, {
          tagName: tagToAdd,
        })
      } else if (fileId) {
        // Associate tag with file
        response = await axiosInstance.post<TagDTO>(`/api/files/${fileId}/tags`, {
          tagName: tagToAdd,
        })
      } else {
        throw new Error("Either fileId or isGlobal must be provided")
      }

      const updatedTags = [...tags, response.data]
      setTags(updatedTags)
      setNewTag("")
      onTagsUpdate(updatedTags)
      toast.success("Tag added successfully")
    } catch (error) {
      console.error("Failed to add tag:", error)
      toast.error("Failed to add tag")
    } finally {
      setIsLoading(false)
    }
  }

  const removeTag = async (tagToRemove: TagDTO) => {
    setIsLoading(true)

    try {
      if (isGlobal) {
        // Remove global tag
        await axiosInstance.delete(`/api/tags/${tagToRemove.id}`)
      } else if (fileId) {
        // Disassociate tag from file
        await axiosInstance.delete(`/api/files/${fileId}/tags/${tagToRemove.id}`)
      } else {
        throw new Error("Either fileId or isGlobal must be provided")
      }

      const updatedTags = tags.filter((tag) => tag.id !== tagToRemove.id)
      setTags(updatedTags)
      onTagsUpdate(updatedTags)
      toast.success("Tag removed successfully")
    } catch (error) {
      console.error("Failed to remove tag:", error)
      toast.error("Failed to remove tag")
    } finally {
      setIsLoading(false)
    }
  }

  const updateTag = async (tagToUpdate: TagDTO, newTagValue: string) => {
    if (!newTagValue.trim() || newTagValue === tagToUpdate.tagName) {
      setEditingTag(null)
      return
    }

    setIsLoading(true)

    try {
      let response

      if (isGlobal) {
        // Update global tag
        response = await axiosInstance.put<TagDTO>(`/api/tags/${tagToUpdate.id}`, {
          tagName: newTagValue.trim(),
        })
      } else if (fileId) {
        // Update tag for file
        response = await axiosInstance.put<TagDTO>(`/api/files/${fileId}/tags/${tagToUpdate.id}`, {
          tagName: newTagValue.trim(),
        })
      } else {
        throw new Error("Either fileId or isGlobal must be provided")
      }

      const updatedTags = tags.map((tag) => (tag.id === tagToUpdate.id ? response.data : tag))
      setTags(updatedTags)
      onTagsUpdate(updatedTags)
      setEditingTag(null)
      toast.success("Tag updated successfully")
    } catch (error) {
      console.error("Failed to update tag:", error)
      toast.error("Failed to update tag")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTag()
    }
  }

  const handleEditKeyPress = (e: React.KeyboardEvent, tag: TagDTO) => {
    if (e.key === "Enter") {
      updateTag(tag, editValue)
    } else if (e.key === "Escape") {
      setEditingTag(null)
    }
  }

  const startEditing = (tag: TagDTO) => {
    setEditingTag(tag.id)
    setEditValue(tag.tagName)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Tag className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Tags</span>
      </div>

      {/* Existing Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className="flex items-center space-x-1 bg-blue-100 text-blue-800 hover:bg-blue-200 group"
          >
            {editingTag === tag.id ? (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => updateTag(tag, editValue)}
                onKeyDown={(e) => handleEditKeyPress(e, tag)}
                className="h-5 text-xs border-none p-0 bg-transparent focus:ring-0 min-w-[60px]"
                autoFocus
                disabled={isLoading}
              />
            ) : (
              <span onClick={() => startEditing(tag)} className="cursor-pointer">
                {tag.tagName}
              </span>
            )}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => startEditing(tag)}
                disabled={isLoading}
                className="opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-opacity"
              >
                <Edit2 className="h-3 w-3" />
              </button>
              <button
                onClick={() => removeTag(tag)}
                disabled={isLoading}
                className="hover:text-red-600 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </Badge>
        ))}
      </div>

      {/* Add New Tag */}
      <div className="flex space-x-2">
        <Input
          placeholder="Add a new tag..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="flex-1"
        />
        <Button
          onClick={addTag}
          disabled={!newTag.trim() || isLoading}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default TagManager
