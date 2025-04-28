import { BarChart3, FolderSymlink, Tags, Search, Calendar, Users2, ArrowUpRight, Upload } from "lucide-react"
import { Link } from "react-router-dom"
import DashboardLayout from "@/layouts/DashboardLayout"
import PageHeading from "@/components/PageHeading"
import FileCard from "@/components/FileCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Embedding tailwind config directly
const tailwindConfig = {
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      colors: {
        tagit: {
          blue: "#4d6a84",
          darkblue: "#3a5269",
          mint: "#a8ebc7",
          lightmint: "#cff6e3",
        },
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
}

// Example data for recent files
const recentFiles = [
  {
    id: "1",
    name: "Q4-2023-Financial-Report.pdf",
    type: "PDF",
    size: "2.3 MB",
    tags: ["financial", "report", "quarterly"],
    lastModified: "2 days ago",
  },
  {
    id: "2",
    name: "Marketing-Strategy-2024.docx",
    type: "DOCX",
    size: "845 KB",
    tags: ["marketing", "strategy", "planning"],
    lastModified: "1 week ago",
  },
  {
    id: "3",
    name: "Client-Contract-ABC-Corp.pdf",
    type: "PDF",
    size: "1.2 MB",
    tags: ["contract", "legal", "client"],
    lastModified: "3 days ago",
  },
]

// Stats data
const statsData = [
  {
    title: "Total Files",
    value: 347,
    change: "+12%",
    trend: "up",
    icon: <FolderSymlink className="h-5 w-5 text-tagit-mint" />,
  },
  {
    title: "Active Tags",
    value: 128,
    change: "+8%",
    trend: "up",
    icon: <Tags className="h-5 w-5 text-tagit-mint" />,
  },
  {
    title: "Storage Used",
    value: "6.5 GB",
    percentage: 65,
    icon: <BarChart3 className="h-5 w-5 text-tagit-mint" />,
  },
  {
    title: "Search Queries",
    value: 845,
    change: "+24%",
    trend: "up",
    icon: <Search className="h-5 w-5 text-tagit-mint" />,
  },
]

// Activity data
const activityData = [
  { action: "Uploaded", file: "Q4-Financial-Report.pdf", time: "2 hours ago", user: "You" },
  { action: "Tagged", file: "Marketing-Strategy.docx", time: "Yesterday", user: "Sarah M." },
  { action: "Downloaded", file: "Client-Contract.pdf", time: "Yesterday", user: "You" },
  { action: "Shared", file: "Project-Timeline.xlsx", time: "2 days ago", user: "You" },
  { action: "Commented on", file: "Budget-2024.xlsx", time: "3 days ago", user: "John D." },
]

// Popular tags
const popularTags = [
  { name: "financial", count: 24 },
  { name: "report", count: 18 },
  { name: "contract", count: 15 },
  { name: "marketing", count: 12 },
  { name: "design", count: 10 },
  { name: "presentation", count: 8 },
  { name: "invoice", count: 7 },
]

const DashboardPage = () => {
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
            <Button className="bg-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/90">
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat, index) => (
          <Card key={index} className="glass animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-tagit-darkblue">{stat.title}</CardTitle>
              <div className="p-2 bg-tagit-mint/10 rounded-full">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-3">
                <div className="text-2xl font-bold text-tagit-darkblue">{stat.value}</div>
                {stat.change && (
                  <div className={`text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </div>
                )}
              </div>

              {stat.percentage !== undefined && (
                <div className="mt-2">
                  <Progress value={stat.percentage} className="h-2" />
                  <p className="text-xs text-tagit-blue mt-1">{stat.percentage}% of 10 GB</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Files */}
        <div className="lg:col-span-2">
          <Card className="glass h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-tagit-darkblue">Recent Files</CardTitle>
                <Link to="/files" className="text-sm text-tagit-blue hover:text-tagit-mint transition-colors">
                  View all
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFiles.map((file) => (
                  <FileCard key={file.id} {...file} className="animate-fade-in" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Activity Feed */}
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-tagit-darkblue">Activity</CardTitle>
              <CardDescription>Recent activities by you and your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityData.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-2 bg-tagit-mint/10 rounded-full flex-shrink-0">
                      {activity.action === "Uploaded" ? (
                        <Upload className="h-4 w-4 text-tagit-blue" />
                      ) : activity.action === "Tagged" ? (
                        <Tags className="h-4 w-4 text-tagit-blue" />
                      ) : activity.action === "Downloaded" ? (
                        <ArrowUpRight className="h-4 w-4 text-tagit-blue" />
                      ) : activity.action === "Shared" ? (
                        <Users2 className="h-4 w-4 text-tagit-blue" />
                      ) : (
                        <Calendar className="h-4 w-4 text-tagit-blue" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-tagit-darkblue">
                        <span className="font-medium">{activity.user}</span> {activity.action.toLowerCase()}{" "}
                        <span className="font-medium">{activity.file}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-tagit-darkblue">Popular Tags</CardTitle>
              <CardDescription>Most used tags across your files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 bg-tagit-mint/20 text-tagit-darkblue rounded-full text-sm flex items-center animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span>{tag.name}</span>
                    <span className="ml-2 text-xs bg-tagit-mint/40 px-1.5 py-0.5 rounded-full">{tag.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage
