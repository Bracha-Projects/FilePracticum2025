// "use client"

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { useState, useEffect } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { X, Plus, RefreshCw } from "lucide-react"
// import { toast } from "sonner"
// import axiosInstance from "@/utils/axiosInstance"
// import type { Tag } from "@/types/Tag"

// interface FileTagModalProps {
//   fileId: string
//   initialTags: Tag[]
//   onTagsUpdated: (fileId: string, tags: Tag[]) => void
// }

// const FileTagModal = ({ fileId, initialTags, onTagsUpdated }: FileTagModalProps) => {
//   const [tags, setTags] = useState<Tag[]>(initialTags || [])
//   const [newTagName, setNewTagName] = useState("")
//   const [popularTags, setPopularTags] = useState<Tag[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [isRefreshing, setIsRefreshing] = useState(false)

//   useEffect(() => {
//     fetchPopularTags()
//   }, [])

//   useEffect(() => {
//     setTags(initialTags || [])
//   }, [initialTags])

//   const fetchPopularTags = async () => {
//     try {
//       setIsLoading(true)
//       const response = await axiosInstance.get<Tag[]>("/api/Tag/popular")
//       setPopularTags(response.data)
//     } catch (error) {
//       console.error("Error fetching popular tags:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleAddTag = async () => {
//     if (!newTagName.trim()) return

//     try {
//       const response = await axiosInstance.post<Tag>("/api/Tag", {
//         tagName: newTagName.trim(),
//         fileId: fileId,
//       })

//       const newTag = response.data
//       setTags([...tags, newTag])
//       setNewTagName("")
//       toast.success("Tag added successfully")
//     } catch (error) {
//       console.error("Error adding tag:", error)
//       toast.error("Failed to add tag")
//     }
//   }

//   const handleRemoveTag = async (tagId: number | string) => {
//     try {
//       await axiosInstance.delete(`/api/Tag/${tagId}`)
//       setTags(tags.filter((tag) => tag.id !== tagId))
//       toast.success("Tag removed successfully")
//     } catch (error) {
//       console.error("Error removing tag:", error)
//       toast.error("Failed to remove tag")
//     }
//   }

//   const handleAddPopularTag = async (tag: Tag) => {
//     if (tags.some((t) => t.tagName === tag.tagName)) return

//     try {
//       const response = await axiosInstance.post<Tag>("/api/Tag", {
//         tagName: tag.tagName,
//         fileId: fileId,
//       })

//       const newTag = response.data
//       setTags([...tags, newTag])
//       toast.success("Tag added successfully")
//     } catch (error) {
//       console.error("Error adding popular tag:", error)
//       toast.error("Failed to add tag")
//     }
//   }

//   const handleRefreshAITags = async () => {
//     try {
//       setIsRefreshing(true)
//       const response = await axiosInstance.post<Tag[]>(`/api/file/${fileId}/regenerate-tags`)
//       setTags(response.data)
//       toast.success("Tags refreshed with AI")
//     } catch (error) {
//       console.error("Error refreshing AI tags:", error)
//       toast.error("Failed to refresh tags")
//     } finally {
//       setIsRefreshing(false)
//     }
//   }

//   const handleSave = () => {
//     onTagsUpdated(fileId, tags)
//   }

//   return (
//     <Dialog onOpenChange={handleSave}>
//       <DialogContent className="bg-white border-0 shadow-xl max-w-md">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-bold">Edit Tags</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4 mt-4">
//           <div className="flex items-center gap-2">
//             <Input
//               value={newTagName}
//               onChange={(e) => setNewTagName(e.target.value)}
//               placeholder="Add a new tag..."
//               className="flex-1"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleAddTag()
//                 }
//               }}
//             />
//             <Button onClick={handleAddTag} disabled={!newTagName.trim()}>
//               <Plus className="h-4 w-4 mr-1" />
//               Add
//             </Button>
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-sm font-medium text-gray-700">Current Tags</h3>
//               <Button variant="outline" size="sm" onClick={handleRefreshAITags} disabled={isRefreshing} className="h-8">
//                 <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
//                 Refresh with AI
//               </Button>
//             </div>

//             <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md min-h-[80px]">
//               {tags.length > 0 ? (
//                 tags.map((tag) => (
//                   <Badge
//                     key={tag.id}
//                     className="bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 shadow-sm flex items-center gap-1 px-3 py-1"
//                   >
//                     {tag.tagName}
//                     <button onClick={() => handleRemoveTag(tag.id)} className="ml-1 text-gray-400 hover:text-red-500">
//                       <X className="h-3 w-3" />
//                     </button>
//                   </Badge>
//                 ))
//               ) : (
//                 <p className="text-sm text-gray-500 w-full text-center py-2">No tags added yet</p>
//               )}
//             </div>
//           </div>

//           <div>
//             <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Tags</h3>
//             <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md">
//               {isLoading ? (
//                 <p className="text-sm text-gray-500 w-full text-center py-2">Loading popular tags...</p>
//               ) : popularTags.length > 0 ? (
//                 popularTags.map((tag) => (
//                   <Badge
//                     key={tag.id}
//                     className={`cursor-pointer ${
//                       tags.some((t) => t.tagName === tag.tagName)
//                         ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
//                         : "bg-white text-gray-800 hover:bg-gray-100"
//                     } border border-gray-200 shadow-sm`}
//                     onClick={() => handleAddPopularTag(tag)}
//                   >
//                     {tag.tagName}
//                   </Badge>
//                 ))
//               ) : (
//                 <p className="text-sm text-gray-500 w-full text-center py-2">No popular tags available</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default FileTagModal

"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { toast } from "sonner"
import axiosInstance from "@/utils/axiosInstance"
import type { Tag } from "@/types/Tag"
import type { FileItem } from "@/types/FileItem"

interface FileTagModalProps {
  isOpen: boolean
  onClose: () => void
  file: FileItem
}

const FileTagModal = ({ isOpen, onClose, file }: FileTagModalProps) => {
  const [tags, setTags] = useState<Tag[]>(file.tags || [])
  const [newTagName, setNewTagName] = useState("")
  const [popularTags, setPopularTags] = useState<Tag[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchPopularTags()
  }, [])

  useEffect(() => {
    setTags(file.tags || [])
  }, [file.tags])

  const fetchPopularTags = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get<Tag[]>("/api/Tag/popular")
      setPopularTags(response.data)
    } catch (error) {
      console.error("Error fetching popular tags:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTag = async () => {
    if (!newTagName.trim()) return

    try {
      const response = await axiosInstance.post<Tag>("/api/Tag", {
        tagName: newTagName.trim(),
        fileId: file.id,
      })

      const newTag = response.data
      setTags([...tags, newTag])
      setNewTagName("")
      toast.success("Tag added successfully")
    } catch (error) {
      console.error("Error adding tag:", error)
      toast.error("Failed to add tag")
    }
  }

  const handleRemoveTag = async (tagId: number | string) => {
    try {
      await axiosInstance.delete(`/api/Tag/${tagId}`)
      setTags(tags.filter((tag) => tag.id !== tagId))
      toast.success("Tag removed successfully")
    } catch (error) {
      console.error("Error removing tag:", error)
      toast.error("Failed to remove tag")
    }
  }

  const handleAddPopularTag = async (tag: Tag) => {
    if (tags.some((t) => t.tagName === tag.tagName)) return

    try {
      const response = await axiosInstance.post<Tag>("/api/Tag", {
        tagName: tag.tagName,
        fileId: file.id,
      })

      const newTag = response.data
      setTags([...tags, newTag])
      toast.success("Tag added successfully")
    } catch (error) {
      console.error("Error adding popular tag:", error)
      toast.error("Failed to add tag")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-0 shadow-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Tags</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex items-center gap-2">
            <Input
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Add a new tag..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTag()
                }
              }}
            />
            <Button onClick={handleAddTag} disabled={!newTagName.trim()}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Current Tags</h3>
            </div>

            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md min-h-[80px]">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    className="bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 shadow-sm flex items-center gap-1 px-3 py-1"
                  >
                    {tag.tagName}
                    <button onClick={() => handleRemoveTag(tag.id)} className="ml-1 text-gray-400 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500 w-full text-center py-2">No tags added yet</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Tags</h3>
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md">
              {isLoading ? (
                <p className="text-sm text-gray-500 w-full text-center py-2">Loading popular tags...</p>
              ) : popularTags.length > 0 ? (
                popularTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    className={`cursor-pointer ${
                      tags.some((t) => t.tagName === tag.tagName)
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        : "bg-white text-gray-800 hover:bg-gray-100"
                    } border border-gray-200 shadow-sm`}
                    onClick={() => handleAddPopularTag(tag)}
                  >
                    {tag.tagName}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500 w-full text-center py-2">No popular tags available</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FileTagModal