"use client"

import type React from "react"
import { useCallback, useState } from "react"
import { Upload, X, CheckCircle2, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface FileDropzoneProps {
  onFilesAdded: (files: File[]) => void
  className?: string
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFilesAdded, className }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ file: File; progress: number; status: "uploading" | "complete" | "error" }>
  >([])

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
      // Reset file input value so the same file can be selected again
      e.target.value = ""
    }
  }, [])

  const processFiles = (files: File[]) => {
    // In a real app, you would upload these files to your server
    const filesWithProgress = files.map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
    }))

    setUploadedFiles((prev) => [...prev, ...filesWithProgress])
    onFilesAdded(files)

    // Simulate file upload progress
    filesWithProgress.forEach((fileObj, index) => {
      simulateUploadProgress(filesWithProgress.length - files.length + index)
    })
  }

  const simulateUploadProgress = (fileIndex: number) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress > 100) {
        progress = 100
        clearInterval(interval)

        setUploadedFiles((prev) => {
          const updated = [...prev]
          if (updated[fileIndex]) {
            updated[fileIndex] = {
              ...updated[fileIndex],
              progress: 100,
              status: "complete",
            }
          }
          return updated
        })
      } else {
        setUploadedFiles((prev) => {
          const updated = [...prev]
          if (updated[fileIndex]) {
            updated[fileIndex] = {
              ...updated[fileIndex],
              progress: Math.round(progress),
            }
          }
          return updated
        })
      }
    }, 300)
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className={cn("space-y-6", className)}>
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
          <div className="text-xs text-[#4B6982]/60 mt-2">Supported file types: PDF, DOCX, XLSX, JPG, PNG</div>

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
          <h3 className="text-sm font-medium text-[#4B6982]">Files</h3>
          <div className="rounded-lg border border-[#4B6982]/20 overflow-hidden shadow-md">
            <div className="divide-y divide-[#4B6982]/10">
              {uploadedFiles.map((fileObj, index) => (
                <div key={index} className="p-3 flex items-center space-x-3">
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
                      <Progress value={fileObj.progress} className="h-1.5 flex-1 bg-[#A8EBC7]" />
                      <span className="ml-2 text-xs text-[#4B6982]/60 min-w-[40px] text-right">
                        {fileObj.progress}%
                      </span>
                    </div>
                    <div className="mt-1 flex items-center">
                      {fileObj.status === "complete" ? (
                        <div className="flex items-center text-xs text-green-600">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          <span>Complete</span>
                        </div>
                      ) : (
                        <div className="text-xs text-[#4B6982]/60">{Math.round(fileObj.file.size / 1024)} KB</div>
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
  )
}

export default FileDropzone
