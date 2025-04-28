"use client"

import type React from "react"
import { ErrorInfo, useState } from "react"
import { ErrorResponse, Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import LayoutWrapper from "@/components/LayoutWrapper"
import Logo from "@/components/Logo"
import { toast } from "sonner"
import axios from "@/utils/axiosInstance"; 
import { AuthResponse } from "@/types/AuthResponse"
import { LoginRequest } from "@/types/LoginRequest"
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error("Please enter both email and password", {
        description: "Error",
      })
      return
    }

    // Simulate login
    setIsLoading(true)
    try {
      const loginData: LoginRequest = { email, password };
      const response = await axios.post<AuthResponse>("/User/login", loginData);
  
      const data = response.data;
  
      // Save token and user details in Redux
      dispatch(setUser({ user: data.user, token: data.token }));
  
      // Save token in localStorage (for API authentication)
      localStorage.setItem("token", data.token);
  
      toast.success("Success", {
        description: `Welcome back, ${data.user.firstName}!`,
      });
  
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error("Unauthorized: Invalid email or password", {
              description: "Login failed",
            });
            break;
          case 403:
            toast.error("Forbidden: You don't have access to this resource", {
              description: "Access denied",
            });
            break;
          case 500:
            toast.error("Server error: Please try again later", {
              description: "Error",
            });
            break;
          default:
            toast.error(`Unexpected error: ${error.response.status}`, {
              description: "Something went wrong",
            });
        }
      } else if (error.request) {
        toast.error("No response from server: Please check your network", {
          description: "Network error",
        });
      } else {
        toast.error("An unexpected error occurred", {
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <LayoutWrapper>
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-2xl font-bold text-[#4B6982]">Welcome back</h1>
            <p className="text-[#4B6982]/80 mt-2">Sign in to your account to continue</p>
          </div>

          <div className="glass p-8 rounded-xl shadow-elevation animate-scale-in border-2 border-[#A8EBC7]/30">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#4B6982]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="tagit-input border-[#A8EBC7]/50 focus:border-[#A8EBC7] focus:ring-[#A8EBC7]/30"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-[#4B6982]">
                    Password
                  </Label>
                  <Link to="/forgot-password" className="text-xs text-[#4B6982] hover:text-[#A8EBC7]">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="tagit-input pr-10 border-[#A8EBC7]/50 focus:border-[#A8EBC7] focus:ring-[#A8EBC7]/30"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4B6982]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  className="data-[state=checked]:bg-[#A8EBC7] data-[state=checked]:border-[#A8EBC7]"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-[#4B6982] cursor-pointer">
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/90 font-bold border-2 border-[#A8EBC7] shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#4B6982]">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#4B6982] font-bold hover:text-[#A8EBC7]">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default LoginPage
