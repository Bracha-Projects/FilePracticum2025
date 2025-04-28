"use client"

import { useState } from "react"
import { Download, Info, FileText, Filter, Calendar, MoreVertical, Search } from "lucide-react"
import PageHeading from "@/components/PageHeading"
import TagDisplay from "@/components/TagDisplay"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import DashboardLayout from "@/layouts/DashboardLayout"

// Example data for downloadable files
const downloadableFiles = [
  {
    id: "1",
    name: "Q4-2023-Financial-Report.pdf",
    type: "PDF",
    size: "2.3 MB",
    tags: ["financial", "report", "quarterly"],
    lastModified: "2 days ago",
    downloadProgress: 0,
    status: "ready" as "ready" | "downloading" | "complete",
  },
  {
    id: "2",
    name: "Marketing-Strategy-2024.docx",
    type: "DOCX",
    size: "845 KB",
    tags: ["marketing", "strategy", "planning"],
    lastModified: "1 week ago",
    downloadProgress: 0,
    status: "ready" as "ready" | "downloading" | "complete",
  },
  {
    id: "3",
    name: "Client-Contract-ABC-Corp.pdf",
    type: "PDF",
    size: "1.2 MB",
    tags: ["contract", "legal", "client"],
    lastModified: "3 days ago",
    downloadProgress: 0,
    status: "ready" as "ready" | "downloading" | "complete",
  },
  {
    id: "4",
    name: "Product-Launch-Timeline.xlsx",
    type: "XLSX",
    size: "1.8 MB",
    tags: ["product", "timeline", "project"],
    lastModified: "Yesterday",
    downloadProgress: 0,
    status: "ready" as "ready" | "downloading" | "complete",
  },
  {
    id: "5",
    name: "Team-Photo-Offsite-2023.jpg",
    type: "JPG",
    size: "3.4 MB",
    tags: ["photo", "team", "event"],
    lastModified: "1 month ago",
    downloadProgress: 0,
    status: "ready" as "ready" | "downloading" | "complete",
  },
]

// Example data for recent downloads
const recentDownloads = [
  {
    id: "6",
    name: "Annual-Report-2023.pdf",
    type: "PDF",
    size: "4.7 MB",
    downloadDate: "Yesterday, 3:45 PM",
  },
  {
    id: "7",
    name: "Project-Proposal-Template.docx",
    type: "DOCX",
    size: "1.2 MB",
    downloadDate: "Yesterday, 11:20 AM",
  },
  {
    id: "8",
    name: "Budget-Forecast-2024.xlsx",
    type: "XLSX",
    size: "2.1 MB",
    downloadDate: "2 days ago, 9:15 AM",
  },
]

const FileDownloadPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [files, setFiles] = useState(downloadableFiles)
  const [activeFilter, setActiveFilter] = useState("all")

  // Filter files based on search query and active filter
  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeFilter === "all") return matchesSearch
    if (activeFilter === "documents") return matchesSearch && ["PDF", "DOCX", "TXT"].includes(file.type)
    if (activeFilter === "spreadsheets") return matchesSearch && ["XLSX", "CSV"].includes(file.type)
    if (activeFilter === "images") return matchesSearch && ["JPG", "PNG", "GIF"].includes(file.type)

    return matchesSearch
  })

  const handleDownload = (fileId: string) => {
    // Find the file to download
    const fileToDownload = files.find((file) => file.id === fileId)
    if (!fileToDownload) return

    // Update file status to downloading
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === fileId
          ? {
              ...file,
              status: "downloading",
              downloadProgress: 0,
            }
          : file,
      ),
    )

    // Simulate download progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)

        // Update file status to complete
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileId
              ? {
                  ...file,
                  status: "complete",
                  downloadProgress: 100,
                }
              : file,
          ),
        )

        toast.success(`Download Complete`, {
          description: `${fileToDownload.name} has been downloaded successfully.`,
        })

        // Reset status after a delay
        setTimeout(() => {
          setFiles((prevFiles) =>
            prevFiles.map((file) =>
              file.id === fileId
                ? {
                    ...file,
                    status: "ready",
                    downloadProgress: 0,
                  }
                : file,
            ),
          )
        }, 3000)
      } else {
        // Update download progress
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileId
              ? {
                  ...file,
                  downloadProgress: Math.round(progress),
                }
              : file,
          ),
        )
      }
    }, 200)
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
  }

  return (
    <DashboardLayout>
      <PageHeading title="Download Files" subtitle="Browse and download your files" />

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="browse">Browse Files</TabsTrigger>
          <TabsTrigger value="recent">Recent Downloads</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="animate-fade-in">
          <div className="glass p-6 md:p-8 rounded-xl shadow-elevation">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files by name or tag..."
                  className="pl-9 tagit-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter: {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => handleFilterChange("all")}>All Files</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange("documents")}>Documents</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange("spreadsheets")}>Spreadsheets</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange("images")}>Images</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {filteredFiles.length > 0 ? (
              <div className="space-y-4">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-4 rounded-lg border border-[#4B6982]/20 bg-white hover:border-[#A8EBC7]/50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-[#A8EBC7]/20 rounded-lg">
                          <FileText className="h-8 w-8 text-[#4B6982]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[#4B6982] truncate">{file.name}</h3>
                          <div className="flex items-center text-xs text-[#4B6982]/60 space-x-4 mt-1">
                            <span>{file.type}</span>
                            <span>{file.size}</span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {file.lastModified}
                            </span>
                          </div>
                          <div className="mt-2">
                            <TagDisplay tags={file.tags} readOnly className="flex-wrap" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {file.status === "downloading" ? (
                          <div className="flex items-center space-x-2 w-full max-w-[200px]">
                            <Progress value={file.downloadProgress} className="h-2 flex-1" />
                            <span className="text-xs text-[#4B6982]/60 min-w-[40px] text-right">
                              {file.downloadProgress}%
                            </span>
                          </div>
                        ) : file.status === "complete" ? (
                          <Button variant="outline" className="text-green-600 border-green-600" disabled>
                            Downloaded
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleDownload(file.id)}
                            className="bg-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/90"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Share File</DropdownMenuItem>
                            <DropdownMenuItem>Add to Collection</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#4B6982]">No files match your search criteria.</p>
              </div>
            )}

            <div className="mt-8 flex items-start p-4 rounded-lg bg-[#A8EBC7]/10 border border-[#A8EBC7]/20">
              <Info className="h-5 w-5 text-[#4B6982] mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-[#4B6982]">
                <p className="font-medium">About downloading files</p>
                <p className="mt-1">
                  Files are downloaded to your default download location. You can change this in your browser settings.
                  All downloads are encrypted for security.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="animate-fade-in">
          <div className="glass p-6 md:p-8 rounded-xl shadow-elevation">
            <h3 className="text-lg font-medium text-[#4B6982] mb-4">Recently Downloaded Files</h3>

            {recentDownloads.length > 0 ? (
              <div className="space-y-4">
                {recentDownloads.map((file) => (
                  <div key={file.id} className="p-4 rounded-lg border border-[#4B6982]/20 bg-white">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-[#A8EBC7]/20 rounded-lg">
                        <FileText className="h-6 w-6 text-[#4B6982]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[#4B6982] truncate">{file.name}</h3>
                        <div className="flex items-center text-xs text-[#4B6982]/60 space-x-4 mt-1">
                          <span>{file.type}</span>
                          <span>{file.size}</span>
                        </div>
                        <div className="mt-1 text-xs text-[#4B6982]/60">
                          <span className="font-medium">Downloaded:</span> {file.downloadDate}
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          toast.success("Download started", {
                            description: `${file.name} download has started.`,
                          })
                        }}
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0"
                      >
                        <Download className="mr-2 h-3 w-3" />
                        Download Again
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#4B6982]">No recent downloads found.</p>
              </div>
            )}

            <div className="mt-8">
              <Label htmlFor="clear-history" className="text-sm mb-2 block text-[#4B6982]">
                Download History
              </Label>
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#4B6982]/70">
                  Your download history is stored for 30 days. You can clear it at any time.
                </p>
                <Button
                  variant="outline"
                  className="text-[#4B6982] border-[#4B6982] hover:bg-[#4B6982]/10"
                  onClick={() => {
                    toast.success("Download history cleared", {
                      description: "Your download history has been cleared successfully.",
                    })
                  }}
                >
                  Clear History
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

export default FileDownloadPage
