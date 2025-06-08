export interface FileItem {
  id: number
  fileName: string
  fileType: string
  s3Key: string
  ownerId: number
  lastModified: string
  dateCreated: string
  size: string,
  folderId: number,
  isDeleted: boolean,
  tags: string[]
}
