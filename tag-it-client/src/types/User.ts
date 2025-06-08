export interface User {
  id: number
  firstName: string
  lastName: string
  password: string
  email: string,
  rootFolderId: number
  role: string;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean
}