"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { User, Mail, Edit, Save } from "lucide-react"
import DashboardLayout from "@/layouts/DashboardLayout"
import PageHeading from "@/components/PageHeading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import type { RootState } from "@/redux/store"
import { toast } from "sonner"
import axiosInstance from "@/utils/axiosInstance"
import { setUser } from "@/redux/slices/userSlice"
import type { User as UserType } from "@/types/User"
import { UserStats } from "@/types/UserStats"



const ProfilePage = () => {
  const user = useAppSelector((state: RootState) => state.user.user)
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      })

      fetchUserStats()
    }
  }, [user])

  const fetchUserStats = async () => {
    if (!user) return

    try {
      const response = await axiosInstance.get<UserStats>(`/api/User/${user.id}/stats`)
      setUserStats(response.data)
    } catch (error) {
      console.error("Failed to fetch user stats:", error)
    }
  }

  if (!user) {
    return (
      <DashboardLayout>
        <PageHeading title="User Profile" subtitle="No user details available" />
        <div className="text-center text-red-500">User data is not available. Please log in again.</div>
      </DashboardLayout>
    )
  }

  const initials = `${formData.firstName.charAt(0).toUpperCase()}${formData.lastName.charAt(0).toUpperCase()}`

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put<UserType>("/api/User/settings", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: "",
        role: user.role,
      })

      const updatedUser = response.data
      dispatch(setUser({ user: updatedUser, token: localStorage.getItem("token") || "" }))

      toast.success("Profile Updated", {
        description: "Your profile information has been saved successfully.",
      })

      setIsEditing(false)
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data
        console.error("Server error:", serverError)

        toast.error(serverError.title || "Failed to update profile", {
          description: serverError.errors ? Object.values(serverError.errors).flat().join(", ") : "An error occurred.",
        })
      } else {
        console.error("Network error:", error)
        toast.error("Network error. Please check your connection.")
      }
    }
  }

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    })
    setIsEditing(false)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string | Date): string => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return "Unknown date"
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return "Unknown date"
    }
  }

  const cardStyle = {
    backgroundColor: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  }

  const buttonStyle = {
    backgroundColor: "#A8EBC7",
    color: "#4B6982",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    padding: "0.5rem 1rem",
    transition: "all 0.3s ease",
  }

  const inputStyle = {
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "0.5rem 0.75rem",
    paddingLeft: "2.5rem",
    fontSize: "0.875rem",
    width: "100%",
    backgroundColor: "white",
  }

  const storageUsedGB = userStats ? userStats.totalSizeBytes / (1024 * 1024 * 1024) : 0
  const storageLimit = 10 // GB
  const storagePercentage = Math.min((storageUsedGB / storageLimit) * 100, 100)

  return (
    <DashboardLayout>
      <PageHeading title="User Profile" subtitle="View and manage your profile settings" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div style={cardStyle} className="overflow-hidden">
          <div
            className="h-32 relative"
            style={{
              background: "linear-gradient(to right, #4B6982, #3a5269)",
            }}
          >
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <Avatar className="w-32 h-32 border-4 border-white shadow-md" style={{ backgroundColor: "#A8EBC7" }}>
                <AvatarFallback className="text-3xl font-bold" style={{ color: "#4B6982" }}>
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="pt-20 pb-6 px-6 text-center">
            <h2 className="text-2xl font-bold" style={{ color: "#4B6982" }}>
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="mt-1" style={{ color: "rgba(75, 105, 130, 0.7)" }}>
              {user.role || "User"}
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-500"}`}></div>
              <span className="text-sm" style={{ color: "rgba(75, 105, 130, 0.7)" }}>
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="w-full"
                style={{
                  borderColor: "#A8EBC7",
                  color: "#4B6982",
                  backgroundColor: "transparent",
                }}
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div style={cardStyle} className="p-6">
            <h3 className="text-xl font-bold mb-6 pb-2" style={{ color: "#4B6982", borderBottom: "1px solid #e2e8f0" }}>
              Personal Information
            </h3>

            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                        style={{ color: "#4B6982", opacity: 0.7 }}
                      />
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                        style={{ color: "#4B6982", opacity: 0.7 }}
                      />
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                      style={{ color: "#4B6982", opacity: 0.7 }}
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} style={buttonStyle}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "rgba(75, 105, 130, 0.6)" }}>
                      First Name
                    </p>
                    <p className="text-lg font-medium" style={{ color: "#4B6982" }}>
                      {formData.firstName}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium" style={{ color: "rgba(75, 105, 130, 0.6)" }}>
                      Last Name
                    </p>
                    <p className="text-lg font-medium" style={{ color: "#4B6982" }}>
                      {formData.lastName}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium" style={{ color: "rgba(75, 105, 130, 0.6)" }}>
                    Email
                  </p>
                  <p className="text-lg font-medium" style={{ color: "#4B6982" }}>
                    {formData.email}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "rgba(75, 105, 130, 0.6)" }}>
                      Last Login
                    </p>
                    <p className="text-lg font-medium" style={{ color: "#4B6982" }}>
                      {formatDate(user.lastLoginAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium" style={{ color: "rgba(75, 105, 130, 0.6)" }}>
                      Member Since
                    </p>
                    <p className="text-lg font-medium" style={{ color: "#4B6982" }}>
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div style={cardStyle} className="p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: "#4B6982" }}>
                Storage Usage
              </h3>
              <Progress value={storagePercentage} className="h-3 mb-2" />
              <div className="flex justify-between mt-2">
                <span className="text-sm" style={{ color: "rgba(75, 105, 130, 0.7)" }}>
                  {userStats ? formatFileSize(userStats.totalSizeBytes) : "Loading..."}
                </span>
                <span className="text-sm" style={{ color: "rgba(75, 105, 130, 0.7)" }}>
                  {storageLimit} GB total
                </span>
              </div>
            </div>

            <div style={cardStyle} className="p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: "#4B6982" }}>
                File Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "rgba(75, 105, 130, 0.7)" }}>
                    Total Files
                  </span>
                  <span className="font-medium" style={{ color: "#4B6982" }}>
                    {userStats?.totalFiles || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "rgba(75, 105, 130, 0.7)" }}>
                    Total Folders
                  </span>
                  <span className="font-medium" style={{ color: "#4B6982" }}>
                    {userStats?.totalFolders || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "rgba(75, 105, 130, 0.7)" }}>
                    Total Tags
                  </span>
                  <span className="font-medium" style={{ color: "#4B6982" }}>
                    {userStats?.totalTags || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ProfilePage
