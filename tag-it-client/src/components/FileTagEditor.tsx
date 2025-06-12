"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Plus, X, TagIcon, Edit2, RefreshCw, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axiosInstance from "@/utils/axiosInstance"
import { toast } from "sonner"
import type { Tag } from "@/types/Tag"
import type { FileItem } from "@/types/FileItem"

interface FileTagEditorProps {
  file: FileItem
  onTagsUpdate?: (tags: Tag[]) => void
  onClose?: () => void
}

const FileTagEditor: React.FC<FileTagEditorProps> = ({ file, onTagsUpdate, onClose }) => {
  const [tags, setTags] = useState<Tag[]>([])
  const [newTag, setNewTag] = useState("")
  const [editingTag, setEditingTag] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [popularTags, setPopularTags] = useState<Tag[]>([])

  useEffect(() => {
    fetchFileTags()
    fetchPopularTags()
  }, [file.id])

  const fetchFileTags = async () => {
    try {
      setInitialLoading(true)
      const response = await axiosInstance.get<Tag[]>(`/api/Tag/${file.id}/tags`)
      setTags(response.data)
    } catch (error) {
      console.error("Failed to fetch file tags:", error)
      toast.error("Failed to load tags")
      // Fallback to file.tags if available
      if (file.tags) {
        setTags(file.tags)
      }
    } finally {
      setInitialLoading(false)
    }
  }

  const fetchPopularTags = async () => {
    try {
      const response = await axiosInstance.get<Tag[]>(`/api/Tag/popular`)
      setPopularTags(response.data)
    } catch (error) {
      console.error("Failed to fetch popular tags:", error)
    }
  }

  const addTag = async () => {
    if (!newTag.trim() || tags.some((tag) => tag.tagName.toLowerCase() === newTag.trim().toLowerCase())) {
      return
    }

    const tagToAdd = newTag.trim()
    setIsLoading(true)

    try {
      const response = await axiosInstance.post<Tag>(`/api/Tag`, {
        tagName: tagToAdd,
        fileId: file.id,
      })

      const updatedTags = [...tags, response.data]
      setTags(updatedTags)
      setNewTag("")
      onTagsUpdate?.(updatedTags)
      toast.success("Tag added successfully")
    } catch (error) {
      console.error("Failed to add tag:", error)
      toast.error("Failed to add tag")
    } finally {
      setIsLoading(false)
    }
  }

  const removeTag = async (tagToRemove: Tag) => {
    setIsLoading(true)

    try {
      await axiosInstance.delete(`/api/Tag/${tagToRemove.id}`)

      const updatedTags = tags.filter((tag) => tag.id !== tagToRemove.id)
      setTags(updatedTags)
      onTagsUpdate?.(updatedTags)
      toast.success("Tag removed successfully")
    } catch (error) {
      console.error("Failed to remove tag:", error)
      toast.error("Failed to remove tag")
    } finally {
      setIsLoading(false)
    }
  }

  const updateTag = async (tagToUpdate: Tag, newTagValue: string) => {
    if (!newTagValue.trim() || newTagValue === tagToUpdate.tagName) {
      setEditingTag(null)
      return
    }

    setIsLoading(true)

    try {
      const response = await axiosInstance.put<Tag>(`/api/Tag/${tagToUpdate.id}`, {
        tagName: newTagValue.trim(),
        fileId: file.id,
      })

      const updatedTags = tags.map((tag) => (tag.id === tagToUpdate.id ? response.data : tag))
      setTags(updatedTags)
      onTagsUpdate?.(updatedTags)
      setEditingTag(null)
      toast.success("Tag updated successfully")
    } catch (error) {
      console.error("Failed to update tag:", error)
      toast.error("Failed to update tag")
    } finally {
      setIsLoading(false)
    }
  }

  const refreshTags = async () => {
    setIsRefreshing(true)

    try {
      // Call AI service to regenerate tags
      const response = await axiosInstance.post<Tag[]>(`/api/File/${file.id}/regenerate-tags`)

      setTags(response.data)
      onTagsUpdate?.(response.data)
      toast.success("Tags refreshed successfully")
    } catch (error) {
      console.error("Failed to refresh tags:", error)
      toast.error("Failed to refresh tags")
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTag()
    }
  }

  const handleEditKeyPress = (e: React.KeyboardEvent, tag: Tag) => {
    if (e.key === "Enter") {
      updateTag(tag, editValue)
    } else if (e.key === "Escape") {
      setEditingTag(null)
    }
  }

  const startEditing = (tag: Tag) => {
    setEditingTag(tag.id)
    setEditValue(tag.tagName)
  }

  const addPopularTag = (tag: Tag) => {
    if (tags.some((t) => t.id === tag.id)) {
      return
    }

    setIsLoading(true)
    axiosInstance
      .post<Tag>(`/api/Tag`, {
        tagName: tag.tagName,
        fileId: file.id,
      })
      .then((response) => {
        const updatedTags = [...tags, response.data]
        setTags(updatedTags)
        onTagsUpdate?.(updatedTags)
        toast.success("Tag added successfully")
      })
      .catch((error) => {
        console.error("Failed to add tag:", error)
        toast.error("Failed to add tag")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  if (initialLoading) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="flex justify-center items-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-[#4B6982]" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-[#4B6982] flex items-center gap-2">
              <TagIcon className="h-5 w-5" />
              Edit Tags
            </CardTitle>
            <p className="text-sm text-[#4B6982]/70 mt-1">{file.fileName}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={refreshTags}
              disabled={isRefreshing || isLoading}
              size="sm"
              variant="outline"
              className="text-[#4B6982] border-[#4B6982]/30 hover:bg-[#A8EBC7]/10"
            >
              {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh Tags
            </Button>
            {onClose && (
              <Button onClick={onClose} size="sm" variant="outline" className="text-[#4B6982] border-[#4B6982]/30">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Existing Tags */}
        <div>
          <h4 className="text-sm font-medium text-[#4B6982] mb-2">Current Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="flex items-center space-x-1 bg-[#A8EBC7]/20 text-[#4B6982] hover:bg-[#A8EBC7]/30 group"
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
              ))
            ) : (
              <p className="text-sm text-[#4B6982]/60">No tags yet. Add some tags below.</p>
            )}
          </div>
        </div>

        {/* Popular Tags */}
        {popularTags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-[#4B6982] mb-2">Popular Tags</h4>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="cursor-pointer bg-gray-50 hover:bg-[#A8EBC7]/10"
                  onClick={() => addPopularTag(tag)}
                >
                  {tag.tagName}
                  <Plus className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Add New Tag */}
        <div>
          <h4 className="text-sm font-medium text-[#4B6982] mb-2">Add New Tag</h4>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter tag name..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={addTag} disabled={!newTag.trim() || isLoading} className="bg-[#4B6982] hover:bg-[#3a5269]">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-xs text-[#4B6982]/60 bg-[#A8EBC7]/10 p-3 rounded-lg">
          <p>
            <strong>Tips:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>Click on any tag to edit it</li>
            <li>Use "Refresh Tags" to regenerate AI suggestions</li>
            <li>Press Enter to quickly add a new tag</li>
            <li>Click on popular tags to add them to your file</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default FileTagEditor
