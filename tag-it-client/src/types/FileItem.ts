export interface FileItem {
    id: number
    fileName: string
    fileType: string
    s3Key: string
    ownerId: number
    lastModified: string
    dateCreated: string
    size: string
    tags: string[]
    // Additional UI state properties
    isDeleting?: boolean
    downloadUrl?: string
    viewUrl?: string
  }
  