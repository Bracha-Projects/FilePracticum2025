"use client"

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
  Plus,
  ChevronLeft,
} from "lucide-react"
import PageHeading from "@/components/PageHeading"
import FolderCard from "@/components/FolderCard"
import FileCard from "@/components/FileCard"
import FileBreadcrumb from "@/components/FileBreadcrumb"
import FilePreviewModal from "@/components/FilePreviewModal"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DashboardLayout from "@/layouts/DashboardLayout"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { toast } from "sonner"
import type { FileItem } from "@/types/FileItem"
import axiosInstance from "@/utils/axiosInstance"
import {
  createFolder,
  deleteFile,
  fetchFolderContents,
  goToParentFolder,
  resetFolderPath,
  selectCurrentFolderId,
  selectFiles,
  selectFolderContentsError,
  selectFolderContentsLoading,
  selectFolderPath,
  selectSubFolders,
  setCurrentFolder,
} from "@/redux/slices/folderContentsSlice"

type SortOption = "name-asc" | "name-desc" | "date-asc" | "date-desc" | "type-asc" | "type-desc"

const FilesPage = () => {
  const dispatch = useAppDispatch()
  const files = useAppSelector(selectFiles)
  const isLoading = useAppSelector(selectFolderContentsLoading)
  const error = useAppSelector(selectFolderContentsError)
  const folders = useAppSelector(selectSubFolders)
  const currentFolderId = useAppSelector(selectCurrentFolderId)
  const folderPath = useAppSelector(selectFolderPath)
  const user = useAppSelector((state) => state.user.user)

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("date-desc")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null)

  // Date range filters
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  // Folder creation state
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)

  // Initialize with root folder
  useEffect(() => {
    if (user?.id && user?.rootFolderId && folderPath.length === 0) {
      dispatch(setCurrentFolder(user.rootFolderId))
      dispatch(resetFolderPath({ id: user.rootFolderId, name: "My Files" }))
      dispatch(fetchFolderContents(user.rootFolderId))
    }
  }, [dispatch, user, folderPath.length])

  // Create new folder
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      toast.error("Please enter a folder name")
      return
    }

    if (!user?.id || !currentFolderId) {
      toast.error("User or folder information missing")
      return
    }

    try {
      setIsCreatingFolder(true)
      await dispatch(
        createFolder({
          name: newFolderName.trim(),
          parentFolderId: currentFolderId,
          ownerId: user.id,
        }),
      ).unwrap()

      toast.success("Folder created successfully")
      setNewFolderName("")
      setIsCreateFolderOpen(false)
    } catch (error) {
      console.error("Error creating folder:", error)
      toast.error("Failed to create folder")
    } finally {
      setIsCreatingFolder(false)
    }
  }

  // Navigate to parent folder
  const handleNavigateUp = () => {
    if (folderPath.length > 1) {
      dispatch(goToParentFolder())
      const parentFolderId = folderPath[folderPath.length - 2].id
      dispatch(fetchFolderContents(parentFolderId))
    }
  }

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

  // Filter and sort files based on client-side preferences
  const filteredAndSortedFiles = useMemo(() => {
    let filtered = [...files]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (file) =>
          file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (file.tags && file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
      )
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((file) => file.tags && selectedTags.every((tag) => file.tags.includes(tag)))
    }

    // Apply date filters
    if (fromDate) {
      const fromDateObj = new Date(fromDate)
      filtered = filtered.filter((file) => new Date(file.dateCreated) >= fromDateObj)
    }

    if (toDate) {
      const toDateObj = new Date(toDate)
      toDateObj.setHours(23, 59, 59, 999)
      filtered = filtered.filter((file) => new Date(file.dateCreated) <= toDateObj)
    }

    // Filter by file type based on active tab
    if (activeTab !== "all") {
      filtered = filtered.filter((file) => {
        if (activeTab === "documents") {
          return ["PDF", "DOCX", "DOC", "TXT"].includes(file.fileType.toUpperCase())
        } else if (activeTab === "spreadsheets") {
          return ["XLSX", "XLS", "CSV"].includes(file.fileType.toUpperCase())
        } else if (activeTab === "images") {
          return ["JPG", "JPEG", "PNG", "GIF"].includes(file.fileType.toUpperCase())
        }
        return true
      })
    }

    // Sort files
    return filtered.sort((a, b) => {
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
  }, [files, searchQuery, selectedTags, fromDate, toDate, activeTab, sortOption])

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Helper function to get the appropriate icon for file types
  const getFileIcon = (type: string) => {
    const lowerType = type.toLowerCase()
    if (lowerType === "pdf") {
      return <FileText className="h-5 w-5 text-red-500" />
    } else if (["docx", "doc"].includes(lowerType)) {
      return <FileText className="h-5 w-5 text-blue-500" />
    } else if (["xlsx", "xls", "csv"].includes(lowerType)) {
      return <FileText className="h-5 w-5 text-green-500" />
    } else if (["jpg", "jpeg", "png", "gif"].includes(lowerType)) {
      return <ImageIcon className="h-5 w-5 text-purple-500 fill-current" />
    } else {
      return <File className="h-5 w-5 text-tagit-blue" />
    }
  }

  // Handle file preview
  const handlePreview = async (file: FileItem) => {
    try {
      const response = await axiosInstance.get<{ url: string }>(`/file/${file.id}/viewing-url`)
      const viewingUrl = response.data.url
      setPreviewFile(file)
      window.open(viewingUrl, "_blank")
    } catch (error) {
      console.error("Error fetching viewing URL:", error)
      toast.error("Failed to get file preview URL")
    }
  }

  // Handle file download
  const handleDownload = async (file: FileItem) => {
    try {
      const response = await axiosInstance.get<{ url: string }>(`/file/${file.id}/download-url`)
      const downloadUrl = response.data.url

      const link = document.createElement("a")
      link.href = downloadUrl
      link.setAttribute("download", file.fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success(`Downloading ${file.fileName}`)
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
    if (currentFolderId) {
      dispatch(fetchFolderContents(currentFolderId))
      toast.success("Refreshing files...")
    }
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setFromDate("")
    setToDate("")
    setActiveTab("all")
  }

  const renderTabContent = (tabValue: string) => (
    <div className="pt-6 animate-fade-in">
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 text-tagit-blue animate-spin" />
          <span className="ml-2 text-tagit-blue">Loading {tabValue}...</span>
        </div>
      ) : filteredAndSortedFiles.length > 0 ? (
        <div
          className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}
        >
          {filteredAndSortedFiles.map((file) => (
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
          <p className="text-tagit-blue">No {tabValue} match your search criteria.</p>
        </div>
      )}
    </div>
  )

  return (
    <DashboardLayout>
      <div className="flex justify-between items-start mb-8 flex-col sm:flex-row gap-4">
        <PageHeading title="Files" subtitle="Browse and manage your files and folders" className="mb-0" />

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} className="whitespace-nowrap">
            Refresh Files
          </Button>

          <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
            <DialogTrigger asChild>
              <Button className="whitespace-nowrap bg-tagit-blue text-white hover:bg-tagit-darkblue">
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>Create a new folder in the current directory.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="folder-name" className="text-right">
                    Name
                  </label>
                  <Input
                    id="folder-name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    className="col-span-3"
                    placeholder="Enter folder name"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCreateFolder()
                      }
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateFolderOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleCreateFolder}
                  disabled={isCreatingFolder || !newFolderName.trim()}
                  className="bg-tagit-blue text-white hover:bg-tagit-darkblue"
                >
                  {isCreatingFolder ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Folder
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <FileBreadcrumb className="flex-grow" />
        {folderPath.length > 1 && (
          <Button variant="outline" size="sm" onClick={handleNavigateUp} className="ml-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Up
          </Button>
        )}
      </div>

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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10 border-gray-200">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[250px]">
                <DropdownMenuLabel>Filters</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="p-2">
                  <label className="text-sm font-medium">From Date</label>
                  <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="mt-1" />
                </div>
                <div className="p-2">
                  <label className="text-sm font-medium">To Date</label>
                  <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="mt-1" />
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Filter by tags</DropdownMenuLabel>
                {allTags.length > 0 ? (
                  allTags.map((tag) => (
                    <DropdownMenuItem key={tag} onClick={() => toggleTag(tag)} className="flex items-center">
                      <div className="w-4 h-4 mr-2 flex items-center justify-center">
                        {selectedTags.includes(tag) && "✓"}
                      </div>
                      {tag}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>No tags available</DropdownMenuItem>
                )}

                {(selectedTags.length > 0 || fromDate || toDate) && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={clearAllFilters}>Clear all filters</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {(selectedTags.length > 0 || fromDate || toDate || searchQuery) && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-500">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-tagit-mint/20 text-tagit-blue">
                Search: {searchQuery}
                <button className="ml-1 text-tagit-blue hover:text-tagit-darkblue" onClick={() => setSearchQuery("")}>
                  ×
                </button>
              </span>
            )}
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-tagit-mint/20 text-tagit-blue"
              >
                Tag: {tag}
                <button className="ml-1 text-tagit-blue hover:text-tagit-darkblue" onClick={() => toggleTag(tag)}>
                  ×
                </button>
              </span>
            ))}
            {fromDate && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                From: {fromDate}
                <button className="ml-1 text-blue-800 hover:text-blue-900" onClick={() => setFromDate("")}>
                  ×
                </button>
              </span>
            )}
            {toDate && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                To: {toDate}
                <button className="ml-1 text-blue-800 hover:text-blue-900" onClick={() => setToDate("")}>
                  ×
                </button>
              </span>
            )}
            <button className="text-xs text-tagit-blue hover:text-tagit-darkblue underline" onClick={clearAllFilters}>
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
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 text-tagit-blue animate-spin" />
                <span className="ml-2 text-tagit-blue">Loading files...</span>
              </div>
            )}

            {!isLoading && folders.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-tagit-darkblue mb-4">Folders</h2>
                <div
                  className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}
                >
                  {folders.map((folder) => (
                    <FolderCard key={folder.Id} {...folder} />
                  ))}
                </div>
              </div>
            )}

            {!isLoading && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-tagit-darkblue">Files</h2>
                  <div className="text-sm text-gray-500">
                    {filteredAndSortedFiles.length} file{filteredAndSortedFiles.length !== 1 ? "s" : ""} found
                  </div>
                </div>

                {filteredAndSortedFiles.length > 0 ? (
                  <div
                    className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}
                  >
                    {filteredAndSortedFiles.map((file) => (
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

          <TabsContent value="documents">{renderTabContent("documents")}</TabsContent>
          <TabsContent value="spreadsheets">{renderTabContent("spreadsheets")}</TabsContent>
          <TabsContent value="images">{renderTabContent("images")}</TabsContent>
        </Tabs>
      </div>

      <FilePreviewModal
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
        file={previewFile}
        files={filteredAndSortedFiles}
        onDownload={handleDownload}
      />
    </DashboardLayout>
  )
}

export default FilesPage
