import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { Layout, Upload, FolderOpen, UserCircle } from "lucide-react"
import Logo from "./Logo"
import { cn } from "@/lib/utils"

interface SidebarLinkProps {
  to: string
  icon: React.ReactNode
  label: string
  active?: boolean
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, active }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
        active ? "bg-[#A8EBC7] text-[#4B6982] font-bold" : "text-white hover:bg-[#A8EBC7]/20 hover:text-[#A8EBC7]",
      )}
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </Link>
  )
}

const DashboardSidebar: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const sidebarLinks = [
    { path: "/dashboard", icon: <Layout className="h-4 w-4" />, label: "Dashboard" },
    { path: "/files", icon: <FolderOpen className="h-4 w-4" />, label: "Files" },
    { path: "/upload", icon: <Upload className="h-4 w-4" />, label: "Upload Files" },
    // { path: "/download", icon: <Download className="h-4 w-4" />, label: "Download Files" },
    // { path: "/tags", icon: <Tag className="h-4 w-4" />, label: "Tags" },
    { path: "/profile", icon: <UserCircle className="h-4 w-4" />, label: "Profile" },
    // { path: "/settings", icon: <Settings className="h-4 w-4" />, label: "Settings" },
  ]

  return (
    <aside className="min-h-screen w-64 bg-[#4B6982] shadow-xl">
      <div className="p-6 border-b border-[#A8EBC7]/20">
        {/* Pass textColor prop to make logo text white */}
        <Logo withText textColor="text-white" className="mx-auto" />
      </div>

      <div className="px-3 py-4">
        <p className="mb-2 px-3 text-xs uppercase text-[#A8EBC7] font-bold">Main</p>
        <nav className="space-y-1">
          {sidebarLinks.slice(0, 3).map((link) => (
            <SidebarLink
              key={link.path}
              to={link.path}
              icon={link.icon}
              label={link.label}
              active={isActive(link.path)}
            />
          ))}
        </nav>
      </div>

      <div className="px-3 py-4 mt-2">
        <p className="mb-2 px-3 text-xs uppercase text-[#A8EBC7] font-bold">User</p>
        <nav className="space-y-1">
          {sidebarLinks.slice(3).map((link) => (
            <SidebarLink
              key={link.path}
              to={link.path}
              icon={link.icon}
              label={link.label}
              active={isActive(link.path)}
            />
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default DashboardSidebar
