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
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/redux/store"
import { toast } from "sonner"
import axios from "@/utils/axiosInstance"
import { setUser } from "@/redux/slices/userSlice"
import type { User as user } from "@/types/User"

// Option 1: Modern Card-Based Layout
const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })
  const initials = `${formData.firstName.charAt(0).toUpperCase()}${formData.lastName.charAt(0).toUpperCase()}`

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      })
    }
  }, [user])

  if (!user) {
    return (
      <DashboardLayout>
        <PageHeading title="User Profile" subtitle="No user details available" />
        <div className="text-center text-red-500">User data is not available in Redux.</div>
      </DashboardLayout>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const response = await axios.put<user>("/User/settings", {
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

  return (
    <DashboardLayout>
      <PageHeading title="User Profile" subtitle="View and manage your profile settings" />

      {/* Modern Card-Based Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#A8EBC7]/30">
          <div className="bg-gradient-to-r from-[#4B6982] to-[#3a5269] h-32 relative">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <Avatar className="w-32 h-32 border-4 border-white shadow-md bg-[#A8EBC7]">
                <AvatarFallback className="text-3xl text-[#4B6982] font-bold">{initials}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="pt-20 pb-6 px-6 text-center">
            <h2 className="text-2xl font-bold text-[#4B6982]">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-[#4B6982]/70 mt-1">{user.role || "User"}</p>
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="w-full border-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/10"
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
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[#A8EBC7]/30">
            <h3 className="text-xl font-bold text-[#4B6982] mb-6 pb-2 border-b border-[#A8EBC7]/30">
              Personal Information
            </h3>

            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="input-with-icon">
                      <User className="input-icon" />
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="tagit-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="input-with-icon">
                      <User className="input-icon" />
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="tagit-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="input-with-icon">
                    <Mail className="input-icon" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="tagit-input"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-[#4B6982]/60">First Name</p>
                    <p className="text-lg text-[#4B6982] font-medium">{formData.firstName}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#4B6982]/60">Last Name</p>
                    <p className="text-lg text-[#4B6982] font-medium">{formData.lastName}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#4B6982]/60">Email</p>
                  <p className="text-lg text-[#4B6982] font-medium">{formData.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[#A8EBC7]/30">
              <h3 className="text-lg font-bold text-[#4B6982] mb-4">Storage Usage</h3>
              <Progress value={65} className="h-3 mb-2" />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-[#4B6982]/70">6.5 GB used</span>
                <span className="text-sm text-[#4B6982]/70">10 GB total</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-[#A8EBC7]/30">
              <h3 className="text-lg font-bold text-[#4B6982] mb-4">Account Status</h3>
              <div className="flex items-center justify-between">
                <span className="text-[#4B6982] font-medium">Pro Plan</span>
                <span className="text-xs bg-[#A8EBC7] text-[#4B6982] px-2 py-1 rounded-full font-bold">Active</span>
              </div>
              <p className="text-sm text-[#4B6982]/70 mt-2">Renews on Oct 15, 2023</p>
              <p className="text-sm text-[#4B6982]/70 mt-1">Account created on January 12, 2022</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ProfilePage
