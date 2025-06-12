"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"
import { Tag } from "@/types/Tag"

interface FileTagModalProps {
  isOpen: boolean
  onClose: () => void
  file?: {
    id: number
    fileName: string
    tags: Tag[]
  }
  onTagsUpdate?: (tags: Tag[]) => void
}

const FileTagModal = ({ isOpen, onClose, file, onTagsUpdate }: FileTagModalProps) => {
  const [newTag, setNewTag] = useState("")
  const [updatedTags, setUpdatedTags] = useState<Tag[]>(file?.tags || [])

  useEffect(() => {
    setUpdatedTags(file?.tags || [])
  }, [file?.tags])

const addTag = () => {
    if (newTag.trim() !== "") {
        const newTags = [...updatedTags, { tagName: newTag } as Tag]
        setUpdatedTags(newTags)
        setNewTag("")
    }
}
  const removeTag = (tagToRemove: Tag) => {
    const newTags = updatedTags.filter((tag) => tag.id !== tagToRemove.id)
    setUpdatedTags(newTags)
  }

  const updateTag = (tagToUpdate: Tag, newName: string) => {
    const newTags = updatedTags.map((tag) => (tag.id === tagToUpdate.id ? { ...tag, name: newName } : tag))
    setUpdatedTags(newTags)
  }

  const handleClose = () => {
    if (onTagsUpdate && updatedTags) {
      onTagsUpdate(updatedTags)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Tags</DialogTitle>
          <DialogDescription>Add, remove, or edit tags for this file.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} className="col-span-3" />
            <Button onClick={addTag} variant="outline">
              Add Tag
            </Button>
          </div>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {updatedTags.map((tag) => (
              <div key={tag.id} className="flex items-center space-x-2">
                <Input defaultValue={tag.tagName} onChange={(e) => updateTag(tag, e.target.value)} className="flex-1" />
                <Button onClick={() => removeTag(tag)} variant="destructive" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FileTagModal
