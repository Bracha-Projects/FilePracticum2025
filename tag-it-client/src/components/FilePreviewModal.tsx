"use client"

import { useState, useEffect } from "react"
import { X, Download, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import type { FileItem } from "@/types/FileItem"
import axiosInstance from "@/utils/axiosInstance"
import { formatFileSize } from "./FileCard"

interface FilePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  file: FileItem | null
  files?: FileItem[]
  onDownload: (file: FileItem) => void
}

const FilePreviewModal = ({ isOpen, onClose, file, files = [], onDownload }: FilePreviewModalProps) => {
  const [currentFileIndex, setCurrentFileIndex] = useState<number>(() => {
    if (!file || !files.length) return 0
    return files.findIndex((f) => f.id === file.id)
  })
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewError, setPreviewError] = useState<string | null>(null)

  useEffect(() => {
    if (file) {
      setCurrentFileIndex(files.findIndex((f) => f.id === file.id))
    }
  }, [file, files])

  useEffect(() => {
    const loadPreviewUrl = async () => {
      if (!isOpen || !file) return

      setIsLoading(true)
      setPreviewError(null)
      setPreviewUrl(null)

      try {
        const response = await axiosInstance.get(`/file/${file.id}/viewing-url`)
        setPreviewUrl(response.data.url)
      } catch (error) {
        console.error("Error fetching preview URL:", error)
        setPreviewError("Failed to load preview")
      } finally {
        setIsLoading(false)
      }
    }

    loadPreviewUrl()
  }, [isOpen, file, currentFileIndex])

  if (!file) return null

  const currentFile = files.length > 0 ? files[currentFileIndex] : file
  const hasMultipleFiles = files.length > 1

  const navigateToNextFile = () => {
    if (currentFileIndex < files.length - 1) {
      setCurrentFileIndex(currentFileIndex + 1)
    }
  }

  const navigateToPreviousFile = () => {
    if (currentFileIndex > 0) {
      setCurrentFileIndex(currentFileIndex - 1)
    }
  }

  // Helper to determine file type and render appropriate preview
  const renderFilePreview = () => {
    if (isLoading) {
      return (
        <div className="h-[70vh] w-full flex items-center justify-center">
          <div className="space-y-4 w-full max-w-md">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-[50vh] w-full" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
        </div>
      )
    }

    if (previewError) {
      return (
        <div className="h-[70vh] w-full bg-gray-100 rounded flex flex-col items-center justify-center p-8">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">{currentFile.fileName}</h3>
          <p className="text-gray-500 mb-6">{previewError}</p>
          <Button className="bg-tagit-blue hover:bg-tagit-darkblue" onClick={() => onDownload(currentFile)}>
            <Download className="mr-2 h-4 w-4" />
            Download to view
          </Button>
        </div>
      )
    }

    // For images
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(currentFile.fileType.toLowerCase())) {
      return (
        <div className="flex items-center justify-center h-full">
          <img
            src={previewUrl || `/placeholder.svg?height=400&width=600`}
            alt={currentFile.fileName}
            className="max-h-[70vh] max-w-full object-contain rounded"
            onError={() => setPreviewError("Failed to load image")}
          />
        </div>
      )
    }

    // For PDFs
    if (currentFile.fileType.toLowerCase() === "pdf") {
      return (
        <div className="h-[70vh] w-full bg-gray-100 rounded flex items-center justify-center">
          {previewUrl ? (
            <iframe src={previewUrl} className="w-full h-full rounded" title={currentFile.fileName}>
              <p className="text-center">
                Your browser doesn't support PDF preview.
                <a href={previewUrl} className="text-tagit-blue underline ml-1" target="_blank" rel="noreferrer">
                  Open in new tab
                </a>
              </p>
            </iframe>
          ) : (
            <div className="text-center">
              <p>PDF preview not available</p>
              <Button className="mt-4" onClick={() => onDownload(currentFile)}>
                <Download className="mr-2 h-4 w-4" />
                Download to view
              </Button>
            </div>
          )}
        </div>
      )
    }

    // For other file types (not directly previewable)
    return (
      <div className="h-[70vh] w-full bg-gray-100 rounded flex flex-col items-center justify-center p-8">
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-xl font-medium mb-2">{currentFile.fileName}</h3>
        <p className="text-gray-500 mb-6">Preview not available for {currentFile.fileType} files</p>
        <Button className="bg-tagit-blue hover:bg-tagit-darkblue" onClick={() => onDownload(currentFile)}>
          <Download className="mr-2 h-4 w-4" />
          Download to view
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="truncate max-w-[calc(100%-2rem)]">{currentFile.fileName}</span>
            <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          {hasMultipleFiles && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={navigateToPreviousFile}
                disabled={currentFileIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={navigateToNextFile}
                disabled={currentFileIndex === files.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {renderFilePreview()}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {hasMultipleFiles && (
              <span>
                {currentFileIndex + 1} of {files.length}
              </span>
            )}
          </div>
          <div className="flex space-x-4">
            <div className="text-sm">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <span className="font-medium text-gray-700">Size:</span>
                <span>
                  {formatFileSize(
                    typeof currentFile.size === "string" ? Number.parseInt(currentFile.size) : currentFile.size,
                  )}
                </span>

                <span className="font-medium text-gray-700">Type:</span>
                <span>{currentFile.fileType.toUpperCase()}</span>

                <span className="font-medium text-gray-700">Modified:</span>
                <span>{new Date(currentFile.lastModified).toLocaleDateString()}</span>
              </div>
            </div>
            <Button className="bg-tagit-blue hover:bg-tagit-darkblue" onClick={() => onDownload(currentFile)}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FilePreviewModal
