"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Download, Tag } from "lucide-react"
import type { FileItem } from "@/types/FileItem"
import FileTagModal from "./FileTagModal"

interface FilePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  file: FileItem | null
  files: FileItem[]
  onDownload: (file: FileItem) => void
}

const FilePreviewModal = ({ isOpen, onClose, file, files, onDownload }: FilePreviewModalProps) => {
  const [_, setCurrentIndex] = useState(0)
  const [isTagModalOpen, setIsTagModalOpen] = useState(false)

  if (!file) return null

  const fileIndex = files.findIndex((f) => f.id === file.id)

  const handlePrevious = () => {
    const newIndex = (fileIndex - 1 + files.length) % files.length
    setCurrentIndex(newIndex)
  }

  const handleNext = () => {
    const newIndex = (fileIndex + 1) % files.length
    setCurrentIndex(newIndex)
  }

  const currentFile = fileIndex !== -1 ? files[fileIndex] : file

  const getPreviewContent = () => {
    const fileType = currentFile.fileType.toLowerCase()

    if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
      return (
        <img
          src={`/api/File/${currentFile.id}/content`}
          alt={currentFile.fileName}
          className="max-h-[70vh] max-w-full object-contain mx-auto"
        />
      )
    } else if (["pdf"].includes(fileType)) {
      return (
        <iframe src={`/api/File/${currentFile.id}/content`} className="w-full h-[70vh]" title={currentFile.fileName} />
      )
    } else if (["txt", "csv", "md"].includes(fileType)) {
      return (
        <div className="bg-gray-100 p-4 rounded-md w-full h-[70vh] overflow-auto">
          <pre className="whitespace-pre-wrap">{/* Text content would be loaded here */}</pre>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col items-center justify-center p-10">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-gray-500">Preview not available for this file type.</p>
          <Button onClick={() => onDownload(currentFile)} className="mt-4">
            <Download className="mr-2 h-4 w-4" />
            Download to view
          </Button>
        </div>
      )
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 bg-white border-0 shadow-xl">
          <div className="p-4 border-b bg-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-medium truncate max-w-[70%]">{currentFile.fileName}</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsTagModalOpen(true)}>
                <Tag className="h-4 w-4 mr-1" />
                Edit Tags
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDownload(currentFile)}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto relative">
            {getPreviewContent()}

            {files.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-gray-100"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-gray-100"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {currentFile.tags && currentFile.tags.length > 0 && (
            <div className="p-4 border-t bg-gray-100">
              <div className="flex flex-wrap gap-1">
                {currentFile.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white border border-gray-300 shadow-sm text-gray-800"
                  >
                    {typeof tag === "string" ? tag : tag.tagName}
                  </span>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <FileTagModal isOpen={isTagModalOpen} onClose={() => setIsTagModalOpen(false)} file={currentFile} />
    </>
  )
}

export default FilePreviewModal
