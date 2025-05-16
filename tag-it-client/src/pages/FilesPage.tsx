"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useMemo, useEffect } from "react"
import {
  FolderPlus,
  Search,
  Grid,
  List,
  SlidersHorizontal,
  ArrowDown,
  ArrowUp,
  File,
  FileText,
  ImageIcon,
  Loader2,
  AlertCircle,
} from "lucide-react"
import PageHeading from "@/components/PageHeading"
import FolderCard from "@/components/FolderCard"
import FileCard from "@/components/FileCard"
import FileBreadcrumb from "@/components/FileBreadcrumb"
import FilePreviewModal from "@/components/FilePreviewModal"
import ApiDebugger from "@/components/ApiDebugger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DashboardLayout from "@/layouts/DashboardLayout"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  fetchUserFiles,
  getFileDownloadUrl,
  getFileViewUrl,
  deleteFile,
  selectFiles,
  selectFilesLoading,
  selectFilesError,
  type FileItem,
} from "@/redux/slices/filesSlice"
import { toast } from "sonner"

// Example folders data (in a real app, this would also come from an API)
const exampleFolders = [
  { id: "1", name: "Documents", filesCount: 15, path: "/files/documents" },
  { id: "2", name: "Images", filesCount: 28, path: "/files/images" },
  { id: "3", name: "Contracts", filesCount: 7, path: "/files/contracts" },
  { id: "4", name: "Marketing", filesCount: 12, path: "/files/marketing" },
  { id: "5", name: "Reports", filesCount: 9, path: "/files/reports" },
  { id: "6", name: "Invoices", filesCount: 23, path: "/files/invoices" },
]

type SortOption = "name-asc" | "name-desc" | "date-asc" | "date-desc" | "type-asc" | "type-desc"

const FilesPage = () => {
  const dispatch = useAppDispatch()
  const files = useAppSelector(selectFiles)
  const isLoading = useAppSelector(selectFilesLoading)
  const error = useAppSelector(selectFilesError)
  const [showDebugger, setShowDebugger] = useState(false)

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("date-desc")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null)

  // Fetch files on component mount
  useEffect(() => {
    dispatch(fetchUserFiles())
  }, [dispatch])

  // Extract all unique tags from files
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    files.forEach((file) => {
      if (file.tags) {
        file.tags.forEach((tag) => tags.add(tag))
      }
    })
    return Array.from(tags).sort()
  }, [files])

  // Filter files based on search query, selected tags, and active tab
  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      // Search by name or tag
      const matchesSearch =
        searchQuery === "" ||
        file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (file.tags && file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

      // Filter by selected tags (if any)
      const matchesTags =
        selectedTags.length === 0 || (file.tags && selectedTags.some((tag) => file.tags.includes(tag)))

      // Filter by file type based on active tab
      let matchesTab = true
      if (activeTab === "documents") {
        matchesTab = ["PDF", "DOCX", "DOC", "TXT"].includes(file.fileType.toUpperCase())
      } else if (activeTab === "spreadsheets") {
        matchesTab = ["XLSX", "XLS", "CSV"].includes(file.fileType.toUpperCase())
      } else if (activeTab === "images") {
        matchesTab = ["JPG", "JPEG", "PNG", "GIF"].includes(file.fileType.toUpperCase())
      }

      return matchesSearch && matchesTags && matchesTab
    })
  }, [files, searchQuery, selectedTags, activeTab])

  // Sort files based on selected sort option
  const sortedFiles = useMemo(() => {
    return [...filteredFiles].sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.fileName.localeCompare(b.fileName)
        case "name-desc":
          return b.fileName.localeCompare(a.fileName)
        case "date-asc":
          return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
        case "date-desc":
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        case "type-asc":
          return a.fileType.localeCompare(b.fileType)
        case "type-desc":
          return b.fileType.localeCompare(a.fileType)
        default:
          return 0
      }
    })
  }, [filteredFiles, sortOption])

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Helper function to get the appropriate icon for file types
  const getFileIcon = (type: string) => {
    // Simple file type icon mapping with solid icons
    const lowerType = type.toLowerCase()
    if (lowerType === "pdf") {
      return <FileText className="h-5 w-5 text-red-500" />
    } else if (["docx", "doc"].includes(lowerType)) {
      return <FileText className="h-5 w-5 text-blue-500" />
    } else if (["xlsx", "xls", "csv"].includes(lowerType)) {
      return <FileText className="h-5 w-5 text-green-500" />
    } else if (["jpg", "jpeg", "png", "gif"].includes(lowerType)) {
      return <ImageIcon className="h-5 w-5 text-purple-500 fill-current" /> // Using solid Image icon
    } else {
      return <File className="h-5 w-5 text-tagit-blue" />
    }
  }

  // Handle file preview
  const handlePreview = async (file: FileItem) => {
    // If we don't have a view URL yet, fetch it
    if (!file.viewUrl) {
      dispatch(getFileViewUrl(file.id))
    }
    setPreviewFile(file)
  }

  // Handle file download
  const handleDownload = async (file: FileItem) => {
    try {
      // If we don't have a download URL yet, fetch it
      if (!file.downloadUrl) {
        await dispatch(getFileDownloadUrl(file.id)).unwrap()
      }

      // Get the updated file with download URL from Redux store
      const updatedFile = files.find((f) => f.id === file.id)

      if (updatedFile?.downloadUrl) {
        // Create a temporary link and trigger download
        const link = document.createElement("a")
        link.href = updatedFile.downloadUrl
        link.setAttribute("download", updatedFile.fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast.success(`Downloading ${updatedFile.fileName}`)
      } else {
        toast.error("Download URL not available")
      }
    } catch (error) {
      toast.error("Failed to download file")
      console.error("Download error:", error)
    }
  }

  // Handle file deletion
  const handleDelete = async (fileId: number) => {
    try {
      await dispatch(deleteFile(fileId)).unwrap()
      toast.success("File deleted successfully")
    } catch (error) {
      toast.error("Failed to delete file")
      console.error("Delete error:", error)
    }
  }

  // Force refresh files
  const handleRefresh = () => {
    dispatch(fetchUserFiles())
    toast.success("Refreshing files...")
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-start mb-8 flex-col sm:flex-row gap-4">
        <PageHeading title="Files" subtitle="Browse and manage your files and folders" className="mb-0" />

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} className="whitespace-nowrap">
            Refresh Files
          </Button>
          <Button variant="outline" onClick={() => setShowDebugger(!showDebugger)} className="whitespace-nowrap">
            {showDebugger ? "Hide Debugger" : "Show Debugger"}
          </Button>
          <Button className="whitespace-nowrap bg-tagit-blue text-white hover:bg-tagit-darkblue">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>

      {showDebugger && (
        <div className="mb-6">
          <ApiDebugger />
        </div>
      )}

      <FileBreadcrumb items={[{ name: "My Files", path: "/files" }]} className="mb-6" />

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search files by name or tag..."
              className="pl-9 border-gray-200 focus:border-tagit-mint focus:ring-tagit-mint/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-200">
                  {sortOption.includes("asc") ? (
                    <ArrowUp className="mr-2 h-4 w-4" />
                  ) : (
                    <ArrowDown className="mr-2 h-4 w-4" />
                  )}
                  Sort: {sortOption.split("-")[0].charAt(0).toUpperCase() + sortOption.split("-")[0].slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={sortOption}
                  onValueChange={(value) => setSortOption(value as SortOption)}
                >
                  <DropdownMenuRadioItem value="name-asc">Name (A-Z)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name-desc">Name (Z-A)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="date-desc">Date (Newest)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="date-asc">Date (Oldest)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="type-asc">Type (A-Z)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="type-desc">Type (Z-A)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode Buttons */}
            <Button
              variant="outline"
              size="icon"
              className={`h-10 w-10 border-gray-200 ${viewMode === "grid" ? "bg-tagit-mint/10 border-tagit-mint text-tagit-blue" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`h-10 w-10 border-gray-200 ${viewMode === "list" ? "bg-tagit-mint/10 border-tagit-mint text-tagit-blue" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>

            {/* Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10 border-gray-200">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by tags</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allTags.map((tag) => (
                  <DropdownMenuItem key={tag} onClick={() => toggleTag(tag)} className="flex items-center">
                    <div className="w-4 h-4 mr-2 flex items-center justify-center">
                      {selectedTags.includes(tag) && "✓"}
                    </div>
                    {tag}
                  </DropdownMenuItem>
                ))}
                {selectedTags.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedTags([])}>Clear filters</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Selected Tags Display */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-500">Filtered by:</span>
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-tagit-mint/20 text-tagit-blue"
              >
                {tag}
                <button className="ml-1 text-tagit-blue hover:text-tagit-darkblue" onClick={() => toggleTag(tag)}>
                  ×
                </button>
              </span>
            ))}
            <button
              className="text-xs text-tagit-blue hover:text-tagit-darkblue underline"
              onClick={() => setSelectedTags([])}
            >
              Clear all
            </button>
          </div>
        )}

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="spreadsheets">Spreadsheets</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="pt-6 animate-fade-in">
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 text-tagit-blue animate-spin" />
                <span className="ml-2 text-tagit-blue">Loading files...</span>
              </div>
            )}

            {/* Folders Section */}
            {!isLoading && exampleFolders.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-tagit-darkblue mb-4">Folders</h2>
                <div
                  className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}
                >
                  {exampleFolders.map((folder) => (
                    <FolderCard key={folder.id} {...folder} />
                  ))}
                </div>
              </div>
            )}

            {/* Files Section */}
            {!isLoading && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-tagit-darkblue">Files</h2>
                  <div className="text-sm text-gray-500">
                    {sortedFiles.length} file{sortedFiles.length !== 1 ? "s" : ""} found
                  </div>
                </div>

                {sortedFiles.length > 0 ? (
                  <div
                    className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}
                  >
                    {sortedFiles.map((file) => (
                      <FileCard
                        key={file.id}
                        file={file}
                        customIcon={getFileIcon(file.fileType)}
                        onPreview={() => handlePreview(file)}
                        onDownload={() => handleDownload(file)}
                        onDelete={() => handleDelete(file.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-tagit-blue">No files match your search criteria.</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Other tab contents follow the same pattern */}
          <TabsContent value="documents">
            <div className="pt-6 animate-fade-in">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 text-tagit-blue animate-spin" />
                  <span className="ml-2 text-tagit-blue">Loading documents...</span>
                </div>
              ) : sortedFiles.length > 0 ? (
                <div
                  className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}
                >
                  {sortedFiles.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      customIcon={getFileIcon(file.fileType)}
                      onPreview={() => handlePreview(file)}
                      onDownload={() => handleDownload(file)}
                      onDelete={() => handleDelete(file.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-tagit-blue">No documents match your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="spreadsheets">
            <div className="pt-6 animate-fade-in">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 text-tagit-blue animate-spin" />
                  <span className="ml-2 text-tagit-blue">Loading spreadsheets...</span>
                </div>
              ) : sortedFiles.length > 0 ? (
                <div
                  className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}
                >
                  {sortedFiles.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      customIcon={getFileIcon(file.fileType)}
                      onPreview={() => handlePreview(file)}
                      onDownload={() => handleDownload(file)}
                      onDelete={() => handleDelete(file.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-tagit-blue">No spreadsheets match your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="images">
            <div className="pt-6 animate-fade-in">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 text-tagit-blue animate-spin" />
                  <span className="ml-2 text-tagit-blue">Loading images...</span>
                </div>
              ) : sortedFiles.length > 0 ? (
                <div
                  className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}
                >
                  {sortedFiles.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      customIcon={getFileIcon(file.fileType)}
                      onPreview={() => handlePreview(file)}
                      onDownload={() => handleDownload(file)}
                      onDelete={() => handleDelete(file.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-tagit-blue">No images match your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* File Preview Modal */}
      <FilePreviewModal
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
        file={previewFile}
        files={sortedFiles}
        onDownload={handleDownload}
      />
    </DashboardLayout>
  )
}

export default FilesPage
