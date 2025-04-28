"use client"

import type React from "react"
import { useState } from "react"
import { X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TagDisplayProps {
  tags: string[]
  onTagsChange?: (tags: string[]) => void
  readOnly?: boolean
  className?: string
}

const TagDisplay: React.FC<TagDisplayProps> = ({ tags, onTagsChange, readOnly = false, className }) => {
  const [newTag, setNewTag] = useState("")
  const [inputVisible, setInputVisible] = useState(false)

  const handleRemoveTag = (index: number) => {
    if (readOnly) return
    const updatedTags = [...tags]
    updatedTags.splice(index, 1)
    onTagsChange?.(updatedTags)
  }

  const handleAddTag = () => {
    if (!newTag.trim()) return
    const tagToAdd = newTag.trim()

    // Check if tag already exists
    if (!tags.includes(tagToAdd)) {
      const updatedTags = [...tags, tagToAdd]
      onTagsChange?.(updatedTags)
    }

    setNewTag("")
    setInputVisible(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    } else if (e.key === "Escape") {
      setInputVisible(false)
      setNewTag("")
    }
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="bg-[#A8EBC7]/30 text-[#4B6982] hover:bg-[#A8EBC7]/50 flex items-center"
        >
          {tag}
          {!readOnly && (
            <button
              type="button"
              onClick={() => handleRemoveTag(index)}
              className="ml-1 text-[#4B6982]/70 hover:text-[#4B6982] focus:outline-none"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </Badge>
      ))}

      {!readOnly && (
        <>
          {inputVisible ? (
            <div className="inline-flex">
              <Input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add tag..."
                className="h-7 w-32 text-xs border-[#A8EBC7]/50 focus:border-[#A8EBC7] focus:ring-[#A8EBC7]/30"
                autoFocus
                onBlur={() => {
                  if (newTag.trim()) {
                    handleAddTag()
                  } else {
                    setInputVisible(false)
                  }
                }}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setInputVisible(true)}
              className="inline-flex items-center text-xs text-[#4B6982] hover:text-[#A8EBC7] focus:outline-none"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add tag
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default TagDisplay
