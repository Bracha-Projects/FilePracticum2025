"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/redux/hooks"
import { setUser } from "@/redux/slices/userSlice"
import { toast } from "sonner"
import axiosInstance from "@/utils/axiosInstance"
import { OAuthLoginRequest } from "@/types/OAuthLoginRequest"
import { AuthResponse } from "@/types/AuthResponse"
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "@/utils/firebase"

interface OAuthLoginProps {
  onSuccess?: () => void
}

const OAuthLogin: React.FC<OAuthLoginProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const result = await signInWithPopup(auth, provider)
      const googleToken = await result.user.getIdToken() 

      if (googleToken) {
        await handleOAuthLogin("Google", googleToken)
      }
    } catch (error) {
      console.error("Google login failed:", error)
      toast.error("Google login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: string, accessToken: string) => {
    try {
      const request: OAuthLoginRequest = {
        provider,
        accessToken,
      }

      const response = await axiosInstance.post<AuthResponse>("/api/Auth/oauth-login", request)

      dispatch(
        setUser({
          user: response.data.user,
          token: response.data.token,
        }),
      )

      toast.success(`Successfully logged in with ${provider}`)
      onSuccess?.()
    } catch (error: any) {
      console.error(`${provider} OAuth login failed:`, error)
      toast.error(`${provider} login failed`)
    }
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#A8EBC7]/30" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-[#4B6982]/60">Or continue with</span>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full border-[#A8EBC7]/50 hover:border-[#A8EBC7] hover:bg-[#A8EBC7]/10"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-[#4B6982] border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        )}
        Sign in with Google
      </Button>
    </div>
  )
}

export default OAuthLogin
