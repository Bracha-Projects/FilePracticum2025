"use client"

import { useState } from "react"
import { X, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface FilePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  file: {
    id: string
    name: string
    type: string
    size: string
    url?: string // This would be the actual file URL in a real application
  } | null
  files?: Array<{
    id: string
    name: string
    type: string
    size: string
    url?: string
  }>
}

const FilePreviewModal = ({ isOpen, onClose, file, files = [] }: FilePreviewModalProps) => {
  const [currentFileIndex, setCurrentFileIndex] = useState<number>(() => {
    if (!file || !files.length) return 0
    return files.findIndex((f) => f.id === file.id)
  })

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
    // In a real app, you would use the actual file URL
    // For this example, we'll use placeholders based on file type
    const fileType = currentFile.type.toLowerCase()

    // For images
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(fileType)) {
      return (
        <div className="flex items-center justify-center h-full">
          <img
            src={currentFile.url || `/placeholder.svg?height=400&width=600`}
            alt={currentFile.name}
            className="max-h-[70vh] max-w-full object-contain rounded"
          />
        </div>
      )
    }

    // For PDFs
    if (fileType === "pdf") {
      return (
        <div className="h-[70vh] w-full bg-gray-100 rounded flex items-center justify-center">
          <iframe src={currentFile.url || "about:blank"} className="w-full h-full rounded" title={currentFile.name}>
            <p className="text-center">
              Your browser doesn't support PDF preview.
              <a href={currentFile.url} className="text-tagit-blue underline ml-1" target="_blank" rel="noreferrer">
                Open in new tab
              </a>
            </p>
          </iframe>
        </div>
      )
    }

    // For text-based files
    if (["txt", "md", "json", "html", "css", "js"].includes(fileType)) {
      return (
        <div className="h-[70vh] w-full bg-gray-100 rounded p-4 overflow-auto">
          <pre className="text-sm">
            {/* In a real app, you would fetch and display the file content */}
            This is a placeholder for the content of {currentFile.name}. In a real application, the actual text content
            would be displayed here.
          </pre>
        </div>
      )
    }

    // For other file types (not directly previewable)
    return (
      <div className="h-[70vh] w-full bg-gray-100 rounded flex flex-col items-center justify-center p-8">
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-xl font-medium mb-2">{currentFile.name}</h3>
        <p className="text-gray-500 mb-6">Preview not available for {currentFile.type} files</p>
        <Button className="bg-tagit-blue hover:bg-tagit-darkblue">
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
            <span className="truncate max-w-[calc(100%-2rem)]">{currentFile.name}</span>
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
          <Button className="bg-tagit-blue hover:bg-tagit-darkblue">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FilePreviewModal
