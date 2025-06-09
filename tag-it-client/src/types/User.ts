export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  role: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  profileImageUrl?: string
  lastLoginAt: Date
  rootFolderId: number
  provider?: string // "Google", "GitHub", או null
  providerId?: string // ה-ID שמתקבל מה-OAuth
}