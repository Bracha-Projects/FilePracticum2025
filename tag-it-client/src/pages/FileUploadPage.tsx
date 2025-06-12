"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X, CheckCircle2, FileText, Loader2, Tag, Plus, Edit2, RefreshCw } from "lucide-react"
import DashboardLayout from "@/layouts/DashboardLayout"
import PageHeading from "@/components/PageHeading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { toast } from "sonner"
import axiosInstance from "@/utils/axiosInstance"
import { fetchFolderContents } from "@/redux/slices/folderContentsSlice"
import axios from "axios"
import type { Tag as TagType } from "@/types/Tag"

interface UploadFile {
  file: File
  progress: number
  status: "uploading" | "complete" | "error"
  tags: TagType[]
  id?: number
  editingTag?: number
  newTagValue?: string
}

const UploadPage = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const currentFolderId = useAppSelector((state) => state.folderContents.currentFolderId)

  const [isHovering, setIsHovering] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([])
  const [newTag, setNewTag] = useState("")
  const [isRefreshingTags, setIsRefreshingTags] = useState<number | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsHovering(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsHovering(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsHovering(false)

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files)
      processFiles(newFiles)
    }
  }, [])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      processFiles(newFiles)
      e.target.value = ""
    }
  }, [])

  const processFiles = async (files: File[]) => {
    if (!user?.id) {
      toast.error("User not authenticated")
      return
    }

    const folderId = currentFolderId || user.rootFolderId

    const filesWithProgress = files.map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
      tags: [] as TagType[],
    }))

    setUploadedFiles((prev) => [...prev, ...filesWithProgress])

    // Upload each file
    for (let i = 0; i < filesWithProgress.length; i++) {
      const fileIndex = uploadedFiles.length + i
      await uploadFile(filesWithProgress[i], fileIndex, folderId)
    }
  }

  const uploadFile = async (fileObj: UploadFile, fileIndex: number, folderId: number) => {
    try {
      // Step 1: Get presigned URL
      const presignedResponse = await axiosInstance.get<{ url: string }>(
        `/api/File/presigned-url?fileName=${encodeURIComponent(fileObj.file.name)}&folderId=${folderId}`,
      )

      const presignedUrl = presignedResponse.data.url

      // Step 2: Upload file to S3 with progress tracking
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100)
          setUploadedFiles((prev) => {
            const updated = [...prev]
            if (updated[fileIndex]) {
              updated[fileIndex] = {
                ...updated[fileIndex],
                progress,
              }
            }
            return updated
          })
        }
      })

      xhr.addEventListener("load", async () => {
        if (xhr.status === 200) {
          // Step 3: Extract S3 key from presigned URL
          const url = new URL(presignedUrl)
          const s3Key = url.pathname.substring(1) // Remove leading slash

          // Step 4: Add file metadata to database
          try {
            // Step 5: Get AI-generated tags
            const aiTagNames = await generateAITags(fileObj.file)

            const fileMetadata = {
              fileName: fileObj.file.name,
              fileType: fileObj.file.name.split(".").pop()?.toUpperCase() || "UNKNOWN",
              s3Key: s3Key,
              size: fileObj.file.size,
              folderId: folderId,
              ownerId: user?.id,
              tags: aiTagNames,
            }

            const addFileResponse = await axiosInstance.post("/api/File/add-file", fileMetadata)
            const createdFile = addFileResponse.data

            // Fetch the actual tags with IDs from the server
            const tagsResponse = await axiosInstance.get<TagType[]>(`/api/Tag/${createdFile.id}/tags`)

            setUploadedFiles((prev) => {
              const updated = [...prev]
              if (updated[fileIndex]) {
                updated[fileIndex] = {
                  ...updated[fileIndex],
                  progress: 100,
                  status: "complete",
                  tags: tagsResponse.data,
                  id: createdFile.id,
                }
              }
              return updated
            })

            toast.success(`${fileObj.file.name} uploaded successfully`)

            // Refresh folder contents
            dispatch(fetchFolderContents(folderId))
          } catch (error) {
            console.error("Error adding file metadata:", error)
            setUploadedFiles((prev) => {
              const updated = [...prev]
              if (updated[fileIndex]) {
                updated[fileIndex] = {
                  ...updated[fileIndex],
                  status: "error",
                }
              }
              return updated
            })
            toast.error(`Failed to save ${fileObj.file.name} metadata`)
          }
        } else {
          throw new Error(`Upload failed with status ${xhr.status}`)
        }
      })

      xhr.addEventListener("error", () => {
        setUploadedFiles((prev) => {
          const updated = [...prev]
          if (updated[fileIndex]) {
            updated[fileIndex] = {
              ...updated[fileIndex],
              status: "error",
            }
          }
          return updated
        })
        toast.error(`Failed to upload ${fileObj.file.name}`)
      })

      xhr.open("PUT", presignedUrl)
      xhr.setRequestHeader("Content-Type", fileObj.file.type)
      xhr.send(fileObj.file)
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadedFiles((prev) => {
        const updated = [...prev]
        if (updated[fileIndex]) {
          updated[fileIndex] = {
            ...updated[fileIndex],
            status: "error",
          }
        }
        return updated
      })
      toast.error(`Failed to upload ${fileObj.file.name}`)
    }
  }

  // AI tag generation
  const generateAITags = async (file: File): Promise<string[]> => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await axios.post("https://tag-it-ai.onrender.com/api/tag", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Assuming the API returns: { tags: ["tag1", "tag2"] }
      return response.data.tags || []
    } catch (error: any) {
      console.error("Failed to generate AI tags:", error)
      toast.error("Failed to generate AI tags")
      return []
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const addTag = async (fileIndex: number, tagName: string) => {
    if (!tagName.trim()) return

    const fileObj = uploadedFiles[fileIndex]
    if (!fileObj.id) return

    try {
      const response = await axiosInstance.post<TagType>(`/api/Tag`, {
        tagName: tagName.trim(),
        fileId: fileObj.id,
      })

      setUploadedFiles((prev) => {
        const updated = [...prev]
        if (updated[fileIndex]) {
          updated[fileIndex] = {
            ...updated[fileIndex],
            tags: [...updated[fileIndex].tags, response.data],
          }
        }
        return updated
      })

      setNewTag("")
      toast.success("Tag added successfully")
    } catch (error) {
      console.error("Error adding tag:", error)
      toast.error("Failed to add tag")
    }
  }

  const removeTag = async (fileIndex: number, tagToRemove: TagType) => {
    const fileObj = uploadedFiles[fileIndex]
    if (!fileObj.id) return

    try {
      await axiosInstance.delete(`/api/Tag/${tagToRemove.id}`)

      setUploadedFiles((prev) => {
        const updated = [...prev]
        if (updated[fileIndex]) {
          updated[fileIndex] = {
            ...updated[fileIndex],
            tags: updated[fileIndex].tags.filter((tag) => tag.id !== tagToRemove.id),
          }
        }
        return updated
      })

      toast.success("Tag removed successfully")
    } catch (error) {
      console.error("Error removing tag:", error)
      toast.error("Failed to remove tag")
    }
  }

  const startEditingTag = (fileIndex: number, tagIndex: number, currentValue: string) => {
    setUploadedFiles((prev) => {
      const updated = [...prev]
      if (updated[fileIndex]) {
        updated[fileIndex] = {
          ...updated[fileIndex],
          editingTag: tagIndex,
          newTagValue: currentValue,
        }
      }
      return updated
    })
  }

  const updateTag = async (fileIndex: number, tagIndex: number, newValue: string) => {
    if (!newValue.trim()) return

    const fileObj = uploadedFiles[fileIndex]
    if (!fileObj.id) return

    const tagToUpdate = fileObj.tags[tagIndex]
    if (!tagToUpdate) return

    try {
      const response = await axiosInstance.put<TagType>(`/api/Tag/${tagToUpdate.id}`, {
        tagName: newValue.trim(),
        fileId: fileObj.id,
      })

      setUploadedFiles((prev) => {
        const updated = [...prev]
        if (updated[fileIndex]) {
          const newTags = [...updated[fileIndex].tags]
          newTags[tagIndex] = response.data
          updated[fileIndex] = {
            ...updated[fileIndex],
            tags: newTags,
            editingTag: undefined,
            newTagValue: undefined,
          }
        }
        return updated
      })

      toast.success("Tag updated successfully")
    } catch (error) {
      console.error("Error updating tag:", error)
      toast.error("Failed to update tag")

      // Reset editing state
      setUploadedFiles((prev) => {
        const updated = [...prev]
        if (updated[fileIndex]) {
          updated[fileIndex] = {
            ...updated[fileIndex],
            editingTag: undefined,
            newTagValue: undefined,
          }
        }
        return updated
      })
    }
  }

  const cancelEditingTag = (fileIndex: number) => {
    setUploadedFiles((prev) => {
      const updated = [...prev]
      if (updated[fileIndex]) {
        updated[fileIndex] = {
          ...updated[fileIndex],
          editingTag: undefined,
          newTagValue: undefined,
        }
      }
      return updated
    })
  }

  const refreshTags = async (fileIndex: number) => {
    const fileObj = uploadedFiles[fileIndex]
    if (!fileObj.id) return

    setIsRefreshingTags(fileIndex)

    try {
      // Call AI service to regenerate tags
      const response = await axiosInstance.post<TagType[]>(`/api/File/${fileObj.id}/regenerate-tags`)

      setUploadedFiles((prev) => {
        const updated = [...prev]
        if (updated[fileIndex]) {
          updated[fileIndex] = {
            ...updated[fileIndex],
            tags: response.data,
          }
        }
        return updated
      })

      toast.success("Tags refreshed successfully")
    } catch (error) {
      console.error("Failed to refresh tags:", error)
      toast.error("Failed to refresh tags")
    } finally {
      setIsRefreshingTags(null)
    }
  }

  return (
    <DashboardLayout>
      <PageHeading title="Upload Files" subtitle="Upload and manage your files with AI-powered tagging" />

      <div className="space-y-6">
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-8 transition-all duration-300 text-center",
            isHovering
              ? "border-[#A8EBC7] bg-[#A8EBC7]/10"
              : "border-[#4B6982]/30 hover:border-[#A8EBC7]/40 hover:bg-[#A8EBC7]/5",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-[#A8EBC7]/20 rounded-full">
              <Upload className="h-8 w-8 text-[#4B6982]" />
            </div>
            <div>
              <p className="text-lg font-medium text-[#4B6982]">Drag and drop files here</p>
              <p className="text-sm text-[#4B6982]/80 mt-1">or click to browse from your computer</p>
            </div>
            <div className="text-xs text-[#4B6982]/60 mt-2">
              Supported file types: PDF, DOCX, XLSX, JPG, PNG, and more
            </div>

            <label className="mt-4">
              <input type="file" multiple className="sr-only" onChange={handleFileInputChange} />
              <div className="bg-[#4B6982] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#3a5269] transition-colors shadow-md">
                Select Files
              </div>
            </label>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-3 animate-fade-in">
            <h3 className="text-sm font-medium text-[#4B6982]">Uploaded Files</h3>
            <div className="rounded-lg border border-[#4B6982]/20 overflow-hidden shadow-md bg-white">
              <div className="divide-y divide-[#4B6982]/10">
                {uploadedFiles.map((fileObj, index) => (
                  <div key={index} className="p-4 bg-white">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-[#A8EBC7]/20 rounded-lg">
                        <FileText className="h-5 w-5 text-[#4B6982]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-[#4B6982] truncate" title={fileObj.file.name}>
                            {fileObj.file.name}
                          </p>
                          <button
                            onClick={() => removeFile(index)}
                            className="ml-2 text-[#4B6982]/60 hover:text-red-500 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center mt-1">
                          <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#A8EBC7]" style={{ width: `${fileObj.progress}%` }} />
                          </div>
                          <span className="ml-2 text-xs text-[#4B6982]/60 min-w-[40px] text-right">
                            {fileObj.progress}%
                          </span>
                        </div>

                        <div className="mt-1 flex items-center justify-between">
                          <div className="flex items-center">
                            {fileObj.status === "complete" ? (
                              <div className="flex items-center text-xs text-green-600">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                <span>Complete</span>
                              </div>
                            ) : fileObj.status === "error" ? (
                              <div className="text-xs text-red-600">Upload failed</div>
                            ) : (
                              <div className="flex items-center text-xs text-[#4B6982]/60">
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                <span>Uploading...</span>
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-[#4B6982]/60">{Math.round(fileObj.file.size / 1024)} KB</div>
                        </div>

                        {/* Tags Section - Only show when upload is complete */}
                        {fileObj.status === "complete" && (
                          <div className="mt-3 space-y-2 bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-[#4B6982]" />
                                <span className="text-sm font-medium text-[#4B6982]">Tags:</span>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs"
                                onClick={() => refreshTags(index)}
                                disabled={isRefreshingTags === index}
                              >
                                {isRefreshingTags === index ? (
                                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                ) : (
                                  <RefreshCw className="h-3 w-3 mr-1" />
                                )}
                                Refresh Tags
                              </Button>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {fileObj.tags.length > 0 ? (
                                fileObj.tags.map((tag, tagIndex) => (
                                  <Badge
                                    key={tagIndex}
                                    variant="secondary"
                                    className="flex items-center bg-white border border-gray-200 text-[#4B6982] hover:bg-gray-50 group"
                                  >
                                    {fileObj.editingTag === tagIndex ? (
                                      <Input
                                        value={fileObj.newTagValue || tag.tagName}
                                        onChange={(e) => {
                                          setUploadedFiles((prev) => {
                                            const updated = [...prev]
                                            if (updated[index]) {
                                              updated[index] = {
                                                ...updated[index],
                                                newTagValue: e.target.value,
                                              }
                                            }
                                            return updated
                                          })
                                        }}
                                        onBlur={() => updateTag(index, tagIndex, fileObj.newTagValue || tag.tagName)}
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") {
                                            updateTag(index, tagIndex, fileObj.newTagValue || tag.tagName)
                                          } else if (e.key === "Escape") {
                                            cancelEditingTag(index)
                                          }
                                        }}
                                        className="h-5 text-xs border-none p-0 bg-transparent focus:ring-0 min-w-[60px]"
                                        autoFocus
                                      />
                                    ) : (
                                      <span
                                        onClick={() => startEditingTag(index, tagIndex, tag.tagName)}
                                        className="cursor-pointer"
                                      >
                                        {tag.tagName}
                                      </span>
                                    )}
                                    <div className="flex items-center space-x-1 ml-1">
                                      <button
                                        onClick={() => startEditingTag(index, tagIndex, tag.tagName)}
                                        className="opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-opacity"
                                      >
                                        <Edit2 className="h-3 w-3" />
                                      </button>
                                      <button
                                        onClick={() => removeTag(index, tag)}
                                        className="hover:text-red-500 transition-colors"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </div>
                                  </Badge>
                                ))
                              ) : (
                                <p className="text-xs text-gray-500">No tags yet. Add some below.</p>
                              )}
                            </div>

                            <div className="flex gap-2 mt-2">
                              <Input
                                placeholder="Add custom tag..."
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                className="flex-1 h-8 text-sm bg-white"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    addTag(index, newTag)
                                  }
                                }}
                              />
                              <Button
                                size="sm"
                                onClick={() => addTag(index, newTag)}
                                disabled={!newTag.trim()}
                                className="h-8 bg-[#4B6982] hover:bg-[#3a5269]"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default UploadPage
