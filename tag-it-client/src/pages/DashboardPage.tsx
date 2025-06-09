"use client"

import { useEffect, useState } from "react"
import { BarChart3, FolderSymlink, Tags, Search, Calendar, ArrowUpRight, FileText } from "lucide-react"
import { Link } from "react-router-dom"
import DashboardLayout from "@/layouts/DashboardLayout"
import PageHeading from "@/components/PageHeading"
import FileCard from "@/components/FileCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import axiosInstance from "@/utils/axiosInstance"
import type { FileItem } from "@/types/FileItem"
import { UserStats } from "@/types/UserStats"
import { ActivityItem } from "@/types/ActivityItem"



const DashboardPage = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const [stats, setStats] = useState<UserStats>({
    totalFiles: 0,
    totalSizeBytes: 0,
    totalTags: 0,
    totalFolders: 0,
  })
  const [recentFiles, setRecentFiles] = useState<FileItem[]>([])
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [popularTags, setPopularTags] = useState<{ name: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch user stats
      try {
        const statsResponse = await axiosInstance.get<UserStats>(`User/${user?.id}/stats`)
        setStats(statsResponse.data)
      } catch (error) {
        console.error("Error fetching user stats:", error)
        // Keep default stats if API fails
      }

      // Fetch recent files from user's root folder
      if (user?.rootFolderId) {
        try {
          const filesResponse = await axiosInstance.get(`/Folder/${user.rootFolderId}/items`)
          const files = filesResponse.data.files || []
          setRecentFiles(files.slice(0, 5)) // Get 5 most recent files

          // Generate popular tags from recent files
          const tagCounts: { [key: string]: number } = {}
          files.forEach((file: FileItem) => {
            if (file.tags) {
              file.tags.forEach((tag) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1
              })
            }
          })

          const sortedTags = Object.entries(tagCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 7)
            .map(([name, count]) => ({ name, count }))

          setPopularTags(sortedTags)
        } catch (error) {
          console.error("Error fetching recent files:", error)
        }
      }

      // Fetch recent activity
      try {
        const activityResponse = await axiosInstance.get<ActivityItem[]>(`/User/${user?.id}/recent-activity`)
        console.log("Recent activity response:", activityResponse.data);
        
        setActivities(activityResponse.data)
      } catch (error) {
        console.error("Error fetching activity:", error)
        // Fallback to empty activity if API fails
        setActivities([])
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(168, 235, 199, 0.3)",
    boxShadow: "0 8px 32px rgba(75, 105, 130, 0.1)",
    borderRadius: "12px",
  }

  const buttonStyle = {
    backgroundColor: "#A8EBC7",
    color: "#4B6982",
    fontWeight: "600",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    border: "none",
    padding: "0.5rem 1rem",
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: "#4B6982" }}></div>
        </div>
      </DashboardLayout>
    )
  }

  const storagePercentage = Math.min((stats.totalSizeBytes / (10 * 1024 * 1024 * 1024)) * 100, 100) // Assuming 10GB limit

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <PageHeading
          title="Dashboard"
          subtitle="Welcome back to your intelligent file management system"
          className="mb-0"
        />

        <div className="flex space-x-3">
          <Link to="/files">
            <Button style={buttonStyle}>
              <FileText className="mr-2 h-4 w-4" />
              Browse Files
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card style={cardStyle}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium" style={{ color: "#3a5269" }}>
              Total Files
            </CardTitle>
            <div className="p-2 rounded-full" style={{ backgroundColor: "rgba(168, 235, 199, 0.1)" }}>
              <FolderSymlink className="h-5 w-5" style={{ color: "#A8EBC7" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "#3a5269" }}>
              {stats.totalFiles}
            </div>
          </CardContent>
        </Card>

        <Card style={cardStyle}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium" style={{ color: "#3a5269" }}>
              Active Tags
            </CardTitle>
            <div className="p-2 rounded-full" style={{ backgroundColor: "rgba(168, 235, 199, 0.1)" }}>
              <Tags className="h-5 w-5" style={{ color: "#A8EBC7" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "#3a5269" }}>
              {stats.totalTags}
            </div>
          </CardContent>
        </Card>

        <Card style={cardStyle}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium" style={{ color: "#3a5269" }}>
              Storage Used
            </CardTitle>
            <div className="p-2 rounded-full" style={{ backgroundColor: "rgba(168, 235, 199, 0.1)" }}>
              <BarChart3 className="h-5 w-5" style={{ color: "#A8EBC7" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "#3a5269" }}>
              {formatFileSize(stats.totalSizeBytes)}
            </div>
            <div className="mt-2">
              <Progress value={storagePercentage} className="h-2" />
              <p className="text-xs mt-1" style={{ color: "#4B6982" }}>
                {Math.round(storagePercentage)}% of 10 GB
              </p>
            </div>
          </CardContent>
        </Card>

        <Card style={cardStyle}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium" style={{ color: "#3a5269" }}>
              Total Folders
            </CardTitle>
            <div className="p-2 rounded-full" style={{ backgroundColor: "rgba(168, 235, 199, 0.1)" }}>
              <Search className="h-5 w-5" style={{ color: "#A8EBC7" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "#3a5269" }}>
              {stats.totalFolders}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Files */}
        <div className="lg:col-span-2">
          <Card style={cardStyle} className="h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl" style={{ color: "#3a5269" }}>
                  Recent Files
                </CardTitle>
                <Link to="/files" className="text-sm transition-colors" style={{ color: "#4B6982" }}>
                  View all
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFiles.length > 0 ? (
                  recentFiles.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      onPreview={() => {}}
                      onDownload={() => {}}
                      onDelete={() => {}}
                    />
                  ))
                ) : (
                  <p style={{ color: "#4B6982" }}>No recent files found. Upload some files to get started!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Activity Feed */}
          <Card style={cardStyle}>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl" style={{ color: "#3a5269" }}>
                Recent Activity
              </CardTitle>
              <CardDescription>Your recent file activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className="p-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "rgba(168, 235, 199, 0.1)" }}
                      >
                        {activity.action === "Uploaded" ? (
                          <ArrowUpRight className="h-4 w-4" style={{ color: "#4B6982" }} />
                        ) : activity.action === "Downloaded" ? (
                          <ArrowUpRight className="h-4 w-4" style={{ color: "#4B6982" }} />
                        ) : (
                          <Calendar className="h-4 w-4" style={{ color: "#4B6982" }} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm" style={{ color: "#3a5269" }}>
                          <span className="font-medium">{activity.action}</span>{" "}
                          <span className="font-medium">{activity.metadata}</span>
                        </p>
                        <p className="text-xs mt-1" style={{ color: "rgba(75, 105, 130, 0.6)" }}>
                          {new Date(activity.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#4B6982" }}>No recent activity found.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card style={cardStyle}>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl" style={{ color: "#3a5269" }}>
                Popular Tags
              </CardTitle>
              <CardDescription>Most used tags across your files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.length > 0 ? (
                  popularTags.map((tag, index) => (
                    <div
                      key={`${tag.name}-${index}`}
                      className="px-3 py-1.5 rounded-full text-sm flex items-center"
                      style={{
                        backgroundColor: "rgba(168, 235, 199, 0.2)",
                        color: "#3a5269",
                      }}
                    >
                      <span>{tag.name}</span>
                      <span
                        className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: "rgba(168, 235, 199, 0.4)" }}
                      >
                        {tag.count}
                      </span>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#4B6982" }}>No tags found yet. Start tagging your files!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage
