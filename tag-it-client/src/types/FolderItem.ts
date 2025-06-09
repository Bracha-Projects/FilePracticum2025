export interface FolderItem {
    id: number;
    name: string;
    parentFolderId: number;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: number
}
