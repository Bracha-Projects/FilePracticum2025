import { User } from "./User"

export interface AuthResponse {
  token: string
  user: User
}
export interface OAuthLoginRequest {
  provider: string
  accessToken: string
}

