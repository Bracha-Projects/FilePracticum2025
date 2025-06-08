"use client"

import { useEffect, useState } from "react"
import { BarChart3, FolderSymlink, Tags, Search, Calendar, Users2, ArrowUpRight, Upload } from "lucide-react"
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

interface DashboardStats {
  totalFiles: number
  activeTags: number
  storageUsed: string
  storagePercentage: number
  searchQueries: number
}

interface ActivityItem {
  id: number
  action: string
  fileName: string
  time: string
  userName: string
}

const DashboardPage = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const [stats, setStats] = useState<DashboardStats>({
    totalFiles: 0,
    activeTags: 0,
    storageUsed: "0 GB",
    storagePercentage: 0,
    searchQueries: 0,
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

      // Fetch recent files from user's root folder
      if (user?.rootFolderId) {
        const filesResponse = await axiosInstance.get(`/folder/${user.rootFolderId}/items`)
        const files = filesResponse.data.files || []
        setRecentFiles(files.slice(0, 5)) // Get 5 most recent files

        // Calculate stats from files
        const totalFiles = files.length
        const allTags = new Set<string>()
        files.forEach((file: FileItem) => {
          if (file.tags) {
            file.tags.forEach((tag) => allTags.add(tag))
          }
        })

        // Calculate storage (mock for now - you'd get this from your API)
        const totalSize = files.reduce((sum: number, file: FileItem) => sum + (+file.size || 0), 0)
        const storageGB = (totalSize / (1024 * 1024 * 1024)).toFixed(1)
        const storagePercentage = Math.min((totalSize / (10 * 1024 * 1024 * 1024)) * 100, 100) // Assuming 10GB limit

        setStats({
          totalFiles,
          activeTags: allTags.size,
          storageUsed: `${storageGB} GB`,
          storagePercentage: Math.round(storagePercentage),
          searchQueries: 0, // You'd track this in your backend
        })

        // Generate popular tags
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
      }

      // Mock activities for now - you'd get this from your API
      setActivities([
        { id: 1, action: "Uploaded", fileName: "document.pdf", time: "2 hours ago", userName: "You" },
        { id: 2, action: "Tagged", fileName: "report.docx", time: "Yesterday", userName: "You" },
        { id: 3, action: "Downloaded", fileName: "contract.pdf", time: "Yesterday", userName: "You" },
        { id: 4, action: "Shared", fileName: "timeline.xlsx", time: "2 days ago", userName: "You" },
        { id: 5, action: "Commented on", fileName: "budget.xlsx", time: "3 days ago", userName: "You" },
      ])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
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

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <PageHeading
          title="Dashboard"
          subtitle="Welcome back to your intelligent file management system"
          className="mb-0"
        />

        <div className="flex space-x-3">
          <Link to="/upload">
            <Button style={buttonStyle}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
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
              {stats.activeTags}
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
              {stats.storageUsed}
            </div>
            <div className="mt-2">
              <Progress value={stats.storagePercentage} className="h-2" />
              <p className="text-xs mt-1" style={{ color: "#4B6982" }}>
                {stats.storagePercentage}% of 10 GB
              </p>
            </div>
          </CardContent>
        </Card>

        <Card style={cardStyle}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium" style={{ color: "#3a5269" }}>
              Search Queries
            </CardTitle>
            <div className="p-2 rounded-full" style={{ backgroundColor: "rgba(168, 235, 199, 0.1)" }}>
              <Search className="h-5 w-5" style={{ color: "#A8EBC7" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "#3a5269" }}>
              {stats.searchQueries}
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
                Activity
              </CardTitle>
              <CardDescription>Recent activities by you and your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div
                      className="p-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "rgba(168, 235, 199, 0.1)" }}
                    >
                      {activity.action === "Uploaded" ? (
                        <Upload className="h-4 w-4" style={{ color: "#4B6982" }} />
                      ) : activity.action === "Tagged" ? (
                        <Tags className="h-4 w-4" style={{ color: "#4B6982" }} />
                      ) : activity.action === "Downloaded" ? (
                        <ArrowUpRight className="h-4 w-4" style={{ color: "#4B6982" }} />
                      ) : activity.action === "Shared" ? (
                        <Users2 className="h-4 w-4" style={{ color: "#4B6982" }} />
                      ) : (
                        <Calendar className="h-4 w-4" style={{ color: "#4B6982" }} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: "#3a5269" }}>
                        <span className="font-medium">{activity.userName}</span> {activity.action.toLowerCase()}{" "}
                        <span className="font-medium">{activity.fileName}</span>
                      </p>
                      <p className="text-xs mt-1" style={{ color: "rgba(75, 105, 130, 0.6)" }}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
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
