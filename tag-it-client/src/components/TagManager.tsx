"use client"

import type React from "react"
import { useState } from "react"
import { Plus, X, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import axiosInstance from "@/utils/axiosInstance"
import { toast } from "sonner"

interface TagManagerProps {
  fileId: number
  initialTags: string[]
  onTagsUpdate: (tags: string[]) => void
}

const TagManager: React.FC<TagManagerProps> = ({ fileId, initialTags, onTagsUpdate }) => {
  const [tags, setTags] = useState<string[]>(initialTags)
  const [newTag, setNewTag] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const addTag = async () => {
    if (!newTag.trim() || tags.includes(newTag.trim())) {
      return
    }

    const tagToAdd = newTag.trim()
    setIsLoading(true)

    try {
      await axiosInstance.post(`/api/files/${fileId}/tags`, {
        tag: tagToAdd,
      })

      const updatedTags = [...tags, tagToAdd]
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

  const removeTag = async (tagToRemove: string) => {
    setIsLoading(true)

    try {
      await axiosInstance.delete(`/api/files/${fileId}/tags`, {
        data: { tag: tagToRemove },
      })

      const updatedTags = tags.filter((tag) => tag !== tagToRemove)
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

  const updateTag = async (oldTag: string, newTagValue: string) => {
    if (!newTagValue.trim() || newTagValue === oldTag) {
      return
    }

    setIsLoading(true)

    try {
      await axiosInstance.put(`/api/files/${fileId}/tags`, {
        oldTag: oldTag,
        newTag: newTagValue.trim(),
      })

      const updatedTags = tags.map((tag) => (tag === oldTag ? newTagValue.trim() : tag))
      setTags(updatedTags)
      onTagsUpdate(updatedTags)
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

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Tag className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Tags</span>
      </div>

      {/* Existing Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center space-x-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            <span>{tag}</span>
            <button onClick={() => removeTag(tag)} disabled={isLoading} className="ml-1 hover:text-red-600">
              <X className="h-3 w-3" />
            </button>
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
