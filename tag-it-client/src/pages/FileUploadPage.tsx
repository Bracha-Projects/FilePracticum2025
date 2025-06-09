"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X, CheckCircle2, FileText, Loader2, Tag, Plus } from "lucide-react"
import DashboardLayout from "@/layouts/DashboardLayout"
import PageHeading from "@/components/PageHeading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { toast } from "sonner"
import axiosInstance from "@/utils/axiosInstance"
import { fetchFolderContents } from "@/redux/slices/folderContentsSlice"

interface UploadFile {
  file: File
  progress: number
  status: "uploading" | "complete" | "error"
  tags: string[]
  id?: number
}

const FileUploadPage = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const currentFolderId = useAppSelector((state) => state.folderContents.currentFolderId)

  const [isHovering, setIsHovering] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([])
  const [newTag, setNewTag] = useState("")

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
      tags: [] as string[],
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
      const aiTags = await generateAITags(fileObj.file)
      // Step 1: Get presigned URL
      const presignedResponse = await axiosInstance.get<{ url: string }>(
        `/File/presigned-url?fileName=${encodeURIComponent(fileObj.file.name)}&folderId=${folderId}`,
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
            const fileMetadata = {
              fileName: fileObj.file.name,
              fileType: fileObj.file.type,
              s3Key: s3Key,
              size: fileObj.file.size,
              folderId: folderId,
              tags: aiTags,
              ownerId: user?.id,
            }

            const addFileResponse = await axiosInstance.post("/File/add-file", fileMetadata)
            const createdFile = addFileResponse.data


            setUploadedFiles((prev) => {
              const updated = [...prev]
              if (updated[fileIndex]) {
                updated[fileIndex] = {
                  ...updated[fileIndex],
                  progress: 100,
                  status: "complete",
                  tags: aiTags,
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

  const generateAITags = async (file: File): Promise<string[]> => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("https://tag-it-ai.onrender.com/api/tag", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("AI Tags Response:", data)
      // Assume the response is something like: { tags: ["tag1", "tag2"] }
      return data.tags || []
    } catch (error) {
      console.error("Failed to generate tags from API:", error)
      return []
    }
  }


  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const addTag = (fileIndex: number) => {
    if (!newTag.trim()) return

    setUploadedFiles((prev) => {
      const updated = [...prev]
      if (updated[fileIndex] && !updated[fileIndex].tags.includes(newTag.trim())) {
        updated[fileIndex] = {
          ...updated[fileIndex],
          tags: [...updated[fileIndex].tags, newTag.trim()],
        }
      }
      return updated
    })
    setNewTag("")
  }

  const removeTag = (fileIndex: number, tagToRemove: string) => {
    setUploadedFiles((prev) => {
      const updated = [...prev]
      if (updated[fileIndex]) {
        updated[fileIndex] = {
          ...updated[fileIndex],
          tags: updated[fileIndex].tags.filter((tag) => tag !== tagToRemove),
        }
      }
      return updated
    })
  }

  const saveTags = async (fileIndex: number) => {
    const fileObj = uploadedFiles[fileIndex]
    if (!fileObj.id) return

    try {
      // Here you would call your API to update file tags
      // await axiosInstance.put(`/file/${fileObj.id}/tags`, { tags: fileObj.tags })
      toast.success("Tags updated successfully")
    } catch (error) {
      console.error("Error updating tags:", error)
      toast.error("Failed to update tags")
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
            <div className="rounded-lg border border-[#4B6982]/20 overflow-hidden shadow-md">
              <div className="divide-y divide-[#4B6982]/10">
                {uploadedFiles.map((fileObj, index) => (
                  <div key={index} className="p-4">
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
                          <Progress
                            value={fileObj.progress}
                            className="h-1.5 flex-1"
                            indicatorClassName="bg-[#A8EBC7]"
                          />
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

                        {/* Tags Section */}
                        {fileObj.status === "complete" && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-[#4B6982]" />
                              <span className="text-sm font-medium text-[#4B6982]">AI Generated Tags:</span>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {fileObj.tags.map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  variant="secondary"
                                  className="bg-[#A8EBC7]/20 text-[#4B6982] hover:bg-[#A8EBC7]/30"
                                >
                                  {tag}
                                  <button
                                    onClick={() => removeTag(index, tag)}
                                    className="ml-1 text-[#4B6982]/60 hover:text-red-500"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>

                            <div className="flex gap-2 mt-2">
                              <Input
                                placeholder="Add custom tag..."
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                className="flex-1 h-8 text-sm"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    addTag(index)
                                  }
                                }}
                              />
                              <Button
                                size="sm"
                                onClick={() => addTag(index)}
                                className="h-8 bg-[#4B6982] hover:bg-[#3a5269]"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => saveTags(index)} className="h-8">
                                Save Tags
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

export default FileUploadPage
