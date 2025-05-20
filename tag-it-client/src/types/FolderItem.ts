export interface FolderItem {
    Id: number;
    Name: string;
    ParentFolderId: number;
    OwnerId: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    OwnerName: string;
    ParentFolderName: string;
}
